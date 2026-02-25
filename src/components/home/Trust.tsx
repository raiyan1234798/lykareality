"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const Counter = ({ end, duration = 2 }: { end: number, duration?: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTimestamp: number;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [end, duration]);

    return <span>{count}</span>;
};

export default function Trust() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

    const partners = ["EMAAR", "DAMAC", "MERAAS", "NAKHEEL", "SOBHA", "OMNIYAT"];

    return (
        <section ref={ref} className="py-24 bg-zinc-950 border-y border-white/5 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

            <div className="container mx-auto px-6">
                <div className="mb-16 text-center">
                    <p className="text-zinc-500 font-medium tracking-wider text-sm uppercase mb-8">Trusted by Dubai's Finest Developers</p>
                    <motion.div
                        className="flex flex-wrap md:flex-nowrap justify-center items-center gap-10 md:gap-20 opacity-60 w-max mx-auto md:w-full"
                        style={{ x }}
                    >
                        {partners.map((partner, i) => (
                            <motion.div
                                key={partner}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-2xl md:text-3xl font-bold font-serif tracking-widest text-zinc-400 hover:text-white transition-colors cursor-default whitespace-nowrap"
                            >
                                {partner}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-t border-white/5">
                    {[
                        { label: "Active Properties", value: 1500, suffix: "+" },
                        { label: "Agents Trained", value: 3200, suffix: "+" },
                        { label: "Sales Closed (AED)", value: 5, suffix: "B+" },
                        { label: "Exclusive Projects", value: 45, suffix: "" },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center"
                        >
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-serif flex items-center justify-center gap-1">
                                <Counter end={stat.value} />{stat.suffix}
                            </div>
                            <div className="text-gold-500/80 text-sm font-medium tracking-wide">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
