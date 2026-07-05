import type { ComponentPropsWithoutRef, ElementType } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

type Props<T extends ElementType> = {
  as?: T;
  strength?: number;
} & ComponentPropsWithoutRef<T>;

const springConfig = { stiffness: 300, damping: 22, mass: 0.4 };

const MOTION_TAGS = {
  a: motion.a,
  button: motion.button,
} as const;

export default function MagneticButton<T extends ElementType = "a">({
  as,
  strength = 14,
  children,
  onMouseMove,
  onMouseLeave,
  ...rest
}: Props<T>) {
  const tagName = (as || "a") as keyof typeof MOTION_TAGS;
  const MotionTag = MOTION_TAGS[tagName] ?? motion.a;
  const reduce = useReducedMotion();
  const touch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  const enabled = !reduce && !touch;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  return (
    <MotionTag
      {...(rest as object)}
      style={{ x: springX, y: springY, ...(rest as { style?: React.CSSProperties }).style }}
      whileTap={enabled ? { scale: 0.96 } : undefined}
      onMouseMove={(e: React.MouseEvent<HTMLElement>) => {
        onMouseMove?.(e);
        if (!enabled) return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientX - (r.left + r.width / 2)) / r.width) * strength);
        y.set(((e.clientY - (r.top + r.height / 2)) / r.height) * strength);
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
        onMouseLeave?.(e);
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </MotionTag>
  );
}
