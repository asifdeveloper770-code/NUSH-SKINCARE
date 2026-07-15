import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Nush Skincare" },
      { name: "description", content: "Client stories from the Nush community across Dubai, New York and beyond." },
      { property: "og:title", content: "Reviews — Nush Skincare" },
      { property: "og:description", content: "Real results from the Nush ritual." },
    ],
  }),
  component: Reviews,
});

const REVIEWS = [
  { name: "Layla A.", city: "Dubai", body: "The Glass Skin Serum transformed my complexion in three weeks. Nothing else compares.", rating: 5 },
  { name: "Priya R.", city: "New York", body: "Finally a clinical brand that respects sensitive skin. My barrier has never felt this calm.", rating: 5 },
  { name: "Sara K.", city: "Abu Dhabi", body: "The consult was so precise. Every product they recommended earned its place in my ritual.", rating: 5 },
  { name: "Emma L.", city: "Brooklyn", body: "Ten minutes a day and my skin looks like I've had a facial every week. Worth every dirham.", rating: 5 },
  { name: "Noor H.", city: "Dubai Marina", body: "Their peel is the most sophisticated in-office treatment I've had. Zero downtime.", rating: 5 },
  { name: "Julia M.", city: "Manhattan", body: "I stopped counting the compliments after the first month. Restrained, effective, luxurious.", rating: 5 },
];

function Reviews() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 md:py-32">
      <div className="max-w-2xl mb-16">
        <p className="text-[11px] tracking-[0.35em] text-charcoal/70 mb-6">CLIENT STORIES</p>
        <h1 className="font-serif text-5xl md:text-6xl text-charcoal leading-[1.02]">The Nush community.</h1>
        <div className="flex items-center gap-2 mt-6">
          {[0,1,2,3,4].map(i => <Star key={i} className="h-5 w-5 fill-charcoal text-charcoal" />)}
          <span className="text-sm text-charcoal/70 ml-2">4.9 average · 2,400+ reviews</span>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REVIEWS.map((r, i) => (
          <div key={i} className="border border-charcoal/10 p-8 bg-white">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: r.rating }).map((_, s) => (
                <Star key={s} className="h-4 w-4 fill-charcoal text-charcoal" />
              ))}
            </div>
            <p className="font-serif text-lg text-charcoal leading-relaxed">"{r.body}"</p>
            <p className="text-xs tracking-[0.25em] uppercase text-taupe mt-6">
              {r.name} · {r.city}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
