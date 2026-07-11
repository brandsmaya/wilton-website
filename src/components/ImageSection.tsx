"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

interface ImageSectionProps {
  imageSrc: string;
  imageAlt: string;
  title?: string;
  subtitle?: string;
}

export default function ImageSection({
  imageSrc,
  imageAlt,
  title,
  subtitle,
}: ImageSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Zoom out image transition on scroll
      gsap.fromTo(
        imageRef.current,
        { scale: 1.15, yPercent: -5 },
        {
          scale: 1.0,
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Fade overlay text on scroll
      if (overlayTextRef.current) {
        gsap.fromTo(
          overlayTextRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
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
      className="relative z-30 w-full h-[60vh] md:h-[80vh] overflow-hidden bg-brand-dark flex items-center justify-center thin-divider"
    >
      {/* Background Media */}
      <Image
        ref={imageRef}
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="100vw"
        className="object-cover opacity-90 scale-115 origin-center"
      />

      {/* Overlay Mask */}
      <div className="absolute inset-0 bg-black/15 pointer-events-none" />

      {/* Optional Overlay Text */}
      {(title || subtitle) && (
        <div
          ref={overlayTextRef}
          className="relative z-10 text-center px-6 max-w-[800px] flex flex-col items-center gap-4"
        >
          {subtitle && (
            <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/80 font-medium">
              {subtitle}
            </span>
          )}
          {title && (
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-wide leading-tight select-none">
              {title}
            </h2>
          )}
        </div>
      )}
    </section>
  );
}
