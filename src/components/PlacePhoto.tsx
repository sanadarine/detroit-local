import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { NeighborhoodArt } from "@/components/NeighborhoodArt";
import { placeIds } from "@/lib/placeIds";
import { getPlacePhotos, type PlacePhoto as Photo } from "@/lib/placePhotos.functions";
import type { HoodName } from "@/lib/neighborhoods";

export function usePlacePhotos(slug: string, count = 1, width = 480) {
  return useQuery({
    queryKey: ["place-photos", slug, count, width],
    queryFn: () => getPlacePhotos({ data: { slug, count, width } }),
    enabled: slug in placeIds,
    staleTime: 60 * 60 * 1000,
    retry: false,
  });
}

/** Small "Photo: name · Google" credit, required wherever a Google Maps photo is shown. */
export function PhotoCredit({ photo, className = "" }: { photo: Photo; className?: string }) {
  return (
    <span className={`pointer-events-auto rounded-full bg-foreground/55 px-2 py-0.5 text-[10px] leading-tight text-background backdrop-blur ${className}`}>
      Photo:{" "}
      {photo.author && photo.authorUrl ? (
        <a href={photo.authorUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline" onClick={(e) => e.stopPropagation()}>{photo.author}</a>
      ) : (photo.author ?? "Google user")}
      {" · Google Maps"}
    </span>
  );
}

/** A single image that fades in over the neighborhood drawing once it loads. */
export function PhotoImg({ photo, alt, eager }: { photo: Photo; alt: string; eager?: boolean | undefined }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={photo.uri}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      referrerPolicy="no-referrer"
      onLoad={() => setLoaded(true)}
      className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.04] ${loaded ? "opacity-100" : "opacity-0"}`}
    />
  );
}

/**
 * Real photo of a listed place from Google Maps, with the neighborhood drawing as the
 * placeholder and fallback (for places without Google photos).
 */
export function PlacePhoto({
  slug,
  name,
  neighborhood,
  className = "",
  width = 480,
  credit = "full",
  eager,
}: {
  slug: string;
  name: string;
  neighborhood: HoodName;
  className?: string;
  width?: number;
  credit?: "full" | "tooltip";
  eager?: boolean;
}) {
  const { data } = usePlacePhotos(slug, 1, width);
  const photo = data?.[0];
  return (
    <div className={`relative overflow-hidden ${className}`} title={photo && credit === "tooltip" ? `Photo: ${photo.author ?? "Google user"} · Google Maps` : undefined}>
      <NeighborhoodArt name={neighborhood} className="h-full w-full" />
      {photo && (
        <>
          <PhotoImg photo={photo} alt={`${name}, ${neighborhood}, Detroit`} eager={eager} />
          {credit === "full" ? (
            <PhotoCredit photo={photo} className="absolute bottom-2 right-2" />
          ) : (
            <span className="sr-only">Photo by {photo.author ?? "a Google user"} on Google Maps</span>
          )}
        </>
      )}
    </div>
  );
}
