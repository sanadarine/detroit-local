import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HandHeart, MapPin, Store } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { stories, vendors } from "@/lib/data";
import { VendorCard } from "@/components/VendorCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Porchlight Detroit — Know your neighbors" },
      { name: "description", content: "Find local farmers, home businesses and trusted services in your Detroit neighborhood, vouched for by long-time residents." },
      { property: "og:title", content: "Porchlight Detroit — Know your neighbors" },
      { property: "og:description", content: "Local farmers, home businesses and trusted services across Detroit neighborhoods." },
    ],
  }),
  component: Index,
});

const doors = [
  { to: "/explore", icon: MapPin, title: "I'm new to Detroit", body: "Find trusted help, food and childcare within a few minutes of home." },
  { to: "/stories", icon: HandHeart, title: "I've been here a while", body: "Share what you know, vouch for good people, pass down the stories." },
  { to: "/vendor-hub", icon: Store, title: "I run a business", body: "Reach neighbors, share skills and supplies, and get help with permits." },
] as const;

function Index() {
  const featured = stories[0]!;
  return (
    <div>
      <section className="relative">
        <img src={hero} alt="Neighbors on a Detroit street at sunset" width={1600} height={912} className="h-[460px] w-full md:h-[560px] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-5 pb-8 text-primary-foreground md:pb-12">
          <p className="text-sm uppercase tracking-widest">Detroit, Michigan</p>
          <h1 className="mt-2 max-w-2xl text-3xl font-semibold leading-tight md:text-6xl">Know your neighbors. Buy from them.</h1>
          <p className="mt-3 max-w-xl text-base opacity-90 md:mt-4 md:text-lg">The farmer down the street, the baker on your block, the handyman everyone trusts — all within five minutes.</p>
          <Link to="/explore" className="mt-5 inline-flex items-center gap-2 rounded-full bg-brick px-5 py-3 font-medium text-brick-foreground hover:opacity-90"><MapPin className="h-4 w-4" /> Explore your neighborhood</Link>
        </div>
      </section>

      <section className="mx-auto mt-10 grid max-w-6xl gap-3 px-4 md:mt-16 md:gap-4 md:px-5 md:grid-cols-3">
        {doors.map((d) => (
          <Link key={d.to} to={d.to} className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary md:block md:p-6">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-primary"><d.icon className="h-5 w-5" /></span>
            <div className="min-w-0 md:mt-4">
              <h2 className="text-xl font-semibold md:text-2xl">{d.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground md:mt-2 md:text-base">{d.body}</p>
              <span className="mt-3 hidden items-center gap-1 text-sm font-medium text-primary md:inline-flex">Start here <ArrowRight className="h-4 w-4" /></span>
            </div>
          </Link>
        ))}
      </section>

      <section className="mx-auto mt-14 grid max-w-6xl items-center gap-6 px-4 md:mt-20 md:gap-10 md:px-5 md:grid-cols-2">
        <img src={featured.image} alt={featured.title} loading="lazy" width={1024} height={1024} className="aspect-square w-full rounded-2xl object-cover" />
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-brick">A neighborhood story</p>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">{featured.title}</h2>
          <blockquote className="mt-4 border-l-4 border-primary pl-4 text-lg italic">"{featured.excerpt}"</blockquote>
          <p className="mt-3 text-sm text-muted-foreground">— {featured.teller}</p>
          <Link to="/stories" className="mt-6 inline-block font-medium text-primary">Read more stories →</Link>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-6xl px-4 md:mt-20 md:px-5">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold md:text-3xl">Close to home</h2>
          <Link to="/explore" className="text-sm font-medium text-primary">See all →</Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {vendors.slice(0, 3).map((v) => <VendorCard key={v.slug} v={v} />)}
        </div>
      </section>
    </div>
  );
}
