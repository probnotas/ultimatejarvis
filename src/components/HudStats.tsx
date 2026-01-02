interface StatBarProps {
  label: string;
  value: string;
  percentage: number;
  color?: string;
}

function StatBar({ label, value, percentage }: StatBarProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-mono">
        <span className="text-muted-foreground uppercase tracking-wider">{label}</span>
        <span className="text-primary">{value}</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function HudStats() {
  return (
    <div className="space-y-4 min-w-[180px]">
      {/* Storage indicator */}
      <div className="space-y-3">
        <StatBar label="Full Capacity" value="133 G" percentage={85} />
        <div className="flex items-center gap-2 text-[10px] font-mono">
          <div className="w-2 h-2 bg-primary/60" />
          <span className="text-muted-foreground">PRIMARY STORAGE</span>
          <span className="text-primary ml-auto">▶</span>
        </div>
        <StatBar label="Free Capacity" value="61 G" percentage={40} />
      </div>

      {/* Power indicator */}
      <div className="mt-6 flex items-center gap-3">
        <div className="relative w-12 h-12">
          {/* Circular progress */}
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="3"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              strokeDasharray={`${2 * Math.PI * 20}`}
              strokeDashoffset={`${2 * Math.PI * 20 * 0}`}
              className="drop-shadow-[0_0_4px_hsl(var(--primary))]"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-mono font-bold text-primary">100%</span>
          </div>
        </div>
        <div className="text-[10px] font-mono space-y-0.5">
          <div className="text-primary">Power</div>
          <div className="text-muted-foreground">High</div>
        </div>
      </div>
    </div>
  );
}
