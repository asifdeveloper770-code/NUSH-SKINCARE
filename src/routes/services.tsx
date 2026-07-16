import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Droplet, Sun, FlaskConical, ShieldCheck, Layers } from "lucide-react";
import hero from "@/assets/nush-clinic-8.jpeg.asset.json";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Nush Skincare" },
      { name: "description", content: "Precision facials, clinical peels, and bespoke skin protocols in New York and Dubai." },
      { property: "og:title", content: "Services — Nush Skincare" },
      { property: "og:description", content: "Precision aesthetic treatments in New York and Dubai." },
    ],
  }),
  component: Services,
});

const SERVICES = [
  { icon: Sparkles, name: "Signature Glass Facial", price: "From $380", desc: "Our house protocol — resurfacing, cold-lift and LED for immediate luminosity." },
  { icon: Droplet, name: "Deep Hydration Ritual", price: "From $280", desc: "Multi-molecular hyaluronic infusion for barrier repair and plumping." },
  { icon: FlaskConical, name: "Clinical Peel", price: "From $420", desc: "Titrated acid systems, dermatologist-supervised, tailored to your indication." },
  { icon: Sun, name: "Brightening Protocol", price: "From $340", desc: "Vitamin C, tranexamic acid and light therapy to even tone and lift pigment." },
  { icon: Layers, name: "Microneedling + PRF", price: "From $650", desc: "Collagen induction with autologous growth factors — firmness and glow." },
  { icon: ShieldCheck, name: "Barrier Restoration", price: "From $240", desc: "Post-procedure calming, ceramide flooding and red-light recovery." },
];

function Services() {
  return (
    <div>
      <section className="relative h-[50vh] min-h-[380px] overflow-hidden">
        <img src={hero.url} alt="Nush treatment room" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
        <div className="relative h-full mx-auto max-w-7xl px-6 lg:px-10 flex items-end pb-16">
          <div className="text-ivory">
            <p className="text-[11px] tracking-[0.35em] mb-4 opacity-80">NEW YORK • DUBAI</p>
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.02]">Services</h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <div key={s.name} className="border border-charcoal/10 bg-white p-8 hover:border-charcoal/30 transition-colors">
              <s.icon className="h-5 w-5 text-taupe" strokeWidth={1.25} />
              <h3 className="font-serif text-2xl mt-4 text-charcoal">{s.name}</h3>
              <p className="text-xs tracking-[0.25em] uppercase text-taupe mt-2">{s.price}</p>
              <p className="text-sm text-charcoal/70 leading-relaxed mt-4">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link to="/shop" className="inline-flex items-center bg-charcoal text-ivory px-8 py-4 text-sm font-medium hover:bg-charcoal/85 transition">
            Book Your Experience
          </Link>
        </div>
      </section>
    </div>
  );
}
