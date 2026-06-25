# Premium White Apple-Style Redesign

Shift the site from dark-blue dominant to a white, airy, Apple-like surface where the logo's brand colors (black, green, orange, blue) appear only as restrained accents.

## Design tokens (src/styles.css)

Light theme as default:
- `--background`: #ffffff
- `--surface`: #f5f5f7 (Apple's classic section grey)
- `--surface-2`: #fbfbfd
- `--foreground` / ink: #1d1d1f
- `--muted-foreground`: #6e6e73
- `--border`: #d2d2d7
- Brand accents (used sparingly, never as full backgrounds):
  - `--brand-blue`: #0a84ff
  - `--brand-green`: #30d158
  - `--brand-orange`: #ff9f0a
  - `--brand-ink`: #1d1d1f
- Typography: Sora (display/headings), Manrope (body) — load via `<link>` in `__root.tsx`.
- Shadows: soft, low-contrast (`0 1px 2px rgb(0 0 0 / 0.04)`, `0 20px 40px -20px rgb(0 0 0 / 0.08)`).
- Radius: 18–22px (Apple-like pill/rounded cards).

## Composition (Apple stacked sections)

Restructure `src/routes/index.tsx` into full-width stacked sections, each ~100vh-ish, generous whitespace, single focal idea per section:

1. **Hero** — White bg, oversized Sora headline in near-black, one-line subhead in `--muted-foreground`, two pill CTAs (primary black, secondary ghost). Particle logo canvas behind, retuned for light bg.
2. **Disciplines strip** — Grey `#f5f5f7` band, three columns (Architecture / Interior / Construction) with thin colored underline using brand accents (one color each).
3. **Featured project showcase** — Alternating white/grey sections, single large rounded card per row, parallax image placeholder, caption left-aligned. Replaces current dense bento grid.
4. **Stats row** — White, four counters with hairline dividers, label in muted grey.
5. **Capabilities marquee** — Grey band, thin type, monochrome.
6. **About** — White, two-column editorial: serif-weight Sora headline left, paragraph right.
7. **Contact** — Grey band, large headline, single inline email + magnetic CTA.
8. **Footer** — White, minimal, hairline top border.

## Background canvas (BackgroundCanvas.tsx)

Retune for light theme:
- Particles: `rgba(29,29,31,0.35)` (ink) with occasional accent dots in brand blue/green/orange at low opacity.
- Remove blue glow; replace with very faint shadow.
- Lower particle count / opacity so it reads as a whisper, not a feature.

## Components to update

- `Hero` — restyle for white bg, larger type scale, Apple-style CTA pills.
- `Bento` → simplify into the stacked sections (keep `LocalTime`, `Counter`, `Marquee` as primitives but drop glass-card aesthetic).
- `FeaturedProjects` → convert to full-width alternating showcase rows.
- `MagneticButton` → light theme variants (solid black, ghost outline).
- All glass/blur/`bento-card` utilities replaced with `surface-card` (white, 1px `--border`, soft shadow, 20px radius).

## Out of scope

- Real project photography (placeholders remain).
- Dark mode toggle.
- Content/copy rewrites beyond what white-space demands.
- New sections beyond what's listed.

## Technical notes

- Add Sora + Manrope via `<link>` tags in `src/routes/__root.tsx` head (per Tailwind v4 remote-font rule).
- Update `@theme` tokens in `src/styles.css`; replace dark-mode-first values; keep shadcn `@theme inline` mapping intact.
- Remove/replace `bento-card` utility with `surface-card`; keep `fade-up` and marquee keyframes.
- No backend, no new packages required (fonts via CDN link tags).
