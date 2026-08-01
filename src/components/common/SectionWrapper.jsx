function SectionWrapper({ title, subtitle, children, className = "" }) {
  return (
    <section className={`py-14 sm:py-16 ${className}`}>
      <div className="container-max">
        {(title || subtitle) && (
          <div className="mb-8 text-center sm:mb-10">
            {title && (
              <h2 className="text-2xl font-bold text-primary sm:text-3xl">{title}</h2>
            )}
            {subtitle && (
              <p className="mt-3 text-slate-600 dark:text-slate-400">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export default SectionWrapper;
