"use client";

type LogoItem = {
  name: string;
  src: string;
};

// A grid cell either holds the index of a logo (from the arrays below)
// or is `null`, meaning the cell is left empty — the same technique used
// for the team grids, giving a scattered, non-uniform arrangement while
// every square stays the same size.
type LayoutCell = number | null;

const aviationLogos: LogoItem[] = [
  { name: "Boeing", src: "/images/about/boeing.png" },
  { name: "Air India", src: "/images/about/air-india.png" },
  { name: "SpiceJet", src: "/images/about/spicejet.png" },
  { name: "Autotrade Aviation", src: "/images/about/autotrade-aviation-pvt-ltd.png" },
];

const commercialLogos: LogoItem[] = [
  { name: "Stark", src: "/images/about/stark.png" },
  { name: "Fibreworks", src: "/images/about/fibreworks.png" },
  { name: "Couristan", src: "/images/about/couristan.png" },
  { name: "Rolls", src: "/images/about/rolls.png" },
  { name: "Rebel", src: "/images/about/rebel.png" },
];

// 3-column layouts, row by row. `null` = deliberately empty cell.
const AVIATION_LAYOUT: LayoutCell[][] = [
  [0, 1, null],
  [null, 2, 3],
];

const COMMERCIAL_LAYOUT: LayoutCell[][] = [
  [0, 1, 2],
  [3, null, 4],
];

// Breaks a nested element out to the full width of the viewport,
// regardless of the max-w/px padding on its ancestors.
const FULL_BLEED_STYLE = {
  width: "100vw",
  marginLeft: "calc(50% - 50vw)",
  marginRight: "calc(50% - 50vw)",
};

function LogoGrid({ logos, layout }: { logos: LogoItem[]; layout: LayoutCell[][] }) {
  return (
    <div style={FULL_BLEED_STYLE} className="grid grid-cols-1 md:grid-cols-3">
      {layout.flatMap((row, rowIdx) =>
        row.map((cell, colIdx) =>
          cell === null ? (
            <div
              key={`gap-${rowIdx}-${colIdx}`}
              aria-hidden="true"
              className="hidden md:block md:aspect-square border border-brand-dark/15"
            />
          ) : (
            <div
              key={logos[cell].name}
              className="h-32 md:h-auto md:aspect-square border border-brand-dark/15 flex items-center justify-center p-8 sm:p-12"
            >
              <img
                src={logos[cell].src}
                alt={logos[cell].name}
                className="max-w-[50%] md:max-w-full max-h-[75px] md:max-h-full object-contain"
              />
            </div>
          )
        )
      )}
    </div>
  );
}

function CustomerRow({
  label,
  logos,
  layout,
}: {
  label: string;
  logos: LogoItem[];
  layout: LayoutCell[][];
}) {
  return (
    <div className="flex flex-col">
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-16 mb-6 md:mb-8">
        <span className="sub-heading text-brand-dark select-none block text-center">
          {label}
        </span>
      </div>
      <LogoGrid logos={logos} layout={layout} />
    </div>
  );
}

export default function CustomersSection() {
  return (
    <section id="customers" className="relative z-30 w-full bg-white py-20 md:py-28">
      {/* Header (matches the Why Wilton section styling) */}
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-16 flex flex-col items-center mb-16 md:mb-20">
        <span className="sub-heading block mb-3 select-none text-center">
          Key Customers
        </span>
        <h2 className="big-heading text-center mb-6 max-w-[1200px] select-none">
          Names that set the standard, and trust us to meet it.
        </h2>
        <div className="w-full max-w-[800px] grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6" />
          <div className="md:col-span-6">
            <p className="body-large select-none">
              From Boeing to India&apos;s leading commercial carpet houses,
              our carpets fly and furnish where precision is non-negotiable.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-16 md:gap-20">
        <CustomerRow label="Aviation" logos={aviationLogos} layout={AVIATION_LAYOUT} />
        <CustomerRow
          label="Commercial Carpets"
          logos={commercialLogos}
          layout={COMMERCIAL_LAYOUT}
        />
      </div>
    </section>
  );
}
