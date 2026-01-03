import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface WeatherData {
  temperature: number;
  feelsLike: number;
  description: string;
  location: string;
}

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;

    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.functions.invoke('get-weather');
        
        if (error) {
          throw error;
        }
        
        setWeather(data);
        setError(null);
        retryCount = 0;
      } catch (err) {
        console.error('Error fetching weather:', err);
        setError('Failed to fetch weather');
        
        // Retry on failure (useful during initial edge function deployment)
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(fetchWeather, 2000);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
    
    // Refresh weather every 10 minutes
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { weather, isLoading, error };
}
