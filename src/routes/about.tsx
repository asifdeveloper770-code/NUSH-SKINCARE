import { createFileRoute } from "@tanstack/react-router";
import { Droplet, FlaskRound, Sparkles, Layers, Sun, Wind } from "lucide-react";
import aboutHero from "@/assets/nush-clinic-6.jpeg.asset.json";
import aboutPortrait from "@/assets/nush-clinic-4.jpeg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Philosophy — Nush Skincare" },
      {
        name: "description",
        content:
          "Nush Skincare is clinical luxury from Dubai and New York — rituals engineered by cosmetic scientists.",
      },
      { property: "og:title", content: "Philosophy — Nush Skincare" },
      { property: "og:description", content: "Clinical science, luxury restraint." },
    ],
  }),
  component: About,
});

const INGREDIENTS = [
  { icon: Droplet, name: "Hyaluronic Acid", desc: "Multi-weight molecules hydrate at five depths of the epidermis." },
  { icon: Sparkles, name: "Niacinamide", desc: "Refines pores, balances sebum and evens tone." },
  { icon: Layers, name: "Ceramides", desc: "Reinforce the barrier lipids that lock moisture in." },
  { icon: FlaskRound, name: "Peptides", desc: "Signal molecules that instruct firmer, denser skin over time." },
  { icon: Sun, name: "Vitamin C", desc: "Stabilised tetrahexyldecyl ascorbate for luminosity and defence." },
  { icon: Wind, name: "PHA", desc: "The gentlest hydroxy acid — resurfaces without irritation." },
];

function About() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-40">
        <div className="max-w-3xl">
          <p className="eyebrow mb-6">The House</p>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.02] text-charcoal">
            Founded on a quiet obsession with <em className="italic text-taupe">less</em>.
          </h1>
        </div>
      </section>

      <section className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden mx-6 md:mx-12">
        <img
          src={aboutHero.url}
          alt="Clinical laboratory"
          className="h-full w-full object-cover"
        />
      </section>

      <section className="mx-auto max-w-4xl px-6 py-28">
        <div className="space-y-8 text-lg leading-relaxed text-charcoal/80">
          <p className="text-2xl md:text-3xl font-serif text-charcoal leading-snug">
            Nush was born in a laboratory between Dubai and New York — two cities of extremes, two
            climates that punish the skin, two aesthetic vocabularies we speak fluently.
          </p>
          <p>
            Our chief formulator, a French cosmetic chemist with two decades in prestige
            dermatology, believed the industry had confused abundance with efficacy. So we set a
            constraint: build the smallest possible library that could resolve the greatest range
            of concerns. Cold-processed. Preservative-minimal. Clinically instrumented.
          </p>
          <p>
            Every Nush formulation is measured against a single benchmark — a lit-from-within,
            glass-like finish. If a product cannot demonstrably contribute, it does not exist.
          </p>
        </div>
      </section>

      {/* Key ingredients */}
      <section className="bg-alabaster py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl mb-16">
            <p className="eyebrow mb-4">The Library of Actives</p>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
              Six molecules. Everything you need.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-charcoal/10 border border-charcoal/10">
            {INGREDIENTS.map((ing) => (
              <div
                key={ing.name}
                className="bg-ivory p-10 hover:bg-champagne/30 transition group cursor-default"
              >
                <ing.icon className="h-8 w-8 text-taupe group-hover:text-charcoal transition" strokeWidth={1.25} />
                <p className="font-serif text-2xl mt-6">{ing.name}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{ing.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-32 grid md:grid-cols-2 gap-16 items-center">
        <div className="aspect-[4/5] overflow-hidden bg-champagne/30">
          <img
            src={aboutPortrait.url}
            alt="Founder portrait"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="eyebrow mb-4">A note from the atelier</p>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight text-charcoal">
            "We are not in the business of hope. We are in the business of skin."
          </h2>
          <p className="mt-8 text-charcoal/70 leading-relaxed">
            Our promise is quiet. Formulas that perform. Rituals that respect your time. A house
            that stays exactly the size it needs to be, and no bigger.
          </p>
          <p className="mt-8 font-serif text-lg italic text-taupe">— The Nush Atelier</p>
        </div>
      </section>
    </div>
  );
}
