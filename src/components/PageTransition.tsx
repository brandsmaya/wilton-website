"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useAnimationControls } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Same "custom luxury" cubic-bezier already used for the fullscreen menu
// overlay in Navigation.tsx, so this reads as part of the same motion
// language rather than a bolted-on effect.
const EASE = [0.16, 1, 0.3, 1] as const;
const COVER_DURATION = 0.65;
const REVEAL_DURATION = 0.75;
const REVEAL_DELAY = 0.15;

export default function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const controls = useAnimationControls();
  const pendingHrefRef = useRef<string | null>(null);
  const previousPathnameRef = useRef(pathname);
  const [logoVisible, setLogoVisible] = useState(false);

  // Intercept internal link clicks: cover the screen first, THEN navigate,
  // so the route swap happens hidden behind the curtain instead of as a
  // visible jump-cut. External links, hash anchors, new-tab/download links
  // and modified clicks (ctrl/cmd/etc.) are left to the browser as normal.
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      )
        return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;

      e.preventDefault();
      pendingHrefRef.current = url.pathname + url.search + url.hash;

      // Navigation is driven by a wall-clock timer, not the animation
      // promise's resolution — decoupling it from requestAnimationFrame
      // means a throttled/backgrounded tab (or reduced-motion skipping the
      // tween outright) can never leave navigation stuck waiting on an
      // animation that never reports completion.
      controls.start({
        y: "0%",
        transition: { duration: COVER_DURATION, ease: EASE },
      });
      window.setTimeout(() => {
        setLogoVisible(true);
        // Client-side navigation doesn't reset scroll position the way a
        // full page load does, so the next page's own pinned ScrollTrigger
        // timelines (AboutSections, the wheel sections, etc.) would
        // otherwise initialize mid-scrub instead of at their start. Reset
        // it here, while fully covered, so the jump is never visible.
        window.scrollTo(0, 0);
        if (pendingHrefRef.current) {
          router.push(pendingHrefRef.current);
        }
      }, COVER_DURATION * 1000);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [controls, router]);

  // Once the new route has actually mounted (pathname changed), reveal it.
  useEffect(() => {
    if (previousPathnameRef.current === pathname) return;
    previousPathnameRef.current = pathname;
    pendingHrefRef.current = null;

    // Defensive second reset: covers direct router.push() calls elsewhere
    // and any case where Lenis re-synced to a stale scroll position while
    // the new page's SmoothScroll instance was mounting.
    window.scrollTo(0, 0);

    // Every pinned section's own ScrollTrigger.create() runs as soon as it
    // mounts, each recalculating its start/end against whatever the page
    // looks like *right then*. On a full page load, the browser's own
    // "load" event fires once everything (fonts, images) has settled and
    // each component's own `window.addEventListener("load", refresh)`
    // catches up — but "load" never fires again on this kind of
    // client-side route swap, so that safety net silently does nothing
    // here. Do the same recalculation manually once the new page's own
    // mount effects have had a chance to register their triggers.
    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    setLogoVisible(false);
    controls.start({
      y: "-100%",
      transition: { duration: REVEAL_DURATION, ease: EASE, delay: REVEAL_DELAY },
    });

    return () => window.clearTimeout(refreshTimer);
  }, [pathname, controls]);

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={controls}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-brand-dark pointer-events-none"
    >
      <motion.img
        src="/images/wilton-logo.svg"
        alt=""
        aria-hidden="true"
        className="h-auto w-40 object-contain opacity-90 brightness-0 invert"
        animate={{ opacity: logoVisible ? 1 : 0, y: logoVisible ? 0 : 10 }}
        transition={{ duration: 0.4, ease: EASE }}
      />
    </motion.div>
  );
}
