"use client";

import { MessageCircle, Send, UserCircle, Search, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import { useUserRole } from "@/hooks/useUserRole";
import { db, auth } from "@/lib/firebase";
import {
    collection, addDoc, query, where, orderBy, onSnapshot,
    doc, updateDoc, serverTimestamp, Timestamp, getDocs
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

type Message = { id: string; text: string; sender: "user" | "admin"; time: string; createdAt?: Timestamp };
type Ticket = { id: string; userId: string; userName: string; userEmail: string; lastMessage: string; updatedAt?: Timestamp; messages: Message[] };

export default function SupportCenter() {
    const { t } = useLanguage();
    const { isAdmin } = useUserRole();

    const [currentUser, setCurrentUser] = useState<{ uid: string; displayName: string; email: string } | null>(null);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [reply, setReply] = useState("");
    const [newTicketModal, setNewTicketModal] = useState(false);
    const [newTicketMessage, setNewTicketMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    // Get current user
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser({ uid: user.uid, displayName: user.displayName || "User", email: user.email || "" });
            }
        });
        return () => unsub();
    }, []);

    // Listen to tickets in real-time
    useEffect(() => {
        if (!currentUser) return;

        let q;
        if (isAdmin) {
            // Admin sees all tickets
            q = query(collection(db, "support_tickets"), orderBy("updatedAt", "desc"));
        } else {
            // User sees only their own ticket
            q = query(collection(db, "support_tickets"), where("userId", "==", currentUser.uid), orderBy("updatedAt", "desc"));
        }

        const unsub = onSnapshot(q, (snap) => {
            const data: Ticket[] = snap.docs.map(d => ({
                id: d.id,
                userId: d.data().userId,
                userName: d.data().userName,
                userEmail: d.data().userEmail,
                lastMessage: d.data().lastMessage || "",
                updatedAt: d.data().updatedAt,
                messages: []
            }));
            setTickets(data);

            // For users, auto-select their ticket
            if (!isAdmin && data.length > 0 && !activeTicketId) {
                setActiveTicketId(data[0].id);
            }
            // For admin, auto-select first if none selected
            if (isAdmin && data.length > 0 && !activeTicketId) {
                setActiveTicketId(data[0].id);
            }
        }, (err) => {
            console.error("Error listening to tickets:", err);
        });

        return () => unsub();
    }, [currentUser, isAdmin]);

    // Listen to messages for the active ticket
    useEffect(() => {
        if (!activeTicketId) { setMessages([]); return; }

        const q = query(
            collection(db, "support_tickets", activeTicketId, "messages"),
            orderBy("createdAt", "asc")
        );

        const unsub = onSnapshot(q, (snap) => {
            const msgs: Message[] = snap.docs.map(d => ({
                id: d.id,
                text: d.data().text,
                sender: d.data().sender,
                time: d.data().createdAt ? formatTime(d.data().createdAt) : "Just now",
                createdAt: d.data().createdAt
            }));
            setMessages(msgs);
        });

        return () => unsub();
    }, [activeTicketId]);

    function formatTime(ts: Timestamp): string {
        if (!ts) return "Just now";
        const d = ts.toDate();
        const now = new Date();
        const diffMs = now.getTime() - d.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins}m ago`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours}h ago`;
        return d.toLocaleDateString();
    }

    // Send message (works for both admin and user)
    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reply.trim() || !activeTicketId || !currentUser) return;

        const sender = isAdmin ? "admin" : "user";

        try {
            // Add message to subcollection
            await addDoc(collection(db, "support_tickets", activeTicketId, "messages"), {
                text: reply,
                sender,
                createdAt: serverTimestamp()
            });

            // Update ticket's last message
            await updateDoc(doc(db, "support_tickets", activeTicketId), {
                lastMessage: reply,
                updatedAt: serverTimestamp()
            });

            setReply("");
        } catch (err) {
            console.error("Error sending message:", err);
        }
    };

    // Create new ticket (user creates a ticket to admin)
    const handleNewTicket = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTicketMessage.trim() || !currentUser) return;

        try {
            // Check if user already has a ticket
            const existingQ = query(collection(db, "support_tickets"), where("userId", "==", currentUser.uid));
            const existingSnap = await getDocs(existingQ);

            let ticketId: string;

            if (existingSnap.size > 0) {
                // Add message to existing ticket
                ticketId = existingSnap.docs[0].id;
            } else {
                // Create new ticket
                const ticketRef = await addDoc(collection(db, "support_tickets"), {
                    userId: currentUser.uid,
                    userName: currentUser.displayName,
                    userEmail: currentUser.email,
                    lastMessage: newTicketMessage,
                    updatedAt: serverTimestamp(),
                    createdAt: serverTimestamp()
                });
                ticketId = ticketRef.id;
            }

            // Add the message
            await addDoc(collection(db, "support_tickets", ticketId, "messages"), {
                text: newTicketMessage,
                sender: "user",
                createdAt: serverTimestamp()
            });

            await updateDoc(doc(db, "support_tickets", ticketId), {
                lastMessage: newTicketMessage,
                updatedAt: serverTimestamp()
            });

            setActiveTicketId(ticketId);
            setNewTicketModal(false);
            setNewTicketMessage("");
        } catch (err) {
            console.error("Error creating ticket:", err);
        }
    };

    // Send first message directly (for users with no ticket yet)
    const handleUserFirstSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reply.trim() || !currentUser) return;

        try {
            const existingQ = query(collection(db, "support_tickets"), where("userId", "==", currentUser.uid));
            const existingSnap = await getDocs(existingQ);

            let ticketId: string;

            if (existingSnap.size > 0) {
                ticketId = existingSnap.docs[0].id;
            } else {
                const ticketRef = await addDoc(collection(db, "support_tickets"), {
                    userId: currentUser.uid,
                    userName: currentUser.displayName,
                    userEmail: currentUser.email,
                    lastMessage: reply,
                    updatedAt: serverTimestamp(),
                    createdAt: serverTimestamp()
                });
                ticketId = ticketRef.id;
            }

            await addDoc(collection(db, "support_tickets", ticketId, "messages"), {
                text: reply,
                sender: "user",
                createdAt: serverTimestamp()
            });

            await updateDoc(doc(db, "support_tickets", ticketId), {
                lastMessage: reply,
                updatedAt: serverTimestamp()
            });

            setActiveTicketId(ticketId);
            setReply("");
        } catch (err) {
            console.error("Error sending message:", err);
        }
    };

    const activeTicket = tickets.find(tk => tk.id === activeTicketId);
    const filteredTickets = tickets.filter(tk =>
        tk.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tk.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tk.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ═══════════════════════════════════════════════
    // USER VIEW — single conversation with admin
    // ═══════════════════════════════════════════════
    if (!isAdmin) {
        return (
            <div className="space-y-6 h-full flex flex-col">
                <header className="mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{t("Support Center")}</h1>
                        <p className="text-slate-500 dark:text-zinc-400">{t("Get help with your Lyka Academy account.")}</p>
                    </div>
                    {tickets.length === 0 && (
                        <button onClick={() => setNewTicketModal(true)} className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                            {t("+ New Ticket")}
                        </button>
                    )}
                </header>

                <div className="flex-1 min-h-[600px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm flex flex-col backdrop-blur-md">
                    {/* Header — talking to Admin */}
                    <div className="p-4 border-b border-slate-200 dark:border-white/5 flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50">
                        <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white">{t("Lyka Admin Support")}</h3>
                            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{t("Online")}</p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {messages.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-zinc-500">
                                <MessageCircle className="w-12 h-12 mb-4 opacity-20" />
                                <p className="font-medium text-sm">{t("Send a message to start a conversation with admin.")}</p>
                            </div>
                        )}
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`max-w-[80%] md:max-w-[60%] p-4 rounded-2xl ${msg.sender === 'user'
                                    ? 'bg-violet-600 text-white rounded-tr-sm shadow-[0_4px_20px_rgba(139,92,246,0.15)]'
                                    : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-white rounded-tl-sm border border-slate-200 dark:border-white/5'
                                    }`}>
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                                <span className="text-xs text-slate-400 dark:text-zinc-500 mt-1 mx-1">{msg.time}</span>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <form onSubmit={activeTicketId ? handleSend : handleUserFirstSend} className="p-4 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50">
                        <div className="relative flex items-center">
                            <input type="text" value={reply} onChange={(e) => setReply(e.target.value)} placeholder={t("Type your message to support...")} className="w-full bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-full pl-5 pr-14 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-violet-500 shadow-inner" />
                            <button type="submit" disabled={!reply.trim()} title="Send message" className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-violet-600 text-white rounded-full flex items-center justify-center hover:bg-violet-700 disabled:opacity-50 transition-colors shadow-md">
                                <Send className="w-4 h-4 ml-0.5" />
                            </button>
                        </div>
                    </form>
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
                                        <textarea rows={4} autoFocus value={newTicketMessage} onChange={(e) => setNewTicketMessage(e.target.value)} placeholder={t("Describe your issue in detail...")} className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-violet-500" />
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

    // ═══════════════════════════════════════════════
    // ADMIN VIEW — see all user tickets and reply
    // ═══════════════════════════════════════════════
    return (
        <div className="space-y-6 h-full flex flex-col">
            <header className="mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{t("Support Center")}</h1>
                    <p className="text-slate-500 dark:text-zinc-400">{t("Respond to trainee and consultant support requests.")}</p>
                </div>
            </header>

            <div className="flex-1 min-h-[600px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row backdrop-blur-md">

                {/* Conversations Sidebar */}
                <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/5 flex flex-col bg-slate-50 dark:bg-black/20">
                    <div className="p-4 border-b border-slate-200 dark:border-white/5">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500" />
                            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={t("Search consultants...")} className="w-full bg-slate-100 dark:bg-black/40 border border-slate-300 dark:border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-violet-500" />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {filteredTickets.length === 0 && (
                            <div className="p-6 text-center text-slate-400 dark:text-zinc-500 text-sm">
                                {t("No support tickets yet.")}
                            </div>
                        )}
                        {filteredTickets.map((ticket) => (
                            <div key={ticket.id} onClick={() => setActiveTicketId(ticket.id)} className={`p-4 border-b border-slate-100 dark:border-white/5 cursor-pointer transition-colors ${activeTicketId === ticket.id ? 'bg-slate-200 dark:bg-white/[0.04]' : 'hover:bg-slate-100 dark:hover:bg-white/[0.02]'}`}>
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{ticket.userName}</h4>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-zinc-500 mb-0.5">{ticket.userEmail}</p>
                                <p className="text-xs truncate text-slate-500 dark:text-zinc-500">{ticket.lastMessage}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-white dark:bg-transparent">
                    {activeTicket ? (
                        <>
                            <div className="p-4 border-b border-slate-200 dark:border-white/5 flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50">
                                <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-slate-800 flex items-center justify-center">
                                    <UserCircle className="w-6 h-6 text-violet-600 dark:text-slate-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">{activeTicket.userName}</h3>
                                    <p className="text-xs text-slate-500 dark:text-zinc-400">{activeTicket.userEmail}</p>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {messages.map((msg) => (
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
                            <form onSubmit={handleSend} className="p-4 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50">
                                <div className="relative flex items-center">
                                    <input type="text" value={reply} onChange={(e) => setReply(e.target.value)} placeholder={t("Type your reply to user...")} className="w-full bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-full pl-5 pr-14 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-violet-500 shadow-inner" />
                                    <button type="submit" disabled={!reply.trim()} title="Send message" className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-violet-600 text-white rounded-full flex items-center justify-center hover:bg-violet-700 disabled:opacity-50 transition-colors shadow-md">
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
        </div>
    );
}
