"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const products = [
  {
    id: "aviation",
    category: "Aviation Division",
    title: "Aviation Carpets",
    description:
      "Engineered for high-altitude performance and extreme comfort. Lightweight construction, certified smoke/flame resistance, and bespoke structural patterns designed for private aircraft cabins.",
    imageSrc: "/images/aviation_carpet_lux.png",
    specs: ["Weight: Lightweight custom builds", "Certification: FAR 25.853", "Material: Fine wool / nylon blends"],
    cta: "Request Catalog",
  },
  {
    id: "broadloom",
    category: "Broadloom Division",
    title: "Fine Wool Broadloom",
    description:
      "Bespoke wide-width floor coverings woven on traditional Wilton looms. Made from 100% pure organic wool, offering natural thermal insulation, acoustic control, and unmatched textures for architectural homes.",
    imageSrc: "/images/wool_broadloom_lux.png",
    specs: ["Width: Up to 5 meters", "Material: 100% British & New Zealand Wool", "Usage: Luxury residential & yacht interiors"],
    cta: "View Collections",
  },
];

export default function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards staggered reveal
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
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
      className="relative z-30 py-24 md:py-36 bg-white w-full thin-divider"
    >
      <div className="max-w-[1440px] mx-auto w-full">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-[600px] mb-16 md:mb-24">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium text-brand-grey block mb-6">
            Our Divisions
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-brand-dark leading-tight select-none">
            Two distinct offerings, bound by the same code of absolute craftsmanship.
          </h2>
        </div>

        {/* Product Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
        >
          {products.map((product) => (
            <div
              key={product.id}
              id={product.id}
              className="group flex flex-col items-start w-full cursor-pointer"
            >
              {/* Card Image Container with Zoom hover */}
              <div className="relative w-full h-[35vh] sm:h-[45vh] lg:h-[50vh] overflow-hidden mb-8 bg-brand-light">
                <Image
                  src={product.imageSrc}
                  alt={product.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/5 opacity-100 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />
              </div>

              {/* Card Text Info */}
              <div className="w-full flex flex-col items-start pr-0 lg:pr-12">
                <span className="text-[10px] uppercase tracking-widest text-brand-grey/80 mb-2 font-medium">
                  {product.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-light text-brand-dark mb-4 group-hover:text-brand-dark/80 transition-colors duration-300">
                  {product.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-brand-grey font-light mb-6">
                  {product.description}
                </p>

                {/* Specs List */}
                <ul className="flex flex-col gap-2 mb-8 w-full border-t border-black/5 pt-4 text-xs font-light tracking-wide text-brand-grey/90">
                  {product.specs.map((spec, i) => (
                    <li key={i} className="flex justify-between items-center py-1">
                      <span>{spec.split(":")[0]}</span>
                      <span className="font-normal text-brand-dark">
                        {spec.split(":")[1]}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Outlined Custom CTA Button */}
                <div className="relative overflow-hidden border border-brand-dark px-5 py-2.5 text-[11px] font-medium uppercase tracking-widest text-brand-dark transition-all duration-300 group-hover:bg-brand-dark group-hover:text-white">
                  <span className="flex items-center gap-2">
                    {product.cta}
                    <span className="inline-block transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                      ↗
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
