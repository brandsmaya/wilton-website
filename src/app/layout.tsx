import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Wilton Weavers | Luxury Carpet Manufacturers",
  description: "Precision-engineered aviation carpets and fine wool broadloom. Wilton Weavers combines modern design, structural engineering excellence, and timeless craftsmanship.",
  icons: {
    icon: [
      { url: "/images/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/images/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/images/favicon/favicon.ico",
    apple: [
      { url: "/images/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/images/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${outfit.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-brand-grey font-sans">
        <div className="w-full flex flex-col flex-1">
          {children}
        </div>
        <PageTransition />
      </body>
    </html>
  );
}

