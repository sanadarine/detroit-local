import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight, MessageSquarePlus, MessagesSquare, Pin, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { neighborhoods, threadCategories, type ThreadCategory } from "@/lib/data";
import { formatDate, lastActivity, useForum } from "@/lib/forum";
import { searchSite } from "@/lib/search";

type ForumSearch = { new?: string };

export const Route = createFileRoute("/stories")({
  validateSearch: (s: Record<string, unknown>): ForumSearch => (typeof s["new"] === "string" ? { new: String(s["new"]).slice(0, 140) } : {}),
  head: () => ({
    meta: [
      { title: "Neighborhood forum — Porchlight Detroit" },
      { name: "description", content: "Ask questions, share recommendations and pass down stories with Detroit neighbors. Search first to join an existing thread." },
      { property: "og:title", content: "Neighborhood forum — Porchlight Detroit" },
      { property: "og:description", content: "Stories, questions and recommendations from Detroit neighbors." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Forum,
});

function Initials({ name }: { name: string }) {
  const i = name.split(/\s+/).map((p) => p[0]).join("").slice(0, 2).toUpperCase();
  return <span className="grid aspect-square w-full place-items-center rounded-full bg-accent font-display text-lg text-accent-foreground">{i}</span>;
}

function Forum() {
  const { new: prefill } = Route.useSearch();
  const navigate = useNavigate();
  const { threads, addThread } = useForum();
  const [cat, setCat] = useState<ThreadCategory | null>(null);
  const [filter, setFilter] = useState("");
  const [composing, setComposing] = useState(prefill !== undefined);
  const [form, setForm] = useState({ title: prefill ?? "", category: "Questions" as ThreadCategory, neighborhood: "", author: "", body: "" });

  const filtered = useMemo(() => {
    let list = threads;
    if (cat) list = list.filter((t) => t.category === cat);
    if (filter.trim().length >= 2) {
      const hits = new Set(searchSite(filter, list, ["thread"]).map((r) => r.slug));
      list = list.filter((t) => hits.has(t.slug));
    }
    return [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || lastActivity(b).localeCompare(lastActivity(a)));
  }, [threads, cat, filter]);

  const similar = useMemo(() => (form.title.trim().length >= 3 ? searchSite(form.title, threads, ["thread"]).slice(0, 3) : []), [form.title, threads]);

  function post(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) return;
    const slug = addThread({ ...form, neighborhood: form.neighborhood || undefined });
    navigate({ to: "/stories/$slug", params: { slug } });
  }

  const input = "w-full rounded-xl border border-input bg-background px-3.5 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30";

  return (
    <div className="mx-auto max-w-4xl px-4 pt-8 md:px-5 md:pt-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold md:text-5xl">Neighborhood forum</h1>
          <p className="mt-2 max-w-xl text-muted-foreground">Stories, questions and recommendations from people who know these blocks.</p>
        </div>
        <button onClick={() => setComposing(!composing)} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90 active:scale-[0.98]">
          {composing ? <><X className="h-4 w-4" />Cancel</> : <><MessageSquarePlus className="h-4 w-4" />Start a thread</>}
        </button>
      </div>

      {composing && (
        <form onSubmit={post} className="mt-6 space-y-3 rounded-2xl border border-border bg-card p-4 shadow-sm md:p-6">
          <input required maxLength={140} placeholder="What's your question or story?" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={`${input} text-lg font-medium`} />
          {similar.length > 0 && (
            <div className="rounded-xl bg-secondary p-3">
              <p className="text-sm font-medium">Already being discussed? Join one of these instead:</p>
              <ul className="mt-2 space-y-1">
                {similar.map((r) => (
                  <li key={r.id}>
                    <Link to="/stories/$slug" params={{ slug: r.slug ?? "" }} className="flex items-center gap-2 text-sm text-primary hover:underline">
                      <MessagesSquare className="h-4 w-4 shrink-0" />{r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="grid gap-3 sm:grid-cols-3">
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as ThreadCategory })} className={input}>
              {threadCategories.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select value={form.neighborhood} onChange={(e) => setForm({ ...form, neighborhood: e.target.value })} className={input}>
              <option value="">Any neighborhood</option>
              {neighborhoods.map((n) => <option key={n}>{n}</option>)}
            </select>
            <input maxLength={60} placeholder="Your name" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className={input} />
          </div>
          <textarea required maxLength={4000} rows={5} placeholder="Share the details…" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} className={input} />
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">Demo: posts are saved on this device only.</p>
            <button className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">Post thread</button>
          </div>
        </form>
      )}

      <div className="mt-6 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-sm">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search the forum" aria-label="Search the forum" className="min-w-0 flex-1 bg-transparent py-1 outline-none placeholder:text-muted-foreground" />
      </div>
      <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
        {[null, ...threadCategories].map((c) => (
          <button key={c ?? "all"} onClick={() => setCat(c)} className={`shrink-0 rounded-full border px-3 py-1.5 text-sm transition-colors ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-secondary"}`}>
            {c ?? "All"}
          </button>
        ))}
      </div>

      <ul className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
        {filtered.map((t) => (
          <li key={t.slug}>
            <Link to="/stories/$slug" params={{ slug: t.slug }} className="group grid grid-cols-[48px_1fr_auto] items-center gap-3 p-4 transition-colors hover:bg-secondary md:grid-cols-[56px_1fr_auto] md:gap-4">
              {t.image ? <img src={t.image} alt={t.person} loading="lazy" className="aspect-square w-full rounded-full object-cover" /> : <Initials name={t.person} />}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {t.featured && <span className="inline-flex items-center gap-1 font-medium text-brick"><Pin className="h-3 w-3" />Featured story</span>}
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-muted-foreground group-hover:bg-card">{t.category}</span>
                  {t.neighborhood && <span className="text-muted-foreground">{t.neighborhood}</span>}
                </div>
                <h2 className="mt-1 truncate text-base font-semibold group-hover:text-primary md:text-lg">{t.title}</h2>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {t.person} · <MessagesSquare className="inline h-3.5 w-3.5" /> {t.replies.length} · {formatDate(lastActivity(t))}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
        {filtered.length === 0 && <li className="p-8 text-center text-muted-foreground">No threads match. Start one!</li>}
      </ul>
    </div>
  );
}
