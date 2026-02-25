"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function CTA() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={ref} className="py-32 bg-slate-950 relative overflow-hidden flex items-center justify-center">
            {/* Animated glowing background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-violet-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
            </div>

            <div className="container relative z-10 mx-auto px-6 text-center max-w-4xl">
                <motion.div
                    style={{ scale, opacity }}
                    className="bg-slate-950/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-12 md:p-20 shadow-2xl relative overflow-hidden"
                >
                    {/* Animated border line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-50" />

                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Ready to Dominate <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-violet-600">The Premium Market?</span>
                    </h2>
                    <p className="text-zinc-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
                        Join the elite circle of property consultants equipped with enterprise-grade tools, insider knowledge, and high-ticket sales strategies.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link
                            href="/request-access"
                            className="group relative inline-flex items-center justify-center px-10 py-5 bg-violet-500 text-slate-950 font-bold rounded-xl overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(212,175,55,0.6)] transition-all hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                            <span className="relative z-10 flex items-center gap-2 text-lg">
                                Apply for Academy Access
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
