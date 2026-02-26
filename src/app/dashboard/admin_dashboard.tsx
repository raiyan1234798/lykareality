"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Users, BookOpen, GraduationCap, TrendingUp,
    ArrowUpRight, ArrowDownRight, MoreHorizontal, Check
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Dashboard() {
    const { t } = useLanguage();
    const [exporting, setExporting] = useState(false);
    const [managing, setManaging] = useState(false);
    const [reviewedId, setReviewedId] = useState<string | null>(null);

    const handleAction = (setter: any) => {
        setter(true);
        setTimeout(() => setter(false), 1500);
    };

    const [stats, setStats] = useState({
        activeTrainees: 0,
        courseEnrollments: 0,
        certificationsIssued: 0,
        completionRate: 0,
        pendingRequests: [] as any[]
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const usersSnap = await getDocs(collection(db, "users"));
                let active = 0;
                let enrollments = 0;
                let pending: any[] = [];

                usersSnap.forEach((docSnap) => {
                    const data = docSnap.data();
                    if (data.status === "approved" || data.status === "active") active++;
                    if (data.status === "pending") {
                        pending.push({ id: docSnap.id, ...data });
                    }
                    if (data.enrolledCourses) {
                        enrollments += data.enrolledCourses.length;
                    }
                });

                setStats({
                    activeTrainees: active,
                    courseEnrollments: enrollments || 0,
                    certificationsIssued: Math.floor(active * 0.4),
                    completionRate: active > 0 ? 82 : 0,
                    pendingRequests: pending
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };
        fetchStats();
    }, []);

    const handleReview = async (id: string) => {
        handleAction(() => setReviewedId(null)); // just a visual trigger
        try {
            await updateDoc(doc(db, "users", id), { status: "approved" });
            setStats(prev => ({
                ...prev,
                pendingRequests: prev.pendingRequests.filter(req => req.id !== id),
                activeTrainees: prev.activeTrainees + 1
            }));
        } catch (error) {
            console.error("Error approving request", error);
        }
    };

    const Kpis = [
        { label: "Active Trainees", value: stats.activeTrainees.toString(), change: "+12.5%", isPositive: true, icon: Users },
        { label: "Course Enrollments", value: stats.courseEnrollments.toString(), change: "+5.2%", isPositive: true, icon: BookOpen },
        { label: "Certifications Issued", value: stats.certificationsIssued.toString(), change: "+22.4%", isPositive: true, icon: GraduationCap },
        { label: "Completion Rate", value: `${stats.completionRate}%`, change: "-1.1%", isPositive: false, icon: TrendingUp },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">{t("Analytics Overview")}</h1>
                    <p className="text-slate-500 dark:text-zinc-400 text-sm">{t("Welcome back. Here is your enterprise performance at a glance.")}</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => handleAction(setExporting)}
                        disabled={exporting}
                        className="px-4 py-2 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white rounded-lg text-sm bg-white/50 dark:bg-slate-950/40 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors backdrop-blur-md flex items-center justify-center min-w-[160px] relative disabled:opacity-80"
                    >
                        {exporting ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-slate-400 dark:border-white/30 border-t-slate-700 dark:border-t-white rounded-full" />
                        ) : t("Export Report (.xlsx)")}
                    </button>
                    <button
                        onClick={() => handleAction(setManaging)}
                        disabled={managing}
                        className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg text-sm shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all flex items-center justify-center min-w-[130px] disabled:opacity-80 relative"
                    >
                        {managing ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                        ) : t("Manage Data")}
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
                            <div className="text-slate-500 dark:text-zinc-400 text-sm font-medium">{t(kpi.label)}</div>
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
                    className="lg:col-span-2 bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-xl p-6 shadow-sm group hover:border-violet-500/20 transition-colors"
                >
                    <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-white/5 pb-4">
                        <h3 className="text-slate-900 dark:text-white font-semibold">{t("Enrollment & Performance Trend")}</h3>
                        <button title={t("More options")} className="text-slate-400 hover:text-slate-600 dark:hover:text-white"><MoreHorizontal className="w-5 h-5" /></button>
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
                    className="bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-xl p-6 shadow-sm group hover:border-violet-500/20 transition-colors"
                >
                    <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-white/5 pb-4">
                        <h3 className="text-slate-900 dark:text-white font-semibold">{t("Access Requests")}</h3>
                        <span className="bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold px-2 py-1 rounded border border-rose-100 dark:border-transparent">{stats.pendingRequests.length} {t("Pending")}</span>
                    </div>

                    <div className="space-y-4">
                        {stats.pendingRequests.length === 0 ? (
                            <p className="text-center text-sm text-slate-500 my-4">{t("No pending requests.")}</p>
                        ) : stats.pendingRequests.slice(0, 5).map((item: any) => (
                            <div key={item.id} className="flex justify-between items-center group/item cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg transition-all hover:scale-[1.02] -mx-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded bg-slate-100 dark:bg-slate-950 flex items-center justify-center border border-slate-200 dark:border-white/5 text-slate-500 dark:text-zinc-400 font-medium group-hover/item:text-violet-600 dark:group-hover/item:text-violet-500 group-hover/item:border-violet-500/30 transition-colors">
                                        {item.name ? item.name.charAt(0).toUpperCase() : "?"}
                                    </div>
                                    <div>
                                        <h4 className="text-slate-900 dark:text-white text-sm font-medium">{item.name || "User"}</h4>
                                        <p className="text-slate-500 dark:text-zinc-400 text-xs">{item.role || t("Property Consultant")}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleReview(item.id)}
                                    className={`transition-colors text-sm font-medium ${reviewedId === item.id ? 'text-emerald-500' : 'text-violet-600 dark:text-violet-500 hover:text-violet-700 dark:hover:text-white opacity-0 group-hover/item:opacity-100 transition-opacity'}`}
                                >
                                    {reviewedId === item.id ? <Check className="w-4 h-4" /> : t("Approve")}
                                </button>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
