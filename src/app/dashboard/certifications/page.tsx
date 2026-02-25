"use client";

import { Award, Share2, Download } from "lucide-react";

export default function Certifications() {
    return (
        <div className="space-y-6">
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Certifications</h1>
                    <p className="text-zinc-400">View and issue enterprise training credentials.</p>
                </div>
                <button className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all">
                    Issue Custom Certificate
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((cert, idx) => (
                    <div key={idx} className="bg-slate-900 border border-white/5 rounded-2xl p-6 text-center hover:border-violet-500/30 transition-all group">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-violet-400 to-violet-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)] mb-4">
                            <Award className="text-white w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-violet-400 transition-colors">Lykaa Elite Consultant</h3>
                        <p className="text-zinc-400 text-sm mb-6">Awarded for completing the advanced sales training pipeline.</p>

                        <div className="p-4 bg-black/40 rounded-xl mb-6">
                            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Issue Date</p>
                            <p className="text-white font-medium">October 24, 2026</p>
                        </div>

                        <div className="flex gap-2">
                            <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-colors flex items-center justify-center gap-2">
                                <Download className="w-4 h-4" />
                                Export
                            </button>
                            <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-colors flex items-center justify-center gap-2">
                                <Share2 className="w-4 h-4" />
                                Share Link
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
