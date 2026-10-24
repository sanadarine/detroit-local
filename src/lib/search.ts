import { blockClubs, events, hubBoard, permitSteps, vendorReviews, vendors, type Thread } from "@/lib/data";

export type SearchKind = "thread" | "vendor" | "community" | "hub";

export type SearchResult = {
  kind: SearchKind;
  id: string;
  title: string;
  snippet: string;
  /** slug for threads and vendors */
  slug?: string | undefined;
  /** section anchor for hub results */
  section?: "board" | "permits" | undefined;
  score: number;
};

const STOP = new Set(
  "a an and the of to in on for is are was i my me we our you your it at by with or be do does did can could how what where when who why which near any best good there this that from about anyone know looking need".split(" "),
);

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function tokenize(q: string) {
  return normalize(q)
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 1 && !STOP.has(t))
    .map((t) => (t.length > 4 ? t.replace(/(ing|es|s)$/, "") : t));
}

function score(tokens: string[], title: string, text: string) {
  const T = normalize(title);
  const X = normalize(text);
  let s = 0;
  let hits = 0;
  for (const t of tokens) {
    if (T.includes(t)) {
      s += 3;
      hits++;
    } else if (X.includes(t)) {
      s += 1;
      hits++;
    }
  }
  if (hits === 0) return 0;
  if (hits < Math.ceil(tokens.length / 2)) return 0;
  return s + hits * 2;
}

type Doc = Omit<SearchResult, "score"> & { text: string };

function docs(threads: Thread[]): Doc[] {
  return [
    ...threads.map((t) => ({
      kind: "thread" as const,
      id: `thread:${t.slug}`,
      slug: t.slug,
      title: t.title,
      snippet: `${t.category} · ${t.replies.length} repl${t.replies.length === 1 ? "y" : "ies"} · ${t.excerpt}`,
      text: [t.category, t.person, t.neighborhood, t.excerpt, ...t.body, ...t.replies.map((r) => r.text)].join(" "),
    })),
    ...vendors.map((v) => ({
      kind: "vendor" as const,
      id: `vendor:${v.slug}`,
      slug: v.slug,
      title: v.name,
      snippet: `${v.category} · ${v.subArea}, ${v.neighborhood} · ${v.tagline}`,
      text: [v.owner, v.category, v.neighborhood, v.subArea, v.tagline, v.story, ...v.services, v.address, ...(vendorReviews[v.slug] ?? []).map((r) => r.text)].join(" "),
    })),
    ...blockClubs.map((c) => ({
      kind: "community" as const,
      id: `club:${c.name}`,
      title: c.name,
      snippet: `Block club · ${c.neighborhood} · Meets ${c.meets}`,
      text: `block club meeting ${c.neighborhood} ${c.meets}`,
    })),
    ...events.map((e) => ({
      kind: "community" as const,
      id: `event:${e.title}`,
      title: e.title,
      snippet: `Event · ${e.date} · ${e.place}, ${e.neighborhood}`,
      text: `event ${e.date} ${e.place} ${e.neighborhood}`,
    })),
    ...hubBoard.map((b) => ({
      kind: "hub" as const,
      id: `board:${b.text}`,
      section: "board" as const,
      title: b.text,
      snippet: `${b.type} · ${b.who}`,
      text: `${b.type} ${b.who} vendor`,
    })),
    ...permitSteps.map((p) => ({
      kind: "hub" as const,
      id: `permit:${p.t}`,
      section: "permits" as const,
      title: p.t,
      snippet: `Permit guide · ${p.d}`,
      text: `${p.d} permit license starting business guide`,
    })),
  ];
}

export function searchSite(query: string, threads: Thread[], kinds?: SearchKind[]): SearchResult[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];
  return docs(threads)
    .filter((d) => !kinds || kinds.includes(d.kind))
    .map(({ text, ...d }) => ({ ...d, score: score(tokens, d.title, text) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

export const kindLabels: Record<SearchKind, string> = {
  thread: "Forum threads",
  vendor: "Vendors",
  community: "Block clubs & events",
  hub: "Vendor hub & permits",
};
