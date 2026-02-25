"use client";

import { Headphones, LifeBuoy, Mail, MessageCircle } from "lucide-react";

export default function SupportCenter() {
    return (
        <div className="space-y-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Support Center</h1>
                <p className="text-zinc-400">Get help with your Lykaa Academy platform.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-900 border border-white/5 rounded-2xl p-8 hover:border-violet-500/30 transition-all text-center">
                    <div className="w-16 h-16 mx-auto bg-violet-500/10 rounded-2xl flex items-center justify-center border border-violet-500/20 mb-6">
                        <MessageCircle className="text-violet-500 w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Live Chat</h3>
                    <p className="text-zinc-400 mb-6">Connect with our enterprise support team instantly.</p>
                    <button className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium transition-colors">Start Chat</button>
                </div>

                <div className="bg-slate-900 border border-white/5 rounded-2xl p-8 hover:border-blue-500/30 transition-all text-center">
                    <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 mb-6">
                        <Mail className="text-blue-500 w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Email Support</h3>
                    <p className="text-zinc-400 mb-6">Open a detailed ticket for technical assistance.</p>
                    <button className="w-full py-3 bg-black hover:bg-white/5 border border-white/10 text-white rounded-xl font-medium transition-colors">Open Ticket</button>
                </div>
            </div>

            <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md">
                <div className="p-6 border-b border-white/5 flex items-center gap-3">
                    <LifeBuoy className="w-5 h-5 text-violet-500" />
                    <h2 className="text-lg font-bold text-white">Frequently Asked Questions</h2>
                </div>
                <div className="divide-y divide-white/5">
                    {[
                        { q: "How do I reset a user's password?", a: "Navigate to Manage Users, click the three dots next to their name, and select 'Send Password Reset Link'." },
                        { q: "Can I export course analytics?", a: "Yes, go to Analytics Dashboard and click the 'Export Report' button in the top right to download a CSV/Excel file." },
                        { q: "How do I change the platform theme?", a: "Enterprise themes are controlled via Settings > Appearance. You can set brand colors and logo there." }
                    ].map((faq, idx) => (
                        <div key={idx} className="p-6 hover:bg-white/[0.02] transition-colors cursor-pointer group">
                            <h4 className="text-white font-medium mb-2 group-hover:text-violet-400 transition-colors">{faq.q}</h4>
                            <p className="text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
