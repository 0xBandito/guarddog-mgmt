import { useEffect } from "react";

/**
 * Lightweight per-route meta tag manager.
 *
 * Sets document.title, <meta name="description">, <meta property="og:*">,
 * <meta name="twitter:*">, and <link rel="canonical"> for the current route
 * on mount. On unmount, the next page's call to usePageMeta replaces these
 * — so there's no need to "restore" defaults.
 *
 * Usage:
 *   usePageMeta({
 *     title: "About — Guard Dog Management",
 *     description: "Meet the team behind Guard Dog Management.",
 *     path: "/about",
 *   });
 */

const SITE_NAME = "Guard Dog Management";
const DEFAULT_OG_IMAGE = "/images/og-image.png";

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    // Parse attribute from selector: meta[name="description"] or meta[property="og:title"]
    const match = selector.match(/meta\[([^=]+)="([^"]+)"\]/);
    if (match) {
      el.setAttribute(match[1], match[2]);
      document.head.appendChild(el);
    } else {
      return;
    }
  }
  el.setAttribute(attr, value);
}

function setCanonical(url) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", url);
}

export default function usePageMeta({ title, description, path, ogImage }) {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      setMeta('meta[name="description"]', "content", description);
      setMeta('meta[property="og:description"]', "content", description);
      setMeta('meta[name="twitter:description"]', "content", description);
    }

    if (title) {
      setMeta('meta[property="og:title"]', "content", title);
      setMeta('meta[name="twitter:title"]', "content", title);
    }

    if (ogImage) {
      setMeta('meta[property="og:image"]', "content", ogImage);
      setMeta('meta[name="twitter:image"]', "content", ogImage);
    }

    setMeta('meta[property="og:site_name"]', "content", SITE_NAME);
    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");

    if (path && typeof window !== "undefined") {
      const base = window.location.origin;
      const fullUrl = base + path;
      setCanonical(fullUrl);
      setMeta('meta[property="og:url"]', "content", fullUrl);
    }
  }, [title, description, path, ogImage]);
}

// Named export for the default og image so pages can reference it
export { DEFAULT_OG_IMAGE };
