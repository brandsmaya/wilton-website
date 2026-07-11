"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const stats = [
  {
    value: "0.01mm",
    label: "Weaving Tolerance",
    description: "Highly calibrated micro-warp spacing ensures perfect pattern uniformity.",
  },
  {
    value: "100%",
    label: "Pure Organic Wool",
    description: "Ethically sourced New Zealand wool with zero synthetic extenders.",
  },
  {
    value: "900+",
    label: "Looms Woven Density",
    description: "High-density weave counts creating plush, heavy broadlooms.",
  },
  {
    value: "FAR 25.853",
    label: "Aviation Certified",
    description: "Fully compliant fire-retardant and smoke-emission standards.",
  },
];

export default function Statistics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="precision"
      className="relative z-30 py-24 md:py-36 bg-white w-full thin-divider"
    >
      <div className="max-w-[1440px] mx-auto w-full">
        {/* Header */}
        <div className="max-w-[600px] mb-16 md:mb-24">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium text-brand-grey block mb-6">
            Technical Precision
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-brand-dark leading-tight select-none">
            Millimeter precision in luxury carpet manufacturing.
          </h2>
        </div>

        {/* Stats Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-start pr-4">
              <span className="text-4xl md:text-5xl lg:text-6xl font-extralight text-brand-dark tracking-tight leading-none mb-4 select-none">
                {stat.value}
              </span>
              <div className="w-full thin-divider pt-4 mt-2">
                <h3 className="text-xs uppercase tracking-widest font-medium text-brand-dark mb-2 select-none">
                  {stat.label}
                </h3>
                <p className="text-xs md:text-sm text-brand-grey font-light leading-relaxed select-none">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
