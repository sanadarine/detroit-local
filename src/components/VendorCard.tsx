import { Link } from "@tanstack/react-router";
import { MapPin, Star } from "lucide-react";
import type { TravelMode, Vendor } from "@/lib/data";
import { PlacePhoto } from "@/components/PlacePhoto";

const modeLabel: Record<TravelMode, string> = { walk: "walk", bike: "bike", bus: "by bus", drive: "drive" };

export function VendorCard({ v, mode, minutes }: { v: Vendor; mode?: TravelMode | undefined; minutes?: number | undefined }) {
  return (
    <Link
      to="/vendors/$slug"
      params={{ slug: v.slug }}
      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
    >
      <div className="relative overflow-hidden">
        <PlacePhoto slug={v.slug} name={v.name} neighborhood={v.neighborhood} width={800} className="aspect-[16/9] w-full" />
        <span className="absolute left-3 top-3 rounded-full bg-card/95 px-2.5 py-1 text-xs font-medium shadow-soft backdrop-blur">{v.category}</span>
      </div>
      <div className="p-4 md:p-5">
        <h3 className="text-xl font-semibold leading-snug group-hover:text-primary">{v.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{v.tagline}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          {v.rating && (
            <span className="inline-flex items-center gap-1 font-medium"><Star className="h-3.5 w-3.5 fill-brick text-brick" />{v.rating.stars.toFixed(1)} <span className="font-normal text-muted-foreground">({v.rating.count} on {v.rating.source})</span></span>
          )}
          <span className="inline-flex items-center gap-1 text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{v.subArea}, {v.neighborhood}</span>
          {mode && minutes !== undefined && <span className="rounded-full bg-accent px-2 py-0.5 font-medium text-accent-foreground">{minutes} min {modeLabel[mode]}</span>}
        </div>
      </div>
    </Link>
  );
}
