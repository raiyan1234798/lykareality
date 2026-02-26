"use client";

import { motion, useInView } from "framer-motion";
import { Code2, Database, Shield, Zap, Globe, Cpu, ExternalLink } from "lucide-react";
import { useRef } from "react";

const techStack = [
    { icon: Code2, name: "Next.js 16", desc: "App Router with SSR & ISR" },
    { icon: Database, name: "Firebase", desc: "Real-time DB & Auth" },
    { icon: Shield, name: "Role-Based", desc: "Admin & User access control" },
    { icon: Zap, name: "Edge Deploy", desc: "Cloudflare Pages CDN" },
    { icon: Globe, name: "Multi-Language", desc: "EN, AR, HI translations" },
    { icon: Cpu, name: "AI-Powered", desc: "Smart course analytics" },
];

const apis = [
    { name: "Course API", method: "POST", endpoint: "/api/courses", desc: "Create and manage courses" },
    { name: "Quiz API", method: "GET", endpoint: "/api/quizzes", desc: "Retrieve quiz data" },
    { name: "Analytics API", method: "GET", endpoint: "/api/analytics", desc: "Training performance metrics" },
    { name: "User API", method: "PUT", endpoint: "/api/users/:id", desc: "Update user profiles" },
];

export default function Developers() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="developers" className="relative py-32 bg-slate-950 overflow-hidden">
            {/* Terminal-style background pattern */}
            <div className="absolute inset-0 opacity-[0.015]" style={{
                backgroundImage: `repeating-linear-gradient(0deg, rgba(139,92,246,0.3) 0px, transparent 1px, transparent 20px)`,
                backgroundSize: "100% 20px"
            }} />

            <div className="absolute top-20 right-20 w-[400px] h-[400px] rounded-full blur-[150px] opacity-10 bg-emerald-500" />

            <div ref={ref} className="container mx-auto px-6 max-w-7xl relative z-10">
                <motion.div className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}>
                    <span className="inline-block text-emerald-400 text-sm font-medium tracking-widest uppercase mb-4">For Developers</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Powered by{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                            Modern Tech
                        </span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Enterprise-grade architecture built for scale, security, and speed.
                    </p>
                </motion.div>

                {/* Tech Stack Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
                    {techStack.map((t, i) => (
                        <motion.div key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.1 }}
                            className="group flex flex-col items-center text-center p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 hover:bg-emerald-500/[0.03] transition-all duration-300"
                        >
                            <t.icon className="w-8 h-8 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
                            <h4 className="text-white text-sm font-semibold mb-1">{t.name}</h4>
                            <p className="text-zinc-500 text-xs">{t.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* API Reference */}
                <motion.div initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 }}
                    className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">

                    {/* Terminal header */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-black/40">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                        </div>
                        <span className="text-xs text-zinc-500 ml-2 font-mono">api-reference.ts</span>
                    </div>

                    <div className="p-6 space-y-3">
                        {apis.map((api, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/[0.02] transition-colors group cursor-pointer"
                            >
                                <span className={`text-xs font-mono font-bold px-2 py-1 rounded ${api.method === "GET" ? "bg-emerald-500/10 text-emerald-400" :
                                        api.method === "POST" ? "bg-violet-500/10 text-violet-400" :
                                            "bg-amber-500/10 text-amber-400"
                                    }`}>{api.method}</span>
                                <code className="text-sm text-zinc-300 font-mono flex-1">{api.endpoint}</code>
                                <span className="text-xs text-zinc-500 hidden sm:block">{api.desc}</span>
                                <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
