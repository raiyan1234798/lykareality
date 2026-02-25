"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, User, Bot, Loader2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

type Message = {
    role: "user" | "model";
    text: string;
};

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "model", text: "Hello! I am your Lykaa AI Executive Assistant. How can I help you dominate the luxury real estate market today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
        setIsLoading(true);

        try {
            // Build chat history for context
            const history = messages.map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            }));

            const chat = model.startChat({
                history,
            });

            const result = await chat.sendMessage(userMessage);
            const responseText = result.response.text();

            setMessages((prev) => [...prev, { role: "model", text: responseText }]);
        } catch (error) {
            console.error("Error generating AI response:", error);
            setMessages((prev) => [...prev, { role: "model", text: "I apologize, but I am experiencing temporary connectivity issues. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] z-50 text-blue-950 ${isOpen ? "hidden" : "flex"}`}
            >
                <MessageSquare className="w-6 h-6" />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[550px] max-h-[80vh] bg-blue-950/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="h-16 border-b border-white/10 flex items-center justify-between px-5 bg-black/20 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-gold-500" />
                                </div>
                                <div>
                                    <h3 className="text-white font-medium text-sm">Lykaa AI Assistant</h3>
                                    <p className="text-zinc-400 text-xs">Powered by Gemini</p>
                                </div>
                            </div>
                            <button aria-label="Close Chat" onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                    {msg.role === "model" && (
                                        <div className="w-8 h-8 rounded shrink-0 bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mt-1">
                                            <Bot className="w-4 h-4 text-gold-500" />
                                        </div>
                                    )}
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${msg.role === "user" ? "bg-gold-500 text-blue-950 rounded-tr-sm" : "bg-black/40 text-zinc-200 border border-white/5 rounded-tl-sm"}`}>
                                        {msg.text}
                                    </div>
                                    {msg.role === "user" && (
                                        <div className="w-8 h-8 rounded shrink-0 bg-blue-900 border border-gold-500/30 flex items-center justify-center mt-1">
                                            <User className="w-4 h-4 text-gold-500" />
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-3 justify-start">
                                    <div className="w-8 h-8 rounded shrink-0 bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mt-1">
                                        <Loader2 className="w-4 h-4 text-gold-500 animate-spin" />
                                    </div>
                                    <div className="max-w-[80%] p-3 rounded-2xl text-sm bg-black/40 text-zinc-400 border border-white/5 rounded-tl-sm flex items-center gap-1">
                                        <span className="animate-pulse">Thinking</span>
                                        <span className="animate-pulse delay-100">.</span>
                                        <span className="animate-pulse delay-200">.</span>
                                        <span className="animate-pulse delay-300">.</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-white/10 bg-black/20 shrink-0">
                            <form onSubmit={handleSubmit} className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask anything..."
                                    className="w-full bg-black/50 border border-white/10 rounded-full pl-5 pr-12 py-3 text-sm text-white focus:outline-none focus:border-gold-500/50 transition-colors placeholder:text-zinc-600"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    aria-label="Send Message"
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-2 w-8 h-8 flex items-center justify-center rounded-full bg-gold-500 text-blue-950 disabled:opacity-50 disabled:bg-zinc-600 transition-colors"
                                >
                                    <Send className="w-4 h-4 ml-0.5" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
