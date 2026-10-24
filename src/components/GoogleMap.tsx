import { LocateFixed } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    google?: any;
    __porchlightMapsReady?: () => void;
  }
}

let loader: Promise<any> | null = null;

function loadGoogleMaps(): Promise<any> {
  if (window.google?.maps?.Map) return Promise.resolve(window.google);
  if (loader) return loader;
  loader = new Promise((resolve, reject) => {
    const key = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"];
    const channel = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID"];
    if (!key) return reject(new Error("Map key missing"));
    window.__porchlightMapsReady = () => resolve(window.google);
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&loading=async&callback=__porchlightMapsReady&channel=${channel ?? ""}`;
    s.async = true;
    s.onerror = () => {
      loader = null;
      reject(new Error("Map failed to load"));
    };
    document.head.appendChild(s);
  });
  return loader;
}

export type MapPin = { id: string; lat: number; lng: number; title: string; approximate?: boolean | undefined };
export type MapArea = { name: string; lat: number; lng: number; radius: number };

type Props = {
  center: { lat: number; lng: number };
  zoom?: number;
  pins: MapPin[];
  areas?: MapArea[] | undefined;
  activeArea?: string | null | undefined;
  onAreaClick?: ((name: string) => void) | undefined;
  onPinClick?: ((id: string) => void) | undefined;
  onMapClick?: ((pos: { lat: number; lng: number }) => void) | undefined;
  /** "greedy" lets scroll / one finger move the map freely (full map); "cooperative" keeps page scrolling smooth. */
  gesture?: "greedy" | "cooperative";
  showLocate?: boolean;
  className?: string;
};

const GREEN = "#2f5d46";
const BRICK = "#b4482c";

export function GoogleMap({ center, zoom = 14, pins, areas, activeArea, onAreaClick, onPinClick, onMapClick, gesture = "cooperative", showLocate, className }: Props) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const overlays = useRef<any[]>([]);
  const areaOverlays = useRef<any[]>([]);
  const meMarker = useRef<any>(null);
  const clickRef = useRef(onMapClick);
  const pinClickRef = useRef(onPinClick);
  const areaClickRef = useRef(onAreaClick);
  clickRef.current = onMapClick;
  pinClickRef.current = onPinClick;
  areaClickRef.current = onAreaClick;
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadGoogleMaps()
      .then((google) => {
        if (cancelled || !el.current) return;
        map.current = new google.maps.Map(el.current, {
          center,
          zoom,
          clickableIcons: false,
          gestureHandling: gesture,
          mapTypeControl: true,
          mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU, position: google.maps.ControlPosition.TOP_RIGHT },
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
          styles: [{ featureType: "poi", stylers: [{ visibility: "off" }] }],
        });
        map.current.addListener("click", (e: any) => {
          clickRef.current?.({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        });
        setReady(true);
      })
      .catch(() => !cancelled && setError(true));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Neighborhood areas with name labels
  useEffect(() => {
    if (!ready || !areas) return;
    const google = window.google;
    areaOverlays.current.forEach((o) => o.setMap(null));
    areaOverlays.current = areas.flatMap((a) => {
      const active = a.name === activeArea;
      const circle = new google.maps.Circle({
        map: map.current,
        center: { lat: a.lat, lng: a.lng },
        radius: a.radius,
        strokeColor: active ? BRICK : GREEN,
        strokeOpacity: 0.9,
        strokeWeight: active ? 3 : 1.5,
        fillColor: active ? BRICK : GREEN,
        fillOpacity: active ? 0.18 : 0.08,
        clickable: !!areaClickRef.current,
      });
      circle.addListener("click", (e: any) => {
        if (clickRef.current) clickRef.current({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        areaClickRef.current?.(a.name);
      });
      const label = new google.maps.Marker({
        map: map.current,
        position: { lat: a.lat, lng: a.lng },
        icon: { path: google.maps.SymbolPath.CIRCLE, scale: 0 },
        label: { text: a.name, color: active ? BRICK : GREEN, fontWeight: "700", fontSize: "13px" },
        zIndex: 1,
      });
      label.addListener("click", () => areaClickRef.current?.(a.name));
      return [circle, label];
    });
  }, [ready, areas, activeArea]);

  // Fly to the selected neighborhood
  useEffect(() => {
    if (!ready || !areas) return;
    const a = areas.find((x) => x.name === activeArea);
    if (a) {
      map.current.panTo({ lat: a.lat, lng: a.lng });
      map.current.setZoom(15);
    } else if (areas.length) {
      const b = new window.google.maps.LatLngBounds();
      areas.forEach((x) => b.extend({ lat: x.lat, lng: x.lng }));
      map.current.fitBounds(b, 40);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, activeArea]);

  useEffect(() => {
    if (!ready) return;
    const google = window.google;
    overlays.current.forEach((o) => o.setMap(null));
    overlays.current = pins.map((p) => {
      if (p.approximate) {
        return new google.maps.Circle({
          map: map.current,
          center: { lat: p.lat, lng: p.lng },
          radius: 300,
          strokeColor: GREEN,
          strokeOpacity: 0.8,
          fillColor: GREEN,
          fillOpacity: 0.2,
        });
      }
      const m = new google.maps.Marker({ map: map.current, position: { lat: p.lat, lng: p.lng }, title: p.title, zIndex: 10 });
      m.addListener("click", () => pinClickRef.current?.(p.id));
      return m;
    });
  }, [ready, pins]);

  function locate() {
    if (!navigator.geolocation || !ready) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        const google = window.google;
        const here = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        meMarker.current?.setMap(null);
        meMarker.current = new google.maps.Marker({
          map: map.current,
          position: here,
          title: "You are here",
          icon: { path: google.maps.SymbolPath.CIRCLE, scale: 8, fillColor: "#1a73e8", fillOpacity: 1, strokeColor: "#ffffff", strokeWeight: 3 },
          zIndex: 20,
        });
        map.current.panTo(here);
        map.current.setZoom(15);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-xl border border-border bg-secondary ${className ?? ""}`}>
      <div ref={el} className="absolute inset-0" />
      {!ready && (
        <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">
          {error ? "Map couldn't load right now." : "Loading map…"}
        </div>
      )}
      {ready && showLocate && (
        <button
          type="button"
          onClick={locate}
          className="absolute bottom-4 left-3 flex items-center gap-1.5 rounded-full bg-card px-3 py-2 text-sm font-medium shadow-md hover:bg-secondary"
        >
          <LocateFixed className="h-4 w-4 text-primary" />
          {locating ? "Finding you…" : "Find me"}
        </button>
      )}
    </div>
  );
}
