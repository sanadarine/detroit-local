import type { TravelMode } from "@/lib/data";

export type LatLng = { lat: number; lng: number };

/** Typical city speeds in meters per minute (bus includes slower stop-and-go). */
export const SPEED_M_PER_MIN: Record<TravelMode, number> = { walk: 80, bike: 250, bus: 200, drive: 450 };
/** Streets aren't straight lines — inflate straight-line distance a bit. */
const DETOUR = 1.3;

export function distanceMeters(a: LatLng, b: LatLng) {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Estimated minutes to travel from a to b; at least 1. */
export function travelMinutes(a: LatLng, b: LatLng, mode: TravelMode) {
  return Math.max(1, Math.round((distanceMeters(a, b) * DETOUR) / SPEED_M_PER_MIN[mode]));
}

/** Straight-line radius reachable within `minutes`, for drawing on the map. */
export function reachMeters(mode: TravelMode, minutes: number) {
  return (SPEED_M_PER_MIN[mode] * minutes) / DETOUR;
}

export function withinMinutes<T extends LatLng>(origin: LatLng, places: T[], mode: TravelMode, minutes: number) {
  return places.filter((p) => travelMinutes(origin, p, mode) <= minutes);
}
