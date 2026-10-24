import { createFileRoute } from "@tanstack/react-router";
import { Quote } from "lucide-react";
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
      <div className="mt-8 space-y-8 md:mt-10 md:space-y-12">
        {stories.map((s) => (
          <article key={s.title} className="grid grid-cols-[96px_1fr] gap-4 md:grid-cols-[240px_1fr] md:gap-6">
            <img src={s.image} alt={s.title} loading="lazy" width={1024} height={1024} className="aspect-square w-full rounded-xl object-cover" />
            <div>
              <h2 className="text-xl font-semibold md:text-3xl">{s.title}</h2>
              <p className="mt-1 text-sm text-brick">{s.teller}</p>
              <Quote className="mt-3 h-5 w-5 text-primary" /><p className="mt-1 text-base italic leading-relaxed md:text-lg">"{s.excerpt}"</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-16 rounded-xl bg-primary p-8 text-primary-foreground">
        <h2 className="text-2xl font-semibold">Have a story to share?</h2>
        <p className="mt-2 opacity-90">Soon you'll be able to record your own. Ask your block club about our story days.</p>
      </div>
    </div>
  );
}
