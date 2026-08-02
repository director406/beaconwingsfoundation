# Beacon Wings Foundation — Website

Official website for **Beacon Wings Foundation**, a Section 8 nonprofit
registered in India (June 2026), working across three focus areas: Child
Care (Education & Upliftment), Women Empowerment, and Old Age People Care,
with initial operations based in Delhi NCR.

Live at **[beaconwingsfoundation.org](https://beaconwingsfoundation.org)**.

> This project started from a generic NGO template (internally referred to
> as "IIWC" in some leftover localStorage key names — harmless, cosmetic).
> It has since been substantially rebuilt for Beacon Wings Foundation:
> honest content (no fabricated statistics), full dark-mode support,
> accessibility fixes, code-split routing, and a real CI/CD pipeline.
> See `DESIGN_SYSTEM.md` for the design conventions in use.

---

## Tech stack

- **Framework**: React 18 + Vite 5
- **Styling**: Tailwind CSS 3 (see `DESIGN_SYSTEM.md` for tokens/conventions)
- **Routing**: React Router DOM 6, route-based code splitting via `React.lazy`
- **Backend**: Firebase (Authentication + Firestore) — see `src/firebase.js`
- **Icons**: Lucide React
- **Hosting**: Firebase Hosting, custom domain via Squarespace DNS
- **CI/CD**: GitHub Actions (`.github/workflows/deploy-firebase.yml`) —
  every push to `main` builds and deploys automatically

## Project structure

```
src/
├── components/
│   ├── common/          # Button, Card, SectionWrapper, StatGrid, RouteLoader
│   └── layout/           # Navbar, Footer, PublicLayout
├── pages/
│   ├── home/, about/, what-we-do/, programs/, gallery/,
│   │   donate/, volunteer/, contact/, legal/    # Public pages
│   ├── auth/              # Login, Signup
│   ├── checkin/           # Volunteer activity check-in + leaderboard
│   └── admin/              # Admin dashboard (volunteer applications, messages)
├── hooks/                # useDocumentMeta (per-route SEO), useInView (scroll reveal)
├── services/              # authService, firestoreService, api
├── context/                # ThemeContext (light/dark)
├── routes/                # AppRoutes.jsx — central route config
├── utils/constants.js     # APP_INFO, ROUTES, NAV_LINKS, FORM_INPUT, etc.
└── firebase.js             # Firebase app initialization
```

## Local development

Requires Node 18+.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build       # production build to dist/
npm run preview     # preview the production build locally
```

### Environment variables

Firebase config is read from `VITE_FIREBASE_*` environment variables at
**build time** (Vite bakes them into the bundle — there's no runtime env
loading). Create `.env.local` for local development:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

Get these from Firebase Console → Project Settings → Your apps → SDK
config for the `beaconwingsfoundation` project. **If you build without
these set, the app builds successfully but Firebase silently fails to
initialize** — this exact issue took the live site down once (missing
`.env.local` in a build that got deployed). The same 7 variables are
stored as GitHub Actions secrets for CI builds.

## Deployment

Push to `main` → GitHub Actions builds and deploys to Firebase Hosting
automatically. No manual deploy step needed for normal changes.

Manual deploy (rare — e.g. testing before merging):
```bash
npm run build
firebase deploy --only hosting --project beaconwingsfoundation
```

Firestore security rules live in `firestore.rules` and deploy separately:
```bash
firebase deploy --only firestore:rules --project beaconwingsfoundation
```

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, honest current-status facts, focus areas, roadmap, "just getting started" panel |
| `/about` | Mission, vision, values, real leadership team, current status |
| `/what-we-do` | Focus-area detail pages *(note: currently lists 6 generic categories that don't match the org's 3 registered focus areas per the Certificate of Incorporation — pending a content decision)* |
| `/programs` | Program cards (status: launching 2026, not yet running) |
| `/gallery` | Photo gallery with lightbox |
| `/donate` | UPI QR code donation *(currently a personal UPI ID — pending the org's own bank account)* |
| `/volunteer` | Volunteer application form |
| `/contact` | Contact form |
| `/legal` | Registration details and policies |
| `/checkin` | Authenticated: volunteers log activities, see city/activity leaderboards |
| `/login`, `/signup` | Firebase Authentication |
| `/admin` | Authenticated (Coordinator/Member role): view volunteer applications and contact messages |

## Known gaps / honest state

- **Admin role model is app-layer only** — there's no server-enforced
  (Firebase custom claims) admin check yet. Firestore rules restrict
  `volunteers`/`contact` collections to *any* signed-in user, not
  specifically admins. Fine for now, worth hardening before handling
  data at scale.
- **Donation flow** is a static UPI QR code — no payment gateway, no
  amount selection, no receipts. Blocked on the org's bank account.
- **Content pillar mismatch** — see What We Do note above.
- **No automated tests** — this codebase doesn't have a test suite. If
  you add one, update this section.

## Design system

See `DESIGN_SYSTEM.md` for color tokens, typography scale, spacing/radius/
shadow conventions, component patterns, and motion/accessibility rules.
Read it before adding a new page or component — most needs are already
covered by an existing pattern.
