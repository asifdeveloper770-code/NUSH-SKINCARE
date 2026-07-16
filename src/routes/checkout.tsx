import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart, formatPrice } from "@/lib/cart-store";
import { Check, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout — Nush Skincare" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const STEPS = ["Shipping", "Billing", "Payment"] as const;

function Checkout() {
  const cart = useCart();
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);

  if (placed) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center fade-up">
        <div className="mx-auto h-16 w-16 rounded-full bg-champagne grid place-items-center">
          <Check className="h-6 w-6 text-charcoal" />
        </div>
        <p className="eyebrow mt-8 mb-4">Order Confirmed</p>
        <h1 className="font-serif text-5xl text-charcoal">Thank you.</h1>
        <p className="mt-6 text-charcoal/70">
          Your ritual is being prepared by our atelier. A confirmation has been sent to your inbox.
        </p>
        <Link
          to="/shop"
          className="mt-10 inline-block bg-charcoal text-ivory px-8 py-4 text-xs uppercase tracking-[0.24em] hover:bg-charcoal/90"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  if (cart.detailed.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <p className="eyebrow mb-4">Cart empty</p>
        <h1 className="font-serif text-4xl">Nothing to check out.</h1>
        <Link
          to="/shop"
          className="mt-8 inline-block bg-charcoal text-ivory px-8 py-4 text-xs uppercase tracking-[0.24em]"
        >
          Explore the edit
        </Link>
      </div>
    );
  }

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else {
      setPlaced(true);
      cart.clear();
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
      <div className="grid lg:grid-cols-[1fr_420px] gap-16">
        {/* Form side */}
        <div>
          <p className="eyebrow mb-4">Secure Checkout</p>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-10">
            Complete your order
          </h1>

          {/* Steps */}
          <div className="flex items-center gap-4 mb-12">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-4 flex-1 last:flex-none">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "h-8 w-8 rounded-full grid place-items-center text-xs border transition",
                      i < step && "bg-charcoal border-charcoal text-ivory",
                      i === step && "border-charcoal text-charcoal",
                      i > step && "border-charcoal/20 text-charcoal/40",
                    )}
                  >
                    {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                  </div>
                  <span
                    className={cn(
                      "text-xs uppercase tracking-[0.24em] hidden md:inline",
                      i === step ? "text-charcoal" : "text-charcoal/40",
                    )}
                  >
                    {s}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-px",
                      i < step ? "bg-charcoal" : "bg-charcoal/10",
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              next();
            }}
            className="space-y-6"
          >
            {step === 0 && <ShippingForm />}
            {step === 1 && <BillingForm />}
            {step === 2 && <PaymentForm />}

            <div className="pt-8 flex justify-between items-center">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em]"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              ) : (
                <Link to="/shop" className="text-xs uppercase tracking-[0.24em] text-taupe">
                  Continue shopping
                </Link>
              )}
              <button
                type="submit"
                className="inline-flex items-center gap-3 bg-charcoal text-ivory px-8 py-4 text-xs uppercase tracking-[0.24em] hover:bg-charcoal/90"
              >
                {step === STEPS.length - 1 ? "Place order" : "Continue"} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start bg-alabaster p-8 md:p-10">
          <p className="eyebrow mb-6">Order Summary</p>
          <div className="space-y-5 max-h-80 overflow-y-auto pr-2">
            {cart.detailed.map(({ product, line }) => (
              <div key={product.id} className="flex gap-4">
                <div className="relative h-20 w-20 bg-ivory shrink-0 overflow-hidden">
                  <img src={product.images[0]} alt="" className="h-full w-full object-cover" />
                  <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-charcoal text-ivory text-[10px] grid place-items-center">
                    {line.qty}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-base leading-tight">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.size}</p>
                </div>
                <p className="text-sm">{formatPrice(product.price * line.qty)}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-charcoal/10 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(cart.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-champagne">Complimentary</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>{formatPrice(cart.subtotal * 0.05)}</span>
            </div>
            <div className="flex justify-between font-serif text-xl pt-3 border-t border-charcoal/10 mt-3">
              <span>Total</span>
              <span>{formatPrice(cart.subtotal * 1.05)}</span>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-[11px] text-muted-foreground uppercase tracking-widest">
            <Lock className="h-3 w-3" /> Encrypted · Secure
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.2em] text-taupe">{label}</span>
      <input
        {...props}
        className="mt-2 w-full bg-transparent border-b border-charcoal/20 py-3 focus:outline-none focus:border-charcoal transition"
      />
    </label>
  );
}

function ShippingForm() {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <Field label="Email" type="email" required placeholder="you@atelier.com" />
      <Field label="Phone" type="tel" required placeholder="+971 · +1" />
      <Field label="First Name" required />
      <Field label="Last Name" required />
      <div className="sm:col-span-2"><Field label="Address" required /></div>
      <Field label="City" required />
      <Field label="Postal Code" required />
      <div className="sm:col-span-2">
        <span className="text-[11px] uppercase tracking-[0.2em] text-taupe">Country</span>
        <select className="mt-2 w-full bg-transparent border-b border-charcoal/20 py-3 focus:outline-none focus:border-charcoal">
          <option>United Arab Emirates</option>
          <option>United States</option>
          <option>United Kingdom</option>
          <option>Saudi Arabia</option>
        </select>
      </div>
    </div>
  );
}

