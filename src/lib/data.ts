import farmer from "@/assets/farmer.jpg";
import baker from "@/assets/baker.jpg";
import story from "@/assets/story.jpg";
import hero from "@/assets/hero.jpg";

export const categories = ["Food & farms", "Home-based business", "Home repair", "Childcare", "Wellness"] as const;
export const neighborhoods = ["Corktown", "Eastern Market", "Jefferson-Chalmers", "Southwest", "North End", "Bagley"] as const;

export const neighborhoodAreas: { name: (typeof neighborhoods)[number]; lat: number; lng: number; radius: number }[] = [
  { name: "Corktown", lat: 42.3305, lng: -83.0705, radius: 900 },
  { name: "Eastern Market", lat: 42.3475, lng: -83.0420, radius: 700 },
  { name: "Jefferson-Chalmers", lat: 42.3600, lng: -82.9520, radius: 1300 },
  { name: "Southwest", lat: 42.3195, lng: -83.0985, radius: 1400 },
  { name: "North End", lat: 42.3810, lng: -83.0690, radius: 1000 },
  { name: "Bagley", lat: 42.4195, lng: -83.1440, radius: 900 },
];

export type Hood = (typeof neighborhoods)[number];
export type SubArea = { name: string; hint: string; lat: number; lng: number; radius: number };

/** Smaller, specific pockets inside each neighborhood (approximate, hand-placed — not official boundaries). */
export const subAreas: Record<Hood, SubArea[]> = {
  Corktown: [
    { name: "Historic Corktown", hint: "Michigan Ave & Trumbull", lat: 42.3315, lng: -83.068, radius: 350 },
    { name: "North Corktown", hint: "Butternut & Wabash", lat: 42.3378, lng: -83.0735, radius: 400 },
    { name: "Roosevelt Park", hint: "By Michigan Central Station", lat: 42.3292, lng: -83.0775, radius: 300 },
    { name: "Porter St", hint: "Porter & Rosa Parks", lat: 42.3272, lng: -83.0645, radius: 300 },
  ],
  "Eastern Market": [
    { name: "The Sheds", hint: "Russell St market sheds", lat: 42.3474, lng: -83.041, radius: 250 },
    { name: "Gratiot Corridor", hint: "Gratiot Ave & Russell", lat: 42.3432, lng: -83.0432, radius: 250 },
    { name: "Riopelle & Wilkins", hint: "Murals and warehouses", lat: 42.35, lng: -83.0385, radius: 250 },
    { name: "Division St", hint: "Division & St. Aubin", lat: 42.3505, lng: -83.0462, radius: 250 },
  ],
  "Jefferson-Chalmers": [
    { name: "Jefferson Ave Strip", hint: "Shops along E Jefferson", lat: 42.3625, lng: -82.954, radius: 450 },
    { name: "Fox Creek Canals", hint: "Canal-side homes", lat: 42.357, lng: -82.944, radius: 450 },
    { name: "Riverfront", hint: "Mariner Park & Alter Rd", lat: 42.3538, lng: -82.9395, radius: 400 },
    { name: "Kercheval & Chalmers", hint: "North of Jefferson", lat: 42.368, lng: -82.958, radius: 450 },
  ],
  Southwest: [
    { name: "Mexicantown", hint: "Bagley St & W Vernor", lat: 42.3205, lng: -83.0935, radius: 450 },
    { name: "Hubbard Farms", hint: "W Grand Blvd to Clark", lat: 42.3195, lng: -83.082, radius: 350 },
    { name: "Clark Park", hint: "Around the park", lat: 42.3245, lng: -83.0985, radius: 350 },
    { name: "Springwells Village", hint: "Springwells & W Vernor", lat: 42.316, lng: -83.112, radius: 450 },
  ],
  "North End": [
    { name: "Oakland Ave", hint: "Oakland & Holbrook", lat: 42.3822, lng: -83.067, radius: 350 },
    { name: "Holbrook & Brush", hint: "Quiet residential blocks", lat: 42.3848, lng: -83.073, radius: 350 },
    { name: "Milwaukee Junction", hint: "Old factory district", lat: 42.3735, lng: -83.064, radius: 350 },
    { name: "Woodward & Clairmount", hint: "Along Woodward", lat: 42.379, lng: -83.08, radius: 350 },
  ],
  Bagley: [
    { name: "Avenue of Fashion", hint: "Livernois & 7 Mile", lat: 42.4205, lng: -83.1415, radius: 350 },
    { name: "Curtis & Prairie", hint: "Tree-lined side streets", lat: 42.4228, lng: -83.1468, radius: 300 },
    { name: "McNichols & Wyoming", hint: "South-west corner", lat: 42.416, lng: -83.1525, radius: 350 },
    { name: "Bagley Park", hint: "Around the park", lat: 42.4178, lng: -83.1455, radius: 250 },
  ],
};

