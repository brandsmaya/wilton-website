import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import PageLogo from "@/components/PageLogo";
import PressCenterList from "@/components/PressCenterList";
import Footer from "@/components/Footer";

export default function PressCenterPage() {
  return (
    <SmoothScroll>
      <Navigation />
      <main className="w-full bg-white flex flex-col">
        <div className="w-full px-6 pt-4 pb-4 md:px-16">
          <div className="max-w-[1440px] mx-auto w-full">
            <PageLogo />
          </div>
        </div>
        <PressCenterList />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
