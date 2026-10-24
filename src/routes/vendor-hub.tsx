import { createFileRoute } from "@tanstack/react-router";
import { hubBoard, permitSteps } from "@/lib/data";
import { FileCheck, Handshake, Hammer, Package, ShoppingBasket, Users } from "lucide-react";

export const Route = createFileRoute("/vendor-hub")({
  head: () => ({
    meta: [
      { title: "Vendor hub — Porchlight Detroit" },
      { name: "description", content: "Skill share, material share, group buying and a step-by-step guide to Detroit permits for local vendors." },
      { property: "og:title", content: "Vendor hub — Porchlight Detroit" },
      { property: "og:description", content: "Grow your Detroit business alongside your neighbors." },
    ],
  }),
  component: Hub,
});

const boardIcons = { "Skill share": Hammer, "Material share": Package, "Group buying": ShoppingBasket, "Share clients": Users } as const;
const board = hubBoard.map((b) => ({ ...b, icon: boardIcons[b.type] }));
const steps = permitSteps;

function Hub() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 md:px-5 md:pt-12">
      <h1 className="animate-rise text-4xl font-semibold tracking-tight md:text-6xl">Grow together, not alone</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">Other vendors aren't just competition. Share skills, supplies and buying power — and get through the paperwork.</p>
      <div className="mt-8 grid gap-8 md:mt-10 md:gap-10 md:grid-cols-[1.2fr_1fr]">
        <section>
          <h2 id="board" className="flex items-center gap-2 text-2xl font-semibold"><Handshake className="h-6 w-6 text-brick" />Neighbor board</h2>
          <div className="mt-4 space-y-3">
            {board.map((b) => (
              <div key={b.text} className="rounded-2xl border border-border bg-card shadow-soft p-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground"><b.icon className="h-3.5 w-3.5" />{b.type}</span>
                <p className="mt-2">{b.text}</p>
                <p className="mt-1 text-sm text-muted-foreground">— {b.who}</p>
              </div>
            ))}
          </div>
        </section>
        <section id="permits" className="rounded-2xl bg-secondary p-5 md:p-6">
          <h2 className="flex items-center gap-2 text-xl font-semibold md:text-2xl"><FileCheck className="h-6 w-6 shrink-0 text-brick" />Starting a business in Detroit</h2>
          <ol className="mt-4 space-y-4">
            {steps.map((s, i) => (
              <li key={s.t} className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-sm text-primary-foreground">{i + 1}</span>
                <div>
                  <p className="font-medium">{s.t}</p>
                  <p className="text-sm text-muted-foreground">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-xs text-muted-foreground">General guidance only — confirm details with the City of Detroit.</p>
        </section>
      </div>
    </div>
  );
}
