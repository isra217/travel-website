import Navbar from "@/components/navbar";
import Hero from "@/components/home";
import About from "@/components/about";
import ServicesSection from "@/components/servicessection";
import WhyChooseUs from "@/components/whychooseus";
import Reviews from "@/components/Reviews";
import CtaSection from "@/components/CtaSection";
import FloatingButtons from "@/components/floatingbuttons";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <Hero />
      <About />
      <ServicesSection />
      <WhyChooseUs />
      <Reviews />
      <CtaSection />
    </main>
  );
}