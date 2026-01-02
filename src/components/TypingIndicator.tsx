import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-fade-in-up">
      {/* Avatar */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 glow-jarvis">
        <Bot className="h-5 w-5 text-primary" />
      </div>

      {/* Typing dots */}
      <div className="flex flex-col gap-1 items-start">
        <span className="text-xs font-medium text-muted-foreground">Jarvis</span>
        <div className="rounded-2xl rounded-tl-sm bg-jarvis-surface border border-jarvis-border px-4 py-3">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-primary animate-typing-dot" />
            <div className="h-2 w-2 rounded-full bg-primary animate-typing-dot-2" />
            <div className="h-2 w-2 rounded-full bg-primary animate-typing-dot-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
