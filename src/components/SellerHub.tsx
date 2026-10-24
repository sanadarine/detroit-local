import { AtSign, FileCheck, GraduationCap, Hammer, HandHelping, Handshake, MapPin, Package, Plus, Search, ShoppingBasket, Store, Users, Wrench, X } from "lucide-react";
import { useMemo, useState } from "react";
import { permitSteps } from "@/lib/data";
import { boardTags, filterBoard, useBoard, type BoardKind, type BoardPost, type BoardTag } from "@/lib/board";
import { formatDate } from "@/lib/forum";
import { BoardComposer } from "@/components/BoardComposer";
import { HeartButton } from "@/components/HeartButton";

export const boardIcons: Record<BoardTag, typeof Hammer> = {
  "Skill share": Hammer,
  "Material share": Package,
  "Tool lending": Wrench,
  "Space share": Store,
  "Group buying": ShoppingBasket,
  "Share clients": Users,
  "Help wanted": HandHelping,
  Mentoring: GraduationCap,
};

function PostCard({ p }: { p: BoardPost }) {
  const I = boardIcons[p.tag];
  return (
    <li className="flex flex-col rounded-2xl bg-card p-4 shadow-soft ring-1 ring-border transition hover:shadow-lift">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground"><I className="h-4 w-4" /></span>
        <span className="text-xs font-medium text-primary">{p.tag}</span>
        <span className={`ml-auto rounded-full px-2 py-0.5 text-[11px] font-medium ${p.kind === "offer" ? "bg-primary/10 text-primary" : "bg-secondary text-foreground"}`}>
          {p.kind === "offer" ? "Offering" : "Looking for"}
        </span>
        <HeartButton kind="board" id={p.id} label={p.title} variant="plain" className="-my-1 -mr-1.5" />
      </div>
      <h3 className="mt-3 font-semibold leading-snug">{p.title}</h3>
      {p.details && <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">{p.details}</p>}
      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-3 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">{p.author}</span>
        {p.neighborhood && <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{p.neighborhood}</span>}
        <span>{formatDate(p.date)}</span>
      </div>
      {p.contact && <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary"><AtSign className="h-3 w-3" />{p.contact}</p>}
    </li>
  );
}

/** The "For sellers" side of Explore: a searchable directory of seller listings, plus the permit guide. */
export function SellerHub() {
  const { posts, add } = useBoard();
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<BoardTag | null>(null);
  const [kind, setKind] = useState<BoardKind | null>(null);
  const [composing, setComposing] = useState(false);

  const results = useMemo(() => filterBoard(posts, { query, tag, kind }), [posts, query, tag, kind]);
  const counts = useMemo(() => Object.fromEntries(boardTags.map((t) => [t, posts.filter((p) => p.tag === t).length])) as Record<BoardTag, number>, [posts]);

  const pill = (on: boolean) =>
    `flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200 active:scale-[0.97] ${on ? "bg-foreground text-background" : "bg-card text-foreground shadow-soft ring-1 ring-border hover:bg-secondary"}`;
  const seg = (on: boolean) => `rounded-full px-3 py-1 text-sm transition-all ${on ? "bg-card font-medium text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"}`;

  return (
    <div className="animate-rise">
      <section id="board" className="scroll-mt-24" aria-labelledby="board-title">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="board-title" className="flex items-center gap-2 text-2xl font-semibold tracking-tight"><Handshake className="h-5 w-5 text-primary" />Seller directory</h2>
            <p className="mt-1 text-sm text-muted-foreground">Trade skills, supplies, space and buying power with other Detroit sellers.</p>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <label className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-card px-4 py-2.5 shadow-soft ring-1 ring-border focus-within:ring-2 focus-within:ring-ring">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search listings: jars, kitchen, booth…" aria-label="Search seller listings" className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden" />
            {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>}
          </label>
          <button type="button" onClick={() => setComposing(true)} className="flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition active:scale-[0.97] md:px-5">
            <Plus className="h-4 w-4" /><span className="hidden sm:inline">Post a listing</span><span className="sm:hidden">Post</span>
          </button>
        </div>

        <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 py-1 md:mx-0 md:flex-wrap md:px-0">
          <button type="button" aria-pressed={!tag} onClick={() => setTag(null)} className={pill(!tag)}>All</button>
          {boardTags.map((t) => {
            const I = boardIcons[t];
            return (
              <button key={t} type="button" aria-pressed={tag === t} onClick={() => setTag(tag === t ? null : t)} className={pill(tag === t)}>
                <I className="h-4 w-4" />{t}<span className="text-xs opacity-60">{counts[t]}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">{results.length} listing{results.length === 1 ? "" : "s"}</p>
          <div className="inline-flex rounded-full bg-secondary p-1" role="radiogroup" aria-label="Offering or looking for">
            {([[null, "All"], ["offer", "Offering"], ["ask", "Looking for"]] as const).map(([k, label]) => (
              <button key={label} type="button" role="radio" aria-checked={kind === k} onClick={() => setKind(k)} className={seg(kind === k)}>{label}</button>
            ))}
          </div>
        </div>

        {results.length > 0 ? (
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => <PostCard key={p.id} p={p} />)}
          </ul>
        ) : (
          <div className="mt-3 rounded-2xl bg-secondary p-6 text-center">
            <p className="font-medium">No listings match yet</p>
            <p className="mt-1 text-sm text-muted-foreground">Be the first. Someone nearby is probably looking for the same thing.</p>
            <button type="button" onClick={() => setComposing(true)} className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"><Plus className="h-4 w-4" />Post a listing</button>
          </div>
        )}
      </section>

      <section id="permits" className="mt-12 scroll-mt-24">
        <h2 className="flex items-center gap-2 text-xl font-semibold md:text-2xl"><FileCheck className="h-5 w-5 text-primary" />Starting a business</h2>
        <p className="mt-1 text-sm text-muted-foreground">The Detroit paperwork, one step at a time.</p>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {permitSteps.map((s, i) => (
            <li key={s.t} className="rounded-2xl bg-card p-4 shadow-soft ring-1 ring-border">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-sm font-medium text-primary-foreground">{i + 1}</span>
              <p className="mt-3 font-medium leading-snug">{s.t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-xs text-muted-foreground">General guidance only — confirm details with the City of Detroit.</p>
      </section>

      <BoardComposer
        open={composing}
        onOpenChange={setComposing}
        preset={{ tag, title: query }}
        onPost={(p) => {
          add(p);
          setComposing(false);
          setQuery("");
          setTag(null);
          setKind(null);
        }}
      />
    </div>
  );
}
