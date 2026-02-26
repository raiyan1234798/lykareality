"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const segments = [
    { title: "Luxury Villas", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2940&auto=format&fit=crop" },
    { title: "Waterfront Apartments", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2940&auto=format&fit=crop" },
    { title: "Off-plan Projects", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop" },
    { title: "Global Investments", image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2940&auto=format&fit=crop" },
];

export default function PropertySegments() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Create alternating parallax effects for the cards
    const yEven = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const yOdd = useTransform(scrollYProgress, [0, 1], [150, -150]);

    return (
        <section ref={ref} className="py-32 bg-slate-950 relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-violet-500 font-medium tracking-widest uppercase text-sm mb-4">Master Every Niche</h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            Dominating the Dubai Landscape
                        </h3>
                    </div>
                    <button className="text-zinc-300 hover:text-white flex items-center gap-2 font-medium border-b border-white/20 hover:border-white transition-colors pb-1">
                        View Learning Paths
                        <ArrowUpRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {segments.map((item, index) => (
                        <motion.div
                            key={item.title}
                            style={{ y: index % 2 === 0 ? yEven : yOdd }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="group relative h-[450px] rounded-2xl overflow-hidden cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-slate-950/20 to-transparent z-10 opacity-80 transition-opacity group-hover:opacity-100" />
                            <motion.img
                                src={item.image}
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
                            />

                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-violet-500/50 rounded-2xl z-20 transition-all duration-500 group-hover:shadow-[inset_0_0_20px_rgba(212,175,55,0.3)]" />

                            <div className="absolute bottom-0 left-0 w-full p-8 z-30 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <h4 className="text-2xl font-bold text-white mb-2">{item.title}</h4>
                                <div className="w-12 h-1 bg-violet-500 rounded-full group-hover:w-full transition-all duration-500 ease-out" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
