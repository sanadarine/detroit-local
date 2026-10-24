import { ExternalLink, Flame, Landmark, MessageSquareText, Phone, Search, ShieldAlert, Siren, Smartphone, Trash2, Wrench, Zap, HeartHandshake } from "lucide-react";
import { useMemo, useState } from "react";
import { cityServices, serviceCategories, type ServiceCategory } from "@/lib/data";
import { HeartButton } from "@/components/HeartButton";

const catIcons: Record<ServiceCategory, typeof Phone> = {
  "Emergency & safety": ShieldAlert,
  "Trash & recycling": Trash2,
  "Streets & 311": Wrench,
  "Water & power": Zap,
  "Health & help": HeartHandshake,
  "City hall & neighborhoods": Landmark,
};

const quick = [
  { id: "911", icon: Siren, label: "Emergency", value: "911", href: "tel:911", tone: "bg-brick text-brick-foreground" },
  { id: "police-non-emergency", icon: Phone, label: "Police non-emergency", value: "(313) 267-4600", href: "tel:+13132674600", tone: "bg-card" },
  { id: "improve-detroit", icon: Smartphone, label: "Report a problem (311)", value: "Improve Detroit", href: "https://detroitmi.gov/ImproveDetroit", tone: "bg-card" },
  { id: "trash-schedule", icon: Trash2, label: "When's trash day?", value: "Look up pickup", href: "https://detroitmi.gov/webapp/find-your-waste-pickup-schedule", tone: "bg-card" },
] as const;

const tel = (p: string) => (/^\d{3}$/.test(p) ? `tel:${p}` : `tel:+1${p.replace(/\D/g, "")}`);
const sms = (p: string) => `sms:${p.replace(/\D/g, "")}`;

/** Directory of real Detroit city services, numbers and 311-style requests. */
export function CityServices() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<ServiceCategory | null>(null);

  const list = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return cityServices.filter((s) => (!cat || s.category === cat) && words.every((w) => `${s.name} ${s.what} ${s.category}`.toLowerCase().includes(w)));
  }, [q, cat]);

  return (
    <div className="mt-6 animate-rise">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {quick.map((k) => {
          const external = k.href.startsWith("http");
          return (
            <a
              key={k.id}
              href={k.href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`group flex flex-col justify-between gap-3 rounded-2xl p-4 shadow-soft ring-1 ring-border transition-shadow duration-300 ease-out hover:shadow-lift ${k.tone}`}
            >
              <k.icon className="h-6 w-6" />
              <span>
                <span className="block text-xs opacity-80">{k.label}</span>
                <span className="block font-semibold">{k.value}</span>
              </span>
            </a>
          );
        })}
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground"><Flame className="h-3.5 w-3.5 text-brick" />Smell gas? Leave first, call 911, then DTE at (800) 947-5000.</p>

      <div className="mt-6 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-soft">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search services, e.g. pothole, missed trash, water" aria-label="Search city services" className="min-w-0 flex-1 bg-transparent py-1 outline-none placeholder:text-muted-foreground" />
      </div>
      <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
        <button type="button" onClick={() => setCat(null)} className={`shrink-0 rounded-full border px-3 py-1.5 text-sm transition-colors ${!cat ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-secondary"}`}>All</button>
        {serviceCategories.map((c) => {
          const I = catIcons[c];
          return (
            <button key={c} type="button" onClick={() => setCat(cat === c ? null : c)} className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-secondary"}`}>
              <I className="h-4 w-4" />{c}
            </button>
          );
        })}
      </div>

      {serviceCategories
        .filter((c) => list.some((s) => s.category === c))
        .map((c) => {
          const I = catIcons[c];
          return (
            <section key={c} className="mt-8">
              <h2 className="flex items-center gap-2 text-lg font-semibold"><I className="h-5 w-5 text-primary" />{c}</h2>
              <ul className="mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
                {list
                  .filter((s) => s.category === c)
                  .map((s) => (
                    <li key={s.id} id={s.id} className="scroll-mt-24 p-4 target:bg-accent/40 md:p-5">
                      <div className="md:flex md:items-start md:justify-between md:gap-6">
                        <div className="min-w-0">
                          <p className="font-semibold">{s.name}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{s.what}</p>
                          {s.hours && <p className="mt-1 text-xs font-medium text-primary">{s.hours}</p>}
                        </div>
                        <div className="mt-3 flex shrink-0 flex-wrap items-center gap-2 md:mt-0 md:justify-end">
                          <HeartButton kind="service" id={s.id} label={s.name} variant="plain" className="bg-secondary hover:bg-accent" />
                          {s.phone && (
                            <a href={tel(s.phone)} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground transition hover:opacity-90">
                              <Phone className="h-3.5 w-3.5" />{s.phone}{s.phoneNote && <span className="opacity-80">· {s.phoneNote}</span>}
                            </a>
                          )}
                          {s.text && (
                            <a href={sms(s.text.to)} className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3.5 py-1.5 text-sm font-medium transition hover:bg-accent" title={`Text "${s.text.body}" to ${s.text.to}`}>
                              <MessageSquareText className="h-3.5 w-3.5 text-primary" />Text {s.text.to}
                            </a>
                          )}
                          {s.url && (
                            <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3.5 py-1.5 text-sm font-medium transition hover:bg-accent">
                              <ExternalLink className="h-3.5 w-3.5 text-primary" />Website
                            </a>
                          )}
                        </div>
                      </div>
                      {s.text && <p className="mt-2 text-xs text-muted-foreground">Text “{s.text.body.toLowerCase()}” to {s.text.to}.</p>}
                    </li>
                  ))}
              </ul>
            </section>
          );
        })}
      {list.length === 0 && <p className="mt-8 rounded-2xl bg-secondary p-6 text-center text-muted-foreground">No services match. Try “trash”, “water” or “police”, or ask in the forum.</p>}

      <p className="mt-6 text-xs text-muted-foreground">Numbers from detroitmi.gov, DTE Energy and Michigan 211, checked October 2026. Services change, so confirm on the official site.</p>
    </div>
  );
}
