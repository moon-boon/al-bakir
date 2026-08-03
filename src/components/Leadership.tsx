import { motion, useReducedMotion } from "motion/react";
import RevealHeading from "@/components/RevealHeading";
import LazyImage from "@/components/LazyImage";
import fidaUrRehmanSrc from "@/assets/leader-2.jpg";
import atiqUrRehmanSrc from "@/assets/leader-1.jpg";
import ehsanFraziSrc from "@/assets/leader-3.jpg";
import dilawarAzizSrc from "@/assets/leader-4.jpg";

const leaders: { name: string; role: string; img: string; desc?: string }[] = [
  {
    name: "Fida-ur-Rehman",
    role: "Chief Executive Officer",
    img: fidaUrRehmanSrc,
    desc: "Provides strategic leadership and oversees business growth, project execution, corporate planning, and organizational development.",
  },
  {
    name: "Dilawar Aziz",
    role: "Marketing & Sales Head",
    img: dilawarAzizSrc,
    desc: "Leads marketing strategy, branding, business development, digital marketing, client relations, and project sales.",
  },
  {
    name: "Ehsan Frazi",
    role: "Principal Architect",
    img: ehsanFraziSrc,
    desc: "Heads the architectural and design department, leading concept development and engineering coordination.",
  },
  {
    name: "Atiq-ur-Rehman",
    role: "Construction Head",
    img: atiqUrRehmanSrc,
    desc: "Supervises all on-site operations, ensuring projects meet the highest standards of quality, safety, and efficiency.",
  },
];

export default function Leadership() {
  const reduce = useReducedMotion();
  return (
    <section id="leadership" className="relative bg-bg px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-2xl">
          <h2 className="font-display text-4xl font-semibold leading-[1.05] text-ink md:text-5xl">
            <RevealHeading lines={[{ text: "The team behind" }, { text: "every project.", dim: true }]} />
          </h2>
        </div>
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          initial={reduce ? "shown" : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.12 } } }}
        >
          {leaders.map((m) => (
            <motion.figure
              key={m.name}
              className="surface-card group flex flex-col overflow-hidden"
              variants={{
                hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
                shown: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-bg-elev">
                <LazyImage
                  src={m.img}
                  alt={`${m.name}, ${m.role} at Al Bakir`}
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  width={400}
                  height={500}
                />
              </div>
              <figcaption className="p-6">
                <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-orange">{m.role}</div>
                <div className="font-display text-xl font-semibold text-ink">{m.name}</div>
                {m.desc && <p className="mt-3 text-sm leading-relaxed text-ink-dim">{m.desc}</p>}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
