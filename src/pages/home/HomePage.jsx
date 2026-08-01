import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap, Stethoscope, Wheat, Scale, Users,
  ChevronLeft, ChevronRight, ArrowRight, Star, MapPin,
} from "lucide-react";
import { ROUTES, APP_INFO, FOCUS_AREAS } from "../../utils/constants";

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
    headline: "Healthcare is a right, not a privilege.",
    sub: "We bring it to every village, every doorstep.",
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
  { number: "65%",   label: "Rural Indians lack quality healthcare access", emoji: "🏥" },
  { number: "70%",   label: "Farmers still rely on traditional methods", emoji: "🌾" },
  { number: "14%",   label: "Rural women are financially independent", emoji: "👩" },
  { number: "40M+",  label: "Indians denied basic legal rights annually", emoji: "⚖️" },
];

const impactStats = [
  { value: "50,000+", label: "Lives Impacted",   accent: true },
  { value: "320+",    label: "Villages Reached",  accent: false },
  { value: "1,200+",  label: "Active Volunteers", accent: true },
  { value: "150+",    label: "Programs Executed", accent: false },
];

const journeyEras = [
  {
    era: "2010 – 2014",
    image: "/images/activity-stationery.jpeg",
    volunteers: "50", cities: "5", lives: "2,000+",
    desc: "Founded with 5 passionate volunteers. We began with grassroots education drives and community health camps across Delhi NCR.",
  },
  {
    era: "2015 – 2019",
    image: "/images/activity-food-bowls.jpeg",
    volunteers: "500", cities: "50", lives: "20,000+",
    desc: "Expanded to 50 villages, launched mobile health clinics, and trained 5,000+ farmers in sustainable agriculture practices.",
  },
  {
    era: "2020 – 2026",
    image: "/images/activity-gift-distribution.jpeg",
    volunteers: "1,200+", cities: "100+", lives: "50,000+",
    desc: "Reached 100+ communities with women empowerment programs, digital literacy drives, and legal aid helpdesks across rural India.",
  },
];

const testimonials = [
  {
    quote: "BWF's health camp visited our village and provided free check-ups for over 200 families. It changed how we see healthcare forever.",
    name: "Sunita Devi", location: "Rajasthan", role: "Community Member",
  },
  {
    quote: "The scholarship my daughter received helped her stay in school. Today she wants to be a doctor — something we never imagined was possible.",
    name: "Ramesh Kumar", location: "Bihar", role: "Farmer",
  },
  {
    quote: "The women's skill workshop gave me the confidence to start my own small business. I am no longer dependent on anyone.",
    name: "Lakshmi Bai", location: "Madhya Pradesh", role: "Entrepreneur",
  },
];

const focusIconMap   = [GraduationCap, Stethoscope, Wheat, Scale, Users];
const focusColorMap  = [
  { bg: "bg-teal-50   dark:bg-teal-900/20",   text: "text-teal-700   dark:text-teal-400"   },
  { bg: "bg-red-50    dark:bg-red-900/20",    text: "text-red-600    dark:text-red-400"    },
  { bg: "bg-green-50  dark:bg-green-900/20",  text: "text-green-700  dark:text-green-400"  },
  { bg: "bg-purple-50 dark:bg-purple-900/20", text: "text-purple-700 dark:text-purple-400" },
  { bg: "bg-orange-50 dark:bg-orange-900/20", text: "text-orange-600 dark:text-orange-400" },
];

const cultureValues = [
  "Community First", "Mission Always", "Zero Overhead",
  "Think Less, Do More", "Decentralize", "Radical Transparency", "Volunteers are Family",
];

function HomePage() {
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
              change can solve India's most pressing social challenges. We work across education, healthcare,
              agriculture, legal aid, and women empowerment.
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
              <p className="text-3xl font-extrabold leading-none">15+</p>
              <p className="mt-0.5 text-xs font-medium text-green-200 uppercase tracking-wide">Years of Impact</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION / VISION ───────────────────────────────── */}
      <section className="bg-primary py-12">
        <div className="container-max grid gap-8 sm:grid-cols-2">
          <div className="sm:border-r sm:border-green-600/50 sm:pr-8">
            <h3 className="text-lg font-bold text-white">Our Mission</h3>
            <p className="mt-3 text-sm leading-relaxed text-green-100">
              To improve quality of life for marginalized communities through sustainable social development,
              collective action, and empowerment initiatives that create lasting impact.
            </p>
          </div>
          <div className="sm:pl-8">
            <h3 className="text-lg font-bold text-white">Our Vision</h3>
            <p className="mt-3 text-sm leading-relaxed text-green-100">
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
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Impact that speaks for itself</h2>
          </div>
          <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm sm:grid sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((s, i) => (
              <div key={s.label} className={`bg-white dark:bg-slate-800 px-8 py-10 text-center ${i < impactStats.length - 1 ? "border-b border-slate-200 dark:border-slate-700 sm:border-b-0 sm:border-r" : ""}`}>
                <p className={`text-5xl font-extrabold ${s.accent ? "text-primary" : "text-accent"}`}>{s.value}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ─────────────────────────────────────── */}
      <section className="bg-slate-50 dark:bg-slate-800 py-16 sm:py-20">
        <div className="container-max">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">What We Do</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Five pillars of change</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
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
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Our Journey</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">How we've grown</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {journeyEras.map((era) => (
              <div key={era.era} className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition-shadow hover:shadow-md">
                <img src={era.image} alt={era.era} className="h-44 w-full object-cover" />
                <div className="p-6">
                  <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">{era.era}</span>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{era.desc}</p>
                  <div className="mt-5 flex justify-between border-t border-slate-100 dark:border-slate-700 pt-4 text-center">
                    {[{ v: era.volunteers, l: "Volunteers" }, { v: era.cities, l: "Cities" }, { v: era.lives, l: "Lives" }].map(({ v, l }) => (
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
      <section className="bg-slate-900 dark:bg-slate-950 py-16 sm:py-20">
        <div className="container-max">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Be the change</h2>
            <p className="mt-3 text-slate-400">Every action, big or small, matters.</p>
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

      {/* ── TESTIMONIALS ───────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="container-max">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Stories</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">From the communities we serve</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-7 shadow-sm">
                <div className="flex gap-0.5 text-accent">
                  {[1,2,3,4,5].map((n) => <Star key={n} size={14} fill="currentColor" />)}
                </div>
                <p className="mt-4 flex-1 italic leading-relaxed text-slate-700 dark:text-slate-200">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3 border-t border-slate-100 dark:border-slate-700 pt-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">{t.name.charAt(0)}</div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</p>
                    <p className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <MapPin size={10} /> {t.location} · {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
