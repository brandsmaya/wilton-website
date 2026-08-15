"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";


export default function TeamHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const topContentRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const descTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Computes the visual bounds of the placeholder relative to the pinned container.
      const getSlotRect = () => {
        const slot = placeholderRef.current;
        const parent = pinRef.current;
        if (!slot || !parent) return { left: 0, top: 0, width: 0, height: 0 };
        
        const rect = slot.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();
        
        return {
          left: rect.left - parentRect.left,
          top: rect.top - parentRect.top,
          width: rect.width,
          height: rect.height,
        };
      };

      // Recalculates and sets the absolute image layer bounds to match the placeholder.
      // This is run on scroll refresh and load to keep everything in sync and handle resize.
      const onRefresh = () => {
        const rect = getSlotRect();
        gsap.set(imageWrapRef.current, {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
          borderRadius: 24,
        });
      };

      ScrollTrigger.addEventListener("refresh", onRefresh);
      // Initialize placement
      onRefresh();

      // 1. Initial page load animations for Screen 1 elements (slow, elegant reveal)
      const tlLoad = gsap.timeline({ defaults: { ease: "power4.out" } });

      tlLoad
        .fromTo(
          logoContainerRef.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.8 }
        )
        .fromTo(
          textRef.current,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 2.0 },
          "-=1.4"
        )
        .fromTo(
          descTextRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.6 },
          "-=1.4"
        )
        .fromTo(
          imageWrapRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 2.2, ease: "power3.out" },
          "-=1.8"
        );

      // 2. Scroll-driven pin and zoom-to-fullscreen timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 2}`, // 2x viewport height for scroll duration
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      scrollTl
        // Phase 1: Logo and top text translate upwards and fade out (Progress 0 to 0.5)
        .fromTo(
          topContentRef.current,
          { y: 0, opacity: 1 },
          {
            y: -120,
            opacity: 0,
            ease: "power2.inOut",
            duration: 0.5,
          },
          0
        )
        // Phase 2: Scale image to fullscreen and fade out second text (Progress 0.5 to 1.0)
        // Using left/top/width/height animation completely avoids scale distortion (stretching/shrinking).
        .to(
          imageWrapRef.current,
          {
            left: 0,
            top: 0,
            width: "100vw",
            height: "100dvh",
            borderRadius: 0,
            ease: "sine.inOut",
            duration: 0.5,
          },
          0.5
        )
        .to(
          descTextRef.current,
          {
            opacity: 0,
            y: -40,
            ease: "power2.inOut",
            duration: 0.4,
          },
          0.5
        );
    }, sectionRef);

    // Refresh scroll triggers once layouts have fully resolved
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="team-hero"
      ref={sectionRef}
      className="relative w-full bg-white"
    >
      {/* Pinned stage */}
      <div
        ref={pinRef}
        className="relative -mt-16 min-h-[100dvh] overflow-hidden bg-white"
        style={{ width: "100vw", marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
      >
        {/* Layout content overlay (all visible on page load) */}
        <div className="relative z-10 flex min-h-[100dvh] w-full flex-col justify-between gap-8 px-6 pt-4 pb-12 md:px-16 lg:pb-16">
          {/* Top Column: Logo heading and full-width intro paragraph */}
          <div ref={topContentRef} className="flex flex-col items-start gap-6 lg:gap-8 w-full">
            {/* Logo Heading aligned exactly with home page */}
            <div
              ref={logoContainerRef}
              className="w-full max-w-[200px] lg:max-w-[520px] h-auto lg:h-[200px] aspect-[646.03/200] relative"
            >
              <Link href="/" className="block w-full h-full cursor-pointer">
                <img
                  src="/images/wilton-logo.svg"
                  alt="Wilton Weavers Logo"
                  className="w-full h-full object-contain object-left"
                />
              </Link>
            </div>

            {/* Main introductory statement - wide/full-width styling */}
            <p
              ref={textRef}
              className="main-heading text-brand-dark select-none w-full max-w-[1300px]"
            >
              Behind every world-class carpet is a team committed to precision,
              craftsmanship, and uncompromising quality. Meet the people who
              transform yarn into products trusted by the world's leading aviation,
              marine, hospitality and commercial brands.
            </p>
          </div>

          {/* Bottom Row: Image placeholder (left) & second text (right) */}
          <div className="mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mt-8 lg:mt-0">
            {/* Left Column: Image slot with aspect-ratio preservation and dvh-based auto-scaling */}
            <div className="lg:col-span-8 flex items-end justify-start">
              <div
                ref={placeholderRef}
                className="w-auto h-[22dvh] lg:h-[26dvh] max-w-[560px] aspect-[4/2] pointer-events-none opacity-0"
              />
            </div>

            {/* Right Column: Second text */}
            <div className="lg:col-span-4 flex flex-col justify-end items-end">
              <p
                ref={descTextRef}
                className="body-text text-brand-grey max-w-[340px] text-right select-none"
              >
                At Wilton Weavers, every department works as one, from design and
                engineering to weaving, quality assurance and customer support. Together,
                we create woven flooring solutions that perform beautifully in the world's
                most demanding environments.
              </p>
            </div>
          </div>
        </div>

        {/* Fullscreen background image layer (animated relative to placeholder slot coordinates) */}
        <div
          ref={imageWrapRef}
          className="absolute z-20 overflow-hidden pointer-events-none"
          style={{ transformOrigin: "bottom center" }}
        >
          <img
            ref={imageRef}
            src="/images/team/wilton-team.jpg"
            alt="Wilton Weavers Team"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#626262]/20 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
