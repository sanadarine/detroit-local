import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Baby, ChevronDown, ChevronRight, Coffee, Compass, Hammer, Leaf, LocateFixed, MapPin, Navigation, Plus, Scissors, ShoppingBasket, Sprout, Star, Store, Trees, Utensils, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { categories, neighborhoodAreas, neighborhoods, parks, subAreas, travelModes, vendors, type Hood, type Park, type TravelMode, type Vendor } from "@/lib/data";
import { distanceMeters, reachMeters, travelMinutes, type LatLng } from "@/lib/geo";
import { NeighborhoodStrip } from "@/components/NeighborhoodStrip";
import { PlacePhoto } from "@/components/PlacePhoto";
import { SellerHub } from "@/components/SellerHub";
import { GoogleMap, type MapPin as Pin } from "@/components/GoogleMap";

type ExploreSearch = { hood?: string; tab?: "sell"; show?: "parks" };

export const Route = createFileRoute("/explore")({
  validateSearch: (s: Record<string, unknown>): ExploreSearch => ({
    ...(typeof s["hood"] === "string" && s["hood"] ? { hood: String(s["hood"]) } : {}),
    ...(s["tab"] === "sell" ? { tab: "sell" as const } : {}),
    ...(s["show"] === "parks" ? { show: "parks" as const } : {}),
  }),
  head: () => ({
    meta: [
      { title: "Explore local sellers — Detroit Local" },
      { name: "description", content: "Find Detroit farmers, home businesses, repair, childcare and wellness by neighborhood and block — or put your own business on the map." },
      { property: "og:title", content: "Explore local sellers — Detroit Local" },
      { property: "og:description", content: "Trusted local services within minutes of home, plus help for Detroit sellers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Explore,
});

const modeLabel: Record<TravelMode, string> = { walk: "walking", bike: "biking", bus: "by bus", drive: "driving" };
const catIcon: Record<string, typeof Store> = {
  "Farms & gardens": Sprout,
  "Food businesses": Utensils,
  "Coffee & bakeries": Coffee,
  "Markets & grocers": ShoppingBasket,
  "Home services": Hammer,
  "Childcare & kids": Baby,
  Wellness: Leaf,
  "Beauty & barbers": Scissors,
  "Shops & makers": Store,
};
const PARKS = "Parks";
const MINUTE_OPTIONS = [5, 10, 15, 20] as const;

type Added = { id: string; name: string; category: string; description: string; lat: number; lng: number };
const STORAGE_KEY = "porchlight-added-businesses";
const DETROIT = { lat: 42.36, lng: -83.06 };
/** Farther than this from Detroit, measuring from "you" is meaningless for these listings. */
const FAR_FROM_DETROIT_M = 30000;

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200 active:scale-[0.97] ${active ? "bg-foreground text-background" : "bg-card text-foreground shadow-soft ring-1 ring-border hover:bg-secondary"}`}
    >
      {children}
    </button>
  );
}

/** Rounded native menu that reads as part of a sentence. */
function Menu({ value, onChange, label, children }: { value: string; onChange: (v: string) => void; label: string; children: React.ReactNode }) {
  return (
    <span className="relative inline-flex">
      <select aria-label={label} value={value} onChange={(e) => onChange(e.target.value)} className="appearance-none rounded-full bg-card py-1 pl-3 pr-7 font-semibold text-primary shadow-soft ring-1 ring-border outline-none focus-visible:ring-2 focus-visible:ring-ring">
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-primary" />
    </span>
  );
}

function ResultRow({ v, minutes, mode }: { v: Vendor; minutes?: number | undefined; mode: TravelMode }) {
  const I = catIcon[v.category] ?? Store;
  return (
    <Link to="/vendors/$slug" params={{ slug: v.slug }} className="group flex gap-4 rounded-2xl p-2.5 transition-colors hover:bg-card md:p-3">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl shadow-soft md:h-28 md:w-28">
        <PlacePhoto slug={v.slug} name={v.name} neighborhood={v.neighborhood} credit="tooltip" className="h-full w-full" />
        <span className="absolute bottom-1.5 left-1.5 grid h-7 w-7 place-items-center rounded-full bg-card/95 text-primary shadow-soft"><I className="h-3.5 w-3.5" /></span>
      </div>
      <div className="min-w-0 flex-1 py-0.5">
        <p className="text-xs text-muted-foreground">{v.category}</p>
        <h3 className="mt-0.5 truncate text-lg font-semibold leading-snug group-hover:text-primary">{v.name}</h3>
        <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{v.tagline}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          {v.rating && (
            <span className="inline-flex items-center gap-1 font-medium"><Star className="h-3.5 w-3.5 fill-brick text-brick" />{v.rating.stars.toFixed(1)} <span className="font-normal text-muted-foreground">({v.rating.count})</span></span>
          )}
          <span className="inline-flex items-center gap-1 text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{v.subArea}</span>
          {minutes !== undefined && <span className="rounded-full bg-accent px-2 py-0.5 font-medium text-accent-foreground">{minutes} min {modeLabel[mode]}</span>}
        </div>
      </div>
    </Link>
  );
}

function ParkRow({ p, minutes, mode }: { p: Park; minutes?: number | undefined; mode: TravelMode }) {
  return (
    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${p.name} ${p.address}`)}`} target="_blank" rel="noopener noreferrer" className="group flex gap-4 rounded-2xl p-2.5 transition-colors hover:bg-card md:p-3">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl shadow-soft md:h-28 md:w-28">
        <PlacePhoto slug={p.slug} name={p.name} neighborhood={p.neighborhood} credit="tooltip" className="h-full w-full" />
        <span className="absolute bottom-1.5 left-1.5 grid h-7 w-7 place-items-center rounded-full bg-card/95 text-primary shadow-soft"><Trees className="h-3.5 w-3.5" /></span>
      </div>
      <div className="min-w-0 flex-1 py-0.5">
        <p className="text-xs text-muted-foreground">Park</p>
        <h3 className="mt-0.5 truncate text-lg font-semibold leading-snug group-hover:text-primary">{p.name}</h3>
        <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">{p.about}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span className="inline-flex items-center gap-1 text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{p.subArea}</span>
          {p.features.slice(0, 3).map((f) => <span key={f} className="rounded-full bg-secondary px-2 py-0.5">{f}</span>)}
          {minutes !== undefined && <span className="rounded-full bg-accent px-2 py-0.5 font-medium text-accent-foreground">{minutes} min {modeLabel[mode]}</span>}
        </div>
      </div>
    </a>
  );
}

function Explore() {
  const navigate = useNavigate();
  const { hood: initialHood, tab, show } = Route.useSearch();
  const selling = tab === "sell";
  const [cat, setCat] = useState<string | null>(show === "parks" ? PARKS : null);
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
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      setAdded(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]"));
    } catch {
      /* ignore */
    }
  }, []);

  function setTab(next: "find" | "sell") {
    navigate({ to: "/explore", search: (prev) => ({ ...(prev.hood ? { hood: prev.hood } : {}), ...(next === "sell" ? { tab: "sell" as const } : {}) }), replace: true });
  }

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

  /** On phones the map sits above the list, so bring it into view; on desktop it's always visible. */
  function showMap() {
    if (window.matchMedia("(max-width: 1023px)").matches) mapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function locate() {
    if (!navigator.geolocation) {
      setLocStatus("denied");
      setFrom("area");
      return;
    }
    setLocStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setMe({ lat: pos.coords.latitude, lng: pos.coords.longitude });
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

  function toggleNear() {
    if (near) {
      setNear(false);
      return;
    }
    setNear(true);
    if (from === "me" && !me && locStatus !== "locating") locate();
    showMap();
  }

  // Whenever the "near me" view changes, zoom the map to where the user is (or their chosen spot).
  useEffect(() => {
    if (near && origin) setFocus({ lat: origin.lat, lng: origin.lng, radius: reachRadius });
    else setFocus(null);
  }, [near, origin?.lat, origin?.lng, reachRadius]);

  const minutesTo = (v: LatLng) => (origin ? travelMinutes(origin, v, mode) : undefined);
  const nearActive = near && !!origin;

  const showParks = cat === PARKS;
  const inPlace = <T extends { neighborhood: string; subArea: string }>(x: T) => (!hood || x.neighborhood === hood) && (!sub || x.subArea === sub);
  const parkList = parks
    .filter(inPlace)
    .filter((p) => !nearActive || (minutesTo(p) ?? 0) <= minutes)
    .sort((a, b) => (nearActive ? (minutesTo(a) ?? 0) - (minutesTo(b) ?? 0) : 0));
  const list = (showParks ? [] : vendors)
    .filter((v) => (!cat || v.category === cat) && inPlace(v))
    .filter((v) => !nearActive || (minutesTo(v) ?? 0) <= minutes)
    .sort((a, b) => (nearActive ? (minutesTo(a) ?? 0) - (minutesTo(b) ?? 0) : 0));

  // When a specific block has nobody yet, suggest the closest locals instead of a dead end.
  const anchor = subArea ?? (nearActive ? origin : null);
  const closest =
    list.length === 0 && !showParks && anchor
      ? [...vendors].filter((v) => !cat || v.category === cat || showParks).sort((a, b) => distanceMeters(anchor, a) - distanceMeters(anchor, b)).slice(0, 3)
      : [];

  const pins = useMemo<Pin[]>(
    () => [
      ...list.map((v) => ({ id: `v:${v.slug}`, lat: v.lat, lng: v.lng, title: v.name })),
      ...(showParks ? parkList.map((p) => ({ id: `p:${p.slug}`, lat: p.lat, lng: p.lng, title: p.name, approximate: p.approximate })) : []),
      ...added.map((a) => ({ id: `a:${a.id}`, lat: a.lat, lng: a.lng, title: a.name })),
      ...(draftPos ? [{ id: "draft", ...draftPos, title: "New business" }] : []),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [list.map((v) => v.slug).join(), showParks, parkList.map((p) => p.slug).join(), added, draftPos],
  );

  function startAdding() {
    setAdding(true);
    setDraftPos(null);
    setTimeout(() => mapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
  }

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
      nearStatus = <>You seem far from these neighborhoods. {areaLabel ? <button type="button" className="font-medium text-primary hover:underline" onClick={() => setFrom("area")}>Measure from {areaLabel}</button> : "Pick a neighborhood above to measure from there."}</>;
    else if (!origin) nearStatus = locStatus === "denied" ? "Location is off — pick a neighborhood above to measure from there." : "Pick a neighborhood above, or allow your location.";
  }

  const segment = (active: boolean) =>
    `flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 md:flex-none md:px-6 ${active ? "bg-card text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"}`;

  const resultsTitle = sub ?? hood ?? (nearActive ? `Within ${minutes} min` : "All of Detroit");

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 md:px-5 md:pt-12">
      <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="animate-rise text-4xl font-semibold tracking-tight md:text-6xl">Explore</h1>
          <p className="mt-2 text-lg text-muted-foreground">{selling ? "Grow your business alongside your neighbors." : "Trusted locals, close to home."}</p>
        </div>
        <div className="flex rounded-full bg-secondary p-1" role="tablist" aria-label="Explore sections">
          <button type="button" role="tab" aria-selected={!selling} onClick={() => setTab("find")} className={segment(!selling)}><Compass className="h-4 w-4" />Find locals</button>
          <button type="button" role="tab" aria-selected={selling} onClick={() => setTab("sell")} className={segment(selling)}><Store className="h-4 w-4" />For sellers</button>
        </div>
      </header>

      {selling ? (
        <div className="mt-8">
          <SellerHub />
        </div>
      ) : (
        <>
          {/* Where */}
          <section className="mt-8" aria-labelledby="where">
            <div className="flex items-baseline justify-between">
              <h2 id="where" className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Neighborhood</h2>
              {hood && <button type="button" onClick={() => setHood(null)} className="text-sm font-medium text-primary">Clear</button>}
            </div>
            <div className="mt-3">
              <NeighborhoodStrip active={hood} onSelect={setHood} compact />
            </div>

            {hood && (
              <div key={hood} className="mt-3 animate-rise">
                <div className="no-scrollbar -mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
                  <div className="inline-flex rounded-full bg-secondary p-1" role="radiogroup" aria-label={`Part of ${hood}`}>
                    {[{ name: null as string | null, label: "All" }, ...subList.map((s) => ({ name: s.name as string | null, label: s.name }))].map((o) => {
                      const on = sub === o.name;
                      return (
                        <button
                          key={o.label}
                          type="button"
                          role="radio"
                          aria-checked={on}
                          onClick={() => setSub(o.name)}
                          className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm transition-all duration-200 ${on ? "bg-card font-medium text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"}`}
                        >
                          {o.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{subArea ? `Around ${subArea.hint}` : `Showing all of ${hood}. Narrow it down to your part of the neighborhood.`}</p>
              </div>
            )}
          </section>

          {/* What + how close */}
          <section className="mt-6" aria-label="Filters">
            <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-1 md:mx-0 md:flex-wrap md:px-0">
              <button
                type="button"
                onClick={toggleNear}
                aria-pressed={near}
                className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200 active:scale-[0.97] ${near ? "bg-primary text-primary-foreground shadow-soft" : "bg-card text-primary shadow-soft ring-1 ring-border hover:bg-secondary"}`}
              >
                <Navigation className="h-4 w-4" />Near me
              </button>
              <span className="mx-1 my-1.5 w-px shrink-0 bg-border" aria-hidden />
              <Pill active={!cat} onClick={() => setCat(null)}>All</Pill>
              {categories.map((c) => {
                const I = catIcon[c] ?? Store;
                return <Pill key={c} active={cat === c} onClick={() => setCat(cat === c ? null : c)}><I className="h-4 w-4" />{c}</Pill>;
              })}
              <Pill active={showParks} onClick={() => setCat(showParks ? null : PARKS)}><Trees className="h-4 w-4" />Parks</Pill>
            </div>

            {near && (
              <div className="mt-3 animate-rise rounded-2xl bg-secondary px-4 py-3">
                <p className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[15px]">
                  <span>Within</span>
                  <Menu label="Minutes" value={String(minutes)} onChange={(v) => setMinutes(Number(v))}>
                    {MINUTE_OPTIONS.map((m) => <option key={m} value={m}>{m} min</option>)}
                  </Menu>
                  <Menu label="How you get around" value={mode} onChange={(v) => setMode(v as TravelMode)}>
                    {travelModes.map((m) => <option key={m} value={m}>{modeLabel[m]}</option>)}
                  </Menu>
                  <span>from</span>
                  <Menu
                    label="Measure from"
                    value={from}
                    onChange={(v) => {
                      setFrom(v as "me" | "area");
                      if (v === "me" && !me) locate();
                    }}
                  >
                    <option value="me">my location</option>
                    <option value="area" disabled={!areaLabel}>{areaLabel ?? "a neighborhood (pick above)"}</option>
                  </Menu>
                  <button type="button" onClick={() => setNear(false)} aria-label="Turn off near me" className="ml-auto grid h-7 w-7 place-items-center rounded-full text-muted-foreground hover:bg-card hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                </p>
                {nearStatus && <p className="mt-2 text-xs text-muted-foreground" aria-live="polite">{nearStatus}</p>}
              </div>
            )}
          </section>

          {/* Results: list + map */}
          <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-8" aria-labelledby="results">
            <div ref={mapRef} className="scroll-mt-24 lg:order-2">
              <div className="lg:sticky lg:top-24">
                <div className="relative">
                  <GoogleMap
                    className="h-[46vh] min-h-[320px] rounded-3xl shadow-soft lg:h-[calc(100vh-8rem)]"
                    center={DETROIT}
                    zoom={12}
                    gesture="greedy"
                    showLocate
                    onLocate={(here) => { setMe(here); setLocStatus("ok"); setFrom("me"); setNear(true); }}
                    me={me}
                    reach={nearActive && origin ? { ...origin, radius: reachRadius } : null}
                    focus={focus}
                    areas={hood ? subList : neighborhoodAreas}
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
                  <div className="pointer-events-none absolute inset-x-3 top-3 flex justify-start">
                    {adding ? (
                      <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-card/95 py-1.5 pl-4 pr-1.5 text-sm shadow-lift backdrop-blur">
                        {draftPos ? "Pin dropped" : "Tap where the business is"}
                        <button type="button" onClick={() => { setAdding(false); setDraftPos(null); }} className="rounded-full bg-secondary px-3 py-1 font-medium">Cancel</button>
                      </div>
                    ) : (
                      <button type="button" onClick={startAdding} className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-card/95 px-3.5 py-2 text-sm font-medium shadow-lift backdrop-blur transition hover:bg-card active:scale-[0.97]">
                        <Plus className="h-4 w-4 text-brick" />Add a business
                      </button>
                    )}
                  </div>
                  {adding && draftPos && (
                    <form onSubmit={save} className="absolute inset-x-3 bottom-3 grid animate-rise gap-2 rounded-2xl bg-card p-3 shadow-lift sm:grid-cols-2">
                      <input required autoFocus maxLength={80} placeholder="Business name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-xl bg-secondary px-3 py-2 outline-none focus:ring-2 focus:ring-ring/30" />
                      <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-xl bg-secondary px-3 py-2 outline-none">
                        {categories.map((c) => <option key={c}>{c}</option>)}
                      </select>
                      <input maxLength={200} placeholder="What do they offer? (optional)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="rounded-xl bg-secondary px-3 py-2 outline-none focus:ring-2 focus:ring-ring/30 sm:col-span-2" />
                      <button className="rounded-full bg-primary px-5 py-2.5 font-medium text-primary-foreground sm:col-span-2">Add to the map</button>
                    </form>
                  )}
                </div>
                <p className="mt-2 px-1 text-xs text-muted-foreground">
                  {nearActive ? `Blue circle ≈ how far you get in ${minutes} min ${modeLabel[mode]}.` : hood ? `Tap a part of ${hood} on the map to narrow it down.` : "Pinch or scroll to zoom. Tap a neighborhood to explore it."}
                </p>
              </div>
            </div>

            <div className="lg:order-1">
              <button
                type="button"
                onClick={startAdding}
                className="group mb-6 flex w-full items-center gap-3 rounded-2xl bg-primary p-3.5 text-left text-primary-foreground shadow-soft transition active:scale-[0.99] md:p-4"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-foreground/15"><Plus className="h-5 w-5" /></span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">Put your business on the map</span>
                  <span className="block text-sm opacity-80">Drop a pin so neighbors nearby can find you.</span>
                </span>
                <ChevronRight className="h-5 w-5 shrink-0 opacity-70 transition-transform group-hover:translate-x-0.5" />
              </button>
              <h2 id="results" className="flex items-baseline gap-2 px-1 text-2xl font-semibold tracking-tight">
                {resultsTitle}
                <span className="text-base font-normal text-muted-foreground">{showParks ? `${parkList.length} park${parkList.length === 1 ? "" : "s"}` : `${list.length} local${list.length === 1 ? "" : "s"}`}</span>
              </h2>
              {nearActive && from === "me" && me && !farAway && <p className="mt-0.5 flex items-center gap-1 px-1 text-xs text-muted-foreground"><LocateFixed className="h-3 w-3" />Closest to you first</p>}

              <div className="mt-3 -mx-2.5 divide-y divide-border/70 md:-mx-3">
                {list.map((v) => <ResultRow key={v.slug} v={v} mode={mode} minutes={nearActive ? minutesTo(v) : undefined} />)}
                {showParks && parkList.map((p) => <ParkRow key={p.slug} p={p} mode={mode} minutes={nearActive ? minutesTo(p) : undefined} />)}
              </div>

              {(showParks ? parkList.length === 0 : list.length === 0) && (
                <div className="mt-4 rounded-2xl bg-secondary p-5 text-center">
                  <p className="font-medium">No {showParks ? "parks" : "locals"} listed {sub ? `in ${sub}` : nearActive ? "that close" : "here"} yet</p>
                  <p className="mt-1 text-sm text-muted-foreground">{closest.length > 0 ? "These are the closest ones:" : "Try another neighborhood or category."}</p>
                </div>
              )}
              {closest.length > 0 && (
                <div className="mt-2 -mx-2.5 divide-y divide-border/70 md:-mx-3">
                  {closest.map((v) => <ResultRow key={v.slug} v={v} mode={mode} minutes={near && origin ? minutesTo(v) : undefined} />)}
                </div>
              )}

              {added.length > 0 && (
                <div className="mt-8">
                  <h3 className="px-1 text-sm font-semibold uppercase tracking-widest text-muted-foreground">Added by neighbors</h3>
                  <ul className="mt-2 divide-y divide-border/70 overflow-hidden rounded-2xl bg-card shadow-soft ring-1 ring-border">
                    {added.map((a) => (
                      <li key={a.id} className="flex items-center gap-3 p-3 text-sm">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground"><MapPin className="h-4 w-4" /></span>
                        <div className="min-w-0">
                          <p className="font-medium">{a.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{a.category}{a.description && ` · ${a.description}`}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
