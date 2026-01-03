import { useEffect } from "react";
import { HudClock } from "@/components/HudClock";
import { HudStats } from "@/components/HudStats";
import { HudQuickLinks } from "@/components/HudQuickLinks";
import { HudWeather } from "@/components/HudWeather";
import { HudCommunication } from "@/components/HudCommunication";
import { HudArcReactor } from "@/components/HudArcReactor";

// Declare the custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { 'agent-id': string }, HTMLElement>;
    }
  }
}

const Index = () => {
  // Load ElevenLabs widget script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed@beta';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Scanline overlay effect */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.02]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.03) 2px, rgba(0,255,255,0.03) 4px)',
        }}
      />

      {/* Background grid */}
      <div className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Main HUD layout */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left panel */}
        <div className="hidden lg:flex flex-col justify-between p-6 w-64">
          {/* Top left - Clock & Weather */}
          <div className="flex flex-col gap-4">
            <HudClock />
            <HudWeather />
          </div>

          {/* Middle left - Stats */}
          <div className="flex-1 flex flex-col justify-center -mt-20">
            <HudStats />
          </div>

          {/* Bottom left - Communication */}
          <div className="fixed bottom-6 left-6">
            <HudCommunication />
          </div>
        </div>

        {/* Center - Main display */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          {/* Title */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-mono font-bold tracking-[0.3em] text-primary">
              JARVIS
            </h1>
            <p className="text-[10px] font-mono text-muted-foreground tracking-[0.5em] mt-1">
              VOICE ASSISTANT READY
            </p>
          </div>

          {/* ElevenLabs Conversational AI Widget */}
          <div className="relative">
            <elevenlabs-convai agent-id="agent_3401ke0jrj6yfa7t08sfqh226qrw"></elevenlabs-convai>
          </div>

          {/* Status text */}
          <div className="mt-8 text-center">
            <p className="text-xs font-mono text-primary/60 tracking-widest">
              CLICK THE ORB TO BEGIN CONVERSATION
            </p>
          </div>
        </div>

        {/* Right panel */}
        <div className="hidden lg:flex flex-col justify-between p-6 w-64 items-end">
          {/* Top right - Arc reactor */}
          <div className="flex flex-col items-end gap-4">
            <HudArcReactor />
            <HudQuickLinks />
          </div>

        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>
  );
};

export default Index;
