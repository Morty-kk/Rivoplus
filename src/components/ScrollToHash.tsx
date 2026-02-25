import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Smoothly scrolls to the element matching the current URL hash (e.g. /#products).
 * Also scrolls to top when navigating without a hash.
 */
export default function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    const { hash } = location;

    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const id = decodeURIComponent(hash.replace("#", ""));
    const el = document.getElementById(id);

    if (!el) return;

    // rAF ensures the element is in the DOM after route transitions.
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location]);

  return null;
}
