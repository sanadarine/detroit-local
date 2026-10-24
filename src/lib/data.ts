import farmer from "@/assets/farmer.jpg";
import baker from "@/assets/baker.jpg";
import story from "@/assets/story.jpg";
import hero from "@/assets/hero.jpg";

export const categories = ["Food & farms", "Home-based business", "Home repair", "Childcare", "Wellness"] as const;
export const neighborhoods = ["Corktown", "Eastern Market", "Jefferson-Chalmers", "Southwest", "North End", "Bagley"] as const;

export type Vendor = {
  slug: string;
  name: string;
  owner: string;
  category: (typeof categories)[number];
  neighborhood: (typeof neighborhoods)[number];
  minutesAway: number;
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
    image: farmer,
    tagline: "Raw city honey from rooftop and lot hives across the east side.",
    story: "Samuel keeps 40 hives on rooftops and lots, and sells every Saturday at Eastern Market Shed 2.",
    services: ["Raw honey", "Beekeeping workshops"],
    hours: "Sat at Eastern Market",
    vouchedBy: [{ name: "Ms. Loretta J.", years: 52 }],
  },
];

export const stories = [
  {
    title: "The okra rows on Oakland Avenue",
    teller: "Loretta Johnson, North End since 1972",
    image: story,
    excerpt:
      "Back then every yard had a garden. We traded greens over the fence. When I see Marcus out there with the kids, it's like the block remembered.",
  },
  {
    title: "Pies that came up on the train",
    teller: "Denise Carter, Bagley",
    image: baker,
    excerpt: "My great-aunt brought this recipe from Alabama in 1951. I still use her pie tin.",
  },
  {
    title: "When the east side flooded",
    teller: "Harold Washington, Jefferson-Chalmers since 1983",
    image: hero,
    excerpt: "Neighbors pumped each other's basements for a week straight. That's who we are.",
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
