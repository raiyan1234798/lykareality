"use client";

import { BookOpen, Star, Clock, Lock } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { useUserRole } from "@/hooks/useUserRole";

type Course = {
    id: number;
    title: string;
    modules: number;
    rating: number;
    time: string;
    active: boolean;
    status: "available" | "pending" | "enrolled";
};

export default function AllCourses() {
    const { t } = useLanguage();
    const { isAdmin } = useUserRole();

    // Mock all published courses available in the system
    const [courses, setCourses] = useState<Course[]>([
        { id: 1, title: "Luxury Closing Techniques", modules: 12, rating: 4.9, time: "3h 45m", active: true, status: "enrolled" },
        { id: 2, title: "Off-Plan Masterclass", modules: 8, rating: 4.8, time: "2h 30m", active: true, status: "pending" },
        { id: 3, title: "Dubai Real Estate Laws (2026)", modules: 15, rating: 4.9, time: "5h 15m", active: true, status: "available" },
        { id: 4, title: "Networking in the Elite Market", modules: 6, rating: 4.7, time: "1h 50m", active: true, status: "available" },
    ]);

    const handleEnroll = (id: number) => {
        setCourses(courses.map(c => c.id === id ? { ...c, status: "pending" } : c));
    };

    if (isAdmin) {
        return (
            <div className="w-full h-full min-h-[50vh] flex flex-col items-center justify-center">
                <p className="text-sm text-slate-500 font-medium">Please preview courses directly from the 'Manage Courses' admin panel.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">
                        {t("All Courses")}
                    </h1>
                    <p className="text-slate-500 dark:text-zinc-400 transition-colors">
                        {t("Browse the Lyka Academy library and request enrollment.")}
                    </p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.filter(c => c.active).map((course, idx) => (
                    <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden hover:border-violet-500/30 dark:hover:border-violet-500/30 transition-all hover:shadow-xl hover:shadow-violet-500/5 relative flex flex-col"
                    >
                        <div className="h-40 bg-slate-100 dark:bg-slate-800/80 relative flex items-center justify-center overflow-hidden shrink-0">
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-200 dark:from-slate-900 to-transparent z-10" />
                            <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-700 group-hover:scale-110 transition-transform duration-500 z-0" />
                            {course.status === "enrolled" && (
                                <span className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-md font-medium text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 backdrop-blur-md">
                                    {t("Enrolled")}
                                </span>
                            )}
                            {course.status === "pending" && (
                                <span className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-md font-medium text-xs bg-amber-500/10 border border-amber-500/20 text-amber-600 backdrop-blur-md">
                                    {t("Approval Pending")}
                                </span>
                            )}
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-1">{t(course.title)}</h3>
                                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-zinc-400 mb-4 transition-colors">
                                    <div className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{course.modules} {t("Mods")}</div>
                                    <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-violet-500" />{course.rating}</div>
                                    <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.time}</div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {course.status === "available" ? (
                                    <button onClick={() => handleEnroll(course.id)} className="w-full py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                                        <Lock className="w-4 h-4" /> {t("Enroll Now")}
                                    </button>
                                ) : course.status === "pending" ? (
                                    <button disabled className="w-full py-1.5 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-zinc-400 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 cursor-not-allowed">
                                        {t("Waiting for Admin...")}
                                    </button>
                                ) : (
                                    <button className="w-full py-1.5 bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                                        {t("Go to My Courses")}
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
