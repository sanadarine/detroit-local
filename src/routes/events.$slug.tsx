import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Baby, CalendarDays, Clock, MapPin, MessagesSquare, Package, Store, Ticket, Users } from "lucide-react";
import { blockClubs, events, vendors } from "@/lib/data";
import { eventSignup, useJoin } from "@/lib/joins";
import { NeighborhoodArt } from "@/components/NeighborhoodArt";
import { HeartButton } from "@/components/HeartButton";
import { JoinCard } from "@/components/JoinCard";

export const Route = createFileRoute("/events/$slug")({
  loader: ({ params }) => {
    const e = events.find((x) => x.slug === params.slug);
    if (!e) throw notFound();
    return e;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} · ${loaderData.date} — Detroit Local` },
          { name: "description", content: `${loaderData.date}, ${loaderData.time} at ${loaderData.place}. ${loaderData.about}` },
          { property: "og:title", content: `${loaderData.title} — ${loaderData.date}` },
          { property: "og:description", content: loaderData.about },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary" },
        ]
      : [{ title: "Event not found — Detroit Local" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="text-3xl font-semibold">We couldn't find that event</h1>
      <Link to="/stories" search={{ section: "community" }} className="mt-4 inline-block text-primary">See upcoming events</Link>
    </div>
  ),
  component: EventPage,
});

function EventPage() {
  const e = Route.useLoaderData();
  const { request, submit, cancel } = useJoin(`event:${e.slug}`);
  const state = eventSignup(e, request);
  const club = blockClubs.find((c) => c.slug === e.hostClub);
  const vendor = vendors.find((v) => v.slug === e.hostVendor);
  const [mon, day] = e.date.split(" ");

  const facts = [
    { icon: Clock, label: "When", value: `${e.date}, 2026 · ${e.time}` },
    { icon: MapPin, label: "Where", value: `${e.place}, ${e.neighborhood}` },
    { icon: Ticket, label: "Cost", value: e.cost },
    ...(e.capacity ? [{ icon: Users, label: "Spots", value: state.kind === "waitlist" ? `Full (${e.capacity} people) · waitlist open` : `${state.spotsLeft} of ${e.capacity} left` }] : []),
    ...(e.kidFriendly ? [{ icon: Baby, label: "Kids", value: "Kid-friendly, so bring the family" }] : []),
  ];

  const card =
    state.kind === "drop-in"
      ? { title: "No sign-up needed", subtitle: "Just show up! Tap below so the host knows roughly how many to expect.", doneTitle: "See you there!", doneBody: `We let ${e.host} know you're planning to come.` }
      : state.kind === "waitlist"
        ? { title: "This event is full", subtitle: "Join the waitlist and the host will reach out if a spot opens up.", doneTitle: "You're on the waitlist", doneBody: `${e.host} will reach out if a spot opens.` }
        : { title: "Request a spot", subtitle: <>Spots are limited, <span className="font-medium text-foreground">{state.spotsLeft} left</span>. The host confirms each request.</>, doneTitle: "Request sent!", doneBody: `${e.host} will confirm your spot before ${e.date}.` };

  return (
    <div className="mx-auto max-w-5xl px-4 pt-6 md:px-5 md:pt-10">
      <Link to="/stories" search={{ section: "community" }} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" />Block clubs &amp; events</Link>

      <div className="relative mt-4 overflow-hidden rounded-3xl shadow-lift">
        <NeighborhoodArt name={e.neighborhood} className="aspect-[5/2] w-full md:aspect-[3/1]" />
        <div className="absolute left-4 top-4 grid w-16 place-items-center rounded-2xl bg-card/95 py-2 text-center leading-none shadow-lift backdrop-blur md:left-6 md:top-6">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-brick">{mon}</span>
          <span className="mt-1 font-display text-3xl">{day}</span>
        </div>
      </div>

      <div className="mt-6 grid gap-8 md:grid-cols-[1fr_340px] md:gap-10">
        <div>
          <p className="flex items-center gap-1.5 text-sm font-medium text-primary"><CalendarDays className="h-4 w-4" />Event · {e.neighborhood}</p>
          <div className="mt-1 flex items-start justify-between gap-3">
            <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">{e.title}</h1>
            <HeartButton kind="event" id={e.slug} label={e.title} variant="pill" className="mt-1 shrink-0" />
          </div>
          <p className="mt-2 text-muted-foreground">
            Hosted by{" "}
            {club ? <Link to="/clubs/$slug" params={{ slug: club.slug }} className="font-medium text-primary hover:underline">{club.name}</Link>
              : vendor ? <Link to="/vendors/$slug" params={{ slug: vendor.slug }} className="font-medium text-primary hover:underline">{vendor.name}</Link>
              : e.host}
          </p>
          <p className="mt-4 text-lg leading-relaxed">{e.about}</p>

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

          <h2 className="mt-10 text-xl font-semibold">What to bring</h2>
          <ul className="mt-3 space-y-2">
            {e.bring.map((b) => (
              <li key={b} className="flex items-center gap-2"><Package className="h-4 w-4 shrink-0 text-brick" />{b}</li>
            ))}
          </ul>

          <h2 className="mt-10 text-xl font-semibold">How to join</h2>
          <ol className="mt-3 space-y-3">
            {(e.signup === "drop-in"
              ? ["No sign-up needed. Just show up at the time above.", "Tap “I'm going” so the host can plan.", "Questions? Ask in the forum and neighbors will answer."]
              : ["Request a spot with the box on this page.", `${e.host} confirms by text or email before the event.`, "Show up on the day. If plans change, cancel so someone else can go."]
            ).map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-sm font-medium text-primary-foreground">{i + 1}</span>
                <p className="pt-0.5">{step}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap gap-2">
            <Link to="/stories" search={{ new: `${e.title} (${e.date})` }} className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-primary hover:bg-accent">
              <MessagesSquare className="h-4 w-4" />Discuss in the forum
            </Link>
            {club && (
              <Link to="/clubs/$slug" params={{ slug: club.slug }} className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-primary hover:bg-accent">
                <Users className="h-4 w-4" />About {club.name}
              </Link>
            )}
            {vendor && (
              <Link to="/vendors/$slug" params={{ slug: vendor.slug }} className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-primary hover:bg-accent">
                <Store className="h-4 w-4" />Visit {vendor.name}
              </Link>
            )}
          </div>
        </div>

        <aside className="md:sticky md:top-24 md:self-start">
          <JoinCard
            title={card.title}
            subtitle={card.subtitle}
            action={state.action}
            doneTitle={card.doneTitle}
            doneBody={card.doneBody}
            request={request}
            onSubmit={submit}
            onCancel={cancel}
            askGuests
            notePlaceholder={e.hostVendor ? "How many pies, and what time works? (optional)" : "Anything the host should know? (optional)"}
          />
        </aside>
      </div>
    </div>
  );
}
