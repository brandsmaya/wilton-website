"use client";

type ImageItem = {
  name: string;
  src: string;
};

type LayoutCell = number | null;

const empoweringWomenImages: ImageItem[] = [
  { name: "Empowering Women 1", src: "/images/about/empowering-women-1.jpg" },
  { name: "Empowering Women 2", src: "/images/about/empowering-women-2.jpg" },
  { name: "Empowering Women 3", src: "/images/about/empowering-women-3.jpg" },
  { name: "Empowering Women 4", src: "/images/about/empowering-women-4.jpg" },
  { name: "Empowering Women 5", src: "/images/about/empowering-women-5.jpg" },
  { name: "Empowering Women 6", src: "/images/about/empowering-women-6.jpg" },
];

const EMPOWERING_WOMEN_LAYOUT: LayoutCell[][] = [
  [0, 1, null],
  [null, 2, 3],
  [4, 5, null],
];

const FULL_BLEED_STYLE = {
  width: "100vw",
  marginLeft: "calc(50% - 50vw)",
  marginRight: "calc(50% - 50vw)",
};

function ImageGrid({ images, layout }: { images: ImageItem[]; layout: LayoutCell[][] }) {
  return (
    <div style={FULL_BLEED_STYLE} className="grid grid-cols-3">
      {layout.flatMap((row, rowIdx) =>
        row.map((cell, colIdx) =>
          cell === null ? (
            <div
              key={`gap-${rowIdx}-${colIdx}`}
              aria-hidden="true"
              className="aspect-square border border-brand-dark/15 bg-white"
            />
          ) : (
            <div
              key={images[cell].name}
              className="aspect-square border border-brand-dark/15 overflow-hidden bg-white"
            >
              <img
                src={images[cell].src}
                alt={images[cell].name}
                className="w-full h-full object-cover"
              />
            </div>
          )
        )
      )}
    </div>
  );
}

export default function EmpoweringWomenSection() {
  return (
    <section id="empowering-women" className="relative z-30 w-full bg-white py-20 md:py-28 thin-divider">
      {/* Header style matching other sections (like CustomersSection) */}
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-16 flex flex-col items-center mb-16 md:mb-20">
        <span className="sub-heading block mb-3 select-none text-center">
          Empowering Women
        </span>
        <h2 className="big-heading text-center mb-6 max-w-[1200px] select-none">
          Women Led Manufacturing
        </h2>
        <div className="w-full max-w-[800px] grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6" />
          <div className="md:col-span-6">
            <p className="body-large select-none">
              Ameyaa, our skill development program, is dedicated to
              empowering women with disabilities. Through meaningful jobs in
              the aerospace sector, we foster inclusivity and enable independence.
              In partnership with Boeing&apos;s Skill-development program, &quot;KAUSHAL&quot;.
            </p>
          </div>
        </div>
      </div>

      {/* Grid container */}
      <ImageGrid images={empoweringWomenImages} layout={EMPOWERING_WOMEN_LAYOUT} />
    </section>
  );
}
