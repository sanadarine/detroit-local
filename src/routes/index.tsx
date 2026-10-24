import { createFileRoute, Link } from "@tanstack/react-router";
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
  { to: "/explore", title: "I'm new to Detroit", body: "Find trusted help, food and childcare within a few minutes of home." },
  { to: "/stories", title: "I've been here a while", body: "Share what you know, vouch for good people, pass down the stories." },
  { to: "/vendor-hub", title: "I run a business", body: "Reach neighbors, share skills and supplies, and get help with permits." },
] as const;

function Index() {
  const featured = stories[0];
  return (
    <div>
      <section className="relative">
        <img src={hero} alt="Neighbors on a Detroit street at sunset" width={1600} height={912} className="h-[520px] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-5 pb-12 text-primary-foreground">
          <p className="text-sm uppercase tracking-widest">Detroit, Michigan</p>
          <h1 className="mt-2 max-w-2xl text-4xl font-semibold leading-tight md:text-6xl">Know your neighbors. Buy from them.</h1>
          <p className="mt-4 max-w-xl text-lg opacity-90">The farmer down the street, the baker on your block, the handyman everyone trusts — all within five minutes.</p>
          <Link to="/explore" className="mt-6 inline-block rounded-full bg-brick px-6 py-3 font-medium text-brick-foreground hover:opacity-90">Explore your neighborhood</Link>
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-6xl gap-4 px-5 md:grid-cols-3">
        {doors.map((d) => (
          <Link key={d.to} to={d.to} className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary">
            <h2 className="text-2xl font-semibold">{d.title}</h2>
            <p className="mt-2 text-muted-foreground">{d.body}</p>
            <span className="mt-4 inline-block text-sm font-medium text-primary">Start here →</span>
          </Link>
        ))}
      </section>

      <section className="mx-auto mt-20 grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2">
        <img src={featured.image} alt={featured.title} loading="lazy" width={1024} height={1024} className="aspect-square w-full rounded-2xl object-cover" />
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-brick">A neighborhood story</p>
          <h2 className="mt-2 text-4xl font-semibold">{featured.title}</h2>
          <blockquote className="mt-4 border-l-4 border-primary pl-4 text-lg italic">"{featured.excerpt}"</blockquote>
          <p className="mt-3 text-sm text-muted-foreground">— {featured.teller}</p>
          <Link to="/stories" className="mt-6 inline-block font-medium text-primary">Read more stories →</Link>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-5">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-semibold">Close to home</h2>
          <Link to="/explore" className="text-sm font-medium text-primary">See all →</Link>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {vendors.slice(0, 3).map((v) => <VendorCard key={v.slug} v={v} />)}
        </div>
      </section>
    </div>
  );
}
