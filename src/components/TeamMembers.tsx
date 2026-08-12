"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Member = {
  name: string;
  role: string;
  focus: string;
  img: string;
};

// A grid cell either holds the index of a member (drawn from the arrays
// below) or is `null`, meaning the cell is intentionally left empty.
// Leaving cells empty (rather than shifting items) is what gives the
// 4-column grid its scattered, non-uniform read while every row/column
// stays the same size — matching the ario.law reference layout.
type LayoutCell = number | null;

const wayFinders: Member[] = [
  { name: "Arun Prasad", role: "Managing Director", focus: "M.D.", img: "/images/team/arun-prasad.jpg" },
  { name: "Malini", role: "Chief Executive Officer", focus: "C.E.O. · Customer Fulfillment", img: "/images/team/malini.jpg" },
  { name: "Radhakrishnan", role: "General Manager", focus: "G.M.", img: "/images/team/radhakrishnan.jpg" },
  { name: "Devidasan", role: "Quality Control", focus: "Q.C.", img: "/images/team/devidasan.jpg" },
  { name: "Ratan", role: "Vice President", focus: "V.P.", img: "/images/team/ratan.jpg" },
];

const responsibilityLeads: Member[] = [
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

// 4-column layouts, row by row. `null` = deliberately empty cell.
const RESPONSIBILITY_LAYOUT: LayoutCell[][] = [
  [0, null, 1, 2],
  [null, 3, null, null],
  [4, 5, null, 6],
  [null, null, 7, null],
  [8, 9, null, 10],
  [null, 11, 12, null],
  [13, null, 14, null],
];

const WAYFINDER_LAYOUT: LayoutCell[][] = [
  [0, null, 1, null],
  [null, 2, null, 3],
  [4, null, null, null],
];

function SectionHeader({
  eyebrow,
  title,
  paragraph,
}: {
  eyebrow: string;
  title: string;
  paragraph: string;
}) {
  return (
    <div className="max-w-[1440px] mx-auto w-full px-6 md:px-16 flex flex-col items-center mb-14 md:mb-16">
      <span className="sub-heading block mb-3 select-none text-center">
        {eyebrow}
      </span>
      <h2 className="big-heading text-center mb-6 max-w-[1200px] select-none">
        {title}
      </h2>
      <div className="w-full max-w-[800px] grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-6" />
        <div className="md:col-span-6">
          <p className="body-large select-none">{paragraph}</p>
        </div>
      </div>
    </div>
  );
}

function FeaturedCard({ member }: { member: Member }) {
  return (
    <div className="relative hidden aspect-[3/4.4] w-full max-w-[420px] overflow-hidden rounded-2xl shadow-lg lg:block">
      <AnimatePresence mode="wait">
        <motion.img
          key={member.img}
          src={member.img}
          alt={member.name}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6">
        <h3 className="sub-heading text-white select-none">{member.name}</h3>
        <div className="flex items-start gap-4 border-t border-white/20 pt-3">
          <p className="body-small flex-1 text-white/90">{member.role}</p>
          <p className="body-small flex-1 text-right text-white/70">
            {member.focus}
          </p>
        </div>
      </div>
    </div>
  );
}

function TeamThumb({
  member,
  isActive,
  onSelect,
  alwaysShowCaption,
}: {
  member: Member;
  isActive: boolean;
  onSelect: () => void;
  alwaysShowCaption?: boolean;
}) {
  return (
    <button
      type="button"
      onMouseEnter={onSelect}
      onFocus={onSelect}
      onClick={onSelect}
      className={`group relative aspect-[3/4] w-full overflow-hidden rounded-xl outline-none transition-[box-shadow] duration-300 ${
        isActive ? "ring-2 ring-brand-dark" : ""
      }`}
    >
      <img
        src={member.img}
        alt={member.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-transparent transition-opacity duration-300 ${
          alwaysShowCaption ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      />
      <span
        className={`absolute inset-x-2 bottom-2 text-left text-[11px] leading-tight text-white transition-all duration-300 sm:text-xs ${
          alwaysShowCaption
            ? "translate-y-0 opacity-100"
            : "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
        }`}
      >
        <span className="block truncate font-medium drop-shadow-sm">
          {member.name}
        </span>
        <span className="hidden truncate text-white/80 lg:block">
          {member.role}
        </span>
      </span>
    </button>
  );
}

function TeamGrid({
  members,
  layout,
  active,
  onSelect,
}: {
  members: Member[];
  layout: LayoutCell[][];
  active: number;
  onSelect: (idx: number) => void;
}) {
  return (
    <>
      {/* Mobile / tablet: dense grid, every member visible */}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:gap-4 lg:hidden">
        {members.map((member, idx) => (
          <TeamThumb
            key={member.name}
            member={member}
            isActive={active === idx}
            onSelect={() => onSelect(idx)}
            alwaysShowCaption
          />
        ))}
      </div>

      {/* Desktop: uniform 4-column / row grid with some cells left
          empty, so the grid itself stays regular but the arrangement
          reads as scattered. */}
      <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
        {layout.flatMap((row, rowIdx) =>
          row.map((cell, colIdx) =>
            cell === null ? (
              <div key={`gap-${rowIdx}-${colIdx}`} aria-hidden="true" className="aspect-[3/4]" />
            ) : (
              <TeamThumb
                key={members[cell].name}
                member={members[cell]}
                isActive={active === cell}
                onSelect={() => onSelect(cell)}
              />
            )
          )
        )}
      </div>
    </>
  );
}

export default function TeamMembers() {
  const [activeLead, setActiveLead] = useState(0);
  const [activeWayFinder, setActiveWayFinder] = useState(0);

  return (
    <>
      {/* Responsibility Lead — image left, member grid right */}
      {/* Way Finders — member grid left, image right */}
      <section
        id="way-finders"
        className="relative z-30 w-full bg-white py-20 md:py-28"
      >
        <SectionHeader
          eyebrow="Way Finders"
          title="The leadership charting Wilton's course."
          paragraph="Five leaders steering strategy, governance and growth across the business."
        />

        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 md:px-16 lg:flex-row-reverse lg:gap-16">
          <div className="shrink-0 lg:w-[34%]">
            <div className="lg:sticky lg:top-28">
              <FeaturedCard member={wayFinders[activeWayFinder]} />
            </div>
          </div>

          <div className="flex-1">
            <TeamGrid
              members={wayFinders}
              layout={WAYFINDER_LAYOUT}
              active={activeWayFinder}
              onSelect={setActiveWayFinder}
            />
          </div>
        </div>
      </section>

      {/* Responsibility Lead — image left, member grid right */}
      <section
        id="responsibility-leads"
        className="relative z-30 w-full bg-white py-20 md:py-28"
      >
        <SectionHeader
          eyebrow="Responsibility Lead"
          title="The department heads driving daily craft."
          paragraph="Fifteen leads, each accountable for a distinct discipline — from aesthetics to purchase, quality to IT."
        />

        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 md:px-16 lg:flex-row lg:gap-16">
          <div className="shrink-0 lg:w-[34%]">
            <div className="lg:sticky lg:top-28">
              <FeaturedCard member={responsibilityLeads[activeLead]} />
            </div>
          </div>

          <div className="flex-1">
            <TeamGrid
              members={responsibilityLeads}
              layout={RESPONSIBILITY_LAYOUT}
              active={activeLead}
              onSelect={setActiveLead}
            />
          </div>
        </div>
      </section>
    </>
  );
}
