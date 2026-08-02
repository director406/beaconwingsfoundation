/**
 * RouteLoader — Suspense fallback shown briefly while a lazy-loaded route
 * chunk downloads. Uses aria-live so screen readers announce the loading
 * state instead of silently pausing.
 */
function RouteLoader() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
        <p className="text-sm text-slate-500 dark:text-slate-400">Loading…</p>
      </div>
    </div>
  );
}

export default RouteLoader;
