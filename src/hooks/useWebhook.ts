import { useState, useCallback } from "react";

interface UseWebhookProps {
  webhookUrl: string;
}

interface WebhookResponse {
  message?: string;
  response?: string;
  text?: string;
  [key: string]: unknown;
}

export function useWebhook({ webhookUrl }: UseWebhookProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (message: string): Promise<string | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
            timestamp: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: WebhookResponse = await response.json();
        
        // Try to extract the response message from various possible formats
        const responseMessage = 
          data.message || 
          data.response || 
          data.text || 
          JSON.stringify(data);

        return responseMessage;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        console.error("Webhook error:", err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [webhookUrl]
  );

  return {
    sendMessage,
    isLoading,
    error,
  };
}
