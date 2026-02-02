import { useEffect, useState } from "react";

export function HudArcReactor() {
  const [rotation, setRotation] = useState(0);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(r => (r + 1) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulse(p => (p + 1) % 100);
    }, 50);
    return () => clearInterval(pulseInterval);
  }, []);

  // Calculate pulsing opacity values
  const pulseOpacity1 = 0.3 + 0.4 * Math.sin((pulse * Math.PI) / 50);
  const pulseOpacity2 = 0.3 + 0.4 * Math.sin(((pulse + 25) * Math.PI) / 50);
  const pulseOpacity3 = 0.3 + 0.4 * Math.sin(((pulse + 50) * Math.PI) / 50);

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
        {/* Tech lines - horizontal (pulsing) */}
        <line 
          x1="8" y1="48" x2="20" y2="48" 
          stroke={`hsl(var(--primary) / ${pulseOpacity1})`} 
          strokeWidth="1.5"
          style={{ filter: `drop-shadow(0 0 3px hsl(var(--primary) / ${pulseOpacity1}))` }}
        />
        <line 
          x1="76" y1="48" x2="88" y2="48" 
          stroke={`hsl(var(--primary) / ${pulseOpacity1})`} 
          strokeWidth="1.5"
          style={{ filter: `drop-shadow(0 0 3px hsl(var(--primary) / ${pulseOpacity1}))` }}
        />
        {/* Tech lines - vertical (pulsing with offset) */}
        <line 
          x1="48" y1="8" x2="48" y2="20" 
          stroke={`hsl(var(--primary) / ${pulseOpacity2})`} 
          strokeWidth="1.5"
          style={{ filter: `drop-shadow(0 0 3px hsl(var(--primary) / ${pulseOpacity2}))` }}
        />
        <line 
          x1="48" y1="76" x2="48" y2="88" 
          stroke={`hsl(var(--primary) / ${pulseOpacity2})`} 
          strokeWidth="1.5"
          style={{ filter: `drop-shadow(0 0 3px hsl(var(--primary) / ${pulseOpacity2}))` }}
        />
        {/* Diagonal tech lines (pulsing with different offset) */}
        <line 
          x1="16" y1="16" x2="26" y2="26" 
          stroke={`hsl(var(--primary) / ${pulseOpacity3})`} 
          strokeWidth="1"
          style={{ filter: `drop-shadow(0 0 2px hsl(var(--primary) / ${pulseOpacity3}))` }}
        />
        <line 
          x1="70" y1="16" x2="80" y2="26" 
          stroke={`hsl(var(--primary) / ${pulseOpacity3})`} 
          strokeWidth="1"
          style={{ filter: `drop-shadow(0 0 2px hsl(var(--primary) / ${pulseOpacity3}))` }}
        />
        <line 
          x1="16" y1="80" x2="26" y2="70" 
          stroke={`hsl(var(--primary) / ${pulseOpacity3})`} 
          strokeWidth="1"
          style={{ filter: `drop-shadow(0 0 2px hsl(var(--primary) / ${pulseOpacity3}))` }}
        />
        <line 
          x1="70" y1="80" x2="80" y2="70" 
          stroke={`hsl(var(--primary) / ${pulseOpacity3})`} 
          strokeWidth="1"
          style={{ filter: `drop-shadow(0 0 2px hsl(var(--primary) / ${pulseOpacity3}))` }}
        />
        {/* Small tick marks (sequential pulsing) */}
        {[0, 30, 60, 120, 150, 210, 240, 300, 330].map((angle, index) => {
          const tickPulse = 0.4 + 0.5 * Math.sin(((pulse + index * 10) * Math.PI) / 50);
          return (
            <line
              key={angle}
              x1={48 + 42 * Math.cos((angle * Math.PI) / 180)}
              y1={48 + 42 * Math.sin((angle * Math.PI) / 180)}
              x2={48 + 46 * Math.cos((angle * Math.PI) / 180)}
              y2={48 + 46 * Math.sin((angle * Math.PI) / 180)}
              stroke={`hsl(var(--primary) / ${tickPulse})`}
              strokeWidth="1.5"
              style={{ filter: `drop-shadow(0 0 2px hsl(var(--primary) / ${tickPulse * 0.5}))` }}
            />
          );
        })}
        {/* Scanning arc */}
        <circle
          cx="48"
          cy="48"
          r="38"
          fill="none"
          stroke="hsl(var(--primary) / 0.15)"
          strokeWidth="2"
          strokeDasharray="20 220"
          strokeLinecap="round"
          style={{ 
            transform: `rotate(${rotation * 2}deg)`,
            transformOrigin: 'center',
            filter: 'drop-shadow(0 0 4px hsl(var(--primary) / 0.5))'
          }}
        />
      </svg>

      {/* Main reactor */}
      <div className="absolute inset-2 rounded-full border-2 border-primary/40 bg-background overflow-hidden">
        {/* Rotating segments */}
        <div 
          className="absolute inset-0"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {Array.from({ length: 8 }).map((_, i) => {
            const segmentPulse = 0.2 + 0.3 * Math.sin(((pulse + i * 12) * Math.PI) / 50);
            return (
              <div
                key={i}
                className="absolute w-1 h-6 rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                  transformOrigin: "50% 0",
                  transform: `translateX(-50%) rotate(${i * 45}deg) translateY(-30px)`,
                  backgroundColor: `hsl(var(--primary) / ${segmentPulse})`,
                  boxShadow: `0 0 6px hsl(var(--primary) / ${segmentPulse})`,
                }}
              />
            );
          })}
        </div>

        {/* Inner glow */}
        <div className="absolute inset-4 rounded-full bg-gradient-radial from-primary/40 to-transparent" />
        
        {/* Core */}
        <div 
          className="absolute inset-6 rounded-full border border-primary/60 bg-primary/20"
          style={{
            boxShadow: `0 0 ${15 + 10 * Math.sin((pulse * Math.PI) / 25)}px hsl(var(--primary)), inset 0 0 10px hsl(var(--primary) / 0.5)`
          }}
        >
          <div className="absolute inset-2 rounded-full bg-primary/30 animate-pulse" />
        </div>
      </div>

      {/* Corner markers (pulsing) */}
      {[0, 90, 180, 270].map((angle, index) => {
        const cornerPulse = 0.4 + 0.4 * Math.sin(((pulse + index * 25) * Math.PI) / 50);
        return (
          <div
            key={angle}
            className="absolute w-2 h-2 border-t border-l"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) rotate(${angle}deg) translate(44px, -44px)`,
              borderColor: `hsl(var(--primary) / ${cornerPulse})`,
              boxShadow: `0 0 4px hsl(var(--primary) / ${cornerPulse * 0.5})`,
            }}
          />
        );
      })}
    </div>
  );
}
