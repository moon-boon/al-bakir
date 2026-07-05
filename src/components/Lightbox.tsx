import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export default function Lightbox({
  title,
  images,
  onClose,
}: {
  title: string;
  images: string[];
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.25 }}
      onClick={onClose}
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="glass-dark absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:scale-110"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>

      <div className="mb-5 text-center text-sm font-medium uppercase tracking-[0.2em] text-white/70">
        {title} <span className="text-white/40">{index + 1} / {images.length}</span>
      </div>

      <div
        className="relative flex w-full max-w-5xl flex-1 items-center justify-center px-6"
        onClick={(e) => e.stopPropagation()}
      >
        {images.length > 1 && (
          <button
            aria-label="Previous image"
            onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
            className="glass-dark absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white transition hover:scale-110 sm:left-6"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        <div className="flex max-h-[75vh] w-full items-center justify-center overflow-hidden rounded-2xl">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={index}
              src={images[index]}
              alt={`${title}, photo ${index + 1}`}
              className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: reduce ? 0.01 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
          </AnimatePresence>
        </div>

        {images.length > 1 && (
          <button
            aria-label="Next image"
            onClick={() => setIndex((i) => (i + 1) % images.length)}
            className="glass-dark absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white transition hover:scale-110 sm:right-6"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-5 flex items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to photo ${i + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                setIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
