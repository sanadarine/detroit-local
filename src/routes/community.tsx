import { createFileRoute } from "@tanstack/react-router";
import { blockClubs, events } from "@/lib/data";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Block clubs & events — Porchlight Detroit" },
      { name: "description", content: "Find your Detroit block club, upcoming neighborhood events and ways to get involved." },
      { property: "og:title", content: "Block clubs & events — Porchlight Detroit" },
      { property: "og:description", content: "Get involved with your Detroit neighborhood." },
    ],
  }),
  component: Community,
});

function Community() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-12">
      <h1 className="text-4xl font-semibold md:text-5xl">Show up for your block</h1>
      <p className="mt-2 text-muted-foreground">Block clubs, gatherings and simple ways to pitch in.</p>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <section>
          <h2 className="text-2xl font-semibold">Upcoming events</h2>
          <ul className="mt-4 divide-y divide-border rounded-xl border border-border bg-card">
            {events.map((e) => (
              <li key={e.title} className="flex gap-4 p-4">
                <span className="w-16 shrink-0 font-display text-lg text-brick">{e.date}</span>
                <div>
                  <p className="font-medium">{e.title}</p>
                  <p className="text-sm text-muted-foreground">{e.place} · {e.neighborhood}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Block clubs</h2>
          <div className="mt-4 grid gap-3">
            {blockClubs.map((b) => (
              <div key={b.name} className="rounded-xl border border-border bg-card p-4">
                <p className="font-medium">{b.name}</p>
                <p className="text-sm text-muted-foreground">{b.neighborhood} · Meets {b.meets} · {b.members} members</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
