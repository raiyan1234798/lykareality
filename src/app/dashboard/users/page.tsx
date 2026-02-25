"use client";

import { Search, UserPlus, Filter, MoreHorizontal, UserCircle, X, Mail, Edit, Trash2, Shield } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

export default function ManageUsers() {
    const { t } = useLanguage();
    const [inviteModal, setInviteModal] = useState(false);
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Property Consultant");

    const [users, setUsers] = useState([
        { id: 1, name: "Consultant Name 1", email: "consultant1@lykaarealty.com", role: "Property Consultant", status: "Active" },
        { id: 2, name: "Consultant Name 2", email: "consultant2@lykaarealty.com", role: "Manager", status: "Active" },
        { id: 3, name: "Consultant Name 3", email: "consultant3@lykaarealty.com", role: "Trainee", status: "Inactive" },
    ]);

    const [editingUser, setEditingUser] = useState<any>(null);
    const [menuOpen, setMenuOpen] = useState<number | null>(null);

    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault();
        setUsers([
            ...users,
            { id: Date.now(), name: "New User", email, role, status: "Pending" }
        ]);
        setInviteModal(false);
        setEmail("");
    };

    const handleDelete = (id: number) => {
        setUsers(users.filter(u => u.id !== id));
        setMenuOpen(null);
    };

    const handleEditSave = (e: React.FormEvent) => {
        e.preventDefault();
        setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
        setEditingUser(null);
    };

    return (
        <div className="space-y-6">
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">{t("Manage Users")}</h1>
                    <p className="text-slate-500 dark:text-zinc-400">{t("View and manage all active Lykaa Academy members.")}</p>
                </div>
                <button
                    onClick={() => setInviteModal(true)}
                    className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all justify-center whitespace-nowrap"
                >
                    <UserPlus className="w-4 h-4" />
                    {t("Direct Add / Invite")}
                </button>
            </header>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden backdrop-blur-md shadow-sm">
                <div className="p-4 border-b border-slate-200 dark:border-white/5 flex flex-col sm:flex-row gap-4 justify-between bg-slate-50 dark:bg-transparent">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500" />
                        <input
                            type="text"
                            placeholder={t("Search consultants by name or email...")}
                            className="w-full bg-slate-100 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-violet-500"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full text-left text-sm text-slate-500 dark:text-zinc-400">
                        <thead className="bg-slate-100 dark:bg-black/40 text-xs uppercase font-medium text-slate-600 dark:text-zinc-500">
                            <tr>
                                <th className="px-6 py-4 rounded-tl-lg">{t("Consultant")}</th>
                                <th className="px-6 py-4">{t("Role")}</th>
                                <th className="px-6 py-4">{t("Status")}</th>
                                <th className="px-6 py-4">{t("Last Active")}</th>
                                <th className="px-6 py-4 text-right">{t("Actions")}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors relative">
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                            <UserCircle className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900 dark:text-white">{user.name}</div>
                                            <div className="text-xs text-slate-500 dark:text-zinc-500">{user.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-700 dark:text-zinc-300">
                                        <span className="flex items-center gap-2">
                                            <Shield className="w-3 h-3 text-violet-500 opacity-70" /> {t(user.role)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.status === 'Active' ? (
                                            <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md text-xs font-medium bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 border dark:border-emerald-500/20">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {t("Active")}
                                            </span>
                                        ) : user.status === 'Pending' ? (
                                            <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md text-xs font-medium bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 border dark:border-amber-500/20">
                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> {t("Pending")}
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md text-xs font-medium bg-slate-200 text-slate-700 border-slate-300 dark:bg-slate-500/10 dark:text-slate-400 border dark:border-slate-500/20">
                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" /> {t("Inactive")}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 dark:text-zinc-500">2 hours ago</td>
                                    <td className="px-6 py-4 text-right relative">
                                        <button
                                            onClick={() => setMenuOpen(menuOpen === user.id ? null : user.id)}
                                            className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-500 dark:text-zinc-400"
                                        >
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>

                                        {/* Dropdown Actions */}
                                        <AnimatePresence>
                                            {menuOpen === user.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                                    className="absolute right-6 top-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 shadow-xl rounded-xl w-40 z-50 overflow-hidden"
                                                >
                                                    <button
                                                        onClick={() => { setEditingUser(user); setMenuOpen(null); }}
                                                        className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2"
                                                    >
                                                        <Edit className="w-4 h-4" /> {t("Edit User")}
                                                    </button>
                                                    <div className="h-px bg-slate-200 dark:bg-white/10 w-full" />
                                                    <button
                                                        onClick={() => handleDelete(user.id)}
                                                        className="w-full text-left px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 flex items-center gap-2"
                                                    >
                                                        <Trash2 className="w-4 h-4" /> {t("Delete Access")}
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Direct Add Modal */}
            <AnimatePresence>
                {inviteModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10"
                        >
                            <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-slate-950/50">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <UserPlus className="text-violet-500 w-5 h-5" />
                                    Direct Add User
                                </h3>
                                <button onClick={() => setInviteModal(false)} className="text-slate-400 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <form onSubmit={handleInvite}>
                                <div className="p-6 space-y-5">
                                    <p className="text-sm text-slate-500 dark:text-zinc-400 font-medium">Add a user directly to the platform via their email. They won't need to request access.</p>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">User Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="e.g. john@gmail.com"
                                                className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-lg pl-10 pr-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-violet-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">Assign Role</label>
                                        <select
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-violet-500"
                                        >
                                            <option value="Property Consultant">Property Consultant</option>
                                            <option value="Senior Consultant">Senior Consultant</option>
                                            <option value="Sales Manager">Sales Manager</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="p-6 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/50 flex justify-end gap-3">
                                    <button type="button" onClick={() => setInviteModal(false)} className="px-5 py-2 text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-colors font-medium">{t("Cancel")}</button>
                                    <button type="submit" disabled={!email} className="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50">{t("Add & Invite")}</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Edit User Modal */}
            <AnimatePresence>
                {editingUser && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10"
                        >
                            <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-slate-950/50">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <Edit className="text-violet-500 w-5 h-5" />
                                    Edit User Details
                                </h3>
                                <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <form onSubmit={handleEditSave}>
                                <div className="p-6 space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">Name</label>
                                        <input
                                            type="text"
                                            value={editingUser.name}
                                            onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-violet-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">Update Role</label>
                                        <select
                                            value={editingUser.role}
                                            onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-violet-500"
                                        >
                                            <option value="Property Consultant">Property Consultant</option>
                                            <option value="Senior Consultant">Senior Consultant</option>
                                            <option value="Manager">Manager</option>
                                            <option value="Trainee">Trainee</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">Status</label>
                                        <select
                                            value={editingUser.status}
                                            onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-violet-500"
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                            <option value="Pending">Pending</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="p-6 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/50 flex justify-end gap-3">
                                    <button type="button" onClick={() => setEditingUser(null)} className="px-5 py-2 text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-colors font-medium">{t("Cancel")}</button>
                                    <button type="submit" className="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium transition-colors">{t("Save Changes")}</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
