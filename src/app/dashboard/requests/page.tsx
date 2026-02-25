"use client";

import { Users, Clock, CheckCircle, X, Check, Search, BookOpen, ChevronRight, ArrowRightLeft } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

type RequestType = { id: number; name: string; time: string };

const AVAILABLE_COURSES = [
    { id: "c1", title: "Luxury Closing Techniques" },
    { id: "c2", title: "Off-Plan Masterclass" },
    { id: "c3", title: "Client Acquisition Strategies" },
    { id: "c4", title: "Dubai Real Estate Laws" }
];

export default function AccessRequests() {
    const { t } = useLanguage();
    const [requests, setRequests] = useState<RequestType[]>([
        { id: 1, name: "Alexander Patel", time: "2 hours ago" },
        { id: 2, name: "Sofia Rossi", time: "3 hours ago" },
        { id: 3, name: "Omar Al Fayed", time: "5 hours ago" },
    ]);
    const [approvedCount, setApprovedCount] = useState(5);

    const [approvalModal, setApprovalModal] = useState<RequestType | null>(null);
    const [role, setRole] = useState("Property Consultant");
    const [assignedCourses, setAssignedCourses] = useState<string[]>([]);

    const toggleCourse = (courseId: string) => {
        if (assignedCourses.includes(courseId)) {
            setAssignedCourses(assignedCourses.filter(id => id !== courseId));
        } else {
            setAssignedCourses([...assignedCourses, courseId]);
        }
    };

    const handleApprove = () => {
        if (!approvalModal) return;
        setRequests(requests.filter(r => r.id !== approvalModal.id));
        setApprovedCount(prev => prev + 1);
        setApprovalModal(null);
        setAssignedCourses([]);
        setRole("Property Consultant");
    };

    const handleDecline = (id: number) => {
        setRequests(requests.filter(r => r.id !== id));
    };

    return (
        <div className="space-y-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">{t("Access Requests")}</h1>
                <p className="text-slate-500 dark:text-zinc-400">{t("Manage incoming requests from potential property consultants.")}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 p-6 rounded-2xl flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-sm text-slate-500 dark:text-zinc-400 mb-1 font-medium">{t("Total Requests")}</p>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">124</h3>
                    </div>
                    <div className="w-12 h-12 bg-violet-100 dark:bg-violet-500/10 rounded-xl flex items-center justify-center border border-violet-200 dark:border-violet-500/20">
                        <Users className="text-violet-600 dark:text-violet-500 w-6 h-6" />
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 p-6 rounded-2xl flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-sm text-slate-500 dark:text-zinc-400 mb-1 font-medium">{t("Pending Approval")}</p>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{requests.length}</h3>
                    </div>
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-200 dark:border-amber-500/20">
                        <Clock className="text-amber-600 dark:text-amber-500 w-6 h-6" />
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 p-6 rounded-2xl flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-sm text-slate-500 dark:text-zinc-400 mb-1 font-medium">{t("Approved Today")}</p>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{approvedCount}</h3>
                    </div>
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-200 dark:border-emerald-500/20">
                        <CheckCircle className="text-emerald-600 dark:text-emerald-500 w-6 h-6" />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm shadow-sm">
                <div className="p-6 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-transparent">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t("Recent Requests")} ({requests.length})</h2>
                </div>
                <div className="p-6">
                    <AnimatePresence>
                        {requests.length === 0 ? (
                            <div className="text-center py-10 text-slate-500 dark:text-zinc-500 font-medium">{t("No pending requests at this time.")}</div>
                        ) : (
                            <div className="space-y-4">
                                {requests.map((req) => (
                                    <motion.div
                                        key={req.id}
                                        initial={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex items-center justify-between p-4 bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5 rounded-xl hover:border-violet-300 dark:hover:border-violet-500/30 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-white font-bold">
                                                {req.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="text-slate-900 dark:text-white font-medium">{req.name}</h4>
                                                <p className="text-xs text-slate-500 dark:text-zinc-400">{t("Requested")} {req.time}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleDecline(req.id)} className="px-4 py-2 bg-white dark:bg-black hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg text-sm text-slate-700 dark:text-white font-medium transition-colors">{t("Decline")}</button>
                                            <button onClick={() => setApprovalModal(req)} className="px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-sm text-white font-medium transition-colors">{t("Assign & Approve")}</button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Approve Modal (Kanban Style Flow) */}
            <AnimatePresence>
                {approvalModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10 flex flex-col max-h-[90vh]"
                        >
                            <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-slate-950/50 shrink-0">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <CheckCircle className="text-emerald-500 w-6 h-6" />
                                        {t("Approve Access:")} {approvalModal.name}
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">{t("Configure role and training curriculum before granting entry.")}</p>
                                </div>
                                <button onClick={() => setApprovalModal(null)} className="text-slate-400 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                                {/* Step 1: Role */}
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">{t("1. Assign Role")}</h4>
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-full max-w-sm bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-violet-500"
                                    >
                                        <option value="Property Consultant">{t("Property Consultant")}</option>
                                        <option value="Senior Consultant">{t("Senior Consultant")}</option>
                                        <option value="Sales Manager">{t("Sales Manager")}</option>
                                        <option value="Admin">{t("Admin")}</option>
                                    </select>
                                </div>

                                {/* Step 2: Kanban Course Assigner */}
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">{t("2. Enroll in Courses (Drag or Click)")}</h4>
                                        <span className="text-xs text-violet-600 dark:text-violet-400 font-medium">{t("Kanban Approvals")}</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-black/20 p-6 rounded-xl border border-slate-300 dark:border-white/10">

                                        {/* Available Column */}
                                        <div className="space-y-3">
                                            <h5 className="font-semibold text-slate-900 dark:text-white flex items-center justify-between">
                                                {t("Available Modules")}
                                                <span className="bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-zinc-300 text-xs px-2 py-1 rounded">
                                                    {AVAILABLE_COURSES.length - assignedCourses.length}
                                                </span>
                                            </h5>
                                            <div className="min-h-[200px] bg-slate-100 dark:bg-black/40 border border-slate-300 dark:border-white/5 rounded-xl p-3 space-y-3">
                                                {AVAILABLE_COURSES.map(course => !assignedCourses.includes(course.id) && (
                                                    <div
                                                        key={`avail-${course.id}`}
                                                        onClick={() => toggleCourse(course.id)}
                                                        className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 p-4 rounded-lg shadow-sm cursor-pointer hover:border-violet-500 transition-colors flex items-center justify-between"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <BookOpen className="w-4 h-4 text-slate-400 dark:text-zinc-500 group-hover:text-violet-500" />
                                                            <span className="text-sm font-medium text-slate-700 dark:text-white">{t(course.title)}</span>
                                                        </div>
                                                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-violet-500" />
                                                    </div>
                                                ))}
                                                {assignedCourses.length === AVAILABLE_COURSES.length && (
                                                    <div className="text-center text-sm text-slate-500 dark:text-zinc-500 py-10 font-medium">{t("All courses assigned.")}</div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Assigned Column */}
                                        <div className="space-y-3">
                                            <h5 className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
                                                {t("Enrolled & Granted Access")}
                                                <span className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs px-2 py-1 rounded">
                                                    {assignedCourses.length}
                                                </span>
                                            </h5>
                                            <div className="min-h-[200px] bg-slate-100 dark:bg-black/40 border border-slate-300 dark:border-white/5 rounded-xl p-3 space-y-3">
                                                {AVAILABLE_COURSES.map(course => assignedCourses.includes(course.id) && (
                                                    <div
                                                        key={`assigned-${course.id}`}
                                                        onClick={() => toggleCourse(course.id)}
                                                        className="group bg-emerald-50 dark:bg-slate-800 border border-emerald-200 dark:border-emerald-500/30 p-4 rounded-lg shadow-sm cursor-pointer hover:border-rose-400 transition-colors flex items-center justify-between relative overflow-hidden"
                                                    >
                                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />
                                                        <div className="flex items-center gap-3 pl-2">
                                                            <Check className="w-4 h-4 text-emerald-500" />
                                                            <span className="text-sm font-medium text-emerald-800 dark:text-emerald-50">{t(course.title)}</span>
                                                        </div>
                                                        <X className="w-4 h-4 text-slate-400 group-hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </div>
                                                ))}
                                                {assignedCourses.length === 0 && (
                                                    <div className="text-center text-sm text-slate-500 dark:text-zinc-500 py-10 font-medium">{t("Click available modules to assign.")}</div>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="p-6 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/50 flex justify-end gap-3 shrink-0">
                                <button onClick={() => setApprovalModal(null)} className="px-5 py-2 text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-colors font-medium">{t("Cancel")}</button>
                                <button onClick={handleApprove} className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]">{t("Complete Approval Pipeline")}</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
