import { hoodArt, type HoodName } from "@/lib/neighborhoods";

function Bird({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 10" className={className} style={style} aria-hidden>
      <path d="M1 6 Q6 0 12 6 Q18 0 23 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="origin-center animate-flap" />
    </svg>
  );
}

function Cloud({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 120 40" className={className} style={style} aria-hidden>
      <path d="M18 34h84a14 14 0 0 0 0-28 20 20 0 0 0-38-2A16 16 0 0 0 34 14 10 10 0 0 0 18 34z" fill="currentColor" />
    </svg>
  );
}

/** Animated 2D illustration of a Detroit neighborhood: drifting clouds and a scene-specific touch. */
export function NeighborhoodArt({ name, className = "", eager }: { name: HoodName; className?: string; eager?: boolean }) {
  const art = hoodArt[name];
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={art.image}
        alt={`Illustration of ${name}, Detroit`}
        width={1280}
        height={768}
        loading={eager ? "eager" : "lazy"}
        className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.06]"
      />
      <div className="pointer-events-none absolute inset-0 text-card/90">
        <Cloud className="absolute left-0 top-[6%] w-[22%] animate-drift opacity-80" />
        <Cloud className="absolute left-0 top-[18%] w-[14%] animate-drift-slow opacity-60" style={{ animationDelay: "-25s" }} />
      </div>
      {(art.scene === "birds" || art.scene === "leaves") && (
        <div className="pointer-events-none absolute left-[55%] top-[12%] text-foreground/70">
          <div className="animate-float">
            <Bird className="w-5" />
            <Bird className="-mt-1 ml-5 w-4" style={{ animationDelay: "-0.3s" }} />
            <Bird className="-mt-2 ml-1.5 w-3" style={{ animationDelay: "-0.6s" }} />
          </div>
        </div>
      )}
      {art.scene === "water" && (
        <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-[8%] h-[10%] w-[200%] animate-drift-slow text-card/40" aria-hidden>
          <path d="M0 10 Q10 4 20 10 T40 10 T60 10 T80 10 T100 10 T120 10 T140 10 T160 10 T180 10 T200 10" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      )}
      {art.scene === "bunting" && (
        <div className="pointer-events-none absolute right-[8%] top-[14%] text-foreground/60">
          <Bird className="w-5 animate-float" />
        </div>
      )}
    </div>
  );
}
