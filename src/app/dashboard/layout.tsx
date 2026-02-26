"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
    BarChart3, Users, FileText, Video, ClipboardList, ShieldAlert,
    Settings, Menu, X, ChevronLeft, UserCircle2, BookOpen, Moon, Sun, Globe, Bell
} from "lucide-react";
import Chatbot from "@/components/ui/Chatbot";
import { useTheme } from "next-themes";
import { LanguageProvider, useLanguage, Language } from "@/lib/i18n";
import { useUserRole } from "@/hooks/useUserRole";
import { db, auth } from "@/lib/firebase";
import { collection, query, where, onSnapshot, orderBy, limit } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Logo } from "@/components/ui/Logo";

const ADMIN_NAV_ITEMS = [
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

const USER_NAV_ITEMS = [
    { href: "/dashboard/all-courses", label: "All Courses", icon: BookOpen },
    { href: "/dashboard/courses", label: "My Courses", icon: BookOpen },
    { href: "/dashboard/evaluations", label: "My Results", icon: ClipboardList },
    { href: "/dashboard/support", label: "Support Center", icon: ShieldAlert },
];

type Notification = { id: string; text: string; time: string; unread: boolean };

const TRANSLATIONS: Record<string, Record<string, string>> = {
    EN: {
        "Analytics Dashboard": "Analytics Dashboard",
        "Access Requests": "Access Requests",
        "Manage Users": "Manage Users",
        "Manage Courses": "Manage Courses",
        "All Courses": "All Courses",
        "My Courses": "My Courses",
        "My Results": "My Results",
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
        "All Courses": "جميع الدورات",
        "My Courses": "دوراتي",
        "My Results": "نتائجي",
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
        "All Courses": "सभी पाठ्यक्रम",
        "My Courses": "मेरे पाठ्यक्रम",
        "My Results": "मेरे परिणाम",
        "Course Studio": "कोर्स स्टूडियो",
        "Quiz Builder": "क्विज़ बिल्डर",
        "Evaluations": "मूल्यांकन",
        "Support Center": "सहायता केंद्र",
        "Settings": "सेटिंग्स",
        "Toggle Theme": "थीम बदलें"
    }
};

function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const { language, setLanguage, t } = useLanguage();
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const unreadCount = notifications.filter(n => n.unread).length;
    const [mounted, setMounted] = useState(false);

    const { isAdmin, role, loading } = useUserRole();
    const NAV_ITEMS = isAdmin ? ADMIN_NAV_ITEMS : USER_NAV_ITEMS;

    useEffect(() => {
        setMounted(true);
    }, []);

    // Dynamic notifications from Firestore
    useEffect(() => {
        if (!mounted) return;
        const unsubs: (() => void)[] = [];

        try {
            if (isAdmin) {
                // Admin: listen for pending access requests
                const reqQ = query(collection(db, "users"), where("status", "==", "pending"));
                unsubs.push(onSnapshot(reqQ, (snap) => {
                    const reqNotifs: Notification[] = snap.docs.map(d => ({
                        id: "req-" + d.id,
                        text: `New access request from ${d.data().name || d.data().email || "a user"}`,
                        time: "New",
                        unread: true
                    }));

                    // Admin: listen for new support messages
                    const msgQ = query(collection(db, "messages"), orderBy("updatedAt", "desc"), limit(5));
                    const msgUnsub = onSnapshot(msgQ, (msgSnap) => {
                        const msgNotifs: Notification[] = msgSnap.docs.map(d => ({
                            id: "msg-" + d.id,
                            text: `Message from ${d.data().userName || "User"}: "${(d.data().lastMsg || "").slice(0, 40)}${(d.data().lastMsg || "").length > 40 ? "..." : ""}"`,
                            time: "Recent",
                            unread: true
                        }));
                        setNotifications([...reqNotifs, ...msgNotifs]);
                    }, () => {
                        setNotifications(reqNotifs);
                    });
                    unsubs.push(msgUnsub);
                }, () => { }));
            } else {
                // User: listen for admin replies to their support thread
                const unsub = onAuthStateChanged(auth, (user) => {
                    if (!user) return;
                    const threadQ = query(collection(db, "messages", user.uid, "thread"), where("sender", "==", "admin"), orderBy("createdAt", "desc"), limit(3));
                    const threadUnsub = onSnapshot(threadQ, (snap) => {
                        const notifs: Notification[] = snap.docs.map(d => ({
                            id: "reply-" + d.id,
                            text: `Admin replied: "${(d.data().text || "").slice(0, 50)}${(d.data().text || "").length > 50 ? "..." : ""}"`,
                            time: "Recent",
                            unread: true
                        }));
                        setNotifications(notifs);
                    }, () => { });
                    unsubs.push(threadUnsub);
                });
                unsubs.push(unsub);
            }
        } catch (err) {
            console.error("Notification listener error:", err);
        }

        return () => unsubs.forEach(u => u());
    }, [mounted, isAdmin]);

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 flex overflow-hidden">
            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/60 z-50 md:hidden backdrop-blur-sm"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: collapsed ? 80 : 280 }}
                className={`fixed md:relative top-0 left-0 z-[60] h-screen bg-slate-50/80 dark:bg-slate-950/40 backdrop-blur-2xl border-r border-slate-200 dark:border-white/10 flex flex-col transition-all duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
                style={{ width: collapsed ? 80 : 280 }}
            >
                {/* Logo Area */}
                <div className="h-20 flex flex-col items-center justify-center border-b border-slate-200 dark:border-white/5 relative shrink-0">
                    <Link href="/" className="flex items-center gap-3">
                        <Logo collapsed={collapsed} />
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
                        const translatedLabel = t(item.label);

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
                                    <span className={`text-sm font-medium whitespace-nowrap ${isActive ? "text-slate-900 dark:text-white" : ""}`}>
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
                        {mounted && theme === "dark" ? <Sun className="w-5 h-5 shrink-0" /> : <Moon className="w-5 h-5 shrink-0" />}
                        {!collapsed && <span className="text-sm font-medium">{t("Toggle Theme")}</span>}
                    </button>
                    <div className="flex items-center gap-3 w-full rounded-lg cursor-pointer hover:bg-slate-200 dark:hover:bg-white/5 p-2 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-violet-500/30 flex items-center justify-center shrink-0">
                            <span className="text-slate-700 dark:text-violet-500 text-sm font-bold">ME</span>
                        </div>
                        {!collapsed && (
                            <div className="w-[140px] overflow-hidden">
                                <div className="text-slate-900 dark:text-white text-sm font-medium truncate">My Account</div>
                                {loading ? (
                                    <div className="w-20 h-3 mt-1 bg-slate-200 dark:bg-white/10 rounded animate-pulse" />
                                ) : (
                                    <div className="text-slate-500 dark:text-zinc-500 text-xs truncate capitalize">{role || "User"}</div>
                                )}
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
                            <Logo collapsed={true} />
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
                                onChange={(e) => setLanguage(e.target.value as Language)}
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
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </div>
                <Chatbot />
            </main>
        </div>
    );
}

// Wrapper to provide language context to the layout
export default function DashboardLayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <LanguageProvider>
            <DashboardLayout>{children}</DashboardLayout>
        </LanguageProvider>
    );
}
