import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { neighborhoods, vendors } from "@/lib/data";
import { hoodArt, type HoodName } from "@/lib/neighborhoods";
import { NeighborhoodArt } from "@/components/NeighborhoodArt";

function count(n: HoodName) {
  return vendors.filter((v) => v.neighborhood === n).length;
}

/** Horizontally scrolling illustrated neighborhood cards. Either selects (onSelect) or links to Explore. */
export function NeighborhoodStrip({ active, onSelect, compact = false }: { active?: string | null; onSelect?: (n: HoodName | null) => void; compact?: boolean }) {
  return (
    <div className={`no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 overflow-x-auto px-4 pb-2 md:-mx-5 md:scroll-px-5 md:px-5 ${compact ? "gap-2.5 md:gap-3" : "gap-3 md:gap-4"}`}>
      {neighborhoods.map((n, i) => {
        const selected = active === n;
        const body = (
          <>
            <NeighborhoodArt name={n} className={compact ? "aspect-[2/1] w-full" : "aspect-[5/3] w-full"} />
            <div className={compact ? "px-3 py-2" : "p-3 md:p-4"}>
              <div className="flex items-center justify-between gap-2">
                <h3 className={`${compact ? "text-sm" : "text-lg"} truncate font-semibold leading-tight`}>{n}</h3>
                {selected ? (
                  <span className={`grid shrink-0 place-items-center rounded-full bg-primary text-primary-foreground ${compact ? "h-5 w-5" : "h-6 w-6"}`}><Check className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} /></span>
                ) : (
                  <span className={`shrink-0 text-xs text-muted-foreground ${compact ? "hidden sm:inline" : ""}`}>{count(n)} local{count(n) === 1 ? "" : "s"}</span>
                )}
              </div>
              {!compact && <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{hoodArt[n].tagline}</p>}
            </div>
          </>
        );
        const size = compact ? "w-[46%] rounded-xl sm:w-[200px]" : "w-[72%] rounded-2xl sm:w-[44%] lg:w-[30%]";
        const cls = `group ${size} shrink-0 snap-start overflow-hidden border bg-card text-left shadow-soft transition-[box-shadow,border-color] duration-300 ease-out hover:shadow-lift active:scale-[0.99] animate-rise ${selected ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-primary/25"}`;
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
