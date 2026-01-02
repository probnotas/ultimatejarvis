import { Mic, MicOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceButtonProps {
  isRecording: boolean;
  isProcessing: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function VoiceButton({ isRecording, isProcessing, onClick, disabled }: VoiceButtonProps) {
  return (
    <div className="relative">
      {/* Outer glow ring */}
      <div
        className={cn(
          "absolute inset-0 rounded-full transition-all duration-500",
          isRecording && "animate-recording-pulse bg-primary/20",
          !isRecording && !isProcessing && "animate-pulse-glow"
        )}
      />
      
      {/* Main button */}
      <button
        onClick={onClick}
        disabled={disabled || isProcessing}
        className={cn(
          "relative z-10 flex h-24 w-24 items-center justify-center rounded-full",
          "border-2 transition-all duration-300",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          isRecording
            ? "border-primary bg-primary/20 glow-jarvis-intense"
            : "border-jarvis-border bg-jarvis-surface hover:border-primary/50 hover:bg-jarvis-surface/80 glow-jarvis"
        )}
      >
        {isProcessing ? (
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
        ) : isRecording ? (
          <MicOff className="h-10 w-10 text-primary" />
        ) : (
          <Mic className="h-10 w-10 text-primary" />
        )}
      </button>

      {/* Sound wave visualization */}
      {isRecording && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-end gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-1 bg-primary rounded-full animate-wave"
              style={{
                animationDelay: `${i * 0.1}s`,
                height: "12px",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
