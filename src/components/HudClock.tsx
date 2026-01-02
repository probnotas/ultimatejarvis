import { useEffect, useState } from "react";

export function HudClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  
  const day = time.getDate();
  const month = time.toLocaleString('default', { month: 'long' }).toLowerCase();
  const weekday = time.toLocaleString('default', { weekday: 'long' }).toLowerCase();

  return (
    <div className="flex flex-col items-start gap-2">
      {/* Month label */}
      <div className="relative">
        <div className="text-[10px] font-mono text-primary/70 tracking-widest uppercase">
          {month}
        </div>
      </div>
      
      {/* Day number with frame */}
      <div className="relative">
        <div className="border-2 border-primary/60 rounded-lg px-4 py-2 bg-primary/5">
          <span className="text-4xl font-mono font-bold text-primary tracking-wider">
            {day.toString().padStart(2, "0")}
          </span>
        </div>
        {/* Corner accents */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-primary" />
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-primary" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-primary" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-primary" />
      </div>

      {/* Weekday */}
      <div className="text-xs font-mono text-muted-foreground tracking-widest pl-1">
        {weekday}
      </div>

      {/* Time */}
      <div className="font-mono text-xl text-primary/80 tracking-wider mt-2">
        {hours}:{minutes}:{seconds}
      </div>
    </div>
  );
}
