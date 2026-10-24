import { describe, expect, it } from "vitest";
import { averageRating, clampRating, makeReview } from "@/lib/reviews";

describe("seller reviews", () => {
  it("averages star ratings to one decimal", () => {
    expect(averageRating([{ rating: 5 }, { rating: 4 }, { rating: 4 }])).toBe(4.3);
  });

  it("shows 0 when a seller has no reviews yet", () => {
    expect(averageRating([])).toBe(0);
  });

  it("keeps ratings between 1 and 5 stars", () => {
    expect(clampRating(0)).toBe(1);
    expect(clampRating(9)).toBe(5);
  });

  it("refuses an empty review and names anonymous reviewers 'A neighbor'", () => {
    expect(makeReview({ author: "", rating: 5, text: "   " })).toBeNull();
    expect(makeReview({ author: " ", rating: 4, text: "Great tomatoes" })?.author).toBe("A neighbor");
  });
});
