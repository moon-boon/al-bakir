import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import Lightbox from "@/components/Lightbox";
import { galleryProjects } from "@/data/gallery-projects";

const DISCIPLINES: Record<string, { title: string; desc: string; accent: string }> = {
  "architecture-design": {
    title: "Architecture & Design",
    desc: "Bespoke residential and commercial design rooted in context, climate and craft.",
    accent: "text-blue-bright",
  },
  construction: {
    title: "Construction",
    desc: "End to end build delivery with disciplined timelines and material integrity.",
    accent: "text-orange",
  },
  "real-estate": {
    title: "Real Estate",
    desc: "Curated property opportunities across B-17 Islamabad and surrounding sectors.",
    accent: "text-green",
  },
};

type Item = { id: string; title: string; image: string; description: string };

export const Route = createFileRoute("/gallery/$slug")({
  head: ({ params }) => {
    const d = DISCIPLINES[params.slug];
    const title = d ? `${d.title} — Gallery | Al Bakir` : "Gallery | Al Bakir";
    const description = d?.desc ?? "Project gallery.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  beforeLoad: ({ params }) => {
    if (!DISCIPLINES[params.slug]) throw notFound();
  },
  component: GalleryPage,
});

function GalleryPage() {
  const { slug } = Route.useParams();
  const d = DISCIPLINES[slug];
  const storageKey = `gallery:${slug}`;
  const projects = galleryProjects[slug] ?? [];

  const [openProject, setOpenProject] = useState<number | null>(null);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  const persist = (next: Item[]) => {
    setItems(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {}
  };

  const removeItem = (id: string) => persist(items.filter((i) => i.id !== id));

  return (
    <main className="min-h-screen bg-bg px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Link to="/" className="text-sm text-ink-dim hover:text-ink">← Back home</Link>

        <header className="mt-8 mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <div className={`mb-3 text-[11px] font-medium uppercase tracking-[0.2em] ${d.accent}`}>Gallery</div>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] text-ink md:text-6xl">{d.title}</h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-dim">{d.desc}</p>
          </div>
        </header>

        {projects.length > 0 && (
          <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setOpenProject(i)}
                className="surface-card group relative block overflow-hidden text-left transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg-elev">
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="glass-dark absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium text-white">
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                    </svg>
                    {p.images.length} photos
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="glass-dark flex h-12 w-12 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:scale-110">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M4 8V5a1 1 0 011-1h3M20 8V5a1 1 0 00-1-1h-3M4 16v3a1 1 0 001 1h3M20 16v3a1 1 0 01-1 1h-3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-ink">{p.title}</h3>
                  <div className="mt-2 text-xs uppercase tracking-[0.2em] text-ink-dim opacity-0 transition group-hover:opacity-100">View photos →</div>
                </div>
              </button>
            ))}
          </div>
        )}

        {items.length === 0 && projects.length === 0 ? (
          <div className="surface-card flex min-h-[40vh] flex-col items-center justify-center p-12 text-center">
            <p className="text-ink-dim">No items yet.</p>
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it) => (
              <article key={it.id} className="surface-card group relative overflow-hidden">
                {it.image ? (
                  <div className="aspect-[4/3] w-full overflow-hidden bg-bg-elev">
                    <img src={it.image} alt={it.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                ) : (
                  <div className="aspect-[4/3] w-full bg-bg-elev" />
                )}
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-ink">{it.title}</h3>
                  {it.description && <p className="mt-2 text-sm leading-relaxed text-ink-dim">{it.description}</p>}
                </div>
                <button
                  onClick={() => removeItem(it.id)}
                  className="absolute right-3 top-3 rounded-full bg-bg/80 px-3 py-1 text-xs text-ink-dim opacity-0 backdrop-blur transition group-hover:opacity-100"
                >
                  Remove
                </button>
              </article>
            ))}
          </div>
        ) : null}
      </div>

      <AnimatePresence>
        {openProject !== null && projects[openProject] && (
          <Lightbox
            title={projects[openProject].title}
            images={projects[openProject].images}
            onClose={() => setOpenProject(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
