import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Bike, Bus, Car, Footprints, LocateFixed, MapPin, Navigation, Plus, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { categories, neighborhoodAreas, neighborhoods, subAreas, travelModes, vendors, type Hood, type TravelMode } from "@/lib/data";
import { distanceMeters, reachMeters, travelMinutes, type LatLng } from "@/lib/geo";
import { VendorCard } from "@/components/VendorCard";
import { NeighborhoodStrip } from "@/components/NeighborhoodStrip";
import { GoogleMap, type MapPin as Pin } from "@/components/GoogleMap";

type ExploreSearch = { hood?: string };

export const Route = createFileRoute("/explore")({
  validateSearch: (s: Record<string, unknown>): ExploreSearch => (typeof s["hood"] === "string" && s["hood"] ? { hood: String(s["hood"]) } : {}),
  head: () => ({
    meta: [
      { title: "Explore local vendors — Porchlight Detroit" },
      { name: "description", content: "Browse Detroit farmers, home businesses, repair, childcare and wellness by neighborhood and block, on foot, by bike, bus or car." },
      { property: "og:title", content: "Explore local vendors — Porchlight Detroit" },
      { property: "og:description", content: "Find trusted local services within minutes of home, by foot, bike, bus or car." },
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
const MINUTE_OPTIONS = [5, 10, 15, 20] as const;

type Added = { id: string; name: string; category: string; description: string; lat: number; lng: number };
const STORAGE_KEY = "porchlight-added-businesses";
const DETROIT = { lat: 42.36, lng: -83.06 };
/** Farther than this from Detroit, measuring from "you" is meaningless for these listings. */
const FAR_FROM_DETROIT_M = 30000;

function Chip({ active, onClick, children, small }: { active: boolean; onClick: () => void; children: React.ReactNode; small?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border transition-all duration-200 active:scale-[0.97] ${small ? "px-3 py-1 text-xs" : "px-3.5 py-1.5 text-sm"} ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-secondary"}`}
    >
      {children}
    </button>
  );
}

function Explore() {
  const navigate = useNavigate();
  const [cat, setCat] = useState<string | null>(null);
  const { hood: initialHood } = Route.useSearch();
  const [hood, setHoodState] = useState<Hood | null>(initialHood && (neighborhoods as readonly string[]).includes(initialHood) ? (initialHood as Hood) : null);
  const [sub, setSub] = useState<string | null>(null);
  const [near, setNear] = useState(false);
  const [mode, setMode] = useState<TravelMode>("walk");
  const [minutes, setMinutes] = useState<number>(5);
  const [from, setFrom] = useState<"me" | "area">("me");
  const [me, setMe] = useState<LatLng | null>(null);
  const [locStatus, setLocStatus] = useState<"idle" | "locating" | "ok" | "denied">("idle");
  const [focus, setFocus] = useState<{ lat: number; lng: number; radius: number } | null>(null);
  const [added, setAdded] = useState<Added[]>([]);
  const [adding, setAdding] = useState(false);
  const [draftPos, setDraftPos] = useState<{ lat: number; lng: number } | null>(null);
  const [form, setForm] = useState({ name: "", category: categories[0] as string, description: "" });
  const mapRef = useRef<HTMLElement>(null);

  useEffect(() => {
    try {
      setAdded(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]"));
    } catch {
      /* ignore */
    }
  }, []);

  function setHood(n: Hood | null) {
    setHoodState(n);
    setSub(null);
  }

  const subList = hood ? subAreas[hood] : [];
  const subArea = subList.find((s) => s.name === sub) ?? null;
  const hoodArea = neighborhoodAreas.find((a) => a.name === hood) ?? null;
  const areaOrigin: LatLng | null = subArea ?? hoodArea;
  const areaLabel = subArea?.name ?? hood;
  const origin: LatLng | null = from === "me" && me ? me : areaOrigin;
  const farAway = !!me && distanceMeters(me, DETROIT) > FAR_FROM_DETROIT_M;
  const reachRadius = reachMeters(mode, minutes);

  function showMap() {
    mapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function locate() {
    if (!navigator.geolocation) {
      setLocStatus("denied");
      return;
    }
    setLocStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const here = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setMe(here);
        setFrom("me");
        setLocStatus("ok");
      },
      () => {
        setLocStatus("denied");
        setFrom("area");
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  function turnOnNear(nextMode?: TravelMode) {
    if (nextMode) setMode(nextMode);
    setNear(true);
    if (!me && locStatus !== "locating") locate();
    showMap();
  }

  // Whenever the "near me" view changes, zoom the map to where the user is (or their chosen spot).
  useEffect(() => {
    if (near && origin) setFocus({ lat: origin.lat, lng: origin.lng, radius: reachRadius });
    else setFocus(null);
  }, [near, origin?.lat, origin?.lng, reachRadius]);

  const minutesTo = (v: LatLng) => (origin ? travelMinutes(origin, v, mode) : undefined);

  const list = vendors
    .filter((v) => (!cat || v.category === cat) && (!hood || v.neighborhood === hood) && (!sub || v.subArea === sub))
    .filter((v) => !near || !origin || (minutesTo(v) ?? 0) <= minutes)
    .sort((a, b) => (near && origin ? (minutesTo(a) ?? 0) - (minutesTo(b) ?? 0) : 0));

  // When a specific block has nobody yet, suggest the closest locals instead of a dead end.
  const closest =
    list.length === 0 && (subArea || (near && origin))
      ? [...vendors]
          .filter((v) => !cat || v.category === cat)
          .sort((a, b) => distanceMeters((subArea ?? origin)!, a) - distanceMeters((subArea ?? origin)!, b))
          .slice(0, 3)
      : [];

  const pins = useMemo<Pin[]>(
    () => [
      ...list.map((v) => ({ id: `v:${v.slug}`, lat: v.lat, lng: v.lng, title: v.name })),
      ...added.map((a) => ({ id: `a:${a.id}`, lat: a.lat, lng: a.lng, title: a.name })),
      ...(draftPos ? [{ id: "draft", ...draftPos, title: "New business" }] : []),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [list.map((v) => v.slug).join(), added, draftPos],
  );

  const mapAreas = hood ? subList : neighborhoodAreas;

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

  let nearStatus: React.ReactNode = null;
  if (near) {
    if (locStatus === "locating" && from === "me") nearStatus = "Finding where you are…";
    else if (from === "me" && me && farAway)
      nearStatus = <>You look far from these Detroit neighborhoods, so nothing's in reach. {areaLabel ? <button type="button" className="font-medium text-primary underline-offset-2 hover:underline" onClick={() => setFrom("area")}>Measure from {areaLabel} instead</button> : "Pick your neighborhood and block above to measure from there."}</>;
    else if (from === "me" && me) nearStatus = <>Measuring from <span className="font-medium text-foreground">your exact location</span> · {list.length} local{list.length === 1 ? "" : "s"} in reach</>;
    else if (areaOrigin) nearStatus = <>Measuring from <span className="font-medium text-foreground">{areaLabel}</span> · {list.length} local{list.length === 1 ? "" : "s"} in reach</>;
    else nearStatus = locStatus === "denied" ? "Location is off. Pick your neighborhood and block above, or allow location." : "Pick your neighborhood and block above, or use your location.";
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 md:px-5 md:pt-12">
      <h1 className="animate-rise text-4xl font-semibold tracking-tight md:text-6xl">Explore your neighborhood</h1>
      <p className="mt-3 text-lg text-muted-foreground">Real people, close to home, vouched for by neighbors.</p>

      <section className="mt-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold md:text-xl">Pick a neighborhood</h2>
          {hood && <button type="button" onClick={() => setHood(null)} className="text-sm font-medium text-primary">Show all</button>}
        </div>
        <div className="mt-2">
          <NeighborhoodStrip active={hood} onSelect={setHood} compact />
        </div>

        {hood && (
          <div key={hood} className="mt-3 animate-rise rounded-2xl border border-border bg-card p-3 shadow-soft md:p-4">
            <p className="flex items-center gap-1.5 text-sm font-medium"><MapPin className="h-4 w-4 text-primary" />Which part of {hood}?</p>
            <div className="no-scrollbar -mx-3 mt-2 flex gap-2 overflow-x-auto px-3 md:mx-0 md:flex-wrap md:px-0">
              <Chip small active={!sub} onClick={() => setSub(null)}>All of {hood}</Chip>
              {subList.map((s) => {
                const n = vendors.filter((v) => v.subArea === s.name).length;
                return (
                  <Chip small key={s.name} active={sub === s.name} onClick={() => setSub(sub === s.name ? null : s.name)}>
                    {s.name}
                    {n > 0 && <span className={`rounded-full px-1.5 text-[10px] ${sub === s.name ? "bg-primary-foreground/20" : "bg-secondary"}`}>{n}</span>}
                  </Chip>
                );
              })}
            </div>
            {subArea && <p className="mt-2 text-xs text-muted-foreground">Around {subArea.hint}</p>}
          </div>
        )}
      </section>

      <div className="mt-6 space-y-4 rounded-2xl border border-border bg-card p-4 shadow-soft md:p-5">
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0">
          <Chip active={!cat} onClick={() => setCat(null)}>All types</Chip>
          {categories.map((c) => <Chip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Chip>)}
        </div>

        <div className="space-y-3 border-t border-border pt-4">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm font-medium">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={near} onChange={(e) => (e.target.checked ? turnOnNear() : setNear(false))} className="h-4 w-4 accent-primary" />
              <Navigation className="h-4 w-4 text-primary" /> Within
            </label>
            <div className="inline-flex rounded-full bg-secondary p-0.5" role="group" aria-label="Minutes">
              {MINUTE_OPTIONS.map((m) => (
                <button
                  key={m}
                  type="button"
                  aria-pressed={minutes === m}
                  onClick={() => { setMinutes(m); turnOnNear(); }}
                  className={`rounded-full px-2.5 py-0.5 text-xs transition-all ${minutes === m ? "bg-card text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {m}
                </button>
              ))}
            </div>
            <span>minutes of</span>
            <div className="inline-flex rounded-full bg-secondary p-0.5" role="group" aria-label="Measure from">
              <button type="button" aria-pressed={from === "me"} onClick={() => { setFrom("me"); turnOnNear(); }} className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs transition-all ${from === "me" ? "bg-card text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"}`}>
                <LocateFixed className="h-3 w-3" />me
              </button>
              <button type="button" aria-pressed={from === "area"} onClick={() => { setFrom("area"); setNear(true); showMap(); }} className={`max-w-[11rem] truncate rounded-full px-2.5 py-0.5 text-xs transition-all ${from === "area" ? "bg-card text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"}`}>
                {areaLabel ?? "my area"}
              </button>
            </div>
            <span>by…</span>
          </div>
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
            {travelModes.map((m) => {
              const I = modeInfo[m].icon;
              return <Chip key={m} active={near && mode === m} onClick={() => turnOnNear(m)}><I className="h-4 w-4" />{modeInfo[m].label}</Chip>;
            })}
          </div>
          {nearStatus && <p className="text-xs text-muted-foreground" aria-live="polite">{nearStatus}</p>}
        </div>
      </div>

      <section ref={mapRef} className="mt-10 scroll-mt-24">
        <div className="flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-xl font-semibold md:text-2xl"><MapPin className="h-5 w-5 text-primary" />Neighborhood map</h2>
          <button type="button" onClick={() => { setAdding(!adding); setDraftPos(null); }} className="flex items-center gap-1.5 rounded-full bg-brick px-4 py-2 text-sm font-medium text-brick-foreground shadow-soft transition hover:opacity-90 active:scale-[0.97]">
            {adding ? <><X className="h-4 w-4" />Cancel</> : <><Plus className="h-4 w-4" />Add a business</>}
          </button>
        </div>
        {!adding && (
          <p className="mt-1 text-sm text-muted-foreground">
            {near && origin ? `The blue circle is about how far you can get in ${minutes} minutes by ${modeInfo[mode].label.toLowerCase()}.` : hood ? `Tap a part of ${hood} to narrow it down.` : "Scroll or pinch to zoom, drag to move. Tap a neighborhood to see who's there."}
          </p>
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
          onLocate={(here) => { setMe(here); setLocStatus("ok"); setFrom("me"); setNear(true); }}
          me={me}
          reach={near && origin ? { ...origin, radius: reachRadius } : null}
          focus={focus}
          areas={mapAreas}
          activeArea={hood ? sub : null}
          onAreaClick={(n) => {
            if (adding) return;
            if (hood) setSub(sub === n ? null : n);
            else setHood(n as Hood);
          }}
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

      <h2 className="mt-12 text-xl font-semibold md:text-2xl">
        {sub ? `Locals in ${sub}` : hood ? `Locals in ${hood}` : near && origin ? `Within ${minutes} min` : "All locals"} <span className="text-base font-normal text-muted-foreground">· {list.length}</span>
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {list.map((v) => <VendorCard key={v.slug} v={v} mode={near ? mode : undefined} minutes={near ? minutesTo(v) : undefined} />)}
      </div>
      {list.length === 0 && (
        <div className="mt-8">
          <p className="text-center text-muted-foreground">No locals listed {sub ? `in ${sub}` : "in reach"} yet.{closest.length > 0 && " Here are the closest ones:"}</p>
          {closest.length > 0 && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {closest.map((v) => <VendorCard key={v.slug} v={v} mode={near ? mode : undefined} minutes={near ? minutesTo(v) : undefined} />)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
