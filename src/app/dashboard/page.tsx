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
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">Analytics Overview</h1>
                    <p className="text-slate-500 dark:text-zinc-400 text-sm">Welcome back. Here is your enterprise performance at a glance.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white rounded-lg text-sm bg-white/50 dark:bg-slate-950/40 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors backdrop-blur-md">
                        Export Report (.xlsx)
                    </button>
                    <button className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg text-sm shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all">
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
                            className="bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/5 hover:border-violet-500/30 dark:hover:border-violet-500/20 rounded-xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 shadow-sm"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 dark:bg-violet-500/10 rounded-full blur-2xl group-hover:bg-violet-500/10 dark:group-hover:bg-violet-500/20 transition-colors pointer-events-none" />

                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-violet-50 dark:bg-slate-950/80 rounded border border-violet-100 dark:border-white/5 text-violet-600 dark:text-violet-500 group-hover:scale-110 transition-transform">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-white/5 ${kpi.isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                                    {kpi.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                    {kpi.change}
                                </div>
                            </div>

                            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight">{kpi.value}</div>
                            <div className="text-slate-500 dark:text-zinc-400 text-sm font-medium">{kpi.label}</div>
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
                    className="lg:col-span-2 bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-xl p-6 shadow-sm"
                >
                    <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-white/5 pb-4">
                        <h3 className="text-slate-900 dark:text-white font-semibold">Enrollment & Performance Trend</h3>
                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white"><MoreHorizontal className="w-5 h-5" /></button>
                    </div>
                    <div className="h-[300px] w-full bg-gradient-to-b from-slate-50 dark:from-white/5 to-transparent rounded-lg border border-dashed border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-zinc-600 relative overflow-hidden">
                        {/* Animated mock lines for graph illusion */}
                        <div className="absolute bottom-0 left-0 w-full h-[60%] flex gap-2 px-4 items-end justify-between opacity-50">
                            {[40, 60, 30, 80, 50, 90, 70, 100, 60, 80].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: 0.5 + i * 0.05, duration: 1, ease: "easeOut" }}
                                    className="w-[8%] bg-gradient-to-t from-violet-600/30 dark:from-violet-600/20 to-violet-500/80 dark:to-violet-400/80 rounded-t-sm"
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
                    className="bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-xl p-6 shadow-sm"
                >
                    <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-white/5 pb-4">
                        <h3 className="text-slate-900 dark:text-white font-semibold">Access Requests</h3>
                        <span className="bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold px-2 py-1 rounded border border-rose-100 dark:border-transparent">5 Pending</span>
                    </div>

                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="flex justify-between items-center group cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg transition-colors -mx-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded bg-slate-100 dark:bg-slate-950 flex items-center justify-center border border-slate-200 dark:border-white/5 text-slate-500 dark:text-zinc-400 font-medium group-hover:text-violet-600 dark:group-hover:text-violet-500 transition-colors">
                                        {String.fromCharCode(64 + item)}
                                    </div>
                                    <div>
                                        <h4 className="text-slate-900 dark:text-white text-sm font-medium">Candidate {item}</h4>
                                        <p className="text-slate-500 dark:text-zinc-400 text-xs">Property Consultant</p>
                                    </div>
                                </div>
                                <button className="text-violet-600 dark:text-violet-500 hover:text-violet-700 dark:hover:text-white transition-colors text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
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
