import { createFileRoute } from "@tanstack/react-router";
import c1 from "@/assets/nush-clinic-1.jpeg.asset.json";
import c2 from "@/assets/nush-clinic-2.jpeg.asset.json";
import c3 from "@/assets/nush-clinic-3.jpeg.asset.json";
import c4 from "@/assets/nush-clinic-4.jpeg.asset.json";
import c5 from "@/assets/nush-clinic-5.jpeg.asset.json";
import c6 from "@/assets/nush-clinic-6.jpeg.asset.json";
import c7 from "@/assets/nush-clinic-7.jpeg.asset.json";
import c8 from "@/assets/nush-clinic-8.jpeg.asset.json";
import c9 from "@/assets/nush-clinic-9.jpeg.asset.json";
import c10 from "@/assets/nush-clinic-10.jpeg.asset.json";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Nush Skincare" },
      { name: "description", content: "Inside the Nush ateliers — treatments, textures, and rituals in Dubai and New York." },
      { property: "og:title", content: "Gallery — Nush Skincare" },
      { property: "og:description", content: "A visual archive of the Nush world." },
    ],
  }),
  component: Gallery,
});

const IMAGES = [c9, c8, c6, c4, c1, c3, c5, c7, c2, c10];

function Gallery() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 md:py-32">
      <div className="max-w-2xl mb-14">
        <p className="text-[11px] tracking-[0.35em] text-charcoal/70 mb-6">THE ARCHIVE</p>
        <h1 className="font-serif text-5xl md:text-6xl text-charcoal leading-[1.02]">Gallery.</h1>
        <p className="mt-6 text-charcoal/70">Moments from the ateliers in Dubai and New York.</p>
      </div>
      <div className="columns-2 md:columns-3 gap-3 md:gap-4 [column-fill:_balance]">
        {IMAGES.map((img, i) => (
          <a
            key={i}
            href={img.url}
            target="_blank"
            rel="noreferrer"
            className="mb-3 md:mb-4 block overflow-hidden bg-alabaster group"
          >
            <img
              src={img.url}
              alt=""
              loading="lazy"
              className="w-full h-auto object-cover transition-transform duration-[900ms] group-hover:scale-105"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
