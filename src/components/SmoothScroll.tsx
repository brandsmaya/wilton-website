"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis with a heavy, luxurious feel
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });

    // Link Lenis scrolling to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis animation frame requests to the GSAP ticker
    const updatePhysics = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updatePhysics);

    // Disable GSAP lag smoothing to keep scroll triggers in absolute sync
    gsap.ticker.lagSmoothing(0);

    // Clean up on unmount
    return () => {
      lenis.destroy();
      gsap.ticker.remove(updatePhysics);
    };
  }, []);

  return <>{children}</>;
}
