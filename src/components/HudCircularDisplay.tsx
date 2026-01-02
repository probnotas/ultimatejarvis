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
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(r => (r + 0.3) % 360);
      setInnerRotation(r => (r - 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);
  return <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px]">
      {/* Outer ring with markers */}
      <div className="absolute inset-0 rounded-full border border-primary/20 flex items-center justify-center" style={{
      transform: `rotate(${rotation}deg)`
    }}>
      </div>

      {/* Second rotating ring */}
      <div className="absolute inset-4 rounded-full border-2 border-primary/30" style={{
      transform: `rotate(${innerRotation}deg)`
    }} />

      {/* Third ring - data ring */}
      <div className="absolute inset-10 rounded-full border border-primary/40" style={{
      transform: `rotate(${rotation * 1.5}deg)`
    }} />

      {/* Inner glow ring */}
      <div className={cn("absolute inset-16 rounded-full border-2 transition-all duration-300", isRecording ? "border-primary shadow-[0_0_30px_hsl(var(--primary)),inset_0_0_30px_hsl(var(--primary)/0.3)]" : "border-primary/50 shadow-[0_0_15px_hsl(var(--primary)/0.5)]")} />

      {/* Core display */}
      <div className="absolute inset-20 rounded-full bg-background/80 backdrop-blur border border-primary/30 flex items-center justify-center">
        {/* Inner decorative ring */}
        <div className="absolute inset-4 rounded-full border border-primary/20" />

        {/* Rotating ring around center button */}
        <div 
          className="absolute w-28 h-28 md:w-32 md:h-32 rounded-full"
          style={{ transform: `rotate(${rotation * 2}deg)` }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Dashed rotating ring */}
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
            {/* Accent markers */}
            {[0, 90, 180, 270].map((angle) => (
              <circle
                key={angle}
                cx={50 + 46 * Math.cos((angle * Math.PI) / 180)}
                cy={50 + 46 * Math.sin((angle * Math.PI) / 180)}
                r="2"
                fill="hsl(var(--primary))"
                className="opacity-80"
              />
            ))}
          </svg>
        </div>

        {/* Center button */}
        <button onClick={onClick} disabled={disabled || isProcessing} className={cn("relative z-10 flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full", "border-2 transition-all duration-300", "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background", "disabled:opacity-50 disabled:cursor-not-allowed", isRecording ? "border-primary bg-primary/30 shadow-[0_0_40px_hsl(var(--primary))]" : "border-primary/50 bg-primary/10 hover:bg-primary/20 hover:border-primary")}>
          {/* Glowing pulse core when idle */}
          {!isRecording && !isProcessing && <div className="absolute inset-4 rounded-full bg-primary/20 animate-pulse shadow-[0_0_20px_hsl(var(--primary)/0.6),0_0_40px_hsl(var(--primary)/0.3)]" />}
        </button>
      </div>

      {/* Date indicator at bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] text-primary/60 tracking-widest">
        {new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "short"
      }).toUpperCase()}
      </div>

      {/* Time indicator */}
      
    </div>;
}