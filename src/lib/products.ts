export type Concern = "Glow" | "Hydration" | "Anti-Aging" | "Acne" | "Barrier";
export type Category = "Cleansers" | "Serums" | "Moisturizers" | "Treatments" | "Eye Care";

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  size: string;
  category: Category;
  concerns: Concern[];
  rating: number;
  reviews: number;
  images: string[];
  description: string;
  ingredients: string[];
  keyActives: { name: string; benefit: string }[];
  howToUse: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "glass-skin-resurfacing-serum",
    name: "Glass Skin Resurfacing Serum",
    tagline: "10% PHA + Niacinamide",
    price: 128,
    size: "30ml",
    category: "Serums",
    concerns: ["Glow", "Anti-Aging"],
    rating: 4.9,
    reviews: 1284,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631730359585-38a4935cbec4?w=1200&q=80&auto=format&fit=crop",
    ],
    description:
      "A weightless resurfacing treatment that refines texture and delivers a luminous, glass-like finish. Formulated with polyhydroxy acids and stabilised niacinamide to smooth, brighten, and balance without compromising the barrier.",
    ingredients: [
      "Aqua",
      "Gluconolactone (PHA)",
      "Niacinamide",
      "Panthenol",
      "Sodium Hyaluronate",
      "Centella Asiatica Extract",
      "Allantoin",
    ],
    keyActives: [
      { name: "10% PHA", benefit: "Gentle resurfacing without irritation" },
      { name: "5% Niacinamide", benefit: "Refines pores and evens tone" },
      { name: "Centella Asiatica", benefit: "Soothes and strengthens" },
    ],
    howToUse:
      "Apply 3–4 drops to cleansed skin in the evening. Follow with moisturiser. Use SPF daily. Start 3x per week and build tolerance.",
    featured: true,
  },
  {
    id: "2",
    slug: "clinical-hydration-booster",
    name: "Clinical Hydration Booster",
    tagline: "Multi-weight Hyaluronic Complex",
    price: 96,
    size: "30ml",
    category: "Serums",
    concerns: ["Hydration", "Barrier"],
    rating: 4.8,
    reviews: 942,
    images: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&q=80&auto=format&fit=crop",
    ],
    description:
      "A cushioning serum with five molecular weights of hyaluronic acid, panthenol and ectoin. Delivers deep, cascading hydration and reinforces the moisture reservoir for plump, dewy skin.",
    ingredients: [
      "Aqua",
      "Sodium Hyaluronate (5 weights)",
      "Ectoin",
      "Panthenol",
      "Beta-Glucan",
      "Glycerin",
    ],
    keyActives: [
      { name: "5-Weight HA", benefit: "Multi-depth hydration" },
      { name: "Ectoin 2%", benefit: "Barrier & climate defence" },
      { name: "Beta-Glucan", benefit: "Deep soothing hydration" },
    ],
    howToUse: "Press 4–5 drops into damp skin AM and PM before cream.",
    featured: true,
  },
  {
    id: "3",
    slug: "luminous-cream-cleanser",
    name: "Luminous Cream Cleanser",
    tagline: "Ceramide + Amino Acid Wash",
    price: 62,
    size: "150ml",
    category: "Cleansers",
    concerns: ["Hydration", "Barrier"],
    rating: 4.9,
    reviews: 2103,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=1200&q=80&auto=format&fit=crop",
    ],
    description:
      "A velvety amino-acid cleanser that dissolves impurities and SPF while preserving the moisture barrier. Skin is left soft, clean and impossibly comfortable.",
    ingredients: ["Aqua", "Sodium Cocoyl Glutamate", "Glycerin", "Ceramide NP", "Squalane"],
    keyActives: [
      { name: "Ceramide NP", benefit: "Barrier reinforcement" },
      { name: "Amino Acid Surfactants", benefit: "Non-stripping cleanse" },
    ],
    howToUse:
      "Massage a pearl-sized amount onto damp skin. Rinse with lukewarm water. AM and PM.",
    featured: true,
  },
  {
    id: "4",
    slug: "midnight-recovery-cream",
    name: "Midnight Recovery Cream",
    tagline: "Peptide + Ceramide Renewal",
    price: 148,
    size: "50ml",
    category: "Moisturizers",
    concerns: ["Anti-Aging", "Barrier"],
    rating: 4.9,
    reviews: 812,
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916297893-06e1d3c9c8ef?w=1200&q=80&auto=format&fit=crop",
    ],
    description:
      "A rich yet weightless overnight cream with signal peptides, ceramides and squalane. Firms, restores and delivers a rested, sculpted appearance by morning.",
    ingredients: ["Aqua", "Squalane", "Ceramide Complex", "Matrixyl 3000", "Shea Butter"],
    keyActives: [
      { name: "Matrixyl 3000", benefit: "Firms and lifts overnight" },
      { name: "Ceramide Complex", benefit: "Barrier restoration" },
    ],
    howToUse: "Apply an almond-sized amount as the final step of your PM routine.",
    featured: true,
  },
  {
    id: "5",
    slug: "phyto-radiance-oil",
    name: "Phyto Radiance Oil",
    tagline: "Cold-Pressed Botanical Elixir",
    price: 112,
    size: "30ml",
    category: "Treatments",
    concerns: ["Glow", "Hydration"],
    rating: 4.7,
    reviews: 528,
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200&q=80&auto=format&fit=crop",
    ],
    description:
      "A luminous facial oil of nine cold-pressed botanicals. Melts into skin for an instant lit-from-within finish.",
    ingredients: ["Rosehip Oil", "Jojoba", "Squalane", "Sea Buckthorn", "Bakuchiol"],
    keyActives: [
      { name: "Bakuchiol", benefit: "Retinol-like renewal, gentle" },
      { name: "Sea Buckthorn", benefit: "Antioxidant radiance" },
    ],
    howToUse: "Press 3 drops into skin as the last step, or mix into moisturiser.",
    featured: true,
  },
  {
    id: "6",
    slug: "clarifying-clay-treatment",
    name: "Clarifying Clay Treatment",
    tagline: "2% Salicylic + Kaolin",
    price: 78,
    size: "75ml",
    category: "Treatments",
    concerns: ["Acne", "Glow"],
    rating: 4.6,
    reviews: 394,
    images: [
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1200&q=80&auto=format&fit=crop",
    ],
    description:
      "A creamy purifying mask that decongests pores, absorbs excess sebum and refines texture without stripping.",
    ingredients: ["Kaolin", "Bentonite", "Salicylic Acid", "Niacinamide", "Zinc PCA"],
    keyActives: [
      { name: "2% Salicylic", benefit: "Deep pore clearing" },
      { name: "Zinc PCA", benefit: "Balances oil" },
    ],
    howToUse: "Apply a thin layer 2–3x per week. Leave 8 minutes. Rinse.",
  },
  {
    id: "7",
    slug: "orbital-eye-concentrate",
    name: "Orbital Eye Concentrate",
    tagline: "Caffeine + Peptide Eye Serum",
    price: 88,
    size: "15ml",
    category: "Eye Care",
    concerns: ["Anti-Aging", "Hydration"],
    rating: 4.8,
    reviews: 611,
    images: [
      "https://images.unsplash.com/photo-1615397587950-3cbb55f95b77?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=1200&q=80&auto=format&fit=crop",
    ],
    description:
      "A cooling metal-tip serum that de-puffs, brightens and smooths fine lines with 5% caffeine and copper peptides.",
    ingredients: ["Aqua", "Caffeine", "Copper Tripeptide-1", "Niacinamide", "Hyaluronic Acid"],
    keyActives: [
      { name: "5% Caffeine", benefit: "De-puffs instantly" },
      { name: "Copper Peptides", benefit: "Firms delicate skin" },
    ],
    howToUse: "Glide the applicator around the orbital bone AM and PM.",
  },
  {
    id: "8",
    slug: "veil-mineral-spf-45",
    name: "Veil Mineral SPF 45",
    tagline: "Weightless Daily Shield",
    price: 68,
    size: "50ml",
    category: "Moisturizers",
    concerns: ["Anti-Aging", "Barrier"],
    rating: 4.9,
    reviews: 1487,
    images: [
      "https://images.unsplash.com/photo-1556228720-da4e85d5d6d3?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=1200&q=80&auto=format&fit=crop",
    ],
    description:
      "A silken 100% mineral sunscreen with zinc oxide and antioxidants. Invisible on all skin tones, primes for makeup, protects for hours.",
    ingredients: ["Zinc Oxide 18%", "Squalane", "Vitamin E", "Green Tea Extract"],
    keyActives: [
      { name: "Zinc Oxide 18%", benefit: "Broad-spectrum SPF 45" },
      { name: "Vitamin E", benefit: "Antioxidant defence" },
    ],
    howToUse: "Apply as the final AM step. Reapply every 2 hours.",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const featuredProducts = () => products.filter((p) => p.featured);

export const ALL_CONCERNS: Concern[] = ["Glow", "Hydration", "Anti-Aging", "Acne", "Barrier"];
export const ALL_CATEGORIES: Category[] = [
  "Cleansers",
  "Serums",
  "Moisturizers",
  "Treatments",
  "Eye Care",
];
