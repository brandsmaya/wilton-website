"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const textLines = [
  "A sanctuary of",
  "master weavers,",
  "designers,",
  "and artisans",
  "working at the",
  "intersection of",
  "precision engineering",
  "and timeless art",
  "to manufacture",
  "luxury aviation carpets",
  "and fine wool broadlooms.",
];

const teamImages = [
  {
    src: "/images/team-image-1.jpg",
    alt: "Team Image 1",
    className: "hidden md:block absolute left-[3%] md:left-[8%] top-[5%] w-[16%] md:w-[13%] aspect-[3/4]",
    rotate: -8,
  },
  {
    src: "/images/team-image-2.jpg",
    alt: "Team Image 2",
    className: "hidden md:block absolute right-[3%] md:right-[8%] top-[8%] w-[15%] md:w-[13%] aspect-[4/3]",
    rotate: 5,
  },
  {
    src: "/images/team-image-3.jpg",
    alt: "Team Image 3",
    className: "hidden md:block absolute left-[1%] md:left-[5%] top-[30%] w-[18%] md:w-[14%] aspect-square",
    rotate: 6,
  },
  {
    src: "/images/team-image-4.jpg",
    alt: "Team Image 4",
    className: "hidden md:block absolute right-[1%] md:right-[4%] top-[30%] w-[17%] md:w-[12%] aspect-[3/4]",
    rotate: -7,
  },
  {
    src: "/images/team-image-5.jpg",
    alt: "Team Image 5",
    className: "hidden md:block absolute left-[4%] md:left-[9%] top-[55%] w-[15%] md:w-[12%] aspect-[4/3]",
    rotate: -5,
  },
  {
    src: "/images/team-image-6.jpg",
    alt: "Team Image 6",
    className: "hidden md:block absolute right-[5%] md:right-[9%] top-[54%] w-[16%] md:w-[13%] aspect-[4/3]",
    rotate: 8,
  },
  {
    src: "/images/team-image-7.jpg",
    alt: "Team Image 7",
    className: "hidden md:block absolute left-[2%] md:left-[6%] top-[75%] w-[14%] md:w-[11%] aspect-square",
    rotate: 4,
  },
  {
    src: "/images/team-image-8.jpg",
    alt: "Team Image 8",
    className: "hidden md:block absolute right-[2%] md:right-[6%] top-[76%] w-[14%] md:w-[11%] aspect-square",
    rotate: -4,
  },
];

