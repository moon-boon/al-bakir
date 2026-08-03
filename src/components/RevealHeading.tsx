import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";

type Line = { text: string; dim?: boolean };

const wordVariants = {
  hidden: { y: "115%", rotateX: 50, opacity: 0, filter: "blur(6px)" },
  shown: {
    y: "0%",
    rotateX: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/**
 * Kinetic statement heading: each word rises out of its own overflow mask,
 * un-rotating and un-blurring with a stagger. The in-view trigger lives on the
 * PARENT (variants + staggerChildren) - observing each word directly fails
 * because they start transformed out of their own mask, so their
 * IntersectionObservers never fire.
 */
export default function RevealHeading({ lines }: { lines: Line[] }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className="block"
      style={{ perspective: 800 }}
      initial={reduce ? "shown" : "hidden"}
      whileInView="shown"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.08 } } }}
    >
      {lines.map((line, li) => (
        <span key={li} className={`block ${line.dim ? "text-ink-dim" : ""}`}>
          {line.text.split(" ").map((word, wi, arr) => (
            <Fragment key={wi}>
              <span
                className="inline-block overflow-hidden align-bottom"
                style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}
              >
                <motion.span
                  className="inline-block"
                  style={{ transformOrigin: "center bottom", willChange: "transform, filter" }}
                  variants={wordVariants}
                >
                  {word}
                </motion.span>
              </span>
              {wi < arr.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </span>
      ))}
    </motion.span>
  );
}
