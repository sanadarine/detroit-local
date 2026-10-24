import { useCallback, useEffect, useMemo, useState } from "react";
import { vendorReviews, type Review } from "@/lib/data";

// Demo-only storage: reviews live in this browser until the app gets shared saving.
const KEY = "porchlight-reviews-v1";
const EVENT = "porchlight-reviews-change";

type Stored = Record<string, Review[]>;

function read(): Stored {
  try {
    return (JSON.parse(localStorage.getItem(KEY) ?? "{}") as Stored) ?? {};
  } catch {
    return {};
  }
}

/** Ratings are whole stars from 1 to 5. */
export function clampRating(n: number) {
  return Math.min(5, Math.max(1, Math.round(n)));
}

/** Average rounded to one decimal; 0 when there are no reviews. */
export function averageRating(reviews: Pick<Review, "rating">[]) {
  if (reviews.length === 0) return 0;
  return Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10;
}

export type NewReview = { author: string; rating: number; text: string };

export function makeReview(input: NewReview): Review | null {
  const text = input.text.trim().slice(0, 1000);
  if (!text) return null;
  return {
    id: `rv-${Date.now().toString(36)}`,
    author: input.author.trim().slice(0, 60) || "A neighbor",
    rating: clampRating(input.rating),
    date: new Date().toISOString(),
    text,
  };
}

export function useReviews(slug: string) {
  const [stored, setStored] = useState<Stored>({});

  useEffect(() => {
    const sync = () => setStored(read());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const reviews = useMemo(
    () => [...(stored[slug] ?? []), ...(vendorReviews[slug] ?? [])].sort((a, b) => b.date.localeCompare(a.date)),
    [stored, slug],
  );

  const addReview = useCallback(
    (input: NewReview) => {
      const review = makeReview(input);
      if (!review) return false;
      const cur = read();
      localStorage.setItem(KEY, JSON.stringify({ ...cur, [slug]: [review, ...(cur[slug] ?? [])] }));
      window.dispatchEvent(new Event(EVENT));
      return true;
    },
    [slug],
  );

  return { reviews, addReview, average: averageRating(reviews) };
}
