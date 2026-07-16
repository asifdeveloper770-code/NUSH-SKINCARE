import { createFileRoute, Link } from "@tanstack/react-router";
<<<<<<< HEAD
import { ArrowRight } from "lucide-react";

import hero from "@/assets/nush-clinic-9.jpeg.asset.json";
import tile1 from "@/assets/nush-clinic-1.jpeg.asset.json";
import tile2 from "@/assets/nush-clinic-3.jpeg.asset.json";
import tile3 from "@/assets/nush-clinic-4.jpeg.asset.json";
import benefits from "@/assets/nush-clinic-6.jpeg.asset.json";
import laser from "@/assets/nush-clinic-2.jpeg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nush Skincare — Advanced Aesthetic Treatments · New York & Dubai" },
      {
        name: "description",
        content:
          "Nush Skincare offers precision facials, chemical peels, laser and injectables in New York & Dubai. Book your bespoke skin experience.",
      },
      { property: "og:title", content: "Nush Skincare — New York & Dubai" },
      { property: "og:description", content: "Advanced aesthetic treatments, tailored to your skin." },
      { property: "og:image", content: hero.url },
      { name: "twitter:image", content: hero.url },
    ],
  }),
  component: Home,
});

const SERVICES_TILES = [
  { title: "INJECTABLES", img: tile1.url, to: "/services" },
  { title: "DERMAPLANING", img: tile2.url, to: "/services" },
  { title: "DEEP CLEANSE WITH LED", img: tile3.url, to: "/services" },
];

