<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Site-wide search uses one index in `src/lib/search.ts` covering threads, vendors, community and vendor hub; add new content types there so search and duplicate-thread hints stay consistent.
- Forum threads/replies, seller reviews and map-added businesses are demo-only (browser storage via `src/lib/forum.ts`, `src/lib/reviews.ts`, explore page) until shared saving is added; seed content lives in `src/lib/data.ts` (`seedThreads`).
- Block clubs & events live inside the forum (`/stories?section=community`) and the seller hub inside Explore (`/explore?tab=sell`, `SellerHub`); `/community` and `/vendor-hub` only redirect there.
- Neighborhood sub-areas live in `subAreas` in `src/lib/data.ts`; each vendor's `subArea` must name one in its own neighborhood (tested). Travel-time estimates come from `src/lib/geo.ts`, not hand-entered minutes.
- Neighborhood illustrations and taglines live in `src/lib/neighborhoods.ts`; reuse `NeighborhoodArt` / `NeighborhoodStrip` instead of new one-off images.
