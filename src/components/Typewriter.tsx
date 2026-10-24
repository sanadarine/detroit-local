import { useEffect, useState } from "react";

/**
 * Types each phrase, pauses, deletes it, then moves on — forever.
 * Starts fully typed (good for first paint and no-JS); respects reduced-motion by staying still.
 */
export function Typewriter({ phrases, className = "" }: { phrases: string[]; className?: string }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState(phrases[0] ?? "");
  const [deleting, setDeleting] = useState(false);
  const [still, setStill] = useState(true);

  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (still || phrases.length < 2) return;
    const full = phrases[i] ?? "";
    let delay: number;
    let next: () => void;
    if (!deleting && text === full) {
      delay = 2200;
      next = () => setDeleting(true);
    } else if (deleting && text === "") {
      delay = 250;
      next = () => {
        setDeleting(false);
        setI((n) => (n + 1) % phrases.length);
      };
    } else if (deleting) {
      delay = 35;
      next = () => setText(full.slice(0, text.length - 1));
    } else {
      delay = 70 + Math.random() * 50;
      next = () => setText(full.slice(0, text.length + 1));
    }
    const t = window.setTimeout(next, delay);
    return () => window.clearTimeout(t);
  }, [text, deleting, i, phrases, still]);

  return (
    <span className={className} aria-hidden>
      {text}
      <span className="ml-0.5 inline-block w-[0.08em] -translate-y-[0.05em] animate-caret bg-current align-middle" style={{ height: "0.9em" }} />
    </span>
  );
}
