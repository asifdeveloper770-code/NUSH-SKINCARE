import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu, X, ChevronDown, Phone, Instagram, Music2 } from "lucide-react";
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
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Promo bar */}
      <div className="bg-alabaster border-b border-charcoal/10 text-center py-2.5 text-[11px] tracking-[0.28em] text-charcoal">
        NOW OFFERING 15% FOR NEW CLIENTS!
      </div>

      <header className="sticky top-0 z-40 bg-white border-b border-charcoal/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 h-24 flex items-center justify-between gap-6">
          {/* Logo left */}
          <Link to="/" className="flex flex-col leading-tight shrink-0">
            <span className="font-serif text-charcoal text-lg md:text-2xl tracking-[0.32em]">
              NUSH SKINCARE
            </span>
            <span className="text-[10px] tracking-[0.55em] text-charcoal/60 mt-1">
              NEW YORK
            </span>
          </Link>

          {/* Center nav */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] tracking-[0.18em] text-charcoal">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="inline-flex items-center gap-1 hover:text-taupe transition-colors"
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-taupe" }}
              >
                {l.label}
                {l.hasDropdown && <ChevronDown className="h-3 w-3" strokeWidth={2} />}
              </Link>
            ))}
          </nav>

          {/* Right socials + cart */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1.5">
              <IconLink href="tel:6469842946"><Phone className="h-4 w-4" /></IconLink>
              <IconLink href="https://instagram.com/nushskincare"><Instagram className="h-4 w-4" /></IconLink>
              <IconLink href="#"><Music2 className="h-4 w-4" /></IconLink>
            </div>
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
              className="flex items-center justify-between border-b border-charcoal/10 py-5 text-charcoal text-lg tracking-[0.2em] font-medium"
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

function IconLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="h-9 w-9 grid place-items-center border border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-ivory transition-colors"
    >
      {children}
    </a>
  );
}
