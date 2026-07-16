import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import { useCart, formatPrice } from "@/lib/cart-store";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Find Your Nush Routine — Skin Consult" },
      {
        name: "description",
        content: "A two-minute clinical consult that recommends your personalised Nush ritual.",
      },
      { property: "og:title", content: "Find Your Nush Routine" },
    ],
  }),
  component: Quiz,
});

interface Q {
  id: string;
  question: string;
  eyebrow: string;
  options: { label: string; value: string; concern?: string[] }[];
}

const QUESTIONS: Q[] = [
  {
    id: "type",
    eyebrow: "Step 01 — Skin type",
    question: "How would you describe your skin today?",
    options: [
      { label: "Dry & tight", value: "dry", concern: ["Hydration", "Barrier"] },
      { label: "Combination", value: "combo", concern: ["Glow"] },
      { label: "Oily & congested", value: "oily", concern: ["Acne"] },
      { label: "Sensitive & reactive", value: "sensitive", concern: ["Barrier"] },
    ],
  },
  {
    id: "concern",
    eyebrow: "Step 02 — Primary concern",
    question: "What matters most to you?",
    options: [
      { label: "A luminous, glass-like finish", value: "glow", concern: ["Glow"] },
      { label: "Deep, lasting hydration", value: "hydration", concern: ["Hydration"] },
      { label: "Firmness & fine lines", value: "aging", concern: ["Anti-Aging"] },
      { label: "Clarity & breakouts", value: "acne", concern: ["Acne"] },
    ],
  },
  {
    id: "climate",
    eyebrow: "Step 03 — Climate",
    question: "Where do you live?",
    options: [
      { label: "Arid / desert (Dubai, LA)", value: "arid", concern: ["Hydration", "Barrier"] },
      { label: "Humid coastal", value: "humid", concern: ["Acne"] },
      { label: "Cold seasonal (NYC, London)", value: "cold", concern: ["Barrier", "Hydration"] },
      { label: "Tropical year-round", value: "tropical", concern: ["Glow"] },
    ],
  },
  {
    id: "routine",
    eyebrow: "Step 04 — Ritual",
    question: "How committed is your current routine?",
    options: [
      { label: "Minimalist — 2 steps", value: "min" },
      { label: "Considered — 3 to 4 steps", value: "mid" },
      { label: "Devoted — 5+ steps", value: "max" },
      { label: "Rebuilding from scratch", value: "new" },
    ],
  },
];

function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { value: string; concern?: string[] }>>({});
  const [done, setDone] = useState(false);
  const cart = useCart();

  const total = QUESTIONS.length;
  const progress = done ? 100 : (step / total) * 100;

  const recommended = useMemo(() => {
    const scored = products.map((p) => {
      let score = p.rating;
      Object.values(answers).forEach((a) => {
        a.concern?.forEach((c) => {
          if (p.concerns.includes(c as never)) score += 3;
        });
      });
      return { p, score };
    });
    return scored.sort((a, b) => b.score - a.score).slice(0, 3).map((s) => s.p);
  }, [answers]);

  const pick = (opt: Q["options"][number]) => {
    const q = QUESTIONS[step];
    setAnswers({ ...answers, [q.id]: { value: opt.value, concern: opt.concern } });
    setTimeout(() => {
      if (step + 1 < total) setStep(step + 1);
      else setDone(true);
    }, 300);
  };

  if (done) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-24 fade-up">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow mb-4">Your Consult · Complete</p>
          <h1 className="font-serif text-5xl md:text-6xl leading-tight text-charcoal">
            Your Nush ritual, calibrated.
          </h1>
          <p className="mt-6 text-charcoal/70">
            Based on your responses, our atelier recommends the following three-step routine.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {recommended.map((p, i) => (
            <div key={p.id} className="bg-ivory border border-charcoal/10 p-6 flex flex-col">
              <p className="eyebrow mb-4">Step 0{i + 1}</p>
              <Link to="/product/$slug" params={{ slug: p.slug }} className="block aspect-[4/5] bg-alabaster overflow-hidden mb-6">
                <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover hover:scale-105 transition duration-700" />
              </Link>
              <h3 className="font-serif text-2xl leading-tight">{p.name}</h3>
              <p className="text-sm text-muted-foreground mt-2">{p.tagline}</p>
              <p className="mt-auto pt-6 font-serif text-xl">{formatPrice(p.price)}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Full ritual total</p>
            <p className="font-serif text-3xl mt-1">
              {formatPrice(recommended.reduce((s, p) => s + p.price, 0))}
            </p>
          </div>
          <button
            onClick={() => {
              recommended.forEach((p) => cart.add(p.id));
            }}
            className="bg-charcoal text-ivory px-10 py-4 text-xs uppercase tracking-[0.24em] hover:bg-charcoal/90"
          >
            Add ritual to cart
          </button>
          <button
            onClick={() => {
              setDone(false);
              setStep(0);
              setAnswers({});
            }}
            className="text-xs uppercase tracking-[0.24em] text-taupe hover:text-charcoal mt-2"
          >
            Retake consult
          </button>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[step];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24 min-h-[80vh] flex flex-col">
      {/* Progress */}
      <div className="mb-16">
        <div className="flex justify-between text-xs uppercase tracking-[0.24em] text-taupe mb-3">
          <span>Consult</span>
          <span>
            {String(step + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
        <div className="h-px bg-charcoal/10 relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-charcoal transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex-1 fade-up" key={q.id}>
        <p className="eyebrow mb-6">{q.eyebrow}</p>
        <h2 className="font-serif text-4xl md:text-5xl leading-tight text-charcoal">
          {q.question}
        </h2>

        <div className="mt-12 grid gap-3">
          {q.options.map((opt) => {
            const active = answers[q.id]?.value === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => pick(opt)}
                className={cn(
                  "group flex items-center justify-between text-left border p-5 md:p-6 transition-all",
                  active
                    ? "border-charcoal bg-charcoal text-ivory"
                    : "border-charcoal/15 hover:border-charcoal hover:bg-champagne/20",
                )}
              >
                <span className="font-serif text-xl md:text-2xl">{opt.label}</span>
                <span
                  className={cn(
                    "h-8 w-8 rounded-full border grid place-items-center transition",
                    active
                      ? "border-ivory bg-ivory text-charcoal"
                      : "border-charcoal/20 group-hover:border-charcoal",
                  )}
                >
                  {active ? <Check className="h-4 w-4" /> : <ArrowRight className="h-3 w-3" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-12 flex justify-between items-center">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] disabled:opacity-30"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <span className="text-xs text-muted-foreground">Two minutes · Free</span>
      </div>
    </div>
  );
}
