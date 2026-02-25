"use client";

import { Plus, BookOpen, Star, Clock, X, Lock, CheckCircle, Video, PlayCircle, Edit3, Trash2, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

type Course = {
    id: number;
    title: string;
    modules: number;
    rating: number;
    time: string;
    active: boolean;
};

export default function ManageCourses() {
    const { t } = useLanguage();
    const [courses, setCourses] = useState<Course[]>([
        { id: 1, title: "Luxury Closing Techniques", modules: 12, rating: 4.9, time: "3h 45m", active: true },
        { id: 2, title: "Off-Plan Masterclass", modules: 8, rating: 4.8, time: "2h 30m", active: true },
        { id: 3, title: "Client Acquisition Strategies", modules: 15, rating: 4.9, time: "5h 15m", active: false },
    ]);

    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [accessCourse, setAccessCourse] = useState<Course | null>(null);

    // Inbuilt structure editor state
    const [structureNodes, setStructureNodes] = useState([
        { id: 1, title: "Module 1: Introduction", type: "module" },
        { id: 2, title: "Lesson: Mindset", type: "lesson" },
        { id: 3, title: "Quiz: Basics", type: "quiz" }
    ]);

    // Manual enroll state
    const [showEnrollInput, setShowEnrollInput] = useState(false);
    const [enrollEmail, setEnrollEmail] = useState("");
    const [enrolledUsers, setEnrolledUsers] = useState(["John Doe", "Sarah Connor", "Ali Hassan"]);

    const togglePublish = (id: number) => {
        setCourses(courses.map(c => c.id === id ? { ...c, active: !c.active } : c));
    };

    const addNode = (type: string) => {
        setStructureNodes([...structureNodes, { id: Date.now(), title: `New ${type}`, type }]);
    };

    const deleteNode = (id: number) => {
        setStructureNodes(structureNodes.filter(n => n.id !== id));
    };

    const handleEnroll = () => {
        if (!enrollEmail) return;
        setEnrolledUsers([...enrolledUsers, enrollEmail]);
        setEnrollEmail("");
        setShowEnrollInput(false);
    };

    return (
        <div className="space-y-6">
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">{t("Manage Courses")}</h1>
                    <p className="text-slate-500 dark:text-zinc-400 transition-colors">{t("Create, edit, and organize training modules.")}</p>
                </div>
                <Link href="/dashboard/studio" className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all">
                    <Plus className="w-4 h-4" />
                    {t("New Course")}
                </Link>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, idx) => (
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

                            <button
                                onClick={() => togglePublish(course.id)}
                                className={`absolute top-4 right-4 z-20 px-3 py-1.5 rounded-md font-medium text-xs transition-colors cursor-pointer flex items-center gap-1.5 backdrop-blur-md ${course.active ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 hover:bg-emerald-500/20 border" : "bg-amber-500/10 border-amber-500/20 text-amber-600 hover:bg-amber-500/20 border"}`}
                            >
                                <span className={`w-1.5 h-1.5 rounded-full ${course.active ? "bg-emerald-500" : "bg-amber-500"}`} />
                                {course.active ? t("Published") : t("Draft")}
                            </button>
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
                                <button onClick={() => setEditingCourse(course)} className="flex-1 py-1.5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-1">
                                    <Edit3 className="w-3.5 h-3.5" /> {t("Edit")}
                                </button>
                                <button onClick={() => setAccessCourse(course)} className="flex-1 py-1.5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-1">
                                    <Lock className="w-3.5 h-3.5" /> {t("Access")}
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
                                    {t("Edit Course Structure:")} {t(editingCourse.title)}
                                </h3>
                                <button onClick={() => setEditingCourse(null)} className="text-slate-400 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">

                                <div className="space-y-3">
                                    <h4 className="font-bold text-slate-900 dark:text-white">{t("Curriculum")}</h4>
                                    <div className="bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl p-4 space-y-2">
                                        {structureNodes.map((node) => (
                                            <div key={node.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${node.type === 'module' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400' :
                                                        node.type === 'lesson' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' :
                                                            'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'
                                                        }`}>
                                                        {node.type}
                                                    </span>
                                                    <input
                                                        type="text"
                                                        value={node.title}
                                                        onChange={(e) => setStructureNodes(structureNodes.map(n => n.id === node.id ? { ...n, title: e.target.value } : n))}
                                                        className="bg-transparent border-none outline-none text-sm font-medium text-slate-900 dark:text-white focus:ring-0 p-0"
                                                    />
                                                </div>
                                                <button onClick={() => deleteNode(node.id)} className="text-slate-400 hover:text-rose-500 transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <button onClick={() => addNode('module')} className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 rounded-md text-xs font-medium transition-colors flex items-center gap-1">+ {t("Add Module")}</button>
                                        <button onClick={() => addNode('lesson')} className="px-3 py-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20 rounded-md text-xs font-medium transition-colors flex items-center gap-1">+ {t("Add Lesson")}</button>
                                        <button onClick={() => addNode('quiz')} className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 rounded-md text-xs font-medium transition-colors flex items-center gap-1">+ {t("Add Quiz")}</button>
                                        <Link href="/dashboard/studio" className="px-3 py-1.5 bg-violet-600 text-white rounded-md text-xs font-medium hover:bg-violet-700 transition-colors flex items-center gap-1 ml-auto">
                                            {t("Open in Course Studio")}
                                        </Link>
                                    </div>
                                </div>
                                <div className="space-y-2 mt-4 pt-4 border-t border-slate-200 dark:border-white/10">
                                    <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">{t("Link Global Mandatory Quiz")}</label>
                                    <select className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-violet-500/50">
                                        <option value="">{t("No Quiz Required")}</option>
                                        <option value="quiz1">{t("Off-Plan Market Assessment")}</option>
                                        <option value="quiz3" selected>{t("Dubai Real Estate Laws (Mandatory Completion)")}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="p-6 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/50 flex justify-end gap-3">
                                <button onClick={() => setEditingCourse(null)} className="px-5 py-2 text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-colors">{t("Cancel")}</button>
                                <button onClick={() => setEditingCourse(null)} className="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium transition-colors">{t("Save Changes")}</button>
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
                                    {t("Manage Access:")} {t(accessCourse.title)}
                                </h3>
                                <button onClick={() => setAccessCourse(null)} className="text-slate-400 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                                <div className="space-y-4">
                                    <div className="bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div>
                                            <h4 className="text-slate-900 dark:text-white font-medium">{t("Global Role Access")}</h4>
                                            <p className="text-sm text-slate-500 dark:text-zinc-400">{t("Instantly grant access to specific roles.")}</p>
                                        </div>
                                        <select className="bg-white dark:bg-black p-2.5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none w-full sm:w-auto">
                                            <option>{t("All Consultants")}</option>
                                            <option>{t("Senior Consultants Only")}</option>
                                            <option>{t("Managers Only")}</option>
                                            <option>{t("Invite Only (Manual)")}</option>
                                        </select>
                                    </div>
                                    <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                                        <h4 className="text-slate-900 dark:text-white font-medium mb-3">{t("Enrolled Users")} ({enrolledUsers.length})</h4>
                                        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                                            {enrolledUsers.map((name, i) => (
                                                <div key={i} className="flex items-center justify-between border border-slate-200 dark:border-white/5 p-3 rounded-lg bg-slate-50 dark:bg-white/[0.02]">
                                                    <span className="text-slate-700 dark:text-zinc-300 text-sm font-medium truncate">{name}</span>
                                                    <button onClick={() => setEnrolledUsers(enrolledUsers.filter(u => u !== name))} className="text-xs text-rose-500 hover:text-rose-600 font-medium px-2 py-1 bg-rose-50 dark:bg-rose-500/10 rounded-md transition-colors shrink-0">{t("Revoke")}</button>
                                                </div>
                                            ))}
                                            {enrolledUsers.length === 0 && (
                                                <div className="text-slate-500 text-sm py-4 text-center">{t("No users enrolled manually.")}</div>
                                            )}
                                        </div>
                                    </div>

                                    {showEnrollInput ? (
                                        <div className="flex gap-2 items-center bg-slate-50 dark:bg-black/40 p-2 rounded-xl border border-slate-300 dark:border-white/20">
                                            <Mail className="w-4 h-4 text-slate-400 ml-2 shrink-0" />
                                            <input
                                                type="text"
                                                autoFocus
                                                value={enrollEmail}
                                                onChange={(e) => setEnrollEmail(e.target.value)}
                                                onKeyDown={(e) => { if (e.key === 'Enter') handleEnroll(); }}
                                                placeholder={t("Enter email or name to add user...")}
                                                className="flex-1 bg-transparent outline-none text-sm text-slate-900 dark:text-white"
                                            />
                                            <button onClick={handleEnroll} disabled={!enrollEmail} className="px-3 py-1.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white rounded-lg text-xs font-medium transition-colors">{t("Add")}</button>
                                            <button onClick={() => setShowEnrollInput(false)} className="px-2 py-1.5 text-slate-500 hover:text-slate-700 transition-colors"><X className="w-4 h-4" /></button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setShowEnrollInput(true)}
                                            className="w-full py-2.5 mt-2 border border-dashed border-slate-300 dark:border-white/30 text-slate-600 dark:text-zinc-400 rounded-xl hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-500/50 hover:bg-violet-50 dark:hover:bg-violet-500/5 transition-colors text-sm font-medium"
                                        >
                                            + {t("Enroll Custom User Directly")}
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="p-6 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/50 flex justify-end">
                                <button onClick={() => setAccessCourse(null)} className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl font-medium transition-colors hover:bg-slate-800 dark:hover:bg-zinc-200">{t("Done")}</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
