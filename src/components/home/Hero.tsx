"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    // Floating particles
    const [particles, setParticles] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);
    useEffect(() => {
        setParticles(Array.from({ length: 30 }, () => ({
            x: Math.random() * 100, y: Math.random() * 100,
            size: Math.random() * 4 + 1, delay: Math.random() * 5
        })));
    }, []);

    return (
        <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
            {/* Parallax Background */}
            <motion.div className="absolute inset-0 z-0 bg-cover bg-center" style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2940&auto=format&fit=crop')",
                y: backgroundY, scale
            }} />

            {/* Gradient overlays */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
            <div className="absolute inset-0 z-[1] bg-slate-950/50" />
            <div className="absolute inset-0 z-[1] bg-gradient-to-r from-slate-950/90 via-transparent to-slate-950/60" />

            {/* Animated grid lines */}
            <div className="absolute inset-0 z-[2] opacity-[0.03]" style={{
                backgroundImage: `linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)`,
                backgroundSize: "60px 60px"
            }} />

            {/* Floating particles */}
            {particles.map((p, i) => (
                <motion.div key={i} className="absolute z-[3] rounded-full bg-violet-500/30"
                    style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
                    animate={{ y: [-20, 20, -20], opacity: [0.2, 0.8, 0.2] }}
                    transition={{ duration: 3 + p.delay, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
                />
            ))}

            {/* Glowing orbs */}
            <motion.div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full z-[2] blur-[120px]"
                style={{ background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)" }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full z-[2] blur-[100px]"
                style={{ background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)" }}
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div className="container relative z-10 px-6 mx-auto" style={{ y: textY, opacity: opacityHero }}>
                <div className="max-w-5xl">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium tracking-wider mb-8">
                            <Sparkles className="w-3.5 h-3.5" />
                            LYKA REALTY ACADEMY
                        </span>
                    </motion.div>

                    <motion.h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-white mb-6 tracking-tight leading-[1.05]"
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }}>
                        Master Real Estate. <br />
                        <span className="relative">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-600">
                                Close Luxury Deals.
                            </span>
                            <motion.span className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
                                initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.2, delay: 0.8 }} />
                        </span>
                    </motion.h1>

                    <motion.p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl font-light leading-relaxed"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
                        The enterprise-grade learning platform for Dubai&apos;s top property consultants,
                        sales teams, and channel partners.
                    </motion.p>

                    <motion.div className="flex flex-col sm:flex-row gap-4"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
                        <Link href="/request-access"
                            className="group relative inline-flex items-center justify-center px-8 py-4 font-medium rounded-xl overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_-12px_rgba(139,92,246,0.5)] hover:shadow-[0_0_60px_-12px_rgba(139,92,246,0.7)]">
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500" />
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="relative z-10 flex items-center gap-2 text-white">
                                Request Access <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                        <Link href="/login"
                            className="group inline-flex items-center justify-center px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-xl backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20">
                            Sign In to Academy
                        </Link>
                    </motion.div>

                    {/* Stats strip */}
                    <motion.div className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-white/5"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>
                        {[
                            { num: "500+", label: "Certified Agents" },
                            { num: "95%", label: "Completion Rate" },
                            { num: "50+", label: "Training Modules" },
                            { num: "4.9★", label: "Average Rating" }
                        ].map((s, i) => (
                            <div key={i} className="flex flex-col">
                                <span className="text-2xl md:text-3xl font-bold text-white">{s.num}</span>
                                <span className="text-xs text-zinc-500 uppercase tracking-wider mt-1">{s.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
                animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                <div className="p-2 rounded-full border border-white/10 backdrop-blur-md text-white/50">
                    <ChevronDown className="w-6 h-6" />
                </div>
            </motion.div>
        </div>
    );
}
