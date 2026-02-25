"use client";

import { motion } from "framer-motion";
import { PlayCircle, CheckCircle2, Lock, FileText, ChevronRight, MessageSquare, Play, Pause, Maximize, Settings2 } from "lucide-react";
import { useState } from "react";

type Lesson = { id: number, title: string, duration: string, active?: boolean, completed?: boolean, locked?: boolean, type?: string };
type Module = { id: number, title: string, duration: string, lessons: Lesson[] };

const MODULES: Module[] = [
    {
        id: 1,
        title: "The Lykaa Foundation",
        duration: "45m",
        lessons: [
            { id: 101, title: "Welcome to Elite Real Estate", duration: "12:30", completed: true },
            { id: 102, title: "Brand Positioning & The Investor Mindset", duration: "18:45", active: true },
            { id: 103, title: "Navigating the Dubai Masterplan", duration: "14:15", locked: true },
        ]
    },
    {
        id: 2,
        title: "Off-Plan Mastery",
        duration: "2h 15m",
        lessons: [
            { id: 201, title: "Analyzing Developer Portfolios", duration: "24:00", locked: true },
            { id: 202, title: "Selling the Vision", duration: "32:10", locked: true },
            { id: 203, title: "Quiz: Phase One Checkpoint", duration: "15:00", type: "quiz", locked: true },
        ]
    }
];

export default function CourseLearningEngine() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="flex flex-col xl:flex-row gap-6 h-[calc(100vh-8rem)]">
            {/* Main Video Area */}
            <div className="flex-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2">
                <div className="relative aspect-video bg-slate-950 rounded-2xl overflow-hidden border border-white/5 shadow-2xl group">
                    <img
                        src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2670&auto=format&fit=crop"
                        alt="Video Thumbnail"
                        className="w-full h-full object-cover opacity-60 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-slate-950/20 to-transparent pointer-events-none" />

                    {/* Custom Video Player UI Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-20 h-20 bg-violet-500/90 text-slate-950 rounded-full flex items-center justify-center hover:scale-110 hover:bg-violet-400 transition-all shadow-[0_0_40px_rgba(212,175,55,0.4)] pointer-events-auto backdrop-blur-md"
                        >
                            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                        </button>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-4">
                        <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer relative group/progress">
                            <div className="absolute top-0 left-0 h-full w-[35%] bg-violet-500" />
                            <div className="absolute top-1/2 left-[35%] -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)] opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                        </div>

                        <div className="flex justify-between items-center text-white">
                            <div className="flex items-center gap-4 text-sm">
                                <button className="hover:text-violet-500 transition-colors pointer-events-auto" onClick={() => setIsPlaying(!isPlaying)}>
                                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                                </button>
                                <div className="font-mono text-xs text-zinc-300 pointer-events-none">04:22 / 18:45</div>
                            </div>
                            <div className="flex items-center gap-4 text-zinc-400 pointer-events-auto">
                                <button className="text-xs font-semibold px-2 border border-white/20 rounded hover:border-violet-500 hover:text-violet-500 transition-colors">1x</button>
                                <button className="hover:text-white transition-colors"><Settings2 className="w-5 h-5" /></button>
                                <button className="hover:text-white transition-colors"><Maximize className="w-5 h-5" /></button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course Info */}
                <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div>
                            <div className="text-violet-500 font-medium tracking-wide text-xs uppercase mb-2">Module 1 • Lesson 2</div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Brand Positioning & The Investor Mindset</h1>
                            <p className="text-zinc-400 text-sm">Understanding what high-net-worth individuals look for beyond the developer brochure.</p>
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
                                In this session, you will learn how to transition from selling features to selling a legacy.
                                We explore the psychological triggers of luxury buying, emphasizing exclusivity, capital appreciation, and lifestyle architecture.
                                You will also review case studies of top performing agents who closed AED 50M+ properties by altering their positioning strategy.
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
                                    placeholder="Private notes tied to this timestamp (04:22)..."
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
                                {module.lessons.map(lesson => (
                                    <div
                                        key={lesson.id}
                                        className={`flex items-start gap-3 p-3 rounded-lg border border-transparent transition-all mb-1 ${lesson.active ? "bg-slate-900/30 border-blue-500/30" :
                                            lesson.completed ? "hover:bg-white/5 cursor-pointer" :
                                                "opacity-50 cursor-not-allowed bg-slate-950/50"
                                            }`}
                                    >
                                        <div className="shrink-0 mt-0.5">
                                            {lesson.active ? <PlayCircle className="w-5 h-5 text-violet-500 animate-pulse" /> :
                                                lesson.completed ? <CheckCircle2 className="w-5 h-5 text-green-500" /> :
                                                    lesson.type === 'quiz' ? <FileText className="w-5 h-5 text-zinc-500" /> :
                                                        <Lock className="w-5 h-5 text-zinc-500" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className={`text-sm truncate font-medium ${lesson.active ? "text-violet-500" : "text-zinc-300"}`}>{lesson.title}</div>
                                            <div className="text-xs text-zinc-500 flex items-center gap-2 mt-1">
                                                {lesson.type === 'quiz' ? 'Evaluation' : 'Video Module'} • {lesson.duration}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
