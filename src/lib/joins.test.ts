import { describe, expect, it } from "vitest";
import { blockClubs, events } from "@/lib/data";
import { eventSignup, makeJoinRequest } from "@/lib/joins";

describe("joining clubs and events", () => {
  it("a request needs a name", () => {
    expect(makeJoinRequest({ name: "  " })).toBeNull();
    expect(makeJoinRequest({ name: "Olivia" })?.name).toBe("Olivia");
  });

  it("party size stays between 1 and 6", () => {
    expect(makeJoinRequest({ name: "A", guests: 0 })?.guests).toBe(1);
    expect(makeJoinRequest({ name: "A", guests: 20 })?.guests).toBe(6);
  });

  it("drop-in events just need an 'I'm going'", () => {
    expect(eventSignup({ signup: "drop-in" }, null).action).toBe("I'm going");
  });

  it("limited events take requests and count down spots", () => {
    const e = { signup: "request" as const, spotsLeft: 12 };
    expect(eventSignup(e, null)).toMatchObject({ kind: "request", spotsLeft: 12, action: "Request a spot" });
    expect(eventSignup(e, { guests: 2 })).toMatchObject({ spotsLeft: 10, action: "Request sent" });
  });

  it("full events offer a waitlist", () => {
    expect(eventSignup({ signup: "request", spotsLeft: 0 }, null).action).toBe("Join the waitlist");
  });

  it("every event's host club exists", () => {
    const slugs = blockClubs.map((c) => c.slug);
    for (const e of events) if (e.hostClub) expect(slugs).toContain(e.hostClub);
  });
});
