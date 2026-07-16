import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — Nush Skincare" },
      { name: "description", content: "Answers to common questions about Nush treatments, products, shipping, and consultations." },
      { property: "og:title", content: "FAQs — Nush Skincare" },
      { property: "og:description", content: "Everything you need to know about Nush." },
    ],
  }),
  component: Faqs,
});

const FAQS = [
  { q: "Where are Nush clinics located?", a: "Our flagship ateliers are in Downtown Dubai and SoHo, New York, with private consultation rooms in both cities." },
  { q: "Are treatments suitable for sensitive skin?", a: "Every protocol is titrated per client. A consultation identifies your barrier status, indications and goals before any active is introduced." },
  { q: "How do I know which product is right for me?", a: "Begin with our two-minute Skin Consult, or book a virtual consultation with one of our clinicians." },
  { q: "Do you ship internationally?", a: "Yes — complimentary express shipping across the UAE and US, with global delivery available at checkout." },
  { q: "What is your return policy?", a: "Every Nush product is backed by a 30-day risk-free trial. If it doesn't suit you, return it for a full refund." },
  { q: "Are your formulations tested on animals?", a: "Never. Nush is certified cruelty-free and reef-safe end to end." },
  { q: "How soon will I see results?", a: "Most clients report visible luminosity within seven days; clinical endpoints such as tone and firmness respond over 8–12 weeks." },
];

function Faqs() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 md:py-32">
      <p className="text-[11px] tracking-[0.35em] text-charcoal/70 mb-6">NEW YORK • DUBAI</p>
      <h1 className="font-serif text-5xl md:text-6xl text-charcoal leading-[1.02] mb-14">Frequently asked.</h1>
      <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
        {FAQS.map((f, i) => (
          <div key={i}>
            <button
              className="w-full flex items-center justify-between text-left py-6 gap-6"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="font-serif text-xl md:text-2xl text-charcoal">{f.q}</span>
              <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-40 pb-6" : "max-h-0"}`}>
              <p className="text-charcoal/70 leading-relaxed">{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
