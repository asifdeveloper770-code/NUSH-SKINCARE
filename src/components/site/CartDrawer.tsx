import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart, formatPrice } from "@/lib/cart-store";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const cart = useCart();

  return (
    <Sheet open={cart.isOpen} onOpenChange={(v) => (v ? cart.open() : cart.close())}>
      <SheetContent className="w-full sm:max-w-md bg-ivory border-l border-charcoal/10 flex flex-col p-0">
        <SheetHeader className="p-6 border-b border-charcoal/10">
          <SheetTitle className="font-serif text-2xl text-charcoal flex items-center justify-between">
            Your Ritual
            <span className="text-xs eyebrow">{cart.count} items</span>
          </SheetTitle>
        </SheetHeader>

        {cart.detailed.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center px-8">
            <div className="h-20 w-20 rounded-full bg-champagne/30 grid place-items-center">
              <ShoppingBag className="h-8 w-8 text-charcoal/60" />
            </div>
            <div>
              <p className="font-serif text-xl">Your cart awaits</p>
              <p className="text-sm text-muted-foreground mt-2">
                Curate your ritual — begin with our bestsellers.
              </p>
            </div>
            <Button asChild onClick={cart.close} className="bg-charcoal hover:bg-charcoal/90 text-ivory rounded-none px-8">
              <Link to="/shop">Explore the Edit</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.detailed.map(({ product, line }) => (
                <div key={product.id} className="flex gap-4">
                  <Link
                    to="/product/$slug"
                    params={{ slug: product.slug }}
                    onClick={cart.close}
                    className="h-24 w-24 shrink-0 bg-alabaster overflow-hidden"
                  >
                    <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-serif text-lg leading-tight truncate">{product.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{product.size}</p>
                      </div>
                      <button
                        onClick={() => cart.remove(product.id)}
                        className="text-charcoal/40 hover:text-charcoal shrink-0"
                        aria-label="Remove"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex justify-between items-end">
                      <div className="flex items-center border border-charcoal/15">
                        <button
                          onClick={() => cart.setQty(product.id, line.qty - 1)}
                          className="h-8 w-8 grid place-items-center hover:bg-charcoal/5"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{line.qty}</span>
                        <button
                          onClick={() => cart.setQty(product.id, line.qty + 1)}
                          className="h-8 w-8 grid place-items-center hover:bg-charcoal/5"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="text-sm font-medium">{formatPrice(product.price * line.qty)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-charcoal/10 p-6 space-y-4 bg-alabaster">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatPrice(cart.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-champagne">Complimentary</span>
              </div>
              <div className="flex justify-between text-lg font-serif border-t border-charcoal/10 pt-4">
                <span>Total</span>
                <span>{formatPrice(cart.subtotal)}</span>
              </div>
              <Button asChild onClick={cart.close} className="w-full bg-charcoal hover:bg-charcoal/90 text-ivory rounded-none h-12 tracking-[0.2em] text-xs uppercase">
                <Link to="/checkout">Secure Checkout</Link>
              </Button>
              <p className="text-[11px] text-center text-muted-foreground">
                Complimentary samples with every order
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
