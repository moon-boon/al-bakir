import { useState } from "react";
import { projects, type ProjectCategory } from "@/data/projects";

const filters: ("All" | ProjectCategory)[] = ["All", "Architecture", "Construction", "Real Estate"];

const accentMap = {
  blue: { from: "from-blue/40", to: "to-blue/5", text: "text-blue-bright", border: "border-blue/40" },
  orange: { from: "from-orange/40", to: "to-orange/5", text: "text-orange", border: "border-orange/40" },
  green: { from: "from-green/40", to: "to-green/5", text: "text-green", border: "border-green/40" },
} as const;

const spanMap = {
  large: "md:col-span-6 md:row-span-2 aspect-[16/11] md:aspect-auto md:min-h-[480px]",
  wide: "md:col-span-6 aspect-[16/9]",
  tall: "md:col-span-3 md:row-span-2 aspect-[3/4] md:aspect-auto md:min-h-[480px]",
  square: "md:col-span-3 aspect-square",
} as const;

export default function FeaturedProjects() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const list = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="fade-up mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 text-[10px] tracking-[0.4em] text-blue-bright">SELECTED WORK</div>
            <h2 className="font-display text-4xl md:text-6xl text-gradient-bw">Featured projects</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`border px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition-all ${
                  active === f
                    ? "border-orange bg-orange/10 text-orange"
                    : "border-blue/20 text-ink-dim hover:border-blue/50 hover:text-ink"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:auto-rows-[200px]">
          {list.map((p, i) => {
            const a = accentMap[p.accent];
            return (
              <article
                key={p.id}
                className={`fade-up group relative overflow-hidden border border-blue/20 bg-black/40 ${spanMap[p.span]}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {/* placeholder visual */}
                <div className={`absolute inset-0 bg-gradient-to-br ${a.from} ${a.to}`} />
                <div
                  className="absolute inset-0 opacity-30 mix-blend-screen"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 12px)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* content */}
                <div className="relative flex h-full flex-col justify-between p-6">
                  <div className="flex items-start justify-between">
                    <span className={`border ${a.border} ${a.text} px-2.5 py-1 text-[9px] uppercase tracking-[0.25em]`}>
                      {p.category}
                    </span>
                    <span className="text-[10px] tracking-[0.3em] text-ink-dim">{p.year}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-ink md:text-3xl">{p.title}</h3>
                    <div className="mt-1 text-xs uppercase tracking-[0.25em] text-ink-dim">{p.location}</div>
                    <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-ink-dim opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                      {p.summary}
                    </p>
                  </div>
                </div>

                <div className={`absolute inset-x-0 bottom-0 h-px ${a.text} bg-current opacity-0 transition-opacity group-hover:opacity-60`} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
