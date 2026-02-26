"use client";

import { motion } from "framer-motion";
import { PlayCircle, CheckCircle2, Lock, FileText, ChevronRight, MessageSquare, Maximize, Settings2 } from "lucide-react";
import { useState } from "react";

type Lesson = { id: number, title: string, duration: string, videoId?: string, type?: "video" | "quiz" };
type Module = { id: number, title: string, duration: string, lessons: Lesson[] };

const MODULES: Module[] = [
    {
        id: 1,
        title: "The Lyka Foundation",
        duration: "45m",
        lessons: [
            { id: 101, title: "Welcome to Elite Real Estate", duration: "2:30", videoId: "tO01J-M3g0U", type: "video" },
            { id: 102, title: "Brand Positioning & The Investor Mindset", duration: "18:45", videoId: "gG22XNhtnoY", type: "video" },
            { id: 103, title: "Module 1 Assessment", duration: "5:00", type: "quiz" },
        ]
    },
    {
        id: 2,
        title: "Off-Plan Mastery",
        duration: "2h 15m",
        lessons: [
            { id: 201, title: "Analyzing Developer Portfolios", duration: "24:00", videoId: "LXb3EKWsInQ", type: "video" },
            { id: 202, title: "Selling the Vision", duration: "32:10", videoId: "xcJtL7QggTI", type: "video" },
            { id: 203, title: "Phase Two Checkpoint", duration: "15:00", type: "quiz" },
        ]
    }
];

