"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
    BarChart3, Users, FileText, Video, ClipboardList, ShieldAlert,
    Settings, Menu, X, ChevronLeft, UserCircle2, BookOpen, Moon, Sun, Globe, Bell
} from "lucide-react";
import Chatbot from "@/components/ui/Chatbot";
import { useTheme } from "next-themes";

const NAV_ITEMS = [
    { href: "/dashboard", label: "Analytics Dashboard", icon: BarChart3 },
    { href: "/dashboard/requests", label: "Access Requests", icon: Users },
    { href: "/dashboard/users", label: "Manage Users", icon: UserCircle2 },
    { href: "/dashboard/courses", label: "Manage Courses", icon: BookOpen },
    { href: "/dashboard/studio", label: "Course Studio", icon: Video },
    { href: "/dashboard/quiz", label: "Quiz Builder", icon: FileText },
    { href: "/dashboard/evaluations", label: "Evaluations", icon: ClipboardList },
    { href: "/dashboard/support", label: "Support Center", icon: ShieldAlert },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const TRANSLATIONS: Record<string, Record<string, string>> = {
    EN: {
        "Analytics Dashboard": "Analytics Dashboard",
        "Access Requests": "Access Requests",
        "Manage Users": "Manage Users",
        "Manage Courses": "Manage Courses",
        "Course Studio": "Course Studio",
        "Quiz Builder": "Quiz Builder",
        "Evaluations": "Evaluations",
        "Support Center": "Support Center",
        "Settings": "Settings",
        "Toggle Theme": "Toggle Theme"
    },
    AR: {
        "Analytics Dashboard": "لوحة التحليلات",
        "Access Requests": "طلبات الوصول",
        "Manage Users": "إدارة المستخدمين",
        "Manage Courses": "إدارة الدورات",
        "Course Studio": "استوديو الدورة",
        "Quiz Builder": "منشئ الاختبارات",
        "Evaluations": "التقييمات",
        "Support Center": "مركز الدعم",
        "Settings": "الإعدادات",
        "Toggle Theme": "تبديل المظهر"
    },
    HI: {
        "Analytics Dashboard": "एनालिटिक्स डैशबोर्ड",
        "Access Requests": "पहुंच अनुरोध",
        "Manage Users": "उपयोगकर्ता प्रबंधन",
        "Manage Courses": "पाठ्यक्रम प्रबंधित करें",
        "Course Studio": "कोर्स स्टूडियो",
        "Quiz Builder": "क्विज़ बिल्डर",
        "Evaluations": "मूल्यांकन",
        "Support Center": "सहायता केंद्र",
        "Settings": "सेटिंग्स",
        "Toggle Theme": "थीम बदलें"
    }
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [language, setLanguage] = useState("EN");
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, text: "New completely access request from Sarah", time: "2m ago", unread: true },
        { id: 2, text: "User Ali opened a support ticket", time: "1h ago", unread: true },
        { id: 3, text: "Course Off-Plan updated successfully", time: "2h ago", unread: false },
    ]);
    const unreadCount = notifications.filter(n => n.unread).length;

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 flex overflow-hidden">
            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/60 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: collapsed ? 80 : 280, x: mobileOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 768 ? -280 : 0) }}
                className={`fixed md:relative top-0 left-0 z-50 h-screen bg-slate-50/80 dark:bg-slate-950/40 backdrop-blur-2xl border-r border-slate-200 dark:border-white/10 flex flex-col transition-all duration-300 ease-in-out`}
                style={{ width: collapsed ? 80 : 280 }}
            >
                {/* Logo Area */}
                <div className="h-20 flex flex-col items-center justify-center border-b border-slate-200 dark:border-white/5 relative shrink-0">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-violet-400 to-violet-600 rounded flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                            <span className="text-white dark:text-slate-950 font-serif font-bold text-xl">L</span>
                        </div>
                        {!collapsed && (
                            <span className="text-lg font-semibold tracking-wide text-slate-900 dark:text-white whitespace-nowrap overflow-hidden hidden md:block">
                                LYKAA <span className="text-violet-600 dark:text-violet-500 font-light hidden xl:inline">ACADEMY</span>
                            </span>
                        )}
                    </Link>
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="absolute -right-3 top-6 bg-slate-950 border border-white/20 rounded-full p-1 text-zinc-400 hover:text-violet-500 hidden md:block z-50 transition-colors"
                    >
                        <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} />
                    </button>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar flex flex-col gap-2">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        const translatedLabel = TRANSLATIONS[language]?.[item.label] || item.label;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 group relative ${isActive
                                    ? "bg-violet-500/10 text-violet-600 dark:text-violet-500 shadow-[inset_4px_0_0_rgba(139,92,246,1)] dark:shadow-[inset_4px_0_0_var(--tw-shadow-color)] shadow-violet-500"
                                    : "text-slate-600 dark:text-zinc-400 hover:bg-slate-200/50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                                    }`}
                            >
                                <div className={`shrink-0 ${isActive ? "text-violet-600 dark:text-violet-500 transition-colors" : "group-hover:text-violet-500 dark:group-hover:text-violet-400"}`}>
                                    <Icon className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] transition-all duration-300" />
                                </div>
                                {!collapsed && (
                                    <span className={`text-sm font-medium whitespace-nowrap hidden md:block ${isActive ? "text-slate-900 dark:text-white" : ""}`}>
                                        {translatedLabel}
                                    </span>
                                )}
                                {isActive && (
                                    <motion.div layoutId="nav-indicator" className="absolute left-0 w-1 h-3/4 bg-violet-500 rounded-r-full shadow-[0_0_10px_rgba(212,175,55,1)]" />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* User Info / Profile & Theme Toggle */}
                <div className="p-4 border-t border-slate-200 dark:border-white/5 shrink-0 bg-slate-100/50 dark:bg-slate-950/20 flex flex-col gap-3">
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="flex items-center gap-3 w-full rounded-lg cursor-pointer hover:bg-slate-200 dark:hover:bg-white/5 p-2 transition-colors text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
                        title="Toggle Light/Dark Theme"
                    >
                        {theme === "dark" ? <Sun className="w-5 h-5 shrink-0" /> : <Moon className="w-5 h-5 shrink-0" />}
                        {!collapsed && <span className="text-sm font-medium">{TRANSLATIONS[language]?.["Toggle Theme"] || "Toggle Theme"}</span>}
                    </button>
                    <div className="flex items-center gap-3 w-full rounded-lg cursor-pointer hover:bg-slate-200 dark:hover:bg-white/5 p-2 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-violet-500/30 flex items-center justify-center shrink-0">
                            <span className="text-slate-700 dark:text-violet-500 text-sm font-bold">AJ</span>
                        </div>
                        {!collapsed && (
                            <div className="hidden md:block w-[140px] overflow-hidden">
                                <div className="text-slate-900 dark:text-white text-sm font-medium truncate">Admin Jane</div>
                                <div className="text-slate-500 dark:text-zinc-500 text-xs truncate">Super Admin</div>
                            </div>
                        )}
                    </div>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-[#0A0A0B] relative transition-colors">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-200 via-slate-50 to-slate-50 dark:from-slate-950/20 dark:via-slate-950 dark:to-slate-950 z-0 pointer-events-none transition-colors" />

                {/* Header (Desktop + Mobile overlay integration if needed) - Here we add global components */}
                <header className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-white/5 relative z-40 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md">
                    <div className="flex items-center gap-2 md:hidden">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded bg-violet-600 dark:bg-violet-500 flex items-center justify-center">
                                <span className="text-white dark:text-slate-950 font-bold font-serif text-sm">L</span>
                            </div>
                        </Link>
                        <button onClick={() => setMobileOpen(true)} className="text-slate-900 dark:text-white" title="Menu">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="hidden md:block" /> {/* spacer for desktop */}

                    {/* Header Right Actions */}
                    <div className="flex items-center gap-4 relative">
                        {/* Language Dropdown (Simplified) */}
                        <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-slate-500 dark:text-zinc-400" />
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="bg-transparent text-sm font-medium text-slate-700 dark:text-zinc-300 outline-none cursor-pointer"
                                title="Select Language"
                            >
                                <option value="EN">English</option>
                                <option value="AR">Arabic</option>
                                <option value="HI">Hindi</option>
                            </select>
                        </div>

                        {/* Notifications */}
                        <div className="relative">
                            <button
                                onClick={() => setNotificationsOpen(!notificationsOpen)}
                                className="relative p-2 text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                                title="Notifications"
                            >
                                <Bell className="w-5 h-5" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-950" />
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            {notificationsOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                                    <div className="p-3 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-black/40 flex items-center justify-between">
                                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">Notifications</h4>
                                        <button className="text-xs text-violet-600 dark:text-violet-400 font-medium" onClick={() => setNotifications(notifications.map(n => ({ ...n, unread: false })))}>Mark all read</button>
                                    </div>
                                    <div className="max-h-[300px] overflow-y-auto">
                                        {notifications.length === 0 ? (
                                            <div className="p-4 text-center text-sm text-slate-500">No notifications</div>
                                        ) : (
                                            notifications.map(n => (
                                                <div key={n.id} className={`p-3 border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer ${n.unread ? 'bg-violet-50/50 dark:bg-violet-900/10' : ''}`}>
                                                    <p className={`text-sm ${n.unread ? 'font-medium text-slate-900 dark:text-white' : 'text-slate-600 dark:text-zinc-400'}`}>{n.text}</p>
                                                    <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">{n.time}</p>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="flex-1 overflow-y-auto w-full relative z-10 custom-scrollbar p-4 md:p-8 lg:p-10">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {children}
                    </motion.div>
                </div>
                <Chatbot />
            </main>
        </div>
    );
}
