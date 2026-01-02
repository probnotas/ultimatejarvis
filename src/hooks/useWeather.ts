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
    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.functions.invoke('get-weather');
        
        if (error) {
          throw error;
        }
        
        setWeather(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching weather:', err);
        setError('Failed to fetch weather');
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
