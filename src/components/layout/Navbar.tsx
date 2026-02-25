"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-lg shadow-black/5" : "bg-transparent py-6"}`}>
            <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-violet-500 rounded-sm flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-500 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                        <span className="text-slate-950 font-bold font-serif text-xl -rotate-45 group-hover:rotate-0 transition-transform duration-500">L</span>
                    </div>
                    <span className="text-xl font-semibold tracking-wide text-white">LYKAA <span className="text-violet-500 font-light">ACADEMY</span></span>
                </Link>
                <div className="hidden md:flex items-center gap-8">
                    {["Programs", "Developers", "Insights", "Enterprise"].map((item) => (
                        <Link key={item} href={`#${item.toLowerCase()}`} className="text-sm text-zinc-300 hover:text-violet-400 transition-colors">
                            {item}
                        </Link>
                    ))}
                    <Link href="/login" className="px-5 py-2.5 text-sm font-medium text-white border border-white/10 rounded hover:bg-white/5 transition-colors">
                        Login
                    </Link>
                    <Link href="/request-access" className="px-5 py-2.5 text-sm font-medium text-slate-950 bg-gradient-to-r from-violet-400 to-violet-600 rounded hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                        Apply Now
                    </Link>
                </div>
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col gap-4"
                >
                    {["Programs", "Developers", "Insights", "Enterprise"].map((item) => (
                        <Link key={item} href={`#${item.toLowerCase()}`} className="text-zinc-200 hover:text-violet-500 py-2 border-b border-white/5" onClick={() => setIsOpen(false)}>
                            {item}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-3 mt-4">
                        <Link href="/login" className="w-full py-3 text-center border border-white/10 text-white rounded">Login</Link>
                        <Link href="/request-access" className="w-full py-3 text-center bg-violet-500 text-slate-950 rounded font-medium">Apply Now</Link>
                    </div>
                </motion.div>
            )}
        </nav>
    );
}