export const travelModes = ["walk", "bike", "bus", "drive"] as const;
export type TravelMode = (typeof travelModes)[number];

export type Vendor = {
  slug: string;
  name: string;
  owner: string;
  category: (typeof categories)[number];
  neighborhood: (typeof neighborhoods)[number];
  /** Specific pocket inside the neighborhood; must match a name in subAreas[neighborhood]. */
  subArea: string;
  minutesAway: number;
  travel: Record<TravelMode, number>;
  address: string;
  lat: number;
  lng: number;
  approximate?: boolean;
  image: string;
  tagline: string;
  story: string;
  services: string[];
  hours: string;
  vouchedBy: { name: string; years: number }[];
};

export const vendors: Vendor[] = [
  {
    slug: "north-end-greens",
    name: "North End Greens",
    owner: "Marcus Bell",
    category: "Food & farms",
    neighborhood: "North End",
    subArea: "Oakland Ave",
    minutesAway: 4,
    travel: { walk: 12, bike: 5, bus: 8, drive: 4 },
    address: "Oakland Ave & Holbrook St, Detroit, MI 48211",
    lat: 42.3815,
    lng: -83.0675,
    image: farmer,
    tagline: "Collards, kale and tomatoes grown on three once-vacant lots.",
    story:
      "Marcus learned to garden from his grandmother, who grew okra behind their house on Oakland Avenue. In 2016 he cleared three empty lots on his block. Today he feeds about 60 families a week and teaches kids from the school down the street how to grow their own food.",
    services: ["Weekly produce box", "Saturday farm stand", "Kids' garden classes"],
    hours: "Farm stand Sat 9am–1pm",
    vouchedBy: [{ name: "Ms. Loretta J.", years: 52 }, { name: "Pastor Reed", years: 30 }],
  },
  {
    slug: "auntie-dees-pies",
    name: "Auntie Dee's Pies",
    owner: "Denise Carter",
    category: "Home-based business",
    neighborhood: "Bagley",
    subArea: "Avenue of Fashion",
    minutesAway: 3,
    travel: { walk: 9, bike: 4, bus: 7, drive: 3 },
    address: "Near Bagley & Livernois, Detroit, MI 48221",
    lat: 42.4186,
    lng: -83.1418,
    approximate: true,
    image: baker,
    tagline: "Sweet potato pies from a family recipe, baked in a licensed home kitchen.",
    story:
      "Denise bakes her great-aunt's recipe, carried up from Alabama in 1951. She started selling pies to neighbors during the pandemic and now runs a registered cottage food business from her kitchen.",
    services: ["Whole pies", "Holiday pre-orders", "Church and block party catering"],
    hours: "Order by Thursday, pick up Saturday",
    vouchedBy: [{ name: "Bagley Block Club", years: 25 }],
  },
  {
    slug: "jc-fix-it",
    name: "Jefferson-Chalmers Fix-It",
    owner: "Ray Ortiz",
    category: "Home repair",
    neighborhood: "Jefferson-Chalmers",
    subArea: "Jefferson Ave Strip",
    minutesAway: 6,
    travel: { walk: 25, bike: 10, bus: 14, drive: 6 },
    address: "14000 E Jefferson Ave, Detroit, MI 48215",
    lat: 42.3612,
    lng: -82.9538,
    image: hero,
    tagline: "Porches, gutters and basement flood prep from a neighbor who knows these houses.",
    story:
      "Ray has repaired homes on the east side for 22 years. After the 2021 floods he started teaching free basement prep workshops at the rec center.",
    services: ["Porch and step repair", "Gutters", "Flood prep"],
    hours: "Mon–Sat, call ahead",
    vouchedBy: [{ name: "Mr. Harold W.", years: 41 }, { name: "Ms. Tanya B.", years: 19 }],
  },
  {
    slug: "little-sprouts",
    name: "Little Sprouts Home Daycare",
    owner: "Keisha Morgan",
    category: "Childcare",
    neighborhood: "Corktown",
    subArea: "Historic Corktown",
    minutesAway: 5,
    travel: { walk: 15, bike: 6, bus: 5, drive: 5 },
    address: "Near Michigan Ave & Trumbull, Detroit, MI 48216",
    lat: 42.3317,
    lng: -83.068,
    approximate: true,
    image: story,
    tagline: "Licensed home daycare with a backyard garden and lots of story time.",
    story:
      "Keisha is a former teacher who opened her licensed home daycare so parents on her block didn't have to drive across town.",
    services: ["Full day care, ages 1–5", "After-school pickup"],
    hours: "Mon–Fri 7am–6pm",
    vouchedBy: [{ name: "Corktown Parents Group", years: 12 }],
  },
  {
    slug: "mexicantown-wellness",
    name: "Casa Salud Herbals",
    owner: "Rosa Delgado",
    category: "Wellness",
    neighborhood: "Southwest",
    subArea: "Mexicantown",
    minutesAway: 8,
    travel: { walk: 30, bike: 12, bus: 15, drive: 8 },
    address: "4200 W Vernor Hwy, Detroit, MI 48209",
    lat: 42.3197,
    lng: -83.0963,
    image: hero,
    tagline: "Teas and remedies passed down three generations, with bilingual classes.",
    story:
      "Rosa grew up helping her abuela mix herbal teas in Southwest Detroit. She now teaches bilingual wellness classes at the community center.",
    services: ["Herbal teas", "Wellness classes (English/Spanish)"],
    hours: "Tue–Sat 10am–5pm",
    vouchedBy: [{ name: "Ms. Carmen R.", years: 38 }],
  },
  {
    slug: "eastern-market-honey",
    name: "Gratiot Honey Co.",
    owner: "Samuel Okafor",
    category: "Food & farms",
    neighborhood: "Eastern Market",
    subArea: "The Sheds",
    minutesAway: 7,
    travel: { walk: 28, bike: 11, bus: 4, drive: 7 },
    address: "Eastern Market Shed 2, 2934 Russell St, Detroit, MI 48207",
    lat: 42.3474,
    lng: -83.041,
    image: farmer,
    tagline: "Raw city honey from rooftop and lot hives across the east side.",
    story: "Samuel keeps 40 hives on rooftops and lots, and sells every Saturday at Eastern Market Shed 2.",
    services: ["Raw honey", "Beekeeping workshops"],
    hours: "Sat at Eastern Market",
    vouchedBy: [{ name: "Ms. Loretta J.", years: 52 }],
  },
];

