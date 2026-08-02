import { Link } from "react-router-dom";
import { GraduationCap, Stethoscope, Wheat, Scale, Users, Leaf, Mic2, Laptop, ArrowRight } from "lucide-react";
import { ROUTES } from "../../utils/constants";

const programs = [
  {
    id: 1, name: "Rural Education Support",  category: "Education",
    icon: GraduationCap,
    color: { bg: "bg-teal-50 dark:bg-teal-900/20", text: "text-teal-700 dark:text-teal-400", badge: "bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300" },
    desc: "Scholarships, stationery, and mentorship for underprivileged children in rural areas, keeping them enrolled and learning.",
    stats: ["Launching 2026", "Delhi NCR"],
  },
  {
    id: 2, name: "Mobile Health Clinics", category: "Healthcare",
    icon: Stethoscope,
    color: { bg: "bg-red-50 dark:bg-red-900/20", text: "text-red-600 dark:text-red-400", badge: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" },
    desc: "Mobile medical units reaching remote villages with free diagnosis, medicines, and preventive care.",
    stats: ["Launching 2026", "Delhi NCR"],
  },
  {
    id: 3, name: "Organic Farming Workshops", category: "Agriculture",
    icon: Wheat,
    color: { bg: "bg-green-50 dark:bg-green-900/20", text: "text-green-700 dark:text-green-400", badge: "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300" },
    desc: "Training smallholder farmers in organic and sustainable farming practices, reducing costs and improving yields.",
    stats: ["Launching 2026", "Delhi NCR"],
  },
  {
    id: 4, name: "Legal Rights Helpdesk", category: "Legal Advisory",
    icon: Scale,
    color: { bg: "bg-purple-50 dark:bg-purple-900/20", text: "text-purple-700 dark:text-purple-400", badge: "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300" },
    desc: "Free legal consultations, rights education, and documentation assistance to marginalized communities.",
    stats: ["Launching 2026", "Delhi NCR"],
  },
  {
    id: 5, name: "Women Skill Development", category: "Women Empowerment",
    icon: Users,
    color: { bg: "bg-orange-50 dark:bg-orange-900/20", text: "text-orange-600 dark:text-orange-400", badge: "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300" },
    desc: "Vocational training and entrepreneurship programs enabling rural women to achieve financial independence.",
    stats: ["Launching 2026", "Delhi NCR"],
  },
  {
    id: 6, name: "Youth Leadership Camps", category: "Education",
    icon: Mic2,
    color: { bg: "bg-teal-50 dark:bg-teal-900/20", text: "text-teal-700 dark:text-teal-400", badge: "bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300" },
    desc: "Residential camps developing communication, critical thinking, and leadership in underserved youth.",
    stats: ["Launching 2026", "Delhi NCR"],
  },
  {
    id: 7, name: "Nutrition Awareness Program", category: "Healthcare",
    icon: Leaf,
    color: { bg: "bg-red-50 dark:bg-red-900/20", text: "text-red-600 dark:text-red-400", badge: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" },
    desc: "Community drives tackling malnutrition through dietary education, supplementation, and cooking demonstrations.",
    stats: ["Launching 2026", "Delhi NCR"],
  },
  {
    id: 8, name: "Community Digital Literacy", category: "Education",
    icon: Laptop,
    color: { bg: "bg-teal-50 dark:bg-teal-900/20", text: "text-teal-700 dark:text-teal-400", badge: "bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300" },
    desc: "Teaching smartphones, internet, online banking, and government portals to first-time technology users.",
    stats: ["Launching 2026", "Delhi NCR"],
  },
];

function ProgramsPage() {
  return (
    <>
      <section className="bg-primary py-14 text-white">
        <div className="container-max">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Our Work</p>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Programs</h1>
          <p className="mt-3 max-w-xl text-green-100">
            {programs.length} flagship initiatives designed for measurable, long-term community impact.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="container-max">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {programs.map(({ id, name, category, icon: Icon, color, desc, stats }) => (
              <div key={id} className="group flex flex-col rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex items-start justify-between gap-2">
                  <div className={`inline-flex rounded-lg p-3 ${color.bg}`}>
                    <Icon size={22} className={color.text} />
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${color.badge}`}>{category}</span>
                </div>
                <h3 className="mt-4 font-bold text-slate-900 dark:text-white">{name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{desc}</p>
                <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 dark:border-slate-700 pt-4">
                  {stats.map((s) => (
                    <span key={s} className="rounded-full bg-slate-100 dark:bg-slate-700 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl bg-primary py-12 text-center text-white">
            <h2 className="text-2xl font-bold">Want to support these programs?</h2>
            <p className="max-w-md text-green-200 text-sm">Volunteer your time or donate to keep our programs running strong.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to={ROUTES.VOLUNTEER} className="rounded-lg bg-white px-6 py-3 text-sm font-bold text-primary transition hover:bg-slate-100">Volunteer</Link>
              <Link to={ROUTES.DONATE}    className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-accent/90">Donate Now <ArrowRight size={14} /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProgramsPage;
