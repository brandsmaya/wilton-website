"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface MouseImageTrailProps {
  images: string[];
  containerRef: React.RefObject<HTMLElement | null>;
  /** Minimum pixel distance the cursor must travel before the next image spawns. */
  threshold?: number;
}

export default function MouseImageTrail({
  images,
  containerRef,
  threshold = 130,
}: MouseImageTrailProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const layer = layerRef.current;
    if (!container || !layer || images.length === 0) return;

    let lastX = -Infinity;
    let lastY = -Infinity;
    let imageIndex = 0;
    let stackIndex = 0;

    const spawnImage = (x: number, y: number) => {
      const el = document.createElement("img");
      el.src = images[imageIndex % images.length];
      imageIndex += 1;

      const width = gsap.utils.random(130, 170);
      const height = width * 1.2;
      const rotation = gsap.utils.random(-14, 14);
      stackIndex += 1;

      el.className =
        "absolute rounded-[2px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.35)] object-cover will-change-transform";
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.left = `${x - width / 2}px`;
      el.style.top = `${y - height / 2}px`;
      el.style.zIndex = `${stackIndex}`;

      layer.appendChild(el);

      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.55, rotate: rotation },
        {
          opacity: 1,
          scale: 1,
          rotate: rotation,
          duration: 0.5,
          ease: "power3.out",
        }
      );

      gsap.to(el, {
        opacity: 0,
        scale: 0.85,
        duration: 0.6,
        delay: 0.55,
        ease: "power2.in",
        onComplete: () => el.remove(),
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const dx = x - lastX;
      const dy = y - lastY;

      if (Math.hypot(dx, dy) > threshold) {
        lastX = x;
        lastY = y;
        spawnImage(x, y);
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      layer.replaceChildren();
    };
  }, [containerRef, images, threshold]);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
    />
  );
}
