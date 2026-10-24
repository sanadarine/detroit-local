import { describe, expect, it } from "vitest";
import { filterBoard, seedBoardPosts } from "@/lib/board";

describe("seller board directory", () => {
  it("filters by tag", () => {
    const r = filterBoard(seedBoardPosts, { tag: "Skill share" });
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((p) => p.tag === "Skill share")).toBe(true);
  });

  it("filters offering vs looking for", () => {
    expect(filterBoard(seedBoardPosts, { kind: "ask" }).every((p) => p.kind === "ask")).toBe(true);
  });

  it("searches post text", () => {
    expect(filterBoard(seedBoardPosts, { query: "canning jars" }).map((p) => p.id)).toEqual(["s10"]);
    expect(filterBoard(seedBoardPosts, { query: "zzzz" })).toEqual([]);
  });
});
