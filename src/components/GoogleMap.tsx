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

type Props = {
  center: { lat: number; lng: number };
  zoom?: number;
  pins: MapPin[];
  onPinClick?: ((id: string) => void) | undefined;
  onMapClick?: ((pos: { lat: number; lng: number }) => void) | undefined;
  className?: string;
};

export function GoogleMap({ center, zoom = 14, pins, onPinClick, onMapClick, className }: Props) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const overlays = useRef<any[]>([]);
  const clickRef = useRef(onMapClick);
  const pinClickRef = useRef(onPinClick);
  clickRef.current = onMapClick;
  pinClickRef.current = onPinClick;
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadGoogleMaps()
      .then((google) => {
        if (cancelled || !el.current) return;
        map.current = new google.maps.Map(el.current, {
          center,
          zoom,
          clickableIcons: false,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: "cooperative",
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
          strokeColor: "#2f5d46",
          strokeOpacity: 0.8,
          fillColor: "#2f5d46",
          fillOpacity: 0.2,
        });
      }
      const m = new google.maps.Marker({ map: map.current, position: { lat: p.lat, lng: p.lng }, title: p.title });
      m.addListener("click", () => pinClickRef.current?.(p.id));
      return m;
    });
  }, [ready, pins]);

  return (
    <div className={`relative overflow-hidden rounded-xl border border-border bg-secondary ${className ?? ""}`}>
      <div ref={el} className="absolute inset-0" />
      {!ready && (
        <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">
          {error ? "Map couldn't load right now." : "Loading map…"}
        </div>
      )}
    </div>
  );
}
