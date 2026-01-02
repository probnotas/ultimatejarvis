import { useEffect, useState } from "react";

export function HudCommunication() {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => (p + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Rotating indicator */}
      <div className="relative w-16 h-16">
        <svg className="w-full h-full" viewBox="0 0 64 64">
          {/* Outer ring */}
          <circle
            cx="32"
            cy="32"
            r="30"
            fill="none"
            stroke="hsl(var(--primary) / 0.3)"
            strokeWidth="2"
          />
          {/* Animated arc */}
          <circle
            cx="32"
            cy="32"
            r="30"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="47 141"
            style={{ transform: `rotate(${pulse * 3.6}deg)`, transformOrigin: 'center' }}
          />
          {/* Inner ring */}
          <circle
            cx="32"
            cy="32"
            r="22"
            fill="none"
            stroke="hsl(var(--primary) / 0.5)"
            strokeWidth="1"
          />
          {/* Center dot */}
          <circle
            cx="32"
            cy="32"
            r="4"
            fill="hsl(var(--primary))"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Label */}
      <div className="text-[10px] font-mono text-primary/70 tracking-wider">
        Communication
      </div>

      {/* Status indicator */}
      <div className="flex items-center gap-1 px-2 py-1 border border-primary/40 rounded text-[9px] font-mono text-primary/80">
        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <span>hotman.</span>
      </div>
    </div>
  );
}
