import { Link } from "react-router-dom";
import { GraduationCap, Users, Heart, PawPrint, ArrowRight } from "lucide-react";
import { ROUTES } from "../../utils/constants";
import useDocumentMeta from "../../hooks/useDocumentMeta";
import { PageHeader } from "../../components";

// The organization's actual 3 registered focus areas, per the Certificate
// of Incorporation. Previously this listed 6 generic categories (Education,
// Healthcare, Agriculture, Legal Advisory, Women Empowerment, Self Defence)
// inherited from the template this site was built from.
const pillars = [
  {
    icon: GraduationCap, title: "Child Care", tagline: "Education & Upliftment",
    color: { bg: "bg-teal-600", light: "bg-teal-50 dark:bg-teal-900/20", text: "text-teal-700 dark:text-teal-400", dot: "bg-teal-600" },
    image: "/images/activity-notebook-distribution-3.jpeg",
    desc: "Every child deserves the chance to learn, grow, and be cared for — regardless of their family's circumstances. BWF works to give underprivileged children access to education and the broader support that helps them thrive: learning support, nutrition, and mentorship.",
    highlights: ["Scholarships for underprivileged students (launching 2026)", "Community learning centers planned for our first neighborhoods", "Nutrition support paired with learning programs", "Mentorship and holistic upliftment activities for children"],
  },
  {
    icon: Users, title: "Women Empowerment", tagline: "When women rise, communities thrive",
    color: { bg: "bg-purple-700", light: "bg-purple-50 dark:bg-purple-900/20", text: "text-purple-700 dark:text-purple-400", dot: "bg-purple-700" },
    image: "/images/community-team-selfie.jpeg", // no Women Empowerment-specific photo available yet; shows real team/community
    desc: "Women in underserved communities often face structural barriers to education, work, and independence. BWF runs vocational training, self-help groups, and skill-building programs that help women build financial independence and confidence.",
    highlights: ["Vocational training for rural and urban women", "Self-help groups, starting in our first communities", "Financial literacy and micro-enterprise support", "Safety, health, and legal-rights awareness workshops"],
  },
  {
    icon: Heart, title: "Old Age People Care", tagline: "No one should grow old alone",
    color: { bg: "bg-red-600", light: "bg-red-50 dark:bg-red-900/20", text: "text-red-600 dark:text-red-400", dot: "bg-red-600" },
    image: "/images/activity-icebreaker-game.jpeg", // no Old Age Care-specific photo available yet; neutral community photo
    desc: "Millions of elderly Indians live alone or without adequate support as family structures change. BWF is building programs centered on companionship, health support, and dignity for the elderly members of our communities.",
    highlights: ["Companionship visits and community engagement for seniors", "Health and wellness camps tailored for elderly needs", "Support connecting seniors with essential services", "Dignity-focused care programs, starting locally"],
  },
  {
    icon: PawPrint, title: "Animal Welfare", tagline: "Every life deserves care",
    color: { bg: "bg-lime-600", light: "bg-lime-50 dark:bg-lime-900/20", text: "text-lime-700 dark:text-lime-400", dot: "bg-lime-600" },
    image: "/images/activity-group-game.jpeg", // no Animal Welfare-specific photo available yet; neutral community photo
    desc: "Street animals and strays in our communities often face neglect, injury, and lack of access to basic care. BWF is building a program around rescue support, feeding drives, and welfare awareness — led by our Animal Welfare Department under Poonam Agrawal.",
    highlights: ["Rescue and care support for injured or stray animals (launching 2026)", "Community feeding drives, starting in our first neighborhoods", "Vaccination and sterilization awareness camps", "Volunteer-led animal welfare education in local communities"],
  },
];

function WhatWeDoPage() {
  useDocumentMeta("What We Do", "The community-focused programs we're building across Child Care, Women Empowerment, Old Age People Care, and Animal Welfare.");
  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        title="What We Do"
        description={`${pillars.length} pillars of community-focused interventions designed for sustainable, long-term impact.`}
      />

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

      <section className="bg-surface dark:bg-slate-800 py-14">
        <div className="container-max flex flex-col items-center gap-5 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Ready to make a difference?</h2>
          <p className="max-w-lg text-slate-600 dark:text-slate-300">Join our volunteer network or contribute to keep these programs running strong.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={ROUTES.VOLUNTEER} className="rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary/90 transition">Become a Volunteer</Link>
            <Link to={ROUTES.DONATE}    className="rounded-lg bg-accent px-6 py-3 text-sm font-bold text-slate-900 hover:bg-accent/90 transition">Donate Now</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default WhatWeDoPage;
