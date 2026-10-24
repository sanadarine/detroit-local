import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "lucide-react";
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
    <button onClick={onClick} className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition-colors ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-secondary"}`}>
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
    <div className="mx-auto max-w-6xl px-4 pt-8 md:px-5 md:pt-12">
      <h1 className="text-3xl font-semibold md:text-5xl">Explore your neighborhood</h1>
      <p className="mt-2 text-muted-foreground">Real people, close to home, vouched for by neighbors.</p>

      <div className="mt-6 space-y-3 rounded-xl border border-border bg-card p-4 md:mt-8 md:space-y-4 md:p-5">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
          <Chip active={!cat} onClick={() => setCat(null)}>All types</Chip>
          {categories.map((c) => <Chip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Chip>)}
        </div>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
          <Chip active={!hood} onClick={() => setHood(null)}>All neighborhoods</Chip>
          {neighborhoods.map((n) => <Chip key={n} active={hood === n} onClick={() => setHood(n)}>{n}</Chip>)}
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={near} onChange={(e) => setNear(e.target.checked)} className="h-4 w-4 accent-primary" />
          <Navigation className="h-4 w-4 text-primary" /> Within 5 minutes of me
        </label>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:mt-8 md:gap-6 lg:grid-cols-3">
        {list.map((v) => <VendorCard key={v.slug} v={v} />)}
      </div>
      {list.length === 0 && <p className="mt-10 text-center text-muted-foreground">No matches yet — try another neighborhood.</p>}
    </div>
  );
}
