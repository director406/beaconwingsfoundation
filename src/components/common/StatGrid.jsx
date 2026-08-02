import useInView from "../../hooks/useInView";

/**
 * StatGrid — reusable stat/metric display grid.
 * Consolidates markup previously duplicated between HomePage's
 * "Who we are, right now" section and AboutPage's "Where We Stand Today"
 * section (identical visual patterns, copy-pasted before this refactor).
 *
 * variant="card"  — bordered white/slate cards, alternating accent/primary
 *                    text color (used on a light/surface page background).
 * variant="plain" — no card chrome, accent-colored values on a colored
 *                    section background (used on the primary-bg band).
 *
 * Cards fade/slide in with a stagger the first time the grid scrolls into
 * view (see useInView). These stats are short facts (a year, a status
 * label, a region), not large numbers being reported "over time" from
 * zero — so this reveals them gently rather than running a count-up
 * animation that wouldn't make sense on non-numeric values.
 */
function StatGrid({ stats, variant = "card" }) {
  const [ref, inView] = useInView();

  const revealClass = (i) =>
    `transition-all duration-500 ease-out ${
      inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
    }`;
  const revealDelay = (i) => ({ transitionDelay: inView ? `${i * 90}ms` : "0ms" });

  if (variant === "plain") {
    return (
      <div ref={ref} className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={stat.label} className={`text-center ${revealClass(i)}`} style={revealDelay(i)}>
            <p className="text-5xl font-bold text-accent">{stat.value}</p>
            <p className="mt-2 text-green-100">{stat.label}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="mt-12 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm sm:grid sm:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((s, i) => (
        <div
          key={s.label}
          style={revealDelay(i)}
          className={`bg-white dark:bg-slate-800 px-8 py-10 text-center ${revealClass(i)} ${
            i < stats.length - 1 ? "border-b border-slate-200 dark:border-slate-700 sm:border-b-0 sm:border-r" : ""
          }`}
        >
          <p className={`text-5xl font-extrabold ${s.accent ? "text-primary" : "text-accent"}`}>{s.value}</p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

export default StatGrid;
