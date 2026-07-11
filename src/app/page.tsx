import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Navigation />
      <main className="w-full bg-white flex flex-col">
        <Hero />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

