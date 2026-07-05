import { useEffect, useState } from "react";
import { useOpenStatus } from "@/hooks/use-open-status";

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

  const { isOpen } = useOpenStatus();
  const statusColor = isOpen ? "text-green" : "text-orange";
  const statusLabel = isOpen ? "OPEN NOW" : "CLOSED NOW";
  const statusDot = isOpen ? "bg-green" : "bg-orange";

  return (
    <div>
      <div className={`mb-3 flex items-center gap-2 text-[11px] font-medium tracking-[0.15em] ${statusColor}`}>
        <span className="relative flex h-2 w-2">
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${statusDot} opacity-70`} />
          <span className={`relative inline-flex h-2 w-2 rounded-full ${statusDot}`} />
        </span>
        {statusLabel}
      </div>
      <div className="font-display text-5xl font-semibold tabular-nums text-ink md:text-6xl">{fmt}</div>
      <div className="mt-2 text-xs uppercase tracking-[0.2em] text-ink-dim">Islamabad · PKT</div>
      <div className="mt-6 text-sm text-ink-dim">Open 24 hours daily, except Friday</div>
    </div>
  );
}
