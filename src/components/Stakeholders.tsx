"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Stakeholder {
  number: string;
  title: string;
  image: string;
  imageAlt: string;
  caption?: string;
  metaLabel1: string;
  metaValue1: string;
  metaLabel2: string;
  metaValue2: string;
}

const stakeholders: Stakeholder[] = [
  {
    number: "01",
    title: "Customers",
    image: "/images/customers.jpg",
    imageAlt: "Artisan hand-finishing a woven carpet",
    metaLabel1: "Division",
    metaValue1: "Aviation & Broadloom",
    metaLabel2: "Specification",
    metaValue2: "100% Custom Bespoke",
  },
  {
    number: "02",
    title: "Our Team",
    image: "/images/team.jpg",
    imageAlt: "Wilton Weavers team member at the workshop",
    metaLabel1: "Craftsmanship",
    metaValue1: "Master Weavers",
    metaLabel2: "Experience",
    metaValue2: "40+ Years Woven",
  },
  {
    number: "03",
    title: "Shareholders",
    image: "/images/shareholders.jpg",
    metaLabel1: "Focus",
    metaValue1: "Precision & Quality",
    metaLabel2: "Horizon",
    metaValue2: "Timeless Stewardship",
    imageAlt: "Wilton Weavers leadership seated in reflection",
  },
  {
    number: "04",
    title: "State",
    image: "/images/state.jpg",
    imageAlt: "Stone lion statue at the Wilton Weavers grounds",
    caption: "By State, we mean paying every tax and duty due, without fail.",
    metaLabel1: "Compliance",
    metaValue1: "Fully Audited",
    metaLabel2: "Origin",
    metaValue2: "India",
  },
  {
    number: "05",
    title: "Earth",
    image: "/images/earth.jpg",
    imageAlt: "Dragonfly resting on a leaf in the grounds",
    caption:
      "By Earth, we mean manufacturing responsibly, with minimal impact on our environment.",
    metaLabel1: "Materials",
    metaValue1: "Organic Wool Fibers",
    metaLabel2: "Footprint",
    metaValue2: "Net Zero Target",
  },
];

const COUNT = stakeholders.length;
const ANGLE_STEP = 72;
const MAX_ROTATION = (COUNT - 1) * ANGLE_STEP;

