import { Heart } from "lucide-react";
import { useSaved, type SavedKind } from "@/lib/saved";

/**
 * Heart to save/unsave anything. "icon" floats on cards and rows; "pill" sits next to a page title.
 * Stops the click so it never opens the card it sits on.
 */
export function HeartButton({ kind, id, label, variant = "icon", className = "" }: { kind: SavedKind; id: string; label: string; variant?: "icon" | "pill" | "plain"; className?: string }) {
  const { isSaved, toggle } = useSaved();
  const on = isSaved(kind, id);
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(kind, id);
  };
  const heart = <Heart className={`h-[18px] w-[18px] transition-colors duration-200 ${on ? "fill-brick text-brick" : ""}`} strokeWidth={2} />;

  if (variant === "pill") {
    return (
      <button type="button" onClick={onClick} aria-pressed={on} className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium shadow-soft ring-1 transition-colors duration-200 ${on ? "bg-brick/10 text-brick ring-brick/30" : "bg-card text-foreground ring-border hover:bg-secondary"} ${className}`}>
        {heart}
        {on ? "Saved" : "Save"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      aria-label={on ? `Remove ${label} from saved` : `Save ${label}`}
      title={on ? "Saved" : "Save"}
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-200 ${variant === "icon" ? "bg-card/95 shadow-soft ring-1 ring-border/60 backdrop-blur hover:bg-card" : "hover:bg-secondary"} ${on ? "" : "text-foreground/70 hover:text-foreground"} ${className}`}
    >
      {heart}
    </button>
  );
}
