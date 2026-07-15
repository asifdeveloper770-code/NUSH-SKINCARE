import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "HOME", hasDropdown: false },
  { to: "/about", label: "ABOUT", hasDropdown: false },
  { to: "/services", label: "SERVICES", hasDropdown: true },
  { to: "/faqs", label: "FAQS", hasDropdown: false },
  { to: "/reviews", label: "REVIEWS", hasDropdown: false },
  { to: "/contact", label: "CONTACT", hasDropdown: false },
  { to: "/gallery", label: "GALLERY", hasDropdown: false },
  { to: "/shop", label: "BOOK NOW", hasDropdown: true },
] as const;

export function Navbar() {
  const cart = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 bg-white transition-shadow duration-300",
          scrolled ? "shadow-[0_1px_0_0_rgba(0,0,0,0.06)]" : "",
        )}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <span className="grid place-items-center h-11 w-11 rounded-full border border-charcoal/25">
              <span className="font-serif italic text-charcoal text-lg leading-none">NS</span>
            </span>
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="font-serif text-charcoal text-[15px] tracking-[0.32em]">
                NUSH SKINCARE
              </span>
              <span className="text-[9px] tracking-[0.5em] text-charcoal/60 text-center">
                DUBAI
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-[0.15em] text-charcoal">
            {links.slice(0, 7).map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="hover:text-charcoal/60 transition-colors"
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "font-semibold" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={cart.toggle}
              className="relative text-charcoal hover:opacity-70 transition p-2"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cart.count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-charcoal text-ivory text-[10px] rounded-full h-4 min-w-4 px-1 grid place-items-center font-medium">
                  {cart.count}
                </span>
              )}
            </button>
            <Link
              to="/shop"
              className="hidden sm:inline-flex items-center bg-charcoal text-ivory px-6 py-3 text-sm font-medium hover:bg-charcoal/85 transition-colors"
            >
              Book Now
            </Link>
            <button
              className="lg:hidden text-charcoal border border-charcoal/20 h-10 w-10 grid place-items-center"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden bg-white transition-all duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <div className="flex justify-end p-6">
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="h-11 w-11 border border-charcoal/20 grid place-items-center text-charcoal"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
        <nav className="px-8 pt-4 pb-16 flex flex-col">
          {links.map((l) => (
            <Link
              key={`m-${l.label}`}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between border-b border-transparent py-5 text-charcoal text-xl tracking-[0.15em] font-medium"
            >
              <span>{l.label}</span>
              {l.hasDropdown && (
                <span className="h-9 w-9 rounded-full border border-charcoal/20 grid place-items-center">
                  <ChevronDown className="h-4 w-4 text-charcoal/60" strokeWidth={1.5} />
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
