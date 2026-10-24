import corktown from "@/assets/hood-corktown.jpg";
import easternMarket from "@/assets/hood-eastern-market.jpg";
import jefferson from "@/assets/hood-jefferson-chalmers.jpg";
import southwest from "@/assets/hood-southwest.jpg";
import northEnd from "@/assets/hood-north-end.jpg";
import bagley from "@/assets/hood-bagley.jpg";
import type { neighborhoods } from "@/lib/data";

export type HoodName = (typeof neighborhoods)[number];

export const hoodArt: Record<HoodName, { image: string; tagline: string; scene: "birds" | "water" | "bunting" | "leaves" }> = {
  Corktown: { image: corktown, tagline: "Victorian rowhouses in the shadow of the old train station.", scene: "birds" },
  "Eastern Market": { image: easternMarket, tagline: "Saturday sheds full of flowers, produce and murals.", scene: "birds" },
  "Jefferson-Chalmers": { image: jefferson, tagline: "Quiet canals and docks on the Detroit River.", scene: "water" },
  Southwest: { image: southwest, tagline: "Bright storefronts, murals and the Ambassador Bridge.", scene: "bunting" },
  "North End": { image: northEnd, tagline: "Urban farms growing on once-empty lots.", scene: "leaves" },
  Bagley: { image: bagley, tagline: "Tree-lined brick homes near the Avenue of Fashion.", scene: "leaves" },
};