function Home() {
  return (
    <div>
      {/* HERO — full-bleed image */}
      <section className="relative">
        <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
          <img
            src={hero.url}
            alt="Nush Skincare — advanced aesthetic treatments"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto max-w-7xl w-full px-6 lg:px-10 pb-14 md:pb-20 text-ivory">
              <p className="text-[11px] tracking-[0.4em] opacity-80 mb-4">
                NEW YORK <span className="mx-2">•</span> DUBAI
              </p>
              <h1 className="font-serif text-5xl md:text-7xl leading-[1.03] max-w-3xl">
                The art of precision skincare.
              </h1>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-3 bg-ivory text-charcoal px-8 py-4 text-xs tracking-[0.28em] uppercase hover:bg-champagne transition-colors"
                >
                  Book Now <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-3 border border-ivory/70 text-ivory px-8 py-4 text-xs tracking-[0.28em] uppercase hover:bg-ivory hover:text-charcoal transition-colors"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Book now stamp */}
        <div className="hidden md:block absolute bottom-6 right-6 h-24 w-24 rounded-full bg-charcoal text-ivory grid place-items-center text-[10px] tracking-[0.3em] uppercase" style={{ animation: "spin 18s linear infinite" }}>
          <div className="text-center leading-tight">
            <div>BOOK</div>
            <div>NOW</div>
            <div className="opacity-70 mt-1">DUBAI</div>
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </section>

      {/* SERVICE TILES */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES_TILES.map((t) => (
            <Link
              key={t.title}
              to={t.to}
              className="relative block aspect-[3/4] overflow-hidden group bg-alabaster"
            >
              <img
                src={t.img}
                alt={t.title}
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-ivory font-serif text-2xl md:text-3xl tracking-[0.05em]">
                  {t.title}
                </h3>
                <span className="mt-2 inline-flex items-center gap-2 text-[10px] tracking-[0.3em] text-ivory/80 uppercase">
                  Discover <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BENEFITS — split black */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-20 md:pb-28">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-[4/5] md:aspect-auto overflow-hidden bg-alabaster">
            <img src={benefits.url} alt="Nush benefits" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="bg-charcoal text-ivory p-10 md:p-16 flex flex-col justify-center">
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              What are the benefits of a facial?
            </h2>
            <p className="mt-8 text-ivory/80 leading-relaxed">
              At Nush Skincare, we offer our clients a variety of options for facials and treatments.
              Our specialized advanced facials combine the power of clinical protocols to deliver
              exactly what your skin needs — from cell turnover and rejuvenation to exfoliation,
              treating broken capillaries, and much more.
            </p>
            <Link
              to="/services"
              className="mt-10 self-start bg-ivory text-charcoal px-8 py-4 text-xs tracking-[0.28em] uppercase inline-flex items-center gap-3 hover:bg-champagne transition-colors"
            >
              More Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* LASER HAIR REMOVAL split */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-20 md:pb-28">
        <div className="grid md:grid-cols-2 bg-alabaster">
          <div className="p-10 md:p-16 flex flex-col justify-center order-2 md:order-1">
            <h2 className="font-serif text-4xl md:text-5xl leading-tight text-charcoal">
              Laser Hair Removal
            </h2>
            <p className="mt-8 text-charcoal/75 leading-relaxed max-w-md">
              At Nush Skincare, we pride ourselves in offering a wide variety of spa treatments —
              ensuring our clients can achieve the safest and best overall minimally-invasive
              aesthetic enhancement possible. One of our most popular and in-demand treatments is
              laser hair removal.
            </p>
            <Link
              to="/services"
              className="mt-10 self-start bg-charcoal text-ivory px-8 py-4 text-xs tracking-[0.28em] uppercase inline-flex items-center gap-3 hover:bg-charcoal/85 transition-colors"
            >
              More Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative aspect-[4/5] md:aspect-auto overflow-hidden order-1 md:order-2">
            <img src={laser.url} alt="Laser hair removal" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* CONTACT / INFO */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-28">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Studio info */}
          <div className="bg-charcoal text-ivory p-10 md:p-14">
            <h3 className="font-serif text-3xl md:text-4xl">NUSH SKINCARE</h3>
            <p className="text-champagne mt-2 font-serif text-lg">Anushka Imran</p>

            <div className="mt-10 space-y-1 text-ivory/85">
              <p>Inside Pavillion Building,</p>
              <p>500 E 77th St, NY 10162</p>
              <p className="font-serif text-3xl mt-4">(646) 984 – 2946</p>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center border border-champagne/60 text-champagne px-6 py-2 text-[11px] tracking-[0.28em] uppercase hover:bg-champagne hover:text-charcoal transition"
              >
                Directions
              </Link>
            </div>

            <div className="mt-10 space-y-1 text-ivory/85">
              <p>DAMAC XL Tower – 1205 – Business Bay</p>
              <p>Dubai – United Arab Emirates</p>
              <p className="font-serif text-3xl mt-4">+971 50 986 3099</p>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center border border-champagne/60 text-champagne px-6 py-2 text-[11px] tracking-[0.28em] uppercase hover:bg-champagne hover:text-charcoal transition"
              >
                Directions
=======
import { ArrowRight, Sparkles, FlaskConical, Leaf, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";

import { Reveal } from "@/hooks/useReveal";
import { Marquee } from "@/components/site/Marquee";
import { featuredProducts } from "@/lib/products";
import  hero  from "../assets/hero.jpeg";

import serumStill from "@/assets/nush-clinic-10.jpeg";
import labImg from "@/assets/nush-clinic-8.jpeg";
import ritualImg from "@/assets/nush-clinic-2.jpeg";
import clinic1 from "@/assets/nush-clinic-1.jpeg";
import clinic3 from "@/assets/nush-clinic-3.jpeg";
import clinic4 from "@/assets/nush-clinic-4.jpeg";
import clinic5 from "@/assets/nush-clinic-5.jpeg";
import clinic6 from "@/assets/nush-clinic-6.jpeg";
import clinic7 from "@//assets/nush-clinic-7.jpeg";

export const Route = createFileRoute("/")({
  component: Home,
});

const PRESS = ["VOGUE", "HARPER'S BAZAAR", "ELLE", "GRAZIA", "VANITY FAIR", "WWD"];

const INSTA = [clinic1, clinic5, clinic7, clinic6, clinic4, clinic3];

function useParallax() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const centre = (r.top + r.height / 2) / window.innerHeight;
        const y = (centre - 0.5) * -40;
        el.style.transform = `translate3d(0, ${y}px, 0) scale(1.08)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return ref;
}

function Home() {
  const featured = featuredProducts();
  const parallaxRef = useParallax();
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  return (
    <div className="overflow-hidden">
      {/* HERO — clinical precision */}
      <section
        className="relative"
        style={{
          background:
            "linear-gradient(115deg, #ffffff 0%, #f4f6f8 45%, #e6ecf1 100%)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, oklch(0.95 0.02 240 / 0.6), transparent 55%), radial-gradient(circle at 80% 70%, oklch(0.92 0.03 220 / 0.5), transparent 60%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-10 md:pt-16 pb-20 md:pb-28 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left copy */}
          <div className="fade-up">
            <p className="text-[11px] md:text-xs tracking-[0.35em] text-charcoal/70 font-medium mb-8">
              NEW YORK <span className="mx-2">•</span> DUBAI
            </p>
            <h1 className="font-serif text-charcoal leading-[1.02] text-[clamp(2.75rem,6.5vw,5.5rem)]">
              The Future of
              <br />
              Skin Precision
            </h1>
            <p className="mt-8 text-lg md:text-xl text-charcoal/70 leading-relaxed max-w-lg">
              Advanced aesthetic treatments with precision
              <br className="hidden sm:block" />
              in New York &amp; Dubai
            </p>
            <p className="mt-6 text-base text-charcoal/80">
              Powered by the <span className="font-semibold text-charcoal">Nush Precision Method</span>
            </p>
            <div className="mt-10">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-3 bg-charcoal text-ivory px-8 py-4 text-sm font-medium hover:bg-charcoal/85 transition-colors"
              >
                Book Your Experience
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
>>>>>>> ee63e95507fe3b88848e08835391dea3edb7b1f6
              </Link>
            </div>
          </div>

<<<<<<< HEAD
          {/* Contact form */}
          <div className="bg-white border border-charcoal/10 p-10 md:p-14">
            <h3 className="font-serif text-3xl md:text-4xl text-charcoal">Contact Form</h3>
            <form
              className="mt-8 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you — we'll be in touch shortly.");
              }}
            >
              {[
                { name: "name", ph: "Your Name", type: "text" },
                { name: "email", ph: "Your Email", type: "email" },
                { name: "phone", ph: "Your Phone", type: "tel" },
                { name: "subject", ph: "Subject", type: "text" },
              ].map((f) => (
                <input
                  key={f.name}
                  type={f.type}
                  name={f.name}
                  placeholder={f.ph}
                  className="w-full border border-charcoal/20 bg-white px-4 py-3.5 text-sm text-charcoal placeholder:text-charcoal/50 focus:outline-none focus:border-charcoal transition"
                />
              ))}
              <textarea
                name="message"
                placeholder="Your Message for Us"
                rows={5}
                className="w-full border border-charcoal/20 bg-white px-4 py-3.5 text-sm text-charcoal placeholder:text-charcoal/50 focus:outline-none focus:border-charcoal transition"
              />
              <button
                type="submit"
                className="bg-champagne text-charcoal px-10 py-3.5 text-xs tracking-[0.32em] uppercase hover:bg-charcoal hover:text-ivory transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        </div>
=======
          {/* Right image + HUD overlay */}
          <div className="relative">
            <div
              className="relative aspect-[5/6] md:aspect-[6/7] overflow-hidden will-change-transform"
              onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setMouseTilt({
                  x: ((e.clientX - r.left) / r.width - 0.5) * 4,
                  y: ((e.clientY - r.top) / r.height - 0.5) * -4,
                });
              }}
              onPointerLeave={() => setMouseTilt({ x: 0, y: 0 })}
              style={{
                transform: `perspective(1400px) rotateY(${mouseTilt.x}deg) rotateX(${mouseTilt.y}deg)`,
                transition: "transform 500ms cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <img
                src={hero}
                alt="Clinical skin precision"
                className="h-full w-full object-cover"
              />
              {/* HUD scanner overlay */}
              <svg
                className="absolute inset-0 h-full w-full text-white/80 pointer-events-none mix-blend-screen"
                viewBox="0 0 400 480"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.6"
              >
                <g style={{ animation: "hudFloat 6s ease-in-out infinite" }}>
                  <polygon points="230,120 340,150 340,300 230,330" opacity="0.55" />
                  <polyline points="240,150 320,170 320,200 260,210" opacity="0.6" />
                  <polyline points="240,240 330,255 320,285 250,290" opacity="0.5" />
                  <circle cx="285" cy="225" r="42" opacity="0.45" />
                  <circle cx="285" cy="225" r="26" opacity="0.6" />
                  <line x1="285" y1="183" x2="285" y2="267" opacity="0.4" />
                  <line x1="243" y1="225" x2="327" y2="225" opacity="0.4" />
                  <text x="245" y="140" fill="currentColor" stroke="none" fontSize="7" letterSpacing="2">
                    EYES SCANNER
                  </text>
                  <text x="245" y="315" fill="currentColor" stroke="none" fontSize="6" letterSpacing="1.5">
                    PRECISION · 99.4%
                  </text>
                </g>
                <g opacity="0.35">
                  <polygon points="60,90 170,110 170,190 60,180" />
                  <polyline points="70,120 150,130 150,160 80,155" />
                </g>
                {/* scan line */}
                <line
                  x1="0"
                  y1="0"
                  x2="400"
                  y2="0"
                  stroke="white"
                  strokeWidth="0.8"
                  opacity="0.7"
                  style={{ animation: "scanLine 4s linear infinite" }}
                />
              </svg>
              <style>{`
                @keyframes hudFloat { 0%,100%{ transform: translateY(0);} 50%{ transform: translateY(-4px);} }
                @keyframes scanLine { 0%{ transform: translateY(0); opacity:0;} 10%{ opacity:0.7;} 90%{ opacity:0.7;} 100%{ transform: translateY(480px); opacity:0;} }
              `}</style>
            </div>
          </div>
        </div>

        {/* Sub-hero strip */}
        <div className="relative border-t border-charcoal/10 bg-white/60 backdrop-blur">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 py-8 text-center">
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-charcoal text-base md:text-lg">
              <span>Medical Aesthetics</span>
              <span className="text-charcoal/30">|</span>
              <span>Advanced Skin Technology</span>
              <span className="text-charcoal/30">|</span>
              <span>Precision Treatments</span>
            </div>
            <p className="mt-3 text-[11px] tracking-[0.4em] text-charcoal/60">
              NEW YORK <span className="mx-2">•</span> DUBAI
            </p>
          </div>
        </div>
      </section>


      {/* Marquee band */}
      <section className="bg-charcoal text-ivory border-y border-charcoal/20">
        <Marquee items={["Clinical Luxury", "Barrier-First", "Cold-Processed", "Made in Dubai · New York"]} speed={35} />
      </section>

      {/* Press strip */}
      <div className="border-b border-charcoal/10 bg-alabaster">
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-wrap items-center justify-between gap-8 opacity-50">
          {PRESS.map((p) => (
            <span key={p} className="font-serif text-lg md:text-xl tracking-[0.2em] text-charcoal">
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* PHILOSOPHY */}
      <section className="mx-auto max-w-7xl px-6 py-28 md:py-40">
        <div className="grid md:grid-cols-12 gap-16 items-start">
          <Reveal className="md:col-span-4">
            <p className="eyebrow mb-6">Our Philosophy</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] text-charcoal">
              Clinical minimalism, in service of skin.
            </h2>
          </Reveal>
          <Reveal className="md:col-span-7 md:col-start-6" delay={150}>
            <p className="text-lg leading-relaxed text-charcoal/75">
              We formulate at the intersection of dermatology and desire — every gesture measured,
              every molecule chosen. Nush is a rebuttal to noise: a small library of essentials,
              engineered to a single standard.
            </p>
            <div className="mt-14 grid sm:grid-cols-3 gap-10">
              {[
                { icon: FlaskConical, t: "Clinical proof", d: "Every SKU dermatologist-tested against real endpoints." },
                { icon: Leaf, t: "Considered", d: "Cold-processed actives, reef-safe, cruelty-free." },
                { icon: ShieldCheck, t: "Barrier-first", d: "Nothing that compromises the skin barrier. Ever." },
              ].map((f, i) => (
                <Reveal key={f.t} delay={200 + i * 120}>
                  <f.icon className="h-5 w-5 text-taupe" strokeWidth={1.25} />
                  <p className="font-serif text-xl mt-4">{f.t}</p>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.d}</p>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FULL-BLEED EDITORIAL — parallax */}
      <section className="relative h-[80vh] md:h-screen overflow-hidden">
        <div ref={parallaxRef} className="absolute inset-0 will-change-transform">
          <img src={labImg} alt="Nush atelier" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-7xl w-full px-6 pb-16 md:pb-24 text-ivory">
            <Reveal>
              <p className="eyebrow text-ivory/70 mb-4">The Atelier</p>
              <h2 className="font-serif text-5xl md:text-7xl max-w-3xl leading-[1.02]">
                Where clinical precision meets desert light.
              </h2>
              <Link to="/about" className="inline-flex items-center gap-3 mt-8 text-xs uppercase tracking-[0.24em] border-b border-ivory/40 pb-2 hover:border-ivory transition">
                Enter our world <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FEATURED SLIDER */}
      <section className="py-24 bg-alabaster">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between mb-12">
            <Reveal>
              <p className="eyebrow mb-4">The Edit</p>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal">Bestsellers, quietly.</h2>
            </Reveal>
            <Link
              to="/shop"
              className="hidden md:inline-flex items-center gap-2 text-sm tracking-widest uppercase text-charcoal hover:text-taupe group"
            >
              All products <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </Link>
          </div>
        </div>
        <div className="mx-auto max-w-7xl overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 px-6 pb-6 snap-x snap-mandatory">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 80} className="w-[280px] md:w-[340px] shrink-0 snap-start">
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SPLIT: PRODUCT STILL + INGREDIENT STORY */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-champagne/30 group">
              <img
                src={serumStill}
                alt="Nush serum bottle"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 glass px-3 py-1.5 text-[11px] uppercase tracking-[0.2em]">
                Bestseller
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="eyebrow mb-6">Molecule 01</p>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.02] text-charcoal">
              A single drop, engineered to a decimal.
            </h2>
            <p className="mt-8 text-charcoal/70 leading-relaxed max-w-lg">
              Every Nush serum is titrated to the milligram. Ten percent polyhydroxy acid.
              Five percent niacinamide. Zero fragrance. Everything you need — and nothing you don't.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[
                { pct: "10%", label: "PHA" },
                { pct: "5%", label: "Niacinamide" },
                { pct: "0", label: "Fragrance" },
              ].map((s) => (
                <div key={s.label} className="border-t border-charcoal/15 pt-4">
                  <p className="font-serif text-3xl text-charcoal">{s.pct}</p>
                  <p className="text-[10px] uppercase tracking-widest text-taupe mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* EDITORIAL CONSULT CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <Reveal className="relative aspect-[4/5] overflow-hidden bg-champagne/30 group">
            <img
              src={ritualImg}
              alt="Skincare ritual"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
            />
          </Reveal>
          <Reveal delay={150} className="flex flex-col justify-center bg-charcoal text-ivory p-10 md:p-16 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-champagne/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-taupe/20 blur-3xl" />
            <div className="relative">
              <p className="eyebrow text-ivory/50 mb-6">The Consult</p>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                Two minutes to a routine engineered around you.
              </h2>
              <p className="mt-6 text-ivory/70 leading-relaxed max-w-md">
                Answer nine considered questions. Receive a clinician-approved ritual, hand-selected
                from the Nush library.
              </p>
              <Link
                to="/quiz"
                className="mt-10 self-start bg-ivory text-charcoal px-8 py-4 text-xs tracking-[0.24em] uppercase inline-flex items-center gap-3 hover:bg-champagne transition group"
              >
                Begin the consult <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal className="text-center mb-12">
          <p className="eyebrow mb-4">@nush.skin</p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal">In your feed</h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {INSTA.map((src, i) => (
            <Reveal key={i} delay={i * 60}>
              <a href="#" className="relative aspect-square overflow-hidden bg-alabaster group block">
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1000ms] group-hover:scale-125"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-500 grid place-items-center">
                  <Sparkles className="h-5 w-5 text-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
>>>>>>> ee63e95507fe3b88848e08835391dea3edb7b1f6
      </section>
    </div>
  );
}
