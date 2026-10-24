import { useCallback, useEffect, useState } from "react";
import { blockClubs, cityServices, events, neighborhoodAreas, neighborhoods, parks, vendors, type Hood, type Thread } from "@/lib/data";
import type { BoardPost } from "@/lib/board";
import { distanceMeters, type LatLng } from "@/lib/geo";

/** Everything a neighbor can heart. */
export const savedKinds = ["vendor", "park", "event", "club", "thread", "board", "service"] as const;
export type SavedKind = (typeof savedKinds)[number];
export type SavedRef = { kind: SavedKind; id: string; savedAt: string };

export const savedKindLabels: Record<SavedKind, string> = {
  vendor: "Places",
  park: "Parks",
  event: "Events",
  club: "Block clubs",
  thread: "Forum threads",
  board: "Seller listings",
  service: "City services",
};

/** Add the item if it isn't saved yet, otherwise remove it. Newest saves come first. */
export function toggleSaved(list: SavedRef[], kind: SavedKind, id: string, now: string): SavedRef[] {
  if (list.some((r) => r.kind === kind && r.id === id)) return list.filter((r) => !(r.kind === kind && r.id === id));
  return [{ kind, id, savedAt: now }, ...list];
}

// Demo-only storage: hearts live in this browser until the app gets shared saving.
const KEY = "detroit-local-saved-v1";
const EVENT = "detroit-local-saved-change";

function read(): SavedRef[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]") as SavedRef[];
    return Array.isArray(raw) ? raw.filter((r) => r && (savedKinds as readonly string[]).includes(r.kind) && typeof r.id === "string") : [];
  } catch {
    return [];
  }
}

