import { useEffect } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { "agent-id": string },
        HTMLElement
      >;
    }
  }
}

export const ElevenLabsWidget = () => {
  return (
    <div 
      className="fixed bottom-6 right-6 z-50"
      style={{
        // ElevenLabs widget CSS custom properties for theming
        '--elevenlabs-convai-widget-bg-color': 'hsl(220 20% 4%)',
        '--elevenlabs-convai-widget-text-color': 'hsl(185 100% 50%)',
        '--elevenlabs-convai-widget-primary-color': 'hsl(185 100% 50%)',
        '--elevenlabs-convai-widget-border-color': 'hsl(185 100% 50% / 0.3)',
      } as React.CSSProperties}
    >
      <elevenlabs-convai agent-id="agent_2801ke0v4g33f8hsq1ddj07mn6tb"></elevenlabs-convai>
    </div>
  );
};
