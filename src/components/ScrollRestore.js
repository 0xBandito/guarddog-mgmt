import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const STORAGE_KEY = "gd_scroll_positions";

function readPositions() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function savePosition(pathname, y) {
  try {
    const all = readPositions();
    all[pathname] = y;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    /* sessionStorage quota or disabled — safe to ignore */
  }
}

/**
 * Scroll restoration for React Router SPAs.
 *
 * - PUSH / REPLACE navigations → scroll to top
 * - POP navigations (browser back/forward) → restore the previously-saved
 *   scroll position for that pathname
 * - The very first mount always starts at the top (matches refresh behavior)
 * - Scroll position is saved continuously per pathname while scrolling
 *
 * Replaces the old ScrollToTop component which always jumped to 0.
 */
export default function ScrollRestore() {
  const { pathname } = useLocation();
  const navType = useNavigationType();
  const isFirstMount = useRef(true);

  // Continuously record scroll position for the current path so we have
  // something to restore when the user navigates back to it.
  useEffect(() => {
    const onScroll = () => savePosition(pathname, window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      // Capture final position when leaving the path
      savePosition(pathname, window.scrollY);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  // On route change: restore or scroll-to-top based on navigation type.
  useEffect(() => {
    // First mount: always land at top (a fresh page load, refresh, or direct
    // URL entry). Scroll-restore on real back/forward navigations only.
    if (isFirstMount.current) {
      isFirstMount.current = false;
      window.scrollTo(0, 0);
      if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
      return;
    }

    if (navType === "POP") {
      const savedY = readPositions()[pathname];
      if (savedY == null || savedY < 1) return; // nothing to restore

      // The target page (especially the scroll-driven homepage) needs time
      // for frames to preload and Lenis to initialize before the scroll
      // position will "stick". Schedule a few restore attempts across the
      // likely ready window.
      const apply = () => {
        if (window.__lenis) {
          window.__lenis.scrollTo(savedY, { immediate: true });
        } else {
          window.scrollTo(0, savedY);
        }
      };
      requestAnimationFrame(apply);
      const t1 = setTimeout(apply, 250);
      const t2 = setTimeout(apply, 700);
      const t3 = setTimeout(apply, 1500);
      return () => {
        clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      };
    }

    // PUSH / REPLACE — fresh navigation, go to top
    window.scrollTo(0, 0);
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
  }, [pathname, navType]);

  return null;
}
