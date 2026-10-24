import { Link } from "@tanstack/react-router";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronDown, MapPin, MessagesSquare, User } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { neighborhoods, threadCategories, type Thread, type ThreadCategory } from "@/lib/data";
import { searchSite } from "@/lib/search";
import type { NewThread } from "@/lib/forum";

export type ComposerPreset = { title?: string; category?: ThreadCategory; neighborhood?: string };

/** iOS-style "new post" sheet: slides up from the bottom on phones, floats centered on larger screens. */
export function Composer({
  open,
  onOpenChange,
  preset,
  threads,
  onPost,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preset?: ComposerPreset | undefined;
  threads: Thread[];
  onPost: (t: NewThread) => void;
}) {
  const blank = { title: "", category: "Questions" as ThreadCategory, neighborhood: "", author: "", body: "" };
  const [form, setForm] = useState(blank);

  useEffect(() => {
    if (open) setForm({ ...blank, ...preset, title: preset?.title ?? "", category: preset?.category ?? "Questions", neighborhood: preset?.neighborhood ?? "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const similar = useMemo(() => (form.title.trim().length >= 3 ? searchSite(form.title, threads, ["thread"]).slice(0, 3) : []), [form.title, threads]);
  const canPost = form.title.trim().length > 0 && form.body.trim().length > 0;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canPost) return;
    onPost({ ...form, neighborhood: form.neighborhood || undefined });
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-foreground/25 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 bottom-0 z-50 flex max-h-[92dvh] flex-col overflow-hidden rounded-t-[28px] bg-card shadow-lift outline-none duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-[12vh] sm:w-full sm:max-w-xl sm:-translate-x-1/2 sm:rounded-[28px] sm:data-[state=closed]:slide-out-to-bottom-4 sm:data-[state=open]:slide-in-from-bottom-4"
        >
          <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
            <div className="mx-auto mt-2 h-1.5 w-10 rounded-full bg-border sm:hidden" aria-hidden />
            <header className="grid grid-cols-[1fr_auto_1fr] items-center px-4 pb-2 pt-3 sm:pt-4">
              <DialogPrimitive.Close className="justify-self-start rounded-full px-2 py-1 text-[15px] text-primary transition hover:bg-secondary">Cancel</DialogPrimitive.Close>
              <DialogPrimitive.Title className="text-[15px] font-semibold">New post</DialogPrimitive.Title>
              <button
                type="submit"
                disabled={!canPost}
                className="justify-self-end rounded-full bg-primary px-4 py-1.5 text-[15px] font-semibold text-primary-foreground transition active:scale-[0.97] disabled:opacity-35"
              >
                Post
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-4">
              <div className="no-scrollbar -mx-5 flex gap-1.5 overflow-x-auto px-5 py-2" role="radiogroup" aria-label="Topic">
                {threadCategories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    role="radio"
                    aria-checked={form.category === c}
                    onClick={() => setForm({ ...form, category: c })}
                    className={`shrink-0 rounded-full px-3 py-1 text-[13px] font-medium transition-all ${form.category === c ? "bg-foreground text-background" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <input
                autoFocus
                required
                maxLength={140}
                placeholder="Title"
                aria-label="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="mt-2 w-full bg-transparent font-display text-2xl font-semibold tracking-tight outline-none placeholder:text-muted-foreground/60"
              />

              {similar.length > 0 && (
                <div className="mt-3 animate-rise rounded-2xl bg-secondary/70 p-3">
                  <p className="text-xs font-medium text-muted-foreground">Already being talked about</p>
                  <ul className="mt-1.5 space-y-1">
                    {similar.map((r) => (
                      <li key={r.id}>
                        <Link to="/stories/$slug" params={{ slug: r.slug ?? "" }} onClick={() => onOpenChange(false)} className="flex items-center gap-2 text-sm text-primary hover:underline">
                          <MessagesSquare className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{r.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="my-3 h-px bg-border" />

              <textarea
                required
                maxLength={4000}
                rows={6}
                placeholder="What's on your mind? Share the details…"
                aria-label="Details"
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                className="w-full resize-none bg-transparent text-[16px] leading-relaxed outline-none placeholder:text-muted-foreground/60"
              />
            </div>

            <footer className="flex flex-wrap items-center gap-2 border-t border-border bg-background/60 px-4 py-3" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
              <label className="relative flex items-center gap-1.5 rounded-full bg-secondary py-1.5 pl-3 pr-7 text-[13px] font-medium">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <select value={form.neighborhood} onChange={(e) => setForm({ ...form, neighborhood: e.target.value })} className="appearance-none bg-transparent outline-none" aria-label="Neighborhood">
                  <option value="">Any neighborhood</option>
                  {neighborhoods.map((n) => <option key={n}>{n}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 h-3.5 w-3.5 text-muted-foreground" />
              </label>
              <label className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-[13px]">
                <User className="h-3.5 w-3.5 shrink-0 text-primary" />
                <input maxLength={60} placeholder="Your name (optional)" aria-label="Your name" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="min-w-0 flex-1 bg-transparent font-medium outline-none placeholder:font-normal placeholder:text-muted-foreground" />
              </label>
              <p className="w-full text-center text-[11px] text-muted-foreground">Demo — posts are saved on this device only.</p>
            </footer>
          </form>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
