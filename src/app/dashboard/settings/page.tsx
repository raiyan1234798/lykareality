"use client";

import { Save, Shield, Palette, Globe, Bell, UploadCloud, Trash2, Check, AlertTriangle, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { useUserRole } from "@/hooks/useUserRole";

export default function Settings() {
    const { t } = useLanguage();
    const { isAdmin, loading } = useUserRole();
    const [activeTab, setActiveTab] = useState("general");
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        }, 1000);
    };

    const tabs = [
        { id: "general", label: t("General"), icon: Globe },
        { id: "appearance", label: t("Appearance"), icon: Palette },
        { id: "security", label: t("Security & Access"), icon: Shield },
        { id: "notifications", label: t("Notifications"), icon: Bell },
    ];

    if (loading) {
        return (
            <div className="w-full h-full min-h-[50vh] flex flex-col items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-violet-500 mb-4" />
                <p className="text-sm text-slate-500 font-medium">Verifying access...</p>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="w-full h-full min-h-[50vh] flex flex-col items-center justify-center">
                <Shield className="w-12 h-12 text-rose-500 mb-4 opacity-50" />
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{t("Access Restricted")}</h2>
                <p className="text-sm text-slate-500 font-medium text-center">{t("You do not have permission to view or modify workspace settings.")}<br />{t("This area is restricted to administrators.")}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">{t("Platform Settings")}</h1>
                    <p className="text-slate-500 dark:text-zinc-400">{t("Configure your Lykaa Academy enterprise workspace.")}</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-violet-600 hover:bg-violet-700 disabled:opacity-75 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all min-w-[150px] justify-center"
                >
                    {isSaving ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                    ) : saved ? (
                        <><Check className="w-4 h-4" /> {t("Saved!")}</>
                    ) : (
                        <><Save className="w-4 h-4" /> {t("Save Changes")}</>
                    )}
                </button>
            </header>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Tabs Sidebar */}
                <div className="lg:w-64 shrink-0 space-y-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${activeTab === tab.id ? "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400" : "text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"}`}
                        >
                            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-violet-600 dark:text-violet-400' : ''}`} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="flex-1 space-y-6">
                    <AnimatePresence mode="wait">
                        {activeTab === "general" && (
                            <motion.div key="general" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">{t("Workspace details")}</h2>
                                    <div className="space-y-5 flex flex-col max-w-xl">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">{t("Workspace Name")}</label>
                                            <input type="text" defaultValue="Lykaa Realty Academy" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-violet-500/50" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">{t("Contact Email")}</label>
                                            <input type="email" defaultValue="admin@lykarealty.com" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-violet-500/50" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">{t("Company Logo")}</label>
                                            <div className="flex items-center gap-4 mt-2">
                                                <div className="w-16 h-16 bg-gradient-to-br from-violet-400 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                                                    <span className="text-slate-50 font-serif font-bold text-2xl">L</span>
                                                </div>
                                                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={() => handleSave()} />
                                                <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                                                    <UploadCloud className="w-4 h-4" /> {t("Change Logo")}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">{t("Danger Zone")}</h2>
                                    <div className="p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div>
                                            <h4 className="text-rose-900 dark:text-white font-medium mb-1">{t("Delete Workspace")}</h4>
                                            <p className="text-sm text-rose-600/80 dark:text-zinc-400">{t("Permanently remove this workspace and all data. This action cannot be undone.")}</p>
                                        </div>
                                        <button
                                            onClick={() => setDeleteConfirm(true)}
                                            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium text-sm transition-colors whitespace-nowrap"
                                        >
                                            {t("Delete Permanently")}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "appearance" && (
                            <motion.div key="appearance" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">{t("Theme Interface")}</h2>
                                    <p className="text-sm text-slate-500 dark:text-zinc-400 mb-6 max-w-lg">{t("Customize the default appearance of the LMS across all your users. Note: Users can still manually override their theme locally.")}</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div onClick={handleSave} className="border-2 border-violet-500 bg-white dark:bg-slate-950 p-4 rounded-xl cursor-pointer">
                                            <div className="w-full h-24 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-white/10 mb-3 flex items-center justify-center relative overflow-hidden">
                                                <div className="w-3/4 h-2 bg-slate-200 dark:bg-slate-700 rounded-full mb-2" />
                                                <div className="w-1/2 h-2 bg-slate-200 dark:bg-slate-700 rounded-full" />
                                                <div className="absolute top-2 right-2 flex gap-1"><div className="w-2 h-2 bg-violet-500 rounded-full" /><div className="w-2 h-2 bg-emerald-500 rounded-full" /></div>
                                            </div>
                                            <h4 className="font-medium text-slate-900 dark:text-white text-center">{t("System Default")}</h4>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "security" && (
                            <motion.div key="security" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{t("Access Policies")}</h2>
                                    <p className="text-sm text-slate-500 dark:text-zinc-400 mb-6">{t("Manage how consultants access the workspace.")}</p>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-black/30">
                                            <div>
                                                <h4 className="font-medium text-slate-900 dark:text-white block">{t("Require Admin Approval")}</h4>
                                                <span className="text-xs text-slate-500 dark:text-zinc-500">{t("All new signups via email must be approved before viewing courses.")}</span>
                                            </div>
                                            <div onClick={handleSave} className="w-12 h-6 bg-violet-600 rounded-full relative cursor-pointer shadow-inner">
                                                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-black/30">
                                            <div>
                                                <h4 className="font-medium text-slate-900 dark:text-white block">{t("Two-Factor Authentication")}</h4>
                                                <span className="text-xs text-slate-500 dark:text-zinc-500">{t("Require MFA for Admins and Managers.")}</span>
                                            </div>
                                            <div onClick={handleSave} className="w-12 h-6 bg-slate-300 dark:bg-slate-700 rounded-full relative cursor-pointer shadow-inner">
                                                <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 shadow" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "notifications" && (
                            <motion.div key="notifications" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{t("Email Notification Preferences")}</h2>
                                    <p className="text-sm text-slate-500 dark:text-zinc-400 mb-6">{t("Choose what triggers an email to Workspace Admins.")}</p>

                                    <div className="space-y-3">
                                        {['New Access Requests', 'Course Completed', 'Support Ticket Opened', 'Weekly Analytics Report'].map((item, idx) => (
                                            <label key={idx} className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg cursor-pointer transition-colors border-b border-transparent hover:border-slate-100 dark:hover:border-white/5">
                                                <input type="checkbox" defaultChecked={idx !== 1} className="w-4 h-4 accent-violet-600 cursor-pointer" onChange={handleSave} />
                                                <span className="text-sm font-medium text-slate-700 dark:text-zinc-200">{t(item)}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Confirm Delete Modal */}
            <AnimatePresence>
                {deleteConfirm && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10"
                        >
                            <div className="p-6 text-center space-y-4">
                                <div className="mx-auto w-16 h-16 bg-rose-100 dark:bg-rose-500/20 text-rose-500 rounded-full flex items-center justify-center mb-4">
                                    <AlertTriangle className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t("Are you sure?")}</h3>
                                <p className="text-slate-500 dark:text-zinc-400 text-sm">
                                    {t("This action cannot be undone. All courses, users, analytics, and data will be permanently deleted across Lykaa Academy.")}
                                </p>
                            </div>
                            <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/50 flex justify-end gap-3">
                                <button onClick={() => setDeleteConfirm(false)} className="px-5 py-2 text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-colors font-medium">{t("Cancel")}</button>
                                <button onClick={() => setDeleteConfirm(false)} className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-medium transition-colors">{t("Yes, Delete Everything")}</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
