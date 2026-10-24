import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HandHeart, Handshake, Landmark, MapPin, MessagesSquare, Sprout, Store } from "lucide-react";
import hero from "@/assets/hero-v2.jpg";
import { stories, vendors } from "@/lib/data";
import { VendorCard } from "@/components/VendorCard";
import { SearchBar } from "@/components/SearchBar";
import { Reveal } from "@/components/Reveal";
import { Typewriter } from "@/components/Typewriter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Detroit Local — Know your neighbors" },
      { name: "description", content: "Search real local businesses, parks, city services and neighborhood threads across Detroit." },
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

const headlinePhrases = [
  "Support them.",
  "Ask them anything.",
  "Share your stories.",
  "Grow together.",
  "Look out for each other.",
  "Lift up your block.",
];

const popular = ["Daycare in Corktown", "Fresh produce", "Flood prep", "Business permits"];

function Index() {
  const featured = stories[0]!;
  return (
    <div>
      <section className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <img src={hero} alt="A grandmother hands a basket of fresh greens over her fence to a young family on a Detroit street at golden hour" width={1920} height={1088} fetchPriority="high" className="h-full w-full scale-105 object-cover object-[60%_center] brightness-110 saturate-[1.05]" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
        </div>
        <div className="relative mx-auto flex min-h-[560px] max-w-4xl flex-col items-center justify-center px-4 py-16 text-center text-primary-foreground md:min-h-[640px] md:px-5">
          <p className="animate-rise text-xs font-medium uppercase tracking-[0.25em] opacity-90">Detroit, Michigan</p>
          <h1 className="mt-3 animate-rise text-4xl font-semibold leading-[1.05] tracking-tight [text-shadow:0_2px_24px_rgb(0_0_0/0.45)] md:text-7xl" style={{ animationDelay: "80ms" }}>
            <span className="sr-only">Know your neighbors. Support them.</span>
            <span aria-hidden>Know your neighbors.</span>
            <Typewriter phrases={headlinePhrases} className="block min-h-[2.1em] text-accent md:min-h-[1.05em]" />
          </h1>
          <p className="mt-4 max-w-xl animate-rise text-base opacity-95 [text-shadow:0_1px_12px_rgb(0_0_0/0.5)] md:text-lg" style={{ animationDelay: "160ms" }}>
            Detroit Local is where you connect with real locals, learn, grow, and support others
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


      <section className="mx-auto mt-12 grid max-w-6xl gap-3 px-4 md:mt-20 md:grid-cols-3 md:gap-4 md:px-5">
        {doors.map((d, i) => (
          <Reveal key={d.title} delay={i * 80}>
            <Link to={d.to} {...("search" in d ? { search: d.search } : {})} className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft transition-[box-shadow,border-color] duration-300 ease-out hover:border-primary/25 hover:shadow-lift md:block md:p-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><d.icon className="h-5 w-5" /></span>
              <div className="min-w-0 md:mt-4">
                <h2 className="text-xl font-semibold md:text-2xl">{d.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground md:mt-2 md:text-base">{d.body}</p>
                <span className="mt-3 hidden items-center gap-1 text-sm font-medium text-primary md:inline-flex">Start here <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" /></span>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>

      <Reveal as="section" aria-labelledby="about" className="mt-16 bg-secondary/60 py-16 md:mt-24 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-5">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-brick">About Detroit Local</p>
            <h2 id="about" className="mt-3 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">The neighborhood, back on the front porch.</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Detroit Local brings neighbors and the people who serve them into one place. Find the farmer, baker or fixer down the street, ask the block a question, look up a city service, or get your own business on the map, whether you just moved here or have been here fifty years. Detroit Local is where everything local grows.
            </p>
          </div>
          <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-4 lg:gap-x-8">
            {[
              { icon: Sprout, t: "Find people, not just businesses", d: "Browse local farms, food, home services, childcare and more by neighborhood, or by who's a few minutes away." },
              { icon: MessagesSquare, t: "Ask once, the whole block answers", d: "Questions, recommendations and stories live in one searchable forum, so good answers don't get lost." },
              { icon: Landmark, t: "City help in one place", d: "Trash day, 311 requests, block clubs and key numbers, without digging through city websites." },
              { icon: Handshake, t: "Sellers grow together", d: "Local businesses share skills, supplies and buying power, with a plain-language permit guide." },
            ].map((p) => (
              <li key={p.t} className="min-w-0 text-left">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-card text-primary shadow-soft ring-1 ring-border"><p.icon className="h-5 w-5" /></span>
                <h3 className="mt-4 text-lg font-semibold leading-snug">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>


      <Reveal as="section" className="mx-auto mt-16 grid max-w-6xl items-center gap-6 px-4 md:mt-24 md:grid-cols-2 md:gap-12 md:px-5">
        <img src={featured.image} alt={featured.title} loading="lazy" width={1024} height={1024} className="aspect-square w-full rounded-3xl object-cover shadow-lift" />
        <div>
          <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-brick"><MessagesSquare className="h-4 w-4" />From the forum</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">{featured.title}</h2>
          <blockquote className="mt-5 text-lg italic">"{featured.excerpt}"</blockquote>
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
