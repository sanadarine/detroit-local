import { describe, expect, it } from "vitest";
import { filterSaved, groupSaved, resolveSaved, toggleSaved, type SavedRef } from "@/lib/saved";
import { seedThreads, subAreas } from "@/lib/data";
import { seedBoardPosts } from "@/lib/board";

const refs: SavedRef[] = [
  { kind: "vendor", id: "folk", savedAt: "2026-10-24T10:00:00Z" }, // Corktown
  { kind: "vendor", id: "la-gloria-bakery", savedAt: "2026-10-24T11:00:00Z" }, // Southwest
  { kind: "park", id: "clark-park", savedAt: "2026-10-24T09:00:00Z" }, // Southwest
  { kind: "service", id: "911", savedAt: "2026-10-24T08:00:00Z" }, // no location
];
const items = resolveSaved(refs, seedThreads, seedBoardPosts);

describe("hearts", () => {
  it("tapping a heart saves the item, tapping again removes it", () => {
    const once = toggleSaved([], "event", "fall-harvest-swap", "2026-10-24T00:00:00Z");
    expect(once).toEqual([{ kind: "event", id: "fall-harvest-swap", savedAt: "2026-10-24T00:00:00Z" }]);
    expect(toggleSaved(once, "event", "fall-harvest-swap", "2026-10-25T00:00:00Z")).toEqual([]);
  });
});

describe("saved page filters", () => {
  it("neighborhood filter keeps only saved things in that neighborhood", () => {
    expect(filterSaved(items, { hood: "Southwest" }).map((i) => i.id).sort()).toEqual(["clark-park", "la-gloria-bakery"]);
  });

  it("near a place keeps only saved things inside the chosen distance, nearest first", () => {
    const mexicantown = subAreas.Southwest.find((a) => a.name === "Mexicantown")!;
    const near = filterSaved(items, { near: mexicantown, radius: 3219 });
    expect(near.map((i) => i.id)).not.toContain("folk");
    expect(near.map((i) => i.id)).not.toContain("911");
    expect(near.length).toBeGreaterThan(0);
    for (let i = 1; i < near.length; i++) expect(near[i]!.distance!).toBeGreaterThanOrEqual(near[i - 1]!.distance!);
  });

  it("grouping by neighborhood puts things without a place under Citywide", () => {
    const groups = groupSaved(filterSaved(items, {}), "neighborhood");
    expect(groups.find((g) => g.label === "Citywide")?.items.map((i) => i.id)).toEqual(["911"]);
  });
});
