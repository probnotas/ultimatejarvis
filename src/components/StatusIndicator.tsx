import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: "idle" | "listening" | "processing" | "error";
}

const statusConfig = {
  idle: {
    label: "Ready",
    color: "bg-primary",
  },
  listening: {
    label: "Listening...",
    color: "bg-primary animate-pulse",
  },
  processing: {
    label: "Processing...",
    color: "bg-yellow-500 animate-pulse",
  },
  error: {
    label: "Error",
    color: "bg-destructive",
  },
};

export function StatusIndicator({ status }: StatusIndicatorProps) {
  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <div className={cn("h-2 w-2 rounded-full", config.color)} />
      <span className="font-mono text-xs tracking-wider">{config.label}</span>
    </div>
  );
}
