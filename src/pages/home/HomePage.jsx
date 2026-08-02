import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap, Users, Heart,
  ChevronLeft, ChevronRight, ArrowRight,
} from "lucide-react";
import { ROUTES, APP_INFO, FOCUS_AREAS } from "../../utils/constants";
import { StatGrid } from "../../components/common";
import useDocumentMeta from "../../hooks/useDocumentMeta";

const carouselSlides = [
  {
    url: "/images/slider1.jpeg",
    fallback: "from-green-900 to-slate-900",
    headline: "Poverty has millions of people in its grip.",
    sub: "We're here to change that — one community at a time.",
  },
  {
    url: "/images/slider2.jpeg",
    fallback: "from-teal-900 to-green-900",
    headline: "Every child deserves a chance to learn.",
    sub: "We make quality education accessible to all.",
  },
  {
    url: "/images/slider3.jpeg",
    fallback: "from-teal-900 to-slate-900",
    headline: "No one should grow old alone.",
    sub: "We bring companionship and care to our elders' doorsteps.",
  },
  {
    url: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1600&h=900&fit=crop",
    fallback: "from-purple-900 to-slate-900",
    headline: "Women hold up half the sky.",
    sub: "We empower them to reach it — and beyond.",
  },
];

const problemStats = [
  { number: "200M+", label: "Indians living below the poverty line", emoji: "📊" },
  { number: "26M+",  label: "Children out of school across India", emoji: "📚" },
  { number: "30M+",  label: "Elderly Indians living alone, often without support", emoji: "🧓" },
  { number: "68%",   label: "Indian women remain outside the paid workforce", emoji: "👩" },
  { number: "14%",   label: "Rural women are financially independent", emoji: "👩" },
  { number: "40M+",  label: "Indians denied basic legal rights annually", emoji: "⚖️" },
];

// Honest, verifiable facts about where BWF stands today — not projected or
// borrowed metrics. Update these as real program data becomes available
// (see Firestore `stats` doc once tracked activity exists).
const impactStats = [
  { value: "2026",      label: "Founded",           accent: true },
  { value: "3",         label: "Focus Areas",        accent: false },
  { value: "Section 8", label: "Registered Status",  accent: true },
  { value: "Delhi NCR", label: "Where We Operate",   accent: false },
];

// Forward-looking roadmap (not a fabricated past) — mirrors the org's real
// 3-stage plan: lean launch → growth → multi-state expansion.
const journeyEras = [
  {
    era: "Phase 1 · 2026",
    image: "/images/activity-stationery.jpeg",
    status: "In Progress", region: "Delhi NCR", focus: "Lean Launch",
    desc: "Registering as a Section 8 company, opening our bank account, and standing up our first Child Care, Women Empowerment, and Old Age Care programs in Delhi.",
  },
  {
    era: "Phase 2 · Growth",
    image: "/images/activity-food-bowls.jpeg",
    status: "Planned", region: "NCR + neighbouring states", focus: "Scaling Programs",
    desc: "Building our volunteer base, securing 12A/80G status, and expanding proven programs beyond our first city once Phase 1 is stable.",
  },
  {
    era: "Phase 3 · Multi-State",
    image: "/images/activity-gift-distribution.jpeg",
    status: "Future", region: "Multiple states", focus: "Sustainable Chapters",
    desc: "CSR-fund eligibility unlocks new partnerships; self-sustaining local chapters replicate our model across additional regions.",
  },
];

// No fabricated beneficiary quotes — BWF is pre-operational as of 2026 and
// has no program participants yet to quote. Replace this array with real
// testimonials once programs are running; until then the section below
// shows an honest "just getting started" panel instead.

const focusIconMap   = [GraduationCap, Users, Heart];
const focusColorMap  = [
  { bg: "bg-teal-50   dark:bg-teal-900/20",   text: "text-teal-700   dark:text-teal-400"   },
  { bg: "bg-purple-50 dark:bg-purple-900/20", text: "text-purple-700 dark:text-purple-400" },
  { bg: "bg-red-50    dark:bg-red-900/20",    text: "text-red-600    dark:text-red-400"    },
];

const cultureValues = [
  "Community First", "Mission Always", "Zero Overhead",
  "Think Less, Do More", "Decentralize", "Radical Transparency", "Volunteers are Family",
];

