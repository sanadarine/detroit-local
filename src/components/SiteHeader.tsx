import { Link } from "@tanstack/react-router";

const links = [
  { to: "/explore", label: "Explore" },
  { to: "/stories", label: "Stories" },
  { to: "/community", label: "Community" },
  { to: "/vendor-hub", label: "Vendor hub" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-brick font-display text-lg text-brick-foreground">P</span>
          <span className="font-display text-xl font-semibold">Porchlight Detroit</span>
        </Link>
        <nav className="flex flex-wrap gap-1 text-sm">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary">
      <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-muted-foreground">
        <p className="font-display text-lg text-foreground">Porchlight Detroit</p>
        <p className="mt-1">Know your neighbors. Buy from them. Look out for each other.</p>
        <p className="mt-4 text-xs">Prototype with sample listings, Detroit, MI.</p>
      </div>
    </footer>
  );
}
