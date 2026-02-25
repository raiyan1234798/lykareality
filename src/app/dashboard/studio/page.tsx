"use client";

import { Video, Mic, LayoutGrid, MonitorPlay, Save } from "lucide-react";

export default function CourseStudio() {
    return (
        <div className="space-y-6">
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Course Studio</h1>
                    <p className="text-zinc-400">Record, edit, and assemble high-quality training materials.</p>
                </div>
                <button className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all">
                    <Save className="w-4 h-4" />
                    Save Draft
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <MonitorPlay className="w-5 h-5 text-violet-500" />
                            <h2 className="text-lg font-bold text-white">Video Editor</h2>
                        </div>
                        <div className="w-full aspect-video bg-black rounded-lg border border-white/10 flex items-center justify-center flex-col gap-4">
                            <Video className="w-12 h-12 text-zinc-600" />
                            <p className="text-zinc-500 text-sm">Drag and drop video files here or click to browse</p>
                            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors text-sm font-medium">Upload Media</button>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Mic className="w-5 h-5 text-violet-500" />
                            <h2 className="text-lg font-bold text-white">Voiceover & Audio</h2>
                        </div>
                        <div className="h-32 bg-black rounded-lg border border-white/10 flex items-center justify-center">
                            <p className="text-zinc-500 text-sm">Audio timeline will appear here</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <LayoutGrid className="w-5 h-5 text-violet-500" />
                            <h2 className="text-lg font-bold text-white">Module Structure</h2>
                        </div>
                        <div className="space-y-3">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="p-3 bg-black/40 border border-white/5 rounded-lg flex items-center justify-between cursor-move hover:border-violet-500/30 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="text-xs text-zinc-500 font-medium">0{item}</div>
                                        <div className="text-sm text-white">Introduction to Closing</div>
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-slate-700" />
                                </div>
                            ))}
                            <button className="w-full py-3 border border-dashed border-white/10 rounded-lg text-sm text-zinc-400 hover:text-white hover:border-violet-500/50 hover:bg-violet-500/5 transition-all">
                                + Add Lesson
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
