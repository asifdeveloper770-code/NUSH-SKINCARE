import { Link } from "@tanstack/react-router";
import { Star, Plus } from "lucide-react";
import { useCart, formatPrice } from "@/lib/cart-store";
import type { Product } from "@/lib/products";
import { TiltCard } from "./TiltCard";

export function ProductCard({ product }: { product: Product }) {
  const cart = useCart();
  const secondary = product.images[1] ?? product.images[0];

  return (
    <div className="group relative">
      <TiltCard>
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className="block relative overflow-hidden bg-alabaster aspect-[4/5]"
        >
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-all duration-[900ms] group-hover:scale-105 group-hover:opacity-0"
          />
          <img
            src={secondary}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 scale-110 transition-all duration-[900ms] group-hover:opacity-100 group-hover:scale-100"
          />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-charcoal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <button
            onClick={(e) => {
              e.preventDefault();
              cart.add(product.id);
            }}
            className="absolute bottom-4 right-4 h-11 w-11 rounded-full bg-ivory text-charcoal grid place-items-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl hover:bg-charcoal hover:text-ivory hover:scale-110"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="h-4 w-4" />
          </button>
        </Link>
      </TiltCard>
      <div className="pt-5 flex justify-between gap-4">
        <div className="min-w-0">
          <p className="eyebrow mb-1">{product.category}</p>
          <Link to="/product/$slug" params={{ slug: product.slug }}>
            <h3 className="font-serif text-xl leading-tight text-charcoal group-hover:opacity-70 transition">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground mt-1">{product.tagline}</p>
          <div className="flex items-center gap-1.5 mt-2">
            <Star className="h-3 w-3 fill-charcoal text-charcoal" />
            <span className="text-xs text-charcoal/70">
              {product.rating} · {product.reviews.toLocaleString()}
            </span>
          </div>
        </div>
        <p className="font-serif text-lg text-charcoal shrink-0">{formatPrice(product.price)}</p>
      </div>
    </div>
  );
}
