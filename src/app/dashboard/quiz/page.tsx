"use client";

import { CheckSquare, ListPlus, Edit3, Settings } from "lucide-react";

export default function QuizBuilder() {
    return (
        <div className="space-y-6">
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Quiz Builder</h1>
                    <p className="text-zinc-400">Design assessments to evaluate consultant knowledge.</p>
                </div>
                <button className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all">
                    <ListPlus className="w-4 h-4" />
                    Create Quiz
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[
                    { title: "Off-Plan Market Assessment", questions: 25, time: "45 mins", difficulty: "Advanced" },
                    { title: "Client Qualification Basics", questions: 10, time: "15 mins", difficulty: "Beginner" },
                    { title: "Dubai Real Estate Laws", questions: 30, time: "60 mins", difficulty: "Expert" },
                    { title: "Negotiation Tactics Test", questions: 15, time: "30 mins", difficulty: "Intermediate" },
                ].map((quiz, idx) => (
                    <div key={idx} className="bg-slate-900 border border-white/5 p-6 rounded-2xl hover:border-violet-500/30 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center border border-violet-500/20">
                                <CheckSquare className="text-violet-500 w-6 h-6" />
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
                                    <Settings className="w-4 h-4" />
                                </button>
                                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
                                    <Edit3 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">{quiz.title}</h3>
                        <div className="flex gap-4 text-sm text-zinc-400 mt-4 pt-4 border-t border-white/5">
                            <div><span className="text-white font-medium">{quiz.questions}</span> Qs</div>
                            <div>&bull;</div>
                            <div>{quiz.time}</div>
                            <div>&bull;</div>
                            <div className="text-violet-400">{quiz.difficulty}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