export default function CourseLearningEngine() {
    const [activeTab, setActiveTab] = useState("overview");
    const [activeLessonId, setActiveLessonId] = useState(101);

    // Quiz state
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    // Find active lesson
    let activeLesson: Lesson | undefined;
    for (const mod of MODULES) {
        const found = mod.lessons.find(l => l.id === activeLessonId);
        if (found) activeLesson = found;
    }

    return (
        <div className="flex flex-col xl:flex-row gap-6 h-[calc(100vh-8rem)]">
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2">
                <div className="relative aspect-video bg-slate-950 rounded-2xl overflow-hidden border border-white/5 shadow-2xl group flex items-center justify-center">

                    {activeLesson?.type === "quiz" ? (
                        <div className="w-full h-full p-8 flex flex-col bg-slate-900 overflow-y-auto">
                            {!quizStarted ? (
                                <div className="m-auto text-center max-w-md">
                                    <FileText className="w-16 h-16 text-violet-500 mx-auto mb-6" />
                                    <h2 className="text-2xl font-bold text-white mb-4">{activeLesson.title}</h2>
                                    <p className="text-slate-400 mb-8">This assessment evaluates your understanding of the preceding lessons. You need 80% to pass.</p>
                                    <button
                                        onClick={() => setQuizStarted(true)}
                                        className="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-bold transition-all"
                                    >
                                        Start Assessment
                                    </button>
                                </div>
                            ) : !quizSubmitted ? (
                                <div className="max-w-2xl w-full mx-auto py-8">
                                    <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-4">Question 1 of 1</h3>
                                    <h2 className="text-xl md:text-2xl font-medium text-white mb-8">What is the most critical factor when pitching an off-plan property to a high-net-worth investor?</h2>

                                    <div className="space-y-4 mb-8">
                                        {[
                                            "The floorplan nuances and marble finishes",
                                            "The developer's legacy, community vision, and capital appreciation potential",
                                            "Offering the highest discount possible",
                                            "The exact handover date and post-handover payment plan"
                                        ].map((ans, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => setSelectedAnswer(idx)}
                                                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedAnswer === idx ? 'border-violet-500 bg-violet-500/10 text-white' : 'border-slate-800 hover:border-slate-600 text-slate-300'}`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedAnswer === idx ? 'border-violet-500' : 'border-slate-600'}`}>
                                                        {selectedAnswer === idx && <div className="w-3 h-3 bg-violet-500 rounded-full" />}
                                                    </div>
                                                    <span className="font-medium text-sm md:text-base">{ans}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setQuizSubmitted(true)}
                                        disabled={selectedAnswer === null}
                                        className="w-full py-4 bg-violet-600 disabled:opacity-50 text-white font-bold rounded-xl transition-all hover:bg-violet-700"
                                    >
                                        Submit Answer
                                    </button>
                                </div>
                            ) : (
                                <div className="m-auto text-center max-w-md">
                                    {(selectedAnswer === 1) ? (
                                        <>
                                            <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
                                            <h2 className="text-3xl font-bold text-white mb-2">Passed!</h2>
                                            <p className="text-slate-400 mb-8">Excellent work. You nailed the investor psychology.</p>
                                        </>
                                    ) : (
                                        <>
                                            <FileText className="w-20 h-20 text-rose-500 mx-auto mb-6" />
                                            <h2 className="text-3xl font-bold text-white mb-2">Needs Review</h2>
                                            <p className="text-slate-400 mb-8">Review the course material and try again. Don't focus only on features.</p>
                                        </>
                                    )}
                                    <button
                                        onClick={() => {
                                            setQuizStarted(false);
                                            setQuizSubmitted(false);
                                            setSelectedAnswer(null);
                                        }}
                                        className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold transition-all"
                                    >
                                        Return to Lesson
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${activeLesson?.videoId}?autoplay=0&rel=0`}
                            title={activeLesson?.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="bg-black"
                        ></iframe>
                    )}
                </div>

                {/* Course Info */}
                <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div>
                            <div className="text-violet-500 font-medium tracking-wide text-xs uppercase mb-2">Active Lesson</div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{activeLesson?.title}</h1>
                            <p className="text-zinc-400 text-sm">Understanding premium real estate sales and client relations.</p>
                        </div>
                        <button className="shrink-0 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg text-sm transition-colors border border-white/10">
                            Download Resources
                        </button>
                    </div>

                    <div className="flex gap-6 border-b border-white/10 mb-6">
                        {["overview", "transcript", "notes"].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-3 text-sm font-medium capitalize relative ${activeTab === tab ? "text-violet-500" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-500" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="text-zinc-400 text-sm leading-relaxed font-light min-h-[150px]">
                        {activeTab === "overview" && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                In this module session, you will explore the best practices and foundational knowledge required.
                                We dive into real-world scenarios, exclusive insights, and practical steps you can take today to elevate your pitch.
                            </motion.div>
                        )}
                        {activeTab === "transcript" && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                                <p><span className="text-white font-medium">00:00 - </span> Welcome back. Today we tackle the core of your conversion engine.</p>
                                <p><span className="text-violet-500 font-medium">04:22 - </span> The investor doesn't care about the marble finish. They care about who else lives in the building.</p>
                            </motion.div>
                        )}
                        {activeTab === "notes" && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
                                <textarea
                                    className="w-full bg-slate-950/50 border border-white/10 rounded-lg p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 text-sm resize-none min-h-[100px]"
                                    placeholder="Enter your personal notes here..."
                                />
                                <div className="flex justify-end">
                                    <button className="px-4 py-2 bg-slate-950 border border-white/10 hover:border-violet-500 text-white rounded text-xs transition-colors">Save Note</button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* Sidebar Curriculum */}
            <div className="w-full xl:w-[400px] bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-2xl flex flex-col overflow-hidden shrink-0">
                <div className="p-6 border-b border-white/5 bg-slate-950/40">
                    <h3 className="text-lg font-bold text-white mb-2">Course Curriculum</h3>
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-[25%] bg-violet-500 rounded-full" />
                        </div>
                        <span className="text-violet-500 text-xs font-bold">25%</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
                    {MODULES.map((module) => (
                        <div key={module.id} className="bg-slate-950/20 rounded-xl overflow-hidden border border-white/5">
                            <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors">
                                <div>
                                    <div className="text-white font-semibold text-sm mb-1">{module.title}</div>
                                    <div className="text-zinc-500 text-xs">{module.lessons.length} Lessons • {module.duration}</div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-zinc-600 rotate-90" />
                            </div>
                            <div className="px-2 pb-2">
                                {module.lessons.map(lesson => {
                                    const isActive = lesson.id === activeLessonId;
                                    return (
                                        <div
                                            key={lesson.id}
                                            onClick={() => {
                                                setActiveLessonId(lesson.id);
                                                setQuizStarted(false);
                                                setQuizSubmitted(false);
                                                setSelectedAnswer(null);
                                            }}
                                            className={`flex items-start gap-3 p-3 rounded-lg border border-transparent transition-all mb-1 cursor-pointer
                                                ${isActive ? "bg-slate-900/30 border-blue-500/30 ring-1 ring-violet-500/50" : "hover:bg-white/5"}`}
                                        >
                                            <div className="shrink-0 mt-0.5">
                                                {isActive ? <PlayCircle className="w-5 h-5 text-violet-500 animate-pulse" /> :
                                                    lesson.type === 'quiz' ? <FileText className="w-5 h-5 text-zinc-500" /> :
                                                        <PlayCircle className="w-5 h-5 text-zinc-500" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className={`text-sm truncate font-medium ${isActive ? "text-violet-500" : "text-zinc-300"}`}>{lesson.title}</div>
                                                <div className="text-xs text-zinc-500 flex items-center gap-2 mt-1">
                                                    {lesson.type === 'quiz' ? 'Evaluation' : 'Video Module'} • {lesson.duration}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
