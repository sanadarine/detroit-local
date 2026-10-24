import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { neighborhoods, vendors } from "@/lib/data";
import { hoodArt, type HoodName } from "@/lib/neighborhoods";
import { NeighborhoodArt } from "@/components/NeighborhoodArt";

function count(n: HoodName) {
  return vendors.filter((v) => v.neighborhood === n).length;
}

/** Horizontally scrolling illustrated neighborhood cards. Either selects (onSelect) or links to Explore. */
export function NeighborhoodStrip({ active, onSelect }: { active?: string | null; onSelect?: (n: HoodName | null) => void }) {
  return (
    <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:-mx-5 md:gap-4 md:px-5">
      {neighborhoods.map((n, i) => {
        const selected = active === n;
        const body = (
          <>
            <NeighborhoodArt name={n} className="aspect-[5/3] w-full" />
            <div className="p-3 md:p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold leading-tight">{n}</h3>
                {selected ? (
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="h-3.5 w-3.5" /></span>
                ) : (
                  <span className="text-xs text-muted-foreground">{count(n)} local{count(n) === 1 ? "" : "s"}</span>
                )}
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{hoodArt[n].tagline}</p>
            </div>
          </>
        );
        const cls = `group w-[72%] shrink-0 snap-start overflow-hidden rounded-2xl border bg-card text-left shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift active:scale-[0.99] animate-rise sm:w-[44%] lg:w-[30%] ${selected ? "border-primary ring-2 ring-primary/30" : "border-border"}`;
        const style = { animationDelay: `${i * 70}ms` };
        return onSelect ? (
          <button key={n} type="button" onClick={() => onSelect(selected ? null : n)} className={cls} style={style} aria-pressed={selected}>
            {body}
          </button>
        ) : (
          <Link key={n} to="/explore" search={{ hood: n }} className={cls} style={style}>
            {body}
          </Link>
        );
      })}
    </div>
  );
}
