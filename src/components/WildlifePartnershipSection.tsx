"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WildlifePartnershipSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const topContentRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

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
      const onRefresh = () => {
        const rect = getSlotRect();
        gsap.set(imageWrapRef.current, {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
          borderRadius: 24, // Matches the rounded-2xl style in the screenshot
        });
      };

      ScrollTrigger.addEventListener("refresh", onRefresh);
      // Initialize placement
      onRefresh();

      // Scroll-driven pin and zoom-to-fullscreen timeline
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
        // Phase 1: Fade out top header and paragraph details (Progress 0 to 0.5)
        .to(
          [topContentRef.current, detailsRef.current],
          {
            y: -80,
            opacity: 0,
            ease: "power2.inOut",
            duration: 0.55,
          },
          0
        )
        // Phase 2: Scale image to fullscreen (Progress 0.45 to 1.0)
        .to(
          imageWrapRef.current,
          {
            left: 0,
            top: 0,
            width: "100vw",
            height: "100dvh",
            borderRadius: 0,
            ease: "sine.inOut",
            duration: 0.55,
          },
          0.45
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
      ref={sectionRef}
      className="relative w-full bg-white thin-divider"
    >
      {/* Pinned stage */}
      <div
        ref={pinRef}
        className="relative min-h-[100dvh] overflow-hidden bg-white"
        style={{ width: "100vw", marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
      >
        {/* Layout content overlay (all visible on page load) */}
        <div className="relative z-10 flex min-h-[100dvh] w-full flex-col justify-between gap-12 px-6 pt-16 pb-16 md:px-16 lg:pt-20 lg:pb-20">
          
          {/* Top Column: Header */}
          <div ref={topContentRef} className="flex flex-col items-start gap-3 w-full">
            <h2 className="big-heading text-brand-dark select-none w-full max-w-[1300px]">
              Wildlife Conservation Partnership
            </h2>
          </div>

          {/* Bottom Row: Details text (left) & Image placeholder (right) */}
          <div className="mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 mt-8 lg:mt-0">
            
            {/* Left Column: Details Paragraph */}
            <div ref={detailsRef} className="flex-1 flex flex-col justify-center items-start pr-0 lg:pr-8">
              <p className="sustainability-bullet text-brand-dark leading-relaxed select-none max-w-[720px]">
                Supporting the conservation breeding of endangered crocodiles and king cobras at The Madras Crocodile Bank Trust & Centre for Herpetology, Chennai, founded by famous wildlife conservationist Romulus Whitaker.
              </p>
            </div>

            {/* Right Column: Image slot with aspect-ratio preservation */}
            <div className="w-full lg:w-auto shrink-0 flex items-end justify-start">
              <div
                ref={placeholderRef}
                className="w-full lg:w-[500px] aspect-[16/10] max-w-[500px] pointer-events-none opacity-0"
              />
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
            src="/images/about/wilton-wildlife-conservation-partnership.jpg"
            alt="Wildlife Conservation Partnership"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#626262]/20 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
