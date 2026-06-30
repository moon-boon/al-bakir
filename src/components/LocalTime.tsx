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

  // Determine open status in Asia/Karachi time
  let isOpen = false;
  if (now) {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Karachi",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(now);

    const day = parts.find((p) => p.type === "weekday")?.value;
    const hour = parseInt(parts.find((p) => p.type === "hour")?.value ?? "0", 10);
    const minute = parseInt(parts.find((p) => p.type === "minute")?.value ?? "0", 10);
    const timeValue = hour + minute / 60;

    const isFriday = day === "Fri";
    isOpen = !isFriday && timeValue >= 9 && timeValue < 20;
  }

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
      <div className="mt-6 text-sm text-ink-dim">Mon–Thu, Sat–Sun: 9 AM – 8 PM / Fri closed</div>
    </div>
  );
}
