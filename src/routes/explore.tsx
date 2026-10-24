import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Bike, Bus, Car, Footprints, MapPin, Navigation, Plus, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { categories, neighborhoodAreas, neighborhoods, travelModes, vendors, type TravelMode } from "@/lib/data";
import { VendorCard } from "@/components/VendorCard";
import { GoogleMap, type MapPin as Pin } from "@/components/GoogleMap";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore local vendors — Porchlight Detroit" },
      { name: "description", content: "Browse Detroit farmers, home businesses, repair, childcare and wellness by neighborhood, on foot, by bike, bus or car." },
      { property: "og:title", content: "Explore local vendors — Porchlight Detroit" },
      { property: "og:description", content: "Find trusted local services within five minutes of home, by foot, bike, bus or car." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Explore,
});

const modeInfo: Record<TravelMode, { label: string; icon: typeof Bus }> = {
  walk: { label: "Walk", icon: Footprints },
  bike: { label: "Bike", icon: Bike },
  bus: { label: "Bus / transit", icon: Bus },
  drive: { label: "Drive", icon: Car },
};

type Added = { id: string; name: string; category: string; description: string; lat: number; lng: number };
const STORAGE_KEY = "porchlight-added-businesses";
const DETROIT = { lat: 42.36, lng: -83.06 };

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition-colors ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-secondary"}`}>
      {children}
    </button>
  );
}

function Explore() {
  const navigate = useNavigate();
  const [cat, setCat] = useState<string | null>(null);
  const [hood, setHood] = useState<string | null>(null);
  const [near, setNear] = useState(false);
  const [mode, setMode] = useState<TravelMode>("walk");
  const [added, setAdded] = useState<Added[]>([]);
  const [adding, setAdding] = useState(false);
  const [draftPos, setDraftPos] = useState<{ lat: number; lng: number } | null>(null);
  const [form, setForm] = useState({ name: "", category: categories[0] as string, description: "" });

  useEffect(() => {
    try {
      setAdded(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]"));
    } catch {
      /* ignore */
    }
  }, []);

  const list = vendors.filter((v) => (!cat || v.category === cat) && (!hood || v.neighborhood === hood) && (!near || v.travel[mode] <= 5));

  const pins = useMemo<Pin[]>(
    () => [
      ...list.map((v) => ({ id: `v:${v.slug}`, lat: v.lat, lng: v.lng, title: v.name })),
      ...added.map((a) => ({ id: `a:${a.id}`, lat: a.lat, lng: a.lng, title: a.name })),
      ...(draftPos ? [{ id: "draft", ...draftPos, title: "New business" }] : []),
    ],
    [list.map((v) => v.slug).join(), added, draftPos],
  );

  function save(e: React.FormEvent) {
    e.preventDefault();
    if (!draftPos || !form.name.trim()) return;
    const next = [...added, { id: String(Date.now()), name: form.name.trim().slice(0, 80), category: form.category, description: form.description.trim().slice(0, 200), ...draftPos }];
    setAdded(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setAdding(false);
    setDraftPos(null);
    setForm({ name: "", category: categories[0], description: "" });
  }

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
        <div className="space-y-2 border-t border-border pt-3">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" checked={near} onChange={(e) => setNear(e.target.checked)} className="h-4 w-4 accent-primary" />
            <Navigation className="h-4 w-4 text-primary" /> Within 5 minutes of me by…
          </label>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
            {travelModes.map((m) => {
              const I = modeInfo[m].icon;
              return <Chip key={m} active={mode === m} onClick={() => { setMode(m); setNear(true); }}><I className="h-4 w-4" />{modeInfo[m].label}</Chip>;
            })}
          </div>
        </div>
      </div>

      <section className="mt-6 md:mt-8">
        <div className="flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-xl font-semibold md:text-2xl"><MapPin className="h-5 w-5 text-primary" />Neighborhood map</h2>
          <button onClick={() => { setAdding(!adding); setDraftPos(null); }} className="flex items-center gap-1.5 rounded-full bg-brick px-4 py-2 text-sm font-medium text-brick-foreground hover:opacity-90">
            {adding ? <><X className="h-4 w-4" />Cancel</> : <><Plus className="h-4 w-4" />Add a business</>}
          </button>
        </div>
        {!adding && (
          <p className="mt-1 text-sm text-muted-foreground">Scroll or pinch to zoom, drag to move. Tap a neighborhood to see who's there.</p>
        )}
        {adding && (
          <p className="mt-2 rounded-lg bg-secondary px-3 py-2 text-sm">{draftPos ? "Pin dropped. Fill in the details below." : "Tap the map where the business is to drop a pin."}</p>
        )}
        <GoogleMap
          className="mt-3 h-[60vh] min-h-[360px] md:h-[560px]"
          center={DETROIT}
          zoom={12}
          gesture="greedy"
          showLocate
          areas={neighborhoodAreas}
          activeArea={hood}
          onAreaClick={(n) => !adding && setHood(hood === n ? null : n)}
          pins={pins}
          onMapClick={(p) => adding && setDraftPos(p)}
          onPinClick={(id) => id.startsWith("v:") && navigate({ to: "/vendors/$slug", params: { slug: id.slice(2) } })}
        />
        {adding && draftPos && (
          <form onSubmit={save} className="mt-3 grid gap-3 rounded-xl border border-border bg-card p-4 md:grid-cols-2">
            <input required maxLength={80} placeholder="Business name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg border border-input bg-background px-3 py-2" />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-lg border border-input bg-background px-3 py-2">
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
            <input maxLength={200} placeholder="What do they offer? (optional)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="rounded-lg border border-input bg-background px-3 py-2 md:col-span-2" />
            <button className="rounded-full bg-primary px-5 py-2.5 font-medium text-primary-foreground md:col-span-2">Add to the map</button>
          </form>
        )}
        {added.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium uppercase tracking-widest text-brick">Added by neighbors</h3>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {added.map((a) => (
                <li key={a.id} className="rounded-lg border border-border bg-card p-3 text-sm">
                  <p className="font-medium">{a.name}</p>
                  <p className="text-xs text-muted-foreground">{a.category}{a.description && ` · ${a.description}`}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {list.map((v) => <VendorCard key={v.slug} v={v} mode={near ? mode : undefined} />)}
      </div>
      {list.length === 0 && <p className="mt-10 text-center text-muted-foreground">No matches yet — try another neighborhood or way of getting there.</p>}
    </div>
  );
}
