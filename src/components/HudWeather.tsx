import { Cloud } from "lucide-react";

export function HudWeather() {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Weather label */}
      <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">
        Mostly Cloudy
      </div>
      
      {/* Temperature display */}
      <div className="relative">
        <div className="w-20 h-20 rounded-full border-2 border-primary/50 flex items-center justify-center bg-primary/5">
          <span className="text-3xl font-mono font-bold text-primary">30</span>
          <span className="text-sm font-mono text-primary/70 absolute top-4 right-3">°</span>
        </div>
        {/* Decorative ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="40"
            cy="40"
            r="38"
            fill="none"
            stroke="hsl(var(--primary) / 0.3)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        </svg>
      </div>

      {/* Analysis label */}
      <div className="text-[8px] font-mono text-muted-foreground/60 tracking-wider mt-1">
        Atmospheric<br />Analysis
      </div>
    </div>
  );
}
