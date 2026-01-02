import { useEffect, useState } from "react";

export function HudArcReactor() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(r => (r + 1) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-24 h-24">
      {/* Outer decorative ring */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 96 96">
        <circle
          cx="48"
          cy="48"
          r="46"
          fill="none"
          stroke="hsl(var(--primary) / 0.3)"
          strokeWidth="1"
          strokeDasharray="4 2"
        />
      </svg>

      {/* Main reactor */}
      <div className="absolute inset-2 rounded-full border-2 border-primary/40 bg-background overflow-hidden">
        {/* Rotating segments */}
        <div 
          className="absolute inset-0"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-6 bg-primary/30 rounded-full"
              style={{
                left: "50%",
                top: "50%",
                transformOrigin: "50% 0",
                transform: `translateX(-50%) rotate(${i * 45}deg) translateY(-30px)`,
              }}
            />
          ))}
        </div>

        {/* Inner glow */}
        <div className="absolute inset-4 rounded-full bg-gradient-radial from-primary/40 to-transparent" />
        
        {/* Core */}
        <div className="absolute inset-6 rounded-full border border-primary/60 bg-primary/20 shadow-[0_0_20px_hsl(var(--primary)),inset_0_0_10px_hsl(var(--primary)/0.5)]">
          <div className="absolute inset-2 rounded-full bg-primary/30 animate-pulse" />
        </div>
      </div>

      {/* Corner markers */}
      {[0, 90, 180, 270].map((angle) => (
        <div
          key={angle}
          className="absolute w-2 h-2 border-t border-l border-primary/60"
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) rotate(${angle}deg) translate(44px, -44px)`,
          }}
        />
      ))}
    </div>
  );
}
