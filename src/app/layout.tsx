import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Wilton Weavers | Luxury Carpet Manufacturers",
  description: "Precision-engineered aviation carpets and fine wool broadloom. Wilton Weavers combines modern design, structural engineering excellence, and timeless craftsmanship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-brand-grey font-sans">
        <div className="w-full flex flex-col flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}

