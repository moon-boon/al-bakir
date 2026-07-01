import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import Bento from "@/components/Bento";
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
      { title: "Al Bakir Pvt Ltd — Construction, Architecture & Real Estate, Islamabad" },
      { name: "description", content: "Integrated construction, architectural design, engineering, interior design and real estate in B-17 Islamabad. 50+ projects delivered, 4.8 on Google." },
      { property: "og:title", content: "Al Bakir Pvt Ltd — Where Dreams Become True" },
      { property: "og:description", content: "Design, construction and real estate services in Islamabad. One trusted team from concept to handover." },
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
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#services", label: "Services" },
    { href: "#values", label: "Values" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 bg-black/90 text-white backdrop-blur-md transition-all duration-300"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3">
          <img src={logoMarkSrc} alt="Al Bakir" className="h-9 w-14 object-contain" />
          <div className="leading-tight">
            <div className="font-display text-base font-semibold tracking-tight text-white">Al Bakir</div>
            <div className="text-[10px] tracking-[0.2em] text-white/70">PVT · LTD</div>
          </div>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-white/80 transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
          <span className="ml-2 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium text-white">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green" />
            </span>
            9 AM – 8 PM
          </span>
        </nav>
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`block h-px w-6 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-px w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block h-px w-6 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 top-0 z-40 flex flex-col items-center justify-center gap-8 bg-black/95 backdrop-blur-xl md:hidden">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-4xl font-semibold text-white"
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
            { num: 11, dec: 0, label: "Daily Hours", suffix: "" },
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
    { num: 50, suffix: "+", label: "Construction projects" },
    { num: 150, suffix: "+", label: "Design projects" },
    { num: 300, suffix: "+", label: "Property transactions" },
    { num: 80, suffix: "%", label: "Business from referrals" },
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
                <Counter to={s.num} decimals={0} suffix={s.suffix} />
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
            construction, engineering, interior design and real estate. We build from first principles,
            with a single team accountable from the first sketch to the final handover.
          </p>
          <p className="mt-6 text-base leading-relaxed text-ink-dim">
            Our work is shaped by Pakistani context, modern construction discipline and a refusal to
            compromise on detail. Open Monday–Thursday and Saturday–Sunday, 9 AM to 8 PM. Friday closed.
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

function VisionMission() {
  const mission = [
    "Deliver high-quality construction and engineering services.",
    "Create innovative architectural and interior design solutions.",
    "Build long-term relationships based on trust, integrity, and professionalism.",
    "Provide transparent and reliable real estate consultancy.",
    "Maximize value for homeowners, businesses, and investors.",
    "Continuously improve through innovation, technology, and skilled professionals.",
  ];
  return (
    <section className="relative bg-bg px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
        <div className="fade-up surface-card-elev relative overflow-hidden p-10">
          <span className="absolute inset-y-0 left-0 w-1 bg-blue" />
          <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-blue">Our vision</div>
          <h3 className="font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">
            Pakistan's most trusted integrated construction, design and real estate company.
          </h3>
          <p className="mt-6 text-base leading-relaxed text-ink-dim">
            Delivering innovative developments, sustainable solutions and exceptional customer experiences —
            at home and, in time, across borders.
          </p>
        </div>

        <div className="fade-up surface-card-elev relative overflow-hidden p-10">
          <span className="absolute inset-y-0 left-0 w-1 bg-orange" />
          <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-orange">Our mission</div>
          <ul className="space-y-4">
            {mission.map((m) => (
              <li key={m} className="flex items-start gap-3">
                <svg className="mt-1 h-5 w-5 flex-shrink-0 text-orange" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 10l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-base leading-relaxed text-ink">{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CoreValues() {
  const values = [
    { name: "Integrity", desc: "Every project handled with honesty, transparency and ethical practice." },
    { name: "Excellence", desc: "Superior workmanship, attention to detail and continuous improvement." },
    { name: "Innovation", desc: "Modern technology, creative thinking and efficient construction methods." },
    { name: "Customer commitment", desc: "Clients stay at the centre of every decision we make." },
    { name: "Teamwork", desc: "Collaboration and mutual respect that produce exceptional results." },
    { name: "Sustainability", desc: "Responsible construction that adds long-term environmental and economic value." },
  ];
  return (
    <section id="values" className="relative bg-bg-elev px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="fade-up mb-14 max-w-2xl">
          <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim">What we stand for</div>
          <h2 className="font-display text-4xl font-semibold leading-[1.05] text-ink md:text-5xl">
            Six values, one standard.
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
          {values.map((v, i) => (
            <div key={v.name} className="fade-up surface-card p-7">
              <div className="mb-5 font-display text-sm font-medium tabular-nums text-ink-soft">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="font-display text-xl font-semibold text-ink">{v.name}</div>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseApproach() {
  const reasons = [
    "Complete design-to-construction solutions",
    "Experienced architects & engineers",
    "Professional project management",
    "Transparent business practices",
    "Premium construction quality",
    "Innovative design solutions",
    "Timely project delivery",
    "Strong customer relationships",
    "Competitive pricing",
    "Dedicated after-sales support",
  ];
  const steps = [
    { title: "Consultation", desc: "Understanding client requirements, objectives and project vision." },
    { title: "Planning", desc: "Feasibility analysis, budgeting, scheduling and project planning." },
    { title: "Design", desc: "Architectural, engineering and interior design development." },
    { title: "Construction", desc: "Professional execution with strict quality control and safety." },
    { title: "Delivery", desc: "Timely project completion with comprehensive client support." },
  ];
  return (
    <section className="relative bg-bg px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2">
        <div className="fade-up">
          <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-green">Why Al Bakir</div>
          <h2 className="font-display text-4xl font-semibold leading-[1.05] text-ink md:text-5xl">
            Ten reasons clients<br />stay with us.
          </h2>
          <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {reasons.map((r) => (
              <li key={r} className="flex items-start gap-3">
                <svg className="mt-1 h-4 w-4 flex-shrink-0 text-green" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M4 10l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm leading-relaxed text-ink">{r}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="fade-up">
          <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-blue">Our approach</div>
          <h2 className="font-display text-4xl font-semibold leading-[1.05] text-ink md:text-5xl">
            Five steps,<br />sketch to keys.
          </h2>
          <ol className="mt-10 space-y-6">
            {steps.map((s, i) => (
              <li key={s.title} className="flex items-start gap-5">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-ink font-display text-sm font-semibold text-white tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div className="font-display text-lg font-semibold text-ink">{s.title}</div>
                  <div className="mt-1 text-sm leading-relaxed text-ink-dim">{s.desc}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function RatingMarquee() {
  const items = ["4.8 / 5 on Google", "27 reviews", "Mon–Thu, Sat–Sun 9 AM – 8 PM", "B-17 Islamabad", "Since 2012"];
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

const socials = [
  { name: "Facebook", href: "#", path: "M13 22v-8h3l1-4h-4V7.5c0-1.1.4-2 2-2h2V2h-3c-3 0-5 1.8-5 5v3H6v4h3v8h4z" },
  { name: "Instagram", href: "#", path: "M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5a4 4 0 100 8 4 4 0 000-8zm5-1.5a1 1 0 100 2 1 1 0 000-2z" },
  { name: "YouTube", href: "#", path: "M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15V9l5 3-5 3z" },
  { name: "TikTok", href: "#", path: "M16 3c.4 2.2 1.8 3.9 4 4.3v3c-1.6 0-3-.4-4.3-1.2v6.4a5.5 5.5 0 11-5.5-5.5c.3 0 .6 0 .9.1v3.1a2.5 2.5 0 102 2.4V3h2.9z" },
];

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
              <a href="tel:+92512765184" className="block py-1 text-lg text-ink transition-colors hover:text-blue-bright">
                <span className="mr-3 text-xs text-ink-dim">Landline</span>051 2765184
              </a>
              <a href="tel:+923347402123" className="block py-1 text-lg text-ink transition-colors hover:text-blue-bright">
                <span className="mr-3 text-xs text-ink-dim">Primary</span>+92 334 7402123
              </a>
              <a href="tel:+923335116302" className="block py-1 text-lg text-ink transition-colors hover:text-blue-bright">
                <span className="mr-3 text-xs text-ink-dim">Secondary</span>+92 333 5116302
              </a>
            </div>

            <div>
              <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim">Email</div>
              <a href="mailto:Bakirassociates@gmail.com" className="block text-lg text-ink transition-colors hover:text-blue-bright">
                Bakirassociates@gmail.com
              </a>
            </div>

            <div>
              <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim">Follow</div>
              {/* TODO: replace href="#" with real social URLs */}
              <div className="flex items-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={s.name}
                    target="_blank"
                    rel="noopener"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-ink transition-colors hover:border-blue-bright hover:text-blue-bright"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim">Hours</div>
              <div className="surface-card overflow-hidden">
                {[
                  { day: "Monday", hours: "9 AM – 8 PM" },
                  { day: "Tuesday", hours: "9 AM – 8 PM" },
                  { day: "Wednesday", hours: "9 AM – 8 PM" },
                  { day: "Thursday", hours: "9 AM – 8 PM" },
                  { day: "Friday", hours: "Closed" },
                  { day: "Saturday", hours: "9 AM – 8 PM" },
                  { day: "Sunday", hours: "9 AM – 8 PM" },
                ].map(({ day, hours }) => (
                  <div key={day} className="flex items-center justify-between border-b border-black/5 px-5 py-2.5 last:border-0">
                    <span className="text-sm text-ink-dim">{day}</span>
                    <span className={`text-sm font-medium ${hours === "Closed" ? "text-orange" : "text-green"}`}>{hours}</span>
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
          {/* TODO: replace href="#" with real social URLs */}
          <div className="mt-5 flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.name}
                target="_blank"
                rel="noopener"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-ink-dim transition-colors hover:border-blue-bright hover:text-blue-bright"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim">Quick links</div>
          <ul className="space-y-2 text-sm text-ink">
            <li><a href="#services" className="hover:text-blue-bright">Services</a></li>
            <li><a href="#values" className="hover:text-blue-bright">Values</a></li>
            <li><a href="#about" className="hover:text-blue-bright">About</a></li>
            <li><a href="#contact" className="hover:text-blue-bright">Contact</a></li>
          </ul>
        </div>
        <div>
          <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim">Contact</div>
          <ul className="space-y-2 text-sm text-ink">
            <li><a href="tel:+92512765184" className="hover:text-blue-bright">051 2765184</a></li>
            <li><a href="tel:+923347402123" className="hover:text-blue-bright">+92 334 7402123</a></li>
            <li><a href="tel:+923335116302" className="hover:text-blue-bright">+92 333 5116302</a></li>
            <li><a href="mailto:Bakirassociates@gmail.com" className="hover:text-blue-bright">Bakirassociates@gmail.com</a></li>
            <li className="text-ink-dim">B-17 Multi Gardens, Islamabad</li>
            <li className="text-ink-dim">Mon–Thu, Sat–Sun 9 AM – 8 PM / Fri closed</li>
          </ul>
        </div>
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
        <Stats />
        <About />
        <VisionMission />
        <CoreValues />
        <WhyChooseApproach />
        <RatingMarquee />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
