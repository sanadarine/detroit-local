import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Users } from "lucide-react";
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
    <div className="mx-auto max-w-6xl px-4 pt-8 md:px-5 md:pt-12">
      <h1 className="text-3xl font-semibold md:text-5xl">Show up for your block</h1>
      <p className="mt-2 text-muted-foreground">Block clubs, gatherings and simple ways to pitch in.</p>
      <div className="mt-8 grid gap-8 md:mt-10 md:gap-10 md:grid-cols-2">
        <section>
          <h2 className="flex items-center gap-2 text-2xl font-semibold"><CalendarDays className="h-6 w-6 text-brick" />Upcoming events</h2>
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
          <h2 className="flex items-center gap-2 text-2xl font-semibold"><Users className="h-6 w-6 text-brick" />Block clubs</h2>
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
