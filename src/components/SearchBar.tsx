import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useForum } from "@/lib/forum";
import { searchSite } from "@/lib/search";
import { SearchResultLink } from "@/components/SearchResultLink";

type Props = {
  size?: "hero" | "page";
  initial?: string;
  suggest?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
};

export function SearchBar({ size = "page", initial = "", suggest = true, autoFocus, placeholder = "Search threads, vendors, events…" }: Props) {
  const [q, setQ] = useState(initial);
  const [open, setOpen] = useState(false);
  const { threads } = useForum();
  const navigate = useNavigate();
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const results = useMemo(() => (suggest && q.trim().length >= 2 ? searchSite(q, threads).slice(0, 5) : []), [q, threads, suggest]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setOpen(false);
    navigate({ to: "/search", search: { q: q.trim().slice(0, 100) } });
  }

  const hero = size === "hero";
  return (
    <form role="search" onSubmit={submit} className="relative w-full">
      <div className={`flex items-center gap-2 rounded-full border border-border bg-card text-foreground shadow-lg ${hero ? "p-1.5 pl-4 md:p-2 md:pl-5" : "p-1.5 pl-4"}`}>
        <Search className={`shrink-0 text-muted-foreground ${hero ? "h-5 w-5" : "h-4 w-4"}`} />
        <input
          type="search"
          value={q}
          maxLength={100}
          autoFocus={autoFocus}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            blurTimer.current = setTimeout(() => setOpen(false), 150);
          }}
          placeholder={placeholder}
          aria-label="Search Porchlight Detroit"
          className={`min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:appearance-none ${hero ? "py-2 text-base md:text-lg" : "py-1.5"}`}
        />
        <button className={`shrink-0 rounded-full bg-primary font-medium text-primary-foreground hover:opacity-90 ${hero ? "px-4 py-2.5 md:px-6" : "px-4 py-2 text-sm"}`}>Search</button>
      </div>
      {open && q.trim().length >= 2 && suggest && (
        <div
          className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-border bg-card p-1 text-foreground shadow-xl"
          onMouseDown={() => blurTimer.current && clearTimeout(blurTimer.current)}
        >
          {results.length > 0 ? (
            <>
              <p className="px-3 pb-1 pt-2 text-xs font-medium uppercase tracking-widest text-brick">Already on Porchlight</p>
              {results.map((r) => <SearchResultLink key={r.id} r={r} compact onClick={() => setOpen(false)} />)}
            </>
          ) : (
            <p className="px-3 py-3 text-sm text-muted-foreground">Nothing yet. Press Search to see all options or start a new thread.</p>
          )}
        </div>
      )}
    </form>
  );
}
