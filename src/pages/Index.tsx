import { useState, useRef, useEffect } from "react";
import { JarvisHeader } from "@/components/JarvisHeader";
import { VoiceButton } from "@/components/VoiceButton";
import { ChatMessage } from "@/components/ChatMessage";
import { TypingIndicator } from "@/components/TypingIndicator";
import { StatusIndicator } from "@/components/StatusIndicator";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const { sendMessage, isLoading } = useWebhook({ webhookUrl: WEBHOOK_URL });

  const handleTranscript = async (transcript: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: transcript,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setStatus("processing");

    // Send to webhook
    const response = await sendMessage(transcript);

    if (response) {
      // Add Jarvis response
      const jarvisMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, jarvisMessage]);
      setStatus("idle");
    } else {
      // Simulated response for demo (remove when webhook is configured)
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

  // Update status when recording
  useEffect(() => {
    if (isRecording) {
      setStatus("listening");
    } else if (!isLoading && status === "listening") {
      setStatus("idle");
    }
  }, [isRecording, isLoading, status]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      {/* Header */}
      <JarvisHeader />

      {/* Main content */}
      <main className="flex flex-1 flex-col items-center px-4 pb-8">
        {/* Messages area */}
        <div className="w-full max-w-2xl flex-1 overflow-y-auto py-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <p className="text-muted-foreground text-sm max-w-md">
                Press the microphone button and speak to interact with Jarvis.
                Your voice will be transcribed and processed.
              </p>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Voice interaction area */}
        <div className="flex flex-col items-center gap-6 pt-8">
          <StatusIndicator status={status} />
          
          <VoiceButton
            isRecording={isRecording}
            isProcessing={isLoading}
            onClick={toggleRecording}
            disabled={!isSupported}
          />

          {!isSupported && (
            <p className="text-sm text-destructive text-center max-w-xs">
              Speech recognition is not supported in your browser. 
              Please try Chrome or Edge.
            </p>
          )}

          <p className="text-xs text-muted-foreground font-mono tracking-wider">
            {isRecording ? "TAP TO STOP" : "TAP TO SPEAK"}
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center">
        <p className="text-xs text-muted-foreground/50 font-mono">
          JARVIS v1.0 • Powered by ElevenLabs
        </p>
      </footer>
    </div>
  );
};

export default Index;
