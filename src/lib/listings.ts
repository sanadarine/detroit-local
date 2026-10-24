// Real Detroit listings researched Oct 2026 from business websites, Instagram, Yelp/Google listings,
// local press and detroitmi.gov. Generated from research notes; sub-area centers follow the real
// business locations. Ratings appear only where a source showed them.
import type { Hood, Park, SubArea, Vendor } from "@/lib/data";

export const neighborhoodAreas: { name: Hood; lat: number; lng: number; radius: number }[] = [
  {
    "name": "Corktown",
    "lat": 42.33125,
    "lng": -83.07038,
    "radius": 1030
  },
  {
    "name": "Eastern Market",
    "lat": 42.34742,
    "lng": -83.03833,
    "radius": 1022
  },
  {
    "name": "Jefferson-Chalmers",
    "lat": 42.36978,
    "lng": -82.94333,
    "radius": 2200
  },
  {
    "name": "Southwest",
    "lat": 42.31687,
    "lng": -83.10396,
    "radius": 2200
  },
  {
    "name": "North End",
    "lat": 42.37799,
    "lng": -83.07297,
    "radius": 1378
  },
  {
    "name": "Bagley",
    "lat": 42.42442,
    "lng": -83.14461,
    "radius": 2080
  }
];

export const subAreas: Record<Hood, SubArea[]> = {
  "Corktown": [
    {
      "name": "Historic Corktown",
      "hint": "Michigan Ave & Trumbull",
      "lat": 42.33098,
      "lng": -83.06639,
      "radius": 479
    },
    {
      "name": "North Corktown",
      "hint": "Vermont & Harrison, north of I-75",
      "lat": 42.3355,
      "lng": -83.07415,
      "radius": 322
    },
    {
      "name": "Roosevelt Park",
      "hint": "By Michigan Central Station",
      "lat": 42.33032,
      "lng": -83.07696,
      "radius": 380
    },
    {
      "name": "Porter St",
      "hint": "Porter & Brooklyn",
      "lat": 42.32879,
      "lng": -83.06273,
      "radius": 265
    }
  ],
  "Eastern Market": [
    {
      "name": "The Sheds",
      "hint": "",
      "lat": 42.34591,
      "lng": -83.0398,
      "radius": 268
    },
    {
      "name": "Gratiot Corridor",
      "hint": "",
      "lat": 42.34423,
      "lng": -83.03821,
      "radius": 250
    },
    {
      "name": "Riopelle & Wilkins",
      "hint": "",
      "lat": 42.35034,
      "lng": -83.03729,
      "radius": 632
    },
    {
      "name": "Division St",
      "hint": "",
      "lat": 42.34848,
      "lng": -83.03778,
      "radius": 332
    }
  ],
  "Jefferson-Chalmers": [
    {
      "name": "Jefferson Ave Strip",
      "hint": "Shops along E Jefferson",
      "lat": 42.37339,
      "lng": -82.94284,
      "radius": 448
    },
    {
      "name": "Canals & Riverfront",
      "hint": "Fox Creek canals & Mariner Park",
      "lat": 42.35884,
      "lng": -82.93111,
      "radius": 329
    },
    {
      "name": "Kercheval & Chalmers",
      "hint": "North of Jefferson",
      "lat": 42.36997,
      "lng": -82.9707,
      "radius": 250
    }
  ],
  "Southwest": [
    {
      "name": "Mexicantown",
      "hint": "Bagley St",
      "lat": 42.32443,
      "lng": -83.08052,
      "radius": 545
    },
    {
      "name": "Clark Park",
      "hint": "W Vernor around the park",
      "lat": 42.32047,
      "lng": -83.09543,
      "radius": 273
    },
    {
      "name": "West Vernor",
      "hint": "W Vernor west of Clark Park",
      "lat": 42.31722,
      "lng": -83.1033,
      "radius": 428
    },
    {
      "name": "Springwells Village",
      "hint": "Springwells St",
      "lat": 42.308,
      "lng": -83.12857,
      "radius": 700
    }
  ],
  "North End": [
    {
      "name": "Oakland Ave",
      "hint": "Oakland Ave farms & shops",
      "lat": 42.38573,
      "lng": -83.07251,
      "radius": 432
    },
    {
      "name": "John R & Holbrook",
      "hint": "John R near Holbrook",
      "lat": 42.38556,
      "lng": -83.07995,
      "radius": 250
    },
    {
      "name": "Milwaukee Junction",
      "hint": "Old factory district",
      "lat": 42.37163,
      "lng": -83.06811,
      "radius": 303
    },
    {
      "name": "Woodward & Clairmount",
      "hint": "Along Woodward",
      "lat": 42.37283,
      "lng": -83.0748,
      "radius": 628
    }
  ],
  "Bagley": [
    {
      "name": "Avenue of Fashion",
      "hint": "Livernois, just north of 7 Mile",
      "lat": 42.4338,
      "lng": -83.14158,
      "radius": 390
    },
    {
      "name": "McNichols & Wyoming",
      "hint": "Wyoming near McNichols",
      "lat": 42.41321,
      "lng": -83.16008,
      "radius": 250
    },
    {
      "name": "McNichols & Livernois",
      "hint": "W McNichols near Livernois",
      "lat": 42.41566,
      "lng": -83.14349,
      "radius": 608
    }
  ]
};

