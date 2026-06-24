import { useEffect, useRef } from "react";

// Continuous particle field + scroll-driven logo formation in the background.
export default function BackgroundCanvas({ logoSrc }: { logoSrc: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const logoPointsRef = useRef<{ x: number; y: number; c: string }[]>([]);
  const logoLinksRef = useRef<{ a: number; b: number; c: string }[]>([]);

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
      const pts: { x: number; y: number; c: string }[] = [];
      const step = 4;
      for (let y = 0; y < size; y += step) {
        for (let x = 0; x < size; x += step) {
          const i = (y * size + x) * 4;
          const a = data[i + 3];
          if (a > 120) {
            const r = data[i], g = data[i + 1], b = data[i + 2];
            // map original logo palette toward our brand palette
            let c = "rgba(125,200,255,0.95)"; // blue default
            if (r > 180 && g < 130) c = "rgba(255,150,70,0.95)"; // orange
            else if (g > 140 && r < 160 && b < 160) c = "rgba(110,230,160,0.95)"; // green
            else if (r < 90 && g < 90 && b < 90) c = "rgba(255,255,255,0.85)"; // ink
            pts.push({ x, y, c });
          }
        }
      }
      logoPointsRef.current = pts;
      // Build links between nearby points (acts as line skeleton)
      const links: { a: number; b: number; c: string }[] = [];
      const maxD2 = (step * 2.4) * (step * 2.4);
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxD2) links.push({ a: i, b: j, c: pts[i].c });
        }
      }
      logoLinksRef.current = links;
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

      // Logo formation driven by scroll — lines, glowing, bigger
      const pts = logoPointsRef.current;
      const links = logoLinksRef.current;
      if (pts.length && links.length) {
        const progress = Math.min(1, Math.max(0, (scrollRef.current - 0.03) * 1.5));
        const logoSize = Math.min(w * 0.95, h * 0.95, 880);
        const scale = logoSize / 220;
        const cx = w / 2 - logoSize / 2;
        const cy = h / 2 - logoSize / 2;
        const visibleLinks = Math.floor(links.length * progress);
        const wobble = (1 - progress) * 24;
        const pulse = 0.6 + 0.4 * Math.sin(t * 3);

        ctx.save();
        ctx.shadowBlur = 18 + 10 * pulse;
        ctx.lineWidth = 1.4;
        ctx.globalAlpha = 0.35 + 0.6 * progress;
        for (let i = 0; i < visibleLinks; i++) {
          const l = links[i];
          const pa = pts[l.a], pb = pts[l.b];
          const ox1 = Math.sin(t * 1.8 + l.a) * wobble;
          const oy1 = Math.cos(t * 1.8 + l.a * 0.7) * wobble;
          const ox2 = Math.sin(t * 1.8 + l.b) * wobble;
          const oy2 = Math.cos(t * 1.8 + l.b * 0.7) * wobble;
          ctx.strokeStyle = l.c;
          ctx.shadowColor = l.c;
          ctx.beginPath();
          ctx.moveTo(cx + pa.x * scale + ox1, cy + pa.y * scale + oy1);
          ctx.lineTo(cx + pb.x * scale + ox2, cy + pb.y * scale + oy2);
          ctx.stroke();
        }
        // bright node accents
        ctx.shadowBlur = 22 * pulse;
        for (let i = 0; i < pts.length * progress; i++) {
          const p = pts[i];
          ctx.fillStyle = p.c;
          ctx.shadowColor = p.c;
          ctx.beginPath();
          ctx.arc(cx + p.x * scale, cy + p.y * scale, 1.6, 0, Math.PI * 2);
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
