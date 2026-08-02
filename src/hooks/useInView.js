import { useEffect, useRef, useState } from "react";

/**
 * useInView — triggers once when the referenced element first scrolls
 * into the viewport. Used to fade/slide content in on scroll instead of
 * having it just appear. No animation library needed for something this
 * small (IntersectionObserver is a standard browser API).
 *
 * Respects prefers-reduced-motion: if the visitor has that OS setting on,
 * this returns inView=true immediately so nothing animates for them.
 *
 * @param {object} [options] - IntersectionObserver options (threshold, etc.)
 * @returns {[React.RefObject, boolean]} [ref to attach, whether it's in view]
 */
function useInView(options = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect(); // reveal once, don't re-trigger on scroll up/down
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, inView];
}

export default useInView;