export const threadCategories = ["Stories", "Questions", "Recommendations", "Events & meetups", "For vendors"] as const;
export type ThreadCategory = (typeof threadCategories)[number];

export type Reply = { id: string; author: string; note?: string | undefined; date: string; text: string };

export type Story = {
  slug: string;
  title: string;
  person: string;
  teller: string;
  image?: string | undefined;
  excerpt: string;
  body: string[];
  category: ThreadCategory;
  neighborhood?: string | undefined;
  date: string;
  featured?: boolean | undefined;
  replies: Reply[];
};
export type Thread = Story;

export const stories: Story[] = [
  {
    slug: "okra-rows-oakland-avenue",
    title: "The okra rows on Oakland Avenue",
    person: "Loretta Johnson",
    teller: "Loretta Johnson, North End since 1972",
    image: story,
    excerpt:
      "Back then every yard had a garden. We traded greens over the fence. When I see Marcus out there with the kids, it's like the block remembered.",
    category: "Stories",
    neighborhood: "North End",
    date: "2026-09-12",
    featured: true,
    replies: [
      { id: "r1", author: "Marcus Bell", note: "North End Greens", date: "2026-09-13", text: "Ms. Loretta, you taught me which okra was ready by snapping the tip. I still do it that way with the kids." },
      { id: "r2", author: "Jasmine T.", note: "New to the North End", date: "2026-09-20", text: "Just moved here from Atlanta. Is the Saturday farm stand open to anyone? Would love to bring my daughter." },
      { id: "r3", author: "Marcus Bell", note: "North End Greens", date: "2026-09-20", text: "Absolutely, Jasmine. Saturdays 9 to 1, and kids can help pick." },
    ],
    body: [
      "I moved onto Oakland Avenue in the summer of 1972. My husband worked at Dodge Main and I worked at the hospital, and every evening we'd come home to a block that smelled like somebody's supper.",
      "Every yard had a garden then. Mrs. Bell next door grew okra so tall you couldn't see her kitchen window. We traded over the fence: my tomatoes for her okra, her collards for my peppers. Nobody wrote anything down. You just knew who had what.",
      "When the plant closed, a lot of folks left. Houses came down. The gardens went with them. For years those lots were just grass and glass.",
      "Then one spring, Mrs. Bell's grandson Marcus came back with a shovel. He didn't ask anybody, he just started. Now there are kids out there every Saturday pulling weeds and arguing over who gets to pick the first tomato.",
      "I tell young people: the land remembers. You just have to give it somebody to remember with.",
    ],
  },
  {
    slug: "pies-came-up-on-the-train",
    title: "Pies that came up on the train",
    person: "Denise Carter",
    teller: "Denise Carter, Bagley",
    image: baker,
    excerpt: "My great-aunt brought this recipe from Alabama in 1951. I still use her pie tin.",
    category: "Stories",
    neighborhood: "Bagley",
    date: "2026-10-02",
    featured: true,
    replies: [
      { id: "r1", author: "Pastor Reed", note: "Bagley", date: "2026-10-03", text: "Those pies have been at every church homecoming I can remember. Thank you for keeping it going, Denise." },
      { id: "r2", author: "Alicia M.", note: "Bagley", date: "2026-10-10", text: "How did you get the cottage food license? I want to sell tamales from home." },
    ],
    body: [
      "My great-aunt Hattie came up from Montgomery on the train in 1951 with one suitcase, forty dollars, and a recipe card folded inside her Bible.",
      "She got work cleaning houses in Palmer Park, and on Sundays she baked sweet potato pies for the whole church. People would line up after service. She never charged a dime.",
      "When she passed, I got the Bible, the card, and a dented tin pie plate. For years I only made those pies at Thanksgiving.",
      "During the pandemic, my neighbor asked if I'd sell her one. Then her sister wanted one. Then the block club. I took a class, got my cottage food license, and now I bake every Friday night.",
      "I still use her tin. The pies taste the same. I think that's the point.",
    ],
  },
  {
    slug: "when-the-east-side-flooded",
    title: "When the east side flooded",
    person: "Harold Washington",
    teller: "Harold Washington, Jefferson-Chalmers since 1983",
    image: hero,
    excerpt: "Neighbors pumped each other's basements for a week straight. That's who we are.",
    category: "Stories",
    neighborhood: "Jefferson-Chalmers",
    date: "2026-08-28",
    featured: true,
    replies: [
      { id: "r1", author: "Ray Ortiz", note: "Jefferson-Chalmers Fix-It", date: "2026-08-29", text: "Still have those two pumps. If anyone on the east side needs one during a storm, message the block club." },
      { id: "r2", author: "Tanya B.", note: "Jefferson-Chalmers", date: "2026-09-05", text: "The flood prep workshop is Nov 15 at Butzel Family Center. Bring your questions about backflow valves." },
    ],
    body: [
      "They call Jefferson-Chalmers 'Little Venice' because of the canals. Pretty name. Not so pretty when the water comes in the house.",
      "In June of 2021 it rained like I'd never seen. By morning there was four feet of water in my basement and my neighbor's furnace was floating.",
      "Nobody waited for the city. Ray from down the street had two pumps. The church brought sandwiches. Teenagers carried ruined couches to the curb all day for no pay.",
      "We pumped basements for a week straight, house to house. By the end, I knew the names of people I'd waved at for thirty years and never spoken to.",
      "Now Ray teaches flood prep at the rec center. I go every year, and I bring someone new.",
    ],
  },
];

