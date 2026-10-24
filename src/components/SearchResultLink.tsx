import { Link } from "@tanstack/react-router";
import { MessagesSquare, Store, Users, Wrench } from "lucide-react";
import type { SearchKind, SearchResult } from "@/lib/search";

export const kindIcons: Record<SearchKind, typeof Store> = {
  thread: MessagesSquare,
  vendor: Store,
  community: Users,
  hub: Wrench,
};

export function SearchResultLink({ r, onClick, compact }: { r: SearchResult; onClick?: () => void; compact?: boolean }) {
  const Icon = kindIcons[r.kind];
  const cls = `flex items-start gap-3 rounded-lg text-left transition-colors hover:bg-secondary ${compact ? "px-3 py-2" : "border border-border bg-card p-4"}`;
  const inner = (
    <>
      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block font-medium text-foreground">{r.title}</span>
        <span className={`block text-sm text-muted-foreground ${compact ? "truncate" : "line-clamp-2"}`}>{r.snippet}</span>
      </span>
    </>
  );
  const common = { className: cls, ...(onClick ? { onClick } : {}) };
  if (r.kind === "thread" && r.slug) return <Link to="/stories/$slug" params={{ slug: r.slug }} {...common}>{inner}</Link>;
  if (r.kind === "vendor" && r.slug) return <Link to="/vendors/$slug" params={{ slug: r.slug }} {...common}>{inner}</Link>;
  if (r.kind === "community" && r.slug && r.id.startsWith("club:")) return <Link to="/clubs/$slug" params={{ slug: r.slug }} {...common}>{inner}</Link>;
  if (r.kind === "community" && r.slug) return <Link to="/events/$slug" params={{ slug: r.slug }} {...common}>{inner}</Link>;
  if (r.kind === "community") return <Link to="/stories" search={{ section: "community" }} {...common}>{inner}</Link>;
  return <Link to="/explore" search={{ tab: "sell" }} hash={r.section ?? ""} {...common}>{inner}</Link>;
}
