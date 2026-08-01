import { Link } from "react-router-dom";
import { GraduationCap, Stethoscope, Wheat, Scale, Users, ArrowRight } from "lucide-react";
import { ROUTES } from "../../utils/constants";

const pillars = [
  {
    icon: GraduationCap, title: "Education", tagline: "Lighting the path to a better future",
    color: { bg: "bg-teal-600", light: "bg-teal-50 dark:bg-teal-900/20", text: "text-teal-700 dark:text-teal-400", dot: "bg-teal-600" },
    image: "/images/activity-children-session.jpeg",
    desc: "Access to quality education is one of the most powerful catalysts for breaking the cycle of poverty. BWF provides scholarships, free tutoring, digital literacy training, and school supplies to children and youth in underserved communities across rural India.",
    highlights: ["Scholarships for 5,000+ students annually", "Digital learning labs in 180+ villages", "Youth leadership and mentorship camps", "Adult literacy programs for parents"],
  },
  {
    icon: Stethoscope, title: "Healthcare", tagline: "Because health is a fundamental right",
    color: { bg: "bg-red-600", light: "bg-red-50 dark:bg-red-900/20", text: "text-red-600 dark:text-red-400", dot: "bg-red-600" },
    image: "/images/activity-food-bowls.jpeg",
    desc: "Millions of Indians in rural areas lack access to basic medical care. Our mobile health clinics travel to remote communities offering free consultations, medicines, maternal care, and preventive health screenings.",
    highlights: ["40+ mobile health clinics across 15 states", "80,000+ patients served annually", "Nutrition and maternal health programs", "Mental health awareness sessions"],
  },
  {
    icon: Wheat, title: "Agriculture", tagline: "Empowering the farmers who feed our nation",
    color: { bg: "bg-green-700", light: "bg-green-50 dark:bg-green-900/20", text: "text-green-700 dark:text-green-400", dot: "bg-green-700" },
    image: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=700&h=450&fit=crop",
    desc: "India's agricultural sector supports over 600 million people, yet most small farmers struggle with low yields and debt. We train farmers in organic and sustainable methods, connect them to markets, and advocate for fair credit and insurance access.",
    highlights: ["5,000+ farmers trained in organic methods", "Collective farming cooperatives in 12 states", "Soil health testing and crop planning support", "Market linkage and price discovery programs"],
  },
  {
    icon: Scale, title: "Legal Advisory", tagline: "Justice for those who need it most",
    color: { bg: "bg-purple-700", light: "bg-purple-50 dark:bg-purple-900/20", text: "text-purple-700 dark:text-purple-400", dot: "bg-purple-700" },
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=700&h=450&fit=crop",
    desc: "Lack of legal awareness leaves millions vulnerable to exploitation. Our legal helpdesks provide free consultations, documentation assistance, and rights education to daily-wage workers, women, and marginalized communities.",
    highlights: ["10,000+ legal consultations provided", "50+ pro-bono lawyers in our network", "Legal rights literacy camps in 8 states", "Land rights and labour law advocacy"],
  },
  {
    icon: Users, title: "Women Empowerment", tagline: "When women rise, communities thrive",
    color: { bg: "bg-orange-600", light: "bg-orange-50 dark:bg-orange-900/20", text: "text-orange-600 dark:text-orange-400", dot: "bg-orange-600" },
    image: "/images/activity-gift-distribution.jpeg",
    desc: "Women in rural India face deep structural barriers to education, work, and autonomy. BWF runs vocational training, self-help groups, entrepreneurship support, and safety awareness programs enabling women to build financial independence.",
    highlights: ["8,000+ women trained in vocational skills", "120+ self-help groups established", "Micro-finance linkage support", "Safety, health, and legal rights workshops"],
  },
    {
    icon: Users, title: "Self Defence", tagline: "When we rise, communities thrive",
    color: { bg: "bg-orange-600", light: "bg-orange-50 dark:bg-orange-900/20", text: "text-orange-600 dark:text-orange-400", dot: "bg-orange-600" },
    image: "/images/community-volunteers-group.jpeg",
    desc: "People in rural India face deep structural barriers to education, work, and autonomy. BWF runs vocational training, self-help groups, entrepreneurship support, and safety awareness programs enabling women and men to build self defence skills.",
    highlights: ["8,000+ people trained in self defence", "120+ self-help groups established", "Micro-techniques support", "Safety, health, and legal rights workshops"],
  },
];

function WhatWeDoPage() {
  return (
    <>
      <section className="bg-primary py-14 text-white">
        <div className="container-max">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Our Work</p>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">What We Do</h1>
          <p className="mt-3 max-w-xl text-green-100">
            Five pillars of community-focused interventions designed for sustainable, long-term impact.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="container-max space-y-16">
          {pillars.map(({ icon: Icon, title, tagline, color, image, desc, highlights }, idx) => (
            <div key={title} className={`grid gap-10 lg:grid-cols-2 lg:items-center ${idx % 2 !== 0 ? "lg:grid-flow-dense" : ""}`}>
              <div className={idx % 2 !== 0 ? "lg:col-start-2" : ""}>
                <div className={`inline-flex rounded-lg p-3 ${color.light}`}>
                  <Icon size={24} className={color.text} />
                </div>
                <p className={`mt-3 text-xs font-bold uppercase tracking-[0.18em] ${color.text}`}>{tagline}</p>
                <h2 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">{title}</h2>
                <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">{desc}</p>
                <ul className="mt-5 space-y-2">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${color.dot}`} />
                      {h}
                    </li>
                  ))}
                </ul>
                <Link to={ROUTES.PROGRAMS} className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${color.text} hover:underline`}>
                  View related programs <ArrowRight size={14} />
                </Link>
              </div>
              <div className={idx % 2 !== 0 ? "lg:col-start-1" : ""}>
                <img src={image} alt={title} className="w-full rounded-2xl object-cover shadow-xl" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 dark:bg-slate-950 py-14 text-white">
        <div className="container-max flex flex-col items-center gap-5 text-center">
          <h2 className="text-3xl font-bold">Ready to make a difference?</h2>
          <p className="max-w-lg text-slate-400">Join our volunteer network or contribute to keep these programs running strong.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={ROUTES.VOLUNTEER} className="rounded-lg bg-white px-6 py-3 text-sm font-bold text-slate-900 hover:bg-slate-100 transition">Become a Volunteer</Link>
            <Link to={ROUTES.DONATE}    className="rounded-lg bg-accent px-6 py-3 text-sm font-bold text-slate-900 hover:bg-accent/90 transition">Donate Now</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default WhatWeDoPage;
