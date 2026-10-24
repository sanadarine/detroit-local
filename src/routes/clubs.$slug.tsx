import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, ChevronRight, Clock, HandHeart, MapPin, MessagesSquare, Users, Wallet } from "lucide-react";
import { useMemo } from "react";
import { blockClubs, events } from "@/lib/data";
import { useForum } from "@/lib/forum";
import { useJoin } from "@/lib/joins";
import { searchSite } from "@/lib/search";
import { NeighborhoodArt } from "@/components/NeighborhoodArt";
import { JoinCard } from "@/components/JoinCard";

export const Route = createFileRoute("/clubs/$slug")({
  loader: ({ params }) => {
    const club = blockClubs.find((c) => c.slug === params.slug);
    if (!club) throw notFound();
    return club;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Detroit Local` },
          { name: "description", content: `${loaderData.about} Meets ${loaderData.meets}.` },
          { property: "og:title", content: `${loaderData.name} — Detroit Local` },
          { property: "og:description", content: loaderData.about },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary" },
        ]
      : [{ title: "Block club not found — Detroit Local" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="text-3xl font-semibold">We couldn't find that block club</h1>
      <Link to="/stories" search={{ section: "community" }} className="mt-4 inline-block text-primary">See all block clubs</Link>
    </div>
  ),
  component: ClubPage,
});

function ClubPage() {
  const c = Route.useLoaderData();
  const { request, submit, cancel } = useJoin(`club:${c.slug}`);
  const { threads } = useForum();
  const related = useMemo(() => searchSite(`${c.neighborhood} ${c.name}`, threads, ["thread"]).slice(0, 3), [threads, c]);
  const upcoming = events.filter((e) => e.hostClub === c.slug || e.neighborhood === c.neighborhood);

  const facts = [
    { icon: Clock, label: "Meets", value: c.meets },
    { icon: MapPin, label: "Where", value: c.where },
    { icon: Users, label: "Members", value: `${c.members} neighbors · since ${c.founded}` },
    { icon: Wallet, label: "Dues", value: c.dues },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 pt-6 md:px-5 md:pt-10">
      <Link to="/stories" search={{ section: "community" }} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" />Block clubs &amp; events</Link>

      <div className="relative mt-4 overflow-hidden rounded-3xl shadow-lift">
        <NeighborhoodArt name={c.neighborhood} className="aspect-[5/2] w-full md:aspect-[3/1]" />
      </div>

      <div className="mt-6 grid gap-8 md:grid-cols-[1fr_340px] md:gap-10">
        <div>
          <p className="flex items-center gap-1.5 text-sm font-medium text-brick"><Users className="h-4 w-4" />Block club · {c.neighborhood}</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight md:text-5xl">{c.name}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{c.about}</p>

          <dl className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            {facts.map((f) => (
              <div key={f.label} className="flex gap-3 p-4">
                <f.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground">{f.label}</dt>
                  <dd className="mt-0.5">{f.value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <h2 className="mt-10 text-xl font-semibold">What we work on</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {c.focus.map((f) => (
              <li key={f} className="flex items-center gap-2 rounded-xl bg-secondary px-3.5 py-2.5 text-sm"><HandHeart className="h-4 w-4 shrink-0 text-brick" />{f}</li>
            ))}
          </ul>

          <h2 className="mt-10 text-xl font-semibold">How to join</h2>
          <p className="mt-1 text-sm text-muted-foreground">Open to: {c.openTo}. Led by {c.leaders}.</p>
          <ol className="mt-4 space-y-3">
            {c.howToJoin.map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-sm font-medium text-primary-foreground">{i + 1}</span>
                <p className="pt-0.5">{step}</p>
              </li>
            ))}
          </ol>

          {upcoming.length > 0 && (
            <>
              <h2 className="mt-10 text-xl font-semibold">Coming up nearby</h2>
              <ul className="mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
                {upcoming.map((e) => (
                  <li key={e.slug}>
                    <Link to="/events/$slug" params={{ slug: e.slug }} className="group flex items-center gap-4 p-4 transition-colors hover:bg-secondary">
                      <CalendarDays className="h-5 w-5 shrink-0 text-brick" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium group-hover:text-primary">{e.title}</p>
                        <p className="truncate text-sm text-muted-foreground">{e.date} · {e.time} · {e.place}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          <h2 className="mt-10 text-xl font-semibold">Talk with neighbors</h2>
          <ul className="mt-3 space-y-2">
            {related.map((r) => (
              <li key={r.id}>
                <Link to="/stories/$slug" params={{ slug: r.slug ?? "" }} className="flex items-center gap-2 text-primary hover:underline"><MessagesSquare className="h-4 w-4 shrink-0" />{r.title}</Link>
              </li>
            ))}
          </ul>
          <Link to="/stories" search={{ new: `Question for ${c.name}` }} className="mt-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-primary hover:bg-accent">
            <MessagesSquare className="h-4 w-4" />Ask the club a question
          </Link>
        </div>

        <aside className="md:sticky md:top-24 md:self-start">
          <JoinCard
            title="Join this block club"
            subtitle={<>Free to join. A volunteer will reach out with the next meeting details.</>}
            action="Request to join"
            doneTitle="Request sent!"
            doneBody={`${c.leaders.split(" & ")[0]} or another volunteer will get back to you before the next meeting (${c.meets}).`}
            request={request}
            onSubmit={submit}
            onCancel={cancel}
            notePlaceholder="Which street are you on? What would you like to help with? (optional)"
          />
        </aside>
      </div>
    </div>
  );
}
