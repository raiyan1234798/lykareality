"use client";

import { motion } from "framer-motion";
import {
    Users, BookOpen, GraduationCap, TrendingUp,
    ArrowUpRight, ArrowDownRight, MoreHorizontal
} from "lucide-react";

export default function Dashboard() {
    const Kpis = [
        { label: "Active Trainees", value: "1,240", change: "+12.5%", isPositive: true, icon: Users },
        { label: "Course Enrollments", value: "8,450", change: "+5.2%", isPositive: true, icon: BookOpen },
        { label: "Certifications Issued", value: "320", change: "+22.4%", isPositive: true, icon: GraduationCap },
        { label: "Completion Rate", value: "82%", change: "-1.1%", isPositive: false, icon: TrendingUp },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Analytics Overview</h1>
                    <p className="text-zinc-400 text-sm">Welcome back. Here is your enterprise performance at a glance.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 border border-white/10 text-white rounded-lg text-sm bg-black/40 hover:bg-white/5 transition-colors backdrop-blur-md">
                        Export Report (.xlsx)
                    </button>
                    <button className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-blue-950 font-medium rounded-lg text-sm shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all">
                        Manage Data
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Kpis.map((kpi, index) => {
                    const Icon = kpi.icon;
                    return (
                        <motion.div
                            key={kpi.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 hover:border-gold-500/20 rounded-xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 rounded-full blur-2xl group-hover:bg-gold-500/10 transition-colors pointer-events-none" />

                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-blue-950/80 rounded border border-white/5 text-gold-500 group-hover:scale-110 transition-transform">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded bg-black/50 border border-white/5 ${kpi.isPositive ? "text-green-400" : "text-red-400"}`}>
                                    {kpi.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                    {kpi.change}
                                </div>
                            </div>

                            <div className="text-3xl font-bold text-white mb-1 tracking-tight">{kpi.value}</div>
                            <div className="text-zinc-500 text-sm font-medium">{kpi.label}</div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Charts / Tables Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Placeholder Chart Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-xl p-6"
                >
                    <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                        <h3 className="text-white font-semibold">Enrollment & Performance Trend</h3>
                        <button className="text-zinc-400 hover:text-white"><MoreHorizontal className="w-5 h-5" /></button>
                    </div>
                    <div className="h-[300px] w-full bg-gradient-to-b from-white/5 to-transparent rounded-lg border border-dashed border-white/10 flex items-center justify-center text-zinc-600 relative overflow-hidden">
                        {/* Animated mock lines for graph illusion */}
                        <div className="absolute bottom-0 left-0 w-full h-[60%] flex gap-2 px-4 items-end justify-between opacity-50">
                            {[40, 60, 30, 80, 50, 90, 70, 100, 60, 80].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: 0.5 + i * 0.05, duration: 1, ease: "easeOut" }}
                                    className="w-[8%] bg-gradient-to-t from-gold-600/20 to-gold-400/80 rounded-t-sm"
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Pending Requests */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-xl p-6"
                >
                    <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                        <h3 className="text-white font-semibold">Access Requests</h3>
                        <span className="bg-red-500/10 text-red-500 text-xs font-bold px-2 py-1 rounded">5 Pending</span>
                    </div>

                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="flex justify-between items-center group cursor-pointer p-2 hover:bg-white/5 rounded-lg transition-colors -mx-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded bg-blue-950 flex items-center justify-center border border-white/5 text-zinc-400 font-medium group-hover:text-gold-500 transition-colors">
                                        {String.fromCharCode(64 + item)}
                                    </div>
                                    <div>
                                        <h4 className="text-white text-sm font-medium">Candidate {item}</h4>
                                        <p className="text-zinc-500 text-xs">Property Consultant</p>
                                    </div>
                                </div>
                                <button className="text-gold-500 hover:text-white transition-colors text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                    Review
                                </button>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
