import { type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";

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

  // Kinetic lean: the band skews with scroll velocity and springs back upright.
  // Skew lives on a wrapper because the CSS marquee keyframes own `transform` on the track.
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { stiffness: 160, damping: 40, mass: 0.6 });
  const skewX = useTransform(smoothVelocity, [-1600, 1600], reduce ? [0, 0] : [7, -7]);

  return (
    <div className={`group relative w-full overflow-hidden ${className}`}>
      <motion.div className="flex w-full" style={{ skewX }}>
        <div
          className="flex shrink-0 items-center gap-12 pr-12 group-hover:[animation-play-state:paused]"
          style={{ animation: reduce ? "none" : `marquee ${speed}s linear infinite` }}
        >
          {children}
          {!reduce && children}
        </div>
      </motion.div>
    </div>
  );
}
