import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, ExternalLink, Globe, Instagram, MapPin, Navigation, Phone, Quote, Star } from "lucide-react";
import { vendors } from "@/lib/data";
import { GoogleMap } from "@/components/GoogleMap";
import { NeighborhoodArt } from "@/components/NeighborhoodArt";
import { Stars, VendorReviews } from "@/components/VendorReviews";
import { useReviews } from "@/lib/reviews";

export const Route = createFileRoute("/vendors/$slug")({
  loader: ({ params }) => {
    const v = vendors.find((x) => x.slug === params.slug);
    if (!v) throw notFound();
    return v;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Detroit Local` },
          { name: "description", content: loaderData.tagline },
          { property: "og:title", content: `${loaderData.name} — Detroit Local` },
          { property: "og:description", content: loaderData.tagline },
          { property: "og:type", content: "profile" },
        ]
      : [{ title: "Vendor not found — Detroit Local" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="text-3xl font-semibold">We couldn't find that neighbor</h1>
      <Link to="/explore" className="mt-4 inline-block text-primary">Back to explore</Link>
    </div>
  ),
  component: VendorPage,
});

function host(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function VendorPage() {
  const v = Route.useLoaderData();
  const { reviews, average, addReview } = useReviews(v.slug);
  const q = encodeURIComponent(`${v.name} ${v.address}`);
  const facts = [
    { icon: MapPin, label: "Address", value: v.address, href: `https://www.google.com/maps/search/?api=1&query=${q}` },
    ...(v.hours ? [{ icon: Clock, label: "Hours", value: v.hours }] : []),
    ...(v.phone ? [{ icon: Phone, label: "Phone", value: v.phone, href: `tel:+1${v.phone.replace(/\D/g, "").slice(-10)}` }] : []),
    ...(v.website ? [{ icon: Globe, label: "Website", value: host(v.website), href: v.website }] : []),
    ...(v.instagram ? [{ icon: Instagram, label: "Instagram", value: `@${v.instagram.replace(/\/$/, "").split("/").pop()}`, href: v.instagram }] : []),
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 pt-6 md:px-5 md:pt-10">
      <Link to="/explore" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" />Explore</Link>

      <div className="relative mt-4 overflow-hidden rounded-3xl shadow-lift">
        <NeighborhoodArt name={v.neighborhood} className="aspect-[5/2] w-full md:aspect-[3/1]" />
      </div>

      <div className="mt-6 grid gap-8 md:grid-cols-[1fr_340px] md:gap-10">
        <div>
          <p className="text-sm font-medium text-brick">{v.category} · {v.subArea}, {v.neighborhood}</p>
          <h1 className="mt-1 text-4xl font-semibold tracking-tight md:text-5xl">{v.name}</h1>
          {v.owner && <p className="mt-1 text-lg text-muted-foreground">Run by {v.owner}</p>}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            {v.rating && (
              <span className="inline-flex items-center gap-2"><Stars value={v.rating.stars} /><span className="font-medium">{v.rating.stars.toFixed(1)}</span><span className="text-muted-foreground">{v.rating.count} reviews on {v.rating.source}</span></span>
            )}
            {reviews.length > 0 && <a href="#reviews" className="text-primary hover:underline">{reviews.length} neighbor review{reviews.length === 1 ? "" : "s"}</a>}
          </div>

          <p className="mt-6 text-lg leading-relaxed">{v.tagline}</p>
          <h2 className="mt-8 text-sm font-medium uppercase tracking-widest text-brick">Their story</h2>
          <p className="mt-2 leading-relaxed">{v.story}</p>

          {v.services.length > 0 && (
            <>
              <h2 className="mt-8 text-sm font-medium uppercase tracking-widest text-brick">What they offer</h2>
              <ul className="mt-3 flex flex-wrap gap-2">{v.services.map((s) => <li key={s} className="rounded-full bg-secondary px-3 py-1.5 text-sm">{s}</li>)}</ul>
            </>
          )}

          <section className="mt-10 rounded-2xl border border-border bg-card p-5 shadow-soft">
            <h2 className="flex items-center gap-2 text-lg font-semibold"><Quote className="h-5 w-5 text-brick" />What reviewers say</h2>
            {v.reviewHighlights.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {v.reviewHighlights.map((r) => <li key={r} className="flex gap-2 text-sm leading-relaxed"><Star className="mt-0.5 h-4 w-4 shrink-0 fill-brick text-brick" />{r}</li>)}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">Read what customers say on Google and Yelp.</p>
            )}
            <p className="mt-2 text-xs text-muted-foreground">Summarized in our own words from public reviews.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3.5 py-1.5 text-sm font-medium hover:bg-accent">Google reviews <ExternalLink className="h-3.5 w-3.5" /></a>
              <a href={`https://www.yelp.com/search?find_desc=${encodeURIComponent(v.name)}&find_loc=${encodeURIComponent("Detroit, MI")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3.5 py-1.5 text-sm font-medium hover:bg-accent">Yelp <ExternalLink className="h-3.5 w-3.5" /></a>
            </div>
          </section>

          {v.sources.length > 0 && (
            <p className="mt-6 text-xs text-muted-foreground">
              Info from{" "}
              {v.sources.slice(0, 4).map((src, i) => (
                <span key={src}>
                  {i > 0 && ", "}
                  <a href={src} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">{host(src)}</a>
                </span>
              ))}
              . Hours and details can change, so check with the business.
            </p>
          )}
        </div>

        <aside className="space-y-4 md:sticky md:top-24 md:self-start">
          <dl className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            {facts.map((f) => (
              <div key={f.label} className="flex gap-3 p-4">
                <f.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div className="min-w-0">
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground">{f.label}</dt>
                  <dd className="mt-0.5 break-words">
                    {"href" in f && f.href ? <a href={f.href} {...(f.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="text-primary hover:underline">{f.value}</a> : f.value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
          <GoogleMap className="h-56" center={{ lat: v.lat, lng: v.lng }} zoom={16} pins={[{ id: v.slug, lat: v.lat, lng: v.lng, title: v.name }]} />
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${q}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground shadow-soft transition hover:opacity-90 active:scale-[0.98]"
          >
            <Navigation className="h-4 w-4" />Get directions
          </a>
          <Link to="/explore" search={{ hood: v.neighborhood }} className="block text-center text-sm font-medium text-primary hover:underline">More locals in {v.neighborhood} →</Link>
        </aside>
      </div>
      <VendorReviews name={v.name} reviews={reviews} average={average} onAdd={addReview} />
    </div>
  );
}
