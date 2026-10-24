import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AtSign, ChevronDown, MapPin, User } from "lucide-react";
import { useEffect, useState } from "react";
import { neighborhoods } from "@/lib/data";
import { boardTags, type BoardKind, type BoardTag, type NewBoardPost } from "@/lib/board";

/** iOS-style sheet for posting to the seller directory. */
export function BoardComposer({
  open,
  onOpenChange,
  preset,
  onPost,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preset?: { tag?: BoardTag | null | undefined; title?: string | undefined } | undefined;
  onPost: (p: NewBoardPost) => void;
}) {
  const blank = { kind: "offer" as BoardKind, tag: boardTags[0] as BoardTag, title: "", details: "", author: "", neighborhood: "", contact: "" };
  const [form, setForm] = useState(blank);

  useEffect(() => {
    if (open) setForm({ ...blank, tag: preset?.tag ?? boardTags[0], title: preset?.title ?? "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const canPost = form.title.trim().length > 0;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canPost) return;
    onPost({ ...form, neighborhood: form.neighborhood || undefined, contact: form.contact || undefined });
  }

  const seg = (on: boolean) => `flex-1 rounded-full py-1.5 text-[13px] font-medium transition-all ${on ? "bg-card text-foreground shadow-soft" : "text-muted-foreground"}`;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-foreground/25 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 bottom-0 z-50 flex max-h-[92dvh] flex-col overflow-hidden rounded-t-[28px] bg-card shadow-lift outline-none duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-[10vh] sm:w-full sm:max-w-xl sm:-translate-x-1/2 sm:rounded-[28px] sm:data-[state=closed]:slide-out-to-bottom-4 sm:data-[state=open]:slide-in-from-bottom-4"
        >
          <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
            <div className="mx-auto mt-2 h-1.5 w-10 rounded-full bg-border sm:hidden" aria-hidden />
            <header className="grid grid-cols-[1fr_auto_1fr] items-center px-4 pb-2 pt-3 sm:pt-4">
              <DialogPrimitive.Close className="justify-self-start rounded-full px-2 py-1 text-[15px] text-primary transition hover:bg-secondary">Cancel</DialogPrimitive.Close>
              <DialogPrimitive.Title className="text-[15px] font-semibold">New listing</DialogPrimitive.Title>
              <button type="submit" disabled={!canPost} className="justify-self-end rounded-full bg-primary px-4 py-1.5 text-[15px] font-semibold text-primary-foreground transition active:scale-[0.97] disabled:opacity-35">
                Post
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-4">
              <div className="mt-1 flex rounded-full bg-secondary p-1" role="radiogroup" aria-label="Offering or looking for">
                <button type="button" role="radio" aria-checked={form.kind === "offer"} onClick={() => setForm({ ...form, kind: "offer" })} className={seg(form.kind === "offer")}>I'm offering</button>
                <button type="button" role="radio" aria-checked={form.kind === "ask"} onClick={() => setForm({ ...form, kind: "ask" })} className={seg(form.kind === "ask")}>I'm looking for</button>
              </div>

              <p className="mt-4 text-xs font-medium text-muted-foreground">Tag</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5" role="radiogroup" aria-label="Tag">
                {boardTags.map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="radio"
                    aria-checked={form.tag === t}
                    onClick={() => setForm({ ...form, tag: t })}
                    className={`rounded-full px-3 py-1 text-[13px] font-medium transition-all ${form.tag === t ? "bg-foreground text-background" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <input
                autoFocus
                required
                maxLength={120}
                placeholder={form.kind === "offer" ? "What are you offering?" : "What do you need?"}
                aria-label="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="mt-4 w-full bg-transparent font-display text-2xl font-semibold tracking-tight outline-none placeholder:text-muted-foreground/60"
              />
              <div className="my-3 h-px bg-border" />
              <textarea
                maxLength={600}
                rows={4}
                placeholder="Details: quantities, when, what you'd trade…"
                aria-label="Details"
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
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
                <input maxLength={60} placeholder="Your name" aria-label="Your name" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="min-w-0 flex-1 bg-transparent font-medium outline-none placeholder:font-normal placeholder:text-muted-foreground" />
              </label>
              <label className="flex w-full items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-[13px]">
                <AtSign className="h-3.5 w-3.5 shrink-0 text-primary" />
                <input maxLength={80} placeholder="How to reach you: phone, email or Instagram (optional)" aria-label="Contact" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="min-w-0 flex-1 bg-transparent font-medium outline-none placeholder:font-normal placeholder:text-muted-foreground" />
              </label>
              <p className="w-full text-center text-[11px] text-muted-foreground">Demo — listings are saved on this device only.</p>
            </footer>
          </form>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
