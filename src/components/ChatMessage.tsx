import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
}

export function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-in-up",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border",
          isUser
            ? "border-muted-foreground/30 bg-muted"
            : "border-primary/30 bg-primary/10 glow-jarvis"
        )}
      >
        {isUser ? (
          <User className="h-5 w-5 text-muted-foreground" />
        ) : (
          <Bot className="h-5 w-5 text-primary" />
        )}
      </div>

      {/* Message content */}
      <div
        className={cn(
          "flex max-w-[75%] flex-col gap-1",
          isUser ? "items-end" : "items-start"
        )}
      >
        <span className="text-xs font-medium text-muted-foreground">
          {isUser ? "You" : "Jarvis"}
        </span>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "bg-muted text-foreground rounded-tr-sm"
              : "bg-jarvis-surface border border-jarvis-border text-foreground rounded-tl-sm"
          )}
        >
          {message}
        </div>
        {timestamp && (
          <span className="text-xs text-muted-foreground/60 font-mono">
            {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        )}
      </div>
    </div>
  );
}
