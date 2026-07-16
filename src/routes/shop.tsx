import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import {
  ALL_CATEGORIES,
  ALL_CONCERNS,
  products,
  type Category,
  type Concern,
} from "@/lib/products";
import { Check, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Nush Skincare" },
      {
        name: "description",
        content:
          "Clinical luxury skincare: serums, cleansers, moisturizers, and treatments engineered for glass-like skin.",
      },
      { property: "og:title", content: "Shop — Nush Skincare" },
      { property: "og:description", content: "The full Nush library." },
    ],
  }),
  component: Shop,
});

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

function Shop() {
  const [concerns, setConcerns] = useState<Set<Concern>>(new Set());
  const [categories, setCategories] = useState<Set<Category>>(new Set());
  const [sort, setSort] = useState<Sort>("featured");
  const [mobileFilter, setMobileFilter] = useState(false);

  const list = useMemo(() => {
    let l = products.filter((p) => {
      if (concerns.size && !p.concerns.some((c) => concerns.has(c))) return false;
      if (categories.size && !categories.has(p.category)) return false;
      return true;
    });
    if (sort === "price-asc") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") l = [...l].sort((a, b) => b.price - a.price);
    if (sort === "rating") l = [...l].sort((a, b) => b.rating - a.rating);
    return l;
  }, [concerns, categories, sort]);

  const toggle = <T,>(set: Set<T>, val: T, setter: (s: Set<T>) => void) => {
    const next = new Set(set);
    if (next.has(val)) next.delete(val);
    else next.add(val);
    setter(next);
  };

  return (
    <div>
      <section className="border-b border-charcoal/10 bg-alabaster">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="eyebrow mb-4">The Library</p>
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal max-w-2xl leading-[1.05]">
            Every essential. Nothing more.
          </h1>
          <p className="mt-6 max-w-xl text-charcoal/70">
            A small, considered library — engineered to layer, formulated to last.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-[240px_1fr] gap-12">
          {/* Sidebar */}
          <aside
            className={cn(
              "md:sticky md:top-28 md:self-start",
              mobileFilter ? "fixed inset-0 z-40 bg-ivory p-6 overflow-y-auto md:static md:p-0" : "hidden md:block",
            )}
          >
            <div className="flex justify-between items-center md:hidden mb-8">
              <p className="eyebrow">Filters</p>
              <button onClick={() => setMobileFilter(false)} className="text-sm">Done</button>
            </div>

            <FilterGroup title="Skin Concern">
              {ALL_CONCERNS.map((c) => (
                <FilterItem
                  key={c}
                  label={c}
                  active={concerns.has(c)}
                  onClick={() => toggle(concerns, c, setConcerns)}
                />
              ))}
            </FilterGroup>

            <FilterGroup title="Category">
              {ALL_CATEGORIES.map((c) => (
                <FilterItem
                  key={c}
                  label={c}
                  active={categories.has(c)}
                  onClick={() => toggle(categories, c, setCategories)}
                />
              ))}
            </FilterGroup>

            {(concerns.size > 0 || categories.size > 0) && (
              <button
                onClick={() => {
                  setConcerns(new Set());
                  setCategories(new Set());
                }}
                className="text-xs uppercase tracking-[0.24em] text-taupe hover:text-charcoal"
              >
                Clear all
              </button>
            )}
          </aside>

          <div>
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-charcoal/10">
              <p className="text-sm text-muted-foreground">
                <span className="text-charcoal font-medium">{list.length}</span> products
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setMobileFilter(true)}
                  className="md:hidden inline-flex items-center gap-2 text-sm"
                >
                  <SlidersHorizontal className="h-4 w-4" /> Filter
                </button>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="bg-transparent text-sm border-b border-charcoal/20 py-1 pr-6 focus:outline-none focus:border-charcoal cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="rating">Highest rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {list.length === 0 ? (
              <div className="py-32 text-center">
                <p className="font-serif text-2xl">No matches</p>
                <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
                {list.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <p className="eyebrow mb-4">{title}</p>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function FilterItem({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        className="flex items-center gap-3 text-sm text-charcoal/80 hover:text-charcoal group"
      >
        <span
          className={cn(
            "h-4 w-4 border grid place-items-center transition",
            active ? "bg-charcoal border-charcoal" : "border-charcoal/30 group-hover:border-charcoal",
          )}
        >
          {active && <Check className="h-3 w-3 text-ivory" strokeWidth={3} />}
        </span>
        {label}
      </button>
    </li>
  );
}
