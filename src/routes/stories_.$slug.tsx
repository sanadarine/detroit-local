import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MessagesSquare, Quote, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { seedThreads } from "@/lib/data";
import { formatDate, useForum } from "@/lib/forum";
import { searchSite } from "@/lib/search";

export const Route = createFileRoute("/stories_/$slug")({
  loader: ({ params }) => seedThreads.find((x) => x.slug === params.slug) ?? null,
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Detroit Local` },
          { name: "description", content: loaderData.excerpt },
          { property: "og:title", content: `${loaderData.title} — ${loaderData.person}` },
          { property: "og:description", content: loaderData.excerpt },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary" },
        ]
      : [{ title: "Forum thread — Detroit Local" }, { name: "robots", content: "noindex" }],
  }),
  component: ThreadPage,
});

function ThreadPage() {
  const { slug } = Route.useParams();
  const seed = Route.useLoaderData();
  const { threads, loaded, addReply } = useForum();
  const thread = threads.find((t) => t.slug === slug) ?? seed;
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const related = useMemo(() => (thread ? searchSite(thread.title, threads, ["thread"]).filter((r) => r.slug !== thread.slug).slice(0, 3) : []), [thread, threads]);

  if (!thread) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="text-3xl font-semibold">{loaded ? "We couldn't find that thread" : "Loading…"}</h1>
        {loaded && <Link to="/stories" className="mt-4 inline-block text-primary">Back to the forum</Link>}
      </div>
    );
  }

  function reply(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || !thread) return;
    addReply(thread.slug, name, text);
    setText("");
  }

  return (
    <article className="mx-auto max-w-3xl px-4 pt-6 md:px-5 md:pt-10">
      <Link to="/stories" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" />Forum</Link>
      <div className="mt-5 flex items-center gap-4">
        {thread.image && <img src={thread.image} alt={thread.person} width={1024} height={1024} className="h-16 w-16 shrink-0 rounded-full object-cover md:h-20 md:w-20" />}
        <div>
          <p className="text-sm text-brick">{thread.category} · {thread.teller}</p>
          <h1 className="mt-1 text-3xl font-semibold leading-tight md:text-5xl">{thread.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{formatDate(thread.date)}</p>
        </div>
      </div>
      {thread.featured && (
        <blockquote className="mt-8 border-l-4 border-primary pl-4 text-lg italic md:text-xl">
          <Quote className="mb-2 h-5 w-5 text-primary" />"{thread.excerpt}"
        </blockquote>
      )}
      <div className="mt-8 space-y-5 text-base leading-relaxed md:text-lg">
        {thread.body.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-xl font-semibold"><MessagesSquare className="h-5 w-5 text-primary" />{thread.replies.length} {thread.replies.length === 1 ? "reply" : "replies"}</h2>
        <ul className="mt-4 space-y-3">
          {thread.replies.map((r) => (
            <li key={r.id} className="rounded-2xl border border-border bg-card p-4">
              <p className="text-sm"><span className="font-medium">{r.author}</span>{r.note && <span className="text-muted-foreground"> · {r.note}</span>}<span className="text-muted-foreground"> · {formatDate(r.date)}</span></p>
              <p className="mt-1.5 leading-relaxed">{r.text}</p>
            </li>
          ))}
        </ul>
        <form onSubmit={reply} className="mt-4 space-y-2 rounded-2xl border border-border bg-secondary p-4">
          <input maxLength={60} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 outline-none focus:border-primary" />
          <textarea required maxLength={2000} rows={3} placeholder="Add to the conversation…" value={text} onChange={(e) => setText(e.target.value)} className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 outline-none focus:border-primary" />
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Demo: replies are saved on this device only.</p>
            <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"><Send className="h-4 w-4" />Reply</button>
          </div>
        </form>
      </section>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold">Related threads</h2>
          <div className="mt-3 grid gap-2">
            {related.map((r) => (
              <Link key={r.id} to="/stories/$slug" params={{ slug: r.slug ?? "" }} className="rounded-xl border border-border bg-card p-3 hover:bg-secondary">
                <p className="font-medium">{r.title}</p>
                <p className="truncate text-xs text-muted-foreground">{r.snippet}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
