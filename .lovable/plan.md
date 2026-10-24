# Map and directions on vendor pages

Each vendor page gets a "Find them" section with a map pinned to the vendor's location and a clear "Get directions" button.

## What the user sees

- A map below the vendor's story and services, with one pin on the vendor's spot. On phones it spans the full width; on computers it sits in the right-hand column under "Vouched for by neighbors".
- The address shown above the map, with a map-pin icon.
- A large "Get directions" button that opens Google Maps (the app on phones, the website on computers) with the route already set from the user's current location.
- For vendors who work from home (for example the home daycare), the map shows the general area and the button reads "Directions to pickup spot", so a private home address isn't shown.

## Sample addresses

The vendors are made up, so each gets a realistic made-up Detroit address in its neighborhood (for example Eastern Market Shed 2 for the honey seller). These are demo addresses and need replacing with real ones later.

## Technical details

- Add `address`, `lat`, `lng` and an optional `approximate` flag to each vendor in `src/lib/data.ts`.
- Map: Google Maps Platform (Managed by Lovable). Connect it through the connector card, then load the Maps JavaScript API with the browser key (`loading=async`, callback, tracking channel), `google.maps.Marker`, `clickableIcons: false`. Map component is loaded client-only (lazy + `ClientOnly`) with a cream placeholder while it loads.
- Directions button is a plain link: `https://www.google.com/maps/dir/?api=1&destination=lat,lng`. No paid route requests.
- Map rendering can't be checked inside the build sandbox; it should be checked on the preview.
