"use client";

import { ClipboardCheck, FileSearch, XCircle, CheckCircle, BarChart, Clock, Award, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n";

export default function Evaluations() {
    const { t } = useLanguage();
    const [logModal, setLogModal] = useState<any>(null);
    return (
        <div className="space-y-6">
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">{t("Automated Evaluations")}</h1>
                    <p className="text-slate-500 dark:text-zinc-400">{t("View real-time, system-graded quiz and course completions.")}</p>
                </div>
                <div className="bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-lg text-sm font-medium border border-emerald-200 dark:border-emerald-500/20 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    {t("Auto-Grading Active")}
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 p-6 rounded-2xl flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-sm text-slate-500 dark:text-zinc-400 mb-1 font-medium">{t("Auto-Graded Today")}</p>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">42</h3>
                    </div>
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-200 dark:border-indigo-500/20">
                        <BarChart className="text-indigo-600 dark:text-indigo-400 w-6 h-6" />
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 p-6 rounded-2xl flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-sm text-slate-500 dark:text-zinc-400 mb-1 font-medium">{t("Average Score")}</p>
                        <h3 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">88%</h3>
                    </div>
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-200 dark:border-emerald-500/20">
                        <CheckCircle className="text-emerald-600 dark:text-emerald-500 w-6 h-6" />
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 p-6 rounded-2xl flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-sm text-slate-500 dark:text-zinc-400 mb-1 font-medium">{t("Required Retakes")}</p>
                        <h3 className="text-3xl font-bold text-rose-600 dark:text-rose-400">5</h3>
                    </div>
                    <div className="w-12 h-12 bg-rose-100 dark:bg-rose-500/10 rounded-xl flex items-center justify-center border border-rose-200 dark:border-rose-500/20">
                        <XCircle className="text-rose-600 dark:text-rose-500 w-6 h-6" />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden backdrop-blur-md shadow-sm">
                <div className="p-4 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-black/40 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t("Recent Automated Results")}</h2>
                    <span className="text-xs text-slate-500 dark:text-zinc-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {t("Live Feed")}</span>
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
                                    <h3 className="text-slate-900 dark:text-white font-medium">{t(item.course)}</h3>
                                    <p className="text-sm text-slate-500 dark:text-zinc-400">{t("Completed by")} <span className="font-semibold text-violet-600 dark:text-violet-400">{item.name}</span> &bull; {item.time}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-center">
                                    <div className="text-sm text-slate-500 dark:text-zinc-500 font-medium mb-1">{t("Score")}</div>
                                    <div className={`text-xl font-bold ${item.status === 'Passed' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>{item.score}%</div>
                                </div>
                                <button
                                    onClick={() => setLogModal(item)}
                                    className="px-4 py-2 bg-slate-100 dark:bg-black hover:bg-slate-200 dark:hover:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg text-sm text-slate-700 dark:text-white transition-colors flex items-center gap-2 font-medium"
                                >
                                    <FileSearch className="w-4 h-4" />
                                    {t("View Log")}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* View Log Modal */}
            <AnimatePresence>
                {logModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10"
                        >
                            <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-slate-950/50">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <FileSearch className="text-violet-500 w-5 h-5" />
                                    {t("Evaluation Log:")} {logModal.name}
                                </h3>
                                <button onClick={() => setLogModal(null)} className="text-slate-400 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5">
                                        <p className="text-xs text-slate-500 dark:text-zinc-500">{t("Course")}</p>
                                        <p className="font-semibold text-slate-900 dark:text-white">{t(logModal.course)}</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5">
                                        <p className="text-xs text-slate-500 dark:text-zinc-500">{t("Final Score")}</p>
                                        <p className={`font-bold ${logModal.status === 'Passed' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>{logModal.score}%</p>
                                    </div>
                                </div>

                                <h4 className="font-bold text-slate-900 dark:text-white mb-2">{t("Question Breakdown")}</h4>
                                <div className="space-y-3">
                                    {/* Mock detailed logs */}
                                    <div className="p-3 border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-500/5 rounded-lg">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-medium text-slate-900 dark:text-white">Q1: Real Estate Laws Basics</span>
                                            <span className="text-xs text-emerald-600 dark:text-emerald-500 font-bold">Passed</span>
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-zinc-400">User correctly selected option A.</p>
                                    </div>
                                    <div className="p-3 border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-500/5 rounded-lg">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-medium text-slate-900 dark:text-white">Q2: Ethical Practices</span>
                                            <span className="text-xs text-emerald-600 dark:text-emerald-500 font-bold">Passed</span>
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-zinc-400">User correctly mapped the definition.</p>
                                    </div>
                                    {logModal.status === 'Failed' && (
                                        <div className="p-3 border border-rose-200 dark:border-rose-500/20 bg-rose-50/50 dark:bg-rose-500/5 rounded-lg">
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm font-medium text-slate-900 dark:text-white">Q3: Objections Handling</span>
                                                <span className="text-xs text-rose-600 dark:text-rose-500 font-bold">Failed</span>
                                            </div>
                                            <p className="text-xs text-slate-500 dark:text-zinc-400">User entered "N/A" instead of correct terminology.</p>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 text-xs font-mono text-slate-400 dark:text-zinc-500 bg-slate-100 dark:bg-black/50 p-3 rounded block whitespace-pre">
                                    {t("Sys Log:")}{'\n'}
                                    [EVAL-JOB-ID]: {Math.random().toString(36).substring(7).toUpperCase()}{'\n'}
                                    {t("Processed at:")} {new Date().toISOString()}{'\n'}
                                    {t("Status Check:")} {t(logModal.status).toUpperCase()}
                                </div>
                            </div>
                            <div className="p-6 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/50 flex justify-end">
                                <button onClick={() => setLogModal(null)} className="px-5 py-2 text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-colors">{t("Close Log")}</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
