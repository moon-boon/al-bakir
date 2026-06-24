# Al Bakir — Bento Redesign Plan

Channel a modern bento/dashboard aesthetic (think Apple Newsroom, Linear changelog, Raycast home) on top of the existing black + blue/orange/green palette. Keep the animated logo-formation background and current brand voice.

## Visual direction

- **Layout language**: modular bento grid — mixed card sizes (2x1, 1x1, 2x2) that snap onto a 12-col grid on desktop, single column on mobile. Sharp 0px radius stays (drafting reference).
- **Typography**: Cormorant Garamond for display + Inter for UI, already loaded. Increase scale contrast (hero 88–112px clamp, eyebrows 10px tracking 0.4em).
- **Color**: keep brand tokens. Add subtle inner highlights (`inset 0 1px 0 rgb(255 255 255 / 0.06)`) and 1px borders in `blue/20` for the glass-card look.
- **Motion (balanced)**: scroll-reveal with stagger via IntersectionObserver, parallax on hero stats and bento tiles, magnetic effect on primary CTAs, animated number counters, marquee for the rating strip, smooth in-page scroll.

## Page structure (top to bottom)

1. **Sticky nav** — refine current. Add a small "Available 24/7" pill with green dot, magnetic hover on links.
2. **Hero (100vh)** — keep canvas logo formation. Larger headline, eyebrow tag, two CTAs (primary magnetic, ghost). Below: three live-counter stat pills.
3. **Bento overview grid** (new) — 6 tiles on a 12-col grid:
   - Tile A (8x2): "Three disciplines, one studio" — large display copy + animated underline.
   - Tile B (4x2): Live time in Islamabad + "Open now" status (real Date).
   - Tile C (4x2): Architecture service — icon + 1-liner.
   - Tile D (4x2): Construction service — icon + 1-liner.
   - Tile E (4x2): Real Estate service — icon + 1-liner.
   - Tile F (12x1): Marquee strip of capabilities (BIM · CAD · Project Management · Interior Design · Site Supervision · Real Estate Advisory) scrolling slowly.
4. **Featured Projects gallery** (new) — 4–6 placeholder project cards in a bento mosaic (mix of portrait, landscape, square). Each card: image slot (gradient placeholder ready for real photos), category tag, title, location, year. Hover: lift + caption reveal. Filter chips on top (All / Architecture / Construction / Real Estate).
5. **About** — keep split with animated grid canvas, refine copy hierarchy, add a small "Founders / Studio" stat row (Years active, Projects delivered, Active sites).
6. **Rating banner** — convert to marquee: "4.8 ★ · 27 reviews · Open 24 hours · B-17 Islamabad" repeating.
7. **Contact** — keep two-column. Polish: floating labels, magnetic submit, animated success state stays.
8. **Footer** — unchanged structure, tighten spacing.

## Motion specifics

- `useReveal` already present — extend with `data-delay` for stagger.
- Magnetic CTA: small hook that translates the button toward cursor within 12px on mousemove, springs back on leave. Disabled under `prefers-reduced-motion` and on touch.
- Parallax: translateY on bento tiles based on scroll position via `requestAnimationFrame`.
- Counters: easeOutCubic from 0 → target when stat row enters viewport.
- Marquee: pure CSS keyframes, pause on hover.

## Featured Projects data

Placeholder list in `src/data/projects.ts` so you can swap real content later. Each project: `id, title, location, year, category, aspect, accent`. Image slot uses a CSS gradient + category icon until real photos arrive.

## Files to add / change

- `src/routes/index.tsx` — restructure into new sections.
- `src/components/BackgroundCanvas.tsx` — unchanged.
- `src/components/Bento.tsx` — new, renders overview grid.
- `src/components/FeaturedProjects.tsx` — new, gallery + filter.
- `src/components/MagneticButton.tsx` — new wrapper.
- `src/components/Marquee.tsx` — new.
- `src/components/Counter.tsx` — new (animated number).
- `src/components/LocalTime.tsx` — new (Islamabad clock + open status).
- `src/data/projects.ts` — new placeholder data.
- `src/styles.css` — add `bento-card`, `marquee` utilities, refined focus rings; keep all tokens.

## Out of scope (for now)

- Real project photography (you'll supply later — slots are ready).
- Testimonials, FAQ, Process sections (we cut these per your answer).
- Backend / form submission wiring.

Ready to build when you approve.