export const vendors: Vendor[] = [
  {
    "slug": "folk",
    "name": "Folk",
    "owner": "Rohani Foulkes",
    "category": "Coffee & bakeries",
    "neighborhood": "Corktown",
    "subArea": "Historic Corktown",
    "address": "1701 Trumbull Ave, Detroit, MI 48216",
    "lat": 42.329521,
    "lng": -83.065878,
    "phone": "313-742-2672",
    "website": "https://www.folkdetroit.com/",
    "instagram": null,
    "hours": "Daily 9am–3pm",
    "tagline": "Seasonal brunch, coffee and provisions at Bagley and Trumbull.",
    "story": "This Australian-style daytime cafe pairs locally sourced meals with coffee, wine and specialty provisions. Rohani Foulkes also created Neighbor x Folk inside Michigan Central.",
    "services": [
      "Breakfast and brunch",
      "Coffee",
      "Wine",
      "Specialty provisions"
    ],
    "rating": {
      "source": "Yelp",
      "stars": 4.0,
      "count": 197
    },
    "reviewHighlights": [
      "Fresh breakfast dishes stand out",
      "Small, welcoming cafe atmosphere"
    ],
    "sources": [
      "https://www.folkdetroit.com/locations",
      "https://michigancentral.com/shop/",
      "https://maps.apple.com/place?place-id=IBF9A9916D94D5C57",
      "https://exa.ai/library/place/c3fkgbgvnj9",
      "https://www.corktowndetroit.biz/blog/2025/9/23/autumn-in-corktown"
    ]
  },
  {
    "slug": "the-brooklyn-street-local",
    "name": "The Brooklyn Street Local",
    "owner": null,
    "category": "Food businesses",
    "neighborhood": "Corktown",
    "subArea": "Historic Corktown",
    "address": "1266 Michigan Ave, Detroit, MI 48216",
    "lat": 42.331795,
    "lng": -83.063613,
    "phone": "313-262-6547",
    "website": "https://brooklynstreetlocal.com/",
    "instagram": "https://www.instagram.com/brooklynstreetlocal/",
    "hours": "Tue–Fri 8am–3pm; Sat–Sun 10am–3pm; Mon closed",
    "tagline": "A small neighborhood diner with poutine and plant-friendly brunch.",
    "story": "Opened in 2012 by a couple who moved from Toronto, this compact diner emphasizes local sourcing and sustainability. Breakfast and lunch include poutine alongside vegan and vegetarian choices.",
    "services": [
      "Breakfast",
      "Lunch and brunch",
      "Poutine",
      "Catering"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://brooklynstreetlocal.com/",
      "https://detroit.eater.com/maps/best-corktown-restaurants-bars-cafes-detroit",
      "https://exa.ai/library/place/ntzdr79gc4y"
    ]
  },
  {
    "slug": "eldorado-general-store",
    "name": "Eldorado General Store",
    "owner": "Erin Gavle",
    "category": "Shops & makers",
    "neighborhood": "Corktown",
    "subArea": "Historic Corktown",
    "address": "1700 Michigan Ave, Detroit, MI 48216",
    "lat": 42.331611,
    "lng": -83.069675,
    "phone": "313-378-0624",
    "website": "https://www.eldoradogeneralstore.com/",
    "instagram": null,
    "hours": null,
    "tagline": "Vintage finds and handmade treasures in a historic flatiron storefront.",
    "story": "Erin Gavle’s independent shop has occupied its Corktown corner since 2013. Its mix includes vintage clothing, jewelry, candles and goods sourced from small makers.",
    "services": [
      "Vintage clothing",
      "Jewelry",
      "Candles",
      "Handmade gifts"
    ],
    "rating": null,
    "reviewHighlights": [
      "Warm and helpful staff",
      "Eclectic clothing and gift selection"
    ],
    "sources": [
      "https://www.eldoradogeneralstore.com/",
      "https://www.eldoradogeneralstore.com/new-events-1/2026/3/9/open-monday-tuesday-this-week",
      "https://maps.apple.com/place?place-id=I50E9AB4DB46D02F8"
    ]
  },
  {
    "slug": "pink-flamingo",
    "name": "Pink Flamingo",
    "owner": "Kristyn Koth",
    "category": "Food businesses",
    "neighborhood": "Corktown",
    "subArea": "North Corktown",
    "address": "2746 Vermont St, Detroit, MI 48216",
    "lat": 42.335586,
    "lng": -83.075633,
    "phone": "313-801-4423",
    "website": "https://pinkflamingodetroit.com/",
    "instagram": null,
    "hours": null,
    "tagline": "Seasonal garden suppers and catering rooted in local farms.",
    "story": "Kristyn Koth’s food business serves seasonal farm-to-table meals from a converted Airstream in a North Corktown garden. Its catering operation handles everything from boxed lunches to weddings; garden service is seasonal rather than a year-round daily restaurant.",
    "services": [
      "Seasonal garden pop-ups",
      "Boxed lunches",
      "Private dinners",
      "Wedding catering"
    ],
    "rating": null,
    "reviewHighlights": [
      "Creative seasonal food",
      "Relaxed outdoor setting",
      "Dietary needs accommodated"
    ],
    "sources": [
      "https://pinkflamingodetroit.com/",
      "https://www.localdifference.org/partner/pink-flamingo/",
      "https://exa.ai/library/place/7r3kfdrlvk6"
    ]
  },
  {
    "slug": "nancy-whiskey",
    "name": "Nancy Whiskey",
    "owner": "Gerald Stevens",
    "category": "Food businesses",
    "neighborhood": "Corktown",
    "subArea": "North Corktown",
    "address": "2644 Harrison St, Detroit, MI 48216",
    "lat": 42.335419,
    "lng": -83.072664,
    "phone": "313-962-4247",
    "website": "http://www.nancywhiskeydetroit.com/",
    "instagram": null,
    "hours": null,
    "tagline": "An old neighborhood pub known for fish fry nights and live music.",
    "story": "This long-running North Corktown pub combines a bar with food service, including its fish fry. An October 2025 interview with owner Gerald Stevens confirms the neighborhood institution was still operating.",
    "services": [
      "Fish and chips",
      "Pub food",
      "Whiskey and beer",
      "Live music"
    ],
    "rating": {
      "source": "Yelp",
      "stars": 4.0,
      "count": 94
    },
    "reviewHighlights": [
      "Friendly neighborhood atmosphere",
      "Live bands are a draw",
      "Some reviewers report uneven bar service"
    ],
    "sources": [
      "https://detroit.eater.com/venue/10158/nancy-whiskey-s-pub",
      "https://www.axios.com/local/detroit/2025/10/31/haunted-bar-nancy-whiskey",
      "https://maps.apple.com/place?place-id=I19F2B8AA573EF82B",
      "https://delovelydetroit.com/place/nancy-whiskey-detroit/"
    ]
  },
  {
    "slug": "alba",
    "name": "Alba",
    "owner": null,
    "category": "Coffee & bakeries",
    "neighborhood": "Corktown",
    "subArea": "Roosevelt Park",
    "address": "2124 Michigan Ave, Detroit, MI 48216",
    "lat": 42.331612,
    "lng": -83.075753,
    "phone": "313-462-4797",
    "website": "https://alba-coffee.com/",
    "instagram": null,
    "hours": null,
    "tagline": "Coffee and Mexican-inspired flavors just northeast of Roosevelt Park.",
    "story": "Alba serves specialty coffee with Mexican-inspired drinks and baked goods along Michigan Avenue. Its house espresso comes from Detroit’s Anthology Coffee, and the cafe also offers rotating beans for home brewing.",
    "services": [
      "Espresso drinks",
      "Cafe de olla",
      "Baked goods",
      "Retail coffee beans"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://alba-coffee.com/",
      "https://detroit.eater.com/venue/41008/alba",
      "https://detroit.eater.com/maps/best-corktown-restaurants-bars-cafes-detroit",
      "https://exa.ai/library/place/yhxvl0yr8x9"
    ]
  },
  {
    "slug": "neighbor-x-folk",
    "name": "Neighbor x Folk",
    "owner": "Rohani Foulkes",
    "category": "Shops & makers",
    "neighborhood": "Corktown",
    "subArea": "Roosevelt Park",
    "address": "2001 15th St, Detroit, MI 48216",
    "lat": 42.328803,
    "lng": -83.077731,
    "phone": "313-370-3867",
    "website": "https://neighborxfolk.com/",
    "instagram": "https://www.instagram.com/neighborxfolk/",
    "hours": "Wed–Thu 10am–5pm; Fri 10am–10pm; Sat–Sun 10am–5pm; Mon–Tue closed",
    "tagline": "Thoughtful gifts and local maker goods inside Michigan Central.",
    "story": "Created by Folk’s Rohani Foulkes, this independent sundry shop sells gifts, homewares, books and body products in Michigan Central. Its emphasis is on locally made and sustainably minded goods, with community programming alongside retail.",
    "services": [
      "Gifts",
      "Home and tablewares",
      "Books and body products",
      "Maker events"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://neighborxfolk.com/",
      "https://michigancentral.com/shop/",
      "https://www.folkdetroit.com/locations",
      "https://en.wikipedia.org/wiki/Michigan_Central_Station"
    ]
  },
  {
    "slug": "batch-brewing-company",
    "name": "Batch Brewing Company",
    "owner": null,
    "category": "Food businesses",
    "neighborhood": "Corktown",
    "subArea": "Porter St",
    "address": "1400 Porter St, Detroit, MI 48216",
    "lat": 42.328549,
    "lng": -83.063455,
    "phone": "313-338-8008",
    "website": "https://www.batchbrewingcompany.com/",
    "instagram": null,
    "hours": "Mon–Thu 4pm–11pm; Fri–Sat noon–midnight; Sun noon–8pm; kitchen offerings vary by day",
    "tagline": "Small-batch beer and a full kitchen on Porter Street.",
    "story": "This independent Corktown brewpub makes its own beer and serves food in a casual setting. A February 2025 interview marked its tenth year and described the neighborhood support behind the business.",
    "services": [
      "House-brewed beer",
      "Kitchen food",
      "Outdoor dining",
      "Food pop-ups"
    ],
    "rating": {
      "source": "Yelp",
      "stars": 4.4,
      "count": 526
    },
    "reviewHighlights": [
      "Craft beer variety",
      "Friendly service and generous food portions",
      "Popular outdoor seating"
    ],
    "sources": [
      "https://www.batchbrewingcompany.com/",
      "https://www.spreaker.com/episode/episode-684-all-about-corktown-in-detroit-feb-8-9-2025--64289416",
      "https://maps.apple.com/place?place-id=I5840FEEF25185604"
    ]
  },
  {
    "slug": "mudgies-deli-and-wine-shop",
    "name": "Mudgie’s Deli & Wine Shop",
    "owner": null,
    "category": "Food businesses",
    "neighborhood": "Corktown",
    "subArea": "Porter St",
    "address": "1411 Brooklyn St, Detroit, MI 48216",
    "lat": 42.329036,
    "lng": -83.062008,
    "phone": "313-961-2000",
    "website": "https://www.mudgiesdeli.com/",
    "instagram": null,
    "hours": "Tue–Wed and Sun 11am–3pm; Thu–Sat 11am–9pm; Mon closed",
    "tagline": "Scratch-made sandwiches, bottles to go and a neighborhood patio.",
    "story": "Founded in 2008, Mudgie’s combines a sandwich-focused deli with a wine shop and bar. Its Brooklyn and Porter corner also offers soups, sides, catering and a seasonal patio.",
    "services": [
      "Deli sandwiches",
      "Soups and sides",
      "Wine shop",
      "Catering"
    ],
    "rating": null,
    "reviewHighlights": [
      "Large, filling sandwiches",
      "Attentive service"
    ],
    "sources": [
      "https://www.mudgiesdeli.com/",
      "https://maps.apple.com/place?place-id=IFCC4FF2BC7B9756B",
      "https://www.yelp.com/biz/mudgies-deli-and-wine-shop-detroit?start=120"
    ]
  },
  {
    "slug": "germack-coffee-roasting",
    "name": "Germack Coffee Roasting",
    "owner": null,
    "category": "Coffee & bakeries",
    "neighborhood": "Eastern Market",
    "subArea": "The Sheds",
    "address": "2517 Russell St, Detroit, MI 48207",
    "lat": 42.346013,
    "lng": -83.040321,
    "phone": "313-784-9484",
    "website": "http://www.germackcoffee.com/",
    "instagram": null,
    "hours": null,
    "tagline": "Small-batch coffee beside the market sheds.",
    "story": "Germack expanded its roasting tradition into coffee in 2010. Its Russell Street café and roastery offers signature blends and single-origin beans.",
    "services": [
      "Coffee roasting",
      "Signature blends",
      "Single-origin beans"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://easternmarket.org/directory/germack-coffee-roasting/",
      "https://easternmarket.org/wp-content/uploads/2026/05/EM-DistrictMap-2026-web.pdf",
      "http://www.germackcoffee.com/"
    ]
  },
  {
    "slug": "devries-and-co-1887",
    "name": "DeVries & Co. 1887",
    "owner": null,
    "category": "Markets & grocers",
    "neighborhood": "Eastern Market",
    "subArea": "The Sheds",
    "address": "2468 Market St, Detroit, MI 48207",
    "lat": 42.346082,
    "lng": -83.038993,
    "phone": "313-568-7777",
    "website": "https://www.devries1887.com/",
    "instagram": null,
    "hours": null,
    "tagline": "A Market Street stop for a world of cheeses.",
    "story": "This permanent Market Street shop sells a broad selection of cheeses. Its current catalog ranges from Michigan-region favorites to European varieties.",
    "services": [
      "Cheddar",
      "Gouda",
      "Blue cheese"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://easternmarket.org/directory/devries-co-1887/",
      "https://easternmarket.org/wp-content/uploads/2026/05/EM-DistrictMap-2026-web.pdf",
      "https://www.devries1887.com/",
      "https://www.devries1887.com/collections/cheese"
    ]
  },
  {
    "slug": "supino-pizzeria",
    "name": "Supino Pizzeria",
    "owner": null,
    "category": "Food businesses",
    "neighborhood": "Eastern Market",
    "subArea": "The Sheds",
    "address": "2457 Russell St, Detroit, MI 48207",
    "lat": 42.345642,
    "lng": -83.040077,
    "phone": "313-567-7879",
    "website": "https://www.supinopizzeria.com/",
    "instagram": null,
    "hours": null,
    "tagline": "Neighborhood pizza on Russell Street.",
    "story": "Supino operates a permanent pizzeria just beside the market sheds. Its website continues to list the Eastern Market restaurant alongside its New Center location.",
    "services": [
      "Pizza",
      "Restaurant dining",
      "Takeout"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://easternmarket.org/directory/supino-pizzeria/",
      "https://easternmarket.org/wp-content/uploads/2026/05/EM-DistrictMap-2026-web.pdf",
      "https://www.supinopizzeria.com/"
    ]
  },
  {
    "slug": "peoples-records",
    "name": "Peoples Records",
    "owner": null,
    "category": "Shops & makers",
    "neighborhood": "Eastern Market",
    "subArea": "Gratiot Corridor",
    "address": "1464 Gratiot Ave, Detroit, MI 48207",
    "lat": 42.344494,
    "lng": -83.037919,
    "phone": "313-831-0864",
    "website": "https://peoplesrecordsdetroit.com/",
    "instagram": "https://www.instagram.com/peoples_records/",
    "hours": null,
    "tagline": "Dig through Detroit music and much more.",
    "story": "Peoples buys and sells new and used vinyl across from Eastern Market. Its selection includes local artists, soul, jazz, Motown and rock.",
    "services": [
      "New vinyl",
      "Used vinyl",
      "Record buying"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://easternmarket.org/directory/peoples-records/",
      "https://easternmarket.org/wp-content/uploads/2026/05/EM-DistrictMap-2026-web.pdf",
      "https://peoplesrecordsdetroit.com/"
    ]
  },
  {
    "slug": "ronnies-meats",
    "name": "Ronnie’s Meats",
    "owner": null,
    "category": "Markets & grocers",
    "neighborhood": "Eastern Market",
    "subArea": "Gratiot Corridor",
    "address": "1429 Gratiot Ave, Detroit, MI 48207",
    "lat": 42.343965,
    "lng": -83.038504,
    "phone": "313-566-5471",
    "website": "https://ronniesmeats.com/",
    "instagram": null,
    "hours": null,
    "tagline": "A full-service butcher inside Gratiot Central Market.",
    "story": "Ronnie’s has served Eastern Market shoppers since 1967. Its staffed meat counter offers beef, pork and lamb for home cooks and larger gatherings.",
    "services": [
      "Beef",
      "Pork",
      "Lamb",
      "Butcher counter"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://easternmarket.org/directory/ronnies-meats/",
      "https://easternmarket.org/wp-content/uploads/2026/05/EM-DistrictMap-2026-web.pdf",
      "https://ronniesmeats.com/"
    ]
  },
  {
    "slug": "can-art-handworks-llc",
    "name": "CAN Art Handworks, LLC",
    "owner": "Carlos Nielbock",
    "category": "Shops & makers",
    "neighborhood": "Eastern Market",
    "subArea": "Riopelle & Wilkins",
    "address": "2264 Wilkins St, Detroit, MI 48207",
    "lat": 42.352577,
    "lng": -83.032993,
    "phone": "313-392-0116",
    "website": "https://www.canarthandworks.com/",
    "instagram": null,
    "hours": null,
    "tagline": "Architectural metalwork made and restored in Detroit.",
    "story": "Founded by master craftsman Carlos Nielbock, this studio specializes in ornamental architectural metalwork. Its work encompasses restoration, preservation and custom fabrication.",
    "services": [
      "Metalwork restoration",
      "Custom gates",
      "Railings",
      "Public art fabrication"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://easternmarket.org/directory/can-art-handworks-llc/",
      "https://easternmarket.org/wp-content/uploads/2026/05/EM-DistrictMap-2026-web.pdf",
      "https://www.canarthandworks.com/"
    ]
  },
  {
    "slug": "eastern-market-produce",
    "name": "Eastern Market Produce",
    "owner": null,
    "category": "Markets & grocers",
    "neighborhood": "Eastern Market",
    "subArea": "Riopelle & Wilkins",
    "address": "2726 Riopelle St, Detroit, MI 48207",
    "lat": 42.348064,
    "lng": -83.039586,
    "phone": "313-832-4309",
    "website": null,
    "instagram": "https://www.instagram.com/easternmarketproduce/",
    "hours": null,
    "tagline": "A permanent produce business on Riopelle.",
    "story": "Eastern Market Produce is a fixed-address produce business on Riopelle Street rather than a temporary shed stall. Eastern Market includes it in its 2026 district business map.",
    "services": [
      "Produce sales",
      "Fruit",
      "Vegetables"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://easternmarket.org/directory/eastern-market-produce/",
      "https://easternmarket.org/wp-content/uploads/2026/05/EM-DistrictMap-2026-web.pdf"
    ]
  },
  {
    "slug": "anthology-coffee",
    "name": "Anthology Coffee",
    "owner": null,
    "category": "Coffee & bakeries",
    "neighborhood": "Eastern Market",
    "subArea": "Division St",
    "address": "1948 Division St, Detroit, MI 48207",
    "lat": 42.348955,
    "lng": -83.036304,
    "phone": "313-355-4040",
    "website": "https://anthologycoffee.com/",
    "instagram": null,
    "hours": "Monday–Friday 7am–5pm; Saturday 7am–4pm; Sunday 8am–4pm (Eastern Market directory; confirm before visiting).",
    "tagline": "Specialty coffee with a focus on the bean’s journey.",
    "story": "Founded in 2011, Anthology is a Detroit specialty coffee roaster with a Division Street café. The business emphasizes the growers, producers and baristas behind each cup.",
    "services": [
      "Coffee roasting",
      "Café drinks",
      "Coffee beans"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://easternmarket.org/directory/anthology-coffee/",
      "https://easternmarket.org/wp-content/uploads/2026/05/EM-DistrictMap-2026-web.pdf",
      "https://anthologycoffee.com/"
    ]
  },
  {
    "slug": "jimmys-quality-meats",
    "name": "Jimmy’s Quality Meats",
    "owner": null,
    "category": "Markets & grocers",
    "neighborhood": "Eastern Market",
    "subArea": "Division St",
    "address": "1549 Division St, Detroit, MI 48207",
    "lat": 42.347996,
    "lng": -83.039258,
    "phone": "313-832-3280",
    "website": null,
    "instagram": null,
    "hours": null,
    "tagline": "A permanent meat-market stop on Division Street.",
    "story": "Jimmy’s Quality Meats operates at a fixed Division Street address in the market district. It appears in Eastern Market’s 2026 district map as well as its current business directory.",
    "services": [
      "Meat sales",
      "Meat selection",
      "In-person shopping"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://easternmarket.org/directory/jimmys-quality-meats/",
      "https://easternmarket.org/wp-content/uploads/2026/05/EM-DistrictMap-2026-web.pdf"
    ]
  },
  {
    "slug": "yellow-light-coffee-and-donuts",
    "name": "Yellow Light Coffee & Donuts",
    "owner": null,
    "category": "Coffee & bakeries",
    "neighborhood": "Jefferson-Chalmers",
    "subArea": "Jefferson Ave Strip",
    "address": "14447 E Jefferson Ave, Detroit, MI 48215",
    "lat": 42.373192,
    "lng": -82.943832,
    "phone": null,
    "website": "https://www.yellowlightdetroit.com/",
    "instagram": null,
    "hours": "Mon–Fri 7am–2pm; Sat–Sun 8am–3pm",
    "tagline": "House-roasted coffee meets scratch-made donuts",
    "story": "House-roasted coffee meets scratch-made donuts. The Jefferson shop operates a drive-through and also serves biscuit sandwiches.",
    "services": [
      "House-roasted coffee",
      "Scratch donuts",
      "Biscuit sandwiches"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://www.yellowlightdetroit.com/",
      "https://nominatim.openstreetmap.org/search?format=json&q=14447+E+Jefferson+Ave%2C+Detroit%2C+MI+48215&limit=1"
    ]
  },
  {
    "slug": "antidote",
    "name": "Antidóte",
    "owner": "Nya Marshall",
    "category": "Food businesses",
    "neighborhood": "Jefferson-Chalmers",
    "subArea": "Jefferson Ave Strip",
    "address": "14628 E Jefferson Ave, Detroit, MI 48215",
    "lat": 42.373824,
    "lng": -82.941837,
    "phone": null,
    "website": "https://theantidotedetroit.com/",
    "instagram": null,
    "hours": null,
    "tagline": "Spanish influences shape this neighborhood restaurant and wine bar",
    "story": "Spanish influences shape this neighborhood restaurant and wine bar. Detroit restaurateur Nya Marshall opened it in the former Norma G’s space.",
    "services": [
      "Dinner",
      "Weekend brunch",
      "Wine and cocktails",
      "Private events"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://theantidotedetroit.com/",
      "https://theantidotedetroit.com/menu/",
      "https://prod.crainsdetroit.com/restaurants/ivy-kitchen-cocktails-owner-opens-antidote-foster-connection",
      "https://nominatim.openstreetmap.org/search?format=json&q=14628+E+Jefferson+Ave%2C+Detroit%2C+MI+48215&limit=1"
    ]
  },
  {
    "slug": "coriander-kitchen-and-farm",
    "name": "Coriander Kitchen & Farm",
    "owner": "Gwen Meyer and Alison Heeres",
    "category": "Food businesses",
    "neighborhood": "Jefferson-Chalmers",
    "subArea": "Canals & Riverfront",
    "address": "14601 Riverside Blvd, Detroit, MI 48215",
    "lat": 42.359585,
    "lng": -82.932315,
    "phone": "313-338-9466",
    "website": "https://www.corianderkitchenandfarm.com/",
    "instagram": null,
    "hours": null,
    "tagline": "Seasonal cooking comes with a canal-side setting in a former marina",
    "story": "Seasonal cooking comes with a canal-side setting in a former marina. Farmer Gwen Meyer grows produce and herbs used by chef Alison Heeres.",
    "services": [
      "Seasonal meals",
      "Canal-side dining",
      "Cocktails",
      "Private events"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://www.corianderkitchenandfarm.com/",
      "https://www.corianderkitchenandfarm.com/visit",
      "https://nominatim.openstreetmap.org/search?format=json&q=14601+Riverside+Blvd%2C+Detroit%2C+MI+48215&limit=1"
    ]
  },
  {
    "slug": "moes-bait-shop",
    "name": "Moe’s Bait Shop",
    "owner": "Jim Mogielski",
    "category": "Shops & makers",
    "neighborhood": "Jefferson-Chalmers",
    "subArea": "Jefferson Ave Strip",
    "address": "14712 E Jefferson Ave, Detroit, MI 48215",
    "lat": 42.374212,
    "lng": -82.940876,
    "phone": "313-824-5222",
    "website": null,
    "instagram": null,
    "hours": null,
    "tagline": "A family fishing-supply shop carries forward a legacy begun in 1966",
    "story": "A family fishing-supply shop carries forward a legacy begun in 1966. Jim Mogielski runs the Jefferson-Chalmers shop with an emphasis on customer relationships and affordable supplies.",
    "services": [
      "Bait",
      "Fishing tackle",
      "Fishing supplies"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://www.freep.com/story/news/local/detroit-is/2025/06/15/moes-bait-shop-detroit-jim-mogielski/84177607007/",
      "https://maps.apple.com/place?place-id=I5DF2BBC4A7CAE32A",
      "https://nominatim.openstreetmap.org/search?format=json&q=14712+E+Jefferson+Ave%2C+Detroit%2C+MI+48215&limit=1"
    ]
  },
  {
    "slug": "detroit-soul",
    "name": "Detroit Soul",
    "owner": "Jerome Brown and Samuel Van Buren",
    "category": "Food businesses",
    "neighborhood": "Jefferson-Chalmers",
    "subArea": "Jefferson Ave Strip",
    "address": "14300 E Jefferson Ave, Detroit, MI 48215",
    "lat": 42.372072,
    "lng": -82.94529,
    "phone": null,
    "website": "https://detroitsoul.net/",
    "instagram": null,
    "hours": null,
    "tagline": "Southern-style meals anchor this locally founded restaurant",
    "story": "Southern-style meals anchor this locally founded restaurant. Brothers Jerome Brown and Samuel Van Buren built the business around home cooking and community.",
    "services": [
      "Soul-food dinners",
      "Carryout",
      "Catering",
      "Dine-in meals"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://detroitsoul.net/",
      "https://detroitmi.gov/news/putting-local-first-motor-city-match-winner-farm-table-soul-food-restaurant-sources-locally-and",
      "https://nominatim.openstreetmap.org/search?format=json&q=14300+E+Jefferson+Ave%2C+Detroit%2C+MI+48215&limit=1"
    ]
  },
  {
    "slug": "johnson-and-co-salon",
    "name": "Johnson & Co Salon",
    "owner": null,
    "category": "Beauty & barbers",
    "neighborhood": "Jefferson-Chalmers",
    "subArea": "Jefferson Ave Strip",
    "address": "14720 E Jefferson Ave, Detroit, MI 48215",
    "lat": 42.374228,
    "lng": -82.940838,
    "phone": null,
    "website": null,
    "instagram": null,
    "hours": null,
    "tagline": "A neighborhood salon provides hair services on East Jefferson",
    "story": "A neighborhood salon provides hair services on East Jefferson. Published customer accounts describe haircutting and hair washing as well as styling.",
    "services": [
      "Haircuts",
      "Hair washing",
      "Hair styling"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://www.modeldmedia.com/devnews/jefferson-chalmers-plan.aspx",
      "https://www.bestprosintown.com/mi/detroit/johnson-and-co-salon-/",
      "https://exa.ai/library/place/mrb2jr371pp",
      "https://nominatim.openstreetmap.org/search?format=json&q=14720+E+Jefferson+Ave%2C+Detroit%2C+MI+48215&limit=1"
    ]
  },
  {
    "slug": "post",
    "name": "POST",
    "owner": null,
    "category": "Shops & makers",
    "neighborhood": "Jefferson-Chalmers",
    "subArea": "Kercheval & Chalmers",
    "address": "14500 Kercheval Ave, Detroit, MI 48215",
    "lat": 42.369975,
    "lng": -82.970704,
    "phone": "313-939-2172",
    "website": "https://www.mutualadoration.com/",
    "instagram": null,
    "hours": "Wed–Sun 10am–6pm",
    "tagline": "Handmade goods and hands-on workshops fill a former post office",
    "story": "Handmade goods and hands-on workshops fill a former post office. Mutual Adoration’s shop brings together small-batch products from independent artisans.",
    "services": [
      "Handmade gifts",
      "Craft workshops",
      "Home goods",
      "Private craft parties"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://www.mutualadoration.com/pages/post-detroit",
      "https://nominatim.openstreetmap.org/search?format=json&q=14500+Kercheval+Ave%2C+Detroit%2C+MI+48215&limit=1"
    ]
  },
  {
    "slug": "riverfront-building-supply-and-hardware",
    "name": "Riverfront Building Supply & Hardware",
    "owner": null,
    "category": "Shops & makers",
    "neighborhood": "Jefferson-Chalmers",
    "subArea": "Jefferson Ave Strip",
    "address": "14400 E Jefferson Ave, Detroit, MI 48215",
    "lat": 42.37279,
    "lng": -82.944351,
    "phone": "313-822-1339",
    "website": null,
    "instagram": null,
    "hours": null,
    "tagline": "A neighborhood hardware shop stands at Jefferson and Chalmers",
    "story": "A neighborhood hardware shop stands at Jefferson and Chalmers. It supplies hardware and building materials along the local commercial corridor.",
    "services": [
      "Hardware",
      "Building supplies",
      "Plumbing supplies"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://www.modeldmedia.com/devnews/jefferson-chalmers-plan.aspx",
      "https://local.yahoo.com/info-16221704-riverfront-building-supply-hardware-detroit/",
      "https://exa.ai/library/place/ys0n4rtt34b",
      "https://nominatim.openstreetmap.org/search?format=json&q=14400+E+Jefferson+Ave%2C+Detroit%2C+MI+48215&limit=1"
    ]
  },
  {
    "slug": "la-gloria-bakery",
    "name": "La Gloria Bakery",
    "owner": null,
    "category": "Coffee & bakeries",
    "neighborhood": "Southwest",
    "subArea": "Mexicantown",
    "address": "3345 Bagley St, Detroit, MI 48216",
    "lat": 42.323348,
    "lng": -83.084456,
    "phone": null,
    "website": null,
    "instagram": "https://www.instagram.com/la_gloria_bakery_/",
    "hours": null,
    "tagline": "Mexican pastries and savory tamales share the cases at this family-owned bakery",
    "story": "Mexican pastries and savory tamales share the cases at this family-owned bakery. Its Bagley Street shop offers conchas, churros and other traditional sweets.",
    "services": [
      "Mexican pastries",
      "Churros",
      "Tamales",
      "Tres leches cake"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://detroit.eater.com/maps/detroit-best-bakeries",
      "https://www.instagram.com/la_gloria_bakery_/",
      "https://nominatim.openstreetmap.org/search?format=json&q=3345+Bagley+St%2C+Detroit%2C+MI+48216&limit=1"
    ]
  },
  {
    "slug": "honey-bee-market",
    "name": "Honey Bee Market",
    "owner": null,
    "category": "Markets & grocers",
    "neighborhood": "Southwest",
    "subArea": "Mexicantown",
    "address": "2443 Bagley St, Detroit, MI 48216",
    "lat": 42.325513,
    "lng": -83.076586,
    "phone": "313-237-0295",
    "website": null,
    "instagram": null,
    "hours": null,
    "tagline": "A Bagley Street market stocks produce and Latin American pantry staples",
    "story": "A Bagley Street market stocks produce and Latin American pantry staples. Meat, seafood and house-made chorizo round out its grocery selection.",
    "services": [
      "Fresh produce",
      "Meat counter",
      "Latin American groceries",
      "House-made chorizo"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://visitdetroit.com/directory/honey-bee-market/",
      "https://maps.apple.com/place?place-id=IE3A0CFE9B090CE61",
      "https://nominatim.openstreetmap.org/search?format=json&q=2443+Bagley+St%2C+Detroit%2C+MI+48216&limit=1"
    ]
  },
  {
    "slug": "mexicantown-bakery",
    "name": "Mexicantown Bakery",
    "owner": null,
    "category": "Coffee & bakeries",
    "neighborhood": "Southwest",
    "subArea": "Clark Park",
    "address": "4300 W Vernor Hwy, Detroit, MI 48209",
    "lat": 42.320654,
    "lng": -83.095111,
    "phone": "313-554-0001",
    "website": "https://mexicantownbakery.com/",
    "instagram": null,
    "hours": "Daily 6am–9pm",
    "tagline": "Artisan Mexican breads are the focus of this West Vernor bakery",
    "story": "Artisan Mexican breads are the focus of this West Vernor bakery. Its selection includes conchas, sweet breads and tres leches cake.",
    "services": [
      "Mexican breads",
      "Conchas",
      "Pastries",
      "Tres leches cake"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://mexicantownbakery.com/",
      "https://mexicantownbakery.com/pages/about-us",
      "https://detroit.eater.com/maps/detroit-best-bakeries",
      "https://nominatim.openstreetmap.org/search?format=json&q=4300+W+Vernor+Hwy%2C+Detroit%2C+MI+48209&limit=1"
    ]
  },
  {
    "slug": "flowers-of-vietnam",
    "name": "Flowers of Vietnam",
    "owner": null,
    "category": "Food businesses",
    "neighborhood": "Southwest",
    "subArea": "Clark Park",
    "address": "4440 W Vernor Hwy, Detroit, MI 48209",
    "lat": 42.320206,
    "lng": -83.096247,
    "phone": "313-554-2085",
    "website": "https://www.flowersofvietnam.com/",
    "instagram": null,
    "hours": null,
    "tagline": "Vietnamese food and Detroit roots meet on West Vernor",
    "story": "Vietnamese food and Detroit roots meet on West Vernor. The restaurant offers dinner and drinks near Clark Street.",
    "services": [
      "Vietnamese food",
      "Dinner",
      "Drinks"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://www.flowersofvietnam.com/",
      "https://www.flowersofvietnam.com/contact",
      "https://nominatim.openstreetmap.org/search?format=json&q=4440+W+Vernor+Hwy%2C+Detroit%2C+MI+48209&limit=1"
    ]
  },
  {
    "slug": "chilangos-bakery",
    "name": "Chilango’s Bakery",
    "owner": null,
    "category": "Coffee & bakeries",
    "neighborhood": "Southwest",
    "subArea": "West Vernor",
    "address": "5427 W Vernor Hwy, Detroit, MI 48209",
    "lat": 42.318164,
    "lng": -83.100832,
    "phone": "313-554-0133",
    "website": null,
    "instagram": null,
    "hours": null,
    "tagline": "A West Vernor bakery serves the surrounding Southwest community",
    "story": "A West Vernor bakery serves the surrounding Southwest community. The local business district lists it among the corridor’s bakeries.",
    "services": [
      "Baked goods",
      "Bakery counter",
      "In-store shopping"
    ],
    "rating": {
      "source": "Yelp",
      "stars": 4.1,
      "count": 9
    },
    "reviewHighlights": [],
    "sources": [
      "https://swdetroitbid.com/business-directory-2/wpbdp_category/bakeries/",
      "https://www.yelp.com/biz/chilangos-bakery-detroit"
    ]
  },
  {
    "slug": "eandl-supermercado",
    "name": "E&L Supermercado",
    "owner": null,
    "category": "Markets & grocers",
    "neighborhood": "Southwest",
    "subArea": "West Vernor",
    "address": "6000 W Vernor Hwy, Detroit, MI 48209",
    "lat": 42.316274,
    "lng": -83.105768,
    "phone": "313-554-2140",
    "website": "https://el-supermercado.com/",
    "instagram": null,
    "hours": "Mon–Sat 8:30am–7pm; Sun 8:30am–6pm",
    "tagline": "A long-running Southwest grocery combines a meat counter with Latin pantry staples",
    "story": "A long-running Southwest grocery combines a meat counter with Latin pantry staples. An in-house bakery and taqueria add prepared-food options.",
    "services": [
      "Marinated meats",
      "Produce",
      "Bakery",
      "Taqueria"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://el-supermercado.com/",
      "https://el-supermercado.com/contact-us/"
    ]
  },
  {
    "slug": "sheilas-bakery",
    "name": "Sheila’s Bakery",
    "owner": null,
    "category": "Coffee & bakeries",
    "neighborhood": "Southwest",
    "subArea": "Springwells Village",
    "address": "2142 Springwells St, Detroit, MI 48209",
    "lat": 42.310435,
    "lng": -83.126414,
    "phone": "313-841-8480",
    "website": null,
    "instagram": null,
    "hours": "Mon–Sat 6am–9pm; Sun 7am–8pm",
    "tagline": "Colorful Mexican baked goods fill this Springwells panadería",
    "story": "Colorful Mexican baked goods fill this Springwells panadería. Its selection includes tres leches cake, orejas and conchas.",
    "services": [
      "Tres leches cake",
      "Conchas",
      "Cookies",
      "Sweet breads"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://detroit.eater.com/venue/22632/sheila-s-bakery",
      "https://detroit.eater.com/maps/detroit-best-bakeries",
      "https://swdetroitbid.com/business-directory-2/wpbdp_category/bakeries/"
    ]
  },
  {
    "slug": "el-asador-steakhouse",
    "name": "El Asador Steakhouse",
    "owner": null,
    "category": "Food businesses",
    "neighborhood": "Southwest",
    "subArea": "Springwells Village",
    "address": "1312 Springwells St, Detroit, MI 48209",
    "lat": 42.304605,
    "lng": -83.122198,
    "phone": "313-297-2360",
    "website": "https://www.elasadordetroit.com/",
    "instagram": null,
    "hours": null,
    "tagline": "Scratch-made Mexican cooking is central to this Springwells steakhouse",
    "story": "Scratch-made Mexican cooking is central to this Springwells steakhouse. Chef Luis Garza draws inspiration from his mother and several regions of Mexico.",
    "services": [
      "Mexican cuisine",
      "Steaks",
      "Reservations",
      "Takeout"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://www.elasadordetroit.com/",
      "https://www.elasadordetroit.com/reservations",
      "https://detroit.eater.com/venue/13082/el-asador-mexican-steakhouse"
    ]
  },
  {
    "slug": "oakland-avenue-urban-farm",
    "name": "Oakland Avenue Urban Farm",
    "owner": null,
    "category": "Farms & gardens",
    "neighborhood": "North End",
    "subArea": "Oakland Ave",
    "address": "9354 Oakland Avenue, Detroit, MI 48211",
    "lat": 42.387675,
    "lng": -83.07355,
    "phone": "313-903-0049",
    "website": "https://www.oaklandurbanfarm.org/",
    "instagram": null,
    "hours": "Saturday market June–October 11am–3pm; Harvest on Demand Monday–Friday 10am–3pm",
    "tagline": "Fresh produce and neighborhood growing on Oakland Avenue.",
    "story": "This North End farm grows vegetables and fruit and sells value-added products. It is a nonprofit workforce-development project rather than a privately owned business.",
    "services": [
      "Seasonal farmers market",
      "Fresh produce",
      "Harvest on Demand",
      "Youth education"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://www.oaklandurbanfarm.org/",
      "https://www.northendcdc.org/programs/food-justice/farmers-market",
      "https://nominatim.openstreetmap.org/search?format=json&q=9354+Oakland+Avenue%2C+Detroit%2C+MI+48211&countrycodes=us&limit=1"
    ]
  },
  {
    "slug": "mjs-north-end-ice-cream-parlor",
    "name": "MJ’s North End Ice Cream Parlor",
    "owner": null,
    "category": "Food businesses",
    "neighborhood": "North End",
    "subArea": "Oakland Ave",
    "address": "8801 Oakland Avenue, Detroit, MI 48211",
    "lat": 42.383779,
    "lng": -83.071469,
    "phone": "313-913-5094",
    "website": "https://mjsnorthendicecream.com/",
    "instagram": null,
    "hours": null,
    "tagline": "Ice cream and savory snacks on Oakland Avenue.",
    "story": "This neighborhood ice cream parlor serves hand-packed ice cream alongside savory food. Its current website offers takeout, delivery and catering.",
    "services": [
      "Hand-packed ice cream",
      "Milkshakes",
      "Savory snacks",
      "Catering"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://mjsnorthendicecream.com/",
      "https://www.michigan.org/property/mjs-north-end-ice-cream-parlor",
      "https://nominatim.openstreetmap.org/search?format=json&q=8801+Oakland+Avenue%2C+Detroit%2C+MI+48211&countrycodes=us&limit=1"
    ]
  },
  {
    "slug": "cafe-noir",
    "name": "Cafe Noir",
    "owner": null,
    "category": "Coffee & bakeries",
    "neighborhood": "North End",
    "subArea": "John R & Holbrook",
    "address": "9405 John R Street, Detroit, MI 48202",
    "lat": 42.385561,
    "lng": -83.079948,
    "phone": "313-489-1301",
    "website": "https://cafenoir.toast.site/",
    "instagram": null,
    "hours": null,
    "tagline": "Coffee and local art near the residential North End.",
    "story": "This French-inspired art cafe combines coffee with space to work and socialize. The cafe displays local artists and emphasizes neighborhood connection.",
    "services": [
      "Coffee",
      "Cafe food",
      "Local art displays"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://cafenoir.toast.site/",
      "https://nominatim.openstreetmap.org/search?format=json&q=9405+John+R+Street%2C+Detroit%2C+MI+48202&countrycodes=us&limit=1"
    ]
  },
  {
    "slug": "milwaukee-caffe",
    "name": "Milwaukee Caffè",
    "owner": null,
    "category": "Coffee & bakeries",
    "neighborhood": "North End",
    "subArea": "Milwaukee Junction",
    "address": "447 East Milwaukee Avenue, Detroit, MI 48202",
    "lat": 42.371308,
    "lng": -83.066935,
    "phone": "313-638-2169",
    "website": "https://www.milwaukeecaffe.com/",
    "instagram": null,
    "hours": "Monday–Friday 6am–4pm; Saturday–Sunday 8am–4pm",
    "tagline": "An Italian-inspired neighborhood espresso stop.",
    "story": "This small coffee bar is in Milwaukee Junction. Its approach centers on coffee, espresso and conversation at the counter.",
    "services": [
      "Coffee",
      "Espresso",
      "Coffee-bar service"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://www.milwaukeecaffe.com/",
      "https://nominatim.openstreetmap.org/search?format=json&q=447+East+Milwaukee+Avenue%2C+Detroit%2C+MI+48202&countrycodes=us&limit=1"
    ]
  },
  {
    "slug": "oak-and-reel",
    "name": "Oak & Reel",
    "owner": "Jared and Abby Gadbaw",
    "category": "Food businesses",
    "neighborhood": "North End",
    "subArea": "Milwaukee Junction",
    "address": "2921 E Grand Boulevard, Detroit, MI 48202",
    "lat": 42.371943,
    "lng": -83.069294,
    "phone": "313-270-9600",
    "website": "https://www.oakandreel.com/",
    "instagram": null,
    "hours": "Wednesday–Thursday 5–9pm; Friday–Saturday 5–10pm; Sunday 4:30–8pm; Monday–Tuesday closed",
    "tagline": "Family-owned Italian dining with seafood and handmade pasta.",
    "story": "Jared and Abby Gadbaw describe Oak & Reel as family owned and operated. The kitchen combines seafood from an oak-burning hearth with house-made pasta and seasonal dishes.",
    "services": [
      "Seafood",
      "House-made pasta",
      "Seasonal dishes",
      "Wine and cocktails"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://www.oakandreel.com/",
      "https://nominatim.openstreetmap.org/search?format=json&q=2921+E+Grand+Boulevard%2C+Detroit%2C+MI+48202&countrycodes=us&limit=1"
    ]
  },
  {
    "slug": "the-turkey-grill",
    "name": "The Turkey Grill",
    "owner": null,
    "category": "Food businesses",
    "neighborhood": "North End",
    "subArea": "Woodward & Clairmount",
    "address": "8290 Woodward Avenue, Detroit, MI 48202",
    "lat": 42.376325,
    "lng": -83.077,
    "phone": "313-872-4624",
    "website": "https://theturkeygrill.com/",
    "instagram": null,
    "hours": null,
    "tagline": "Turkey-centered comfort food on Woodward.",
    "story": "The Turkey Grill serves Cajun-fried turkey, wings and sandwiches on Woodward Avenue. Its website offers dine-in, takeout, delivery and catering.",
    "services": [
      "Turkey dishes",
      "Sandwiches",
      "Takeout and delivery",
      "Catering"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://theturkeygrill.com/",
      "https://nominatim.openstreetmap.org/search?format=json&q=8290+Woodward+Avenue%2C+Detroit%2C+MI+48202&countrycodes=us&limit=1"
    ]
  },
  {
    "slug": "baobab-fare",
    "name": "Baobab Fare",
    "owner": "Hamissi Mamba and Nadia Nijimbere",
    "category": "Food businesses",
    "neighborhood": "North End",
    "subArea": "Woodward & Clairmount",
    "address": "6568 Woodward Avenue, Detroit, MI 48202",
    "lat": 42.369337,
    "lng": -83.072592,
    "phone": "313-265-3093",
    "website": "https://baobabfare.com/",
    "instagram": null,
    "hours": null,
    "tagline": "Burundian food on the southern Woodward corridor.",
    "story": "Hamissi Mamba and Nadia Nijimbere founded this Burundian restaurant. It serves stews, plantains, spiced rice and Burundian coffee south of the requested intersection.",
    "services": [
      "Burundian meals",
      "Stews",
      "Fruit drinks",
      "Burundian coffee"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://www.freep.com/story/entertainment/dining/2026/07/11/detroit-restaurants-bars-north-end-new-center/90836040007/",
      "https://nominatim.openstreetmap.org/search?format=json&q=6568+Woodward+Avenue%2C+Detroit%2C+MI+48202&countrycodes=us&limit=1"
    ]
  },
  {
    "slug": "good-cakes-and-bakes",
    "name": "Good Cakes and Bakes",
    "owner": null,
    "category": "Coffee & bakeries",
    "neighborhood": "Bagley",
    "subArea": "Avenue of Fashion",
    "address": "19363 Livernois Avenue, Detroit, MI 48221",
    "lat": 42.434465,
    "lng": -83.141685,
    "phone": "313-936-2884",
    "website": "https://www.goodcakesandbakes.com/",
    "instagram": null,
    "hours": "Tuesday 10am–6pm; Wednesday–Friday 9am–6pm; Saturday 8am–6pm",
    "tagline": "Cakes and baked treats on Livernois.",
    "story": "This Detroit bakery offers baked goods and celebration cakes. Its active website provides ordering and nationwide shipping.",
    "services": [
      "Baked goods",
      "Whole cakes",
      "Celebration cakes",
      "Shipping"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://www.goodcakesandbakes.com/",
      "https://www.goodcakesandbakes.com/location/good-cakes-and-bakes/"
    ]
  },
  {
    "slug": "jos-gallery",
    "name": "Jo’s Gallery",
    "owner": null,
    "category": "Shops & makers",
    "neighborhood": "Bagley",
    "subArea": "Avenue of Fashion",
    "address": "19376 Livernois Avenue, Detroit, MI 48221",
    "lat": 42.434691,
    "lng": -83.141537,
    "phone": "313-864-1401",
    "website": "https://www.josgalleryonline.com/",
    "instagram": null,
    "hours": "Tuesday–Saturday 11am–6:30pm; Sunday–Monday closed",
    "tagline": "African American art and custom framing on Livernois.",
    "story": "Founded by Jo Griffin in 1996, this second-generation gallery features art, prints and collectibles. It also offers in-house custom framing.",
    "services": [
      "Fine art",
      "Custom framing",
      "Sculptures",
      "Gifts"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://www.josgalleryonline.com/about-us",
      "https://www.josgalleryonline.com/shop-categories/1restaurant"
    ]
  },
  {
    "slug": "the-narrow-way-cafe-and-shop",
    "name": "The Narrow Way Cafe & Shop",
    "owner": null,
    "category": "Coffee & bakeries",
    "neighborhood": "Bagley",
    "subArea": "Avenue of Fashion",
    "address": "19331 Livernois Avenue, Detroit, MI 48221",
    "lat": 42.433956,
    "lng": -83.141668,
    "phone": "313-397-7727",
    "website": "https://thenarrowwaycafe.com/",
    "instagram": null,
    "hours": "Monday–Saturday 8am–4pm",
    "tagline": "Coffee and loose-leaf tea on the neighborhood’s shopping edge.",
    "story": "This Black-owned cafe offers coffee, tea and baked goods on Livernois. It serves residential Bagley from the Avenue of Fashion rather than Curtis and Prairie itself.",
    "services": [
      "Coffee",
      "Loose-leaf tea",
      "Baked goods",
      "Coffee subscriptions"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://thenarrowwaycafe.com/",
      "https://thenarrowwaycafe.com/pages/location"
    ]
  },
  {
    "slug": "times-square",
    "name": "Times Square",
    "owner": "Algernon Bartell",
    "category": "Shops & makers",
    "neighborhood": "Bagley",
    "subArea": "Avenue of Fashion",
    "address": "19150 Livernois Avenue, Detroit, MI 48221",
    "lat": 42.432095,
    "lng": -83.141444,
    "phone": null,
    "website": null,
    "instagram": null,
    "hours": null,
    "tagline": "Men’s clothing on the Avenue of Fashion.",
    "story": "Owner Algernon Bartell operates this menswear business on Livernois. It is a commercial-corridor option for residential Curtis and Prairie rather than a shop on those side streets.",
    "services": [
      "Men’s suits",
      "Custom shirts",
      "Prom attire"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://visitdetroit.com/inside-the-d/7-reasons-ave-of-fashion/"
    ]
  },
  {
    "slug": "jlh-heating-and-air-conditioning",
    "name": "JLH Heating and Air Conditioning",
    "owner": null,
    "category": "Home services",
    "neighborhood": "Bagley",
    "subArea": "McNichols & Wyoming",
    "address": "16564 Wyoming Street, Detroit, MI 48221",
    "lat": 42.413209,
    "lng": -83.160082,
    "phone": "313-520-4181",
    "website": "https://jlhheating.net/",
    "instagram": null,
    "hours": "Monday–Saturday 8am–6pm; Sunday closed",
    "tagline": "Heating and cooling service on Wyoming.",
    "story": "This Detroit contractor offers heating and air-conditioning sales, service and installation. Its current website lists a Wyoming Street office and residential and commercial cooling work.",
    "services": [
      "Furnace installation",
      "Air-conditioning service",
      "Water heaters",
      "Boilers"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://jlhheating.net/"
    ]
  },
  {
    "slug": "detroit-sip",
    "name": "Detroit Sip",
    "owner": null,
    "category": "Coffee & bakeries",
    "neighborhood": "Bagley",
    "subArea": "McNichols & Livernois",
    "address": "7420 W McNichols Road, Detroit, MI 48221",
    "lat": 42.41719,
    "lng": -83.14542,
    "phone": "313-635-5130",
    "website": "https://detroitsip.com/",
    "instagram": null,
    "hours": "Wednesday–Friday 7am–3pm; Saturday 8am–3pm; Sunday 10am–3pm; Monday–Tuesday closed",
    "tagline": "A McNichols coffee stop with neighborhood workspace.",
    "story": "Detroit Sip serves cappuccinos, mochas and lattes on West McNichols. Its website lists free Wi-Fi and regular weekly opening hours.",
    "services": [
      "Cappuccino",
      "Mocha",
      "Latte",
      "Free Wi-Fi"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://detroitsip.com/"
    ]
  },
  {
    "slug": "detroit-pizza-bar",
    "name": "Detroit Pizza Bar",
    "owner": "Akunna Olumba and Marcus Jones",
    "category": "Food businesses",
    "neighborhood": "Bagley",
    "subArea": "McNichols & Livernois",
    "address": "7316 W McNichols Road, Detroit, MI 48221",
    "lat": 42.417193,
    "lng": -83.144317,
    "phone": null,
    "website": "https://thedetroitpizzabar.com/",
    "instagram": null,
    "hours": null,
    "tagline": "Detroit-style squares on the southern neighborhood corridor.",
    "story": "Detroit residents Akunna Olumba and Marcus Jones opened this neighborhood pizzeria. Its current site offers Detroit-style pizzas, vegan options and pickup or delivery.",
    "services": [
      "Detroit-style pizza",
      "Vegan pizza",
      "Pickup",
      "Delivery"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://thedetroitpizzabar.com/",
      "https://detroitmi.gov/news/black-owned-business-detroit-pizza-bar-celebrates-grand-opening-livernois-mcnichols-neighborhood"
    ]
  },
  {
    "slug": "erics-ive-been-framed-shop",
    "name": "Eric’s I’ve Been Framed Shop",
    "owner": null,
    "category": "Shops & makers",
    "neighborhood": "Bagley",
    "subArea": "McNichols & Livernois",
    "address": "16527 Livernois Avenue, Detroit, MI 48221",
    "lat": 42.4126,
    "lng": -83.140725,
    "phone": "313-861-9263",
    "website": null,
    "instagram": null,
    "hours": "Tuesday–Friday 11am–6pm; Saturday noon–6pm",
    "tagline": "Art and framing on Livernois near McNichols.",
    "story": "This independent frame shop carries prints, original work and handmade items by local artists. It serves the residential area from the Livernois commercial edge, south of McNichols.",
    "services": [
      "Framing",
      "Art prints",
      "Original art",
      "Handmade cards"
    ],
    "rating": null,
    "reviewHighlights": [],
    "sources": [
      "https://visitdetroit.com/directory/erics-ive-been-framed-shop/"
    ]
  }
];

