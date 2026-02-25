"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
    BarChart3, Users, FileText, Video, ClipboardList, ShieldAlert,
    GraduationCap, Settings, Menu, X, ChevronLeft, UserCircle2, BookOpen
} from "lucide-react";

const NAV_ITEMS = [
    { href: "/dashboard", label: "Analytics Dashboard", icon: BarChart3 },
    { href: "#requests", label: "Access Requests", icon: Users },
    { href: "#users", label: "Manage Users", icon: UserCircle2 },
    { href: "#courses", label: "Manage Courses", icon: BookOpen },
    { href: "#studio", label: "Course Studio", icon: Video },
    { href: "#quiz", label: "Quiz Builder", icon: FileText },
    { href: "#evaluations", label: "Evaluations", icon: ClipboardList },
    { href: "#certifications", label: "Certifications", icon: GraduationCap },
    { href: "#support", label: "Support Center", icon: ShieldAlert },
    { href: "#settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-black flex overflow-hidden">
            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: collapsed ? 80 : 280, x: mobileOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 768 ? -280 : 0) }}
                className={`fixed md:relative top-0 left-0 z-50 h-screen bg-blue-950/40 backdrop-blur-2xl border-r border-white/10 flex flex-col transition-all duration-300 ease-in-out`}
                style={{ width: collapsed ? 80 : 280 }}
            >
                {/* Logo Area */}
                <div className="h-20 flex flex-col items-center justify-center border-b border-white/5 relative shrink-0">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                            <span className="text-blue-950 font-serif font-bold text-xl">L</span>
                        </div>
                        {!collapsed && (
                            <span className="text-lg font-semibold tracking-wide text-white whitespace-nowrap overflow-hidden hidden md:block">
                                LYKAA <span className="text-gold-500 font-light hidden xl:inline">ACADEMY</span>
                            </span>
                        )}
                    </Link>
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="absolute -right-3 top-6 bg-blue-950 border border-white/20 rounded-full p-1 text-zinc-400 hover:text-gold-500 hidden md:block z-50 transition-colors"
                    >
                        <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} />
                    </button>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar flex flex-col gap-2">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 group relative ${isActive
                                        ? "bg-gold-500/10 text-gold-500 shadow-[inset_4px_0_0_rgba(212,175,55,1)]"
                                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <div className={`shrink-0 ${isActive ? "text-gold-500 transition-colors" : "group-hover:text-gold-400"}`}>
                                    <Icon className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.8)] transition-all duration-300" />
                                </div>
                                {!collapsed && (
                                    <span className={`text-sm font-medium whitespace-nowrap hidden md:block ${isActive ? "text-white" : ""}`}>
                                        {item.label}
                                    </span>
                                )}
                                {isActive && (
                                    <motion.div layoutId="nav-indicator" className="absolute left-0 w-1 h-3/4 bg-gold-500 rounded-r-full shadow-[0_0_10px_rgba(212,175,55,1)]" />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* User Info / Profile */}
                <div className="p-4 border-t border-white/5 shrink-0 bg-black/20">
                    <div className="flex items-center gap-3 w-full rounded-lg cursor-pointer hover:bg-white/5 p-2 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-blue-900 border border-gold-500/30 flex items-center justify-center shrink-0">
                            <span className="text-gold-500 text-sm font-bold">AJ</span>
                        </div>
                        {!collapsed && (
                            <div className="hidden md:block w-[140px] overflow-hidden">
                                <div className="text-white text-sm font-medium truncate">Admin Jane</div>
                                <div className="text-zinc-500 text-xs truncate">Super Admin</div>
                            </div>
                        )}
                    </div>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#0A0A0B] relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-950/20 via-black to-black z-0 pointer-events-none" />

                {/* Mobile Header */}
                <header className="h-16 flex items-center justify-between px-4 border-b border-white/5 md:hidden relative z-10 bg-black/50 backdrop-blur-md">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-gold-500 flex items-center justify-center">
                            <span className="text-blue-950 font-bold font-serif text-sm">L</span>
                        </div>
                    </Link>
                    <button onClick={() => setMobileOpen(true)} className="text-white">
                        <Menu className="w-6 h-6" />
                    </button>
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
            </main>
        </div>
    );
}
