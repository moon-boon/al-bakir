import LocalTime from "./LocalTime";
import Marquee from "./Marquee";

const services = [
  {
    title: "Architecture & Design",
    desc: "Bespoke residential and commercial design rooted in context, climate and craft.",
    color: "blue-bright",
    accent: "border-blue/30 hover:border-blue-bright/70",
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
    color: "orange",
    accent: "border-orange/30 hover:border-orange/70",
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
    color: "green",
    accent: "border-green/30 hover:border-green/70",
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
    <section id="services" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="fade-up mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-4 text-[10px] tracking-[0.4em] text-orange">WHAT WE DO</div>
            <h2 className="font-display text-4xl md:text-6xl text-gradient-bw">A single studio. Three disciplines.</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-dim">
            Design, construction and real estate under one roof, accountable from first sketch to handover.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:auto-rows-[180px]">
          {/* Statement tile */}
          <article className="fade-up bento-card group relative overflow-hidden md:col-span-8 md:row-span-2">
            <div className="absolute inset-0 bg-gradient-to-br from-blue/20 via-transparent to-orange/10" />
            <div className="relative flex h-full flex-col justify-between p-8 md:p-10">
              <div className="text-[10px] tracking-[0.4em] text-blue-bright">STUDIO MANIFESTO</div>
              <div>
                <h3 className="font-display text-3xl leading-[1.05] md:text-5xl">
                  We build from <span className="text-orange">first principles</span>, with a single team accountable to one drawing.
                </h3>
                <div className="mt-6 h-px w-16 bg-blue-bright transition-all duration-500 group-hover:w-32" />
              </div>
            </div>
          </article>

          {/* Live clock tile */}
          <article className="fade-up bento-card relative overflow-hidden md:col-span-4 md:row-span-2">
            <div className="absolute inset-0 bg-gradient-to-br from-green/15 to-transparent" />
            <div className="relative flex h-full flex-col justify-between p-8">
              <LocalTime />
              <div className="text-[10px] tracking-[0.3em] text-ink-dim">PRIMARY OFFICE</div>
            </div>
          </article>

          {/* Service tiles */}
          {services.map((s, i) => (
            <article
              key={s.title}
              className={`fade-up bento-card group relative md:col-span-4 md:row-span-2 ${s.accent}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex h-full flex-col justify-between p-8">
                <div className={`text-${s.color} transition-transform duration-500 group-hover:rotate-[6deg]`}>
                  {s.icon}
                </div>
                <div>
                  <h3 className="font-display text-2xl">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-dim">{s.desc}</p>
                </div>
              </div>
            </article>
          ))}

          {/* Capabilities marquee */}
          <article className="fade-up bento-card relative overflow-hidden md:col-span-12">
            <Marquee speed={32} className="py-6">
              {capabilities.map((c) => (
                <span key={c} className="flex items-center gap-12 font-display text-2xl text-ink-dim md:text-3xl">
                  {c}
                  <span className="h-1.5 w-1.5 rotate-45 bg-blue-bright" />
                </span>
              ))}
            </Marquee>
          </article>
        </div>
      </div>
    </section>
  );
}
