import { useCallback, useEffect, useState } from "react";
import type { CommunityEvent } from "@/lib/data";

// Demo-only storage: join requests / RSVPs live in this browser until the app gets shared saving.
const KEY = "detroit-local-joins-v1";
const EVENT = "detroit-local-joins-change";

export type JoinRequest = { name: string; contact: string; note: string; guests: number; date: string };
type Stored = Record<string, JoinRequest>;

function read(): Stored {
  try {
    return (JSON.parse(localStorage.getItem(KEY) ?? "{}") as Stored) ?? {};
  } catch {
    return {};
  }
}

/** A request needs a name; guests are 1–6 people including you. */
export function makeJoinRequest(input: { name: string; contact?: string; note?: string; guests?: number }): JoinRequest | null {
  const name = input.name.trim().slice(0, 60);
  if (!name) return null;
  return {
    name,
    contact: (input.contact ?? "").trim().slice(0, 100),
    note: (input.note ?? "").trim().slice(0, 500),
    guests: Math.min(6, Math.max(1, Math.round(input.guests ?? 1))),
    date: new Date().toISOString(),
  };
}

/** What the sign-up box should say for an event, given whether you already asked. */
export function eventSignup(e: Pick<CommunityEvent, "signup" | "spotsLeft">, request: Pick<JoinRequest, "guests"> | null) {
  if (e.signup === "drop-in") return { kind: "drop-in" as const, spotsLeft: undefined, action: request ? "You're going" : "I'm going" };
  const base = e.spotsLeft ?? 0;
  const spotsLeft = Math.max(0, base - (request && base > 0 ? request.guests : 0));
  if (base === 0) return { kind: "waitlist" as const, spotsLeft: 0, action: request ? "On the waitlist" : "Join the waitlist" };
  return { kind: "request" as const, spotsLeft, action: request ? "Request sent" : "Request a spot" };
}

/** Per-item join request saved on this device. Key like "club:slug" or "event:slug". */
export function useJoin(key: string) {
  const [request, setRequest] = useState<JoinRequest | null>(null);

  useEffect(() => {
    const sync = () => setRequest(read()[key] ?? null);
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [key]);

  const submit = useCallback(
    (input: { name: string; contact?: string; note?: string; guests?: number }) => {
      const r = makeJoinRequest(input);
      if (!r) return false;
      localStorage.setItem(KEY, JSON.stringify({ ...read(), [key]: r }));
      window.dispatchEvent(new Event(EVENT));
      return true;
    },
    [key],
  );

  const cancel = useCallback(() => {
    const cur = read();
    delete cur[key];
    localStorage.setItem(KEY, JSON.stringify(cur));
    window.dispatchEvent(new Event(EVENT));
  }, [key]);

  return { request, submit, cancel };
}
