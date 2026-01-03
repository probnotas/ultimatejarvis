import { useWeather } from '@/hooks/useWeather';

export function HudWeather() {
  const { weather, isLoading } = useWeather();

  return (
    <div className="flex flex-col items-start gap-1 font-mono">
      {/* Location */}
      <div className="text-[10px] text-primary/60 tracking-widest uppercase">
        {weather?.location || 'Brampton'}
      </div>
      
      {/* Weather description */}
      <div className="text-[9px] text-muted-foreground tracking-wider">
        {isLoading ? 'Loading...' : weather?.description || '--'}
      </div>
      
      {/* Temperature display */}
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-primary">
          {isLoading ? '--' : weather?.temperature ?? '--'}
        </span>
        <span className="text-sm text-primary/70">°C</span>
      </div>

      {/* Feels like */}
      <div className="text-[9px] text-muted-foreground/70 tracking-wider">
        Feels like {isLoading ? '--' : weather?.feelsLike ?? '--'}°C
      </div>
    </div>
  );
}
