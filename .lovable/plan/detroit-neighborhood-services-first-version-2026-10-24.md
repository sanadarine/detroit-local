# Detroit Neighborhood Services — First Version

A clickable prototype filled with realistic Detroit sample data, so the team can demo the idea and test it with real people before building accounts and saving data.

## Who it serves (from your notes)

- **New to Detroit** (including families with kids): find trusted local services close to home.
- **Long-time residents and block club members**: share what they know, vouch for good people and places, and act as a resource.
- **Vendors** (farmers, home-based businesses, people offering a service): get more clients, share skills and supplies, and get help with permits.

## Pages

1. **Home** — "Know your neighbors" intro, three doors (I'm new / I've been here / I run a business), featured local story, nearby picks.
2. **Explore** — browse local vendors by category (food and farms, home-based businesses, home repair, childcare, wellness) and neighborhood (Corktown, Eastern Market, Jefferson-Chalmers, Southwest, North End, etc.), with a "within a 5-minute walk or drive" filter.
3. **Vendor profile** — the person's story (for example, the farmer behind the produce), photos, services, hours, and "vouched by" badges from long-time residents.
4. **Stories** — inspiring stories passed down from long-time residents: neighborhood history and local businesses that go back generations. 
5. **Community** — block clubs, upcoming neighborhood events, and how to get involved.
6. **Vendor hub** — skill share and material share board, group buying, and a simple step-by-step guide to Detroit permits and starting a business.

## Look and feel

Warm and earthy, like a farmers market: cream paper background, deep green and brick red accents, a characterful serif for headings, and real-feeling photos. Works well on phones. Also civic and clean, trustworthy, simple and not all over the place, but still with a warm feeling.

## Not in this version (next step)

Logins, letting vendors post their own listings, saving vouches, and messaging. These need Lovable Cloud and come once the prototype has been tested.

## Technical details

- TanStack routes: `/`, `/explore`, `/vendors/$slug`, `/stories`, `/community`, `/vendor-hub`, each with its own head() metadata.
- Sample data in a typed local module (vendors, stories, block clubs, events).
- Design tokens in src/styles.css; fonts loaded through a link tag in __root; shared header and footer in __root.
- Generated images for the hero and vendor photos.