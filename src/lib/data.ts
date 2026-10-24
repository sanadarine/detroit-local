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

export const travelModes = ["walk", "bike", "bus", "drive"] as const;
export type TravelMode = (typeof travelModes)[number];

export type Vendor = {
  slug: string;
  name: string;
  owner: string;
  category: (typeof categories)[number];
  neighborhood: (typeof neighborhoods)[number];
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
