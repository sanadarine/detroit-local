import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Quote } from "lucide-react";
import { stories } from "@/lib/data";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Neighborhood stories — Porchlight Detroit" },
      { name: "description", content: "Stories passed down by long-time Detroit residents: history, family businesses and the people who hold blocks together." },
      { property: "og:title", content: "Neighborhood stories — Porchlight Detroit" },
      { property: "og:description", content: "Generations of Detroit wisdom, told by the people who lived it." },
    ],
  }),
  component: Stories,
});

function Stories() {
  return (
    <div className="mx-auto max-w-4xl px-4 pt-8 md:px-5 md:pt-12">
      <h1 className="text-3xl font-semibold md:text-5xl">Stories passed down</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">Long-time residents are this city's memory. Here's what they want the next generation to know.</p>
      <p className="mt-6 text-sm font-medium text-primary">Tap a neighbor to read their story</p>
      <div className="mt-3 space-y-4 md:space-y-6">
        {stories.map((s) => (
          <Link key={s.slug} to="/stories/$slug" params={{ slug: s.slug }} className="group grid grid-cols-[88px_1fr_auto] items-center gap-4 rounded-xl border border-border bg-card p-3 transition-shadow hover:shadow-lg md:grid-cols-[160px_1fr_auto] md:gap-6 md:p-4">
            <img src={s.image} alt={s.person} loading="lazy" width={1024} height={1024} className="aspect-square w-full rounded-full object-cover" />
            <div>
              <p className="text-sm font-medium text-brick">{s.person}</p>
              <h2 className="mt-0.5 text-lg font-semibold group-hover:text-primary md:text-2xl">{s.title}</h2>
              <p className="mt-2 hidden italic text-muted-foreground sm:block"><Quote className="mr-1 inline h-4 w-4 text-primary" />{s.excerpt}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        ))}
      </div>
      <div className="mt-16 rounded-xl bg-primary p-8 text-primary-foreground">
        <h2 className="text-2xl font-semibold">Have a story to share?</h2>
        <p className="mt-2 opacity-90">Soon you'll be able to record your own. Ask your block club about our story days.</p>
      </div>
    </div>
  );
}