export function useSaved() {
  const [list, setList] = useState<SavedRef[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const sync = () => {
      setList(read());
      setLoaded(true);
    };
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((kind: SavedKind, id: string) => {
    const next = toggleSaved(read(), kind, id, new Date().toISOString());
    localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const isSaved = useCallback((kind: SavedKind, id: string) => list.some((r) => r.kind === kind && r.id === id), [list]);

  return { list, loaded, toggle, isSaved };
}

/** A saved thing, flattened so the Saved page can filter and group across kinds. */
export type SavedItem = {
  key: string;
  kind: SavedKind;
  id: string;
  title: string;
  subtitle: string;
  category: string;
  neighborhood: Hood | null;
  /** null when the thing isn't tied to a place (e.g. a city phone line) */
  location: LatLng | null;
  /** true when the location is only the neighborhood's center */
  approximate: boolean;
  savedAt: string;
  /** ISO date for events */
  when?: string | undefined;
  kidFriendly?: boolean | undefined;
};

const hoodCenter = (h: Hood): LatLng => {
  const a = neighborhoodAreas.find((x) => x.name === h);
  return a ? { lat: a.lat, lng: a.lng } : { lat: 42.36, lng: -83.06 };
};
const asHood = (s: string | undefined | null): Hood | null => ((neighborhoods as readonly string[]).includes(s ?? "") ? (s as Hood) : null);

export function resolveSaved(refs: SavedRef[], threads: Thread[], boardPosts: BoardPost[]): SavedItem[] {
  const items: SavedItem[] = [];
  for (const r of refs) {
    const base = { key: `${r.kind}:${r.id}`, kind: r.kind, id: r.id, savedAt: r.savedAt };
    if (r.kind === "vendor") {
      const v = vendors.find((x) => x.slug === r.id);
      if (v) items.push({ ...base, title: v.name, subtitle: v.tagline, category: v.category, neighborhood: v.neighborhood, location: { lat: v.lat, lng: v.lng }, approximate: false });
    } else if (r.kind === "park") {
      const p = parks.find((x) => x.slug === r.id);
      if (p) items.push({ ...base, title: p.name, subtitle: p.about, category: "Parks", neighborhood: p.neighborhood, location: { lat: p.lat, lng: p.lng }, approximate: !!p.approximate });
    } else if (r.kind === "event") {
      const e = events.find((x) => x.slug === r.id);
      if (!e) continue;
      const host = e.hostVendor ? vendors.find((v) => v.slug === e.hostVendor) : undefined;
      items.push({
        ...base,
        title: e.title,
        subtitle: `${e.date} · ${e.time} · ${e.place}`,
        category: e.kidFriendly ? "Kid-friendly events" : "Events",
        neighborhood: e.neighborhood,
        location: host ? { lat: host.lat, lng: host.lng } : hoodCenter(e.neighborhood),
        approximate: !host,
        when: e.iso,
        kidFriendly: e.kidFriendly,
      });
    } else if (r.kind === "club") {
      const c = blockClubs.find((x) => x.slug === r.id);
      if (c) items.push({ ...base, title: c.name, subtitle: `Meets ${c.meets}`, category: "Block clubs", neighborhood: c.neighborhood, location: hoodCenter(c.neighborhood), approximate: true });
    } else if (r.kind === "thread") {
      const t = threads.find((x) => x.slug === r.id);
      if (!t) continue;
      const h = asHood(t.neighborhood);
      items.push({ ...base, title: t.title, subtitle: `${t.person} · ${t.replies.length} replies`, category: t.category, neighborhood: h, location: h ? hoodCenter(h) : null, approximate: true });
    } else if (r.kind === "board") {
      const p = boardPosts.find((x) => x.id === r.id);
      if (!p) continue;
      const h = asHood(p.neighborhood);
      items.push({ ...base, title: p.title, subtitle: `${p.kind === "offer" ? "Offering" : "Looking for"} · ${p.author}`, category: p.tag, neighborhood: h, location: h ? hoodCenter(h) : null, approximate: true });
    } else {
      const s = cityServices.find((x) => x.id === r.id);
      if (s) items.push({ ...base, title: s.name, subtitle: s.phone ?? s.what, category: s.category, neighborhood: null, location: null, approximate: false });
    }
  }
  return items;
}

export type SavedSort = "recent" | "nearest" | "az" | "soonest";
export type SavedFilters = {
  kinds?: SavedKind[] | undefined;
  hood?: Hood | null | undefined;
  near?: LatLng | null | undefined;
  /** meters; used with `near` */
  radius?: number | undefined;
  category?: string | null | undefined;
  upcomingOnly?: boolean | undefined;
  kidFriendly?: boolean | undefined;
  query?: string | undefined;
  /** ISO date for "today", used by upcomingOnly */
  today?: string | undefined;
  sort?: SavedSort | undefined;
};

export type SavedResult = SavedItem & { distance: number | null };

export function filterSaved(items: SavedItem[], f: SavedFilters): SavedResult[] {
  const words = (f.query ?? "").toLowerCase().split(/\s+/).filter(Boolean);
  const today = (f.today ?? new Date().toISOString()).slice(0, 10);
  const out: SavedResult[] = [];
  for (const it of items) {
    if (f.kinds && f.kinds.length && !f.kinds.includes(it.kind)) continue;
    if (f.hood && it.neighborhood !== f.hood) continue;
    if (f.category && it.category !== f.category) continue;
    if (f.kidFriendly && !it.kidFriendly) continue;
    if (f.upcomingOnly && it.kind === "event" && (it.when ?? "") < today) continue;
    if (words.length && !words.every((w) => `${it.title} ${it.subtitle} ${it.category} ${it.neighborhood ?? ""}`.toLowerCase().includes(w))) continue;
    const distance = f.near && it.location ? distanceMeters(f.near, it.location) : null;
    if (f.near && (distance === null || distance > (f.radius ?? 1609))) continue;
    out.push({ ...it, distance });
  }
  const sort = f.sort ?? (f.near ? "nearest" : "recent");
  out.sort((a, b) => {
    if (sort === "nearest") return (a.distance ?? Infinity) - (b.distance ?? Infinity);
    if (sort === "az") return a.title.localeCompare(b.title);
    if (sort === "soonest") return (a.when ?? "9999").localeCompare(b.when ?? "9999");
    return b.savedAt.localeCompare(a.savedAt);
  });
  return out;
}

export type SavedGroupBy = "type" | "neighborhood" | "category" | "none";

export function groupSaved(items: SavedResult[], by: SavedGroupBy): { label: string; items: SavedResult[] }[] {
  if (by === "none") return items.length ? [{ label: "", items }] : [];
  const order: string[] =
    by === "type" ? savedKinds.map((k) => savedKindLabels[k]) : by === "neighborhood" ? [...neighborhoods, "Citywide"] : [...new Set(items.map((i) => i.category))].sort();
  const labelOf = (i: SavedResult) => (by === "type" ? savedKindLabels[i.kind] : by === "neighborhood" ? (i.neighborhood ?? "Citywide") : i.category);
  return order.map((label) => ({ label, items: items.filter((i) => labelOf(i) === label) })).filter((g) => g.items.length);
}

/** Miles, rounded for display. */
export function formatMiles(m: number) {
  const mi = m / 1609.34;
  return mi < 0.1 ? "< 0.1 mi" : `${mi < 10 ? mi.toFixed(1) : Math.round(mi)} mi`;
}
