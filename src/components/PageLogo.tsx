"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Reproduces the logo entrance/exit animation used by the pinned heroes
// (Hero, AboutHero, TeamHero) for pages that don't have a full-bleed
// pinned hero of their own: fades/slides in on load, then fades out once
// the user scrolls past the same threshold that reveals Navigation's own
// compact logo, so the two never appear on screen at once.
export default function PageLogo() {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.fromTo(
      logoRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.8 }
    );

    const handleScroll = () => {
      const scrolled = window.scrollY > window.innerHeight * 0.95;
      gsap.to(logoRef.current, {
        opacity: scrolled ? 0 : 1,
        y: scrolled ? -28 : 0,
        duration: 0.45,
        ease: "power1.inOut",
        overwrite: "auto",
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={logoRef}
      className="w-full max-w-[200px] lg:max-w-[520px] h-auto lg:h-[200px] aspect-[646.03/200] relative"
    >
      <a href="/" className="block w-full h-full cursor-pointer">
        <img
          src="/images/wilton-logo.svg"
          alt="Wilton Weavers Logo"
          className="w-full h-full object-contain object-left"
        />
      </a>
    </div>
  );
}
