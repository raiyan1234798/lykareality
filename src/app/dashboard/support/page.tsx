"use client";

import { MessageCircle, Send, UserCircle, Search, ShieldCheck } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/i18n";
import { useUserRole } from "@/hooks/useUserRole";
import { db, auth } from "@/lib/firebase";
import {
    collection, addDoc, query, where, orderBy, onSnapshot,
    doc, setDoc, serverTimestamp, Timestamp, getDocs
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

type Msg = { id: string; text: string; sender: "user" | "admin"; time: string };
type Chat = { odid: string; oduserId: string; userName: string; userEmail: string; lastMsg: string; updatedAt?: Timestamp };

export default function SupportCenter() {
    const { t } = useLanguage();
    const { isAdmin } = useUserRole();
    const bottomRef = useRef<HTMLDivElement>(null);

    const [me, setMe] = useState<{ uid: string; name: string; email: string } | null>(null);
    const [chats, setChats] = useState<Chat[]>([]);
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Msg[]>([]);
    const [text, setText] = useState("");
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");

    // Auth
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            if (u) setMe({ uid: u.uid, name: u.displayName || "User", email: u.email || "" });
        });
        return () => unsub();
    }, []);

    // For users: auto-create or find their chat doc
    useEffect(() => {
        if (!me || isAdmin) return;
        const chatDocId = me.uid; // use UID as doc ID so each user has one chat

        const ref = doc(db, "messages", chatDocId);
        // Create if not exists
        setDoc(ref, {
            userId: me.uid,
            userName: me.name,
            userEmail: me.email,
            lastMsg: "",
            updatedAt: serverTimestamp()
        }, { merge: true }).catch(err => {
            console.error("Firestore setDoc error (messages):", err);
            setError("Permission denied. Please ask admin to update Firestore rules.");
        });

        setActiveChatId(chatDocId);
    }, [me, isAdmin]);

    // Admin: listen to all chats
    useEffect(() => {
        if (!isAdmin || !me) return;
        const q = query(collection(db, "messages"), orderBy("updatedAt", "desc"));
        const unsub = onSnapshot(q, (snap) => {
            const data: Chat[] = snap.docs.map(d => ({
                odid: d.id,
                oduserId: d.data().userId,
                userName: d.data().userName || "User",
                userEmail: d.data().userEmail || "",
                lastMsg: d.data().lastMsg || "",
                updatedAt: d.data().updatedAt
            }));
            setChats(data);
            if (data.length > 0 && !activeChatId) setActiveChatId(data[0].odid);
        }, (err) => {
            console.error("Firestore listen error (admin chats):", err);
            setError("Could not load messages. Check Firestore rules.");
        });
        return () => unsub();
    }, [isAdmin, me]);

    // Listen to messages for active chat
    useEffect(() => {
        if (!activeChatId) { setMessages([]); return; }
        const q = query(collection(db, "messages", activeChatId, "thread"), orderBy("createdAt", "asc"));
        const unsub = onSnapshot(q, (snap) => {
            setMessages(snap.docs.map(d => ({
                id: d.id,
                text: d.data().text,
                sender: d.data().sender,
                time: d.data().createdAt ? fmtTime(d.data().createdAt) : "now"
            })));
            setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
        }, (err) => {
            console.error("Firestore listen error (thread):", err);
        });
        return () => unsub();
    }, [activeChatId]);

    function fmtTime(ts: Timestamp): string {
        const d = ts.toDate();
        const h = d.getHours(); const m = d.getMinutes();
        return `${h % 12 || 12}:${m < 10 ? '0' + m : m} ${h >= 12 ? 'PM' : 'AM'}`;
    }

    const send = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim() || !activeChatId || !me) return;
        const sender = isAdmin ? "admin" : "user";
        const msg = text.trim();
        setText("");
        try {
            await addDoc(collection(db, "messages", activeChatId, "thread"), {
                text: msg, sender, createdAt: serverTimestamp()
            });
            await setDoc(doc(db, "messages", activeChatId), {
                lastMsg: msg, updatedAt: serverTimestamp()
            }, { merge: true });
        } catch (err) {
            console.error("Send failed:", err);
        }
    };

    const activeChat = chats.find(c => c.odid === activeChatId);
    const filtered = chats.filter(c =>
        c.userName.toLowerCase().includes(search.toLowerCase()) ||
        c.userEmail.toLowerCase().includes(search.toLowerCase())
    );

    // ──────────────────────────
    // ERROR BANNER
    // ──────────────────────────
    if (error) {
        return (
            <div className="space-y-6 h-full flex flex-col">
                <header className="mb-2">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{t("Support Center")}</h1>
                </header>
                <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 rounded-xl p-6 text-center">
                    <p className="text-rose-600 dark:text-rose-400 font-medium mb-2">{error}</p>
                    <p className="text-sm text-slate-500 dark:text-zinc-400">Go to Firebase Console → Firestore → Rules and set:</p>
                    <pre className="mt-3 bg-slate-100 dark:bg-slate-900 rounded-lg p-4 text-left text-xs text-slate-700 dark:text-zinc-300 overflow-x-auto">
                        {`match /messages/{chatId} {
  allow read, write: if request.auth != null;
  match /thread/{msgId} {
    allow read, write: if request.auth != null;
  }
}`}
                    </pre>
                    <button onClick={() => setError("")} className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm hover:bg-violet-700 transition-colors">Try Again</button>
                </div>
            </div>
        );
    }

    // ──────────────────────────
    // USER: simple chat with admin
    // ──────────────────────────
    if (!isAdmin) {
        return (
            <div className="space-y-6 h-full flex flex-col">
                <header className="mb-2">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{t("Support Center")}</h1>
                    <p className="text-slate-500 dark:text-zinc-400 text-sm">{t("Get help with your Lyka Academy account.")}</p>
                </header>

                <div className="flex-1 min-h-[550px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm flex flex-col">
                    {/* Header */}
                    <div className="px-5 py-4 border-b border-slate-200 dark:border-white/5 flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50">
                        <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-sm">{t("Lyka Admin")}</h3>
                            <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />{t("Online")}</span>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-3">
                        {messages.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-zinc-600 gap-2">
                                <MessageCircle className="w-10 h-10 opacity-30" />
                                <p className="text-sm font-medium">{t("Send a message to start a conversation with admin.")}</p>
                            </div>
                        )}
                        {messages.map((m) => (
                            <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${m.sender === 'user'
                                    ? 'bg-violet-600 text-white rounded-br-md'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white rounded-bl-md border border-slate-200 dark:border-white/5'
                                    }`}>
                                    <p className="text-sm leading-relaxed">{m.text}</p>
                                    <p className={`text-[10px] mt-1 ${m.sender === 'user' ? 'text-white/60' : 'text-slate-400 dark:text-zinc-500'}`}>{m.time}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={send} className="p-3 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50">
                        <div className="relative flex items-center">
                            <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder={t("Type your message...")} className="w-full bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-full pl-5 pr-12 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-violet-500" />
                            <button type="submit" disabled={!text.trim()} title="Send" className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center hover:bg-violet-700 disabled:opacity-40 transition-colors">
                                <Send className="w-3.5 h-3.5 ml-0.5" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    // ──────────────────────────
    // ADMIN: all user conversations
    // ──────────────────────────
    return (
        <div className="space-y-6 h-full flex flex-col">
            <header className="mb-2">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{t("Support Center")}</h1>
                <p className="text-slate-500 dark:text-zinc-400 text-sm">{t("Respond to trainee and consultant support requests.")}</p>
            </header>

            <div className="flex-1 min-h-[550px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row">

                {/* Users list */}
                <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/5 flex flex-col bg-slate-50 dark:bg-black/20">
                    <div className="p-3 border-b border-slate-200 dark:border-white/5">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
                            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={t("Search users...")} className="w-full bg-white dark:bg-black/40 border border-slate-300 dark:border-white/10 rounded-lg pl-8 pr-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-violet-500" />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {filtered.length === 0 && (
                            <p className="p-4 text-xs text-center text-slate-400 dark:text-zinc-600">{t("No messages yet.")}</p>
                        )}
                        {filtered.map(c => (
                            <div key={c.odid} onClick={() => setActiveChatId(c.odid)} className={`px-4 py-3 border-b border-slate-100 dark:border-white/5 cursor-pointer transition-colors ${activeChatId === c.odid ? 'bg-violet-50 dark:bg-violet-500/10' : 'hover:bg-slate-100 dark:hover:bg-white/[0.02]'}`}>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                        <UserCircle className="w-5 h-5 text-slate-500 dark:text-zinc-400" />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate">{c.userName}</h4>
                                        <p className="text-[11px] text-slate-500 dark:text-zinc-500 truncate">{c.lastMsg || c.userEmail}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat */}
                <div className="flex-1 flex flex-col">
                    {activeChatId && activeChat ? (
                        <>
                            <div className="px-5 py-3 border-b border-slate-200 dark:border-white/5 flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50">
                                <div className="w-9 h-9 rounded-full bg-violet-100 dark:bg-slate-800 flex items-center justify-center">
                                    <UserCircle className="w-5 h-5 text-violet-600 dark:text-slate-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">{activeChat.userName}</h3>
                                    <p className="text-[11px] text-slate-500 dark:text-zinc-400">{activeChat.userEmail}</p>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto p-5 space-y-3">
                                {messages.map(m => (
                                    <div key={m.id} className={`flex ${m.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${m.sender === 'admin'
                                            ? 'bg-violet-600 text-white rounded-br-md'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white rounded-bl-md border border-slate-200 dark:border-white/5'
                                            }`}>
                                            <p className="text-sm leading-relaxed">{m.text}</p>
                                            <p className={`text-[10px] mt-1 ${m.sender === 'admin' ? 'text-white/60' : 'text-slate-400 dark:text-zinc-500'}`}>{m.time}</p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={bottomRef} />
                            </div>
                            <form onSubmit={send} className="p-3 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50">
                                <div className="relative flex items-center">
                                    <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder={t("Type your reply...")} className="w-full bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-full pl-5 pr-12 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-violet-500" />
                                    <button type="submit" disabled={!text.trim()} title="Send" className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center hover:bg-violet-700 disabled:opacity-40 transition-colors">
                                        <Send className="w-3.5 h-3.5 ml-0.5" />
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 dark:text-zinc-600">
                            <MessageCircle className="w-10 h-10 mb-3 opacity-20" />
                            <p className="text-sm font-medium">{t("Select a user to view their messages")}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
