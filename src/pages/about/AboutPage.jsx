import { Target, Eye, Heart, Users, Award, Shield, Lightbulb, HandHeart } from "lucide-react";
import { SectionWrapper, Card, StatGrid, PageHeader } from "../../components";
import { APP_INFO } from "../../utils/constants";
import useDocumentMeta from "../../hooks/useDocumentMeta";

const coreValues = [
  { icon: Heart,      title: "Compassion",    description: "Driven by empathy and commitment to human dignity" },
  { icon: Shield,     title: "Integrity",     description: "Transparent operations and accountable practices" },
  { icon: Lightbulb,  title: "Innovation",    description: "Creative solutions for sustainable development" },
  { icon: HandHeart,  title: "Collaboration", description: "Building partnerships with communities and stakeholders" },
];

const teamMembers = [
  { name: "Prachi Nirmal",      role: "Founder & Executive Director",       image: "/images/prachin.png", color: "bg-emerald-600" },
  { name: "Sampurn Aanand",     role: "Deputy Director",                    image: "/images/team-sampurn.jpeg", color: "bg-teal-600"   },
  { name: "Gaurav Vyas",        role: "Operations Head",                    image: "/images/team-gaurav.jpeg", color: "bg-green-700"   },
  // { name: "Ansu Kannoujia",     role: "Women Empowerment Lead",             image: "/images/team-ansu.png", color: "bg-orange-500"    },
  { name: "Arif",               role: "Women Empowerment — Community Safety", image: "/images/team-arif.png", color: "bg-blue-600"      },
  { name: "Santosh Singh",      role: "Field Operations Lead",              image: "/images/team-santosh.png", color: "bg-amber-600"  },
  { name: "Akansha Srivastav", role: "Old Age People Care Lead",         image: "/images/team-a.png", color: "bg-rose-600"   },
  { name: "Mayank Pandey",      role: "Communications & Partnerships Head", image: "/images/team-mayan.png", color: "bg-purple-600"  },
  { name: "Nitin Singh",        role: "Head of Programs",                   image: "/images/team-nitin.jpeg", color: "bg-cyan-600"    },
  { name: "Krishna Mohan",      role: "Child Development & Education Lead", image: "/images/team-.png", color: "bg-indigo-600" },
  { name: "Amit Kumar",          role: "Technology & Digital Support Lead",  image: "/images/team-amit.jpeg", color: "bg-slate-600"      },
];

function AboutPage() {
  useDocumentMeta("About Us", "Our mission, vision, and leadership team.");
  return (
    <>
      {/* Hero */}
      <PageHeader
        eyebrow="Our Story"
        title={`About ${APP_INFO.shortName}`}
        description={`${APP_INFO.name} is a non-governmental organization dedicated to uplifting underprivileged communities through sustainable, people-first programs and measurable outcomes.`}
      />

      {/* Mission & Vision */}
      <section className="bg-slate-50 dark:bg-slate-800 py-16">
        <div className="container-max">
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="border-l-4 border-primary">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-green-50 dark:bg-green-900/30 p-3 text-primary">
                  <Target size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">Our Mission</h3>
                  <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">
                    To improve quality of life for marginalized communities through sustainable social development programs,
                    collective action, and empowerment initiatives that create lasting impact.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="border-l-4 border-accent">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-orange-50 dark:bg-orange-900/30 p-3 text-accent">
                  <Eye size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">Our Vision</h3>
                  <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">
                    A just and empowered society where every individual can thrive with dignity, access equal opportunities,
                    and contribute meaningfully to their communities.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <SectionWrapper title="Core Values" subtitle="Principles that guide our work and decision-making">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {coreValues.map((value) => (
            <Card key={value.title} className="text-center">
              <div className="mx-auto inline-flex rounded-full bg-green-50 dark:bg-green-900/30 p-4 text-primary">
                <value.icon size={32} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-primary">{value.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{value.description}</p>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* Objectives */}
      <section className="bg-white dark:bg-slate-900 py-16">
        <div className="container-max">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-primary">Our Objectives</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">Key focus areas driving our community impact</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              "Provide access to quality education and holistic upliftment for underprivileged children",
              "Support children's nutrition, wellbeing, and safe learning environments",
              "Advance women's skill development, self-reliance, and economic independence",
              "Build community-led self-help groups and financial literacy among women",
              "Ensure dignity, companionship, and health support for elderly community members",
              "Reduce isolation among seniors through regular engagement and care programs",
            ].map((objective, idx) => (
              <div key={idx} className="flex gap-4 rounded-xl2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5">
                <div className="shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">{idx + 1}</div>
                </div>
                <p className="text-slate-700 dark:text-slate-300">{objective}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      {/* <SectionWrapper title="Our Journey" subtitle="Milestones in our mission to transform lives">
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-green-200 dark:bg-slate-700 lg:left-1/2" />
          <div className="space-y-8">
            {milestones.map((milestone, idx) => (
              <div key={idx} className={`relative flex items-center gap-8 ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                <div className="absolute left-8 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-primary lg:left-1/2">
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
                <div className="ml-16 lg:ml-0 lg:w-1/2">
                  <Card className={idx % 2 === 0 ? "lg:mr-12" : "lg:ml-12"}>
                    <span className="inline-block rounded-full bg-primary px-3 py-1 text-sm font-bold text-white">{milestone.year}</span>
                    <p className="mt-3 text-slate-700 dark:text-slate-300">{milestone.event}</p>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper> */}

      {/* Team */}
      <section className="bg-slate-50 dark:bg-slate-800 py-16">
        <div className="container-max">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary">Our Leadership Team</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">Dedicated professionals driving social change</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <div key={member.name} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-6 flex flex-col items-center text-center">
                {member.image ? (
                  <div className="h-28 w-28 rounded-full overflow-hidden ring-4 ring-green-100 dark:ring-green-900/40">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className={`h-28 w-28 rounded-full flex items-center justify-center ring-4 ring-green-100 dark:ring-green-900/40 ${member.color}`}>
                    <span className="text-3xl font-bold text-white">
                      {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                )}
                <div className="mt-4">
                  <h3 className="font-semibold text-primary">{member.name}</h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-snug">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-surface dark:bg-slate-800 py-16">
        <div className="container-max">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Where We Stand Today</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">A new foundation, built to last</p>
          </div>
          <StatGrid
            variant="card"
            stats={[
              { value: "2026", label: "Founded", accent: true },
              { value: "Section 8", label: "Registered Status", accent: false },
              { value: "3", label: "Focus Areas", accent: true },
              { value: "Delhi NCR", label: "Where We Operate", accent: false },
            ]}
          />
        </div>
      </section>
    </>
  );
}

export default AboutPage;
