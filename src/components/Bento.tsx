import LocalTime from "./LocalTime";
import Marquee from "./Marquee";

const services = [
  {
    title: "Architecture & Design",
    desc: "Bespoke residential and commercial design rooted in context, climate and craft.",
    accentClass: "text-blue-bright",
    underline: "bg-blue",
    icon: (
      <svg viewBox="0 0 64 64" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="32" cy="20" r="4" />
        <path d="M32 24v8M14 56l18-24 18 24M22 44h20" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Construction",
    desc: "End to end build delivery with disciplined timelines and material integrity.",
    accentClass: "text-orange",
    underline: "bg-orange",
    icon: (
      <svg viewBox="0 0 64 64" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M8 56V28l24-16 24 16v28" strokeLinejoin="round" />
        <path d="M24 56V40h16v16M8 56h48" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Real Estate",
    desc: "Curated property opportunities across B-17 Islamabad and surrounding sectors.",
    accentClass: "text-green",
    underline: "bg-green",
    icon: (
      <svg viewBox="0 0 64 64" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="22" cy="32" r="8" />
        <path d="M30 32h26l-6 6M50 38v6" strokeLinecap="round" />
      </svg>
    ),
  },
];

const capabilities = [
  "BIM",
  "CAD",
  "Project Management",
  "Interior Design",
  "Site Supervision",
  "Real Estate Advisory",
  "Cost Engineering",
  "Sustainable Design",
];

export default function Bento() {
  return (
    <section id="services" className="relative bg-bg-elev px-6 py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="fade-up mb-16 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim">What we do</div>
            <h2 className="font-display text-4xl font-semibold leading-[1.05] text-ink md:text-6xl">
              A single studio.<br />
              <span className="text-ink-dim">Three disciplines.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-ink-dim">
            Design, construction and real estate under one roof, accountable from first sketch to handover.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:auto-rows-[200px]">
          {/* Statement tile */}
          <article className="fade-up surface-card group relative overflow-hidden md:col-span-8 md:row-span-2">
            <div className="relative flex h-full flex-col justify-between p-8 md:p-12">
              <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim">Studio manifesto</div>
              <div>
                <h3 className="font-display text-3xl font-semibold leading-[1.1] text-ink md:text-5xl">
                  We build from <span className="text-blue-bright">first principles</span>, with a single team accountable to one drawing.
                </h3>
                <div className="mt-6 h-px w-16 bg-ink transition-all duration-500 group-hover:w-32" />
              </div>
            </div>
          </article>

          {/* Live clock tile */}
          <article className="fade-up surface-card relative overflow-hidden md:col-span-4 md:row-span-2">
            <div className="relative flex h-full flex-col justify-between p-8">
              <LocalTime />
              <div className="text-[11px] font-medium uppercase tracking-[0.15em] text-ink-dim">Primary office</div>
            </div>
          </article>

          {/* Service tiles */}
          {services.map((s, i) => (
            <article
              key={s.title}
              className="fade-up surface-card group relative md:col-span-4 md:row-span-2"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex h-full flex-col justify-between p-8">
                <div className={`${s.accentClass} transition-transform duration-500 group-hover:rotate-[6deg]`}>
                  {s.icon}
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-ink">{s.title}</h3>
                  <div className={`my-3 h-0.5 w-8 ${s.underline}`} />
                  <p className="mt-2 text-sm leading-relaxed text-ink-dim">{s.desc}</p>
                </div>
              </div>
            </article>
          ))}

          {/* Capabilities marquee */}
          <article className="fade-up surface-card relative overflow-hidden md:col-span-12">
            <Marquee speed={32} className="py-6">
              {capabilities.map((c) => (
                <span key={c} className="flex items-center gap-12 font-display text-2xl font-medium text-ink-dim md:text-3xl">
                  {c}
                  <span className="h-1.5 w-1.5 rotate-45 bg-ink-dim" />
                </span>
              ))}
            </Marquee>
          </article>
        </div>
      </div>
    </section>
  );
}
