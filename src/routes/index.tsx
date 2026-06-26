import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import Bento from "@/components/Bento";
import FeaturedProjects from "@/components/FeaturedProjects";
import MagneticButton from "@/components/MagneticButton";
import Marquee from "@/components/Marquee";
import Counter from "@/components/Counter";
import ScrollHero from "@/components/ScrollHero";
import logoMarkAsset from "@/assets/logo-mark.png.asset.json";
import logoSrc from "@/assets/logo.png";
const logoMarkSrc = logoMarkAsset.url;



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
    const els = document.querySelectorAll(".fade-up:not(.is-visible)");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "#services", label: "Services" },
    { href: "#projects", label: "Projects" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-black/5" : ""
      }`}
      style={{ background: scrolled ? "rgba(255,255,255,0.85)" : "transparent", backdropFilter: scrolled ? "saturate(180%) blur(20px)" : "none" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3">
          <img src={logoMarkSrc} alt="Al Bakir" className="h-9 w-14 object-contain" />
          <div className="leading-tight">
            <div className="font-display text-base font-semibold tracking-tight text-ink">Al Bakir</div>
            <div className="text-[10px] tracking-[0.2em] text-ink-soft">PVT · LTD</div>
          </div>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-ink-dim transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
          <span className="ml-2 flex items-center gap-2 rounded-full border border-green/30 bg-green/5 px-3 py-1 text-[11px] font-medium text-green">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green" />
            </span>
            Open 24/7
          </span>
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
        <div className="fixed inset-0 top-0 z-40 flex flex-col items-center justify-center gap-8 bg-bg/95 backdrop-blur-xl md:hidden">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-4xl font-semibold text-ink"
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
      <div className="mx-auto max-w-6xl text-center">
        <div className="fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-xs font-medium text-ink-dim backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-blue" />
          Islamabad · Design · Build · Invest
        </div>
        <h1 className="fade-up font-display font-semibold leading-[0.95] tracking-[-0.035em] text-ink" style={{ fontSize: "clamp(3.25rem, 9vw, 7.5rem)" }}>
          Where Architecture
          <br />
          <span className="text-ink-dim">Meets Ambition.</span>
        </h1>
        <p className="fade-up mx-auto mt-8 max-w-xl text-lg leading-relaxed text-ink-dim">
          Design, construction and real estate — a single studio in Islamabad accountable from first sketch to final handover.
        </p>

        <div className="fade-up mt-10 flex flex-wrap items-center justify-center gap-3">
          <MagneticButton as="a" href="#contact" className="btn-primary">Start your project</MagneticButton>
          <a href="#projects" className="btn-ghost">View our work →</a>
        </div>

        <div className="fade-up mt-16 grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-6">
          {[
            { num: 4.8, dec: 1, label: "Google Rating", suffix: "" },
            { num: 27, dec: 0, label: "Reviews", suffix: "" },
            { num: 24, dec: 0, label: "Hour Service", suffix: "/7" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 px-2 sm:flex-row sm:gap-3">
              <span className="font-display text-3xl font-semibold leading-none text-ink tabular-nums">
                <Counter to={s.num} decimals={s.dec} suffix={s.suffix ?? ""} />
              </span>
              <span className="text-xs text-ink-dim">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <a href="#services" aria-label="Scroll" className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <svg width="22" height="36" viewBox="0 0 24 40" className="animate-bounce text-ink-soft">
          <path d="M12 4v28M4 24l8 8 8-8" stroke="currentColor" strokeWidth="1.4" fill="none" />
        </svg>
      </a>
    </section>
  );
}

function Stats() {
  const items = [
    { num: 12, suffix: "+", label: "Years active" },
    { num: 80, suffix: "+", label: "Projects delivered" },
    { num: 7, suffix: "", label: "Active sites" },
    { num: 4.8, dec: 1, suffix: "", label: "Google rating" },
  ];
  return (
    <section className="relative bg-bg px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="fade-up mb-14 max-w-2xl">
          <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim">By the numbers</div>
          <h2 className="font-display text-4xl font-semibold leading-[1.05] text-ink md:text-5xl">
            A decade of building, measured.
          </h2>
        </div>
        <div className="grid grid-cols-2 divide-x divide-y divide-black/10 border-y border-black/10 md:grid-cols-4 md:divide-y-0">
          {items.map((s) => (
            <div key={s.label} className="fade-up p-8 md:p-10">
              <div className="font-display text-5xl font-semibold tabular-nums text-ink md:text-6xl">
                <Counter to={s.num} decimals={s.dec ?? 0} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-sm text-ink-dim">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative bg-bg px-6 py-28 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-12 md:items-start">
        <div className="fade-up md:col-span-5">
          <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim">About the studio</div>
          <h2 className="font-display text-4xl font-semibold leading-[1.05] text-ink md:text-6xl">
            Where dreams<br />become true.
          </h2>
        </div>
        <div className="fade-up md:col-span-7 md:pt-4">
          <p className="text-xl leading-relaxed text-ink">
            Al Bakir Pvt Ltd is an Islamabad based practice working at the intersection of architecture,
            construction and real estate. We build from first principles, with a single team accountable
            from the first sketch to the final handover.
          </p>
          <p className="mt-6 text-base leading-relaxed text-ink-dim">
            Our work is shaped by Pakistani context, modern construction discipline and a refusal to
            compromise on detail. Open 24 hours, every day of the week.
          </p>

          <div className="mt-10 surface-card-elev p-6">
            <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-orange">Studio location</div>
            <div className="font-display text-xl font-semibold text-ink">B-17, Multi Gardens</div>
            <div className="text-sm text-ink-dim">A Block, Main Double Road, Islamabad, Pakistan</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RatingMarquee() {
  const items = ["4.8 / 5 on Google", "27 reviews", "Open 24 hours", "B-17 Islamabad", "Since 2012"];
  const dotColors = ["bg-blue", "bg-orange", "bg-green", "bg-ink", "bg-blue"];
  return (
    <section className="relative bg-bg-elev py-10">
      <Marquee speed={28}>
        {items.map((it, i) => (
          <span key={it} className="flex items-center gap-10 font-display text-3xl font-medium text-ink md:text-4xl">
            {it}
            <span className={`h-2 w-2 rotate-45 ${dotColors[i % dotColors.length]}`} />
          </span>
        ))}
      </Marquee>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative bg-bg-elev px-6 py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="fade-up mb-16 max-w-2xl">
          <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim">Get in touch</div>
          <h2 className="font-display text-4xl font-semibold leading-[1.05] text-ink md:text-6xl">
            Start your project.
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <div className="fade-up space-y-8">
            <div>
              <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim">Address</div>
              <div className="text-lg text-ink">A Block Main Double Road</div>
              <div className="text-lg text-ink">Multi Gardens B-17, Islamabad, Pakistan</div>
            </div>

            <div>
              <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim">Phone</div>
              <a href="tel:+923347402123" className="block py-1 text-lg text-ink transition-colors hover:text-blue-bright">
                <span className="mr-3 text-xs text-ink-dim">Primary</span>+92 334 7402123
              </a>
              <a href="tel:+923335116302" className="block py-1 text-lg text-ink transition-colors hover:text-blue-bright">
                <span className="mr-3 text-xs text-ink-dim">Secondary</span>+92 333 5116302
              </a>
            </div>

            <div>
              <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim">Website</div>
              <a href="https://bakirpvtltd.com" target="_blank" rel="noopener" className="text-lg text-blue-bright hover:underline">
                bakirpvtltd.com
              </a>
            </div>

            <div>
              <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim">Hours</div>
              <div className="surface-card overflow-hidden">
                {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((d) => (
                  <div key={d} className="flex items-center justify-between border-b border-black/5 px-5 py-2.5 last:border-0">
                    <span className="text-sm text-ink-dim">{d}</span>
                    <span className="text-sm font-medium text-green">Open 24 Hours</span>
                  </div>
                ))}
              </div>
            </div>

            <MagneticButton
              as="a"
              href="https://maps.google.com/?q=Al+Bakir+Pvt+Ltd+B-17+Islamabad"
              target="_blank"
              rel="noopener"
              className="btn-primary"
            >
              Open in Google Maps
            </MagneticButton>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="fade-up space-y-5 surface-card p-8"
          >
            {sent ? (
              <div className="flex min-h-[480px] flex-col items-center justify-center text-center">
                <svg viewBox="0 0 64 64" className="mb-6 h-20 w-20 text-green" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="32" cy="32" r="28" strokeDasharray="180" strokeDashoffset="0" style={{ animation: "draw 0.7s ease forwards" }} />
                  <path d="M20 33l8 8 16-18" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3 className="mb-2 font-display text-3xl font-semibold text-ink">Enquiry received</h3>
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
                    <label className="mb-2 block text-xs font-medium text-ink-dim">{f.label}</label>
                    <input
                      required
                      type={f.type}
                      name={f.name}
                      className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-blue-bright focus:ring-2 focus:ring-blue/20"
                    />
                  </div>
                ))}
                <div>
                  <label className="mb-2 block text-xs font-medium text-ink-dim">Project type</label>
                  <select
                    required
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-ink outline-none focus:border-blue-bright focus:ring-2 focus:ring-blue/20"
                  >
                    <option>Architecture</option>
                    <option>Construction</option>
                    <option>Real Estate</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-ink-dim">Message</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-ink outline-none focus:border-blue-bright focus:ring-2 focus:ring-blue/20"
                  />
                </div>
                <MagneticButton as="button" type="submit" className="btn-primary w-full">
                  Send Enquiry
                </MagneticButton>
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
    <footer className="relative border-t border-black/10 bg-bg px-6 py-16">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img src={logoMarkSrc} alt="" className="h-10 w-16 object-contain" />
            <div>
              <div className="font-display text-base font-semibold text-ink">Al Bakir</div>
              <div className="text-[10px] tracking-[0.2em] text-ink-soft">PVT · LTD</div>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm text-ink-dim">
            Where dreams become true. Architecture, construction and real estate based in Islamabad.
          </p>
        </div>
        <div>
          <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim">Quick links</div>
          <ul className="space-y-2 text-sm text-ink">
            <li><a href="#services" className="hover:text-blue-bright">Services</a></li>
            <li><a href="#projects" className="hover:text-blue-bright">Projects</a></li>
            <li><a href="#about" className="hover:text-blue-bright">About</a></li>
            <li><a href="#contact" className="hover:text-blue-bright">Contact</a></li>
          </ul>
        </div>
        <div>
          <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim">Contact</div>
          <ul className="space-y-2 text-sm text-ink">
            <li><a href="tel:+923347402123" className="hover:text-blue-bright">+92 334 7402123</a></li>
            <li><a href="tel:+923335116302" className="hover:text-blue-bright">+92 333 5116302</a></li>
            <li className="text-ink-dim">B-17 Multi Gardens, Islamabad</li>
            <li className="text-ink-dim">Open 24 hours, every day</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl text-xs text-ink-soft">
        © {new Date().getFullYear()} Al Bakir Pvt Ltd. All rights reserved.
      </div>
    </footer>
  );
}

function Index() {
  useReveal();
  return (
    <div className="relative min-h-screen bg-bg">
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: translateY(0);} }
        @keyframes draw { from { stroke-dashoffset: 180; } to { stroke-dashoffset: 0; } }
      `}</style>
      <BackgroundCanvas logoSrc={logoSrc} />
      <Nav />
      <main>
        <ScrollHero />
        <Bento />
        <FeaturedProjects />
        <Stats />
        <About />
        <RatingMarquee />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
