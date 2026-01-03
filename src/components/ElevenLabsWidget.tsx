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
    <div className="fixed bottom-6 right-6 z-50">
      <elevenlabs-convai agent-id="agent_3401ke0jrj6yfa7t08sfqh226qrw"></elevenlabs-convai>
    </div>
  );
};
