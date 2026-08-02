import { useEffect } from "react";
import { APP_INFO } from "../utils/constants";

/**
 * useDocumentMeta — sets document.title and the meta description for the
 * current route. A full SPA meta-tag solution (like react-helmet-async)
 * is more than this project needs right now: every route is public,
 * there's no streaming/SSR, and this is the only tag we need to vary.
 * A ~20-line hook keeps the dependency count at zero.
 *
 * @param {string} title - Page-specific title (site name is appended).
 * @param {string} [description] - Page-specific meta description.
 */
function useDocumentMeta(title, description) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${APP_INFO.name}` : APP_INFO.name;
    const previousTitle = document.title;
    document.title = fullTitle;

    let meta = document.querySelector('meta[name="description"]');
    let createdMeta = false;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
      createdMeta = true;
    }
    const previousDescription = meta.getAttribute("content");
    if (description) {
      meta.setAttribute("content", description);
    }

    return () => {
      document.title = previousTitle;
      if (createdMeta) {
        meta.remove();
      } else if (previousDescription !== null) {
        meta.setAttribute("content", previousDescription);
      }
    };
  }, [title, description]);
}

export default useDocumentMeta;