export const parks: Park[] = [
  {
    "slug": "roosevelt-park",
    "name": "Roosevelt Park",
    "neighborhood": "Corktown",
    "subArea": "Roosevelt Park",
    "address": "2231 Michigan Ave, Detroit, MI 48216",
    "lat": 42.330557,
    "lng": -83.077385,
    "features": [
      "Public green space",
      "Views of Michigan Central Station",
      "Community events",
      "Unified park grounds after street rerouting"
    ],
    "about": "This City of Detroit park fronts Michigan Central Station but is a separate public park. A city-led renovation reunited formerly divided grounds in 2023, and a September 2025 community event confirms continued public use.",
    "sources": [
      "https://detroitmi.gov/departments/detroit-parks-recreation/parks-and-greenways/roosevelt-park",
      "https://detroitmi.gov/node/94381",
      "https://www.trainstationneighborsblockclub.org/events/cars-at-the-station",
      "https://exa.ai/library/place/y1yr5qwmw18"
    ],
    "approximate": false
  },
  {
    "slug": "dequindre-cut-greenway",
    "name": "Dequindre Cut Greenway",
    "neighborhood": "Eastern Market",
    "subArea": "Riopelle & Wilkins",
    "address": "Wilkins St at Orleans St (entrance), Detroit, MI 48207",
    "lat": 42.350379,
    "lng": -83.039303,
    "features": [
      "Paved walking and bicycle path",
      "Separate pedestrian and bicycle lanes",
      "Urban art and graffiti",
      "Wilkins Street entrance ramp",
      "Seasonal Freight Yard gathering space"
    ],
    "about": "This public, below-grade greenway links Eastern Market with the Detroit Riverfront. The nearly two-mile route includes a 20-foot-wide paved path and artwork; Conservancy visitor information lists greenways as open daily from 6am to 10pm. The address identifies the Eastern Market entrance, not a postal address for the entire trail.",
    "sources": [
      "https://www.detroitriverfront.org/plan-your-visit/parks-greenways/dequindre-cut",
      "https://www.detroitriverfront.org/plan-your-visit/visitor-info/visitor-info",
      "https://www.detroitriverfront.org/plan-your-visit/things-to-do/dequindre-cut-freight-yard-seasonal"
    ],
    "approximate": false
  },
  {
    "slug": "mariner-park",
    "name": "Mariner Park",
    "neighborhood": "Jefferson-Chalmers",
    "subArea": "Canals & Riverfront",
    "address": "14700 Riverside Blvd, Detroit, MI 48215",
    "lat": 42.3581,
    "lng": -82.9299,
    "features": [
      "Detroit River waterfront"
    ],
    "about": "A city-owned riverfront park at the eastern end of Detroit’s waterfront.",
    "sources": [
      "https://detroitmi.gov/news/city-detroit-provides-information-closures-parking-and-transportation-june-26-ford-fireworks",
      "https://detroitmi.gov/sites/detroitmi.localhost/files/2023-03/AppendixE_Metric%26Inventory.pdf"
    ],
    "approximate": true
  },
  {
    "slug": "clark-park",
    "name": "Clark Park",
    "neighborhood": "Southwest",
    "subArea": "Clark Park",
    "address": "4301 W Vernor Hwy, Detroit, MI 48209",
    "lat": 42.320561,
    "lng": -83.094944,
    "features": [
      "Accessible playground",
      "Splash pad",
      "Multi-sport courts",
      "Walking paths",
      "Baseball fields",
      "Picnic shelters",
      "Zipline"
    ],
    "about": "A 30-acre community park with recreation facilities serving Southwest Detroit. Recent improvements include play areas, courts and a zipline.",
    "sources": [
      "https://detroitmi.gov/departments/detroit-parks-recreation/parks-and-greenways/clark-park"
    ],
    "approximate": false
  },
  {
    "slug": "patton-park",
    "name": "Patton Park",
    "neighborhood": "Southwest",
    "subArea": "Springwells Village",
    "address": "2301 Woodmere St, Detroit, MI 48209",
    "lat": 42.308948,
    "lng": -83.137093,
    "features": [
      "Walking paths",
      "Sports fields",
      "Playgrounds",
      "Picnic shelters",
      "Natural marsh"
    ],
    "about": "An 84-acre Southwest park with sports and play facilities. Its marsh preserves a remnant of Baby Creek.",
    "sources": [
      "https://detroitmi.gov/departments/detroit-parks-recreation/parks-and-greenways/regional-and-riverfront-parks/patton-park"
    ],
    "approximate": false
  }
];
