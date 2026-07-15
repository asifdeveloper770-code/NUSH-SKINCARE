import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Mail, Phone } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Nush Skincare" },
      { name: "description", content: "Reach the Nush team in New York and Dubai. Consultations, press, wholesale." },
      { property: "og:title", content: "Contact — Nush Skincare" },
      { property: "og:description", content: "Reach the Nush team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 md:py-32">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <p className="text-[11px] tracking-[0.35em] text-charcoal/70 mb-6">GET IN TOUCH</p>
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal leading-[1.02]">Say hello.</h1>
          <p className="mt-6 text-charcoal/70 leading-relaxed max-w-md">
            Our concierge team responds within one business day. For urgent enquiries please call the atelier nearest you.
          </p>
          <div className="mt-12 space-y-6 text-charcoal">
            <div className="flex gap-4">
              <MapPin className="h-5 w-5 text-taupe shrink-0 mt-1" />
              <div>
                <p className="font-medium">Dubai Atelier</p>
                <p className="text-sm text-charcoal/70">Boulevard Plaza, Downtown Dubai, UAE</p>
              </div>
            </div>
            <div className="flex gap-4">
              <MapPin className="h-5 w-5 text-taupe shrink-0 mt-1" />
              <div>
                <p className="font-medium">New York Atelier</p>
                <p className="text-sm text-charcoal/70">142 Greene Street, SoHo, NY 10012</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="h-5 w-5 text-taupe shrink-0 mt-1" />
              <p className="text-sm">concierge@nush.skin</p>
            </div>
            <div className="flex gap-4">
              <Phone className="h-5 w-5 text-taupe shrink-0 mt-1" />
              <p className="text-sm">+971 4 000 0000 · +1 212 000 0000</p>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="bg-white border border-charcoal/10 p-8 md:p-10 space-y-5"
        >
          <div>
            <label className="text-[11px] tracking-[0.25em] uppercase text-taupe">Name</label>
            <input required className="w-full border-b border-charcoal/20 bg-transparent py-3 outline-none focus:border-charcoal transition" />
          </div>
          <div>
            <label className="text-[11px] tracking-[0.25em] uppercase text-taupe">Email</label>
            <input required type="email" className="w-full border-b border-charcoal/20 bg-transparent py-3 outline-none focus:border-charcoal transition" />
          </div>
          <div>
            <label className="text-[11px] tracking-[0.25em] uppercase text-taupe">Message</label>
            <textarea required rows={5} className="w-full border-b border-charcoal/20 bg-transparent py-3 outline-none focus:border-charcoal transition resize-none" />
          </div>
          <button className="w-full bg-charcoal text-ivory py-4 text-sm font-medium hover:bg-charcoal/85 transition">
            {sent ? "Message sent ✓" : "Send message"}
          </button>
        </form>
      </div>
    </div>
  );
}