export const blockClubs = [
  { name: "Bagley Block Club", neighborhood: "Bagley", meets: "1st Tuesday, 6:30pm", members: 84 },
  { name: "North End Neighbors United", neighborhood: "North End", meets: "2nd Saturday, 10am", members: 120 },
  { name: "Jefferson-Chalmers Citizens District Council", neighborhood: "Jefferson-Chalmers", meets: "3rd Thursday, 7pm", members: 210 },
  { name: "Corktown Residents Council", neighborhood: "Corktown", meets: "Last Monday, 7pm", members: 95 },
];

export const events = [
  { date: "Nov 1", title: "Fall harvest swap", place: "North End Greens", neighborhood: "North End" },
  { date: "Nov 8", title: "Block cleanup + chili", place: "Bagley & Livernois", neighborhood: "Bagley" },
  { date: "Nov 15", title: "Basement flood prep workshop", place: "Butzel Family Center", neighborhood: "Jefferson-Chalmers" },
  { date: "Nov 22", title: "Holiday pie pre-order pickup", place: "Auntie Dee's", neighborhood: "Bagley" },
];

export const hubBoard = [
  { type: "Skill share", text: "I'll teach canning basics in exchange for help with my website.", who: "Denise, Bagley" },
  { type: "Material share", text: "Extra raised-bed lumber and 20 bags of compost — free to a grower.", who: "Marcus, North End" },
  { type: "Group buying", text: "Splitting a bulk order of pie tins and boxes. 4 spots left.", who: "Auntie Dee's" },
  { type: "Share clients", text: "Booked through December — happy to refer porch jobs to another fixer.", who: "Ray, Jefferson-Chalmers" },
] as const;

