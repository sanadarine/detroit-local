import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Quote } from "lucide-react";
import { stories } from "@/lib/data";

export const Route = createFileRoute("/stories_/$slug")({
  loader: ({ params }) => {
    const s = stories.find((x) => x.slug === params.slug);
    if (!s) throw notFound();
    return s;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Porchlight Detroit` },
          { name: "description", content: loaderData.excerpt },
          { property: "og:title", content: `${loaderData.title} — told by ${loaderData.person}` },
          { property: "og:description", content: loaderData.excerpt },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary" },
        ]
      : [{ title: "Story not found — Porchlight Detroit" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="text-3xl font-semibold">We couldn't find that story</h1>
      <Link to="/stories" className="mt-4 inline-block text-primary">Back to stories</Link>
    </div>
  ),
  component: StoryPage,
});

function StoryPage() {
  const s = Route.useLoaderData();
  const others = stories.filter((x) => x.slug !== s.slug);
  return (
    <article className="mx-auto max-w-3xl px-4 pt-6 md:px-5 md:pt-10">
      <Link to="/stories" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" />All stories</Link>
      <div className="mt-5 flex items-center gap-4">
        <img src={s.image} alt={s.person} width={1024} height={1024} className="h-20 w-20 shrink-0 rounded-full object-cover md:h-24 md:w-24" />
        <div>
          <p className="text-sm text-brick">{s.teller}</p>
          <h1 className="mt-1 text-3xl font-semibold md:text-5xl">{s.title}</h1>
        </div>
      </div>
      <blockquote className="mt-8 border-l-4 border-primary pl-4 text-lg italic md:text-xl">
        <Quote className="mb-2 h-5 w-5 text-primary" />"{s.excerpt}"
      </blockquote>
      <div className="mt-8 space-y-5 text-base leading-relaxed md:text-lg">
        {s.body.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <p className="mt-8 text-sm text-muted-foreground">— As told by {s.person}</p>
      <h2 className="mt-14 text-xl font-semibold">More stories</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {others.map((o) => (
          <Link key={o.slug} to="/stories/$slug" params={{ slug: o.slug }} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 hover:bg-secondary">
            <img src={o.image} alt={o.person} loading="lazy" className="h-14 w-14 rounded-full object-cover" />
            <div><p className="font-medium">{o.title}</p><p className="text-xs text-muted-foreground">{o.person}</p></div>
          </Link>
        ))}
      </div>
    </article>
  );
}
