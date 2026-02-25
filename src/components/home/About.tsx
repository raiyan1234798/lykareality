"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Award, BookOpen, Building2 } from "lucide-react";

export default function About() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <section ref={ref} className="py-32 bg-background relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-violet-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />

            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-violet-500 font-medium mb-4 tracking-widest uppercase text-sm">Elevate Your Career</h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                            Investor-Grade Knowledge for Top Consultants.
                        </h3>
                        <p className="text-lg text-zinc-400 mb-8 font-light">
                            We empower our agents with unprecedented market intelligence, advanced sales frameworks, and exclusive developer insights. Turn conversations into high-ticket closures.
                        </p>

                        <div className="space-y-6">
                            {[
                                { icon: <Award className="w-6 h-6 text-violet-500" />, title: "Certification Programs", desc: "Recognized excellence in luxury real estate." },
                                { icon: <Building2 className="w-6 h-6 text-violet-500" />, title: "Developer Insights", desc: "Direct briefings from Emaar, DAMAC, and more." },
                                { icon: <BookOpen className="w-6 h-6 text-violet-500" />, title: "Sales Frameworks", desc: "Psychology-driven closing strategies." },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 items-start group">
                                    <div className="p-3 rounded-lg bg-zinc-900 group-hover:bg-violet-500/10 transition-colors border border-white/5 group-hover:border-violet-500/30">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-white mb-1 group-hover:text-violet-400 transition-colors">{item.title}</h4>
                                        <p className="text-zinc-500 text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Image composition */}
                    <motion.div
                        style={{ y }}
                        className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                        <img
                            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2675&auto=format&fit=crop"
                            alt="Luxury property interior"
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000 ease-out"
                        />

                        <div className="absolute inset-0 border-[4px] border-violet-500/20 m-6 rounded-xl z-20 pointer-events-none" />

                        <div className="absolute bottom-10 left-10 right-10 z-30">
                            <div className="bg-slate-950/40 backdrop-blur-xl border border-white/10 p-6 rounded-xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-violet-500" />
                                <p className="text-white font-serif italic text-xl mb-4 text-center">
                                    "Only those who master the market can sell the skyline."
                                </p>
                                <p className="text-violet-400 text-sm text-center font-bold tracking-widest uppercase">The Lykaa Standard</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
