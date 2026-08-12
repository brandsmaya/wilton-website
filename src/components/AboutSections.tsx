"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

const slides = [
  {
    image: "/images/about/quality-image.jpg",
    alt: "Quality is built into the factory",
    text: "Quality doesn't begin at the loom. It begins in the factory that surrounds it, every corner designed with the same intention as the carpets themselves."
  },
  {
    image: "/images/about/yarn-image.jpg",
    alt: "Yarn selection and prep",
    text: "Fine wool and premium yarns are select-dyed and wound, establishing the material strength and vibrant palette that define our broadloom."
  },
  {
    image: "/images/about/before-loom-image.jpg",
    alt: "Creel and bobbin setup",
    text: "Before the loom starts, each bobbin is carefully positioned and every thread is sequenced by colour and design."
  },
  {
    image: "/images/about/interlock-piles-image.jpg",
    alt: "Interlocking pile yarn",
    text: "Wilton weaving interlocks pile yarn through the warp and weft. This is what gives a Wilton carpet its density, its definition, its ability to hold form under years of use."
  },
  {
    image: "/images/about/precision-image.jpg",
    alt: "Looms run with precision",
    text: "The looms run with precision. The people maneuvering them follow the same. This consistency is what a world-class product requires."
  },
  {
    image: "/images/about/when-carpet-comes-off-image.jpg",
    alt: "Carpet comes off the loom",
    text: "When the carpet comes off the loom, it is carefully inspected, sheared, and hand-finished, ensuring every square inch meets our rigorous standards."
  },
  {
    image: "/images/about/what-leaves-factory-image.jpg",
    alt: "Final product ready",
    text: "What leaves this factory has been through every stage with the same intent. To make something that performs at the level it was designed for, and looks the part for as long as it is used."
  }
];

export default function AboutSections() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<any>(null);
  const imageContainersRef = useRef<(HTMLDivElement | null)[]>([]);
  const textContainersRef = useRef<(HTMLDivElement | null)[]>([]);
  const navButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const ctx = gsap.context(() => {
      // Set initial positions via GSAP to avoid conflicts with React state re-renders
      slides.forEach((_, idx) => {
        if (idx > 0) {
          gsap.set(imageContainersRef.current[idx], { yPercent: -100 });
          gsap.set(textContainersRef.current[idx], { opacity: 0, yPercent: 40 });
        } else {
          gsap.set(imageContainersRef.current[idx], { yPercent: 0 });
          gsap.set(textContainersRef.current[idx], { opacity: 1, yPercent: 0 });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 6}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const index = Math.min(
              slides.length - 1,
              Math.max(0, Math.round(progress * (slides.length - 1)))
            );
            
            // Direct DOM manipulation to highlight the active dot
            // This prevents React state re-renders from destroying the GSAP pin-spacer
            navButtonsRef.current.forEach((btn, idx) => {
              if (!btn) return;
              if (idx === index) {
                btn.classList.add("border-brand-dark", "text-brand-dark", "font-medium", "scale-110");
                btn.classList.remove("border-brand-grey/25", "text-brand-grey/40");
              } else {
                btn.classList.remove("border-brand-dark", "text-brand-dark", "font-medium", "scale-110");
                btn.classList.add("border-brand-grey/25", "text-brand-grey/40");
              }
            });
          }
        }
      });

      scrollTriggerRef.current = tl.scrollTrigger;

      // Animate the slides sequentially
      for (let i = 1; i < slides.length; i++) {
        // Animate previous text out
        tl.to(
          textContainersRef.current[i - 1],
          {
            opacity: 0,
            yPercent: -40,
            duration: 0.8,
            ease: "sine.inOut"
          }
        )
        // Slide current image in from the top
        .fromTo(
          imageContainersRef.current[i],
          { yPercent: -100 },
          {
            yPercent: 0,
            duration: 1,
            ease: "sine.inOut"
          },
          "<" // start at same time as previous slide's fade-out
        )
        // Slide current text in from the bottom
        .fromTo(
          textContainersRef.current[i],
          { opacity: 0, yPercent: 40 },
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.8,
            ease: "sine.out"
          },
          "-=0.6" // stagger text slightly
        )
        // Hold current slide on screen
        .to({}, { duration: 0.5 });
      }
    }, pinRef);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (idx: number) => {
    if (!scrollTriggerRef.current) return;
    const start = scrollTriggerRef.current.start;
    const targetScroll = start + idx * window.innerHeight;
    gsap.to(window, {
      scrollTo: targetScroll,
      duration: 1.2,
      ease: "power3.out"
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-30 w-full bg-white"
    >
      <div
        ref={pinRef}
        className="relative w-full h-[100dvh] overflow-hidden flex items-center bg-white"
      >
        <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between relative">
          
          {/* Left Column: Image Stack (touches left edge of screen, square corners) */}
          <div className="w-full lg:w-[55%] h-[40dvh] lg:h-[75dvh] overflow-hidden bg-brand-light relative">
            {slides.map((slide, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  imageContainersRef.current[idx] = el;
                }}
                className="absolute inset-0 overflow-hidden"
                style={{
                  zIndex: idx,
                }}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Right Column: Text & Sticky Numbers Navigation (right) */}
          {/* Right padding is exactly pr-16 (64px) from right edge */}
          <div className="w-full lg:w-[45%] flex items-center justify-between pl-6 pr-16 md:pl-16 lg:pl-20 h-full relative min-h-[140px] lg:min-h-none py-10 lg:py-0">
            
            {/* Text Stack */}
            <div className="relative flex-1 h-[140px] lg:h-[240px]">
              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  ref={(el) => {
                    textContainersRef.current[idx] = el;
                  }}
                  className="absolute inset-0 flex flex-col justify-center"
                  style={{
                    zIndex: idx,
                  }}
                >
                  <p className="about-caption text-brand-dark max-w-[420px] leading-relaxed select-none">
                    {slide.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Vertical Numbers Tracker */}
            <div className="flex flex-col gap-2 lg:gap-3 items-center shrink-0">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  ref={(el) => {
                    navButtonsRef.current[idx] = el;
                  }}
                  onClick={() => handleNavClick(idx)}
                  className={`w-7 h-7 lg:w-8 lg:h-8 rounded-full border flex items-center justify-center text-[10px] lg:text-xs font-light transition-all duration-300 cursor-pointer ${
                    idx === 0
                      ? "border-brand-dark text-brand-dark font-medium bg-transparent scale-110"
                      : "border-brand-grey/25 text-brand-grey/40 hover:border-brand-grey/50 hover:text-brand-grey bg-transparent"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
}
