import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "./products";

export interface CartLine {
  productId: string;
  qty: number;
}

interface CartCtx {
  lines: CartLine[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  add: (productId: string, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  detailed: { line: CartLine; product: Product }[];
}

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("nush-cart");
      if (raw) setLines(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("nush-cart", JSON.stringify(lines));
  }, [lines, hydrated]);

  const detailed = useMemo(
    () =>
      lines
        .map((line) => {
          const product = products.find((p) => p.id === line.productId);
          return product ? { line, product } : null;
        })
        .filter((x): x is { line: CartLine; product: Product } => !!x),
    [lines],
  );

  const value: CartCtx = {
    lines,
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((v) => !v),
    add: (productId, qty = 1) => {
      setLines((prev) => {
        const found = prev.find((l) => l.productId === productId);
        if (found)
          return prev.map((l) =>
            l.productId === productId ? { ...l, qty: l.qty + qty } : l,
          );
        return [...prev, { productId, qty }];
      });
      setIsOpen(true);
    },
    remove: (productId) =>
      setLines((prev) => prev.filter((l) => l.productId !== productId)),
    setQty: (productId, qty) =>
      setLines((prev) =>
        qty <= 0
          ? prev.filter((l) => l.productId !== productId)
          : prev.map((l) => (l.productId === productId ? { ...l, qty } : l)),
      ),
    clear: () => setLines([]),
    count: lines.reduce((s, l) => s + l.qty, 0),
    subtotal: detailed.reduce((s, d) => s + d.product.price * d.line.qty, 0),
    detailed,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export const formatPrice = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
