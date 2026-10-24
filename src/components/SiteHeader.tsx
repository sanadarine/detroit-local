import { Link } from "@tanstack/react-router";
import { BookOpen, Compass, Home, Store, Users } from "lucide-react";

const links = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/explore", label: "Explore", icon: Compass, exact: false },
  { to: "/stories", label: "Stories", icon: BookOpen, exact: false },
  { to: "/community", label: "Community", icon: Users, exact: false },
  { to: "/vendor-hub", label: "Vendors", icon: Store, exact: false },
] as const;

export function SiteHeader() {
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-5 md:py-4">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brick font-display text-lg text-brick-foreground">P</span>
            <span className="truncate font-display text-lg font-semibold md:text-xl">Porchlight Detroit</span>
          </Link>
          <nav className="hidden gap-1 text-sm md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.exact }}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "bg-secondary text-foreground" }}
              >
                <l.icon className="h-4 w-4" />
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="grid grid-cols-5">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.exact }}
                className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-muted-foreground"
                activeProps={{ className: "text-primary" }}
              >
                <l.icon className="h-5 w-5" />
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-secondary pb-20 md:mt-24 md:pb-0">
      <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-muted-foreground">
        <p className="font-display text-lg text-foreground">Porchlight Detroit</p>
        <p className="mt-1">Know your neighbors. Buy from them. Look out for each other.</p>
        <p className="mt-4 text-xs">Prototype with sample listings, Detroit, MI.</p>
      </div>
    </footer>
  );
}