export default function Stakeholders() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const drumRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header fade-up animation
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const mm = gsap.matchMedia();

      // Desktop / Tablet layout: 3D rotating pentagonal prism
      mm.add("(min-width: 1024px)", () => {
        let radius = 0;

        const layoutPanels = () => {
          const h = stageRef.current?.clientHeight ?? 0;
          // Pentagon apothem calculation: R = h / (2 * tan(36deg))
          radius = h / (2 * 0.7265);

          panelRefs.current.forEach((panel, i) => {
            if (!panel) return;
            gsap.set(panel, {
              transform: `rotateX(${i * ANGLE_STEP}deg) translateZ(${radius}px)`,
            });
          });
        };

        layoutPanels();
        window.addEventListener("resize", layoutPanels);

        const state = { progress: 0, mouseY: 0, scale: 0.94 };

        const render = () => {
          const rot = state.progress * MAX_ROTATION;

          gsap.set(drumRef.current, {
            rotateX: -rot,
            rotateY: state.mouseY,
            scale: state.scale,
          });
        };
        gsap.ticker.add(render);

        // ScrollTrigger to bind rotation scrub to page scroll
        ScrollTrigger.create({
          trigger: pinRef.current,
          start: "center center",
          end: () => `+=${(COUNT - 1) * window.innerHeight * 0.65}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: layoutPanels,
          onUpdate: (self) => {
            state.progress = self.progress;
            state.scale = 0.94 + self.progress * 0.06;
          },
        });

        // Subtle parallax following mouse movement
        const mouseYTo = gsap.quickTo(state, "mouseY", { duration: 0.6, ease: "power3" });
        const handleMouseMove = (e: MouseEvent) => {
          const rect = pinRef.current?.getBoundingClientRect();
          if (!rect) return;
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          mouseYTo(px * 4);
        };
        const handleMouseLeave = () => mouseYTo(0);

        const pinEl = pinRef.current;
        pinEl?.addEventListener("mousemove", handleMouseMove);
        pinEl?.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          gsap.ticker.remove(render);
          window.removeEventListener("resize", layoutPanels);
          pinEl?.removeEventListener("mousemove", handleMouseMove);
          pinEl?.removeEventListener("mouseleave", handleMouseLeave);
        };
      });

      // Mobile layout: calm tilt cards fading up
      mm.add("(max-width: 1023.98px)", () => {
        mobileCardRefs.current.forEach((card) => {
          if (!card) return;
          gsap.fromTo(
            card,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      });
    }, sectionRef);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <>
      {/* 1. Header Copy Section (Scrolls naturally) */}
      <section
        ref={headerRef}
        className="relative z-30 pt-24 pb-64 w-full bg-white"
      >
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-16 flex flex-col items-center">
          <span className="sub-heading block mb-3 select-none text-center">
            Why Wilton
          </span>
          <h2 className="big-heading text-center mb-6 max-w-[1200px]">
            We deliver the dreams of five stakeholders.
          </h2>
          {/* Paragraph offset to the right side of the container */}
          <div className="w-full max-w-[800px] grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-6" />
            <div className="md:col-span-6">
              <p className="body-large select-none">
                First amongst equals: our Customers &ndash; followed equally by
                our Team, Shareholders, State and Earth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 3D Rotating Drum Section (Pins in center center) */}
      <section
        ref={sectionRef}
        id="stakeholders"
        className="relative z-30 pb-32 w-full bg-white overflow-visible"
      >
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-16">
          {/* Desktop / tablet: Center-aligned scaled 3D drum (728px x 346px) */}
          <div
            ref={pinRef}
            className="relative hidden lg:block w-full max-w-[728px] h-[346px] mx-auto"
          >
            <div
              ref={stageRef}
              className="w-full h-full relative overflow-visible"
              style={{ perspective: "2200px", perspectiveOrigin: "50% 50%" }}
            >
              <div
                ref={drumRef}
                className="w-full h-full relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                {stakeholders.map((s, i) => (
                  <div
                    key={s.number}
                    ref={(el) => {
                      panelRefs.current[i] = el;
                    }}
                    className="absolute inset-0 grid grid-cols-2 gap-0 overflow-hidden shadow-lg"
                    style={{
                      backfaceVisibility: "hidden",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Left Half: Grey Text Panel (#626262) */}
                    <div className="bg-[#626262] text-white flex flex-col justify-between p-8 border-r border-white/5 h-full">
                      {/* Top vertical divider tick */}
                      <div className="w-full flex flex-col items-center">
                        <div className="w-full border-t border-white/20" />
                        <div className="w-[1px] h-4 bg-white/20" />
                      </div>

                      {/* Center block */}
                      <div className="flex flex-col items-center justify-center text-center my-auto">
                        <span className="main-heading select-none">
                          {s.number}
                        </span>
                        <h3 className="sub-heading mt-3 select-none">
                          {s.title}
                        </h3>
                      </div>

                      {/* Bottom Metadata/Caption Block */}
                      <div className="w-full">
                        {s.caption ? (
                          <p className="body-small text-center max-w-[240px] mx-auto">
                            {s.caption}
                          </p>
                        ) : (
                          <div className="w-full border-t border-white/10 body-small">
                            <div className="flex justify-between py-1.5 border-b border-white/5">
                              <span className="opacity-60">{s.metaLabel1}</span>
                              <span className="font-medium">{s.metaValue1}</span>
                            </div>
                            <div className="flex justify-between py-1.5 border-b border-white/10">
                              <span className="opacity-60">{s.metaLabel2}</span>
                              <span className="font-medium">{s.metaValue2}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Half: Full Color Image Panel */}
                    <div className="relative h-full w-full bg-[#121212]">
                      <Image
                        src={s.image}
                        alt={s.imageAlt}
                        fill
                        sizes="364px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-[#626262]/5 pointer-events-none" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: Tilted card deck */}
          <div className="flex flex-col gap-8 lg:hidden max-w-[500px] mx-auto">
            {stakeholders.map((s, i) => (
              <div
                key={s.number}
                ref={(el) => {
                  mobileCardRefs.current[i] = el;
                }}
                className="w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-[6px]"
                style={{
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
              >
                {/* Text Card */}
                <div className="bg-[#626262] text-white flex flex-col justify-between p-8 min-h-[300px] border-b md:border-b-0 md:border-r border-white/10">
                  <div className="w-full flex flex-col items-center mb-4">
                    <div className="w-full border-t border-white/20" />
                    <div className="w-[1px] h-4 bg-white/20" />
                  </div>

                  <div className="my-auto flex flex-col items-start">
                    <span className="block text-5xl font-extralight leading-none tracking-tight select-none">
                      {s.number}
                    </span>
                    <h3 className="text-xl font-light tracking-widest uppercase mt-3 select-none">
                      {s.title}
                    </h3>
                    {s.caption && (
                      <p className="body-text text-white mt-3 max-w-sm">
                        {s.caption}
                      </p>
                    )}
                  </div>

                  <div className="w-full border-t border-white/10 text-[9px] uppercase tracking-wider mt-4">
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="opacity-60">{s.metaLabel1}</span>
                      <span className="font-medium">{s.metaValue1}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/10">
                      <span className="opacity-60">{s.metaLabel2}</span>
                      <span className="font-medium">{s.metaValue2}</span>
                    </div>
                  </div>
                </div>

                {/* Image Card */}
                <div className="relative w-full min-h-[260px] bg-[#121212]">
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[#626262]/5 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
