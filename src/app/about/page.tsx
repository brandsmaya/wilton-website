import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import AboutHero from "@/components/AboutHero";
import AboutSections from "@/components/AboutSections";
import CertificationsSection from "@/components/CertificationsSection";
import CustomersSection from "@/components/CustomersSection";
import EmpoweringWomenSection from "@/components/EmpoweringWomenSection";
import FriendlyFootprintSection from "@/components/FriendlyFootprintSection";
import WildlifePartnershipSection from "@/components/WildlifePartnershipSection";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <SmoothScroll>
      <Navigation />
      <main className="w-full bg-white flex flex-col">
        <AboutHero />
        <AboutSections />
        <CertificationsSection />
        <CustomersSection />
        <EmpoweringWomenSection />
        <FriendlyFootprintSection />
        <WildlifePartnershipSection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
