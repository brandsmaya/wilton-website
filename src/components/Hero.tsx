"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MouseImageTrail from "@/components/MouseImageTrail";

const cursorTrailImages = [
  "/images/cursor-images/wilton-1.jpg",
  "/images/cursor-images/wilton-2.jpg",
  "/images/cursor-images/wilton-3.jpg",
  "/images/cursor-images/wilton-4.jpg",
  "/images/cursor-images/wilton-5.jpg",
  "/images/cursor-images/wilton-6.jpg",
  "/images/cursor-images/wilton-7.jpg",
  "/images/cursor-images/wilton-8.jpg",
];

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Reads the reserved slot's current on-screen rect and returns the
      // transform (relative to the full viewport) needed to make the
      // full-bleed video layer visually sit inside that slot.
      const getSlotTransform = () => {
        const slot = placeholderRef.current;
        if (!slot) return { x: 0, y: 0, scaleX: 1, scaleY: 1 };
        const rect = slot.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        return {
          x: rect.left + rect.width / 2 - vw / 2,
          y: rect.top + rect.height / 2 - vh / 2,
          scaleX: rect.width / vw,
          scaleY: rect.height / vh,
        };
      };

      // 1. Initial page load animations
      const tlLoad = gsap.timeline({ defaults: { ease: "power3.out" } });

      tlLoad
        .fromTo(
          logoContainerRef.current,
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0 }
        )
        .fromTo(
          textRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0 },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          videoWrapRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 1.2, ease: "power4.out" },
          "-=0.9"
        );
      // Note: videoWrapRef's x/y/scale/borderRadius are exclusively owned by
      // the scroll-scrubbed timeline below — animating them here too would
      // fight over the same transform and stomp the scroll-driven position.

      // 2. Scroll-driven pin + grow-to-fullscreen sequence
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      scrollTl
        .fromTo(
          videoWrapRef.current,
          {
            x: () => getSlotTransform().x,
            y: () => getSlotTransform().y,
            scaleX: () => getSlotTransform().scaleX,
            scaleY: () => getSlotTransform().scaleY,
            borderRadius: 28,
          },
          {
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            borderRadius: 0,
            duration: 1,
            ease: "sine.inOut",
            force3D: true,
          },
          0
        )
        .fromTo(
          [logoContainerRef.current, textRef.current, ctaRef.current],
          { opacity: 1, y: 0 },
          {
            opacity: 0,
            y: -28,
            duration: 0.45,
            ease: "power1.inOut",
            stagger: 0.03,
          },
          0
        );
    }, sectionRef);

    // Web fonts and late image decode can reflow the text column after this
    // effect runs, silently invalidating the slot rect our transform math
    // is based on. Re-measure once everything has actually settled.
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
      id="home"
      ref={sectionRef}
      className="relative w-full bg-white"
    >
      {/* Trailing photo animation that follows the cursor across the hero */}
      <MouseImageTrail images={cursorTrailImages} containerRef={sectionRef} />

      {/* Pinned stage: full-bleed, breaks out of the page's horizontal gutters
          and the layout's top padding so the video can truly reach every edge
          of the viewport once fully grown. */}
      <div
        ref={pinRef}
        className="relative -mt-16 min-h-[100dvh] overflow-hidden bg-white"
        style={{ width: "100vw", marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
      >
        {/* Content layer: reproduces the page's normal padding/offset. No
            fixed height here — on small screens where the copy needs more
            room than one viewport, it's allowed to grow rather than clip. */}
        <div className="relative z-10 flex min-h-[100dvh] w-full flex-col justify-between gap-16 px-6 pt-4 pb-12 md:px-16">
          {/* Top Part: Logo */}
          <div
            ref={logoContainerRef}
            className="w-full max-w-[200px] lg:max-w-[520px]  h-auto lg:h-[200px] aspect-[646.03/200] relative select-none"
          >
            <img
              src="/images/wilton-logo.svg"
              alt="Wilton Weavers Logo"
              className="w-full h-full object-contain object-left"
            />
          </div>

          {/* Bottom Part: Content Row (Text & CTA aligned with reserved video slot) */}
          <div className="mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch mt-16 pb-0">
            {/* Left Column: Typography & CTA */}
            <div className="lg:col-span-6 flex flex-col items-start justify-end pr-0 lg:pr-8 pb-12">
              <h1
                ref={textRef}
                className="text-3xl md:text-[32px] font-light tracking-tight text-brand-dark leading-[1.2] mb-8 select-none"
              >
                Wilton weavers specialises in the manufacture of aviation carpets &amp;
                fine wool broadloom. Manufacturers of quality floor coverings, we are
                an innovator par excellence.
              </h1>

              <a
                ref={ctaRef}
                href="#contact"
                className="px-6 py-3.5 bg-[#626262] hover:bg-[#4d4d4d] text-white text-[20px] font-light tracking-wide transition-colors duration-300 flex items-center gap-3 select-none"
              >
                About Us <img src="/images/arrow-up-right.svg" alt="Arrow Up Right" className="w-[20px] h-[20px] object-contain shrink-0" />
              </a>
            </div>

            {/* Right Column: reserved, invisible slot the video visually grows out of */}
            <div className="lg:col-span-6 w-full flex items-end justify-end relative">
              <div
                ref={placeholderRef}
                className="w-full aspect-video pointer-events-none opacity-0"
              />
            </div>
          </div>
        </div>

        {/* Full-bleed video layer: sized to the true viewport (not to
            pinRef, which can grow taller than one screen on small devices
            with longer copy) so scale 1 always means "exactly fullscreen".
            Transformed via GPU-only translate/scale to visually sit inside
            the reserved slot above until scrolled out to fullscreen. */}
        <div
          ref={videoWrapRef}
          className="absolute left-0 top-0 z-20 overflow-hidden pointer-events-none will-change-transform"
          style={{ width: "100vw", height: "100dvh", transformOrigin: "50% 50%" }}
        >
          <video
            ref={videoRef}
            src="/images/wilton-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#626262]/25 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
