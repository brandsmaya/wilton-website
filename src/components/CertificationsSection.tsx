"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Certification {
  title: string;
}

const certifications: Certification[] = [
  { title: "Boeing Tier-1 Supplier Qualification" },
  { title: "DGCA India Approval — AP.07: ADOA" },
  { title: "DGCA India Approval — POE" },
  { title: "AS9100D and ISO 9001:2015 Certification" },
  { title: "NABL Accredited Testing Lab" },
  {
    title:
      "Member of BIS Committee involved in the formulation of Indian standards for Broadloom and Aircraft woven carpets.",
  },
  { title: "Member, CII National Committee for Aerospace Manufacturing" },
  { title: "Member, Aerospace India Association" },
  { title: "Member, Indian Foundation for Quality Management" },
];

const COUNT = certifications.length;
const ANGLE_STEP = 360 / COUNT;
const MAX_ROTATION = (COUNT - 1) * ANGLE_STEP;

export default function CertificationsSection() {
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

      // Desktop / Tablet layout: 3D rotating cylindrical wheel
      mm.add("(min-width: 1024px)", () => {
        let radius = 0;

        const layoutPanels = () => {
          const h = stageRef.current?.clientHeight ?? 0;
          // Regular-polygon apothem: R = h / (2 * tan(PI / sides)).
          // Scaled down to tighten the vertical spacing between items
          // as the wheel rotates through the visible range.
          radius = (h / (2 * Math.tan(Math.PI / COUNT))) * 0.5;

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

        ScrollTrigger.create({
          trigger: pinRef.current,
          start: "center center",
          end: () => `+=${(COUNT - 1) * window.innerHeight * 0.55}`,
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

      // Mobile layout: calm stacked cards fading up
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
      {/* 1. Header Copy Section (scrolls naturally) */}
      <section
        ref={headerRef}
        className="relative z-30 pt-24 pb-24 md:pb-32 w-full bg-white"
      >
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-16 flex flex-col items-center">
          <span className="sub-heading block mb-3 select-none text-center">
            Certifications
          </span>
          <h2 className="big-heading text-center mb-6 max-w-[1200px]">
            Certifications &amp; Approvals
          </h2>
          <div className="w-full max-w-[800px] grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-6" />
            <div className="md:col-span-6">
              <p className="body-large select-none">
                Recognized by the world&apos;s most demanding aviation and
                quality authorities, and trusted by the standards bodies that
                govern them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 3D Rotating Wheel Section (pins in center center) */}
      <section
        ref={sectionRef}
        id="certifications"
        className="relative z-30 pt-10 md:pt-16 pb-32 w-full bg-white overflow-visible"
      >
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-16">
          {/* Desktop / tablet: center-aligned scaled 3D wheel */}
          <div
            ref={pinRef}
            className="relative hidden lg:block w-full max-w-[640px] h-[320px] mx-auto"
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
                {certifications.map((c, i) => (
                  <div
                    key={c.title}
                    ref={(el) => {
                      panelRefs.current[i] = el;
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-10"
                    style={{
                      backfaceVisibility: "hidden",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <h3 className="sub-heading text-brand-dark max-w-[520px] select-none">
                      {c.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: stacked text list */}
          <div className="flex flex-col lg:hidden max-w-[500px] mx-auto">
            {certifications.map((c, i) => (
              <div
                key={c.title}
                ref={(el) => {
                  mobileCardRefs.current[i] = el;
                }}
                className="w-full flex items-center justify-center text-center py-5 border-t border-brand-dark/10 last:border-b"
              >
                <p className="body-large text-brand-dark max-w-sm">{c.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
