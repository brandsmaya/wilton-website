"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

interface SplitContentProps {
  id?: string;
  tag?: string;
  title: string;
  description: string;
  detailText?: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
}

export default function SplitContent({
  id,
  tag,
  title,
  description,
  detailText,
  imageSrc,
  imageAlt,
  reverse = false,
}: SplitContentProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade and slide text elements up
      gsap.fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Reveal mask on the image
      gsap.fromTo(
        imageContainerRef.current,
        { clipPath: reverse ? "polygon(0 0, 0 0, 0 100%, 0 100%)" : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Zoom out image slightly on scroll (parallax scroll)
      gsap.to(imageRef.current, {
        scale: 1,
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reverse]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative z-30 py-24 md:py-36 w-full bg-white overflow-hidden thin-divider"
    >
      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Text Area */}
        <div
          ref={textRef}
          className={`lg:col-span-5 flex flex-col items-start justify-center ${
            reverse ? "lg:order-2 lg:col-start-8" : "lg:order-1"
          }`}
        >
          {tag && (
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium text-brand-grey mb-6">
              {tag}
            </span>
          )}
          <h2 className="text-3xl md:text-5xl font-light text-brand-dark leading-tight mb-8 select-none">
            {title}
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-brand-grey font-light mb-6 select-none">
            {description}
          </p>
          {detailText && (
            <p className="text-sm leading-relaxed text-brand-grey/85 font-light select-none">
              {detailText}
            </p>
          )}
        </div>

        {/* Visual Media Card */}
        <div
          className={`lg:col-span-7 w-full h-[40vh] sm:h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden ${
            reverse ? "lg:order-1" : "lg:order-2 lg:col-start-6"
          }`}
        >
          <div
            ref={imageContainerRef}
            className="relative w-full h-full overflow-hidden"
            style={{
              clipPath: reverse
                ? "polygon(0 0, 0 0, 0 100%, 0 100%)"
                : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
            }}
          >
            <Image
              ref={imageRef}
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover scale-115 origin-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
