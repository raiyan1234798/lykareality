"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    // Parallax values
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-blue-950">
            {/* Background Image/Video representation with overlay */}
            <motion.div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2940&auto=format&fit=crop')",
                    y: backgroundY
                }}
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
            <div className="absolute inset-0 z-0 bg-black/40" />
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-950/90 to-transparent" />

            <motion.div
                className="container relative z-10 px-6 mx-auto"
                style={{ y: textY, opacity: opacityHero }}
            >
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 text-sm font-medium tracking-wider mb-6">
                            LYKAA REALTY ACADEMY
                        </span>
                    </motion.div>

                    <motion.h1
                        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    >
                        Master Real Estate. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600">
                            Close Luxury Deals.
                        </span>
                    </motion.h1>

                    <motion.p
                        className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl font-light"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        The enterprise-grade learning platform for Dubai's top property consultants, sales teams, and channel partners.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    >
                        <Link
                            href="/request-access"
                            className="group relative inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-blue-950 font-medium rounded-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(212,175,55,0.5)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="relative z-10 flex items-center gap-2">
                                Request Access
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>

                        <Link
                            href="/login"
                            className="group inline-flex items-center justify-center px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-lg backdrop-blur-sm transition-all hover:bg-white/10"
                        >
                            Sign In to Academy
                        </Link>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="p-2 rounded-full border border-white/10 backdrop-blur-md text-white/50">
                    <ChevronDown className="w-6 h-6" />
                </div>
            </motion.div>
        </div>
    );
}
