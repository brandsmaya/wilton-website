import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TextParallax from "@/components/TextParallax";
import Stakeholders from "@/components/Stakeholders";
import TeamSection from "@/components/TeamSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Navigation />
      <main className="w-full bg-white flex flex-col">
        <Hero />
        <TextParallax />
        <Stakeholders />
        <TeamSection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
