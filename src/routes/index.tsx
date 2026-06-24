import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import logoSrc from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Al Bakir Pvt Ltd — Design, Construction & Real Estate, Islamabad" },
      { name: "description", content: "Architecture, construction and real estate in B-17 Islamabad. Open 24 hours. 4.8 rated on Google." },
      { property: "og:title", content: "Al Bakir Pvt Ltd — Where Dreams Become True" },
      { property: "og:description", content: "Design, construction and real estate services in Islamabad." },
    ],
  }),
  component: Index,
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-blue/20 backdrop-blur-xl" : ""
      }`}
      style={{ background: scrolled ? "rgba(10,10,10,0.85)" : "transparent" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#top" className="flex items-center gap-3">
          <img src={logoSrc} alt="Al Bakir" className="h-9 w-9 object-contain" />
          <div className="leading-tight">
            <div className="font-display text-lg tracking-[0.25em] text-blue-bright">AL BAKIR</div>
            <div className="text-[10px] tracking-[0.35em] text-ink-dim">PVT · LTD</div>
          </div>
        </a>
        <nav className="hidden gap-10 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium uppercase tracking-wider text-ink-dim transition-colors hover:text-orange">
              {l.label}
            </a>
          ))}
        </nav>
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`block h-px w-6 bg-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-px w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block h-px w-6 bg-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 top-0 z-40 flex flex-col items-center justify-center gap-8 bg-bg/95 md:hidden">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-4xl text-ink"
              style={{ animation: `fadeUp 0.4s ${i * 0.08}s both` }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center justify-center px-6 pt-24">
      <div className="mx-auto max-w-5xl text-center">
        <div className="fade-up mb-6 inline-block border border-blue/40 px-4 py-1.5 text-[10px] tracking-[0.4em] text-blue-bright">
          ISLAMABAD · EST. EXCELLENCE
        </div>
        <h1 className="fade-up font-display text-5xl leading-[1.05] sm:text-6xl md:text-[78px]">
          <span className="text-gradient-bw">Where Architecture</span>
          <br />
          <span className="text-gradient-bw">Meets Ambition</span>
        </h1>
        <p className="fade-up mx-auto mt-6 max-w-2xl text-sm tracking-[0.3em] text-ink-dim uppercase">
          Design · Construction · Real Estate · Islamabad
        </p>

        <div className="fade-up mt-10 flex flex-wrap items-center justify-center gap-4">
          {[
            { num: "4.8", label: "Google Rating", c: "text-blue-bright border-blue/40" },
            { num: "27", label: "Verified Reviews", c: "text-orange border-orange/40" },
            { num: "24/7", label: "Service Hours", c: "text-green border-green/40" },
          ].map((s) => (
            <div key={s.label} className={`flex items-center gap-3 border px-5 py-3 ${s.c}`}>
              <span className="font-display text-3xl leading-none">{s.num}</span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-ink-dim">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="fade-up mt-12 flex flex-wrap items-center justify-center gap-4">
          <a href="#contact" className="btn-primary">Start Your Project</a>
          <a href="#services" className="btn-ghost">View Our Work</a>
        </div>
      </div>

      <a href="#services" aria-label="Scroll" className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <svg width="24" height="40" viewBox="0 0 24 40" className="animate-bounce text-blue-bright">
          <path d="M12 4v28M4 24l8 8 8-8" stroke="currentColor" strokeWidth="1.4" fill="none" />
        </svg>
      </a>
    </section>
  );
}

const services = [
  {
    title: "Architecture & Design",
    desc: "Bespoke residential and commercial design rooted in context, climate and craft.",
    color: "blue-bright",
    icon: (
      <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="32" cy="20" r="4" />
        <path d="M32 24v8M14 56l18-24 18 24M22 44h20" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Construction",
    desc: "End to end build delivery with disciplined timelines and material integrity.",
    color: "orange",
    icon: (
      <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 56V28l24-16 24 16v28" strokeLinejoin="round" />
        <path d="M24 56V40h16v16M8 56h48" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Real Estate",
    desc: "Curated property opportunities across B-17 Islamabad and surrounding sectors.",
    color: "green",
    icon: (
      <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="22" cy="32" r="8" />
        <path d="M30 32h26l-6 6M50 38v6" strokeLinecap="round" />
      </svg>
    ),
  },
];

function Services() {
  return (
    <section id="services" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="fade-up mb-16 text-center">
          <div className="mb-4 text-[10px] tracking-[0.4em] text-orange">WHAT WE DO</div>
          <h2 className="font-display text-4xl md:text-6xl text-gradient-bw">Three disciplines, one studio</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <article
              key={s.title}
              className="fade-up group relative border border-blue/20 bg-black/40 p-10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-bright/60"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className={`mb-8 text-${s.color} transition-transform duration-500 group-hover:rotate-[6deg]`}>
                {s.icon}
              </div>
              <h3 className="mb-3 font-display text-2xl">{s.title}</h3>
              <p className="text-sm leading-relaxed text-ink-dim">{s.desc}</p>
              <div className="mt-8 text-[10px] tracking-[0.3em] text-blue-bright opacity-0 transition-opacity group-hover:opacity-100">
                ENQUIRE →
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const gridRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = gridRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const resize = () => {
      const r = c.getBoundingClientRect();
      c.width = r.width * 2;
      c.height = r.height * 2;
      ctx.scale(2, 2);
    };
    resize();
    let raf = 0, t = 0;
    const loop = () => {
      t += 0.01;
      const w = c.clientWidth, h = c.clientHeight;
      ctx.clearRect(0, 0, w, h);
      const step = 28;
      for (let x = 0; x < w; x += step) {
        for (let y = 0; y < h; y += step) {
          const dx = x - w / 2, dy = y - h / 2;
          const d = Math.sqrt(dx * dx + dy * dy);
          const o = 0.15 + 0.35 * Math.sin(t * 1.2 - d * 0.02);
          ctx.fillStyle = `rgba(125,200,255,${Math.max(0.05, o)})`;
          ctx.fillRect(x, y, 2, 2);
        }
      }
      // connecting lines
      ctx.strokeStyle = "rgba(255,150,70,0.25)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        const x1 = (Math.sin(t + i) * 0.5 + 0.5) * w;
        const y1 = (Math.cos(t * 0.7 + i) * 0.5 + 0.5) * h;
        const x2 = (Math.cos(t * 0.9 + i * 2) * 0.5 + 0.5) * w;
        const y2 = (Math.sin(t * 1.1 + i * 1.5) * 0.5 + 0.5) * h;
        ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2 md:items-center">
        <div className="fade-up relative aspect-square border border-blue/30 bg-black/40">
          <canvas ref={gridRef} className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <img src={logoSrc} alt="" className="h-40 w-40 object-contain opacity-90" />
          </div>
        </div>
        <div className="fade-up">
          <div className="mb-4 text-[10px] tracking-[0.4em] text-green">ABOUT THE STUDIO</div>
          <h2 className="mb-6 font-display text-4xl md:text-5xl text-gradient-bw">
            Where dreams become true
          </h2>
          <p className="mb-5 leading-relaxed text-ink-dim">
            Al Bakir Pvt Ltd is an Islamabad based practice working at the intersection of architecture,
            construction and real estate. We build from first principles, with a single team accountable
            from the first sketch to the final handover.
          </p>
          <p className="mb-8 leading-relaxed text-ink-dim">
            Our work is shaped by Pakistani context, modern construction discipline and a refusal to
            compromise on detail. Open 24 hours, every day of the week.
          </p>
          <div className="border border-orange/40 bg-black/40 p-6">
            <div className="mb-2 text-[10px] tracking-[0.3em] text-orange">STUDIO LOCATION</div>
            <div className="font-display text-xl">B-17, Multi Gardens</div>
            <div className="text-sm text-ink-dim">A Block, Main Double Road, Islamabad, Pakistan</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RatingBanner() {
  return (
    <section className="relative">
      <div className="bg-blue px-6 py-10 text-black">
        <div className="mx-auto grid max-w-7xl items-center gap-6 md:grid-cols-3">
          <div className="font-display text-7xl leading-none">4.8</div>
          <div className="text-center text-sm font-semibold uppercase tracking-[0.3em]">
            Rated on Google Maps by our clients
          </div>
          <div className="text-right font-display text-3xl">27 Reviews</div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="fade-up mb-16 text-center">
          <div className="mb-4 text-[10px] tracking-[0.4em] text-blue-bright">GET IN TOUCH</div>
          <h2 className="font-display text-4xl md:text-6xl text-gradient-bw">Start your project</h2>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <div className="fade-up space-y-8">
            <div>
              <div className="mb-2 text-[10px] tracking-[0.3em] text-orange">ADDRESS</div>
              <div className="text-lg">A Block Main Double Road, Block A</div>
              <div className="text-lg">Multi Gardens B-17, Islamabad, Pakistan</div>
            </div>

            <div>
              <div className="mb-3 text-[10px] tracking-[0.3em] text-green">PHONE</div>
              <a href="tel:+923347402123" className="block py-1 text-lg transition-colors hover:text-blue-bright">
                <span className="mr-3 text-xs uppercase tracking-widest text-ink-dim">Primary</span>+92 334 7402123
              </a>
              <a href="tel:+923335116302" className="block py-1 text-lg transition-colors hover:text-blue-bright">
                <span className="mr-3 text-xs uppercase tracking-widest text-ink-dim">Secondary</span>+92 333 5116302
              </a>
            </div>

            <div>
              <div className="mb-2 text-[10px] tracking-[0.3em] text-blue-bright">WEBSITE</div>
              <a href="https://bakirpvtltd.com" target="_blank" rel="noopener" className="text-lg hover:text-blue-bright">
                bakirpvtltd.com
              </a>
            </div>

            <div>
              <div className="mb-3 text-[10px] tracking-[0.3em] text-orange">HOURS</div>
              <div className="border border-blue/20 bg-black/40">
                {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((d) => (
                  <div key={d} className="flex items-center justify-between border-b border-blue/10 px-4 py-2 last:border-0">
                    <span className="text-sm text-ink-dim">{d}</span>
                    <span className="text-sm font-medium text-green">Open 24 Hours</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Al+Bakir+Pvt+Ltd+B-17+Islamabad"
              target="_blank"
              rel="noopener"
              className="btn-primary"
            >
              Open in Google Maps
            </a>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="fade-up space-y-5 border border-blue/30 bg-black/50 p-8 backdrop-blur-sm"
          >
            {sent ? (
              <div className="flex min-h-[480px] flex-col items-center justify-center text-center">
                <svg viewBox="0 0 64 64" className="mb-6 h-20 w-20 text-green" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="32" cy="32" r="28" strokeDasharray="180" strokeDashoffset="0" style={{ animation: "draw 0.7s ease forwards" }} />
                  <path d="M20 33l8 8 16-18" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3 className="mb-2 font-display text-3xl">Enquiry received</h3>
                <p className="text-ink-dim">We will be in touch within 24 hours.</p>
              </div>
            ) : (
              <>
                {[
                  { name: "name", label: "Name", type: "text" },
                  { name: "phone", label: "Phone", type: "tel" },
                  { name: "email", label: "Email", type: "email" },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="mb-2 block text-[10px] tracking-[0.3em] text-ink-dim">{f.label.toUpperCase()}</label>
                    <input
                      required
                      type={f.type}
                      name={f.name}
                      className="w-full border border-blue/30 bg-black/60 px-4 py-3 text-ink outline-none transition-colors focus:border-orange focus:ring-2 focus:ring-orange/40"
                    />
                  </div>
                ))}
                <div>
                  <label className="mb-2 block text-[10px] tracking-[0.3em] text-ink-dim">PROJECT TYPE</label>
                  <select
                    required
                    className="w-full border border-blue/30 bg-black/60 px-4 py-3 text-ink outline-none focus:border-orange focus:ring-2 focus:ring-orange/40"
                  >
                    <option>Architecture</option>
                    <option>Construction</option>
                    <option>Real Estate</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-[10px] tracking-[0.3em] text-ink-dim">MESSAGE</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full resize-none border border-blue/30 bg-black/60 px-4 py-3 text-ink outline-none focus:border-orange focus:ring-2 focus:ring-orange/40"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">Send Enquiry</button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-blue/20 px-6 py-16" style={{ background: "#050505" }}>
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img src={logoSrc} alt="" className="h-10 w-10 object-contain" />
            <div>
              <div className="font-display text-lg tracking-[0.25em] text-blue-bright">AL BAKIR</div>
              <div className="text-[10px] tracking-[0.35em] text-ink-dim">PVT · LTD</div>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm text-ink-dim">
            Where dreams become true. Architecture, construction and real estate based in Islamabad.
          </p>
        </div>
        <div>
          <div className="mb-4 text-[10px] tracking-[0.3em] text-orange">QUICK LINKS</div>
          <ul className="space-y-2 text-sm text-ink-dim">
            <li><a href="#services" className="hover:text-blue-bright">Services</a></li>
            <li><a href="#about" className="hover:text-blue-bright">About</a></li>
            <li><a href="#contact" className="hover:text-blue-bright">Contact</a></li>
            <li><a href="https://bakirpvtltd.com" target="_blank" rel="noopener" className="hover:text-blue-bright">bakirpvtltd.com</a></li>
          </ul>
        </div>
        <div>
          <div className="mb-4 text-[10px] tracking-[0.3em] text-green">CONTACT</div>
          <ul className="space-y-2 text-sm text-ink-dim">
            <li><a href="tel:+923347402123" className="hover:text-blue-bright">+92 334 7402123</a></li>
            <li><a href="tel:+923335116302" className="hover:text-blue-bright">+92 333 5116302</a></li>
            <li>B-17 Multi Gardens, Islamabad</li>
            <li>Open 24 hours, every day</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl text-xs text-ink-dim">
        © {new Date().getFullYear()} Al Bakir Pvt Ltd. All rights reserved.
      </div>
    </footer>
  );
}

function Index() {
  useReveal();
  return (
    <div className="relative min-h-screen">
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: translateY(0);} }
        @keyframes draw { from { stroke-dashoffset: 180; } to { stroke-dashoffset: 0; } }
      `}</style>
      <BackgroundCanvas logoSrc={logoSrc} />
      <Nav />
      <main>
        <Hero />
        <Services />
        <About />
        <RatingBanner />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
