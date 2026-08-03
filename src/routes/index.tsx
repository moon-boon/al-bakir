import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, Suspense, lazy } from "react";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import MagneticButton from "@/components/MagneticButton";
import Marquee from "@/components/Marquee";
import Counter from "@/components/Counter";
import RevealHeading from "@/components/RevealHeading";
import ScrollVideoHero from "@/components/ScrollVideoHero";
import LazyImage from "@/components/LazyImage";
import { useOpenStatus } from "@/hooks/use-open-status";
import logoMarkSrc from "@/assets/logo-mark.png";
import logoSrc from "@/assets/logo.png";

// Lazy load heavy components
const Bento = lazy(() => import("@/components/Bento"));
const LazyLeadership = lazy(() => import("@/components/Leadership"));

// Loading fallback
const ComponentFallback = () => <div className="h-96 bg-gray-100 animate-pulse" />;



export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Al Bakir Pvt Ltd, Construction, Architecture & Real Estate, Islamabad" },
      { name: "description", content: "Integrated construction, architectural design, engineering, interior design and real estate in B-17 Islamabad. 50+ projects delivered, 4.8 on Google." },
      { property: "og:title", content: "Al Bakir Pvt Ltd, Where Dreams Become True" },
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
      // Trigger a little before the element reaches the viewport edge so the
      // reveal finishes settling as it arrives, instead of animating in late.
      { threshold: 0.01, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Nav() {
  const [open, setOpen] = useState(false);
  const { isOpen } = useOpenStatus();
  const reduce = useReducedMotion();
  const links = [
    { href: "#services", label: "Services" },
    { href: "#values", label: "Values" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/40 text-white backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">
          <a href="#top" className="flex items-center gap-3">
            <LazyImage src={logoMarkSrc} alt="Al Bakir" className="h-8 w-12 object-contain sm:h-9 sm:w-14" width={56} height={36} loading="eager" />
            <div className="flex items-baseline gap-2">
              <span className="font-display text-base font-semibold tracking-tight text-white">Al Bakir</span>
              <span className="text-[10px] tracking-[0.2em] text-white/70">PVT · LTD</span>
            </div>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-white/80 transition-colors hover:text-white">
                {l.label}
              </a>
            ))}
            <span className="glass-dark ml-2 flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium text-white">
              <span className="relative flex h-1.5 w-1.5">
                <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-70 ${isOpen ? "bg-green" : "bg-orange"}`} />
                <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${isOpen ? "bg-green" : "bg-orange"}`} />
              </span>
              {isOpen ? "Open now" : "Closed now"}
            </span>
          </nav>
          <button
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="glass-dark flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl md:hidden"
          >
            <span className="block h-px w-6 bg-white" />
            <span className="block h-px w-6 bg-white" />
            <span className="block h-px w-6 bg-white" />
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu. Rendered OUTSIDE the header so the header's
          backdrop-filter does not become its containing block (that bug trapped
          the old overlay inside the thin top bar). */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Solid premium backdrop matching the hero */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 90% 55% at 25% 15%, rgba(99,52,201,0.5), transparent 60%)," +
                  "radial-gradient(ellipse 80% 55% at 85% 25%, rgba(255,159,10,0.28), transparent 60%)," +
                  "linear-gradient(180deg, #0a0f28 0%, #1a1042 60%, #2a1654 100%)",
              }}
            />

            <div className="relative flex h-full flex-col">
              {/* Menu top bar with logo + close */}
              <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <LazyImage src={logoMarkSrc} alt="Al Bakir" className="h-8 w-12 object-contain" width={48} height={32} loading="eager" />
                  <span className="font-display text-base font-semibold tracking-tight text-white">Al Bakir</span>
                </div>
                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="glass-dark flex h-10 w-10 items-center justify-center rounded-xl text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-1 flex-col justify-center px-6">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-white/10 py-5 font-display text-3xl font-semibold text-white transition-colors active:text-white/60"
                    initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.5, delay: reduce ? 0 : 0.12 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {l.label}
                    <svg viewBox="0 0 24 24" className="h-6 w-6 text-white/30" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.a>
                ))}
              </nav>

              {/* Footer: live status + primary CTA */}
              <motion.div
                className="space-y-5 px-6 pb-10"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                  <span className="relative flex h-2 w-2">
                    <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-70 ${isOpen ? "bg-green" : "bg-orange"}`} />
                    <span className={`relative inline-flex h-2 w-2 rounded-full ${isOpen ? "bg-green" : "bg-orange"}`} />
                  </span>
                  {isOpen ? "Open now" : "Closed now"}
                  <span className="text-white/40">· B-17 Islamabad</span>
                </div>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center rounded-full bg-white px-6 py-4 font-display text-base font-semibold text-ink transition-transform active:scale-[0.98]"
                >
                  Start your project
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function TrustStrip() {
  const stats = [
    { num: 4.8, dec: 1, label: "Google Rating" },
    { num: 24, dec: 0, label: "Daily Hours" },
  ];
  return (
    <section className="relative bg-bg px-6 py-14">
      <div className="fade-up mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 sm:gap-14">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <span className="font-display text-3xl font-semibold leading-none text-ink tabular-nums">
              <Counter to={s.num} decimals={s.dec} />
            </span>
            <span className="text-xs text-ink-dim">{s.label}</span>
          </div>
        ))}
        <div className="flex items-center gap-3">
          <MagneticButton as="a" href="#contact" className="btn-primary">Start your project</MagneticButton>
          <a href="#services" className="btn-ghost">View our work →</a>
        </div>
      </div>
    </section>
  );
}

const serviceGroups = [
  {
    title: "Construction",
    accentBar: "bg-blue",
    accentText: "text-blue-bright",
    items: ["Grey Structure Construction", "Turnkey Construction", "Renovation & Remodeling"],
  },
  {
    title: "Property types",
    accentBar: "bg-orange",
    accentText: "text-orange",
    items: ["Residential Homes", "Luxury Villas", "Farmhouses", "Commercial Buildings"],
  },
  {
    title: "Project delivery",
    accentBar: "bg-green",
    accentText: "text-green",
    items: ["Project Management", "Construction Supervision", "Cost Estimation", "Quantity Surveying"],
  },
];

const realEstateGroups = [
  {
    title: "Property services",
    accentBar: "bg-green",
    accentText: "text-green",
    items: ["Property Buying", "Property Selling", "Property Management", "Property Rentals"],
  },
  {
    title: "Project types",
    accentBar: "bg-blue",
    accentText: "text-blue-bright",
    items: ["Residential Projects", "Commercial Projects"],
  },
  {
    title: "Investment & marketing",
    accentBar: "bg-orange",
    accentText: "text-orange",
    items: ["Investment Consultancy", "Overseas Investment Guidance", "Project Marketing"],
  },
];

function ConstructionServices() {
  const reduce = useReducedMotion();
  return (
    <section id="construction-services" className="relative bg-bg px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-2xl">
          <h2 className="font-display text-4xl font-semibold leading-[1.05] text-ink md:text-5xl">
            <RevealHeading lines={[{ text: "Construction," }, { text: "covered end to end.", dim: true }]} />
          </h2>
        </div>
        <motion.div
          className="grid gap-10 md:grid-cols-3"
          initial={reduce ? "shown" : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.1 } } }}
        >
          {serviceGroups.map((g) => (
            <motion.div
              key={g.title}
              variants={{
                hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
                shown: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <div className={`mb-5 h-0.5 w-10 ${g.accentBar}`} />
              <h3 className={`font-display text-lg font-semibold ${g.accentText}`}>{g.title}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-black/10 bg-bg-elev px-4 py-2 text-sm text-ink transition-colors hover:border-black/20"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function RealEstateServices() {
  const reduce = useReducedMotion();
  return (
    <section id="real-estate-services" className="relative bg-bg-elev px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-2xl">
          <h2 className="font-display text-4xl font-semibold leading-[1.05] text-ink md:text-5xl">
            <RevealHeading lines={[{ text: "Real estate services." }]} />
          </h2>
          <p className="fade-up mt-5 max-w-[65ch] text-base leading-relaxed text-ink-dim">
            Our professional real estate team provides reliable consultancy and investment solutions,
            including dedicated support for overseas investment.
          </p>
        </div>
        <motion.div
          className="grid gap-10 md:grid-cols-3"
          initial={reduce ? "shown" : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.1 } } }}
        >
          {realEstateGroups.map((g) => (
            <motion.div
              key={g.title}
              variants={{
                hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
                shown: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <div className={`mb-5 h-0.5 w-10 ${g.accentBar}`} />
              <h3 className={`font-display text-lg font-semibold ${g.accentText}`}>{g.title}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-black/10 bg-bg px-4 py-2 text-sm text-ink transition-colors hover:border-black/20"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { num: 31, suffix: "+", label: "Active sites" },
    { num: 200, suffix: "+", label: "Design projects" },
    { num: 75, suffix: "+", label: "Delivered projects" },
    { num: 80, suffix: "%", label: "Business from referrals" },
  ];
  return (
    <section className="relative bg-bg px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-2xl">
          <h2 className="font-display text-4xl font-semibold leading-[1.05] text-ink md:text-5xl">
            <RevealHeading lines={[{ text: "A decade of building, measured." }]} />
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
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="fade-up mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim">About the studio</div>
          <h2 className="font-display text-4xl font-semibold leading-[1.05] text-ink md:text-6xl">
            <RevealHeading lines={[{ text: "Where dreams" }, { text: "become true." }]} />
          </h2>
          <p className="fade-up mt-8 text-xl leading-relaxed text-ink">
            Al Bakir Pvt Ltd is an Islamabad based practice working at the intersection of architecture,
            construction, engineering, interior design and real estate. We build from first principles,
            with a single team accountable from the first sketch to the final handover.
          </p>
          <p className="fade-up mt-6 max-w-[65ch] text-base leading-relaxed text-ink-dim">
            Our work is shaped by Pakistani context, modern construction discipline and a refusal to
            compromise on detail. Open 24 hours a day, every day except Friday.
          </p>
        </div>

        <div className="fade-up mt-10 inline-flex surface-card-elev p-6">
          <div>
            <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-orange">Head office</div>
            <div className="font-display text-xl font-semibold text-ink">Multi Gardens B-17</div>
            <div className="text-sm text-ink-dim">Islamabad, Pakistan</div>
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
          <h3 className="font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">
            Pakistan's most trusted integrated construction, design and real estate company.
          </h3>
          <p className="mt-6 text-base leading-relaxed text-ink-dim">
            Delivering innovative developments, sustainable solutions and exceptional customer experiences,
            at home and, in time, across borders.
          </p>
        </div>

        <div className="fade-up surface-card-elev relative overflow-hidden p-10">
          <span className="absolute inset-y-0 left-0 w-1 bg-orange" />
          <h3 className="mb-5 font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">
            Our mission
          </h3>
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
  const reduce = useReducedMotion();
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
          <h2 className="font-display text-4xl font-semibold leading-[1.05] text-ink md:text-5xl">
            Six values, one standard.
          </h2>
        </div>
        <motion.div
          className="grid grid-cols-2 gap-5 md:grid-cols-3"
          initial={reduce ? "shown" : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.08 } } }}
        >
          {values.map((v, i) => (
            <motion.div
              key={v.name}
              className="surface-card p-7"
              variants={{
                hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
                shown: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <div className="mb-5 font-display text-sm font-medium tabular-nums text-ink-soft">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="font-display text-xl font-semibold text-ink">{v.name}</div>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
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
  const items = ["4.8 / 5 on Google", "Open 24 hours, except Friday", "B-17 Islamabad", "Since 2012"];
  const dotColors = ["bg-blue", "bg-green", "bg-ink", "bg-blue"];
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

function EmapVerification() {
  const societies = ["Faisal Hills", "Multi Gardens B-17", "Faisal Margalla City (FMC)"];
  return (
    <section className="relative bg-bg-elev px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="fade-up surface-card-elev mx-auto max-w-3xl p-10 text-center md:p-14">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green/10 text-green">
            <svg className="h-6 w-6" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 10l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="font-display text-3xl font-semibold leading-[1.1] text-ink md:text-5xl">
            Verified on eMap.pk.
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-base leading-relaxed text-ink-dim">
            Al Bakir holds an exclusive eMap.pk subscription. We are the only agency authorized to publish
            verified listings for these societies.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {societies.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-bg px-4 py-2 text-sm font-medium text-ink"
              >
                <svg className="h-3.5 w-3.5 flex-shrink-0 text-green" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M4 10l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {s}
              </span>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-[48ch] text-sm leading-relaxed text-ink-dim">
            List with Al Bakir and your property reaches buyers already using eMap to research these exact
            locations.
          </p>
        </div>
      </div>
    </section>
  );
}

function InvestorOpportunities() {
  const points = [
    "Transparent reporting & disciplined governance",
    "Rigorous, milestone-driven project management",
    "Quality execution with a referral-led track record",
    "Residential, commercial & mixed-use opportunities",
  ];
  return (
    <section className="relative bg-bg px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="fade-up surface-card-elev p-10 md:p-14">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl font-semibold leading-[1.05] text-ink md:text-5xl">
              Investor opportunities.
            </h2>
            <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-ink-dim">
              We welcome partnerships with investors, developers, financial institutions and corporate
              organisations seeking reliable opportunities in Pakistan's growing construction and real
              estate sectors.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
            {points.map((p) => (
              <div key={p} className="flex items-start gap-3">
                <svg className="mt-1 h-5 w-5 flex-shrink-0 text-blue-bright" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 10l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-base leading-relaxed text-ink">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const socials: { name: string; href: string; path: string; fillRule?: "evenodd" }[] = [
  { name: "Facebook", href: "https://www.facebook.com/p/Al-Bakir-pvtltd-100075875230679/", path: "M13 22v-8h3l1-4h-4V7.5c0-1.1.4-2 2-2h2V2h-3c-3 0-5 1.8-5 5v3H6v4h3v8h4z" },
  { name: "Instagram", href: "https://www.instagram.com/al_bakir_pvt_ltd/", path: "M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5a4 4 0 100 8 4 4 0 000-8zm5-1.5a1 1 0 100 2 1 1 0 000-2z" },
  { name: "YouTube", href: "https://www.youtube.com/@al-bakirstudio?app=desktop", path: "M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15V9l5 3-5 3z" },
  { name: "TikTok", href: "https://www.tiktok.com/@albakirpvtltd", path: "M16 3c.4 2.2 1.8 3.9 4 4.3v3c-1.6 0-3-.4-4.3-1.2v6.4a5.5 5.5 0 11-5.5-5.5c.3 0 .6 0 .9.1v3.1a2.5 2.5 0 102 2.4V3h2.9z" },
  // Zameen.com: house silhouette with a Z knocked out (evenodd), echoing the brand mark.
  { name: "Zameen.com", href: "https://www.zameen.com/agents/Islamabad/AL-Bakir-pvt-ltd-196777/", fillRule: "evenodd", path: "M12 2 L22 11 L19 11 L19 22 L5 22 L5 11 L2 11 Z M8 11.5 H16 V12.75 L10.67 18.25 H16 V19.5 H8 V18.25 L13.33 12.75 H8 Z" },
];

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mlgyzwdn";

function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", phone: "", email: "", projectType: "Architecture", message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          projectType: form.projectType,
          message: form.message,
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative bg-bg-elev px-6 py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl">
          <h2 className="font-display text-4xl font-semibold leading-[1.05] text-ink md:text-6xl">
            <RevealHeading lines={[{ text: "Start your project." }]} />
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <div className="fade-up space-y-8">
            <div>
              <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim">Head office</div>
              <div className="text-lg text-ink">Multi Gardens B-17, Islamabad</div>
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
              <div className="flex items-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={s.name}
                    target="_blank"
                    rel="noopener"
                    className="glass-light flex h-10 w-10 items-center justify-center rounded-full text-ink hover:-translate-y-0.5 hover:text-blue-bright"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                      <path d={s.path} fillRule={s.fillRule} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim">Hours</div>
              <div className="surface-card overflow-hidden">
                {[
                  { day: "Monday", hours: "Open 24 hours" },
                  { day: "Tuesday", hours: "Open 24 hours" },
                  { day: "Wednesday", hours: "Open 24 hours" },
                  { day: "Thursday", hours: "Open 24 hours" },
                  { day: "Friday", hours: "Closed" },
                  { day: "Saturday", hours: "Open 24 hours" },
                  { day: "Sunday", hours: "Open 24 hours" },
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
            onSubmit={handleSubmit}
            className="fade-up space-y-5 surface-card p-8"
          >
            {status === "sent" ? (
              <div className="flex min-h-[480px] flex-col items-center justify-center text-center">
                <svg viewBox="0 0 64 64" className="mb-6 h-20 w-20 text-green" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="32" cy="32" r="28" strokeDasharray="180" strokeDashoffset="0" style={{ animation: "draw 0.7s ease forwards" }} />
                  <path d="M20 33l8 8 16-18" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3 className="mb-2 font-display text-3xl font-semibold text-ink">Enquiry received</h3>
                <p className="text-ink-dim">Thanks, {form.name.split(" ")[0]}. We will be in touch within 24 hours.</p>
              </div>
            ) : (
              <>
                {[
                  { name: "name" as const, label: "Name", type: "text" },
                  { name: "phone" as const, label: "Phone", type: "tel" },
                  { name: "email" as const, label: "Email", type: "email" },
                ].map((f) => (
                  <div key={f.name}>
                    <label htmlFor={`contact-${f.name}`} className="mb-2 block text-xs font-medium text-ink-dim">{f.label}</label>
                    <input
                      required
                      id={`contact-${f.name}`}
                      type={f.type}
                      name={f.name}
                      value={form[f.name]}
                      onChange={(e) => setForm((prev) => ({ ...prev, [f.name]: e.target.value }))}
                      className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-blue-bright focus:ring-2 focus:ring-blue/20"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="contact-project-type" className="mb-2 block text-xs font-medium text-ink-dim">Project type</label>
                  <select
                    required
                    id="contact-project-type"
                    value={form.projectType}
                    onChange={(e) => setForm((prev) => ({ ...prev, projectType: e.target.value }))}
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-ink outline-none focus:border-blue-bright focus:ring-2 focus:ring-blue/20"
                  >
                    <option>Architecture</option>
                    <option>Construction</option>
                    <option>Real Estate</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-2 block text-xs font-medium text-ink-dim">Message</label>
                  <textarea
                    required
                    id="contact-message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                    className="w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-ink outline-none focus:border-blue-bright focus:ring-2 focus:ring-blue/20"
                  />
                </div>
                {status === "error" && (
                  <p className="text-sm text-orange">
                    Something went wrong sending your enquiry. Please try again, or email us directly at{" "}
                    <a href="mailto:Bakirassociates@gmail.com" className="underline">Bakirassociates@gmail.com</a>.
                  </p>
                )}
                <MagneticButton
                  as="button"
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send Enquiry"}
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
            <LazyImage src={logoMarkSrc} alt="" className="h-10 w-16 object-contain" width={64} height={40} loading="eager" />
            <div>
              <div className="font-display text-base font-semibold text-ink">Al Bakir</div>
              <div className="text-[10px] tracking-[0.2em] text-ink-soft">PVT · LTD</div>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm text-ink-dim">
            Where dreams become true. Architecture, construction and real estate based in Islamabad.
          </p>
          <div className="mt-5 flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.name}
                target="_blank"
                rel="noopener"
                className="glass-light flex h-9 w-9 items-center justify-center rounded-full text-ink-dim hover:-translate-y-0.5 hover:text-blue-bright"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                  <path d={s.path} fillRule={s.fillRule} />
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
            <li className="text-ink-dim">Head office, Multi Gardens B-17, Islamabad</li>
            <li className="text-ink-dim">Open 24 hours daily</li>
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
        <ScrollVideoHero />
        <TrustStrip />
        <Suspense fallback={<ComponentFallback />}>
          <Bento />
        </Suspense>
        <ConstructionServices />
        <RealEstateServices />
        <Stats />
        <About />
        <VisionMission />
        <CoreValues />
        <Suspense fallback={<ComponentFallback />}>
          <LazyLeadership />
        </Suspense>
        <WhyChooseApproach />
        <RatingMarquee />
        <EmapVerification />
        <InvestorOpportunities />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
