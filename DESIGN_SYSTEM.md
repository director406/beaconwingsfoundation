# Beacon Wings Foundation — Design System

This documents the design tokens and component conventions actually in use
across the codebase, so future changes stay consistent instead of each page
inventing its own variant. Written from an audit of current usage, not
aspirational — where usage is inconsistent, that's called out explicitly
rather than papered over.

## Colors

Brand colors are CSS variables (`src/assets/styles/index.css`) consumed via
Tailwind's `primary` / `accent` / `surface` classes — **not** raw color
names like `green-600`. This is what makes dark mode work automatically:
the variable value changes, every `bg-primary`/`text-primary` usage follows.

| Token | Light mode | Dark mode | Tailwind classes |
|---|---|---|---|
| `primary` | `#2D7A4F` (forest green) | `#4DB87E` (mint green) | `bg-primary`, `text-primary`, `border-primary` |
| `accent` | `#E8874A` (warm peach) | `#F0A070` (light peach) | `bg-accent`, `text-accent`, `border-accent` |
| `surface` | `#F0FAF4` (soft mint) | `#1A2E22` (deep forest) | `bg-surface` |

**Rule going forward: never hardcode a raw Tailwind color for brand
elements** (buttons, links, active states, section CTAs). Use `primary`/
`accent`. The CheckIn page rebuild (commit `08e4960`) is the reference
example of un-doing raw-color drift back onto tokens.

**Secondary accent colors** (used for variety on pillar/category cards,
stat cards, badges) follow one consistent recipe — light background +
darker text in light mode, dark/20-opacity background + light text in dark
mode:
```
bg-teal-50 dark:bg-teal-900/20   text-teal-700 dark:text-teal-400
bg-red-50  dark:bg-red-900/20    text-red-600  dark:text-red-400
bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400
```
Reuse this recipe rather than inventing a new one when a page needs a
fourth or fifth accent color.

**Every color class that isn't semantically fixed (success=green,
error=red) needs a `dark:` companion.** Two real bugs shipped from
missing this (Navbar had zero dark: support; CheckIn had none at all) —
see commits `08e4960` and `5d6e544`.

## Theme default

Defaults to **light** for every visitor regardless of OS/browser dark-mode
preference (`ThemeContext.jsx`, commit `5297c56`). There is currently no
dark-mode toggle exposed in the UI — `toggleTheme`/`useTheme` exist in
`ThemeContext` but aren't consumed anywhere. If a toggle is added later,
wire it through `useTheme()`; don't reintroduce the system-preference
auto-switch without also shipping a way to switch back.

## Typography

No named type scale exists in `tailwind.config.js` — pages use Tailwind's
default scale directly. Observed real usage, in order of frequency:

| Class | Common use |
|---|---|
| `text-xs` | Micro-labels, badges, timestamps |
| `text-sm` | Body text, form labels, nav links (most common size on the site) |
| `text-base` | Rare — most "body" text is actually `text-sm` |
| `text-lg` | Sub-headings, larger body text in hero sections |
| `text-xl` | Card titles |
| `text-2xl` | Section sub-headings |
| `text-3xl` | Section headings (most `<h2>`s) |
| `text-4xl` | Page-level `<h1>`s, hero headings |
| `text-5xl` | Stat values (StatGrid), hero display numbers |

Headings are consistently `font-bold` or `font-extrabold`; body text is
`font-normal`/unweighted or `font-medium` for emphasis. Follow this table
rather than picking a size ad hoc.

## Spacing & Layout

- Page-width container: `.container-max` (defined in `index.css`) — always
  use this instead of manually repeating `mx-auto max-w-7xl px-4 sm:px-6
  lg:px-8`.
- Section vertical rhythm: `py-14` to `py-20` depending on section
  prominence (hero/CTA bands lean toward `py-20`, in-page sections toward
  `py-14`–`py-16`).
- Sections alternate background between `bg-white dark:bg-slate-900` and
  `bg-slate-50 dark:bg-slate-800` to create visual rhythm without borders —
  follow this alternation when adding new homepage-style sections.

## Border radius

Four different radius values are in active use without a fully consistent
rule yet (`rounded-lg`, `rounded-xl`, `rounded-xl2` [custom 16px token],
`rounded-2xl`). Recommended going forward, to converge over time rather
than in one disruptive pass:
- `rounded-lg` — inputs, small buttons, nav pills, badges
- `rounded-xl2` (custom, defined in `tailwind.config.js`) — the `Button`
  and `Card` common components use this; prefer it for anything that
  should visually match those
- `rounded-2xl` — larger content cards, images, feature panels
- `rounded-full` — avatars, icon circles, pill-shaped CTAs

## Shadows

`shadow-soft` (custom, `tailwind.config.js`) is the `Card` component's
default and should be the first choice for card-like elements — it's a
softer, more diffuse shadow than Tailwind's stock `shadow-md`/`shadow-lg`
and matches the site's calm aesthetic better. Stock `shadow-sm/md/lg/xl`
are used inconsistently elsewhere; when touching those areas, prefer
migrating to `shadow-soft` rather than adding a fifth variant.

## Components (`src/components/common/`)

| Component | Purpose |
|---|---|
| `Button` | 3 variants: `primary` (solid brand), `accent` (solid peach), `outline`. Always has `dark:` coverage built in — use this instead of a raw `<button>` for anything call-to-action shaped. |
| `Card` | Base card chrome (`shadow-soft`, dark-mode border). Compose with your own padding/content. |
| `SectionWrapper` | Optional title+subtitle+section wrapper for simple pages. |
| `StatGrid` | Stat/metric display grid, 2 variants (`card`/`plain`). Includes a scroll-triggered reveal animation (see Motion below). |
| `RouteLoader` | Suspense fallback for lazy-loaded routes. |

**Shared form input style**: `FORM_INPUT` exported from `utils/constants.js`
— used by Volunteer, Contact, and CheckIn forms. Use this instead of
writing input styling inline; it was previously copy-pasted 3+ times
before being consolidated (commit `08e4960`).

## Motion

No animation library (no framer-motion/GSAP/AOS) — deliberately, to avoid
adding a dependency for what CSS transitions and the `useInView` hook
(`src/hooks/useInView.js`) already cover. Two established patterns:

1. **Micro-interactions** (hover, focus, button press): plain CSS
   `transition` classes, already global via `index.css`'s `*` transition
   rule for colors, plus `active:scale-95` on buttons.
2. **Scroll reveals**: `useInView()` — IntersectionObserver-based, fires
   once, respects `prefers-reduced-motion` (returns `inView=true`
   immediately so nothing animates for those visitors). See `StatGrid` for
   the reference implementation of a staggered reveal.

Don't reach for a new animation library without a concrete case neither
of these patterns can handle.

## Accessibility conventions

- Every interactive element needs a visible `:focus-visible` state — this
  is handled globally in `index.css` (outline using the `primary` token),
  so you generally don't need to add per-element focus styling.
- Skip-to-content link exists in `PublicLayout`; `<main id="main-content">`
  is the landmark target — don't remove or rename without updating both.
- Mobile menu: locks body scroll while open, closes on Escape
  (`Navbar.jsx`) — preserve both if you touch this component.
- Per-route `<title>`/meta description via `useDocumentMeta()` hook — every
  public page should call this; see any existing page for the pattern.

## What's intentionally NOT here

- A Storybook or isolated component-preview setup — not worth the
  dependency weight for a site this size yet.
- A formalized JS token file (e.g. `theme.js` constants for spacing/type)
  — Tailwind's `tailwind.config.js` already *is* the token source; a
  parallel JS object would just be a second thing to keep in sync.
