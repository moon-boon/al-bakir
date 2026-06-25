import { useState } from "react";
import { projects, type ProjectCategory } from "@/data/projects";

const filters: ("All" | ProjectCategory)[] = ["All", "Architecture", "Construction", "Real Estate"];

const accentMap = {
  blue: { from: "from-blue/15", to: "to-blue/0", text: "text-blue-bright", chip: "bg-blue/10 text-blue-bright" },
  orange: { from: "from-orange/15", to: "to-orange/0", text: "text-orange", chip: "bg-orange/10 text-orange" },
  green: { from: "from-green/15", to: "to-green/0", text: "text-green", chip: "bg-green/10 text-green" },
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
    <section id="projects" className="relative bg-bg px-6 py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="fade-up mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim">Selected work</div>
            <h2 className="font-display text-4xl font-semibold leading-[1.05] text-ink md:text-6xl">
              Featured projects.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                  active === f
                    ? "border-ink bg-ink text-white"
                    : "border-ink/15 text-ink-dim hover:border-ink/40 hover:text-ink"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:auto-rows-[200px]">
          {list.map((p, i) => {
            const a = accentMap[p.accent];
            return (
              <article
                key={p.id}
                className={`fade-up surface-card group relative overflow-hidden ${spanMap[p.span]}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {/* placeholder visual */}
                <div className={`absolute inset-0 bg-gradient-to-br ${a.from} ${a.to}`} />
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, rgba(0,0,0,0.025) 0, rgba(0,0,0,0.025) 1px, transparent 1px, transparent 14px)",
                  }}
                />

                {/* content */}
                <div className="relative flex h-full flex-col justify-between p-7">
                  <div className="flex items-start justify-between">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.15em] ${a.chip}`}>
                      {p.category}
                    </span>
                    <span className="text-xs font-medium text-ink-dim">{p.year}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-ink md:text-3xl">{p.title}</h3>
                    <div className="mt-1 text-xs text-ink-dim">{p.location}</div>
                    <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-ink-dim opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                      {p.summary}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
