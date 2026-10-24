import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BadgeCheck, Clock, MapPin, Navigation } from "lucide-react";
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

function VendorPage() {
  const v = Route.useLoaderData();
  const { reviews, average, addReview } = useReviews(v.slug);
  return (
    <div className="mx-auto max-w-5xl px-4 pt-6 md:px-5 md:pt-10">
      <Link to="/explore" className="text-sm text-muted-foreground hover:text-foreground">← All vendors</Link>
      <div className="mt-4 grid gap-6 md:mt-6 md:grid-cols-2 md:gap-10">
        <img src={v.image} alt={v.name} width={1024} height={1024} className="aspect-square w-full rounded-3xl object-cover shadow-lift" />
        <div>
          <p className="flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-4 w-4 shrink-0" />{v.category} · {v.neighborhood} · {v.minutesAway} min away</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">{v.name}</h1>
          <p className="mt-1 text-lg">Run by {v.owner}</p>
          {reviews.length > 0 && (
            <a href="#reviews" className="mt-2 inline-flex items-center gap-2 text-sm hover:underline">
              <Stars value={average} /> <span className="font-medium">{average.toFixed(1)}</span> <span className="text-muted-foreground">· {reviews.length} review{reviews.length === 1 ? "" : "s"}</span>
            </a>
          )}
          <h2 className="mt-8 text-sm font-medium uppercase tracking-widest text-brick">Their story</h2>
          <p className="mt-2 leading-relaxed">{v.story}</p>
          <h2 className="mt-8 text-sm font-medium uppercase tracking-widest text-brick">Services</h2>
          <ul className="mt-2 space-y-1">{v.services.map((s) => <li key={s}>• {s}</li>)}</ul>
          <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4" />{v.hours}</p>
          <div className="mt-8 rounded-2xl border border-border bg-secondary p-5">
            <h2 className="text-lg font-semibold">Vouched for by neighbors</h2>
            <ul className="mt-3 space-y-2">
              {v.vouchedBy.map((p) => (
                <li key={p.name} className="flex items-center gap-3 text-sm">
                  <BadgeCheck className="h-6 w-6 shrink-0 text-primary" />
                  {p.name} <span className="text-muted-foreground">· {p.years} years in the neighborhood</span>
                </li>
              ))}
            </ul>
          </div>
          <section className="mt-8">
            <h2 className="text-sm font-medium uppercase tracking-widest text-brick">Find them</h2>
            <Link to="/explore" search={{ hood: v.neighborhood }} className="group mt-3 block overflow-hidden rounded-2xl border border-border shadow-soft">
              <NeighborhoodArt name={v.neighborhood} className="aspect-[5/2] w-full" />
              <p className="bg-card px-4 py-2.5 text-sm font-medium">In {v.neighborhood} <span className="text-muted-foreground">· see more locals →</span></p>
            </Link>
            <p className="mt-2 flex items-start gap-2 text-sm"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{v.address}</p>
            {v.approximate && <p className="mt-1 text-xs text-muted-foreground">Home-based, so we show the general area. Exact pickup spot shared when you order.</p>}
            <GoogleMap className="mt-3 h-64 md:h-72" center={{ lat: v.lat, lng: v.lng }} zoom={v.approximate ? 15 : 16} pins={[{ id: v.slug, lat: v.lat, lng: v.lng, title: v.name, approximate: v.approximate }]} />
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${v.lat},${v.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground shadow-soft transition hover:opacity-90 active:scale-[0.98]"
            >
              <Navigation className="h-4 w-4" />{v.approximate ? "Directions to pickup spot" : "Get directions"}
            </a>
          </section>
        </div>
      </div>
      <VendorReviews name={v.name} reviews={reviews} average={average} onAdd={addReview} />
    </div>
  );
}
