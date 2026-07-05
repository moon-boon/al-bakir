import { useEffect, useState } from "react";

const TIMEZONE = "Asia/Karachi";

function computeIsOpen(now: Date): boolean {
  const day = new Intl.DateTimeFormat("en-GB", { timeZone: TIMEZONE, weekday: "short" }).format(now);
  return day !== "Fri";
}

export function useOpenStatus() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return { now, isOpen: now ? computeIsOpen(now) : false, timeZone: TIMEZONE };
}
