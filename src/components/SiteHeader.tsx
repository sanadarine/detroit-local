import { Link } from "@tanstack/react-router";
import logoIcon from "@/assets/logo-icon.png";
import { Compass, Heart, Home, MessagesSquare, Search } from "lucide-react";

const links = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/explore", label: "Explore", icon: Compass, exact: false },
  { to: "/stories", label: "Forum", icon: MessagesSquare, exact: false },
  { to: "/saved", label: "Saved", icon: Heart, exact: false },
] as const;

export function SiteHeader() {
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/75 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-5 md:py-4">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <img src={logoIcon} alt="" width={36} height={36} className="h-8 w-8 shrink-0 rounded-[22%] shadow-soft ring-1 ring-border md:h-9 md:w-9" />
            <span className="truncate font-display text-lg font-semibold tracking-tight text-primary md:text-xl">Detroit Local</span>
          </Link>
          <div className="flex items-center gap-1">
          <nav className="hidden gap-0.5 text-sm md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.exact }}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-muted-foreground transition-colors duration-200 hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "bg-secondary text-foreground" }}
              >
                <l.icon className="h-4 w-4" />
                {l.label}
              </Link>
            ))}
          </nav>
          <Link to="/search" aria-label="Search" className="hidden h-9 w-9 md:grid place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" activeProps={{ className: "bg-secondary text-foreground" }}>
            <Search className="h-[18px] w-[18px]" />
          </Link>
          </div>
        </div>
      </header>

      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/80 backdrop-blur-xl backdrop-saturate-150 md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="grid grid-cols-5">
          {[...links, { to: "/search", label: "Search", icon: Search, exact: false } as const].map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.exact }}
                className="flex flex-col items-center gap-1 py-2 text-[11px] font-medium text-muted-foreground transition-colors active:scale-95"
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
        <p className="flex items-center gap-2 font-display text-lg text-foreground"><img src={logoIcon} alt="" width={28} height={28} className="h-7 w-7 rounded-[22%] ring-1 ring-border" />Detroit Local</p>
        <p className="mt-1">Know your neighbors. Support them. Look out for each other.</p>
        <p className="mt-4 text-xs">Prototype with sample listings, Detroit, MI.</p>
      </div>
    </footer>
  );
}
