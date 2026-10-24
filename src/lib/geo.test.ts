import { describe, expect, it } from "vitest";
import { parks, subAreas, vendors } from "@/lib/data";
import { reachMeters, travelMinutes, withinMinutes } from "@/lib/geo";

const oakland = subAreas["North End"].find((s) => s.name === "Oakland Ave")!;

describe("within X minutes", () => {
  it("1 km takes about 16 minutes on foot and about 3 by car", () => {
    const a = { lat: 42.33, lng: -83.07 };
    const b = { lat: 42.33 + 1000 / 111195, lng: -83.07 };
    expect(travelMinutes(a, b, "walk")).toBe(16);
    expect(travelMinutes(a, b, "drive")).toBe(3);
  });

  it("from Oakland Ave, MJ's ice cream is within 10 minutes walking but Good Cakes and Bakes (Bagley) is not", () => {
    const names = withinMinutes(oakland, vendors, "walk", 10).map((v) => v.slug);
    expect(names).toContain("mjs-north-end-ice-cream-parlor");
    expect(names).not.toContain("good-cakes-and-bakes");
  });

  it("reach grows with more minutes", () => {
    expect(reachMeters("walk", 10)).toBeGreaterThan(reachMeters("walk", 5));
  });
});

describe("sub-areas", () => {
  it("every neighborhood has at least 3 specific areas", () => {
    for (const list of Object.values(subAreas)) expect(list.length).toBeGreaterThanOrEqual(3);
  });

  it("every vendor's and park's area belongs to its own neighborhood", () => {
    for (const v of [...vendors, ...parks]) expect(subAreas[v.neighborhood].map((s) => s.name)).toContain(v.subArea);
  });

  it("every specific area has at least one real business listed", () => {
    for (const [hood, list] of Object.entries(subAreas)) for (const s of list) expect(vendors.some((v) => v.neighborhood === hood && v.subArea === s.name)).toBe(true);
  });
});
