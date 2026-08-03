import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Premium image entrance: the frame un-clips bottom-to-top (curtain wipe)
 * while the photo settles from a 1.25x zoom, then drifts with a gentle
 * scroll parallax inside its own frame.
 *
 * The in-view observer lives on an UNCLIPPED wrapper: Chromium reports a
 * fully clip-path'ed element as non-intersecting, so observing the clipped
 * node directly would never fire. Variants propagate the reveal down.
 */
export default function CurtainImage({
  src,
  delay = 0,
  children,
}: {
  src: string;
  delay?: number;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-5%", "5%"]);

  return (
    <motion.div
      ref={ref}
      className="absolute inset-0"
      initial={reduce ? "shown" : "hidden"}
      whileInView="shown"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div
        className="absolute inset-0 overflow-hidden"
        variants={{
          hidden: { clipPath: "inset(100% 0 0 0)" },
          shown: { clipPath: "inset(0% 0 0 0)", transition: { duration: 1.1, ease: [0.65, 0, 0.35, 1], delay } },
        }}
      >
        {/* Oversized inner layer gives the parallax drift room to move without exposing edges */}
        <motion.div
          className="absolute inset-x-0 -inset-y-[8%]"
          style={{ y }}
          variants={{
            hidden: { scale: 1.25 },
            shown: { scale: 1, transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1], delay } },
          }}
        >
          <img
            src={src}
            alt=""
            aria-hidden
            className="h-full w-full object-cover transition-[scale] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
        </motion.div>
        {children}
      </motion.div>
    </motion.div>
  );
}
