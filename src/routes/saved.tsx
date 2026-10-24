import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CalendarDays, ChevronDown, Compass, Handshake, Heart, Landmark, LocateFixed, MapPin, MessagesSquare, Search, SlidersHorizontal, Store, Trees, Users, X } from "lucide-react";
import { useMemo, useState } from "react";
import { neighborhoods, parks, subAreas, vendors, type Hood } from "@/lib/data";
import { useBoard } from "@/lib/board";
import { useForum } from "@/lib/forum";
import { geocodeDetroit } from "@/lib/geocode.functions";
import { filterSaved, formatMiles, groupSaved, resolveSaved, savedKindLabels, savedKinds, useSaved, type SavedGroupBy, type SavedKind, type SavedResult, type SavedSort } from "@/lib/saved";
import { HeartButton } from "@/components/HeartButton";
import { NeighborhoodArt } from "@/components/NeighborhoodArt";
import { PlacePhoto } from "@/components/PlacePhoto";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved — Detroit Local" },
      { name: "description", content: "Everything you've hearted on Detroit Local: places, parks, events, block clubs, forum threads and city services, grouped by neighborhood or distance." },
      { property: "og:title", content: "Your saved places and plans — Detroit Local" },
      { property: "og:description", content: "Heart the Detroit spots, events and threads you want to come back to, then sort them by neighborhood or what's near you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SavedPage,
});

const kindIcons: Record<SavedKind, typeof Store> = {
  vendor: Store,
  park: Trees,
  event: CalendarDays,
  club: Users,
  thread: MessagesSquare,
  board: Handshake,
  service: Landmark,
};
const RADII = [
  { m: 805, label: "½ mi" },
  { m: 1609, label: "1 mi" },
  { m: 3219, label: "2 mi" },
  { m: 8047, label: "5 mi" },
];
type Place = { label: string; lat: number; lng: number };

/** Match what the person typed against places the app already knows, before asking Google. */
function localPlace(q: string): Place | null {
  const s = q.trim().toLowerCase();
  if (s.length < 3) return null;
  for (const h of neighborhoods) {
    for (const a of subAreas[h]) if (a.name.toLowerCase().includes(s) || s.includes(a.name.toLowerCase())) return { label: `${a.name}, ${h}`, lat: a.lat, lng: a.lng };
  }
  const v = vendors.find((x) => x.name.toLowerCase() === s) ?? parks.find((x) => x.name.toLowerCase() === s);
  return v ? { label: v.name, lat: v.lat, lng: v.lng } : null;
}

function SavedLink({ it, className, children }: { it: SavedResult; className: string; children: React.ReactNode }) {
  switch (it.kind) {
    case "vendor":
      return <Link to="/vendors/$slug" params={{ slug: it.id }} className={className}>{children}</Link>;
    case "event":
      return <Link to="/events/$slug" params={{ slug: it.id }} className={className}>{children}</Link>;
    case "club":
      return <Link to="/clubs/$slug" params={{ slug: it.id }} className={className}>{children}</Link>;
    case "thread":
      return <Link to="/stories/$slug" params={{ slug: it.id }} className={className}>{children}</Link>;
    case "board":
      return <Link to="/explore" search={{ tab: "sell" }} className={className}>{children}</Link>;
    case "service":
      return <Link to="/stories" search={{ section: "services" }} hash={it.id} className={className}>{children}</Link>;
    case "park":
      return <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${it.title} Detroit`)}`} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
  }
}

function Thumb({ it }: { it: SavedResult }) {
  const I = kindIcons[it.kind];
  if ((it.kind === "vendor" || it.kind === "park") && it.neighborhood) {
    return <PlacePhoto slug={it.id} name={it.title} neighborhood={it.neighborhood} credit="tooltip" className="h-full w-full" />;
  }
  if (it.neighborhood) {
    return (
      <div className="relative h-full w-full">
        <NeighborhoodArt name={it.neighborhood} className="h-full w-full" />
        <span className="absolute bottom-1.5 left-1.5 grid h-7 w-7 place-items-center rounded-full bg-card/95 text-primary shadow-soft"><I className="h-3.5 w-3.5" /></span>
      </div>
    );
  }
  return <div className="grid h-full w-full place-items-center bg-accent text-accent-foreground"><I className="h-7 w-7" /></div>;
}

