import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Programs from "@/components/home/Programs";
import PropertySegments from "@/components/home/PropertySegments";
import WhyTrain from "@/components/home/WhyTrain";
import Developers from "@/components/home/Developers";
import Trust from "@/components/home/Trust";
import CTA from "@/components/home/CTA";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-violet-500 selection:text-white">
      <LoadingScreen />
      <Navbar />
      <Hero />
      <About />
      <Programs />
      <PropertySegments />
      <WhyTrain />
      <Developers />
      <Trust />
      <CTA />

      {/* Premium Footer */}
      <footer className="bg-slate-950 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139,92,246,0.4) 1px, transparent 0)`,
          backgroundSize: "32px 32px"
        }} />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <h3 className="text-xl font-bold text-white mb-2">Lyka <span className="text-violet-400">Realty</span></h3>
              <p className="text-zinc-500 text-sm leading-relaxed">Enterprise-grade training platform for Dubai&apos;s real estate professionals.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">Programs</h4>
              <ul className="space-y-2">
                {["Off-Plan Mastery", "Luxury Brokerage", "Market Analytics", "RERA Certification"].map(l => (
                  <li key={l}><Link href="#programs" className="text-sm text-zinc-500 hover:text-violet-400 transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">Platform</h4>
              <ul className="space-y-2">
                {["Sign In", "Request Access", "API Docs", "Enterprise"].map(l => (
                  <li key={l}><Link href={l === "Sign In" ? "/login" : l === "Request Access" ? "/request-access" : "#developers"} className="text-sm text-zinc-500 hover:text-violet-400 transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li>Dubai, United Arab Emirates</li>
                <li>support@lykarealty.com</li>
                <li>+971 4 XXX XXXX</li>
              </ul>
            </div>
          </div>
          <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-zinc-600 text-xs">© {new Date().getFullYear()} Lyka Realty Academy. Enterprise Training Edition.</p>
            <div className="flex gap-6 text-xs text-zinc-600">
              <Link href="#" className="hover:text-zinc-400 transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-zinc-400 transition-colors">Terms</Link>
              <Link href="#" className="hover:text-zinc-400 transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
