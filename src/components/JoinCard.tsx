import { Check, Minus, Plus, User } from "lucide-react";
import { useState } from "react";
import type { JoinRequest } from "@/lib/joins";

/** Sign-up box used on club and event pages. */
export function JoinCard({
  title,
  subtitle,
  action,
  doneTitle,
  doneBody,
  request,
  onSubmit,
  onCancel,
  askGuests = false,
  disabled = false,
  notePlaceholder = "Anything you'd like them to know? (optional)",
  children,
}: {
  title: string;
  subtitle?: React.ReactNode;
  action: string;
  doneTitle: string;
  doneBody: string;
  request: JoinRequest | null;
  onSubmit: (r: { name: string; contact: string; note: string; guests: number }) => boolean;
  onCancel: () => void;
  askGuests?: boolean;
  disabled?: boolean;
  notePlaceholder?: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");
  const [guests, setGuests] = useState(1);

  const field = "w-full rounded-xl bg-secondary px-3.5 py-2.5 outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/30";

  if (request) {
    return (
      <div className="rounded-3xl border border-border bg-card p-5 shadow-lift">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="h-5 w-5" /></span>
        <p className="mt-3 text-lg font-semibold">{doneTitle}</p>
        <p className="mt-1 text-sm text-muted-foreground">{doneBody}</p>
        <p className="mt-3 text-sm">
          <span className="font-medium">{request.name}</span>
          {askGuests && request.guests > 1 && <span className="text-muted-foreground"> · party of {request.guests}</span>}
        </p>
        <button type="button" onClick={onCancel} className="mt-4 text-sm font-medium text-primary hover:underline">Cancel request</button>
        <p className="mt-4 text-[11px] text-muted-foreground">Demo, so this is saved on this device only and no one is notified yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-lift">
      <p className="text-lg font-semibold">{title}</p>
      {subtitle && <div className="mt-1 text-sm text-muted-foreground">{subtitle}</div>}
      {children}
      {!open ? (
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen(true)}
          className="mt-4 w-full rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground shadow-soft transition hover:opacity-90 active:scale-[0.98] disabled:opacity-40"
        >
          {action}
        </button>
      ) : (
        <form
          className="mt-4 space-y-2.5 animate-rise"
          onSubmit={(e) => {
            e.preventDefault();
            if (onSubmit({ name, contact, note, guests })) setOpen(false);
          }}
        >
          <label className="flex items-center gap-2 rounded-xl bg-secondary px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-ring/30">
            <User className="h-4 w-4 shrink-0 text-primary" />
            <input required autoFocus maxLength={60} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" aria-label="Your name" className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground" />
          </label>
          <input maxLength={100} value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Phone or email (so they can reply)" aria-label="Phone or email" className={field} />
          {askGuests && (
            <div className="flex items-center justify-between rounded-xl bg-secondary px-3.5 py-2">
              <span className="text-sm">How many people?</span>
              <div className="flex items-center gap-3">
                <button type="button" aria-label="Fewer people" onClick={() => setGuests((g) => Math.max(1, g - 1))} className="grid h-7 w-7 place-items-center rounded-full bg-card shadow-soft"><Minus className="h-3.5 w-3.5" /></button>
                <span className="w-4 text-center font-semibold" aria-live="polite">{guests}</span>
                <button type="button" aria-label="More people" onClick={() => setGuests((g) => Math.min(6, g + 1))} className="grid h-7 w-7 place-items-center rounded-full bg-card shadow-soft"><Plus className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          )}
          <textarea maxLength={500} rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder={notePlaceholder} aria-label="Note" className={`${field} resize-none`} />
          <div className="flex gap-2 pt-1">
            <button type="button" onClick={() => setOpen(false)} className="flex-1 rounded-full bg-secondary px-4 py-2.5 font-medium">Cancel</button>
            <button type="submit" className="flex-[2] rounded-full bg-primary px-4 py-2.5 font-medium text-primary-foreground">Send</button>
          </div>
        </form>
      )}
    </div>
  );
}
