import { Zap } from "lucide-react";

export function JarvisHeader() {
  return (
    <header className="flex items-center justify-center gap-3 py-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 glow-jarvis">
        <Zap className="h-5 w-5 text-primary" />
      </div>
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold tracking-tight text-gradient-jarvis">
          JARVIS
        </h1>
        <p className="text-xs text-muted-foreground font-mono tracking-wider">
          AI VOICE ASSISTANT
        </p>
      </div>
    </header>
  );
}
