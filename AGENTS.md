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
- Forum threads/replies, seller reviews, seller-directory listings and map-added businesses are demo-only (browser storage via `src/lib/forum.ts`, `src/lib/reviews.ts`, `src/lib/board.ts`, explore page) until shared saving is added; seed content lives in `src/lib/data.ts` (`seedThreads`).
- Block clubs & events live inside the forum (`/stories?section=community`) and the seller directory (tagged listings + permit guide) inside Explore (`/explore?tab=sell`, `SellerHub`); "put your business on the map" belongs to the Find locals side only; `/community` and `/vendor-hub` only redirect there.
- Real businesses, parks, neighborhood circles and sub-areas live in `src/lib/listings.ts` (researched data, re-exported by `src/lib/data.ts`); every vendor/park `subArea` must exist in its neighborhood and every sub-area must have a business (tested). Never invent listings, ratings or quotes; review highlights are paraphrased with source links. Travel times come from `src/lib/geo.ts`.
- City services directory data is `cityServices` in `src/lib/data.ts` (real numbers with source URLs); it renders in the forum (`/stories?section=services`).
- Neighborhood illustrations and taglines live in `src/lib/neighborhoods.ts`; reuse `NeighborhoodArt` / `NeighborhoodStrip` instead of new one-off images.
- Listing photos come live from Google Maps via `getPlacePhotos` (`src/lib/placePhotos.functions.ts`) using stored place IDs in `src/lib/placeIds.ts`; never download or rehost Google photos (Google terms), always show the photographer credit, and fall back to `NeighborhoodArt` for places without photos. Add a place ID when adding a listing.
