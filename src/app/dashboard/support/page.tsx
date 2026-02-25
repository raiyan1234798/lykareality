"use client";

import { Headphones, LifeBuoy, Mail, MessageCircle, Send, UserCircle, Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

type Message = { id: number; text: string; sender: "user" | "admin"; time: string };
type Ticket = { id: number; userName: string; unread: boolean; preview: string; messages: Message[] };

export default function SupportCenter() {
    const { t } = useLanguage();
    const [viewMode, setViewMode] = useState<"admin" | "user">("admin");
    const [tickets, setTickets] = useState<Ticket[]>([
        {
            id: 1,
            userName: "Sarah Jenkins",
            unread: true,
            preview: "I'm having trouble accessing my course...",
            messages: [
                { id: 101, text: "Hi admin, I just finished the quiz but the next course module isn't unlocking. Can you check my account?", sender: "user", time: "10:24 AM" }
            ]
        },
        {
            id: 2,
            userName: "Michael Chen",
            unread: false,
            preview: "Thank you, that solved it.",
            messages: [
                { id: 201, text: "My profile name is misspelled, how do I change it?", sender: "user", time: "Yesterday" },
                { id: 202, text: "I've updated it for you in the system, Michael.", sender: "admin", time: "Yesterday" },
                { id: 203, text: "Thank you, that solved it.", sender: "user", time: "Yesterday" }
            ]
        }
    ]);

    const [activeTicketId, setActiveTicketId] = useState<number | null>(1);
    const [reply, setReply] = useState("");

    const activeTicket = tickets.find(t => t.id === activeTicketId);

    const [newTicketModal, setNewTicketModal] = useState(false);
    const [newTicketMessage, setNewTicketMessage] = useState("");

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!reply.trim() || !activeTicketId) return;

        setTickets(tickets.map(t => {
            if (t.id === activeTicketId) {
                return {
                    ...t,
                    unread: viewMode === "user" ? false : t.unread, // Admin replies don't make it unread for admin
                    preview: reply,
                    messages: [...t.messages, { id: Date.now(), text: reply, sender: viewMode, time: "Just now" }]
                };
            }
            return t;
        }));

        setReply("");
    };

    const handleNewTicket = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTicketMessage.trim()) return;

        const newTicket: Ticket = {
            id: Date.now(),
            userName: "Current User",
            unread: false,
            preview: newTicketMessage,
            messages: [{ id: Date.now(), text: newTicketMessage, sender: "user", time: "Just now" }]
        };

        setTickets([newTicket, ...tickets]);
        setActiveTicketId(newTicket.id);
        setNewTicketModal(false);
        setNewTicketMessage("");
    };

    const selectTicket = (id: number) => {
        setActiveTicketId(id);
        if (viewMode === "admin") {
            setTickets(tickets.map(t => t.id === id ? { ...t, unread: false } : t));
        }
    };

    return (
        <div className="space-y-6 h-full flex flex-col">
            <header className="mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">{t("Support Center")}</h1>
                    <p className="text-slate-500 dark:text-zinc-400">
                        {viewMode === "admin" ? t("Respond to trainee and consultant support requests.") : t("Get help with your Lyka Academy account.")}
                    </p>
                </div>
                <div className="flex gap-3">
                    {/* View Toggle for Mocking purposes */}
                    <div className="bg-slate-200 dark:bg-white/10 p-1 rounded-lg flex text-sm font-medium">
                        <button onClick={() => setViewMode('user')} className={`px-4 py-1.5 rounded-md transition-colors ${viewMode === 'user' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-zinc-200'}`}>{t("User View")}</button>
                        <button onClick={() => setViewMode('admin')} className={`px-4 py-1.5 rounded-md transition-colors ${viewMode === 'admin' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-zinc-200'}`}>{t("Admin View")}</button>
                    </div>

                    {viewMode === "user" && (
                        <button onClick={() => setNewTicketModal(true)} className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                            {t("+ New Ticket")}
                        </button>
                    )}
                </div>
            </header>

            <div className="flex-1 min-h-[600px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row backdrop-blur-md">

                {/* Conversations Sidebar */}
                <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/5 flex flex-col bg-slate-50 dark:bg-black/20">
                    <div className="p-4 border-b border-slate-200 dark:border-white/5">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500" />
                            <input
                                type="text"
                                placeholder={viewMode === "admin" ? t("Search consultants...") : t("Search your tickets...")}
                                className="w-full bg-slate-100 dark:bg-black/40 border border-slate-300 dark:border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-violet-500"
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {tickets.map((ticket) => (
                            <div
                                key={ticket.id}
                                onClick={() => selectTicket(ticket.id)}
                                className={`p-4 border-b border-slate-100 dark:border-white/5 cursor-pointer transition-colors ${activeTicketId === ticket.id ? 'bg-slate-200 dark:bg-white/[0.04]' : 'hover:bg-slate-100 dark:hover:bg-white/[0.02]'}`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className={`text-sm ${ticket.unread ? 'font-bold text-slate-900 dark:text-white' : 'font-medium text-slate-700 dark:text-zinc-300'}`}>{ticket.userName}</h4>
                                    {ticket.unread && <span className="w-2 h-2 rounded-full bg-violet-600 dark:bg-violet-500" />}
                                </div>
                                <p className={`text-xs truncate ${ticket.unread ? 'text-slate-700 dark:text-zinc-400 font-medium' : 'text-slate-500 dark:text-zinc-500'}`}>{ticket.preview}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-white dark:bg-transparent">
                    {activeTicket ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b border-slate-200 dark:border-white/5 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-slate-800 flex items-center justify-center">
                                        <UserCircle className="w-6 h-6 text-violet-600 dark:text-slate-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white">{activeTicket.userName}</h3>
                                        <p className="text-xs text-emerald-600 dark:text-emerald-500 font-medium">{t("Consultant")}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Chat Messages */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {activeTicket.messages.map((msg) => (
                                    <div key={msg.id} className={`flex flex-col ${msg.sender === 'admin' ? 'items-end' : 'items-start'}`}>
                                        <div className={`max-w-[80%] md:max-w-[60%] p-4 rounded-2xl ${msg.sender === 'admin'
                                            ? 'bg-violet-600 text-white rounded-tr-sm shadow-[0_4px_20px_rgba(139,92,246,0.15)]'
                                            : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-white rounded-tl-sm border border-slate-200 dark:border-white/5'
                                            }`}>
                                            <p className="text-sm">{msg.text}</p>
                                        </div>
                                        <span className="text-xs text-slate-400 dark:text-zinc-500 mt-1 mx-1">{msg.time}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Chat Input */}
                            <form onSubmit={handleSend} className="p-4 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50">
                                <div className="relative flex items-center">
                                    <input
                                        type="text"
                                        value={reply}
                                        onChange={(e) => setReply(e.target.value)}
                                        placeholder={viewMode === "admin" ? t("Type your reply to user...") : t("Type your message to support...")}
                                        className="w-full bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-full pl-5 pr-14 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-violet-500 shadow-inner"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!reply.trim()}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-violet-600 text-white rounded-full flex items-center justify-center hover:bg-violet-700 disabled:opacity-50 transition-colors shadow-md"
                                    >
                                        <Send className="w-4 h-4 ml-0.5" />
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-500 dark:text-zinc-500 h-full">
                            <MessageCircle className="w-12 h-12 mb-4 opacity-20" />
                            <p className="font-medium">{t("Select a conversation to reply")}</p>
                        </div>
                    )}
                </div>

            </div>

            {/* New Ticket Modal */}
            {newTicketModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10">
                        <div className="p-6 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/50">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t("Create Support Ticket")}</h3>
                        </div>
                        <form onSubmit={handleNewTicket}>
                            <div className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">{t("How can we help?")}</label>
                                    <textarea
                                        rows={4}
                                        autoFocus
                                        value={newTicketMessage}
                                        onChange={(e) => setNewTicketMessage(e.target.value)}
                                        placeholder={t("Describe your issue in detail...")}
                                        className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-violet-500"
                                    />
                                </div>
                            </div>
                            <div className="p-6 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/50 flex justify-end gap-3">
                                <button type="button" onClick={() => setNewTicketModal(false)} className="px-5 py-2 text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-colors">{t("Cancel")}</button>
                                <button type="submit" disabled={!newTicketMessage.trim()} className="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50">{t("Create Ticket")}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
