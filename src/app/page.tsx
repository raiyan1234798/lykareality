import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import PropertySegments from "@/components/home/PropertySegments";
import Trust from "@/components/home/Trust";
import WhyTrain from "@/components/home/WhyTrain";
import CTA from "@/components/home/CTA";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-gold-500 selection:text-white">
      <LoadingScreen />
      <Navbar />
      <Hero />
      <About />
      <PropertySegments />
      <WhyTrain />
      <Trust />
      <CTA />

      {/* Footer minimal */}
      <footer className="bg-black py-12 border-t border-white/10 text-center text-zinc-500 text-sm">
        <div className="container mx-auto px-6">
          <p>© {new Date().getFullYear()} Lykaa Realty Academy. Enterprise Training Edition.</p>
        </div>
      </footer>
    </main>
  );
}
