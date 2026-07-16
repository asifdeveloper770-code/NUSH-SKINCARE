interface MarqueeProps {
  items: string[];
  speed?: number;
}

export function Marquee({ items, speed = 40 }: MarqueeProps) {
  const doubled = [...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden py-6">
      <div
        className="flex gap-16 whitespace-nowrap will-change-transform"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          width: "max-content",
        }}
      >
        {doubled.map((s, i) => (
          <span
            key={i}
            className="font-serif text-4xl md:text-6xl italic text-charcoal/80 flex items-center gap-16"
          >
            {s}
            <span className="text-champagne text-3xl md:text-5xl">✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }`}</style>
    </div>
  );
}
