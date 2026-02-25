"use client";

import { Users, Clock, CheckCircle } from "lucide-react";

export default function AccessRequests() {
    return (
        <div className="space-y-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Access Requests</h1>
                <p className="text-zinc-400">Manage incoming requests from potential property consultants.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl flex items-center justify-between">
                    <div>
                        <p className="text-sm text-zinc-400 mb-1">Total Requests</p>
                        <h3 className="text-3xl font-bold text-white">124</h3>
                    </div>
                    <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center border border-violet-500/20">
                        <Users className="text-violet-500 w-6 h-6" />
                    </div>
                </div>
                <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl flex items-center justify-between">
                    <div>
                        <p className="text-sm text-zinc-400 mb-1">Pending Approval</p>
                        <h3 className="text-3xl font-bold text-white">12</h3>
                    </div>
                    <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20">
                        <Clock className="text-amber-500 w-6 h-6" />
                    </div>
                </div>
                <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl flex items-center justify-between">
                    <div>
                        <p className="text-sm text-zinc-400 mb-1">Approved Today</p>
                        <h3 className="text-3xl font-bold text-white">5</h3>
                    </div>
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
                        <CheckCircle className="text-emerald-500 w-6 h-6" />
                    </div>
                </div>
            </div>

            <div className="bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
                <div className="p-6 border-b border-white/5">
                    <h2 className="text-lg font-bold text-white">Recent Requests</h2>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-xl hover:border-violet-500/30 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold">
                                        R{item}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium">Applicant {item}</h4>
                                        <p className="text-xs text-zinc-400">Requested 2 hours ago</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 bg-black hover:bg-white/5 border border-white/10 rounded-lg text-sm text-white transition-colors">Decline</button>
                                    <button className="px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-sm text-white font-medium transition-colors">Approve</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
