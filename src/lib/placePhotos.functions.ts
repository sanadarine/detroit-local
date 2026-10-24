import { createServerFn } from "@tanstack/react-start";
import { placeIds } from "@/lib/placeIds";

export type PlacePhoto = { uri: string; author: string | null; authorUrl: string | null };

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps";
const TTL_MS = 6 * 60 * 60 * 1000;
// Per-worker memory so repeat views don't re-bill Google. Only known listing slugs can be looked up.
const cache = new Map<string, { at: number; photos: PlacePhoto[] }>();

export const getPlacePhotos = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string; count?: number; width?: number }) => {
    if (!input || typeof input.slug !== "string" || !(input.slug in placeIds)) throw new Error("Unknown place");
    const count = Math.min(3, Math.max(1, Math.floor(input.count ?? 1)));
    const width = input.width && input.width > 600 ? 1600 : 480;
    return { slug: input.slug, count, width };
  })
  .handler(async ({ data }): Promise<PlacePhoto[]> => {
    const key = `${data.slug}|${data.count}|${data.width}`;
    const hit = cache.get(key);
    if (hit && Date.now() - hit.at < TTL_MS) return hit.photos;

    const lovableKey = process.env["LOVABLE_API_KEY"];
    const mapsKey = process.env["GOOGLE_MAPS_API_KEY"];
    if (!lovableKey || !mapsKey) throw new Error("Google Maps is not connected");
    const headers = { Authorization: `Bearer ${lovableKey}`, "X-Connection-Api-Key": mapsKey };

    const details = await fetch(`${GATEWAY_URL}/places/v1/places/${placeIds[data.slug]}`, {
      headers: { ...headers, "X-Goog-FieldMask": "photos" },
    });
    if (!details.ok) {
      const body = await details.text();
      console.error(`Place details failed [${details.status}]: ${body}`);
      throw new Error(`Place photos unavailable [${details.status}]`);
    }
    const place = (await details.json()) as {
      photos?: { name: string; authorAttributions?: { displayName?: string; uri?: string }[] }[];
    };

    const photos = await Promise.all(
      (place.photos ?? []).slice(0, data.count).map(async (p): Promise<PlacePhoto | null> => {
        const res = await fetch(`${GATEWAY_URL}/places/v1/${p.name}/media?maxWidthPx=${data.width}&skipHttpRedirect=true`, { headers });
        if (!res.ok) {
          console.error(`Place photo failed [${res.status}]: ${await res.text()}`);
          return null;
        }
        const { photoUri } = (await res.json()) as { photoUri?: string };
        if (!photoUri) return null;
        const a = p.authorAttributions?.[0];
        return { uri: photoUri, author: a?.displayName ?? null, authorUrl: a?.uri ?? null };
      }),
    );
    const result = photos.filter((p): p is PlacePhoto => p !== null);
    cache.set(key, { at: Date.now(), photos: result });
    return result;
  });
