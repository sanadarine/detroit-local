import farmer from "@/assets/farmer.jpg";
import baker from "@/assets/baker.jpg";
import story from "@/assets/story.jpg";
import hero from "@/assets/hero.jpg";

export const categories = ["Farms & gardens", "Food businesses", "Coffee & bakeries", "Markets & grocers", "Home services", "Childcare & kids", "Wellness", "Beauty & barbers", "Shops & makers"] as const;
export type Category = (typeof categories)[number];
export const neighborhoods = ["Corktown", "Eastern Market", "Jefferson-Chalmers", "Southwest", "North End", "Bagley"] as const;



export type Hood = (typeof neighborhoods)[number];
export type SubArea = { name: string; hint: string; lat: number; lng: number; radius: number };



export const travelModes = ["walk", "bike", "bus", "drive"] as const;
export type TravelMode = (typeof travelModes)[number];

export type Vendor = {
  slug: string;
  name: string;
  owner?: string | null;
  category: Category;
  neighborhood: Hood;
  /** Specific pocket inside the neighborhood; must match a name in subAreas[neighborhood]. */
  subArea: string;
  address: string;
  lat: number;
  lng: number;
  phone?: string | null;
  website?: string | null;
  instagram?: string | null;
  hours?: string | null;
  tagline: string;
  story: string;
  services: string[];
  /** Public rating seen on a review site at research time */
  rating?: { source: string; stars: number; count: number } | null;
  /** Paraphrased themes from public reviews */
  reviewHighlights: string[];
  sources: string[];
};

export type Park = {
  slug: string;
  name: string;
  neighborhood: Hood;
  subArea: string;
  address: string;
  lat: number;
  lng: number;
  features: string[];
  about: string;
  sources: string[];
  approximate?: boolean;
};

export { neighborhoodAreas, subAreas, vendors, parks } from "@/lib/listings";


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

export type BlockClub = {
  slug: string;
  name: string;
  neighborhood: Hood;
  meets: string;
  where: string;
  members: number;
  founded: number;
  leaders: string;
  about: string;
  focus: string[];
  openTo: string;
  dues: string;
  howToJoin: string[];
};

/** Demo block clubs (made-up details). */
export const blockClubs: BlockClub[] = [
  {
    slug: "bagley-block-club",
    name: "Bagley Block Club",
    neighborhood: "Bagley",
    meets: "1st Tuesday, 6:30pm",
    where: "Church fellowship hall off Livernois (address sent when you join)",
    members: 84,
    founded: 1987,
    leaders: "Pastor Reed & Denise Carter",
    about: "Neighbors keeping Bagley's tree-lined blocks clean, safe and friendly since the 80s. Meetings are short, there's always coffee, and newcomers get introduced at the start.",
    focus: ["Monthly block cleanups", "Porch-light safety walks", "Holiday food drive", "Welcoming new neighbors"],
    openTo: "Anyone who lives, works or worships in Bagley",
    dues: "Free (optional $10 a year for cleanup supplies)",
    howToJoin: ["Send a request below and a volunteer will reply within a few days.", "Come to any 1st-Tuesday meeting. You don't need to RSVP.", "Get added to the group text for cleanup and safety updates."],
  },
  {
    slug: "north-end-neighbors-united",
    name: "North End Neighbors United",
    neighborhood: "North End",
    meets: "2nd Saturday, 10am",
    where: "North End Greens farm stand on Oakland Ave (library room in winter)",
    members: 120,
    founded: 2009,
    leaders: "Ms. Loretta J. & Marcus Bell",
    about: "Turning vacant lots into gardens, teaching kids to grow food and keeping North End history alive. Saturday meetings end with a walk through the gardens.",
    focus: ["Vacant-lot gardens", "Youth garden program", "Neighborhood history board", "Senior check-ins"],
    openTo: "North End residents and friends of the neighborhood",
    dues: "Free",
    howToJoin: ["Request to join below and Marcus or Ms. Loretta will reach out.", "Stop by a 2nd-Saturday meeting at the farm stand.", "Pick a project (gardens, kids or history) and help out at least once a season."],
  },
  {
    slug: "jefferson-chalmers-cdc",
    name: "Jefferson-Chalmers Citizens District Council",
    neighborhood: "Jefferson-Chalmers",
    meets: "3rd Thursday, 7pm",
    where: "Butzel Family Center community room",
    members: 210,
    founded: 1979,
    leaders: "Harold W. & Tanya B.",
    about: "The east side's longest-running neighborhood council. We push for flood protection, keep the canals clean and support the shops along Jefferson.",
    focus: ["Flood prevention and backflow valves", "Canal cleanups", "Jefferson Ave small businesses", "Talking with the City on residents' behalf"],
    openTo: "Residents and property owners in Jefferson-Chalmers",
    dues: "Free (voting members sign in at two meetings a year)",
    howToJoin: ["Send a request below and get the meeting agenda by text or email.", "Attend a 3rd-Thursday meeting and sign the member sheet.", "Join a committee: flood, canals or business corridor."],
  },
  {
    slug: "corktown-residents-council",
    name: "Corktown Residents Council",
    neighborhood: "Corktown",
    meets: "Last Monday, 7pm",
    where: "Rotates between neighbors' porches (indoors in winter)",
    members: 95,
    founded: 1996,
    leaders: "Tom Kelly & Grace L.",
    about: "Detroit's oldest neighborhood, still looking out for each other. We focus on safe streets, Roosevelt Park and keeping longtime neighbors in their homes.",
    focus: ["Thursday porch-light walks", "Traffic and crosswalk safety", "Roosevelt Park events", "Help with home repairs for seniors"],
    openTo: "Anyone living in Historic or North Corktown",
    dues: "Free",
    howToJoin: ["Request to join below and you'll get next month's porch address.", "Come on a Thursday porch-light walk to meet people first.", "Say hi at the meeting. New faces always get the first slice of pie."],
  },
];

