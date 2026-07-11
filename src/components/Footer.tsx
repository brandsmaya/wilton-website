"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer id="contact" className="relative z-30 bg-white w-full py-16 md:py-24 border-t border-black/5">
      <div className="max-w-[1440px] mx-auto w-full flex flex-col gap-16">
        {/* Footer Top */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
          {/* Logo Brand / Info */}
          <div className="md:col-span-4 flex flex-col items-start gap-4 pr-0 md:pr-12">
            <a href="#home" className="flex flex-col select-none group">
              <span className="text-[24px] md:text-[28px] font-extralight tracking-[0.15em] text-brand-dark leading-none">
                WILTON
              </span>
              <span className="text-[8px] md:text-[9px] font-light tracking-[0.43em] text-brand-grey mt-1 pl-[2px]">
                WEAVERS
              </span>
            </a>
            <p className="text-xs md:text-sm text-brand-grey font-light leading-relaxed mt-4 max-w-[280px]">
              Manufacturers of high-end aviation carpets and fine wool broadloom. Combining precise structural engineering with timeless craftsmanship since 1976.
            </p>
          </div>

          {/* Site Navigation Links */}
          <div className="md:col-span-3 flex flex-col items-start gap-4">
            <span className="text-[10px] uppercase tracking-widest text-brand-dark font-medium pb-2 border-b border-black/5 w-full">
              Navigation
            </span>
            <div className="flex flex-col gap-2.5 text-xs font-light text-brand-grey">
              <a href="#home" className="hover:text-brand-dark transition-colors duration-300">Home</a>
              <a href="#aviation" className="hover:text-brand-dark transition-colors duration-300">Aviation Division</a>
              <a href="#broadloom" className="hover:text-brand-dark transition-colors duration-300">Broadloom Division</a>
              <a href="#craftsmanship" className="hover:text-brand-dark transition-colors duration-300">Craftsmanship</a>
              <a href="#precision" className="hover:text-brand-dark transition-colors duration-300">Technical Precision</a>
            </div>
          </div>

          {/* Headquarters Info */}
          <div className="md:col-span-3 flex flex-col items-start gap-4">
            <span className="text-[10px] uppercase tracking-widest text-brand-dark font-medium pb-2 border-b border-black/5 w-full">
              Headquarters
            </span>
            <p className="text-xs font-light text-brand-grey leading-relaxed">
              Wilton Weavers Ltd.
              <br />
              100 Weaver Way,
              <br />
              Wiltshire, SN12 8XY
              <br />
              United Kingdom
            </p>
          </div>

          {/* Social / Direct Inquiries */}
          <div className="md:col-span-2 flex flex-col items-start gap-4">
            <span className="text-[10px] uppercase tracking-widest text-brand-dark font-medium pb-2 border-b border-black/5 w-full">
              Contact
            </span>
            <div className="flex flex-col gap-2 text-xs font-light text-brand-grey w-full">
              <a href="mailto:info@wiltonweavers.com" className="hover:text-brand-dark transition-colors duration-300 block truncate">
                info@wiltonweavers.com
              </a>
              <a href="tel:+441225700800" className="hover:text-brand-dark transition-colors duration-300">
                +44 (0) 1225 700 800
              </a>
              <div className="flex gap-4 mt-2">
                <a href="#" className="hover:text-brand-dark transition-colors duration-300">LinkedIn</a>
                <a href="#" className="hover:text-brand-dark transition-colors duration-300">Instagram</a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom (Copyright / Legal) */}
        <div className="w-full thin-divider pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[10px] text-brand-grey/80 tracking-wider uppercase font-light">
          <span>&copy; {new Date().getFullYear()} Wilton Weavers Ltd. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-dark transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-brand-dark transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
