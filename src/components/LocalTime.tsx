import { useEffect, useState } from "react";

export default function LocalTime() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const fmt = now
    ? new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Karachi",
        hour12: false,
      }).format(now)
    : "--:--:--";
  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-[10px] tracking-[0.4em] text-green">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
        </span>
        OPEN NOW
      </div>
      <div className="font-display text-5xl tabular-nums text-ink md:text-6xl">{fmt}</div>
      <div className="mt-2 text-xs uppercase tracking-[0.3em] text-ink-dim">Islamabad · PKT</div>
      <div className="mt-6 text-sm text-ink-dim">24 hours a day, every day of the week.</div>
    </div>
  );
}
