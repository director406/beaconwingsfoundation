/**
 * PageHeader — the page-title band under the Navbar, used at the top of
 * every inner page (About, Programs, Donate, Volunteer, Gallery, Contact,
 * What We Do).
 *
 * Previously each page duplicated an identical `bg-primary ... text-white`
 * block — a solid, fairly dark green band on every single page. Extracted
 * here both to remove the duplication and to switch to a light background
 * (bg-surface — the site's own soft-mint brand token, not an off-brand
 * white) with dark text, matching the "keep backgrounds light" direction.
 * The accent-colored eyebrow label is kept for a small pop of color
 * without a full dark band.
 */
function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="border-b border-slate-200 dark:border-slate-700 bg-surface dark:bg-slate-800 py-14">
      <div className="container-max">
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
        )}
        <h1 className="mt-3 text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">{title}</h1>
        {description && (
          <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-300">{description}</p>
        )}
      </div>
    </section>
  );
}

export default PageHeader;
