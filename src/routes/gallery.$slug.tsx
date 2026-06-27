import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";

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

  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState({ title: "", image: "", description: "" });
  const [open, setOpen] = useState(false);

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

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const next: Item[] = [
      ...items,
      { id: crypto.randomUUID(), title: form.title.trim(), image: form.image.trim(), description: form.description.trim() },
    ];
    persist(next);
    setForm({ title: "", image: "", description: "" });
    setOpen(false);
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
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-bg transition hover:opacity-90"
          >
            {open ? "Close" : "+ Add content"}
          </button>
        </header>

        {open && (
          <form onSubmit={addItem} className="surface-card mb-12 grid gap-4 p-6 md:p-8">
            <input
              required
              placeholder="Project title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-md border border-ink/10 bg-transparent px-4 py-3 text-ink outline-none focus:border-ink/40"
            />
            <input
              placeholder="Image URL (https://…)"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full rounded-md border border-ink/10 bg-transparent px-4 py-3 text-ink outline-none focus:border-ink/40"
            />
            <textarea
              placeholder="Description"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-md border border-ink/10 bg-transparent px-4 py-3 text-ink outline-none focus:border-ink/40"
            />
            <div className="flex gap-3">
              <button type="submit" className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-bg">Save</button>
              <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-ink/20 px-6 py-3 text-sm">Cancel</button>
            </div>
          </form>
        )}

        {items.length === 0 ? (
          <div className="surface-card flex min-h-[40vh] flex-col items-center justify-center p-12 text-center">
            <p className="text-ink-dim">No items yet. Click “Add content” to create your first entry.</p>
          </div>
        ) : (
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
        )}
      </div>
    </main>
  );
}
