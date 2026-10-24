import { describe, expect, it } from "vitest";
import { stories } from "@/lib/data";
import { searchSite } from "@/lib/search";

describe("site search", () => {
  it("finds an existing forum thread by a word in its title", () => {
    const r = searchSite("flooded basement", stories);
    expect(r[0]?.slug).toBe("when-the-east-side-flooded");
  });

  it("finds real local businesses by what they sell", () => {
    const r = searchSite("donuts", stories, ["vendor"]);
    expect(r.map((x) => x.slug)).toContain("yellow-light-coffee-and-donuts");
  });

  it("finds parks", () => {
    expect(searchSite("Clark Park playground", stories, ["park"]).map((x) => x.title)).toContain("Clark Park");
  });

  it("finds the permit guide", () => {
    expect(searchSite("permit", stories, ["hub"]).length).toBeGreaterThan(0);
  });

  it("returns nothing for unrelated words", () => {
    expect(searchSite("zzqx volcano", stories)).toEqual([]);
  });
});
