"use client";

import { ClipboardCheck, FileSearch, XCircle, CheckCircle, BarChart, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function Evaluations() {
    return (
        <div className="space-y-6">
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">Automated Evaluations</h1>
                    <p className="text-slate-500 dark:text-zinc-400">View real-time, system-graded quiz and course completions.</p>
                </div>
                <div className="bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-lg text-sm font-medium border border-emerald-200 dark:border-emerald-500/20 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Auto-Grading Active
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 p-6 rounded-2xl flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-sm text-slate-500 dark:text-zinc-400 mb-1 font-medium">Auto-Graded Today</p>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">42</h3>
                    </div>
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-200 dark:border-indigo-500/20">
                        <BarChart className="text-indigo-600 dark:text-indigo-400 w-6 h-6" />
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 p-6 rounded-2xl flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-sm text-slate-500 dark:text-zinc-400 mb-1 font-medium">Average Score</p>
                        <h3 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">88%</h3>
                    </div>
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-200 dark:border-emerald-500/20">
                        <CheckCircle className="text-emerald-600 dark:text-emerald-500 w-6 h-6" />
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 p-6 rounded-2xl flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-sm text-slate-500 dark:text-zinc-400 mb-1 font-medium">Required Retakes</p>
                        <h3 className="text-3xl font-bold text-rose-600 dark:text-rose-400">5</h3>
                    </div>
                    <div className="w-12 h-12 bg-rose-100 dark:bg-rose-500/10 rounded-xl flex items-center justify-center border border-rose-200 dark:border-rose-500/20">
                        <XCircle className="text-rose-600 dark:text-rose-500 w-6 h-6" />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden backdrop-blur-md shadow-sm">
                <div className="p-4 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-black/40 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Automated Results</h2>
                    <span className="text-xs text-slate-500 dark:text-zinc-400 flex items-center gap-1"><Clock className="w-3 h-3" /> Live Feed</span>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-white/5">
                    {[
                        { name: "John Doe", course: "Dubai Real Estate Laws", score: 92, status: "Passed", time: "2m ago" },
                        { name: "Sarah Connor", course: "Client Qualification Basics", score: 100, status: "Passed", time: "15m ago" },
                        { name: "Mike Ross", course: "Off-Plan Market Assessment", score: 65, status: "Failed", time: "1h ago" },
                        { name: "Jessica Pearson", course: "Luxury Closing Techniques", score: 88, status: "Passed", time: "3h ago" },
                    ].map((item, idx) => (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            key={idx}
                            className="p-6 flex flex-col md:flex-row items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.status === 'Passed' ? 'bg-emerald-100 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-rose-100 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400'}`}>
                                    {item.status === 'Passed' ? <Award className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                                </div>
                                <div>
                                    <h3 className="text-slate-900 dark:text-white font-medium">{item.course}</h3>
                                    <p className="text-sm text-slate-500 dark:text-zinc-400">Completed by <span className="font-semibold text-violet-600 dark:text-violet-400">{item.name}</span> &bull; {item.time}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-center">
                                    <div className="text-sm text-slate-500 dark:text-zinc-500 font-medium mb-1">Score</div>
                                    <div className={`text-xl font-bold ${item.status === 'Passed' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>{item.score}%</div>
                                </div>
                                <button className="px-4 py-2 bg-slate-100 dark:bg-black hover:bg-slate-200 dark:hover:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg text-sm text-slate-700 dark:text-white transition-colors flex items-center gap-2 font-medium">
                                    <FileSearch className="w-4 h-4" />
                                    View Log
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
