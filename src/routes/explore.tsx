import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { categories, neighborhoods, vendors } from "@/lib/data";
import { VendorCard } from "@/components/VendorCard";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore local vendors — Porchlight Detroit" },
      { name: "description", content: "Browse Detroit farmers, home businesses, repair, childcare and wellness by neighborhood." },
      { property: "og:title", content: "Explore local vendors — Porchlight Detroit" },
      { property: "og:description", content: "Find trusted local services within five minutes of home." },
    ],
  }),
  component: Explore,
});

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-secondary"}`}>
      {children}
    </button>
  );
}

function Explore() {
  const [cat, setCat] = useState<string | null>(null);
  const [hood, setHood] = useState<string | null>(null);
  const [near, setNear] = useState(false);
  const list = vendors.filter((v) => (!cat || v.category === cat) && (!hood || v.neighborhood === hood) && (!near || v.minutesAway <= 5));

  return (
    <div className="mx-auto max-w-6xl px-5 pt-12">
      <h1 className="text-4xl font-semibold md:text-5xl">Explore your neighborhood</h1>
      <p className="mt-2 text-muted-foreground">Real people, close to home, vouched for by neighbors.</p>

      <div className="mt-8 space-y-4 rounded-xl border border-border bg-card p-5">
        <div className="flex flex-wrap gap-2">
          <Chip active={!cat} onClick={() => setCat(null)}>All types</Chip>
          {categories.map((c) => <Chip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Chip>)}
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip active={!hood} onClick={() => setHood(null)}>All neighborhoods</Chip>
          {neighborhoods.map((n) => <Chip key={n} active={hood === n} onClick={() => setHood(n)}>{n}</Chip>)}
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={near} onChange={(e) => setNear(e.target.checked)} className="h-4 w-4 accent-primary" />
          Within 5 minutes of me
        </label>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {list.map((v) => <VendorCard key={v.slug} v={v} />)}
      </div>
      {list.length === 0 && <p className="mt-10 text-center text-muted-foreground">No matches yet — try another neighborhood.</p>}
    </div>
  );
}
