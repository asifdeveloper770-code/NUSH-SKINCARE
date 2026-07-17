import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import hero from "@/assets/nush-clinic-9.jpeg";
import tile1 from "@/assets/nush-clinic-1.jpeg";
import tile2 from "@/assets/nush-clinic-3.jpeg";
import tile3 from "@/assets/nush-clinic-4.jpeg";
import benefits from "@/assets/nush-clinic-6.jpeg";
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
      { property: "og:image", content: hero },
      { name: "twitter:image", content: hero },
    ],
  }),
  component: Home,
});

const SERVICES_TILES = [
  { title: "INJECTABLES", img: tile1, to: "/services" },
  { title: "DERMAPLANING", img: tile2, to: "/services" },
  { title: "DEEP CLEANSE WITH LED", img: tile3, to: "/services" },
];

function Home() {
  return (
    <div>
      {/* HERO — full-bleed image */}
      <section className="relative">
        <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
          <img
            src={hero}
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
            <img src={benefits} alt="Nush benefits" className="absolute inset-0 h-full w-full object-cover" />
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
            <img src={laser} alt="Laser hair removal" className="absolute inset-0 h-full w-full object-cover" />
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
              </Link>
            </div>
          </div>

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
      </section>
    </div>
  );
}
