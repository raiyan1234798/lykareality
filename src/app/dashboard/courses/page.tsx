"use client";

import { Plus, BookOpen, Star, Clock, X, Lock, CheckCircle, Video, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Course = {
    id: number;
    title: string;
    modules: number;
    rating: number;
    time: string;
    active: boolean;
};

export default function ManageCourses() {
    const [courses, setCourses] = useState<Course[]>([
        { id: 1, title: "Luxury Closing Techniques", modules: 12, rating: 4.9, time: "3h 45m", active: true },
        { id: 2, title: "Off-Plan Masterclass", modules: 8, rating: 4.8, time: "2h 30m", active: true },
        { id: 3, title: "Client Acquisition Strategies", modules: 15, rating: 4.9, time: "5h 15m", active: false },
    ]);

    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [accessCourse, setAccessCourse] = useState<Course | null>(null);

    const togglePublish = (id: number) => {
        setCourses(courses.map(c => c.id === id ? { ...c, active: !c.active } : c));
    };

    return (
        <div className="space-y-6">
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">Manage Courses</h1>
                    <p className="text-slate-500 dark:text-zinc-400 transition-colors">Create, edit, and organize training modules.</p>
                </div>
                <Link href="/dashboard/studio" className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all">
                    <Plus className="w-4 h-4" />
                    New Course
                </Link>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, idx) => (
                    <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden hover:border-violet-500/30 dark:hover:border-violet-500/30 transition-all hover:shadow-xl hover:shadow-violet-500/5"
                    >
                        <div className="h-40 bg-slate-100 dark:bg-slate-800/80 relative flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-200 dark:from-slate-900 to-transparent z-10" />
                            <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-700 group-hover:scale-110 transition-transform duration-500" />

                            <button
                                onClick={() => togglePublish(course.id)}
                                className={`absolute top-4 right-4 z-20 px-3 py-1.5 rounded-md font-medium text-xs transition-colors cursor-pointer flex items-center gap-1.5 backdrop-blur-md ${course.active ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 border" : "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 border"}`}
                            >
                                <span className={`w-1.5 h-1.5 rounded-full ${course.active ? "bg-emerald-500" : "bg-amber-500"}`} />
                                {course.active ? "Published (Click to Draft)" : "Draft (Click to Publish)"}
                            </button>
                        </div>
                        <div className="p-5">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">{course.title}</h3>
                            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-zinc-400 mb-4 transition-colors">
                                <div className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {course.modules} Modules</div>
                                <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-violet-500 dark:text-violet-400" /> {course.rating}</div>
                                <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.time}</div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setEditingCourse(course)} className="flex-1 py-1.5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-white text-sm font-medium rounded-lg transition-colors">
                                    Edit Content
                                </button>
                                <button onClick={() => setAccessCourse(course)} className="flex-1 py-1.5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-white text-sm font-medium rounded-lg transition-colors">
                                    Manage Access
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Edit Content Modal */}
            <AnimatePresence>
                {editingCourse && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10"
                        >
                            <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-slate-950/50">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <Video className="text-violet-500 w-5 h-5" />
                                    Edit Course: {editingCourse.title}
                                </h3>
                                <button onClick={() => setEditingCourse(null)} className="text-slate-400 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">Course Demo Video</label>
                                    <div className="w-full aspect-video bg-slate-100 dark:bg-slate-950 rounded-lg flex flex-col items-center justify-center border border-dashed border-slate-300 dark:border-white/20 relative group overflow-hidden">
                                        <PlayCircle className="w-12 h-12 text-violet-500/50 group-hover:text-violet-500 transition-colors z-10" />
                                        <div className="mt-2 text-sm text-slate-500 dark:text-zinc-400 z-10">Upload Demo Video (MP4)</div>
                                        {/* Fake Demo Output */}
                                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
                                    </div>
                                </div>
                                <div className="space-y-2 mt-4">
                                    <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">Link Mandatory Quiz</label>
                                    <select className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-violet-500/50">
                                        <option value="">No Quiz Required</option>
                                        <option value="quiz1">Off-Plan Market Assessment</option>
                                        <option value="quiz2">Client Qualification Basics</option>
                                        <option value="quiz3" selected>Dubai Real Estate Laws (Mandatory Completion)</option>
                                    </select>
                                    <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">
                                        If selected, users must <span className="text-emerald-500 font-medium">pass this quiz</span> to mark the course as completed.
                                    </p>
                                </div>
                            </div>
                            <div className="p-6 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/50 flex justify-end gap-3">
                                <button onClick={() => setEditingCourse(null)} className="px-5 py-2 text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-colors">Cancel</button>
                                <button onClick={() => setEditingCourse(null)} className="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium transition-colors">Save Changes</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Manage Access Modal */}
            <AnimatePresence>
                {accessCourse && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10"
                        >
                            <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-slate-950/50">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <Lock className="text-violet-500 w-5 h-5" />
                                    Manage Access: {accessCourse.title}
                                </h3>
                                <button onClick={() => setAccessCourse(null)} className="text-slate-400 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    <div className="bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 p-4 rounded-xl flex items-center justify-between">
                                        <div>
                                            <h4 className="text-slate-900 dark:text-white font-medium">Global Role Access</h4>
                                            <p className="text-sm text-slate-500 dark:text-zinc-400">Instantly grant access to specific roles.</p>
                                        </div>
                                        <select className="bg-white dark:bg-black p-2 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none">
                                            <option>All Consultants</option>
                                            <option>Senior Consultants Only</option>
                                            <option>Managers Only</option>
                                            <option>Invite Only (Manual)</option>
                                        </select>
                                    </div>
                                    <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                                        <h4 className="text-slate-900 dark:text-white font-medium mb-3">Manually Enrolled Users (3)</h4>
                                        <div className="space-y-2">
                                            {["John Doe", "Sarah Connor", "Ali Hassan"].map((name, i) => (
                                                <div key={i} className="flex items-center justify-between border border-slate-200 dark:border-white/5 p-3 rounded-lg bg-slate-50 dark:bg-white/[0.02]">
                                                    <span className="text-slate-700 dark:text-zinc-300 text-sm font-medium">{name}</span>
                                                    <button className="text-xs text-rose-500 hover:text-rose-600 font-medium px-2 py-1 bg-rose-50 dark:bg-rose-500/10 rounded-md transition-colors">Revoke</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <button className="w-full py-2.5 mt-2 border border-dashed border-slate-300 dark:border-white/20 text-slate-600 dark:text-zinc-400 rounded-xl hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-500/50 hover:bg-violet-50 dark:hover:bg-violet-500/5 transition-colors text-sm font-medium">
                                        + Enroll New User Manually
                                    </button>
                                </div>
                            </div>
                            <div className="p-6 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/50 flex justify-end">
                                <button onClick={() => setAccessCourse(null)} className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl font-medium transition-colors hover:bg-slate-800 dark:hover:bg-zinc-200">Done</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
