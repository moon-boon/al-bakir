import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import logoSrc from "@/assets/logo-mark.png";

const Building3DScene = lazy(() => import("./Building3DScene"));

export default function ScrollHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [vp, setVp] = useState({ w: 1280, h: 800 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Scroll progress across the sticky stage, driven by Motion (no scroll listener, no per-frame React state).
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const springProgress = useSpring(scrollYProgress, { stiffness: 300, damping: 30, mass: 1 });
  const p = reduce ? scrollYProgress : springProgress;

  // Phases
  const namePhase = useTransform(p, [0.55, 0.7], [0, 1]);
  const logoPhase = useTransform(p, [0.18, 0.6], [0, 1]);
  const sloganPhase = useTransform(p, [0.7, 0.95], [0, 1]);

  // Logo transform: starts centered, ends top-left small
  const logoSize = useTransform(logoPhase, [0, 1], [180, 40]);
  const logoWidth = useTransform(logoSize, (s) => s * 1.55);
  const logoTranslateY = useTransform(logoPhase, [0, 1], [0, -(vp.h / 2 - 56)]);
  const logoTranslateX = useTransform(logoPhase, [0, 1], [0, -(vp.w / 2 - 80)]);
  const logoGlowOpacity = useTransform(logoPhase, [0, 1], [1, 0.3]);

  // Name moves to top and shrinks instead of fading out
  const nameOpacity = useTransform(namePhase, [0, 1], [1, 0.6]);
  const nameScale = useTransform(namePhase, [0, 1], [1, 0.35]);
  const nameTranslateY = useTransform(namePhase, [0, 1], [0, -(vp.h / 2 - 90)]);

  const sloganOpacity = sloganPhase;
  const sloganOffsetY = useTransform(sloganPhase, [0, 1], [40, 0]);
  const sloganY = useMotionTemplate`calc(-50% + ${sloganOffsetY}px)`;

  const scrollHintOpacity = useTransform(p, [0, 0.5], [1, 0]);

  // Aurora parallax: disabled under reduced motion (scroll-linked parallax can be disorienting).
  const blobATranslateY = useTransform(p, [0, 1], reduce ? [0, 0] : [0, -80]);
  const blobBTranslateY = useTransform(p, [0, 1], reduce ? [0, 0] : [0, 60]);
  const blobCTranslateY = useTransform(p, [0, 1], reduce ? [0, 0] : [0, -40]);

  // Skyline recedes as the wordmark and slogan phases take over, so it never fights with text legibility.
  const skylineOpacity = useTransform(p, [0, 0.45, 0.7], [0.4, 0.16, 0]);

  return (
    <div ref={wrapRef} className="relative h-[220vh] w-full" id="top">
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Gradient background - navy to purple to gold */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(99,52,201,0.55), transparent 60%)," +
              "radial-gradient(ellipse 70% 60% at 85% 30%, rgba(255,159,10,0.35), transparent 60%)," +
              "radial-gradient(ellipse 90% 70% at 50% 100%, rgba(10,15,40,0.9), transparent 70%)," +
              "linear-gradient(180deg, #0a0f28 0%, #1a1042 45%, #2a1654 75%, #3a1a3f 100%)",
          }}
        />
        {/* Mesh overlay */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, #000 30%, transparent 80%)",
          }}
        />
        {/* Particles (CSS only, paused under reduced motion) */}
        <div aria-hidden className="absolute inset-0">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className="absolute block rounded-full bg-white/40"
              style={{
                width: `${1 + (i % 3)}px`,
                height: `${1 + (i % 3)}px`,
                top: `${(i * 37) % 100}%`,
                left: `${(i * 53) % 100}%`,
                animation: reduce ? "none" : `floaty ${8 + (i % 5) * 2}s ease-in-out ${i * 0.2}s infinite alternate`,
                opacity: 0.4 + ((i * 13) % 50) / 100,
              }}
            />
          ))}
        </div>

        {/* Smooth animated aurora blobs - outer div carries scroll parallax (Motion), inner div carries idle drift (CSS keyframes), so the two transforms don't fight over the same property */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div className="absolute -left-[20%] top-[10%] h-[60vmax] w-[60vmax]" style={{ y: blobATranslateY }}>
            <div
              className="h-full w-full rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(99,52,201,0.55), transparent 65%)",
                filter: "blur(80px)",
                animation: reduce ? "none" : "blobA 22s ease-in-out infinite alternate",
              }}
            />
          </motion.div>
          <motion.div className="absolute -right-[15%] top-[30%] h-[55vmax] w-[55vmax]" style={{ y: blobBTranslateY }}>
            <div
              className="h-full w-full rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,159,10,0.40), transparent 65%)",
                filter: "blur(90px)",
                animation: reduce ? "none" : "blobB 26s ease-in-out infinite alternate",
              }}
            />
          </motion.div>
          <motion.div className="absolute left-[25%] bottom-[-20%] h-[55vmax] w-[55vmax]" style={{ y: blobCTranslateY }}>
            <div
              className="h-full w-full rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(10,132,255,0.35), transparent 65%)",
                filter: "blur(100px)",
                animation: reduce ? "none" : "blobC 30s ease-in-out infinite alternate",
              }}
            />
          </motion.div>
        </div>

        {/* 3D building skyline, lazy-loaded so the Three.js bundle never blocks hero LCP.
            Opacity is scroll-driven (skylineOpacity) so it never fights with slogan legibility. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-screen"
          style={{ opacity: skylineOpacity }}
        >
          <Suspense fallback={null}>
            <Building3DScene reduced={!!reduce} />
          </Suspense>
        </motion.div>

        {/* Center stage */}
        <div className="relative z-10 flex h-full w-full items-center justify-center px-6">
          <div className="relative flex flex-col items-center text-center">
            {/* Logo (mark only, transparent) */}
            <motion.div
              style={{
                x: logoTranslateX,
                y: logoTranslateY,
                width: logoWidth,
                height: logoSize,
              }}
              className="relative flex items-center justify-center"
            >
              <motion.div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse, rgba(255,200,120,0.35) 0%, rgba(120,80,220,0.18) 45%, transparent 70%)",
                  filter: "blur(28px)",
                  opacity: logoGlowOpacity,
                }}
              />
              <img
                src={logoSrc}
                alt="Al Bakir"
                className="relative h-full w-full object-contain"
                style={{
                  animation: "heroIn 1s 0.1s ease-out both",
                  filter: "drop-shadow(0 6px 24px rgba(0,0,0,0.45)) brightness(1.05)",
                }}
              />
            </motion.div>

            {/* Brand name */}
            <motion.h1
              className="text-flash mt-8 font-display font-semibold tracking-[0.18em]"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 6.5rem)",
                opacity: nameOpacity,
                y: nameTranslateY,
                scale: nameScale,
                filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.45))",
              }}
            >
              AL BAKIR
            </motion.h1>
          </div>

          {/* Slogan - pinned to sticky stage center, independent of stack */}
          <motion.p
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 w-[92vw] max-w-4xl px-6 text-center font-display italic text-white/95"
            style={{
              fontSize: "clamp(1.8rem, 5vw, 4rem)",
              fontWeight: 300,
              letterSpacing: "0.01em",
              opacity: sloganOpacity,
              x: "-50%",
              y: sloganY,
              textShadow: "0 8px 50px rgba(0,0,0,0.55), 0 2px 12px rgba(0,0,0,0.35)",
            }}
          >
            From blueprint to handover, one trusted team.
          </motion.p>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70"
          style={{ opacity: scrollHintOpacity }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <svg width="18" height="28" viewBox="0 0 24 40" className={reduce ? "" : "animate-bounce"}>
              <path d="M12 4v28M4 24l8 8 8-8" stroke="currentColor" strokeWidth="1.4" fill="none" />
            </svg>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes floaty {
          from { transform: translateY(0); }
          to { transform: translateY(-30px); }
        }
        @keyframes blobA {
          0% { transform: translate3d(0,0,0) scale(1); }
          100% { transform: translate3d(8vw,6vh,0) scale(1.15); }
        }
        @keyframes blobB {
          0% { transform: translate3d(0,0,0) scale(1.05); }
          100% { transform: translate3d(-6vw,-4vh,0) scale(0.95); }
        }
        @keyframes blobC {
          0% { transform: translate3d(0,0,0) scale(0.95); }
          100% { transform: translate3d(-5vw,-8vh,0) scale(1.2); }
        }
      `}</style>
    </div>
  );
}
