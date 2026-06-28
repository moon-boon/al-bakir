import { useEffect, useRef, useState } from "react";
import logoAsset from "@/assets/logo-mark.png.asset.json";
import houseLeftAsset from "@/assets/house-left.png.asset.json";
import houseRightAsset from "@/assets/house-right.png.asset.json";
const logoSrc = logoAsset.url;
const houseLeftSrc = houseLeftAsset.url;
const houseRightSrc = houseRightAsset.url;


const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function ScrollHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [vp, setVp] = useState({ w: 1280, h: 800 });


  useEffect(() => {
    let raf = 0;
    let target = 0;
    let current = 0;
    const tick = () => {
      current = lerp(current, target, 0.12);
      setP(current);
      if (Math.abs(target - current) > 0.0005) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = clamp(-rect.top / Math.max(1, total));
      target = scrolled;
      setVp({ w: window.innerWidth, h: window.innerHeight });

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Phases
  const namePhase = clamp((p - 0.55) / 0.15); // name reaches top exactly when slogan begins
  const logoPhase = clamp((p - 0.18) / 0.42); // logo shrinks to top
  const sloganPhase = clamp((p - 0.7) / 0.25); // slogan fades in

  // Logo transform: starts centered, ends top-left small
  const logoSize = lerp(180, 40, logoPhase);
  const logoTranslateY = lerp(0, -(vp.h / 2 - 56), logoPhase);
  const logoTranslateX = lerp(0, -(vp.w / 2 - 80), logoPhase);

  // Name moves to top and shrinks instead of fading out
  const nameOpacity = 1 - namePhase * 0.4;
  const nameScale = 1 - namePhase * 0.65;
  const nameTranslateY = namePhase * -(vp.h / 2 - 90);
  const nameTranslateX = 0;

  const sloganOpacity = sloganPhase;
  const sloganTranslate = (1 - sloganPhase) * 40;

  // Buildings rotate with scroll
  const rotL = p * 35; // degrees
  const rotR = -p * 35;
  const buildingY = p * -60;

  return (
    <div ref={wrapRef} className="relative h-[220vh] w-full" id="top">
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Gradient background — navy → purple → gold */}
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
        {/* Particles (CSS only) */}
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
                animation: `floaty ${8 + (i % 5) * 2}s ease-in-out ${i * 0.2}s infinite alternate`,
                opacity: 0.4 + ((i * 13) % 50) / 100,
              }}
            />
          ))}
        </div>

        {/* 3D Buildings — left */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 md:block"
          style={{ perspective: "1200px", transform: `translateY(calc(-50% + ${buildingY}px))` }}
        >
          <BuildingCluster rotate={rotL} side="left" />
        </div>
        {/* 3D Buildings — right */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 md:block"
          style={{ perspective: "1200px", transform: `translateY(calc(-50% + ${buildingY}px))` }}
        >
          <BuildingCluster rotate={rotR} side="right" />
        </div>

        {/* Center stage */}
        <div className="relative z-10 flex h-full w-full items-center justify-center px-6">
          <div className="relative flex flex-col items-center text-center">
            {/* Logo (mark only, transparent) */}
            <div
              style={{
                transform: `translate3d(${logoTranslateX}px, ${logoTranslateY}px, 0)`,
                width: `${logoSize * 1.55}px`,
                height: `${logoSize}px`,
                transition: "width 0.05s linear, height 0.05s linear",
                willChange: "transform, width, height",
              }}
              className="relative flex items-center justify-center"
            >
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse, rgba(255,200,120,0.35) 0%, rgba(120,80,220,0.18) 45%, transparent 70%)",
                  filter: "blur(28px)",
                  opacity: 1 - logoPhase * 0.7,
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
            </div>

            {/* Brand name */}
            <h1
              className="mt-8 font-display font-semibold tracking-[0.18em] text-white"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 6.5rem)",
                opacity: nameOpacity,
                transform: `translate3d(${nameTranslateX}px, ${nameTranslateY}px, 0) scale(${nameScale})`,
                textShadow: "0 4px 30px rgba(0,0,0,0.4)",
                willChange: "transform, opacity",
              }}
            >
              AL BAKIR
            </h1>
          </div>

          {/* Slogan — pinned to sticky stage center, independent of stack */}
          <p
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 w-[92vw] max-w-4xl px-6 text-center font-display italic text-white/95"
            style={{
              fontSize: "clamp(1.8rem, 5vw, 4rem)",
              fontWeight: 300,
              letterSpacing: "0.01em",
              opacity: sloganOpacity,
              transform: `translate(-50%, calc(-50% + ${sloganTranslate}px))`,
              textShadow: "0 8px 50px rgba(0,0,0,0.55), 0 2px 12px rgba(0,0,0,0.35)",
              willChange: "transform, opacity",
            }}
          >
            Where Dreams Become True
          </p>
        </div>


        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70"
          style={{ opacity: 1 - p * 2 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <svg width="18" height="28" viewBox="0 0 24 40" className="animate-bounce">
              <path d="M12 4v28M4 24l8 8 8-8" stroke="currentColor" strokeWidth="1.4" fill="none" />
            </svg>
          </div>
        </div>
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
      `}</style>
    </div>
  );
}

function BuildingCluster({ rotate, side }: { rotate: number; side: "left" | "right" }) {
  const src = side === "left" ? houseLeftSrc : houseRightSrc;
  return (
    <div
      className="relative h-[80vh] w-[36vw]"
      style={{
        transform: `perspective(1400px) rotateY(${rotate}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.15s linear",
      }}
    >
      <img
        src={src}
        alt=""
        className="absolute inset-0 h-full w-full object-contain"
        style={{
          filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.55)) drop-shadow(0 0 40px rgba(99,52,201,0.25))",
        }}
      />
    </div>
  );
}

function _UnusedBuilding({
  h,
  w,
  x,
  delay,
  accent,
}: {
  h: string;
  w: string;
  x: string;
  delay: number;
  accent?: boolean;
}) {
  return (
    <div
      className="absolute bottom-0"
      style={{
        height: h,
        width: w,
        left: x,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 60%, rgba(0,0,0,0.2) 100%)",
        border: "1px solid rgba(255,255,255,0.22)",
        boxShadow: accent
          ? "0 0 60px rgba(255,159,10,0.25), inset 0 0 30px rgba(99,52,201,0.2)"
          : "0 0 40px rgba(120,80,220,0.15)",
        animation: `heroIn 1.2s ${0.4 + delay}s ease-out both`,
        backdropFilter: "blur(2px)",
      }}
    >
      {/* Window grid */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "14px 22px",
        }}
      />
      {/* Lit windows */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: accent
            ? "radial-gradient(circle at 30% 40%, rgba(255,200,120,0.7) 1px, transparent 2px), radial-gradient(circle at 70% 65%, rgba(120,180,255,0.6) 1px, transparent 2px)"
            : "radial-gradient(circle at 50% 50%, rgba(255,200,120,0.5) 1px, transparent 2px)",
          backgroundSize: "28px 44px",
          mixBlendMode: "screen",
        }}
      />
      {/* Top edge */}
      <div
        className="absolute -top-1 left-0 right-0 h-1"
        style={{ background: accent ? "rgba(255,159,10,0.6)" : "rgba(255,255,255,0.3)" }}
      />
    </div>
  );
}
