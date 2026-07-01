## Plan: Expand home page with company profile content

All changes live in `src/routes/index.tsx` (plus a small tweak to the `Stats` numbers). Home page only, no new routes. Visual language stays consistent with the existing minimal black/white + blue/orange/green accent system.

### 1. New section: Vision & Mission
Placed after `About`, before `RatingMarquee`.

- Two-column layout on desktop, stacked on mobile.
- Left card: **Vision** — "To become Pakistan's most trusted integrated construction, design, and real estate company…" with a blue accent bar.
- Right card: **Mission** — rendered as a 6-item checklist (deliver quality, innovative design, trust-based relationships, transparent real estate, maximize value, continuous improvement) with orange checkmarks.
- Uses existing `surface-card-elev` styling and the `fade-up` reveal.

### 2. New section: Core Values
Placed after Vision/Mission.

- Section eyebrow "What we stand for" + heading "Six values, one standard."
- 3×2 grid (2 cols on mobile) of value cards: Integrity, Excellence, Innovation, Customer Commitment, Teamwork, Sustainability.
- Each card: small numbered badge (01–06), value name in display font, one-line description from the profile.

### 3. New section: Why Choose Us + Project Approach
Combined section after Core Values.

- **Why Choose Al Bakir** — left column, 10 bullet points from the profile rendered as a two-column checklist with green accents (Complete Design-to-Construction Solutions, Experienced Architects & Engineers, etc.).
- **Our project approach** — right column, vertical 5-step timeline: Consultation → Planning → Design → Construction → Delivery. Each step has a numbered circle, title, and one-line description.

### 4. Update Stats numbers to reflect real achievements
Replace the current `Stats` items with data from the profile:

- `50+` construction projects delivered
- `150+` design projects
- `300+` property transactions
- `80%` referral business

The existing `Counter` component already supports numbers + suffixes.

### 5. Contact section updates
In the existing `Contact` component:

- **Phone**: add a third row for landline `051 2765184` (label "Landline"), keep the two mobile numbers.
- **Email**: add new block below Phone with `Bakirassociates@gmail.com` as a `mailto:` link.
- **Social**: add new "Follow" block with Facebook, Instagram, YouTube, TikTok icon links. Since actual URLs weren't provided, links will point to `#` with a code comment noting they need real URLs — you can send them anytime and I'll swap them in.

### 6. Footer updates
- Add landline, email, and social row to the footer contact column so all contact info is consistent across the page.

### 7. Navigation
Add a "Values" anchor link to the top nav (both desktop and mobile menu) so the new sections are reachable from the top of the page. Existing Services/Projects/About/Contact links stay.

### Not included (per your answers)
- No separate `/about`, `/services`, or `/leadership` routes.
- Full services sub-lists and leadership team bios are omitted — say the word if you want either added later as a home-page section.

### Technical notes
- All new content is presentational JSX in `src/routes/index.tsx`; no new components, no new dependencies, no backend changes.
- Colors use existing tokens (`text-ink`, `text-ink-dim`, `bg-blue`, `text-orange`, `text-green`, `surface-card`, `surface-card-elev`) — no hardcoded colors.
- SEO `head()` description will be refreshed to reflect the fuller company scope (construction, architectural design, engineering, interior design, real estate).
