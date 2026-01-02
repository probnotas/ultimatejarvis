import { useState, useRef, useEffect } from "react";
import { HudCircularDisplay } from "@/components/HudCircularDisplay";
import { HudClock } from "@/components/HudClock";
import { HudStats } from "@/components/HudStats";
import { HudQuickLinks } from "@/components/HudQuickLinks";
import { HudWeather } from "@/components/HudWeather";
import { HudCommunication } from "@/components/HudCommunication";
import { HudArcReactor } from "@/components/HudArcReactor";
import { ChatMessage } from "@/components/ChatMessage";
import { TypingIndicator } from "@/components/TypingIndicator";
import { useVoiceRecognition } from "@/hooks/useVoiceRecognition";
import { useWebhook } from "@/hooks/useWebhook";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Configure your webhook URL here
const WEBHOOK_URL = "https://your-webhook-url.com/api/jarvis";

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<"idle" | "listening" | "processing" | "error">("idle");
  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const { sendMessage, isLoading } = useWebhook({ webhookUrl: WEBHOOK_URL });

  const handleTranscript = async (transcript: string) => {
    setShowChat(true);
    const userMessage: Message = {
      id: Date.now().toString(),
      text: transcript,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setStatus("processing");

    const response = await sendMessage(transcript);

    if (response) {
      const jarvisMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, jarvisMessage]);
      setStatus("idle");
    } else {
      const demoMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `I received your message: "${transcript}". Configure the webhook URL to get real responses.`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, demoMessage]);
      setStatus("idle");
    }
  };

  const handleError = (error: string) => {
    setStatus("error");
    toast({
      variant: "destructive",
      title: "Voice Recognition Error",
      description: error,
    });
    setTimeout(() => setStatus("idle"), 2000);
  };

  const { isRecording, isSupported, toggleRecording } = useVoiceRecognition({
    onTranscript: handleTranscript,
    onError: handleError,
  });

  useEffect(() => {
    if (isRecording) {
      setStatus("listening");
    } else if (!isLoading && status === "listening") {
      setStatus("idle");
    }
  }, [isRecording, isLoading, status]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
          {/* Top left - Clock */}
          <div>
            <HudClock />
          </div>

          {/* Middle left - Stats */}
          <div className="flex-1 flex flex-col justify-center -mt-20">
            <HudStats />
          </div>

          {/* Bottom left - Communication */}
          <div>
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
              SYSTEM ONLINE
            </p>
          </div>

          {/* Circular display */}
          <HudCircularDisplay
            isRecording={isRecording}
            isProcessing={isLoading}
            onClick={toggleRecording}
            disabled={!isSupported}
          />

          {/* Status text */}
          <div className="mt-8 text-center">
            <p className="text-xs font-mono text-primary/60 tracking-widest">
              {isRecording ? "● LISTENING..." : isLoading ? "◎ PROCESSING..." : "○ AWAITING INPUT"}
            </p>
            {!isSupported && (
              <p className="text-xs text-destructive/70 mt-2 font-mono">
                VOICE RECOGNITION UNAVAILABLE
              </p>
            )}
          </div>

          {/* Chat overlay */}
          {showChat && messages.length > 0 && (
            <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 max-h-64 overflow-y-auto bg-background/90 backdrop-blur border border-primary/30 rounded-lg p-4 space-y-3 z-40">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-primary/60 tracking-wider">COMMUNICATION LOG</span>
                <button 
                  onClick={() => setShowChat(false)}
                  className="text-primary/40 hover:text-primary text-xs"
                >
                  ✕
                </button>
              </div>
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.text}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Right panel */}
        <div className="hidden lg:flex flex-col justify-between p-6 w-64 items-end">
          {/* Top right - Arc reactor */}
          <div className="flex flex-col items-end gap-4">
            <HudArcReactor />
            <HudQuickLinks />
          </div>

          {/* Bottom right - Weather */}
          <div className="flex flex-col items-end gap-4">
            <div className="text-right">
              <p className="text-xs font-mono text-primary/50 tracking-wider mb-2">
                KARTIK'S SYSTEM
              </p>
            </div>
            <HudWeather />
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>
  );
};

export default Index;
