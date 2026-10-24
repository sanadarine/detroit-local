import { ChevronRight, FileCheck, Hammer, Handshake, Package, Plus, ShoppingBasket, Users } from "lucide-react";
import { hubBoard, permitSteps } from "@/lib/data";

const boardIcons = { "Skill share": Hammer, "Material share": Package, "Group buying": ShoppingBasket, "Share clients": Users } as const;

/** The "For sellers" side of Explore: list your business, neighbor board, and the permit guide. */
export function SellerHub({ onListBusiness }: { onListBusiness: () => void }) {
  return (
    <div className="animate-rise">
      <button
        type="button"
        onClick={onListBusiness}
        className="group flex w-full items-center gap-4 rounded-3xl bg-primary p-5 text-left text-primary-foreground shadow-lift transition active:scale-[0.99] md:p-6"
      >
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-foreground/15"><Plus className="h-6 w-6" /></span>
        <span className="min-w-0 flex-1">
          <span className="block text-lg font-semibold md:text-xl">Put your business on the map</span>
          <span className="block text-sm opacity-80">Drop a pin so neighbors nearby can find you. Takes a minute.</span>
        </span>
        <ChevronRight className="h-5 w-5 shrink-0 opacity-70 transition-transform group-hover:translate-x-0.5" />
      </button>

      <div className="mt-8 grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-10">
        <section id="board" className="scroll-mt-24">
          <h2 className="flex items-center gap-2 text-xl font-semibold md:text-2xl"><Handshake className="h-5 w-5 text-brick" />Neighbor board</h2>
          <p className="mt-1 text-sm text-muted-foreground">Other sellers aren't just competition. Trade skills, supplies and buying power.</p>
          <ul className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            {hubBoard.map((b) => {
              const I = boardIcons[b.type];
              return (
                <li key={b.text} className="flex gap-3 p-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground"><I className="h-4 w-4" /></span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-brick">{b.type}</p>
                    <p className="mt-0.5">{b.text}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{b.who}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section id="permits" className="scroll-mt-24 md:self-start">
          <h2 className="flex items-center gap-2 text-xl font-semibold md:text-2xl"><FileCheck className="h-5 w-5 text-brick" />Starting a business</h2>
          <p className="mt-1 text-sm text-muted-foreground">The Detroit paperwork, one step at a time.</p>
          <ol className="mt-4 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            {permitSteps.map((s, i) => (
              <li key={s.t} className="relative flex gap-4 p-4">
                {i < permitSteps.length - 1 && <span className="absolute bottom-0 left-[31px] top-11 w-px bg-border" aria-hidden />}
                <span className="relative grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-sm font-medium text-primary-foreground">{i + 1}</span>
                <div>
                  <p className="font-medium">{s.t}</p>
                  <p className="text-sm text-muted-foreground">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-xs text-muted-foreground">General guidance only — confirm details with the City of Detroit.</p>
        </section>
      </div>
    </div>
  );
}