export const permitSteps = [
  { t: "Pick your business type", d: "Cottage food, home occupation, or storefront — each has different rules." },
  { t: "Register your business name", d: "File an assumed name (DBA) with Wayne County." },
  { t: "Check zoning and licenses", d: "Detroit's Buildings, Safety Engineering & Environmental Department (BSEED) handles most permits." },
  { t: "Get your tax ID", d: "A free EIN from the IRS and a Michigan sales tax license if you sell goods." },
  { t: "Find free help", d: "Detroit has free small-business coaching programs — ask us to connect you." },
] as const;

/** Everyday demo threads so the forum feels lived-in (made-up neighbors). */
export const forumThreads: Thread[] = [
  {
    slug: "best-way-to-get-basement-waterproofed",
    title: "Who do you trust to waterproof a basement?",
    person: "Keisha Morgan",
    teller: "Keisha Morgan, Jefferson-Chalmers",
    excerpt: "Every big storm I'm out there with a shop vac. Looking for someone honest who won't upsell me.",
    body: [
      "Every big storm I'm out there with a shop vac. Looking for someone honest who won't upsell me on a whole new foundation.",
      "Bonus points if they know the canal-side houses. Ours is from 1924.",
    ],
    category: "Recommendations",
    neighborhood: "Jefferson-Chalmers",
    date: "2026-10-18",
    replies: [
      { id: "r1", author: "Ray Ortiz", note: "Jefferson-Chalmers Fix-It", date: "2026-10-18", text: "Happy to come look for free. Most canal houses just need a backflow valve and the downspouts pointed away from the house." },
      { id: "r2", author: "Harold W.", note: "Jefferson-Chalmers since 1983", date: "2026-10-19", text: "Ray did mine. Took one afternoon, hasn't flooded since." },
    ],
  },
  {
    slug: "kid-friendly-saturday-morning",
    title: "Kid-friendly things to do on a Saturday morning?",
    person: "Jasmine T.",
    teller: "Jasmine T., North End",
    excerpt: "New here with a 6-year-old who has endless energy. Free or cheap ideas within walking distance?",
    body: ["New here with a 6-year-old who has endless energy. Free or cheap ideas within walking distance of Oakland Ave?"],
    category: "Questions",
    neighborhood: "North End",
    date: "2026-10-20",
    replies: [
      { id: "r1", author: "Marcus Bell", note: "North End Greens", date: "2026-10-20", text: "Farm stand is 9 to 1 on Saturdays and kids can help harvest. We usually have a seed-planting table too." },
      { id: "r2", author: "Ms. Loretta J.", note: "North End", date: "2026-10-21", text: "Story hour at the library branch, and the park on Holbrook just got new swings." },
      { id: "r3", author: "Jasmine T.", note: "North End", date: "2026-10-21", text: "This is perfect, thank you both! See you Saturday." },
    ],
  },
  {
    slug: "tamales-cottage-food-license",
    title: "How long did your cottage food license take?",
    person: "Alicia M.",
    teller: "Alicia M., Southwest",
    excerpt: "I want to sell tamales from my kitchen for the holidays. Is it realistic to be ready by December?",
    body: [
      "I want to sell tamales from my kitchen for the holidays. Is it realistic to be ready by December?",
      "Also, does anyone know if I can sell at a church bazaar with it?",
    ],
    category: "For vendors",
    neighborhood: "Southwest",
    date: "2026-10-12",
    replies: [
      { id: "r1", author: "Denise Carter", note: "Auntie Dee's Pies", date: "2026-10-12", text: "Michigan doesn't need a license for cottage food, just the labeling rules and the online training. I was selling within two weeks." },
      { id: "r2", author: "Rosa Delgado", note: "Mexicantown Wellness", date: "2026-10-13", text: "Church bazaars are fine as long as you're selling direct to the person. I'll buy a dozen!" },
    ],
  },
  {
    slug: "porch-light-walk-corktown",
    title: "Evening porch-light walk in Corktown — who's in?",
    person: "Tom Kelly",
    teller: "Tom Kelly, Corktown",
    excerpt: "Thinking of a slow loop every Thursday at 7, porch lights on, say hi to neighbors. Strollers and dogs welcome.",
    body: [
      "Thinking of a slow loop every Thursday at 7 — porch lights on, say hi to neighbors. Strollers and dogs welcome.",
      "We'd start at Roosevelt Park and loop through North Corktown. About 40 minutes.",
    ],
    category: "Events & meetups",
    neighborhood: "Corktown",
    date: "2026-10-16",
    replies: [
      { id: "r1", author: "Grace L.", note: "Little Sprouts Daycare", date: "2026-10-16", text: "Love this. Can bring a wagon of tired toddlers for the first half." },
      { id: "r2", author: "Sam P.", note: "North Corktown", date: "2026-10-17", text: "I'm in. Will bring a flashlight for the stretch on Wabash." },
    ],
  },
  {
    slug: "bus-route-to-eastern-market",
    title: "Easiest bus to Eastern Market on Saturdays?",
    person: "Priya S.",
    teller: "Priya S., Bagley",
    excerpt: "No car. What's the least painful way to get from 7 Mile & Livernois to the market with a cart?",
    body: ["No car. What's the least painful way to get from 7 Mile & Livernois to the market with a folding cart?"],
    category: "Questions",
    neighborhood: "Bagley",
    date: "2026-10-09",
    replies: [
      { id: "r1", author: "Pastor Reed", note: "Bagley", date: "2026-10-09", text: "Take the Livernois bus down to Grand River and transfer. Go early, the afternoon buses get packed." },
      { id: "r2", author: "Hank O.", note: "Eastern Market Honey", date: "2026-10-10", text: "Find me at Shed 2 and I'll hold your bag while you shop." },
    ],
  },
  {
    slug: "tool-library-idea",
    title: "Should we start a tool-sharing shelf?",
    person: "Dana R.",
    teller: "Dana R., Southwest",
    excerpt: "Half the block owns the same ladder. What if we kept one set of good tools in someone's garage and shared?",
    body: [
      "Half the block owns the same ladder. What if we kept one set of good tools in someone's garage and shared?",
      "I can donate a drill, a post-hole digger and a hedge trimmer to start.",
    ],
    category: "Recommendations",
    neighborhood: "Southwest",
    date: "2026-10-05",
    replies: [
      { id: "r1", author: "Ray Ortiz", note: "Jefferson-Chalmers Fix-It", date: "2026-10-06", text: "Did this on our block. Use a simple sign-out sheet on the door — it works." },
    ],
  },
  {
    slug: "1960s-photos-of-the-north-end",
    title: "Anyone have photos of the North End from the 60s?",
    person: "Marcus Bell",
    teller: "Marcus Bell, North End",
    excerpt: "Making a little history board for the farm stand. Would love old photos of Oakland Ave and the shops that used to be here.",
    body: [
      "Making a little history board for the farm stand. Would love old photos of Oakland Ave and the shops that used to be here.",
      "I'll scan them and give the originals right back.",
    ],
    category: "Stories",
    neighborhood: "North End",
    date: "2026-09-30",
    replies: [
      { id: "r1", author: "Ms. Loretta J.", note: "North End since 1972", date: "2026-10-01", text: "I have a whole shoebox. Come by after church and we'll go through it." },
    ],
  },
  {
    slug: "block-cleanup-volunteers",
    title: "Volunteers needed: Bagley & Livernois cleanup, Nov 8",
    person: "Bagley Block Club",
    teller: "Bagley Block Club",
    excerpt: "Gloves, bags and chili provided. We'll split into teams by street. Teens can earn service hours.",
    body: [
      "Gloves, bags and chili provided. We'll split into teams by street. Teens can earn service hours.",
      "Meet at 10am at the corner of Bagley & Livernois.",
    ],
    category: "Events & meetups",
    neighborhood: "Bagley",
    date: "2026-10-22",
    replies: [
      { id: "r1", author: "Denise Carter", note: "Auntie Dee's Pies", date: "2026-10-22", text: "I'll bring two pies for the volunteers." },
      { id: "r2", author: "Priya S.", note: "Bagley", date: "2026-10-23", text: "Signing up me and my roommate!" },
    ],
  },
  {
    slug: "pricing-for-home-daycare",
    title: "How do other home daycares set their prices?",
    person: "Grace L.",
    teller: "Grace L., Corktown",
    excerpt: "I don't want to price out neighbors, but I also need to keep the lights on. How do you balance it?",
    body: ["I don't want to price out neighbors, but I also need to keep the lights on. How do you balance it? Sliding scale? Sibling discounts?"],
    category: "For vendors",
    neighborhood: "Corktown",
    date: "2026-10-14",
    replies: [
      { id: "r1", author: "Rosa Delgado", note: "Mexicantown Wellness", date: "2026-10-15", text: "I do a sliding scale with three tiers and nobody has to explain why they pick one. People are honest." },
    ],
  },
  {
    slug: "honey-for-allergies",
    title: "Does local honey actually help with allergies?",
    person: "Brian K.",
    teller: "Brian K., Eastern Market",
    excerpt: "My spring allergies are brutal. A coworker swears by local honey. Real or myth?",
    body: ["My spring allergies are brutal. A coworker swears by local honey. Real or myth?"],
    category: "Questions",
    neighborhood: "Eastern Market",
    date: "2026-10-03",
    replies: [
      { id: "r1", author: "Hank O.", note: "Eastern Market Honey", date: "2026-10-03", text: "Honest answer: the science is mixed. But it's good honey, and a spoonful in tea never hurt anybody." },
    ],
  },
];

/** All built-in threads (featured stories first). */
export const seedThreads: Thread[] = [...stories, ...forumThreads];
