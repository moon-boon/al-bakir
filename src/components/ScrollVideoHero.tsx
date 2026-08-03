import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import logoMarkSrc from "@/assets/logo-mark.png";

const MOBILE_QUERY = "(max-width: 767px)";

/**
 * Scroll-scrubbed construction time-lapse hero.
 *
 * The building assembles as the user scrolls. We drive video.currentTime from a
 * spring-smoothed scroll progress inside a single rAF loop (no React state per
 * frame, so no re-renders). The source is all-intra H.264, so every seek is
 * frame-accurate and instant -> buttery scrubbing.
 */
export default function ScrollVideoHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  // Portrait time-lapse on phones, landscape on everything else. Two
  // purpose-shot renders (not one video letterboxed) so mobile gets a real
  // full-bleed vertical scene instead of a cropped/letterboxed landscape one.
  // Default must match the server's render (no `window` there) exactly. If we
  // instead read matchMedia synchronously here, the client's *first* render
  // would already disagree with the SSR'd HTML - and React's hydration skips
  // reconciling a mismatched attribute permanently ("won't be patched up"),
  // leaving the wrong video src stuck forever. Setting it in an effect is a
  // real post-mount state change, which React patches into the DOM normally.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  // Buttery smoothing of the raw scroll progress. Near-critically-damped
  // (stiffness/damping/mass tuned so the settle has ~zero overshoot) so the
  // video never "rewinds" a hair after a fast flick, while still tracking
  // fast enough that it doesn't feel laggy behind the scroll.
  const progress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 34,
    mass: 1,
    restDelta: 0.0001,
  });

  // Overlay choreography (transforms only).
  const brandY = useTransform(progress, [0, 1], reduce ? [0, 0] : [0, -70]);
  const brandScale = useTransform(progress, [0, 0.9], reduce ? [1, 1] : [1, 0.82]);
  const brandOpacity = useTransform(progress, [0, 0.55, 0.8], [1, 1, 0]);
  const cueOpacity = useTransform(progress, [0, 0.12], [1, 0]);
  const taglineOpacity = useTransform(progress, [0.62, 0.82], [0, 1]);
  const taglineY = useTransform(progress, [0.62, 0.82], reduce ? [0, 0] : [24, 0]);
  const barScaleX = progress;

  // Drive the video from scroll.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();

    if (reduce) {
      // Static: show a mostly-built frame, no scrubbing.
      const showBuilt = () => {
        if (video.duration) video.currentTime = video.duration * 0.85;
      };
      if (video.readyState >= 1) showBuilt();
      else video.addEventListener("loadedmetadata", showBuilt, { once: true });
      return;
    }

    let raf = 0;
    let lastFrameIndex = -1;
    const supportsFastSeek = typeof video.fastSeek === "function";
    const SOURCE_FPS = 24; // matches the encoded time-lapse

    const loop = () => {
      const dur = video.duration;
      const p = progress.get();
      if (dur && !Number.isNaN(dur)) {
        // Quantize to the video's real frame grid. Seeking more precisely than
        // the source has frames is wasted work that can make decode stutter -
        // one seek per *actual* frame change is the smoothest possible playback.
        const totalFrames = Math.floor(dur * SOURCE_FPS) - 1; // headroom for the last frame
        const frameIndex = Math.round(Math.min(p, 1) * totalFrames);
        if (frameIndex !== lastFrameIndex) {
          const t = frameIndex / SOURCE_FPS;
          if (supportsFastSeek) video.fastSeek(t);
          else video.currentTime = t;
          lastFrameIndex = frameIndex;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // Re-run when the source swaps between the mobile/desktop renders (the
    // video element remounts via `key`, so this restarts against the fresh node).
  }, [progress, reduce, isMobile]);

  return (
    <div ref={wrapRef} id="top" className="relative h-[300vh] w-full">
      <div
        className="sticky top-0 h-[100dvh] w-full overflow-hidden"
        style={{ background: "linear-gradient(180deg, #b4b4b6 0%, #bebec0 52%, #c6c6c8 100%)" }}
      >
        {/* Feather the video edges into the matching grey so it reads as one
            continuous scene, not a video box. Both renders are proper full-frame
            shots for their own orientation (portrait for phones, landscape
            otherwise), so both can use plain object-fit: cover - no letterboxing
            or aspect-ratio gymnastics needed. */}
        <style>{`
          .hero-video-stage { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
          .hero-video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            -webkit-mask-image: radial-gradient(130% 118% at 50% 50%, #000 74%, transparent 100%);
            mask-image: radial-gradient(130% 118% at 50% 50%, #000 74%, transparent 100%);
          }
        `}</style>
        {/* Construction time-lapse: portrait render on phones, landscape elsewhere. */}
        <div className="hero-video-stage">
          <video
            key={isMobile ? "mobile" : "desktop"}
            ref={videoRef}
            className="hero-video"
            src={isMobile ? "/hero-construction-mobile.mp4" : "/hero-construction.mp4"}
            poster={isMobile ? "/hero-construction-mobile-poster.jpg" : "/hero-construction-poster.jpg"}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-hidden
          />
        </div>

        {/* Branded overlay */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
          <motion.div
            style={{ y: brandY, scale: brandScale, opacity: brandOpacity }}
            className="flex flex-col items-center"
          >
            <img
              src={logoMarkSrc}
              alt="Al Bakir"
              className="h-16 w-auto object-contain sm:h-20"
              style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.45)) drop-shadow(0 3px 10px rgba(0,0,0,0.3))" }}
            />
            <h1
              className="mt-6 font-display font-semibold tracking-[0.14em] text-white sm:tracking-[0.22em]"
              style={{
                fontSize: "clamp(2rem, 9vw, 6.5rem)",
                textShadow:
                  "0 1px 1px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.4), 0 4px 14px rgba(0,0,0,0.3)",
              }}
            >
              AL BAKIR
            </h1>
            <p
              className="mt-3 whitespace-nowrap text-[9.5px] font-medium uppercase tracking-[0.08em] text-white/85 sm:text-sm sm:tracking-[0.3em]"
              style={{ textShadow: "0 1px 1px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.35)" }}
            >
              Design · Construction · Real Estate
            </p>
          </motion.div>

          {/* Tagline appears as the build completes */}
          <motion.p
            style={{ opacity: taglineOpacity, y: taglineY, textShadow: "0 1px 1px rgba(0,0,0,0.5), 0 2px 10px rgba(0,0,0,0.35)" }}
            className="pointer-events-none absolute bottom-28 left-1/2 w-[90vw] max-w-3xl -translate-x-1/2 font-display text-2xl font-light italic text-white sm:text-3xl md:text-4xl"
          >
            From blueprint to handover, one trusted team.
          </motion.p>
        </div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity, textShadow: "0 1px 1px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.35)" }}
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-white/85"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll to build</span>
            <svg width="18" height="28" viewBox="0 0 24 40" className={reduce ? "" : "animate-bounce"}>
              <path d="M12 4v28M4 24l8 8 8-8" stroke="currentColor" strokeWidth="1.4" fill="none" />
            </svg>
          </div>
        </motion.div>

        {/* Build progress bar */}
        <div className="absolute inset-x-0 bottom-0 z-10 h-[3px] bg-black/15">
          <motion.div
            className="h-full origin-left bg-white"
            style={{ scaleX: barScaleX }}
          />
        </div>
      </div>
    </div>
  );
}