export type CommunityEvent = {
  slug: string;
  date: string;
  /** ISO date for sorting and display */
  iso: string;
  time: string;
  title: string;
  place: string;
  neighborhood: Hood;
  hostClub?: string | undefined;
  hostVendor?: string | undefined;
  host: string;
  about: string;
  bring: string[];
  cost: string;
  kidFriendly: boolean;
  /** "drop-in": just show up (optional "I'm going"); "request": limited spots, ask to join */
  signup: "drop-in" | "request";
  capacity?: number | undefined;
  spotsLeft?: number | undefined;
};

/** Demo events (made-up details). */
export const events: CommunityEvent[] = [
  {
    slug: "fall-harvest-swap",
    date: "Nov 1",
    iso: "2026-11-01",
    time: "Sat, 10am – 1pm",
    title: "Fall harvest swap",
    place: "North End Greens",
    neighborhood: "North End",
    hostClub: "north-end-neighbors-united",
    host: "North End Neighbors United",
    about: "Bring what you grew, canned or baked and leave with something new. Extra greens from the farm go to anyone who needs them. Kids can plant garlic for next spring.",
    bring: ["Extra produce, seeds or jars", "A bag or basket", "Gloves if you want to help plant"],
    cost: "Free",
    kidFriendly: true,
    signup: "drop-in",
  },
  {
    slug: "block-cleanup-chili",
    date: "Nov 8",
    iso: "2026-11-08",
    time: "Sat, 10am – 1pm",
    title: "Block cleanup + chili",
    place: "Bagley & Livernois",
    neighborhood: "Bagley",
    hostClub: "bagley-block-club",
    host: "Bagley Block Club",
    about: "We split into teams by street, clear litter and leaves, then warm up with chili at noon. Teens can earn service hours, and we'll sign the forms.",
    bring: ["Closed-toe shoes", "A rake if you have one", "Gloves and bags are provided"],
    cost: "Free",
    kidFriendly: true,
    signup: "request",
    capacity: 40,
    spotsLeft: 12,
  },
  {
    slug: "flood-prep-workshop",
    date: "Nov 15",
    iso: "2026-11-15",
    time: "Sat, 6pm – 8pm",
    title: "Basement flood prep workshop",
    place: "Butzel Family Center",
    neighborhood: "Jefferson-Chalmers",
    hostClub: "jefferson-chalmers-cdc",
    host: "Jefferson-Chalmers Citizens District Council",
    about: "Ray from Jefferson-Chalmers Fix-It walks through backflow valves, sump pumps and downspouts, plus what to do in the first hour of a flood. Q&A to follow.",
    bring: ["Photos of your basement or utility area", "Your questions"],
    cost: "Free",
    kidFriendly: false,
    signup: "request",
    capacity: 60,
    spotsLeft: 0,
  },
  {
    slug: "holiday-pie-pickup",
    date: "Nov 22",
    iso: "2026-11-22",
    time: "Sun, 11am – 3pm",
    title: "Holiday pie bake & share",
    place: "Bagley & Livernois fellowship hall",
    neighborhood: "Bagley",
    hostClub: "bagley-block-club",
    host: "Bagley Block Club",
    about: "Neighbors bake and pick up holiday sweet potato pies for seniors on the block. Request a spot to bake, deliver or pick up a pie, and the club will confirm.",
    bring: ["Your confirmation text", "A pie carrier or a flat spot in the car"],
    cost: "Free (bakers bring their own ingredients)",
    kidFriendly: true,
    signup: "request",
    capacity: 50,
    spotsLeft: 8,
  },
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
      { id: "r1", author: "Denise Carter", note: "Auntie Dee's Pies", date: "2026-10-12", text: "Michigan doesn't require a license for cottage food — just follow the labeling rules and sell directly to customers. I was selling within two weeks." },
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

export type Review = { id: string; author: string; note?: string | undefined; rating: number; date: string; text: string };



export const serviceCategories = ["Emergency & safety", "Trash & recycling", "Streets & 311", "Water & power", "Health & help", "City hall & neighborhoods"] as const;
export type ServiceCategory = (typeof serviceCategories)[number];

export type CityService = {
  id: string;
  category: ServiceCategory;
  name: string;
  what: string;
  phone?: string | undefined;
  /** Extra phone instruction, e.g. "press 2" */
  phoneNote?: string | undefined;
  text?: { to: string; body: string } | undefined;
  url?: string | undefined;
  hours?: string | undefined;
};

/** Real Detroit resident services and numbers (from detroitmi.gov, DTE and Michigan 211, checked Oct 2026). */
export const cityServices: CityService[] = [
  { id: "911", category: "Emergency & safety", name: "Police, fire & EMS", what: "Crimes in progress, fires, medical emergencies, downed power lines, illegal dumping happening right now.", phone: "911", hours: "24/7" },
  { id: "police-non-emergency", category: "Emergency & safety", name: "Detroit Police non-emergency", what: "Report something that already happened: break-ins, noise complaints, abandoned vehicles, open hydrants.", phone: "(313) 267-4600", hours: "24/7", url: "https://detroitmi.gov/departments/police-department/report-crime" },
  { id: "gas-leak", category: "Emergency & safety", name: "DTE gas leak hotline", what: "Smell gas? Leave the area first, call 911, then call DTE.", phone: "(800) 947-5000", hours: "24/7", url: "https://dteenergy.com/us/en/quicklinks/contact-us.html" },

  { id: "trash-schedule", category: "Trash & recycling", name: "Find your trash day", what: "Trash, recycling, bulk and yard waste are picked up weekly. Look up your schedule, or text your street address for reminders the night before.", text: { to: "(313) 800-7905", body: "Your street address" }, url: "https://detroitmi.gov/webapp/find-your-waste-pickup-schedule" },
  { id: "priority-waste", category: "Trash & recycling", name: "Missed pickup: East & Southwest Detroit", what: "Priority Waste handles East Detroit and Southwest Detroit south of I-94.", phone: "(855) 927-8365", url: "https://www.prioritywaste.com/cities-we-serve/detroit/" },
  { id: "waste-management", category: "Trash & recycling", name: "Missed pickup: West side", what: "Waste Management handles west-side pickup.", phone: "(844) 233-8764" },
  { id: "dpw-paid-pickup", category: "Trash & recycling", name: "DPW paid bulk pickup", what: "Too much for the curb? The Department of Public Works picks up extra items for $40 per cubic yard.", phone: "(313) 876-0004", url: "https://detroitmi.gov/departments/department-public-works/refuse-collection" },
  { id: "recycling-bin", category: "Trash & recycling", name: "Get a free recycling bin", what: "Curbside recycling is free for homes and buildings with 1–4 units, but you have to opt in.", url: "https://detroitmi.gov/departments/department-public-works/refuse-collection/detroit-recycles" },
  { id: "illegal-dumping", category: "Trash & recycling", name: "Report illegal dumping", what: "Already dumped? Report it in Improve Detroit or call BSEED Environmental Enforcement. Happening now? Call 911.", phone: "(313) 876-0426", url: "https://detroitmi.gov/departments/general-services-department/keep-detroit-clean" },

  { id: "improve-detroit", category: "Streets & 311", name: "Improve Detroit (Detroit's 311)", what: "Report potholes, running water, damaged street signs, dumping and more with a photo. You get updates as it's fixed.", url: "https://detroitmi.gov/ImproveDetroit" },
  { id: "street-repairs", category: "Streets & 311", name: "Street & pothole repairs", what: "Request repairs on residential streets and city roads by phone.", phone: "(313) 224-0033", url: "https://detroitmi.gov/departments/department-public-works/street-maintenance/pothole-repair" },
  { id: "streetlights", category: "Streets & 311", name: "Streetlight out", what: "Report public streetlight and outdoor lighting problems in DTE's Outage Center.", url: "https://outage.dteenergy.com/" },
  { id: "code-enforcement", category: "Streets & 311", name: "Property maintenance & code issues", what: "Neglected or unsafe properties, handled by BSEED Property Maintenance.", phone: "(313) 628-2451", url: "https://detroitmi.gov/contact" },

  { id: "dwsd", category: "Water & power", name: "Water main break or sewer backup", what: "Detroit Water and Sewerage Department, for water and sewer emergencies and billing.", phone: "(313) 267-8000", url: "https://detroitmi.gov/departments/water-and-sewerage-department/dwsd-customer-service/water-and-sewer-maintenanceemergencies" },
  { id: "dte-outage", category: "Water & power", name: "Power outage or downed line", what: "Report an outage and get restoration updates. Stay 25 feet away from downed lines.", phone: "(800) 477-4747", phoneNote: "press 2", url: "https://outage.dteenergy.com/" },

  { id: "211", category: "Health & help", name: "Michigan 211", what: "Free, confidential help finding food, housing, utility and bill assistance. 180+ languages.", phone: "211", text: { to: "898211", body: "Your ZIP code" }, hours: "24/7", url: "https://mi211.org/" },
  { id: "health-dept", category: "Health & help", name: "Detroit Health Department", what: "Clinics, immunizations, lead prevention, food safety. Public health emergencies: (313) 933-3437.", phone: "(313) 876-4000", url: "https://detroitmi.gov/departments/detroit-health-department" },
  { id: "animal-control", category: "Health & help", name: "Detroit Animal Care and Control", what: "Report stray animals, find a lost pet or adopt.", phone: "(313) 922-3647", hours: "Mon–Sat, 8am–6pm", url: "https://detroitmi.gov/departments/general-services-department/detroit-animal-care-and-control" },

  { id: "neighborhoods", category: "City hall & neighborhoods", name: "Department of Neighborhoods", what: "Your district manager helps with city services and neighborhood concerns, and can help you start a block club.", url: "https://detroitmi.gov/departments/department-neighborhoods" },
  { id: "city-clerk", category: "City hall & neighborhoods", name: "City Clerk, Citizen Information Center", what: "General questions about city government, records and elections.", phone: "(313) 224-3270", url: "https://detroitmi.gov/government/city-clerk/community-resources" },
  { id: "motor-city-makeover", category: "City hall & neighborhoods", name: "Volunteer: Motor City Makeover", what: "The City's yearly neighborhood cleanup. Bags and gloves provided.", phone: "(313) 224-4415", url: "https://detroitmi.gov/departments/general-services-department/keep-detroit-clean" },
  { id: "city-directory", category: "City hall & neighborhoods", name: "Full City of Detroit directory", what: "Every department's contacts in one place.", url: "https://detroitmi.gov/contact" },
];
