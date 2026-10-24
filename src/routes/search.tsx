import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageSquarePlus } from "lucide-react";
import { useMemo } from "react";
import { SearchBar } from "@/components/SearchBar";
import { SearchResultLink, kindIcons } from "@/components/SearchResultLink";
import { useForum } from "@/lib/forum";
import { kindLabels, searchSite, type SearchKind } from "@/lib/search";

type SearchParams = { q?: string };

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>): SearchParams => (typeof s["q"] === "string" && s["q"] ? { q: String(s["q"]).slice(0, 100) } : {}),
  head: () => ({
    meta: [
      { title: "Search — Detroit Local" },
      { name: "description", content: "Search Detroit Local forum threads, local vendors, block clubs, events and the vendor permit guide." },
      { property: "og:title", content: "Search Detroit Local" },
      { property: "og:description", content: "Check if your neighbors already answered it before you ask." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SearchPage,
});

const order: SearchKind[] = ["thread", "vendor", "service", "community", "hub"];

function SearchPage() {
  const { q = "" } = Route.useSearch();
  const { threads } = useForum();
  const results = useMemo(() => searchSite(q, threads), [q, threads]);
  const groups = order.map((k) => ({ kind: k, items: results.filter((r) => r.kind === k) })).filter((g) => g.items.length);

  return (
    <div className="mx-auto max-w-3xl px-4 pt-8 md:px-5 md:pt-12">
      <h1 className="animate-rise text-4xl font-semibold tracking-tight md:text-6xl">Search the neighborhood</h1>
      <p className="mt-2 text-muted-foreground">Check whether neighbors already asked or answered it.</p>
      <div className="mt-6">
        <SearchBar key={q} initial={q} suggest={false} autoFocus={!q} />
      </div>

      {q && (
        <p className="mt-6 text-sm text-muted-foreground">
          {results.length} result{results.length === 1 ? "" : "s"} for <span className="font-medium text-foreground">"{q}"</span>
        </p>
      )}

      <div className="mt-4 space-y-10">
        {groups.map((g) => {
          const Icon = kindIcons[g.kind];
          return (
            <section key={g.kind}>
              <h2 className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-brick">
                <Icon className="h-4 w-4" />
                {kindLabels[g.kind]} <span className="text-muted-foreground">· {g.items.length}</span>
              </h2>
              <div className="mt-3 grid gap-2">
                {g.items.map((r) => <SearchResultLink key={r.id} r={r} />)}
              </div>
            </section>
          );
        })}
      </div>

      {q && (
        <div className="mt-10 rounded-2xl border border-border bg-secondary p-5 md:p-6">
          <h2 className="text-lg font-semibold">{results.length ? "Didn't find what you need?" : "No one has asked this yet."}</h2>
          <p className="mt-1 text-sm text-muted-foreground">Start a thread and neighbors can weigh in.</p>
          <Link to="/stories" search={{ new: q }} className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
            <MessageSquarePlus className="h-4 w-4" /> Start a thread
          </Link>
        </div>
      )}
    </div>
  );
}
