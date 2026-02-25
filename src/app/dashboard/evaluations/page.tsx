"use client";

import { ClipboardCheck, FileSearch, XCircle, CheckCircle } from "lucide-react";

export default function Evaluations() {
    return (
        <div className="space-y-6">
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Evaluations</h1>
                    <p className="text-zinc-400">Review consultant submissions and assign scores.</p>
                </div>
            </header>

            <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md">
                <div className="p-4 border-b border-white/5 bg-black/40">
                    <h2 className="text-lg font-bold text-white">Pending Reviews</h2>
                </div>
                <div className="divide-y divide-white/5">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="p-6 flex flex-col md:flex-row items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20">
                                    <ClipboardCheck className="text-indigo-400 w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-white font-medium">Final Assignment: Off-Plan Sales Pitch</h3>
                                    <p className="text-sm text-zinc-400">Submitted by <span className="text-indigo-400">Consultant {item}</span> &bull; 2 hours ago</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-black hover:bg-white/5 border border-white/10 rounded-lg text-sm text-white transition-colors flex items-center gap-2">
                                    <FileSearch className="w-4 h-4" />
                                    Review Material
                                </button>
                                <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm text-white font-medium transition-colors flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    Mark Passed
                                </button>
                                <button className="px-4 py-2 bg-rose-600 hover:bg-rose-700 rounded-lg text-sm text-white font-medium transition-colors flex items-center gap-2">
                                    <XCircle className="w-4 h-4" />
                                    Needs Work
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
