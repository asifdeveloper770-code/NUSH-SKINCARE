import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getProduct, products } from "@/lib/products";
import { useCart, formatPrice } from "@/lib/cart-store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Star, Minus, Plus, Truck, RefreshCw, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }): { product: import("@/lib/products").Product } => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.product;
    return {
      meta: [
        { title: `${p.name} — Nush Skincare` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.name} — Nush Skincare` },
        { property: "og:description", content: p.tagline },
        { property: "og:image", content: p.images[0] },
        { name: "twitter:image", content: p.images[0] },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="py-40 text-center">
      <p className="font-serif text-3xl">Product not found</p>
      <Link to="/shop" className="mt-6 inline-block text-sm uppercase tracking-widest underline">
        Back to shop
      </Link>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: import("@/lib/products").Product };
  const cart = useCart();
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);

  const complete = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 pt-10 pb-24">
        <nav className="text-xs text-muted-foreground mb-8 tracking-wider">
          <Link to="/" className="hover:text-charcoal">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-charcoal">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-charcoal">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-20">
          {/* Gallery */}
          <div className="flex gap-4">
            <div className="hidden md:flex flex-col gap-3 w-20 shrink-0">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square overflow-hidden bg-alabaster border transition ${
                    i === activeImg ? "border-charcoal" : "border-transparent"
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1 relative aspect-[4/5] bg-alabaster overflow-hidden">
              <img
                src={product.images[activeImg]}
                alt={product.name}
                className="h-full w-full object-cover fade-up"
                key={activeImg}
              />
            </div>
          </div>

          {/* Info */}
          <div className="md:sticky md:top-28 md:self-start">
            <p className="eyebrow mb-4">{product.category}</p>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight text-charcoal">
              {product.name}
            </h1>
            <p className="mt-3 text-taupe italic font-serif text-lg">{product.tagline}</p>

            <div className="flex items-center gap-4 mt-6">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i <= Math.round(product.rating) ? "fill-charcoal text-charcoal" : "text-charcoal/20"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} · {product.reviews.toLocaleString()} reviews
              </span>
            </div>

            <div className="mt-8 flex items-baseline gap-3">
              <p className="font-serif text-3xl">{formatPrice(product.price)}</p>
              <p className="text-sm text-muted-foreground">/ {product.size}</p>
            </div>

            <p className="mt-8 text-charcoal/75 leading-relaxed">{product.description}</p>

            {/* Key actives */}
            <div className="mt-8 grid grid-cols-1 gap-2">
              {product.keyActives.map((k) => (
                <div key={k.name} className="flex items-start gap-3 py-3 border-t border-charcoal/10">
                  <Sparkles className="h-4 w-4 text-taupe mt-1 shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="font-medium text-sm text-charcoal">{k.name}</p>
                    <p className="text-sm text-muted-foreground">{k.benefit}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quantity + add */}
            <div className="mt-10 flex gap-3">
              <div className="flex items-center border border-charcoal/20">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="h-14 w-12 grid place-items-center hover:bg-charcoal/5"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="h-14 w-12 grid place-items-center hover:bg-charcoal/5"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => cart.add(product.id, qty)}
                className="flex-1 bg-charcoal text-ivory h-14 text-xs uppercase tracking-[0.24em] hover:bg-charcoal/90 transition"
              >
                Add to ritual · {formatPrice(product.price * qty)}
              </button>
            </div>

            <div className="mt-6 flex gap-6 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Truck className="h-4 w-4" /> Complimentary shipping
              </span>
              <span className="inline-flex items-center gap-2">
                <RefreshCw className="h-4 w-4" /> 30-day returns
              </span>
            </div>

            {/* Accordions */}
            <Accordion type="single" collapsible className="mt-10 border-t border-charcoal/10">
              <AccordionItem value="use" className="border-b border-charcoal/10">
                <AccordionTrigger className="py-5 uppercase text-xs tracking-[0.24em] hover:no-underline">
                  How to Use
                </AccordionTrigger>
                <AccordionContent className="text-sm text-charcoal/75 leading-relaxed">
                  {product.howToUse}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="ing" className="border-b border-charcoal/10">
                <AccordionTrigger className="py-5 uppercase text-xs tracking-[0.24em] hover:no-underline">
                  Full Ingredients
                </AccordionTrigger>
                <AccordionContent className="text-sm text-charcoal/75 leading-relaxed">
                  {product.ingredients.join(", ")}.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="ship" className="border-b border-charcoal/10">
                <AccordionTrigger className="py-5 uppercase text-xs tracking-[0.24em] hover:no-underline">
                  Shipping & Returns
                </AccordionTrigger>
                <AccordionContent className="text-sm text-charcoal/75 leading-relaxed">
                  Complimentary express shipping across UAE and US. 30-day skin trial with full
                  refund if not delighted.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Complete your routine */}
      <section className="bg-alabaster py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="eyebrow mb-4">Complete Your Ritual</p>
              <h2 className="font-serif text-4xl text-charcoal">Curated to layer</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {complete.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
