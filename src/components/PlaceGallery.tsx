import { NeighborhoodArt } from "@/components/NeighborhoodArt";
import { PhotoCredit, PhotoImg, usePlacePhotos } from "@/components/PlacePhoto";
import type { HoodName } from "@/lib/neighborhoods";

/** Seller page header: one large real photo plus two smaller ones on wider screens. */
export function PlaceGallery({ slug, name, neighborhood }: { slug: string; name: string; neighborhood: HoodName }) {
  const { data } = usePlacePhotos(slug, 3, 1600);
  const photos = data ?? [];
  const [main, ...rest] = photos;

  if (!main) {
    return (
      <div className="relative mt-4 overflow-hidden rounded-3xl shadow-lift">
        <NeighborhoodArt name={neighborhood} className="aspect-[5/2] w-full md:aspect-[3/1]" eager />
      </div>
    );
  }

  return (
    <div className={`mt-4 grid gap-2 ${rest.length ? "md:grid-cols-[2fr_1fr]" : ""}`}>
      <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-secondary shadow-lift sm:aspect-[16/9] md:aspect-auto md:h-[22rem]">
        <PhotoImg photo={main} alt={`${name}, ${neighborhood}, Detroit`} eager />
        <PhotoCredit photo={main} className="absolute bottom-3 right-3" />
      </div>
      {rest.length > 0 && (
        <div className="hidden gap-2 md:grid md:h-[22rem] md:grid-rows-2">
          {rest.map((p, i) => (
            <div key={p.uri} className="group relative overflow-hidden rounded-3xl bg-secondary shadow-soft">
              <PhotoImg photo={p} alt={`${name}, photo ${i + 2}`} />
              <PhotoCredit photo={p} className="absolute bottom-2 right-2" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
