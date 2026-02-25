"use client";

import { Plus, BookOpen, Star, Clock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ManageCourses() {
    return (
        <div className="space-y-6">
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Manage Courses</h1>
                    <p className="text-zinc-400">Create, edit, and organize training modules.</p>
                </div>
                <Link href="/dashboard/studio" className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all">
                    <Plus className="w-4 h-4" />
                    New Course
                </Link>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: "Luxury Closing Techniques", modules: 12, rating: 4.9, active: true },
                    { title: "Off-Plan Masterclass", modules: 8, rating: 4.8, active: true },
                    { title: "Client Acquisition Strategies", modules: 15, rating: 4.9, active: false },
                ].map((course, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-violet-500/30 transition-all hover:shadow-xl hover:shadow-violet-500/5 cursor-pointer"
                    >
                        <div className="h-40 bg-slate-800/80 relative flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10" />
                            <BookOpen className="w-12 h-12 text-slate-700 group-hover:scale-110 transition-transform duration-500" />
                            {course.active ? (
                                <div className="absolute top-4 right-4 z-20 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-md font-medium">Published</div>
                            ) : (
                                <div className="absolute top-4 right-4 z-20 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded-md font-medium">Draft</div>
                            )}
                        </div>
                        <div className="p-5">
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">{course.title}</h3>
                            <div className="flex items-center gap-4 text-xs text-zinc-400 mb-4">
                                <div className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {course.modules} Modules</div>
                                <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-violet-400" /> {course.rating}</div>
                                <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 3h 45m</div>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg transition-colors">Edit Content</button>
                                <button className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg transition-colors">Manage Access</button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
