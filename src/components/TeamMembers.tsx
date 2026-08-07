"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Member = {
  name: string;
  role: string;
  focus: string;
  img: string;
};

const members: Member[] = [
  { name: "Arun Prasad", role: "Managing Director", focus: "M.D.", img: "/images/team/arun-prasad.jpg" },
  { name: "Malini", role: "Chief Executive Officer", focus: "C.E.O. · Customer Fulfillment", img: "/images/team/malini.jpg" },
  { name: "Radhakrishnan", role: "General Manager", focus: "G.M.", img: "/images/team/radhakrishnan.jpg" },
  { name: "Devidasan", role: "Quality Control", focus: "Q.C.", img: "/images/team/devidasan.jpg" },
  { name: "Ratan", role: "Vice President", focus: "V.P.", img: "/images/team/ratan.jpg" },
  { name: "Anju", role: "Aesthetics", focus: "Visual coherence · Colour / Design harmony · Tidiness", img: "/images/team/anju.jpg" },
  { name: "Tony", role: "Safety & Administration", focus: "Infrastructure & Facility Management · Legislative Compliance · People & Workplace Management · Procurement - Admin", img: "/images/team/tony.jpg" },
  { name: "Rajesh", role: "L & D", focus: "Onboarding & Skilling · Skill Evaluation & Monitoring · Re-skilling & Upskilling", img: "/images/team/rajesh.jpg" },
  { name: "Sumitha", role: "Finance", focus: "Accounting · Audit Compliances · Financial Analysis & Control", img: "/images/team/sumitha.jpg" },
  { name: "Helen", role: "Costing", focus: "Cost Evaluation · Product Pricing · Cost Monitoring", img: "/images/team/helen.jpg" },
  { name: "Arun Chand", role: "Q.A.", focus: "Product Quality Control · CAPA", img: "/images/team/arun-chand.jpg" },
  { name: "Vinod", role: "Project & Q.M.S.", focus: "Process Formulation · Process Monitoring · QMS Certifications", img: "/images/team/vinod.jpg" },
  { name: "Ramanandh", role: "Product Development", focus: "Design Engineering · Sample Processing", img: "/images/team/ramanandh.jpg" },
  { name: "Saijamma", role: "Operations Co-ordinator", focus: "Production Planning · Production Control", img: "/images/team/saijamma.jpg" },
  { name: "Ajith", role: "Purchase", focus: "Supplier Management · Purchase", img: "/images/team/ajith.jpg" },
  { name: "Santhosh", role: "Pre-production & Stores", focus: "Raw Material Management · Pre-weaving", img: "/images/team/santhosh.jpg" },
  { name: "Ayyappan", role: "Production Operations", focus: "Production · Maintenance", img: "/images/team/ayyappan.jpg" },
  { name: "Rahul", role: "Post Production", focus: "Finished Goods Execution", img: "/images/team/rahul.jpg" },
  { name: "Jithin", role: "I.T.", focus: "Digital Infrastructure Management · Data Security", img: "/images/team/jithin.jpg" },
  { name: "Ribin", role: "M.I.S.", focus: "E.R.P.", img: "/images/team/ribin.jpg" },
];

export default function TeamMembers() {
  const [active, setActive] = useState(0);
  const current = members[active];

  return (
    <section
      id="members"
      className="relative z-30 w-full bg-white py-20 md:py-28"
    >
      {/* Header copy (matches Why Wilton section styling) */}
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-16 flex flex-col items-center mb-16 md:mb-20">
        <span className="sub-heading block mb-3 select-none text-center">
          Leadership
        </span>
        <h2 className="big-heading text-center mb-6 max-w-[1200px] select-none">
          The people behind every weave.
        </h2>
        {/* Paragraph offset to the right side of the container */}
        <div className="w-full max-w-[800px] grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6" />
          <div className="md:col-span-6">
            <p className="body-large select-none">
              Twenty leaders across the shop floor and the boardroom, each
              accountable for a distinct thread of Wilton&apos;s craft.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 md:px-16 lg:flex-row lg:gap-16">
        {/* Left column: sticky featured card */}
        <div className="shrink-0 lg:w-[34%]">
          <div className="lg:sticky lg:top-28">
            {/* Featured card (desktop) */}
            <div className="relative hidden aspect-[3/4.4] w-full max-w-[420px] overflow-hidden rounded-2xl shadow-lg lg:block">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.img}
                  src={current.img}
                  alt={current.name}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6">
                <h3 className="sub-heading text-white select-none">
                  {current.name}
                </h3>
                <div className="flex items-start gap-4 border-t border-white/20 pt-3">
                  <p className="body-small flex-1 text-white/90">{current.role}</p>
                  <p className="body-small flex-1 text-right text-white/70">
                    {current.focus}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: interactive grid */}
        <div className="flex-1">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:gap-4 lg:grid-cols-5">
            {members.map((member, idx) => (
              <button
                key={member.name}
                type="button"
                onMouseEnter={() => setActive(idx)}
                onFocus={() => setActive(idx)}
                onClick={() => setActive(idx)}
                className={`group relative aspect-[3/4] overflow-hidden rounded-xl outline-none transition-[box-shadow] duration-300 ${
                  active === idx ? "ring-2 ring-brand-dark" : ""
                }`}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:opacity-0" />
                <span className="absolute inset-x-2 bottom-2 translate-y-2 text-left text-[11px] leading-tight text-white opacity-100 transition-all duration-300 sm:text-xs lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                  <span className="block truncate font-medium lg:drop-shadow-sm">
                    {member.name}
                  </span>
                  <span className="hidden truncate text-white/80 lg:block">
                    {member.role}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
