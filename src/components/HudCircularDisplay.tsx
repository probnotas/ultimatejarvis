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
        {/* Ring markers */}
        {Array.from({
        length: 60
      }).map((_, i) => <div key={i} className="absolute w-0.5 h-1 bg-primary/30" style={{
        top: '0',
        left: '50%',
        transform: `rotate(${i * 6}deg)`,
        transformOrigin: '50% 160px'
      }} />)}
      </div>

      {/* Second rotating ring */}
      

      {/* Third ring - data ring */}
      <div className="absolute inset-10 rounded-full border border-primary/40" style={{
      transform: `rotate(${rotation * 1.5}deg)`
    }}>
        {/* Data blocks */}
        {Array.from({
        length: 12
      }).map((_, i) => <div key={i} className="absolute w-2 h-0.5 bg-primary/60" style={{
        top: '0',
        left: '50%',
        transform: `rotate(${i * 30}deg)`,
        transformOrigin: '50% 100px'
      }} />)}
      </div>

      {/* Inner glow ring */}
      <div className={cn("absolute inset-16 rounded-full border-2 transition-all duration-300", isRecording ? "border-primary shadow-[0_0_30px_hsl(var(--primary)),inset_0_0_30px_hsl(var(--primary)/0.3)]" : "border-primary/50 shadow-[0_0_15px_hsl(var(--primary)/0.5)]")} />

      {/* Core display */}
      <div className="absolute inset-20 rounded-full bg-background/80 backdrop-blur border border-primary/30 flex items-center justify-center">
        {/* Rotating ring 1 - outer */}
        <div className="absolute inset-2 rounded-full border border-primary/40 border-dashed" style={{
        transform: `rotate(${rotation * 2}deg)`
      }} />
        
        {/* Rotating ring 2 - middle */}
        <div className="absolute inset-4 rounded-full border-2 border-primary/30" style={{
        transform: `rotate(${innerRotation * 1.5}deg)`
      }}>
          {/* Ring segments */}
          {Array.from({
          length: 8
        }).map((_, i) => <div key={i} className="absolute w-1 h-1 rounded-full bg-primary/60" style={{
          top: '50%',
          left: '50%',
          transform: `rotate(${i * 45}deg) translateY(-50%) translateX(-50%) translateY(-100%)`
        }} />)}
        </div>
        
        {/* Rotating ring 3 - inner */}
        <div className="absolute inset-6 rounded-full border border-primary/50" style={{
        transform: `rotate(${rotation * -3}deg)`
      }}>
          {/* Tick marks */}
          {Array.from({
          length: 12
        }).map((_, i) => <div key={i} className="absolute w-0.5 h-2 bg-primary/40" style={{
          top: '0',
          left: '50%',
          transform: `translateX(-50%) rotate(${i * 30}deg)`,
          transformOrigin: '50% 100%'
        }} />)}
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