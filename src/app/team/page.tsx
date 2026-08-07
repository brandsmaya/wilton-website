import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import TeamHero from "@/components/TeamHero";
import TeamMembers from "@/components/TeamMembers";
import Footer from "@/components/Footer";

export default function TeamPage() {
  return (
    <SmoothScroll>
      <Navigation />
      <main className="w-full bg-white flex flex-col">
        <TeamHero />
        <TeamMembers />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
