import { useEffect, useState } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface HudCircularDisplayProps {
  isRecording: boolean;
  isProcessing: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function HudCircularDisplay({
  isRecording,
  isProcessing,
  onClick,
  disabled
}: HudCircularDisplayProps) {
  const [rotation, setRotation] = useState(0);
  const [innerRotation, setInnerRotation] = useState(0);
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(r => (r + 0.3) % 360);
      setInnerRotation(r => (r - 0.5) % 360);
      setPulsePhase(p => (p + 2) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Generate code lines
  const codeLines = Array.from({ length: 12 }, (_, i) => ({
    angle: i * 30,
    length: 20 + (i % 3) * 15,
    delay: i * 0.15
  }));

  return (
    <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px]">
      {/* Expanding pulse rings */}
      {[0, 33, 66].map((offset, i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-full border border-primary/30"
          style={{
            transform: `scale(${0.3 + ((pulsePhase + offset) % 100) / 100 * 0.7})`,
            opacity: 1 - ((pulsePhase + offset) % 100) / 100
          }}
        />
      ))}

      {/* Code lines radiating outward */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {codeLines.map((line, i) => {
            const startRadius = 20;
            const endRadius = startRadius + line.length;
            const angleRad = (line.angle + rotation * 0.5) * Math.PI / 180;
            const x1 = 50 + startRadius * Math.cos(angleRad);
            const y1 = 50 + startRadius * Math.sin(angleRad);
            const x2 = 50 + endRadius * Math.cos(angleRad);
            const y2 = 50 + endRadius * Math.sin(angleRad);
            
            return (
              <g key={i}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="hsl(var(--primary))"
                  strokeWidth="0.5"
                  strokeDasharray="2 2"
                  className="opacity-40"
                />
                {/* Data dots along lines */}
                {[0.3, 0.6, 0.9].map((t, j) => {
                  const dotX = x1 + (x2 - x1) * ((t + pulsePhase / 100) % 1);
                  const dotY = y1 + (y2 - y1) * ((t + pulsePhase / 100) % 1);
                  return (
                    <circle
                      key={j}
                      cx={dotX}
                      cy={dotY}
                      r="0.8"
                      fill="hsl(var(--primary))"
                      className="opacity-60"
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Outer ring with markers */}
      <div
        className="absolute inset-0 rounded-full border border-primary/20 flex items-center justify-center"
        style={{ transform: `rotate(${rotation}deg)` }}
      />

      {/* Second rotating ring */}
      <div
        className="absolute inset-4 rounded-full border-2 border-primary/30"
        style={{ transform: `rotate(${innerRotation}deg)` }}
      />

      {/* Third ring - data ring */}
      <div
        className="absolute inset-10 rounded-full border border-primary/40"
        style={{ transform: `rotate(${rotation * 1.5}deg)` }}
      />

      {/* Inner glow ring */}
      <div
        className={cn(
          "absolute inset-16 rounded-full border-2 transition-all duration-300",
          isRecording
            ? "border-primary shadow-[0_0_30px_hsl(var(--primary)),inset_0_0_30px_hsl(var(--primary)/0.3)]"
            : "border-primary/50 shadow-[0_0_15px_hsl(var(--primary)/0.5)]"
        )}
      />

      {/* Core display */}
      <div className="absolute inset-20 rounded-full bg-background/80 backdrop-blur border border-primary/30 flex items-center justify-center">
        {/* Inner decorative ring */}
        <div className="absolute inset-4 rounded-full border border-primary/20" />

        {/* Outer rotating ring around center button */}
        <div
          className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full"
          style={{ transform: `rotate(${-innerRotation * 1.5}deg)` }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              strokeDasharray="12 6"
              className="opacity-40"
            />
            {[0, 60, 120, 180, 240, 300].map(angle => (
              <circle
                key={angle}
                cx={50 + 46 * Math.cos(angle * Math.PI / 180)}
                cy={50 + 46 * Math.sin(angle * Math.PI / 180)}
                r="1.5"
                fill="hsl(var(--primary))"
                className="opacity-60"
              />
            ))}
          </svg>
        </div>

        {/* Inner rotating ring around center button */}
        <div
          className="absolute w-36 h-36 md:w-44 md:h-44 rounded-full"
          style={{ transform: `rotate(${rotation * 2}deg)` }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="1.5"
              strokeDasharray="8 4"
              className="opacity-60"
            />
            {[0, 90, 180, 270].map(angle => (
              <circle
                key={angle}
                cx={50 + 46 * Math.cos(angle * Math.PI / 180)}
                cy={50 + 46 * Math.sin(angle * Math.PI / 180)}
                r="2"
                fill="hsl(var(--primary))"
                className="opacity-80"
              />
            ))}
          </svg>
        </div>

        {/* Center button */}
        <button
          onClick={onClick}
          disabled={disabled || isProcessing}
          className={cn(
            "relative z-10 flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full",
            "border-2 transition-all duration-300",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            isRecording
              ? "border-primary bg-primary/30 shadow-[0_0_40px_hsl(var(--primary))]"
              : "border-primary/50 bg-primary/10 hover:bg-primary/20 hover:border-primary"
          )}
        >
          {!isRecording && !isProcessing && (
            <div className="absolute inset-4 rounded-full bg-primary/20 animate-pulse shadow-[0_0_20px_hsl(var(--primary)/0.6),0_0_40px_hsl(var(--primary)/0.3)]" />
          )}
        </button>
      </div>
    </div>
  );
}