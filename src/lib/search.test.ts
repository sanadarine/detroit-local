import { describe, expect, it } from "vitest";
import { stories } from "@/lib/data";
import { searchSite } from "@/lib/search";

describe("site search", () => {
  it("finds an existing forum thread by a word in its title", () => {
    const r = searchSite("flooded basement", stories);
    expect(r[0]?.slug).toBe("when-the-east-side-flooded");
  });

  it("finds vendors by the service they offer", () => {
    const r = searchSite("daycare", stories, ["vendor"]);
    expect(r.map((x) => x.slug)).toContain("little-sprouts");
  });

  it("finds the permit guide", () => {
    expect(searchSite("permit", stories, ["hub"]).length).toBeGreaterThan(0);
  });

  it("returns nothing for unrelated words", () => {
    expect(searchSite("zzqx volcano", stories)).toEqual([]);
  });
});
