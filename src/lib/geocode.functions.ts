import { createServerFn } from "@tanstack/react-start";

export type GeoHit = { lat: number; lng: number; label: string };

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps";
// Per-worker memory so repeated lookups of the same place don't re-bill Google.
const cache = new Map<string, GeoHit | null>();

/** Turn a typed Detroit address or landmark into coordinates (used by "near" on the Saved page). */
export const geocodeDetroit = createServerFn({ method: "GET" })
  .inputValidator((input: { q: string }) => {
    const q = typeof input?.q === "string" ? input.q.trim().slice(0, 120) : "";
    if (q.length < 2) throw new Error("Type a place or address");
    return { q };
  })
  .handler(async ({ data }): Promise<GeoHit | null> => {
    const key = data.q.toLowerCase();
    if (cache.has(key)) return cache.get(key) ?? null;

    const lovableKey = process.env["LOVABLE_API_KEY"];
    const mapsKey = process.env["GOOGLE_MAPS_API_KEY"];
    if (!lovableKey || !mapsKey) throw new Error("Google Maps is not connected");

    const address = /detroit/i.test(data.q) ? data.q : `${data.q}, Detroit, MI`;
    const url = `${GATEWAY_URL}/maps/api/geocode/json?address=${encodeURIComponent(address)}&bounds=${encodeURIComponent("42.25,-83.29|42.46,-82.91")}&components=country:US`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${lovableKey}`, "X-Connection-Api-Key": mapsKey } });
    if (!res.ok) {
      const body = await res.text();
      console.error(`Geocode failed [${res.status}]: ${body}`);
      throw new Error(`Couldn't look up that place [${res.status}]`);
    }
    const json = (await res.json()) as { status: string; results?: { formatted_address: string; geometry: { location: { lat: number; lng: number } } }[] };
    const r = json.results?.[0];
    const hit = r ? { lat: r.geometry.location.lat, lng: r.geometry.location.lng, label: r.formatted_address.replace(/, USA$/, "") } : null;
    cache.set(key, hit);
    return hit;
  });
