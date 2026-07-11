"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const menuLinks = [
  { name: "Home", href: "#home" },
  { name: "Aviation Carpets", href: "#aviation" },
  { name: "Wool Broadloom", href: "#broadloom" },
  { name: "Craftsmanship", href: "#craftsmanship" },
  { name: "Technical Precision", href: "#precision" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // The hero pins for one full viewport height of scroll while its own
    // logo fades out and its video grows to fullscreen. Switching nav to
    // its compact mode (and revealing nav's own logo) any earlier than
    // that would double up with the hero's logo mid-fade, so the threshold
    // matches the hero's pin distance rather than a small fixed offset.
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.95);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Framer motion variants for fullscreen overlay
  const menuVariants = {
    initial: { opacity: 0, y: "-100%" },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as any, // Custom luxury cubic-bezier
      },
    },
    exit: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const linkVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  return (
    <>
      <nav
        className={`fixed z-50 transition-all duration-500 ${isScrolled
          ? "top-0 left-0 w-full bg-white/80 backdrop-blur-md py-4 border-b border-black/5 px-6 md:px-[64px]"
          : "top-6 md:top-[24px] left-6 md:left-[64px] right-6 md:right-[64px] w-[calc(100%-48px)] md:w-[calc(100%-128px)] bg-transparent pt-0 pb-8"
          }`}
      >
        <div className="mx-auto flex justify-between items-center">
          {/* Large Wilton Weavers logo SVG (invisible by default, fades in on scroll) */}
          <a
            href="#home"
            className={`flex flex-col select-none group w-32 sm:w-44 md:w-56 transition-all duration-500 ${isScrolled
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
              }`}
            onClick={() => setIsOpen(false)}
          >
            <img
              src="/images/wilton-logo.svg"
              alt="Wilton Weavers Logo"
              className="w-full h-auto object-contain"
            />
          </a>

          {/* Minimal Hamburger Menu */}
          <button
            onClick={toggleMenu}
            className="flex items-center gap-4 group cursor-pointer relative z-50 py-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {/* Hamburger Lines */}
            <div className="flex flex-col justify-center items-end gap-[6px] w-8 h-4">
              <span
                className={`h-[2px] bg-brand-dark transition-all duration-300 ${isOpen ? "w-6 rotate-45 translate-y-[4px]" : "w-8 group-hover:w-6"
                  }`}
              />
              <span
                className={`h-[2px] bg-brand-dark transition-all duration-300 ${isOpen ? "w-6 -rotate-45 -translate-y-[4px]" : "w-5 group-hover:w-8"
                  }`}
              />
            </div>
            {/* "MENU" label */}
            <span className="text-[18px] uppercase tracking-widest text-brand-dark font-light select-none">
              {isOpen ? "Close" : "Menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-white z-40 flex flex-col justify-center items-start px-6 md:px-24"
          >
            {/* Subtle architectural background detail */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="max-w-[1200px] w-full mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12 z-10">
              {/* Menu Links */}
              <motion.div
                variants={containerVariants}
                className="flex flex-col gap-6 md:gap-8"
              >
                {menuLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    variants={linkVariants}
                    className="overflow-hidden"
                  >
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-4xl md:text-6xl font-light text-brand-dark hover:text-brand-grey transition-colors duration-300 tracking-wide block"
                    >
                      {link.name}
                    </a>
                  </motion.div>
                ))}
              </motion.div>

              {/* Minimal Info Pane */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-col gap-6 text-sm font-light text-brand-grey max-w-[280px]"
              >
                <div className="thin-divider pt-6">
                  <p className="uppercase tracking-widest text-[10px] text-brand-dark font-medium mb-2">
                    Headquarters
                  </p>
                  <p className="leading-relaxed">
                    Wilton Weavers Ltd.
                    <br />
                    100 Weaver Way,
                    <br />
                    Wiltshire, United Kingdom
                  </p>
                </div>

                <div>
                  <p className="uppercase tracking-widest text-[10px] text-brand-dark font-medium mb-2">
                    Inquiries
                  </p>
                  <a
                    href="mailto:contact@wiltonweavers.com"
                    className="hover:text-brand-dark transition-colors duration-300"
                  >
                    contact@wiltonweavers.com
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
