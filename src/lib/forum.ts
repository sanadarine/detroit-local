import { useCallback, useEffect, useMemo, useState } from "react";
import { seedThreads, type Reply, type Thread, type ThreadCategory } from "@/lib/data";

// Demo-only storage: posts live in this browser until the app gets shared saving.
const KEY = "porchlight-forum-v1";
const EVENT = "porchlight-forum-change";

type Stored = { threads: Thread[]; replies: Record<string, Reply[]> };
const empty: Stored = { threads: [], replies: {} };

function read(): Stored {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<Stored>;
    return { threads: parsed.threads ?? [], replies: parsed.replies ?? {} };
  } catch {
    return empty;
  }
}

function write(next: Stored) {
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(EVENT));
}

export function lastActivity(t: Thread) {
  return t.replies.reduce((max, r) => (r.date > max ? r.date : max), t.date);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export type NewThread = { title: string; category: ThreadCategory; neighborhood?: string | undefined; author: string; body: string };

export function useForum() {
  const [stored, setStored] = useState<Stored>(empty);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const sync = () => setStored(read());
    sync();
    setLoaded(true);
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const threads = useMemo(
    () =>
      [...stored.threads, ...seedThreads].map((t) => ({
        ...t,
        replies: [...t.replies, ...(stored.replies[t.slug] ?? [])],
      })),
    [stored],
  );

  const addThread = useCallback((input: NewThread) => {
    const now = new Date().toISOString();
    const author = input.author.trim().slice(0, 60) || "A neighbor";
    const paragraphs = input.body
      .trim()
      .slice(0, 4000)
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);
    const slug = `t-${Date.now().toString(36)}`;
    const thread: Thread = {
      slug,
      title: input.title.trim().slice(0, 140),
      person: author,
      teller: input.neighborhood ? `${author}, ${input.neighborhood}` : author,
      excerpt: (paragraphs[0] ?? "").slice(0, 180),
      body: paragraphs,
      category: input.category,
      neighborhood: input.neighborhood,
      date: now,
      replies: [],
    };
    const cur = read();
    write({ ...cur, threads: [thread, ...cur.threads] });
    return slug;
  }, []);

  const addReply = useCallback((slug: string, author: string, text: string) => {
    const reply: Reply = {
      id: `r-${Date.now().toString(36)}`,
      author: author.trim().slice(0, 60) || "A neighbor",
      date: new Date().toISOString(),
      text: text.trim().slice(0, 2000),
    };
    const cur = read();
    write({ ...cur, replies: { ...cur.replies, [slug]: [...(cur.replies[slug] ?? []), reply] } });
  }, []);

  return { threads, loaded, addThread, addReply };
}
