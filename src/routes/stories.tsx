import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CalendarDays, Landmark, MessagesSquare, Pin, Plus, Search, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { blockClubs, events, threadCategories, type ThreadCategory } from "@/lib/data";
import { formatDate, lastActivity, useForum } from "@/lib/forum";
import { searchSite } from "@/lib/search";
import { Composer, type ComposerPreset } from "@/components/Composer";
import { CityServices } from "@/components/CityServices";
import { HeartButton } from "@/components/HeartButton";

type ForumSearch = { new?: string; section?: "community" | "services" };

export const Route = createFileRoute("/stories")({
  validateSearch: (s: Record<string, unknown>): ForumSearch => ({
    ...(typeof s["new"] === "string" ? { new: String(s["new"]).slice(0, 140) } : {}),
    ...(s["section"] === "community" || s["section"] === "services" ? { section: s["section"] as "community" | "services" } : {}),
  }),
  head: () => ({
    meta: [
      { title: "Neighborhood forum — Detroit Local" },
      { name: "description", content: "Ask questions, share recommendations, find block clubs and events, and pass down stories with Detroit neighbors." },
      { property: "og:title", content: "Neighborhood forum — Detroit Local" },
      { property: "og:description", content: "Stories, questions, block clubs and events from Detroit neighbors." },
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
  const { new: prefill, section } = Route.useSearch();
  const navigate = useNavigate();
  const { threads, addThread } = useForum();
  const [cat, setCat] = useState<ThreadCategory | null>(null);
  const [filter, setFilter] = useState("");
  const [composing, setComposing] = useState(prefill !== undefined);
  const [preset, setPreset] = useState<ComposerPreset | undefined>(prefill !== undefined ? { title: prefill } : undefined);
  const community = section === "community";
  const services = section === "services";

  const filtered = useMemo(() => {
    let list = threads;
    if (community) list = list.filter((t) => t.category === "Events & meetups");
    else if (cat) list = list.filter((t) => t.category === cat);
    if (filter.trim().length >= 2) {
      const hits = new Set(searchSite(filter, list, ["thread"]).map((r) => r.slug));
      list = list.filter((t) => hits.has(t.slug));
    }
    return [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || lastActivity(b).localeCompare(lastActivity(a)));
  }, [threads, cat, filter, community]);

  function compose(p?: ComposerPreset) {
    setPreset(p);
    setComposing(true);
  }

  function setSection(next: "threads" | "community" | "services") {
    navigate({ to: "/stories", search: next === "threads" ? {} : { section: next }, replace: true });
  }

  const segment = (active: boolean) =>
    `flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium sm:px-4 transition-all duration-200 ${active ? "bg-card text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"}`;

  return (
    <div className="mx-auto max-w-4xl px-4 pt-8 md:px-5 md:pt-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="animate-rise text-4xl font-semibold tracking-tight md:text-6xl">Neighborhood forum</h1>
          <p className="mt-2 max-w-xl text-muted-foreground">Stories, questions, block clubs, events and city services from people who know these blocks.</p>
        </div>
        <button type="button" onClick={() => compose(community ? { category: "Events & meetups" } : undefined)} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-soft transition hover:opacity-90 active:scale-[0.98]">
          <Plus className="h-4 w-4" />New post
        </button>
      </div>

      <div className="mt-6 flex rounded-full bg-secondary p-1" role="tablist" aria-label="Forum sections">
        <button type="button" role="tab" aria-selected={!community && !services} onClick={() => setSection("threads")} className={segment(!community && !services)}>
          <MessagesSquare className="hidden h-4 w-4 sm:block" /><span className="sm:hidden">Threads</span><span className="hidden sm:inline">Discussions</span>
        </button>
        <button type="button" role="tab" aria-selected={community} onClick={() => setSection("community")} className={segment(community)}>
          <Users className="hidden h-4 w-4 sm:block" /><span className="sm:hidden">Clubs &amp; events</span><span className="hidden sm:inline">Block clubs &amp; events</span>
        </button>
        <button type="button" role="tab" aria-selected={services} onClick={() => setSection("services")} className={segment(services)}>
          <Landmark className="hidden h-4 w-4 sm:block" />City services
        </button>
      </div>

      {services ? (
        <CityServices />
      ) : (
        <>
      {community && (
        <div className="mt-6 grid animate-rise gap-6 md:grid-cols-2">
          <section>
            <h2 className="flex items-center gap-2 text-xl font-semibold"><CalendarDays className="h-5 w-5 text-brick" />Coming up</h2>
            <ul className="mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              {events.map((e) => {
                const [mon, day] = e.date.split(" ");
                const full = e.signup === "request" && e.spotsLeft === 0;
                return (
                  <li key={e.slug} className="relative">
                    <Link to="/events/$slug" params={{ slug: e.slug }} className="group flex items-center gap-4 p-4 pr-14 transition-colors hover:bg-secondary">
                      <span className="grid w-12 shrink-0 place-items-center rounded-xl bg-secondary py-1.5 text-center leading-none group-hover:bg-card">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-brick">{mon}</span>
                        <span className="mt-0.5 font-display text-xl">{day}</span>
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium group-hover:text-primary">{e.title}</p>
                        <p className="truncate text-sm text-muted-foreground">{e.place} · {e.neighborhood}</p>
                        <p className="mt-1 text-xs font-medium text-brick">{e.signup === "drop-in" ? "Drop in, no sign-up" : full ? "Full · waitlist open" : `${e.spotsLeft} spots left`}</p>
                      </div>
                    </Link>
                    <HeartButton kind="event" id={e.slug} label={e.title} variant="plain" className="absolute right-3 top-1/2 -translate-y-1/2" />
                  </li>
                );
              })}
            </ul>
          </section>
          <section>
            <h2 className="flex items-center gap-2 text-xl font-semibold"><Users className="h-5 w-5 text-brick" />Block clubs</h2>
            <ul className="mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              {blockClubs.map((b) => (
                <li key={b.slug} className="relative">
                  <Link to="/clubs/$slug" params={{ slug: b.slug }} className="group flex items-center gap-4 p-4 pr-14 transition-colors hover:bg-secondary">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground"><Users className="h-5 w-5" /></span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium group-hover:text-primary">{b.name}</p>
                      <p className="text-sm text-muted-foreground">{b.neighborhood} · Meets {b.meets}</p>
                      <p className="mt-1 text-xs font-medium text-brick">{b.members} members · Free to join</p>
                    </div>
                  </Link>
                  <HeartButton kind="club" id={b.slug} label={b.name} variant="plain" className="absolute right-3 top-1/2 -translate-y-1/2" />
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      <div className="mt-6 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-soft">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder={community ? "Search events & meetups" : "Search the forum"} aria-label="Search the forum" className="min-w-0 flex-1 bg-transparent py-1 outline-none placeholder:text-muted-foreground" />
      </div>
      {!community && (
        <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
          {[null, ...threadCategories].map((c) => (
            <button key={c ?? "all"} type="button" onClick={() => setCat(c)} className={`shrink-0 rounded-full border px-3 py-1.5 text-sm transition-colors ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-secondary"}`}>
              {c ?? "All"}
            </button>
          ))}
        </div>
      )}
      {community && <h2 className="mt-6 text-lg font-semibold">Events &amp; meetup threads</h2>}

      <ul className={`${community ? "mt-3" : "mt-6"} divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-soft`}>
        {filtered.map((t) => (
          <li key={t.slug} className="relative">
            <Link to="/stories/$slug" params={{ slug: t.slug }} className="group grid grid-cols-[44px_1fr] items-center gap-3 p-4 pr-14 transition-colors hover:bg-secondary md:grid-cols-[52px_1fr] md:gap-4">
              {t.image ? <img src={t.image} alt={t.person} loading="lazy" className="aspect-square w-full rounded-full object-cover" /> : <Initials name={t.person} />}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {t.featured && <span className="inline-flex items-center gap-1 font-medium text-brick"><Pin className="h-3 w-3" />Featured story</span>}
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-muted-foreground group-hover:bg-card">{t.category}</span>
                  {t.neighborhood && <span className="text-muted-foreground">{t.neighborhood}</span>}
                </div>
                <h3 className="mt-1 truncate text-base font-semibold group-hover:text-primary md:text-lg">{t.title}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {t.person} · <MessagesSquare className="inline h-3.5 w-3.5" /> {t.replies.length} · {formatDate(lastActivity(t))}
                </p>
              </div>
            </Link>
            <HeartButton kind="thread" id={t.slug} label={t.title} variant="plain" className="absolute right-3 top-1/2 -translate-y-1/2" />
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="p-8 text-center text-muted-foreground">
            No threads match.{" "}
            <button type="button" onClick={() => compose({ title: filter, ...(community ? { category: "Events & meetups" as const } : {}) })} className="font-medium text-primary hover:underline">Start one</button>
          </li>
        )}
      </ul>

        </>
      )}

      <Composer
        open={composing}
        onOpenChange={setComposing}
        preset={preset}
        threads={threads}
        onPost={(input) => {
          const slug = addThread(input);
          setComposing(false);
          navigate({ to: "/stories/$slug", params: { slug } });
        }}
      />
    </div>
  );
}
