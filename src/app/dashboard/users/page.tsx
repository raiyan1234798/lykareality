"use client";

import { Search, UserPlus, Filter, MoreHorizontal, UserCircle } from "lucide-react";

export default function ManageUsers() {
    return (
        <div className="space-y-6">
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Manage Users</h1>
                    <p className="text-zinc-400">View and manage all active Lykaa Academy members.</p>
                </div>
                <button className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all">
                    <UserPlus className="w-4 h-4" />
                    Invite User
                </button>
            </header>

            <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md">
                <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search consultants by name or email..."
                            className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-sm text-zinc-300 hover:bg-white/5 transition-colors">
                        <Filter className="w-4 h-4" />
                        Filter Roles
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-zinc-400">
                        <thead className="bg-black/40 text-xs uppercase font-medium text-zinc-500">
                            <tr>
                                <th className="px-6 py-4 rounded-tl-lg">Consultant</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Last Active</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {[1, 2, 3, 4, 5, 6].map((user) => (
                                <tr key={user} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                                            <UserCircle className="w-5 h-5 text-slate-400" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-white">Consultant Name {user}</div>
                                            <div className="text-xs text-zinc-500">consultant{user}@lykaarealty.com</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">Property Consultant</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            Active
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-zinc-500">2 hours ago</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-zinc-400">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
