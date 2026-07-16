import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory mt-32">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <h3 className="font-serif text-4xl md:text-5xl leading-tight">
              Rituals from Dubai.
              <br />
              Refined in New York.
            </h3>
            <p className="mt-6 text-ivory/60 max-w-md leading-relaxed">
              Join the Nush Circle for private launches, clinical routines and rituals designed by our
              in-house cosmetic scientists.
            </p>
            <form className="mt-8 flex max-w-md border-b border-ivory/20">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-transparent flex-1 py-3 outline-none placeholder:text-ivory/40 text-sm"
              />
              <button className="text-xs tracking-[0.24em] uppercase py-3 px-4 hover:text-champagne transition">
                Join
              </button>
            </form>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow text-ivory/50 mb-4">Shop</p>
            <ul className="space-y-3 text-sm text-ivory/70">
              <li><Link to="/shop">All Products</Link></li>
              <li><Link to="/shop">Serums</Link></li>
              <li><Link to="/shop">Moisturizers</Link></li>
              <li><Link to="/shop">Cleansers</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow text-ivory/50 mb-4">House</p>
            <ul className="space-y-3 text-sm text-ivory/70">
              <li><Link to="/about">Philosophy</Link></li>
              <li><Link to="/quiz">Skin Consult</Link></li>
              <li><a href="#">Journal</a></li>
              <li><a href="#">Sustainability</a></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow text-ivory/50 mb-4">Ateliers</p>
            <p className="text-sm text-ivory/70 leading-relaxed">
              Dubai · DIFC Gate Village
              <br />
              New York · 27 Mercer, SoHo
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 mt-6 text-sm text-ivory/70 hover:text-champagne transition"
            >
              <Instagram className="h-4 w-4" /> @nush.skin
            </a>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-ivory/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-ivory/40">
          <p>© {new Date().getFullYear()} Nush Skincare. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Shipping</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
