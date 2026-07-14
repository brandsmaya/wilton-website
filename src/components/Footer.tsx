"use client";

import React from "react";

export default function Footer() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <footer
      id="contact"
      className="relative z-30 bg-white w-full px-6 pt-20 pb-[120px] sm:pb-[150px] md:px-16 md:pt-28 md:pb-[200px] lg:pb-[220px]"
    >
      <div className="max-w-[1440px] mx-auto w-full flex flex-col gap-24">
        {/* Footer Top: Have any questions? Form */}
        <div className="grid grid-cols-12 gap-8">
          {/* Spacer Column for offset layout */}
          <div className="hidden lg:block lg:col-span-5" />

          {/* Form Column */}
          <div className="col-span-12 lg:col-span-7 flex flex-col items-start w-full">
            <h3 className="big-heading text-brand-dark mb-10 select-none">
              Have any questions?
            </h3>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Name Input */}
                <div className="wilton-form-field">
                  <label htmlFor="footer-name" className="wilton-form-label">
                    Name*
                  </label>
                  <input
                    id="footer-name"
                    type="text"
                    required
                    className="wilton-form-input"
                  />
                </div>

                {/* Email Input */}
                <div className="wilton-form-field">
                  <label htmlFor="footer-email" className="wilton-form-label">
                    Email*
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    className="wilton-form-input"
                  />
                </div>
              </div>

              {/* Message Textarea */}
              <div className="wilton-form-field">
                <label htmlFor="footer-message" className="wilton-form-label">
                  Message
                </label>
                <textarea
                  id="footer-message"
                  className="wilton-form-textarea"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="wilton-button hover:bg-[#3f3f3f] transition-colors duration-300 self-start select-none cursor-pointer"
              >
                Send{" "}
                <img
                  src="/images/arrow-up-right.svg"
                  alt="Arrow Up Right"
                  className="w-[20px] h-[20px] object-contain shrink-0 brightness-0 invert"
                />
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom: Links & Logo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Navigation Column */}
          <div className="lg:col-span-3 footer-column">
            <h4 className="footer-title">Navigation</h4>
            <div className="footer-links-list">
              <a href="#home" className="footer-link-item">About Us</a>
              <a href="#home" className="footer-link-item">Products</a>
              <a href="#stakeholders" className="footer-link-item">Team</a>
              <a href="#contact" className="footer-link-item">Contact Us</a>
              <a href="#home" className="footer-link-item">CSR</a>
            </div>
          </div>

          {/* Social Column */}
          <div className="lg:col-span-3 footer-column">
            <h4 className="footer-title">Social</h4>
            <div className="footer-links-list">
              <a href="#" className="footer-link-item">Facebook</a>
              <a href="#" className="footer-link-item">LinkedIn</a>
              <a href="#" className="footer-link-item">Instagram</a>
              <a href="#" className="footer-link-item">YouTube</a>
            </div>
          </div>

          {/* Contacts Column */}
          <div className="lg:col-span-4 footer-column">
            <h4 className="footer-title">Contacts</h4>
            <div className="footer-links-list">
              <span className="footer-text-item">Wilton Weavers Pvt Ltd</span>
              <span className="footer-text-item">Kalavamkodam, Cherthala</span>
              <span className="footer-text-item">Alappuzha-688 524,</span>
              <span className="footer-text-item">Kerala, India</span>
              <span className="footer-text-item mt-4 block">Phone: 0478 296 4344</span>
              <span className="footer-text-item">
                For sales:{" "}
                <a
                  href="mailto:ceo@wilton.in"
                  className="hover:text-brand-dark transition-colors duration-300 font-medium"
                >
                  ceo@wilton.in
                </a>
              </span>
              <span className="footer-text-item">
                For customer support:{" "}
                <a
                  href="mailto:berly@wilton.in"
                  className="hover:text-brand-dark transition-colors duration-300 font-medium"
                >
                  berly@wilton.in
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Logo - Absolutely positioned in the bottom right corner (outside padding area) */}
      <img
        src="/images/wilton-logo.svg"
        alt="Wilton Weavers Logo"
        className="absolute bottom-0 right-0 w-[240px] sm:w-[300px] md:w-[450px] lg:w-[540px] h-auto object-contain pointer-events-none select-none z-0"
      />
    </footer>
  );
}
