"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { TrendingUp, Target, Handshake } from "lucide-react";
import { useRef } from "react";

export default function WhyTrain() {
    const cards = [
        {
            title: "High-Ticket Frameworks",
            desc: "Proven methodologies to handle objections and close ultra-luxury deals.",
            icon: <TrendingUp className="w-8 h-8 text-gold-500" />
        },
        {
            title: "Market Intelligence",
            desc: "Real-time data on off-plan launches, secondary markets, and global trends.",
            icon: <Target className="w-8 h-8 text-gold-500" />
        },
        {
            title: "Elite Network",
            desc: "Connect directly with top Dubai developers and channel partners.",
            icon: <Handshake className="w-8 h-8 text-gold-500" />
        }
    ];

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    return (
        <section ref={ref} className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-gold-500 font-medium tracking-widest uppercase text-sm mb-4"
                    >
                        The Lykaa Advantage
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-foreground leading-tight"
                    >
                        Why Top Producers Train With Us
                    </motion.h3>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {cards.map((card, i) => {
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const yScroll = useTransform(scrollYProgress, [0, 1], [50, -50 - (i * 30)]);
                        return (
                            <motion.div
                                key={card.title}
                                style={{ y: yScroll }}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6 }}
                                className="group bg-card rounded-2xl p-10 border border-white/5 hover:border-gold-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/5 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-3xl group-hover:bg-gold-500/10 transition-colors" />

                                <div className="w-16 h-16 bg-blue-950/50 rounded-xl flex items-center justify-center mb-8 border border-white/10 group-hover:border-gold-500/30 transition-colors relative z-10">
                                    {card.icon}
                                </div>

                                <h4 className="text-2xl font-semibold text-foreground mb-4 relative z-10 group-hover:text-gold-400 transition-colors">{card.title}</h4>
                                <p className="text-zinc-400 leading-relaxed relative z-10 font-light">{card.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
