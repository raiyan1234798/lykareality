"use client";

import { Search, UserPlus, Filter, MoreHorizontal, UserCircle, X, Mail, Edit, Trash2, Shield, Loader2, BookOpen, BarChart2 } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { collection, getDocs, doc, updateDoc, deleteDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

type UserType = {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    photoURL?: string;
    enrolledCourses?: string[];
    createdAt?: any;
    approvedAt?: any;
};

export default function ManageUsers() {
    const { t } = useLanguage();
    const [inviteModal, setInviteModal] = useState(false);
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Property Consultant");

    const [users, setUsers] = useState<UserType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const [editingUser, setEditingUser] = useState<UserType | null>(null);
    const [menuOpen, setMenuOpen] = useState<string | null>(null);
    const [expandedUser, setExpandedUser] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const allUsers: UserType[] = [];
                querySnapshot.forEach((docSnap) => {
                    const data = docSnap.data();
                    allUsers.push({
                        id: docSnap.id,
                        name: data.name || data.email?.split("@")[0] || "Unknown User",
                        email: data.email || "N/A",
                        role: data.role || "User",
                        status: data.status === "approved" ? "Active" : data.status === "pending" ? "Pending" : (data.status || "Inactive"),
                        photoURL: data.photoURL,
                        enrolledCourses: data.enrolledCourses || [],
                        createdAt: data.createdAt,
                        approvedAt: data.approvedAt,
                    });
                });
                setUsers(allUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatTime = (timestamp: any) => {
        if (!timestamp) return "N/A";
        try {
            const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
            const diffMs = Date.now() - date.getTime();
            const diffHours = Math.floor(diffMs / (1000 * 3600));
            if (diffHours < 1) return "Just now";
            if (diffHours < 24) return `${diffHours}h ago`;
            const diffDays = Math.floor(diffHours / 24);
            if (diffDays < 7) return `${diffDays}d ago`;
            return date.toLocaleDateString();
        } catch {
            return "N/A";
        }
    };

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newId = `invite_${Date.now()}`;
            await setDoc(doc(db, "users", newId), {
                name: email.split("@")[0],
                email,
                role,
                status: "approved",
                createdAt: serverTimestamp(),
                approvedAt: serverTimestamp(),
                enrolledCourses: [],
            });
            setUsers([
                ...users,
                { id: newId, name: email.split("@")[0], email, role, status: "Active", enrolledCourses: [] }
            ]);
            setInviteModal(false);
            setEmail("");
        } catch (error) {
            console.error("Error inviting user:", error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteDoc(doc(db, "users", id));
            setUsers(users.filter(u => u.id !== id));
            setMenuOpen(null);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleEditSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingUser) return;
        try {
            await updateDoc(doc(db, "users", editingUser.id), {
                name: editingUser.name,
                role: editingUser.role,
                status: editingUser.status === "Active" ? "approved" : editingUser.status === "Pending" ? "pending" : "inactive",
            });
            setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
            setEditingUser(null);
        } catch (error) {
            console.error("Error saving user:", error);
        }
    };

    const activeCount = users.filter(u => u.status === "Active").length;
    const pendingCount = users.filter(u => u.status === "Pending").length;

    return (
        <div className="space-y-6">
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">{t("Manage Users")}</h1>
                    <p className="text-slate-500 dark:text-zinc-400">{t("View and manage all active Lyka Academy members.")}</p>
                </div>
                <button
                    onClick={() => setInviteModal(true)}
                    className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all justify-center whitespace-nowrap"
                >
                    <UserPlus className="w-4 h-4" />
                    {t("Direct Add / Invite")}
                </button>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 p-5 rounded-2xl flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-sm text-slate-500 dark:text-zinc-400 mb-1 font-medium">{t("Total Users")}</p>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{users.length}</h3>
                    </div>
                    <div className="w-10 h-10 bg-violet-100 dark:bg-violet-500/10 rounded-xl flex items-center justify-center">
                        <UserCircle className="text-violet-600 dark:text-violet-500 w-5 h-5" />
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 p-5 rounded-2xl flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-sm text-slate-500 dark:text-zinc-400 mb-1 font-medium">{t("Active")}</p>
                        <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{activeCount}</h3>
                    </div>
                    <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center">
                        <Shield className="text-emerald-600 dark:text-emerald-500 w-5 h-5" />
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 p-5 rounded-2xl flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-sm text-slate-500 dark:text-zinc-400 mb-1 font-medium">{t("Pending")}</p>
                        <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400">{pendingCount}</h3>
                    </div>
                    <div className="w-10 h-10 bg-amber-100 dark:bg-amber-500/10 rounded-xl flex items-center justify-center">
                        <BarChart2 className="text-amber-600 dark:text-amber-500 w-5 h-5" />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden backdrop-blur-md shadow-sm">
                <div className="p-4 border-b border-slate-200 dark:border-white/5 flex flex-col sm:flex-row gap-4 justify-between bg-slate-50 dark:bg-transparent">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500" />
                        <input
                            type="text"
                            placeholder={t("Search consultants by name or email...")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-100 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-violet-500"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto min-h-[400px]">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
                        </div>
                    ) : filteredUsers.length === 0 ? (
                        <div className="text-center py-20 text-slate-500 dark:text-zinc-500 font-medium">
                            {searchQuery ? t("No users match your search.") : t("No users found.")}
                        </div>
                    ) : (
                        <table className="w-full text-left text-sm text-slate-500 dark:text-zinc-400">
                            <thead className="bg-slate-100 dark:bg-black/40 text-xs uppercase font-medium text-slate-600 dark:text-zinc-500">
                                <tr>
                                    <th className="px-6 py-4 rounded-tl-lg">{t("Consultant")}</th>
                                    <th className="px-6 py-4">{t("Role")}</th>
                                    <th className="px-6 py-4">{t("Status")}</th>
                                    <th className="px-6 py-4">{t("Courses")}</th>
                                    <th className="px-6 py-4">{t("Joined")}</th>
                                    <th className="px-6 py-4 text-right">{t("Actions")}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors relative">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                                            <div className="flex items-center gap-3">
                                                {user.photoURL ? (
                                                    <img src={user.photoURL} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                                                ) : (
                                                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{user.name.charAt(0).toUpperCase()}</span>
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-medium text-slate-900 dark:text-white">{user.name}</div>
                                                    <div className="text-xs text-slate-500 dark:text-zinc-500">{user.email}</div>
                                                </div>
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
                                        <td className="px-6 py-4">
                                            {user.enrolledCourses && user.enrolledCourses.length > 0 ? (
                                                <div className="flex items-center gap-2">
                                                    <BookOpen className="w-3.5 h-3.5 text-violet-500" />
                                                    <span className="text-xs font-medium text-slate-700 dark:text-zinc-300">
                                                        {user.enrolledCourses.length} {t("course(s)")}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-slate-400 dark:text-zinc-600">—</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-zinc-500 text-xs">
                                            {formatTime(user.approvedAt || user.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 text-right relative">
                                            <button
                                                onClick={() => setMenuOpen(menuOpen === user.id ? null : user.id)}
                                                className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-500 dark:text-zinc-400"
                                                title="User actions"
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
                    )}
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
                                    {t("Direct Add User")}
                                </h3>
                                <button onClick={() => setInviteModal(false)} className="text-slate-400 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <form onSubmit={handleInvite}>
                                <div className="p-6 space-y-5">
                                    <p className="text-sm text-slate-500 dark:text-zinc-400 font-medium">{t("Add a user directly to the platform via their email. They won't need to request access.")}</p>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">{t("User Email Address")}</label>
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
                                        <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">{t("Assign Role")}</label>
                                        <select
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-violet-500"
                                        >
                                            <option value="Property Consultant">{t("Property Consultant")}</option>
                                            <option value="Senior Consultant">{t("Senior Consultant")}</option>
                                            <option value="Sales Manager">{t("Sales Manager")}</option>
                                            <option value="Admin">{t("Admin")}</option>
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
                                    {t("Edit User Details")}
                                </h3>
                                <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <form onSubmit={handleEditSave}>
                                <div className="p-6 space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">{t("Name")}</label>
                                        <input
                                            type="text"
                                            value={editingUser.name}
                                            onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-violet-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">{t("Update Role")}</label>
                                        <select
                                            value={editingUser.role}
                                            onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-violet-500"
                                        >
                                            <option value="Property Consultant">{t("Property Consultant")}</option>
                                            <option value="Senior Consultant">{t("Senior Consultant")}</option>
                                            <option value="Manager">{t("Manager")}</option>
                                            <option value="Trainee">{t("Trainee")}</option>
                                            <option value="Admin">{t("Admin")}</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">{t("Status")}</label>
                                        <select
                                            value={editingUser.status}
                                            onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-violet-500"
                                        >
                                            <option value="Active">{t("Active")}</option>
                                            <option value="Inactive">{t("Inactive")}</option>
                                            <option value="Pending">{t("Pending")}</option>
                                        </select>
                                    </div>

                                    {/* Show enrolled courses if any */}
                                    {editingUser.enrolledCourses && editingUser.enrolledCourses.length > 0 && (
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">{t("Enrolled Courses")}</label>
                                            <div className="space-y-1.5">
                                                {editingUser.enrolledCourses.map((courseId, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-violet-50 dark:bg-violet-500/10 rounded-lg border border-violet-200 dark:border-violet-500/20">
                                                        <BookOpen className="w-3.5 h-3.5 text-violet-500" />
                                                        <span className="text-sm text-violet-700 dark:text-violet-400 font-medium">{courseId}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
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
