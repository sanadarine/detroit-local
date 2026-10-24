import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, HandHeart, Handshake, MapPin, MessagesSquare, Sprout, Store } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { neighborhoods, seedThreads, stories, vendors } from "@/lib/data";
import { VendorCard } from "@/components/VendorCard";
import { SearchBar } from "@/components/SearchBar";
import { NeighborhoodStrip } from "@/components/NeighborhoodStrip";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Detroit Local — Know your neighbors" },
      { name: "description", content: "Search local farmers, home businesses, trusted services and neighborhood threads across Detroit, vouched for by long-time residents." },
      { property: "og:title", content: "Detroit Local — Know your neighbors" },
      { property: "og:description", content: "Local farmers, home businesses, trusted services and neighborhood conversations across Detroit." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const doors = [
  { to: "/explore", icon: MapPin, title: "I'm new to Detroit", body: "Find trusted help, food and childcare within a few minutes of home." },
  { to: "/stories", icon: HandHeart, title: "I've been here a while", body: "Answer questions, vouch for good people and pass down the stories." },
  { to: "/explore", search: { tab: "sell" as const }, icon: Store, title: "I run a business", body: "Reach neighbors, share skills and supplies, and get help with permits." },
] as const;

const popular = ["Daycare in Corktown", "Fresh produce", "Flood prep", "Business permits"];

function Index() {
  const featured = stories[0]!;
  return (
    <div>
      <section className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <img src={hero} alt="Neighbors on a Detroit street at sunset" width={1600} height={912} className="h-full w-full scale-105 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/45 to-foreground/10" />
        </div>
        <div className="relative mx-auto flex min-h-[560px] max-w-4xl flex-col items-center justify-center px-4 py-16 text-center text-primary-foreground md:min-h-[640px] md:px-5">
          <p className="animate-rise text-xs font-medium uppercase tracking-[0.25em] opacity-90">Detroit, Michigan</p>
          <h1 className="mt-3 animate-rise text-4xl font-semibold leading-[1.05] tracking-tight md:text-7xl" style={{ animationDelay: "80ms" }}>
            Know your neighbors.
            <br />
            Buy from them.
          </h1>
          <p className="mt-4 max-w-xl animate-rise text-base opacity-90 md:text-lg" style={{ animationDelay: "160ms" }}>
            Ask once, and the whole block answers. Search first, your question may already have a thread.
          </p>
          <div className="relative z-20 mt-8 w-full max-w-2xl animate-rise" style={{ animationDelay: "240ms" }}>
            <SearchBar size="hero" placeholder="Search daycare, produce, permits, stories…" />
          </div>
          <div className="mt-4 flex animate-rise flex-wrap justify-center gap-2" style={{ animationDelay: "320ms" }}>
            {popular.map((p) => (
              <Link key={p} to="/search" search={{ q: p }} className="rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-1 text-sm backdrop-blur transition hover:bg-primary-foreground/20">
                {p}
              </Link>
            ))}
          </div>
        </div>
      </section>


      <Reveal as="section" aria-labelledby="about" className="mx-auto mt-12 max-w-6xl px-4 md:mt-20 md:px-5">
        <div className="grid gap-8 md:grid-cols-[1.05fr_1fr] md:gap-14">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-brick">About Detroit Local</p>
            <h2 id="about" className="mt-2 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">The neighborhood, back on the front porch.</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Detroit Local connects people with the neighbors who make their blocks work: the farmer growing greens on a once-vacant lot, the auntie baking pies from her kitchen, the fixer who has kept the street's basements dry for twenty years.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Whether you just moved here, have lived here for fifty years or run a small business, it's one place to find trusted local help, ask the block a question and keep the city's stories going. Every local is vouched for by long-time residents, so newcomers can trust what they find and money stays in the neighborhood.
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-3">
              {[
                { n: neighborhoods.length, l: "neighborhoods" },
                { n: vendors.length, l: "vouched locals" },
                { n: seedThreads.length, l: "forum threads" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl bg-secondary px-3 py-4 text-center">
                  <dt className="sr-only">{s.l}</dt>
                  <dd className="font-display text-3xl font-semibold text-primary md:text-4xl">{s.n}</dd>
                  <dd className="mt-1 text-xs text-muted-foreground md:text-sm">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <ul className="space-y-3 md:pt-10">
            {[
              { icon: Sprout, t: "Find people, not just businesses", d: "Browse farmers, home businesses, repair, childcare and wellness by neighborhood, or see who's a few minutes' walk, bike, bus ride or drive away." },
              { icon: MessagesSquare, t: "Ask once, the whole block answers", d: "The forum keeps questions, recommendations and stories in one searchable place, with block clubs and events, so good answers don't get lost." },
              { icon: Handshake, t: "Help local sellers grow together", d: "Sellers share skills, supplies and buying power, and get a plain-language guide to Detroit permits." },
              { icon: BadgeCheck, t: "Built on trust", d: "Long-time residents vouch for locals and neighbors leave honest reviews, so trust passes down like a family recipe." },
            ].map((p) => (
              <li key={p.t} className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft md:p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground"><p.icon className="h-5 w-5" /></span>
                <div>
                  <h3 className="font-semibold">{p.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <section className="mx-auto mt-12 grid max-w-6xl gap-3 px-4 md:mt-20 md:grid-cols-3 md:gap-4 md:px-5">
        {doors.map((d, i) => (
          <Reveal key={d.title} delay={i * 80}>
            <Link to={d.to} {...("search" in d ? { search: d.search } : {})} className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift md:block md:p-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><d.icon className="h-5 w-5" /></span>
              <div className="min-w-0 md:mt-4">
                <h2 className="text-xl font-semibold md:text-2xl">{d.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground md:mt-2 md:text-base">{d.body}</p>
                <span className="mt-3 hidden items-center gap-1 text-sm font-medium text-primary md:inline-flex">Start here <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>

      <Reveal as="section" className="mx-auto mt-16 max-w-6xl px-4 md:mt-24 md:px-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-brick">Neighborhoods</p>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">Find your corner of the city</h2>
          </div>
          <Link to="/explore" className="hidden shrink-0 text-sm font-medium text-primary sm:block">Open the map →</Link>
        </div>
        <div className="mt-6">
          <NeighborhoodStrip />
        </div>
      </Reveal>

      <Reveal as="section" className="mx-auto mt-16 grid max-w-6xl items-center gap-6 px-4 md:mt-24 md:grid-cols-2 md:gap-12 md:px-5">
        <img src={featured.image} alt={featured.title} loading="lazy" width={1024} height={1024} className="aspect-square w-full rounded-3xl object-cover shadow-lift" />
        <div>
          <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-brick"><MessagesSquare className="h-4 w-4" />From the forum</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">{featured.title}</h2>
          <blockquote className="mt-5 border-l-4 border-primary pl-4 text-lg italic">"{featured.excerpt}"</blockquote>
          <p className="mt-3 text-sm text-muted-foreground">{featured.teller} · {featured.replies.length} replies</p>
          <Link to="/stories/$slug" params={{ slug: featured.slug }} className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-soft transition hover:opacity-90 active:scale-[0.98]">
            Join the conversation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>

      <Reveal as="section" className="mx-auto mt-16 max-w-6xl px-4 md:mt-24 md:px-5">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Close to home</h2>
          <Link to="/explore" className="text-sm font-medium text-primary">See all →</Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {vendors.slice(0, 3).map((v) => <VendorCard key={v.slug} v={v} />)}
        </div>
      </Reveal>
    </div>
  );
}
