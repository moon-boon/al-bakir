import { useReducedMotion } from "motion/react";
import { type ReactNode } from "react";

export default function Marquee({
  children,
  speed = 30,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={`group relative flex w-full overflow-hidden ${className}`}>
      <div
        className="flex shrink-0 items-center gap-12 pr-12 group-hover:[animation-play-state:paused]"
        style={{ animation: reduce ? "none" : `marquee ${speed}s linear infinite` }}
      >
        {children}
        {!reduce && children}
      </div>
    </div>
  );
}
