"use client";

import { Save, Shield, Palette, Globe, Bell } from "lucide-react";

export default function Settings() {
    return (
        <div className="space-y-6">
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Platform Settings</h1>
                    <p className="text-zinc-400">Configure your Lykaa Academy enterprise workspace.</p>
                </div>
                <button className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all">
                    <Save className="w-4 h-4" />
                    Save Changes
                </button>
            </header>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-64 shrink-0 space-y-1">
                    {[
                        { id: "general", label: "General", icon: Globe, active: true },
                        { id: "appearance", label: "Appearance", icon: Palette, active: false },
                        { id: "security", label: "Security & Access", icon: Shield, active: false },
                        { id: "notifications", label: "Notifications", icon: Bell, active: false },
                    ].map((tab) => (
                        <button key={tab.id} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-colors ${tab.active ? "bg-violet-500/10 text-violet-400" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}>
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="flex-1 space-y-6">
                    <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
                        <h2 className="text-lg font-bold text-white mb-6">Workspace details</h2>

                        <div className="space-y-5 flex flex-col max-w-xl">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Workspace Name</label>
                                <input type="text" defaultValue="Lykaa Realty Academy" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Contact Email</label>
                                <input type="email" defaultValue="admin@lykaarealty.com" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Company Logo</label>
                                <div className="flex items-center gap-4 mt-2">
                                    <div className="w-16 h-16 bg-gradient-to-br from-violet-400 to-violet-600 rounded-xl flex items-center justify-center">
                                        <span className="text-slate-950 font-serif font-bold text-2xl">L</span>
                                    </div>
                                    <button className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors">Change Logo</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
                        <h2 className="text-lg font-bold text-white mb-6">Danger Zone</h2>
                        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center justify-between">
                            <div>
                                <h4 className="text-white font-medium mb-1">Delete Workspace</h4>
                                <p className="text-sm text-zinc-400">Permanently remove this workspace and all data.</p>
                            </div>
                            <button className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium text-sm transition-colors">
                                Delete Permanently
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
