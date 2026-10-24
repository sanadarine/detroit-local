import { PenLine, Star, User } from "lucide-react";
import { useState } from "react";
import type { Review } from "@/lib/data";
import { formatDate } from "@/lib/forum";

export function Stars({ value, className = "h-4 w-4" }: { value: number; className?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`${className} ${i <= Math.round(value) ? "fill-brick text-brick" : "fill-transparent text-border"}`} />
      ))}
    </span>
  );
}

const labels = ["", "Not great", "Okay", "Good", "Great", "Loved it"];

export function VendorReviews({
  name,
  reviews,
  average,
  onAdd,
}: {
  name: string;
  reviews: Review[];
  average: number;
  onAdd: (r: { author: string; rating: number; text: string }) => boolean;
}) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [thanks, setThanks] = useState(false);
  const shown = hover || rating;
  const canPost = rating > 0 && text.trim().length > 0;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canPost) return;
    if (onAdd({ author, rating, text })) {
      setOpen(false);
      setRating(0);
      setText("");
      setThanks(true);
    }
  }

  const counts = [5, 4, 3, 2, 1].map((s) => ({ s, n: reviews.filter((r) => r.rating === s).length }));

  return (
    <section id="reviews" className="mt-12 scroll-mt-24 border-t border-border pt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Neighbor reviews</h2>
          <p className="mt-1 text-sm text-muted-foreground">Bought from {name}? Help the next neighbor decide.</p>
        </div>
        {!open && (
          <button type="button" onClick={() => { setOpen(true); setThanks(false); }} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-soft transition hover:opacity-90 active:scale-[0.98]">
            <PenLine className="h-4 w-4" />Write a review
          </button>
        )}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[240px_1fr] md:gap-10">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft md:self-start">
          {reviews.length > 0 ? (
            <>
              <p className="font-display text-5xl font-semibold leading-none">{average.toFixed(1)}</p>
              <div className="mt-2"><Stars value={average} /></div>
              <p className="mt-1 text-sm text-muted-foreground">{reviews.length} review{reviews.length === 1 ? "" : "s"}</p>
              <ul className="mt-4 space-y-1.5">
                {counts.map(({ s, n }) => (
                  <li key={s} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="w-3 text-right">{s}</span>
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                      <span className="block h-full rounded-full bg-brick transition-all duration-500" style={{ width: `${(n / reviews.length) * 100}%` }} />
                    </span>
                    <span className="w-4">{n}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">No reviews yet. Be the first!</p>
          )}
        </div>

        <div>
          {thanks && <p className="mb-4 animate-rise rounded-2xl bg-secondary px-4 py-3 text-sm font-medium">Thanks! Your review is posted below.</p>}

          {open && (
            <form onSubmit={submit} className="mb-6 animate-rise rounded-3xl border border-border bg-card p-5 shadow-lift md:p-6">
              <div className="flex items-center justify-between">
                <button type="button" onClick={() => setOpen(false)} className="rounded-full px-2 py-1 text-[15px] text-primary hover:bg-secondary">Cancel</button>
                <p className="text-[15px] font-semibold">Your review</p>
                <button type="submit" disabled={!canPost} className="rounded-full bg-primary px-4 py-1.5 text-[15px] font-semibold text-primary-foreground transition active:scale-[0.97] disabled:opacity-35">Post</button>
              </div>

              <div className="mt-5 flex flex-col items-center">
                <div className="flex gap-1" role="radiogroup" aria-label="Rating" onMouseLeave={() => setHover(0)}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <button
                      key={i}
                      type="button"
                      role="radio"
                      aria-checked={rating === i}
                      aria-label={`${i} star${i > 1 ? "s" : ""}`}
                      onClick={() => setRating(i)}
                      onMouseEnter={() => setHover(i)}
                      className="rounded-full p-1 transition-transform active:scale-90"
                    >
                      <Star className={`h-9 w-9 transition-colors ${i <= shown ? "fill-brick text-brick" : "fill-transparent text-border"}`} />
                    </button>
                  ))}
                </div>
                <p className="mt-1 h-5 text-sm text-muted-foreground">{shown ? labels[shown] : "Tap to rate"}</p>
              </div>

              <textarea
                required
                maxLength={1000}
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What did you buy? How was it?"
                aria-label="Your review"
                className="mt-4 w-full resize-none rounded-2xl bg-secondary/60 p-4 text-[16px] leading-relaxed outline-none placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-ring/30"
              />
              <label className="mt-3 flex items-center gap-2 rounded-full bg-secondary/60 px-4 py-2 text-sm">
                <User className="h-4 w-4 shrink-0 text-primary" />
                <input maxLength={60} value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Your name (optional)" aria-label="Your name" className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground" />
              </label>
              <p className="mt-3 text-center text-[11px] text-muted-foreground">Demo — reviews are saved on this device only.</p>
            </form>
          )}

          <ul className="space-y-3">
            {reviews.map((r) => (
              <li key={r.id} className="rounded-2xl border border-border bg-card p-4 shadow-soft md:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-accent font-display text-sm text-accent-foreground">
                      {r.author.split(/\s+/).map((p) => p[0]).join("").slice(0, 2).toUpperCase()}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{r.author}</p>
                      <p className="text-xs text-muted-foreground">{r.note ? `${r.note} · ` : ""}{formatDate(r.date)}</p>
                    </div>
                  </div>
                  <Stars value={r.rating} className="h-3.5 w-3.5" />
                </div>
                <p className="mt-3 leading-relaxed">{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
