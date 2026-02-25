"use client";

import { CheckSquare, ListPlus, Edit3, Settings, Trash2, X, Plus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Quiz = {
    id: number;
    title: string;
    questions: number;
    time: string;
    difficulty: string;
    assignedTo: string;
};

export default function QuizBuilder() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([
        { id: 1, title: "Off-Plan Market Assessment", questions: 25, time: "45 mins", difficulty: "Advanced", assignedTo: "Module 2: Off-Plan Strategies" },
        { id: 2, title: "Client Qualification Basics", questions: 10, time: "15 mins", difficulty: "Beginner", assignedTo: "Module 1: Getting Started" },
        { id: 3, title: "Dubai Real Estate Laws", questions: 30, time: "60 mins", difficulty: "Expert", assignedTo: "Global Mandatory" },
        { id: 4, title: "Negotiation Tactics Test", questions: 15, time: "30 mins", difficulty: "Intermediate", assignedTo: "Module 4: Closing" },
    ]);

    const [isEditing, setIsEditing] = useState<Quiz | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    // Form state
    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState(10);
    const [time, setTime] = useState("30 mins");
    const [difficulty, setDifficulty] = useState("Intermediate");
    const [assignedTo, setAssignedTo] = useState("Unassigned");

    const handleCreateOpen = () => {
        setTitle("");
        setQuestions(10);
        setTime("30 mins");
        setDifficulty("Beginner");
        setAssignedTo("Unassigned");
        setIsCreating(true);
    };

    const handleEditOpen = (quiz: Quiz) => {
        setIsEditing(quiz);
        setTitle(quiz.title);
        setQuestions(quiz.questions);
        setTime(quiz.time);
        setDifficulty(quiz.difficulty);
        setAssignedTo(quiz.assignedTo);
    };

    const handleDelete = (id: number) => {
        setQuizzes(quizzes.filter(q => q.id !== id));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            setQuizzes(quizzes.map(q => q.id === isEditing.id ? { ...q, title, questions, time, difficulty, assignedTo } : q));
            setIsEditing(null);
        } else if (isCreating) {
            setQuizzes([...quizzes, { id: Date.now(), title, questions, time, difficulty, assignedTo }]);
            setIsCreating(false);
        }
    };

    return (
        <div className="space-y-6">
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">Quiz Builder</h1>
                    <p className="text-slate-500 dark:text-zinc-400">Design assessments to evaluate consultant knowledge.</p>
                </div>
                <button
                    onClick={handleCreateOpen}
                    className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all"
                >
                    <ListPlus className="w-4 h-4" />
                    Create Quiz
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {quizzes.length === 0 && (
                    <div className="col-span-1 lg:col-span-2 text-center py-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl flex flex-col items-center">
                        <CheckSquare className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-3" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Quizzes Found</h3>
                        <p className="text-slate-500 dark:text-zinc-400 mt-1 max-w-sm">Create your first assessment to start evaluating members.</p>
                        <button onClick={handleCreateOpen} className="mt-4 text-violet-600 hover:text-violet-700 font-medium">+ Add New Quiz</button>
                    </div>
                )}
                {quizzes.map((quiz, idx) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={idx}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 p-6 rounded-2xl hover:border-violet-500/30 dark:hover:border-violet-500/30 transition-all group shadow-sm flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 bg-violet-100 dark:bg-violet-500/10 rounded-xl flex items-center justify-center border border-violet-200 dark:border-violet-500/20">
                                    <CheckSquare className="text-violet-600 dark:text-violet-500 w-6 h-6" />
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEditOpen(quiz)} className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-white transition-colors" title="Edit Quiz Settings">
                                        <Settings className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => window.location.href = '/dashboard/studio'} className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-white transition-colors" title="Edit Questions in Studio">
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDelete(quiz.id)} className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-white transition-colors" title="Delete Quiz">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-1">{quiz.title}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="text-xs font-medium text-slate-500 dark:text-zinc-400 bg-slate-50 dark:bg-black/20 p-2.5 rounded-lg border border-slate-100 dark:border-white/5">
                                Assigned to: <span className="text-slate-800 dark:text-zinc-200">{quiz.assignedTo}</span>
                            </div>
                            <div className="flex gap-4 text-sm text-slate-500 dark:text-zinc-400 pt-4 border-t border-slate-100 dark:border-white/5 justify-between">
                                <div className="flex gap-4">
                                    <div><span className="text-slate-900 dark:text-white font-medium">{quiz.questions}</span> Qs</div>
                                    <div>&bull;</div>
                                    <div>{quiz.time}</div>
                                </div>
                                <div className="text-violet-600 dark:text-violet-400 font-medium">{quiz.difficulty}</div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal for Creating/Editing */}
            <AnimatePresence>
                {(isEditing || isCreating) && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10"
                        >
                            <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-slate-950/50">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    {isEditing ? <Settings className="text-violet-500 w-5 h-5" /> : <ListPlus className="text-violet-500 w-5 h-5" />}
                                    {isEditing ? "Quiz Settings" : "Create New Quiz"}
                                </h3>
                                <button onClick={() => { setIsEditing(null); setIsCreating(false); }} title="Close Modal" className="text-slate-400 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <form onSubmit={handleSave}>
                                <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">Quiz Title</label>
                                        <input
                                            type="text"
                                            required
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="e.g. Masterclass Final Exam"
                                            className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-lg px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-violet-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">Assign to specific Module or Lesson</label>
                                        <select
                                            value={assignedTo}
                                            onChange={(e) => setAssignedTo(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-lg px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-violet-500"
                                        >
                                            <option value="Unassigned">Unassigned (Draft)</option>
                                            <option value="Global Mandatory">Global Mandatory (All Users)</option>
                                            <option value="Module 1: Getting Started">Module 1: Getting Started</option>
                                            <option value="Module 2: Off-Plan Strategies">Module 2: Off-Plan Strategies</option>
                                            <option value="Module 3: Ethics">Module 3: Ethics</option>
                                            <option value="Module 4: Closing">Module 4: Closing</option>
                                            <option value="Lesson: Phone Scripts">Lesson: Phone Scripts</option>
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">Total Time Limit</label>
                                            <select
                                                value={time}
                                                onChange={(e) => setTime(e.target.value)}
                                                className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-lg px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-violet-500"
                                            >
                                                <option value="No Limit">No Limit</option>
                                                <option value="15 mins">15 mins</option>
                                                <option value="30 mins">30 mins</option>
                                                <option value="45 mins">45 mins</option>
                                                <option value="60 mins">60 mins</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">Difficulty Level</label>
                                            <select
                                                value={difficulty}
                                                onChange={(e) => setDifficulty(e.target.value)}
                                                className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-lg px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-violet-500"
                                            >
                                                <option value="Beginner">Beginner</option>
                                                <option value="Intermediate">Intermediate</option>
                                                <option value="Advanced">Advanced</option>
                                                <option value="Expert">Expert</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">Estimated Question Count</label>
                                        <input
                                            type="number"
                                            value={questions}
                                            onChange={(e) => setQuestions(Number(e.target.value))}
                                            className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-lg px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-violet-500"
                                        />
                                    </div>
                                </div>
                                <div className="p-6 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/50 flex justify-end gap-3">
                                    <button type="button" onClick={() => { setIsEditing(null); setIsCreating(false); }} className="px-5 py-2 text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-colors font-medium">Cancel</button>
                                    <button type="submit" className="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium transition-colors">
                                        {isEditing ? "Save Settings" : "Create Quiz"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
