import { useCallback, useEffect, useMemo, useState } from "react";

/** Seller board ("For sellers" directory): neighbors trading skills, supplies, space and buying power. */
export const boardTags = [
  "Skill share",
  "Material share",
  "Tool lending",
  "Space share",
  "Group buying",
  "Share clients",
  "Help wanted",
  "Mentoring",
] as const;
export type BoardTag = (typeof boardTags)[number];
export type BoardKind = "offer" | "ask";

export type BoardPost = {
  id: string;
  kind: BoardKind;
  tag: BoardTag;
  title: string;
  details: string;
  author: string;
  neighborhood?: string | undefined;
  contact?: string | undefined;
  date: string;
};

/** Made-up demo posts so the directory isn't empty. */
export const seedBoardPosts: BoardPost[] = [
  { id: "s1", kind: "offer", tag: "Skill share", title: "I'll teach canning basics — want help with my website in return", details: "Water-bath canning, pickles and jam. Two Saturday mornings in my kitchen. Looking for someone who can fix up a simple site.", author: "Denise", neighborhood: "Bagley", date: "2026-10-21" },
  { id: "s2", kind: "offer", tag: "Material share", title: "Free raised-bed lumber and 20 bags of compost", details: "Leftover from our fall build. Free to any grower who can pick up this week.", author: "Marcus", neighborhood: "North End", date: "2026-10-20" },
  { id: "s3", kind: "ask", tag: "Group buying", title: "Splitting a bulk order of pie tins and bakery boxes", details: "4 spots left. Cuts the price almost in half. Order goes in Nov 2.", author: "Dee", neighborhood: "Bagley", date: "2026-10-19" },
  { id: "s4", kind: "offer", tag: "Share clients", title: "Booked through December — happy to refer porch jobs", details: "Small carpentry and porch repairs. If you're a fixer with room on your calendar, let's talk.", author: "Ray", neighborhood: "Jefferson-Chalmers", date: "2026-10-18" },
  { id: "s5", kind: "offer", tag: "Tool lending", title: "Lending a tile saw and wet vac on weekends", details: "Clean them and bring them back by Monday. Happy to show you how to use the saw.", author: "Luis", neighborhood: "Southwest", date: "2026-10-17" },
  { id: "s6", kind: "ask", tag: "Space share", title: "Need a licensed kitchen a few hours a week", details: "Small tamale business, cottage food rules don't cover what I want to sell. Can pay hourly or trade.", author: "Rosa", neighborhood: "Southwest", date: "2026-10-16" },
  { id: "s7", kind: "offer", tag: "Space share", title: "Half a booth at Saturday market to share", details: "I only need half my table in winter. Split the fee with a maker or baker.", author: "Tanya", neighborhood: "Eastern Market", date: "2026-10-15" },
  { id: "s8", kind: "ask", tag: "Help wanted", title: "Looking for a teen to help at the farm stand Saturdays", details: "9 to 1, paid, good for a high schooler who likes being outside.", author: "Marcus", neighborhood: "North End", date: "2026-10-14" },
  { id: "s9", kind: "offer", tag: "Mentoring", title: "30 years in hair — happy to mentor new stylists", details: "Pricing, booking, building regulars. Coffee's on me.", author: "Mrs. Gloria", neighborhood: "Corktown", date: "2026-10-12" },
  { id: "s10", kind: "ask", tag: "Material share", title: "Anyone have extra canning jars?", details: "Will take any size. Can pay or trade jam.", author: "Kim", neighborhood: "Bagley", date: "2026-10-10" },
];

export function filterBoard(posts: BoardPost[], { query = "", tag = null, kind = null }: { query?: string; tag?: BoardTag | null; kind?: BoardKind | null }) {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  return posts.filter((p) => {
    if (tag && p.tag !== tag) return false;
    if (kind && p.kind !== kind) return false;
    if (tokens.length === 0) return true;
    const hay = `${p.title} ${p.details} ${p.tag} ${p.author} ${p.neighborhood ?? ""}`.toLowerCase();
    return tokens.every((t) => hay.includes(t));
  });
}

// Demo-only storage: posts live in this browser until the app gets shared saving.
const KEY = "detroit-local-board-v1";
const EVENT = "detroit-local-board-change";

function read(): BoardPost[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as BoardPost[];
  } catch {
    return [];
  }
}

export type NewBoardPost = Omit<BoardPost, "id" | "date">;

export function useBoard() {
  const [mine, setMine] = useState<BoardPost[]>([]);

  useEffect(() => {
    const sync = () => setMine(read());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const posts = useMemo(() => [...mine, ...seedBoardPosts], [mine]);

  const add = useCallback((p: NewBoardPost) => {
    const post: BoardPost = {
      ...p,
      id: `b-${Date.now().toString(36)}`,
      title: p.title.trim().slice(0, 120),
      details: p.details.trim().slice(0, 600),
      author: p.author.trim().slice(0, 60) || "A neighbor",
      contact: p.contact?.trim().slice(0, 80) || undefined,
      date: new Date().toISOString().slice(0, 10),
    };
    localStorage.setItem(KEY, JSON.stringify([post, ...read()]));
    window.dispatchEvent(new Event(EVENT));
    return post;
  }, []);

  return { posts, add };
}