function SavedCard({ it }: { it: SavedResult }) {
  return (
    <li className="relative">
      <SavedLink it={it} className="group flex h-full gap-3.5 rounded-2xl border border-border bg-card p-3 pr-12 shadow-soft transition-[box-shadow,border-color] duration-300 ease-out hover:border-primary/25 hover:shadow-lift">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl md:h-24 md:w-24"><Thumb it={it} /></div>
        <div className="min-w-0 flex-1 py-0.5">
          <p className="text-xs font-medium text-brick">{it.category}</p>
          <h3 className="mt-0.5 line-clamp-2 font-semibold leading-snug group-hover:text-primary">{it.title}</h3>
          <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{it.subtitle}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{it.neighborhood ?? "Citywide"}</span>
            {it.distance !== null && (
              <span className="rounded-full bg-accent px-2 py-0.5 font-medium text-accent-foreground">{it.approximate ? "about " : ""}{formatMiles(it.distance)}</span>
            )}
          </div>
        </div>
      </SavedLink>
      <HeartButton kind={it.kind} id={it.id} label={it.title} variant="plain" className="absolute right-2 top-2" />
    </li>
  );
}

function Select({ label, value, onChange, children }: { label: string; value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="relative mt-1.5 flex">
        <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full appearance-none rounded-xl bg-card py-2.5 pl-3 pr-9 text-sm shadow-soft ring-1 ring-border outline-none focus-visible:ring-2 focus-visible:ring-ring">
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </span>
    </label>
  );
}

function Toggle({ on, onChange, children }: { on: boolean; onChange: (v: boolean) => void; children: React.ReactNode }) {
  return (
    <button type="button" role="switch" aria-checked={on} onClick={() => onChange(!on)} className="flex w-full items-center justify-between gap-3 py-1.5 text-sm">
      <span>{children}</span>
      <span className={`relative h-6 w-10 shrink-0 rounded-full transition-colors duration-200 ${on ? "bg-primary" : "bg-border"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow-soft transition-transform duration-200 ${on ? "translate-x-[18px]" : "translate-x-0.5"}`} />
      </span>
    </button>
  );
}

