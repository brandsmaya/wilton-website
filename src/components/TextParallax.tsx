"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Word {
  text: string;
  accent?: string;
}

const words: Word[] = [
  { text: "We" },
  { text: "create" },
  { text: "a" },
  { text: "full" },
  { text: "range" },
  { text: "of" },
  { text: "carpets" },
  { text: "–" },
  { text: "designed" },
  { text: "to" },
  { text: "your" },
  { text: "individual", },
  { text: "specifications.", },
];

interface SideImage {
  src: string;
  alt: string;
  side: "left" | "right";
  className: string;
  range: number;
}

const images: SideImage[] = [
  {
    src: "/images/cursor-images/text-area-image-1.jpg",
    alt: "Stacked carpet tiles at the Wilton Weavers workshop",
    side: "left",
    className: "order-1 w-full md:left-20 md:top-[4%] md:w-[18%]",
    range: 35,
  },
  {
    src: "/images/cursor-images/text-area-image-2.jpg",
    alt: "Craftsman inspecting a carpet on the loom",
    side: "right",
    className: "order-2 w-full md:right-60 md:top-[10%] md:w-[18%]",
    range: -27,
  },
  {
    src: "/images/cursor-images/text-area-image-3.jpg",
    alt: "Wool fabric swatches in embroidery hoops",
    side: "left",
    className: "order-4 w-full md:left-[12%] md:bottom-[6%] md:w-[18%]",
    range: -30,
  },
  {
    src: "/images/cursor-images/text-area-image-4.jpg",
    alt: "Close-up of a chevron-patterned carpet weave",
    side: "right",
    className: "order-5 w-full md:right-[2%] md:bottom-[10%] md:w-[13%]",
    range: 32,
  },
];

const MUTED = "#2f2f2f";
const DARK = "#9d9d9d";

export default function TextParallax() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const highlightRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Text effect: every word drifts from a faint, barely-there gray up
      // to full ink (or, for the two accent words, blooms into a solid
      // colour chip) as the scroll position sweeps past it.
      words.forEach((word, i) => {
        const el = wordRefs.current[i];
        if (!el) return;

        if (word.accent) {
          const chip = highlightRefs.current[i];
          gsap.fromTo(
            el,
            { color: MUTED },
            {
              color: "#ffffff",
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                end: "top 50%",
                scrub: true,
              },
            }
          );
          gsap.fromTo(
            chip,
            { opacity: 0 },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                end: "top 50%",
                scrub: true,
              },
            }
          );
        } else {
          gsap.fromTo(
            el,
            { color: MUTED },
            {
              color: DARK,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                end: "top 55%",
                scrub: true,
              },
            }
          );
        }
      });

      // Image parallax: each photo drifts vertically at its own speed as
      // the section scrolls through the viewport, settling into focus
      // (scale 1.08 -> 1, fade in) on first entrance.
      imageRefs.current.forEach((img, i) => {
        if (!img) return;
        const range = images[i].range;

        gsap.fromTo(
          img,
          { y: range * 0.6, scale: 1.08, opacity: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.to(img, {
          y: -range,
          ease: "none",
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-30 py-28 md:py-22 w-full bg-white overflow-hidden thin-divider"
    >
      <div
        ref={stageRef}
        className="relative max-w-[1600px] mx-auto w-full px-6 md:px-16 grid grid-cols-2 gap-6 md:flex md:items-center md:justify-center min-h-0 md:min-h-[620px]"
      >
        {/* Images: scattered on both sides, parallaxing independently */}
        {images.map((img, i) => (
          <div
            key={img.src}
            className={`relative md:absolute aspect-[4/3] overflow-hidden rounded-[16px] z-0 ${img.className}`}
          >
            <div
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
              className="absolute -inset-y-12 inset-x-0 will-change-transform"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 46vw, 25vw"
                className="object-cover"
              >
              </Image>
            </div>
          </div>
        ))}

        {/* Text effect: huge statement heading, word by word colour reveal */}
        <h2 className="relative z-10 order-3 col-span-2 py-8 md:py-0 text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] tracking-tight text-center max-w-[1140px] select-none mix-blend-difference text-white">
          {words.map((word, i) => (
            <span key={i} className="inline-block mr-[0.22em] last:mr-0">
              {word.accent ? (
                <span className="relative inline-block px-3 py-0.5 md:px-4 md:py-1">
                  <span
                    ref={(el) => {
                      highlightRefs.current[i] = el;
                    }}
                    className="absolute inset-0 rounded-[3px]"
                    style={{ backgroundColor: word.accent }}
                  />
                  <span
                    ref={(el) => {
                      wordRefs.current[i] = el;
                    }}
                    className="relative"
                  >
                    {word.text}
                  </span>
                </span>
              ) : (
                <span
                  ref={(el) => {
                    wordRefs.current[i] = el;
                  }}
                >
                  {word.text}
                </span>
              )}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
