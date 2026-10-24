import { Link } from "@tanstack/react-router";
import { BadgeCheck, MapPin } from "lucide-react";
import type { TravelMode, Vendor } from "@/lib/data";

export function VendorCard({ v, mode, minutes }: { v: Vendor; mode?: TravelMode | undefined; minutes?: number | undefined }) {
  const mins = minutes ?? (mode ? v.travel[mode] : v.minutesAway);
  return (
    <Link
      to="/vendors/$slug"
      params={{ slug: v.slug }}
      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
    >
      <div className="overflow-hidden"><img src={v.image} alt={v.name} loading="lazy" width={1024} height={1024} className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" /></div>
      <div className="p-4 md:p-5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="rounded-full bg-secondary px-2 py-0.5">{v.category}</span>
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{mode ? `${mins} min ${mode === "bus" ? "by bus" : mode}` : `${mins} min`} · <span title={v.neighborhood}>{v.subArea}</span></span>
        </div>
        <h3 className="mt-3 text-xl font-semibold group-hover:text-primary">{v.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{v.tagline}</p>
        <p className="mt-3 flex items-center gap-1 text-xs font-medium text-brick"><BadgeCheck className="h-4 w-4" />Vouched by {v.vouchedBy.length} long-time neighbor{v.vouchedBy.length > 1 ? "s" : ""}</p>
      </div>
    </Link>
  );
}