export default function TeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const subHeadingRef = useRef<HTMLSpanElement>(null);
  const bigHeadingRef = useRef<HTMLHeadingElement>(null);
  const teamTextRef = useRef<HTMLDivElement>(null);
  const revealContainerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Set initial values before starting timeline
      textLines.forEach((_, idx) => {
        gsap.set(lineRefs.current[idx], { y: 40, opacity: 0 });
      });

      teamImages.forEach((_, idx) => {
        gsap.set(imageRefs.current[idx], { scale: 0.94, y: 30, opacity: 0, rotate: 0 });
      });

      gsap.set(buttonRef.current, { y: 40, opacity: 0 });

      // Pin the section and animate text zoom + fade reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "+=450%", // Longer end for smooth individual line presentation
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1. Hide headings
      tl.to([subHeadingRef.current, bigHeadingRef.current], {
        y: -120,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.inOut",
      })
        // 2. Zoom "TEAM" text and fade out
        .to(
          teamTextRef.current,
          {
            scale: 45,
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut",
          },
          "-=0.6"
        )
        // 3. Make reveal container active (opacity: 1)
        .to(revealContainerRef.current, {
          opacity: 1,
          duration: 0.2,
        }, "-=0.2");

      // 4. Reveal text lines in center and images on sides one-by-one
      textLines.forEach((_, idx) => {
        // Fade in + slide up to center
        tl.to(
          lineRefs.current[idx],
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          }
        );

        // Stagger corresponding images to appear alongside specific lines
        if (idx === 0) {
          tl.to(imageRefs.current[0], { opacity: 1, scale: 1, rotate: teamImages[0].rotate, y: 0, duration: 0.8, ease: "power2.out" }, "<");
        } else if (idx === 1) {
          tl.to(imageRefs.current[1], { opacity: 1, scale: 1, rotate: teamImages[1].rotate, y: 0, duration: 0.8, ease: "power2.out" }, "<");
        } else if (idx === 2) {
          tl.to(imageRefs.current[2], { opacity: 1, scale: 1, rotate: teamImages[2].rotate, y: 0, duration: 0.8, ease: "power2.out" }, "<");
        } else if (idx === 4) {
          tl.to(imageRefs.current[3], { opacity: 1, scale: 1, rotate: teamImages[3].rotate, y: 0, duration: 0.8, ease: "power2.out" }, "<");
        } else if (idx === 5) {
          tl.to(imageRefs.current[4], { opacity: 1, scale: 1, rotate: teamImages[4].rotate, y: 0, duration: 0.8, ease: "power2.out" }, "<");
        } else if (idx === 7) {
          tl.to(imageRefs.current[5], { opacity: 1, scale: 1, rotate: teamImages[5].rotate, y: 0, duration: 0.8, ease: "power2.out" }, "<");
        } else if (idx === 8) {
          tl.to(imageRefs.current[6], { opacity: 1, scale: 1, rotate: teamImages[6].rotate, y: 0, duration: 0.8, ease: "power2.out" }, "<");
        } else if (idx === 9) {
          tl.to(imageRefs.current[7], { opacity: 1, scale: 1, rotate: teamImages[7].rotate, y: 0, duration: 0.8, ease: "power2.out" }, "<");
        }

        // Hold the current line on screen for a moment
        tl.to({}, { duration: 0.5 });

        // Fade out + slide up further
        tl.to(
          lineRefs.current[idx],
          {
            opacity: 0,
            y: -40,
            duration: 0.5,
            ease: "power2.in",
          }
        );
      });

      // 5. Reveal the "Meet Wilton Team" button in the center
      tl.to(
        buttonRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        }
      );

      // 6. Hold fully compiled screen with button for a brief scroll range
      tl.to({}, { duration: 1.0 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative z-30 w-full bg-white overflow-hidden"
    >
      <div
        ref={pinRef}
        className="relative w-full h-[100vh] flex flex-col items-center justify-between py-12 md:py-12"
      >
        {/* Header copy */}
        <div className="w-full flex flex-col items-center px-6 md:px-16 z-20">
          <span
            ref={subHeadingRef}
            className="sub-heading block mb-3 select-none text-center"
          >
            Team
          </span>
          <h2
            ref={bigHeadingRef}
            className="big-heading text-center max-w-[1200px] select-none"
          >
            First and foremost, Wilton is a
          </h2>
        </div>

        {/* TEAM Text (scales up to fill screen and fade out) */}
        <div
          ref={teamTextRef}
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none"
        >
          <span className="text-[90px] sm:text-[160px] md:text-[240px] tracking-[0.2em] text-[#626262] leading-none">
            TEAM
          </span>
        </div>

        {/* Pinned content container */}
        <div
          ref={revealContainerRef}
          className="absolute inset-0 w-full h-full flex items-center justify-center px-6 md:px-16 z-20 pointer-events-none opacity-0"
        >
          {/* Central text lines stacked absolutely in the center */}
          <div className="relative w-full max-w-[800px] h-[220px] flex items-center justify-center z-20">
            {textLines.map((line, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  lineRefs.current[idx] = el;
                }}
                className="absolute big-heading text-brand-dark text-center select-none will-change-transform max-w-[800px]"
              >
                {line}
              </div>
            ))}

            {/* Meet Wilton Team Button */}
            <a
              ref={buttonRef}
              href="#contact"
              className="absolute wilton-button transition-colors duration-300 select-none pointer-events-auto opacity-0 will-change-transform"
            >
              Meet Wilton Team{" "}
              <img
                src="/images/arrow-up-right.svg"
                alt="Arrow Up Right"
                className="w-[20px] h-[20px] object-contain shrink-0"
              />
            </a>
          </div>

          {/* Scattered static images at different tilt angles */}
          {teamImages.map((img, idx) => (
            <div
              key={idx}
              ref={(el) => {
                imageRefs.current[idx] = el;
              }}
              className={`absolute overflow-hidden rounded-[16px] shadow-md opacity-0 will-change-transform z-10 ${img.className}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Bottom space to balance flexbox */}
        <div className="h-2 w-full z-0 pointer-events-none" />
      </div>
    </section>
  );
}
