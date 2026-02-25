"use client";

import { motion } from "framer-motion";
import { BookOpen, Star, Award, PlayCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function UserDashboard() {
    const { t } = useLanguage();

    // Mock enrolled data for users
    const userStats = [
        { label: "Active Courses", value: "3", icon: BookOpen },
        { label: "Completed", value: "1", icon: Award },
        { label: "Quizzes Passed", value: "4", icon: Star },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">{t("My Dashboard")}</h1>
                    <p className="text-slate-500 dark:text-zinc-400 text-sm">{t("Continue your learning journey.")}</p>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {userStats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.4 }}
                            className="bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/5 p-6 rounded-2xl flex items-center gap-4 shadow-sm group"
                        >
                            <div className="p-3 bg-violet-50 dark:bg-violet-500/10 rounded-xl text-violet-600 dark:text-violet-500 group-hover:scale-110 transition-transform">
                                <Icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">{t(stat.label)}</p>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Continue Learning */}
            <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <PlayCircle className="text-violet-500" />
                    {t("Continue Learning")}
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Mock Course Card */}
                    <div className="border border-slate-100 dark:border-white/5 rounded-xl p-4 flex flex-col sm:flex-row gap-4 hover:border-violet-500/30 transition-colors">
                        <div className="w-full sm:w-32 h-24 bg-slate-100 dark:bg-slate-950 rounded-lg flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/5 overflow-hidden">
                            <span className="text-xs font-bold text-slate-400">LUXURY PRESALES</span>
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-1">Advanced Off-Plan Closing</h4>
                            <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 mb-3">Master the art of pitching luxury off-plan properties in the elite Dubai skyline.</p>

                            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mb-1.5 overflow-hidden">
                                <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-1.5 rounded-full w-[45%]" />
                            </div>
                            <div className="flex justify-between text-[10px] text-slate-500 dark:text-zinc-500 font-medium font-mono">
                                <span>Module 3 of 7</span>
                                <span>45%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
