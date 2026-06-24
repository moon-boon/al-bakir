import { useEffect, useRef } from "react";

// Continuous particle field + scroll-driven logo formation in the background.
export default function BackgroundCanvas({ logoSrc }: { logoSrc: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const logoParticlesRef = useRef<{ tx: number; ty: number; sx: number; sy: number; c: string; delay: number }[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Sample logo pixels for formation effect
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = logoSrc;
    img.onload = () => {
      const off = document.createElement("canvas");
      const size = 220;
      off.width = size;
      off.height = size;
      const octx = off.getContext("2d")!;
      octx.drawImage(img, 0, 0, size, size);
      const data = octx.getImageData(0, 0, size, size).data;

      // Only sample the icon area (top portion), skip the "Al-Bakir" text below.
      const iconMaxY = Math.floor(size * 0.55);

      const colorAt = (x: number, y: number): string | null => {
        const i = (y * size + x) * 4;
        const a = data[i + 3];
        if (a < 120) return null;
        const r = data[i], g = data[i + 1], b = data[i + 2];
        if (r > 180 && g < 130) return "rgba(255,150,70,0.9)";
        if (g > 140 && r < 160 && b < 160) return "rgba(110,230,160,0.9)";
        if (r < 90 && g < 90 && b < 90) return "rgba(255,255,255,0.85)";
        return "rgba(125,200,255,0.9)";
      };

      const targets: { tx: number; ty: number; c: string }[] = [];
      const step = 3;
      for (let y = 0; y < iconMaxY; y += step) {
        for (let x = 0; x < size; x += step) {
          const c = colorAt(x, y);
          if (c) targets.push({ tx: x, ty: y, c });
        }
      }

      // Give each target a random starting position (off-screen scatter) + delay.
      logoParticlesRef.current = targets.map((t) => ({
        tx: t.tx,
        ty: t.ty,
        sx: (Math.random() - 0.5) * 2,
        sy: (Math.random() - 0.5) * 2,
        c: t.c,
        delay: Math.random() * 0.5,
      }));
    };

    const particleCount = Math.min(110, Math.floor((w * h) / 16000));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.8 + 0.4,
      shape: Math.floor(Math.random() * 3),
      hue: Math.random(),
    }));

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf = 0;
    let t = 0;
    const draw = () => {
      t += 0.005;
      ctx.clearRect(0, 0, w, h);

      // Radial vignette at top-center
      const grad = ctx.createRadialGradient(w / 2, 0, 0, w / 2, 0, h * 0.9);
      grad.addColorStop(0, "rgba(125,200,255,0.10)");
      grad.addColorStop(0.5, "rgba(255,150,70,0.04)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Diagonal blueprint lines
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate((15 * Math.PI) / 180);
      ctx.strokeStyle = "rgba(125,200,255,0.05)";
      ctx.lineWidth = 1;
      const span = Math.max(w, h) * 1.5;
      const offset = (t * 20) % 60;
      for (let i = -span; i < span; i += 60) {
        ctx.beginPath();
        ctx.moveTo(i + offset, -span);
        ctx.lineTo(i + offset, span);
        ctx.stroke();
      }
      ctx.restore();

      // Particles
      if (!reduced) {
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;
        });
      }

      // Connection lines
      ctx.strokeStyle = "rgba(125,200,255,0.18)";
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 130 * 130) {
            ctx.globalAlpha = 1 - d2 / (130 * 130);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      // Draw particles
      particles.forEach((p) => {
        const palette = ["rgba(125,200,255,0.85)", "rgba(255,150,70,0.7)", "rgba(110,230,160,0.7)", "rgba(255,255,255,0.6)"];
        ctx.fillStyle = palette[Math.floor(p.hue * palette.length)];
        ctx.strokeStyle = ctx.fillStyle;
        if (p.shape === 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 1) {
          ctx.lineWidth = 1;
          ctx.strokeRect(p.x - p.r * 2, p.y - p.r * 2, p.r * 4, p.r * 4);
        } else {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(Math.PI / 4);
          ctx.lineWidth = 1;
          ctx.strokeRect(-p.r * 2, -p.r * 2, p.r * 4, p.r * 4);
          ctx.restore();
        }
      });

      // Logo formation — particles gathering into the icon shape.
      const lp = logoParticlesRef.current;
      if (lp.length) {
        const progress = Math.min(1, Math.max(0, (scrollRef.current - 0.02) * 1.4));
        const logoSize = Math.min(w * 0.95, h * 0.9, 880);
        const scale = logoSize / 220;
        const cx = w / 2 - logoSize / 2;
        const cy = h / 2 - logoSize / 2;
        const scatterX = w * 0.6;
        const scatterY = h * 0.5;
        const centerX = w / 2;
        const centerY = h / 2;
        const pulse = 0.7 + 0.3 * Math.sin(t * 2.5);

        ctx.save();
        ctx.shadowBlur = 4 + 3 * pulse;
        const ease = (x: number) => 1 - Math.pow(1 - x, 3);
        for (let i = 0; i < lp.length; i++) {
          const p = lp[i];
          const local = Math.min(1, Math.max(0, (progress - p.delay) / (1 - p.delay)));
          const k = ease(local);
          const startX = centerX + p.sx * scatterX;
          const startY = centerY + p.sy * scatterY;
          const endX = cx + p.tx * scale;
          const endY = cy + p.ty * scale;
          // soft drift while still scattered
          const drift = (1 - k) * 6;
          const ox = Math.sin(t * 1.5 + i) * drift;
          const oy = Math.cos(t * 1.5 + i * 0.7) * drift;
          const x = startX + (endX - startX) * k + ox;
          const y = startY + (endY - startY) * k + oy;
          ctx.globalAlpha = 0.25 + 0.7 * k;
          ctx.fillStyle = p.c;
          ctx.shadowColor = p.c;
          ctx.beginPath();
          ctx.arc(x, y, 1.3 + 0.6 * k, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [logoSrc]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-full w-full"
      style={{ background: "#080808" }}
      aria-hidden
    />
  );
}
