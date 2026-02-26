"use client";

import { motion, useInView } from "framer-motion";
import { GraduationCap, Building2, Briefcase, TrendingUp, Clock, Award, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const programs = [
    {
        icon: Building2,
        title: "Off-Plan Mastery",
        desc: "Learn to sell off-plan properties in Dubai with confidence. From project launches to payment plans.",
        duration: "12 weeks",
        modules: 24,
        level: "Advanced",
        color: "from-violet-500 to-purple-600"
    },
    {
        icon: Briefcase,
        title: "Luxury Brokerage",
        desc: "Master the art of luxury real estate — from Palm Jumeirah villas to Downtown penthouses.",
        duration: "8 weeks",
        modules: 16,
        level: "Expert",
        color: "from-fuchsia-500 to-pink-600"
    },
    {
        icon: TrendingUp,
        title: "Market Analytics",
        desc: "Data-driven market analysis. Understand trends, yields, and investment opportunities.",
        duration: "6 weeks",
        modules: 12,
        level: "Intermediate",
        color: "from-emerald-500 to-teal-600"
    },
    {
        icon: GraduationCap,
        title: "RERA Certification",
        desc: "Complete RERA compliance and regulatory framework training for Dubai real estate.",
        duration: "4 weeks",
        modules: 8,
        level: "Foundation",
        color: "from-amber-500 to-orange-600"
    },
];

export default function Programs() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="programs" className="relative py-32 bg-slate-950 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[200px] opacity-10 bg-violet-500" />
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139,92,246,0.5) 1px, transparent 0)`,
                backgroundSize: "40px 40px"
            }} />

            <div ref={ref} className="container mx-auto px-6 max-w-7xl relative z-10">
                <motion.div className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}>
                    <span className="inline-block text-violet-400 text-sm font-medium tracking-widest uppercase mb-4">Training Programs</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Built for{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                            Real Estate Professionals
                        </span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Industry-leading courses designed by Dubai&apos;s top brokers and market analysts.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {programs.map((p, i) => (
                        <motion.div key={i}
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            className="group relative bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 overflow-hidden cursor-pointer"
                        >
                            {/* Glow on hover */}
                            <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700`} />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-6 shadow-lg`}>
                                    <p.icon className="w-6 h-6 text-white" />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">{p.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">{p.desc}</p>

                                <div className="flex items-center gap-4 text-xs text-zinc-500 mb-6">
                                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{p.duration}</span>
                                    <span>{p.modules} modules</span>
                                    <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5" />{p.level}</span>
                                </div>

                                <div className="flex items-center text-sm text-violet-400 font-medium group-hover:text-violet-300 transition-colors">
                                    Learn more <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div className="text-center mt-12"
                    initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}>
                    <Link href="/request-access"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity shadow-[0_0_30px_-8px_rgba(139,92,246,0.5)]">
                        Explore All Programs <ChevronRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
