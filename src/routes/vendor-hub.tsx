import { createFileRoute } from "@tanstack/react-router";

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

const board = [
  { type: "Skill share", text: "I'll teach canning basics in exchange for help with my website.", who: "Denise, Bagley" },
  { type: "Material share", text: "Extra raised-bed lumber and 20 bags of compost — free to a grower.", who: "Marcus, North End" },
  { type: "Group buying", text: "Splitting a bulk order of pie tins and boxes. 4 spots left.", who: "Auntie Dee's" },
  { type: "Share clients", text: "Booked through December — happy to refer porch jobs to another fixer.", who: "Ray, Jefferson-Chalmers" },
];

const steps = [
  { t: "Pick your business type", d: "Cottage food, home occupation, or storefront — each has different rules." },
  { t: "Register your business name", d: "File an assumed name (DBA) with Wayne County." },
  { t: "Check zoning and licenses", d: "Detroit's Buildings, Safety Engineering & Environmental Department (BSEED) handles most permits." },
  { t: "Get your tax ID", d: "A free EIN from the IRS and a Michigan sales tax license if you sell goods." },
  { t: "Find free help", d: "Detroit has free small-business coaching programs — ask us to connect you." },
];

function Hub() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-12">
      <h1 className="text-4xl font-semibold md:text-5xl">Grow together, not alone</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">Other vendors aren't just competition. Share skills, supplies and buying power — and get through the paperwork.</p>
      <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <section>
          <h2 className="text-2xl font-semibold">Neighbor board</h2>
          <div className="mt-4 space-y-3">
            {board.map((b) => (
              <div key={b.text} className="rounded-xl border border-border bg-card p-4">
                <span className="rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">{b.type}</span>
                <p className="mt-2">{b.text}</p>
                <p className="mt-1 text-sm text-muted-foreground">— {b.who}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-xl bg-secondary p-6">
          <h2 className="text-2xl font-semibold">Starting a business in Detroit</h2>
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