function BillingForm() {
  const [same, setSame] = useState(true);
  return (
    <div className="space-y-6">
      <label className="flex items-center gap-3 cursor-pointer">
        <span
          className={cn(
            "h-5 w-5 border grid place-items-center transition",
            same ? "bg-charcoal border-charcoal" : "border-charcoal/30",
          )}
        >
          {same && <Check className="h-3 w-3 text-ivory" />}
        </span>
        <span className="text-sm">Billing address same as shipping</span>
        <input
          type="checkbox"
          checked={same}
          onChange={(e) => setSame(e.target.checked)}
          className="sr-only"
        />
      </label>

      {!same && (
        <div className="grid sm:grid-cols-2 gap-6 fade-up">
          <Field label="First Name" required />
          <Field label="Last Name" required />
          <div className="sm:col-span-2"><Field label="Billing Address" required /></div>
          <Field label="City" required />
          <Field label="Postal Code" required />
        </div>
      )}
    </div>
  );
}

function PaymentForm() {
  const [method, setMethod] = useState<"card" | "apple" | "paypal">("card");
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-3">
        {(["card", "apple", "paypal"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMethod(m)}
            className={cn(
              "border p-4 text-xs uppercase tracking-[0.2em] transition",
              method === m ? "bg-charcoal text-ivory border-charcoal" : "border-charcoal/20 hover:border-charcoal",
            )}
          >
            {m === "card" ? "Card" : m === "apple" ? "Apple Pay" : "PayPal"}
          </button>
        ))}
      </div>

      {method === "card" && (
        <div className="grid sm:grid-cols-2 gap-6 fade-up">
          <div className="sm:col-span-2"><Field label="Card Number" required placeholder="•••• •••• •••• ••••" /></div>
          <Field label="Expiry" required placeholder="MM / YY" />
          <Field label="CVC" required placeholder="•••" />
          <div className="sm:col-span-2"><Field label="Name on Card" required /></div>
        </div>
      )}

      {method === "apple" && (
        <div className="p-8 border border-charcoal/15 text-center fade-up">
          <p className="text-sm text-muted-foreground">You will be prompted to confirm with Face ID.</p>
        </div>
      )}
      {method === "paypal" && (
        <div className="p-8 border border-charcoal/15 text-center fade-up">
          <p className="text-sm text-muted-foreground">You will be redirected to PayPal to complete payment.</p>
        </div>
      )}
    </div>
  );
}