function SavedPage() {
  const { list, loaded } = useSaved();
  const { threads } = useForum();
  const { posts } = useBoard();
  const items = useMemo(() => resolveSaved(list, threads, posts), [list, threads, posts]);

  const [kind, setKind] = useState<SavedKind | null>(null);
  const [hood, setHood] = useState<Hood | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [upcomingOnly, setUpcomingOnly] = useState(false);
  const [kidFriendly, setKidFriendly] = useState(false);
  const [groupBy, setGroupBy] = useState<SavedGroupBy>("type");
  const [sort, setSort] = useState<SavedSort | "auto">("auto");
  const [showFilters, setShowFilters] = useState(false);

  const [placeText, setPlaceText] = useState("");
  const [place, setPlace] = useState<Place | null>(null);
  const [radius, setRadius] = useState(1609);
  const [placeStatus, setPlaceStatus] = useState<"idle" | "looking" | "notfound" | "error" | "denied">("idle");
  const geocode = useServerFn(geocodeDetroit);

  async function findPlace(e: React.FormEvent) {
    e.preventDefault();
    const q = placeText.trim();
    if (q.length < 2) return;
    const local = localPlace(q);
    if (local) {
      setPlace(local);
      setPlaceStatus("idle");
      return;
    }
    setPlaceStatus("looking");
    try {
      const hit = await geocode({ data: { q } });
      if (hit) {
        setPlace(hit);
        setPlaceStatus("idle");
      } else setPlaceStatus("notfound");
    } catch {
      setPlaceStatus("error");
    }
  }

  function useMyLocation() {
    if (!navigator.geolocation) return setPlaceStatus("denied");
    setPlaceStatus("looking");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPlace({ label: "My location", lat: pos.coords.latitude, lng: pos.coords.longitude });
        setPlaceText("");
        setPlaceStatus("idle");
      },
      () => setPlaceStatus("denied"),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  const kindCounts = useMemo(() => Object.fromEntries(savedKinds.map((k) => [k, items.filter((i) => i.kind === k).length])) as Record<SavedKind, number>, [items]);
  const categoryOptions = useMemo(() => [...new Set(items.filter((i) => !kind || i.kind === kind).map((i) => i.category))].sort(), [items, kind]);
  const hasEvents = items.some((i) => i.kind === "event");

  const results = useMemo(
    () =>
      filterSaved(items, {
        kinds: kind ? [kind] : undefined,
        hood,
        near: place,
        radius,
        category: category && categoryOptions.includes(category) ? category : null,
        upcomingOnly,
        kidFriendly,
        query,
        sort: sort === "auto" ? undefined : sort,
      }),
    [items, kind, hood, place, radius, category, categoryOptions, upcomingOnly, kidFriendly, query, sort],
  );
  const groups = groupSaved(results, groupBy);
  const hiddenNoPlace = place ? items.filter((i) => !i.location && (!kind || i.kind === kind)).length : 0;
  const activeCount = [hood, place, category, upcomingOnly || null, kidFriendly || null, query || null].filter(Boolean).length;

  function clearAll() {
    setHood(null);
    setPlace(null);
    setPlaceText("");
    setCategory(null);
    setUpcomingOnly(false);
    setKidFriendly(false);
    setQuery("");
    setKind(null);
    setPlaceStatus("idle");
  }

  const pill = (on: boolean) =>
    `flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${on ? "bg-foreground text-background" : "bg-card text-foreground shadow-soft ring-1 ring-border hover:bg-secondary"}`;
  const seg = (on: boolean) => `rounded-full px-3 py-1 text-sm transition-colors duration-200 ${on ? "bg-card font-medium text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"}`;

  if (loaded && items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 pt-8 md:px-5 md:pt-12">
        <h1 className="animate-rise text-4xl font-semibold tracking-tight md:text-6xl">Saved</h1>
        <div className="mx-auto mt-10 max-w-md animate-rise rounded-3xl border border-border bg-card p-8 text-center shadow-soft">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brick/10 text-brick"><Heart className="h-6 w-6" /></span>
          <h2 className="mt-4 text-2xl font-semibold">Nothing saved yet</h2>
          <p className="mt-2 text-muted-foreground">Tap the heart on any place, park, event, block club, forum thread or city service you want to come back to. It'll show up here.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Link to="/explore" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"><Compass className="h-4 w-4" />Explore locals</Link>
            <Link to="/stories" search={{ section: "community" }} className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-sm font-medium"><CalendarDays className="h-4 w-4" />Events &amp; clubs</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 md:px-5 md:pt-12">
      <div className="animate-rise">
        <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">Saved</h1>
        <p className="mt-2 text-muted-foreground">{items.length} thing{items.length === 1 ? "" : "s"} you've hearted. Sort them by neighborhood, or see what's near a place.</p>
      </div>

      <div className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 py-1 md:mx-0 md:flex-wrap md:px-0">
        <button type="button" aria-pressed={!kind} onClick={() => setKind(null)} className={pill(!kind)}><Heart className="h-4 w-4" />All<span className="text-xs opacity-60">{items.length}</span></button>
        {savedKinds.filter((k) => kindCounts[k] > 0).map((k) => {
          const I = kindIcons[k];
          return (
            <button key={k} type="button" aria-pressed={kind === k} onClick={() => setKind(kind === k ? null : k)} className={pill(kind === k)}>
              <I className="h-4 w-4" />{savedKindLabels[k]}<span className="text-xs opacity-60">{kindCounts[k]}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[280px_1fr] md:gap-8">
        <aside className={`${showFilters ? "block" : "hidden"} md:block`}>
          <div className="space-y-6 rounded-2xl border border-border bg-secondary/60 p-4 md:sticky md:top-24">
            <label className="flex items-center gap-2 rounded-xl bg-card px-3 py-2.5 shadow-soft ring-1 ring-border focus-within:ring-2 focus-within:ring-ring">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search your saved" aria-label="Search your saved" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden" />
            </label>

            <div>
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Near a place</span>
              {place ? (
                <div className="mt-1.5 flex items-center gap-2 rounded-xl bg-card px-3 py-2.5 text-sm shadow-soft ring-1 ring-primary/40">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  <span className="min-w-0 flex-1 truncate font-medium">{place.label}</span>
                  <button type="button" onClick={() => setPlace(null)} aria-label="Clear place" className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
                </div>
              ) : (
                <form onSubmit={findPlace} className="mt-1.5 flex gap-2">
                  <input value={placeText} onChange={(e) => setPlaceText(e.target.value)} placeholder="Address, area or landmark" aria-label="Near a place" className="min-w-0 flex-1 rounded-xl bg-card px-3 py-2.5 text-sm shadow-soft ring-1 ring-border outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring" />
                  <button type="submit" disabled={placeStatus === "looking"} className="rounded-xl bg-primary px-3 text-sm font-medium text-primary-foreground disabled:opacity-60">{placeStatus === "looking" ? "…" : "Go"}</button>
                </form>
              )}
              {!place && (
                <button type="button" onClick={useMyLocation} className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"><LocateFixed className="h-4 w-4" />Use my location</button>
              )}
              {placeStatus === "notfound" && <p className="mt-1.5 text-xs text-brick">Couldn't find that in Detroit. Try a street address or area name.</p>}
              {placeStatus === "error" && <p className="mt-1.5 text-xs text-brick">Couldn't look that up right now. Try an area name like Mexicantown.</p>}
              {placeStatus === "denied" && <p className="mt-1.5 text-xs text-brick">Location is off. Type a place instead.</p>}
              {place && (
                <div className="mt-2.5 grid grid-cols-4 rounded-full bg-card p-1 shadow-soft ring-1 ring-border" role="radiogroup" aria-label="Distance">
                  {RADII.map((r) => (
                    <button key={r.m} type="button" role="radio" aria-checked={radius === r.m} onClick={() => setRadius(r.m)} className={`rounded-full py-1 text-xs font-medium transition-colors ${radius === r.m ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>{r.label}</button>
                  ))}
                </div>
              )}
            </div>

            <Select label="Neighborhood" value={hood ?? ""} onChange={(v) => setHood((v || null) as Hood | null)}>
              <option value="">All neighborhoods</option>
              {neighborhoods.map((n) => <option key={n} value={n}>{n}</option>)}
            </Select>

            {categoryOptions.length > 1 && (
              <Select label="Category" value={category ?? ""} onChange={(v) => setCategory(v || null)}>
                <option value="">All categories</option>
                {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
              </Select>
            )}

            {hasEvents && (
              <div className="divide-y divide-border">
                <Toggle on={upcomingOnly} onChange={setUpcomingOnly}>Upcoming events only</Toggle>
                <Toggle on={kidFriendly} onChange={setKidFriendly}>Kid-friendly only</Toggle>
              </div>
            )}

            {activeCount > 0 && <button type="button" onClick={clearAll} className="text-sm font-medium text-primary hover:underline">Clear all filters</button>}
          </div>
        </aside>

        <section>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => setShowFilters((s) => !s)} aria-expanded={showFilters} className="inline-flex items-center gap-1.5 rounded-full bg-card px-3.5 py-2 text-sm font-medium shadow-soft ring-1 ring-border md:hidden">
              <SlidersHorizontal className="h-4 w-4" />Filters{activeCount > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] text-primary-foreground">{activeCount}</span>}
            </button>
            <div className="no-scrollbar inline-flex max-w-full overflow-x-auto rounded-full bg-secondary p-1" role="radiogroup" aria-label="Group by">
              {([["type", "Type"], ["neighborhood", "Neighborhood"], ["category", "Category"], ["none", "No groups"]] as const).map(([k, label]) => (
                <button key={k} type="button" role="radio" aria-checked={groupBy === k} onClick={() => setGroupBy(k)} className={`${seg(groupBy === k)} shrink-0`}>{label}</button>
              ))}
            </div>
            <span className="relative ml-auto inline-flex">
              <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value as SavedSort | "auto")} className="appearance-none rounded-full bg-card py-2 pl-3.5 pr-8 text-sm font-medium shadow-soft ring-1 ring-border outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="auto">{place ? "Nearest first" : "Recently saved"}</option>
                {place && <option value="recent">Recently saved</option>}
                {!place && <option value="nearest" disabled>Nearest (pick a place)</option>}
                <option value="az">A to Z</option>
                {hasEvents && <option value="soonest">Soonest events</option>}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </span>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            {results.length} of {items.length} saved{place && <> within {RADII.find((r) => r.m === radius)?.label} of {place.label}</>}
            {hiddenNoPlace > 0 && <> · {hiddenNoPlace} without a location hidden</>}
          </p>

          {groups.length > 0 ? (
            <div className="mt-2 space-y-8">
              {groups.map((g) => (
                <div key={g.label || "all"}>
                  {g.label && <h2 className="mb-3 flex items-baseline gap-2 text-xl font-semibold">{g.label}<span className="text-sm font-normal text-muted-foreground">{g.items.length}</span></h2>}
                  <ul className="grid gap-3 lg:grid-cols-2">
                    {g.items.map((it) => <SavedCard key={it.key} it={it} />)}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-3 rounded-2xl bg-secondary p-8 text-center">
              <p className="font-medium">Nothing matches these filters</p>
              <p className="mt-1 text-sm text-muted-foreground">{place ? "Try a wider distance, or another place." : "Try removing a filter."}</p>
              <button type="button" onClick={clearAll} className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Clear filters</button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
