import { useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Fixes a classic React Router + BrowserRouter issue:
 * the BROWSER (not React Router) remembers the exact scroll position
 * for every entry in its history stack. So if you scrolled down to
 * #projects on "/" and then navigated to "/links", pressing the
 * native Back button (or window.history.back()) restores that exact
 * pixel position — landing you back on Projects instead of the top.
 * Clicking a "Home" link can look the same if it also triggers a
 * POP-type navigation somewhere, or if the browser hasn't repainted
 * yet when it restores scroll.
 *
 * Fix:
 * 1. Turn off the browser's automatic scroll restoration once, globally.
 * 2. On every route change, decide the scroll ourselves:
 *    - if the URL has a hash (e.g. "/#projects"), scroll to that section
 *    - otherwise scroll to the top
 *
 * Usage: mount this ONCE, directly inside <BrowserRouter>, above <Routes>.
 *
 *   <BrowserRouter>
 *     <ScrollToTop />
 *     <Routes>...</Routes>
 *   </BrowserRouter>
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType(); // "POP" | "PUSH" | "REPLACE"

  // Disable the browser's own scroll memory — we're taking over.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    // Respect in-page anchor links, e.g. a "Projects" nav item that
    // points to "/#projects" — scroll to that section instead of top.
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    // Every other navigation (Home button, back/forward, any route
    // change without a hash) always lands at the top of the page.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash, navigationType]);

  return null;
}