function HomePage() {
  useDocumentMeta("Home", "A newly registered Section 8 NGO in Delhi NCR working on Child Care, Women Empowerment, and Old Age Care.");
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((p) => (p + 1) % carouselSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setSlide((p) => (p - 1 + carouselSlides.length) % carouselSlides.length);
  const next = () => setSlide((p) => (p + 1) % carouselSlides.length);

  return (
    <>
      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="relative h-[92vh] min-h-[560px] overflow-hidden bg-slate-900">
        {carouselSlides.map((s, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === slide ? "opacity-100" : "opacity-0"}`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${s.fallback}`} />
            <img src={s.url} alt={s.headline} className="absolute inset-0 h-full w-full object-cover"
              onError={(e) => { e.target.style.display = "none"; }} />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
          </div>
        ))}
        <div className="absolute inset-0 flex items-center">
          <div className="container-max">
            <div className="max-w-2xl text-white">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">{APP_INFO.name}</p>
              <h1 className="text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
                {carouselSlides[slide].headline}
              </h1>
              <p className="mt-5 text-lg font-light text-white/75">{carouselSlides[slide].sub}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to={ROUTES.VOLUNTEER} className="rounded-lg bg-accent px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-accent/90 active:scale-95">
                  Join Our Family
                </Link>
                <Link to={ROUTES.DONATE} className="rounded-lg border-2 border-white/70 px-6 py-3 text-sm font-bold text-white transition hover:border-white hover:bg-white/10 active:scale-95">
                  Donate Now
                </Link>
              </div>
            </div>
          </div>
        </div>
        <button onClick={prev} aria-label="Previous" className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2.5 text-white backdrop-blur transition hover:bg-white/35 sm:left-8"><ChevronLeft size={20} /></button>
        <button onClick={next} aria-label="Next"     className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2.5 text-white backdrop-blur transition hover:bg-white/35 sm:right-8"><ChevronRight size={20} /></button>
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {carouselSlides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}
              className={`h-1.5 rounded-full transition-all ${i === slide ? "w-8 bg-white" : "w-2 bg-white/45 hover:bg-white/70"}`} />
          ))}
        </div>
      </section>

      {/* ── THE REALITY ────────────────────────────────────── */}
      <section className="bg-slate-50 dark:bg-slate-800 py-16 sm:py-20">
        <div className="container-max">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">The reality is hard to ignore</h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">These aren't just numbers — they represent millions of lives waiting for change.</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {problemStats.map((s) => (
              <div key={s.label} className="flex items-start gap-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm">
                <span className="text-3xl leading-none">{s.emoji}</span>
                <div>
                  <p className="text-2xl font-extrabold text-primary">{s.number}</p>
                  <p className="mt-1 text-sm leading-snug text-slate-600 dark:text-slate-300">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ─────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="container-max grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Who We Are</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl leading-snug">
              We believe every person deserves dignity and opportunity.
            </h2>
            <p className="mt-5 leading-relaxed text-slate-600 dark:text-slate-300">
              {APP_INFO.name} is a non-profit founded on the belief that grassroots action and community-led
              change can solve India's most pressing social challenges. We work across child care and education,
              women empowerment, and care for the elderly.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">
              We operate on <strong className="text-slate-800 dark:text-slate-100">zero administrative overhead</strong> — every
              rupee contributed goes directly to the communities we serve.
            </p>
            <div className="mt-7 flex flex-wrap gap-5">
              <Link to={ROUTES.ABOUT} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                Learn about us <ArrowRight size={14} />
              </Link>
              <Link to={ROUTES.VOLUNTEER} className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">
                Become a volunteer <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          <div className="relative">
            <img src="/images/activity-children-peace.jpeg" alt="Community volunteers"
              className="w-full rounded-2xl object-cover shadow-xl"
              onError={(e) => { e.target.src = ""; e.target.className = "hidden"; }} />
            <div className="absolute -bottom-5 -left-5 rounded-xl bg-primary px-6 py-4 text-white shadow-lg">
              <p className="text-3xl font-extrabold leading-none">2026</p>
              <p className="mt-0.5 text-xs font-medium text-green-200 uppercase tracking-wide">Founded</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION / VISION ───────────────────────────────── */}
      <section className="bg-surface dark:bg-slate-800 py-12">
        <div className="container-max grid gap-8 sm:grid-cols-2">
          <div className="sm:border-r sm:border-slate-300 dark:sm:border-slate-600 sm:pr-8">
            <h3 className="text-lg font-bold text-primary">Our Mission</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              To improve quality of life for marginalized communities through sustainable social development,
              collective action, and empowerment initiatives that create lasting impact.
            </p>
          </div>
          <div className="sm:pl-8">
            <h3 className="text-lg font-bold text-primary">Our Vision</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              A just and empowered society where every individual can thrive with dignity, access equal
              opportunities, and contribute meaningfully to their communities.
            </p>
          </div>
        </div>
      </section>

      {/* ── IMPACT NUMBERS ─────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="container-max">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Who we are, right now</h2>
          </div>
          <StatGrid stats={impactStats} />
        </div>
      </section>

      {/* ── WHAT WE DO ─────────────────────────────────────── */}
      <section className="bg-slate-50 dark:bg-slate-800 py-16 sm:py-20">
        <div className="container-max">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">What We Do</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{FOCUS_AREAS.length} pillars of change</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {FOCUS_AREAS.map(({ title, description }, idx) => {
              const Icon = focusIconMap[idx];
              const { bg, text } = focusColorMap[idx];
              return (
                <div key={title} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className={`inline-flex rounded-lg p-3 ${bg}`}>
                    <Icon size={22} className={text} />
                  </div>
                  <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">{title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{description}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Link to={ROUTES.WHAT_WE_DO} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              Explore all programs <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── OUR JOURNEY ────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="container-max">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Our Roadmap</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Where we're headed</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {journeyEras.map((era) => (
              <div key={era.era} className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition-shadow hover:shadow-md">
                <img src={era.image} alt={era.era} className="h-44 w-full object-cover" />
                <div className="p-6">
                  <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">{era.era}</span>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{era.desc}</p>
                  <div className="mt-5 flex justify-between border-t border-slate-100 dark:border-slate-700 pt-4 text-center">
                    {[{ v: era.status, l: "Status" }, { v: era.region, l: "Region" }, { v: era.focus, l: "Focus" }].map(({ v, l }) => (
                      <div key={l}>
                        <p className="text-base font-bold text-primary">{v}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BE THE CHANGE ──────────────────────────────────── */}
      <section className="bg-slate-50 dark:bg-slate-800 py-16 sm:py-20">
        <div className="container-max">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Be the change</h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">Every action, big or small, matters.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { title: "Volunteer", desc: "Give your time and skills to directly serve communities. No experience required — just a willing heart.", cta: "Join as Volunteer", path: ROUTES.VOLUNTEER, style: "bg-primary", textColor: "text-white", descColor: "text-green-200", ctaStyle: "bg-white/15 text-white hover:bg-white/25" },
              { title: "Donate",    desc: "Your contribution funds health camps, scholarships, and skill workshops that transform lives.", cta: "Donate Now", path: ROUTES.DONATE, style: "bg-accent", textColor: "text-slate-900", descColor: "text-amber-900", ctaStyle: "bg-slate-900 text-white hover:bg-slate-800" },
              { title: "Spread the Word", desc: "Share our mission with your network. Awareness is the very first step toward change.", cta: "Contact Us", path: ROUTES.CONTACT, style: "bg-slate-700 dark:bg-slate-800", textColor: "text-white", descColor: "text-slate-300", ctaStyle: "bg-white/15 text-white hover:bg-white/25" },
            ].map(({ title, desc, cta, path, style, textColor, descColor, ctaStyle }) => (
              <div key={title} className={`${style} rounded-2xl p-8`}>
                <h3 className={`text-2xl font-bold ${textColor}`}>{title}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${descColor}`}>{desc}</p>
                <Link to={path} className={`mt-6 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition active:scale-95 ${ctaStyle}`}>
                  {cta} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CULTURE VALUES ─────────────────────────────────── */}
      <section className="border-y border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-8">
        <div className="container-max">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {cultureValues.map((v) => (
              <span key={v} className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {v}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── JUST GETTING STARTED ──────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="container-max">
          <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-10 text-center shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Stories</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">We're just getting started</h2>
            <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">
              Beacon Wings Foundation was registered in 2026 — we don't have community stories to share yet,
              and we'd rather wait until we do than make them up. Follow along as our first programs launch,
              or reach out if you want to be part of the story from day one.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link to={ROUTES.VOLUNTEER} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                Become a founding volunteer <ArrowRight size={14} />
              </Link>
              <Link to={ROUTES.CONTACT} className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">
                Get in touch <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
