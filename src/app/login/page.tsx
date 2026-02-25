"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [authMessage, setAuthMessage] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            router.push("/dashboard");
        }, 1500);
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setAuthMessage("");
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Check if user exists in Firestore
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const userData = userSnap.data();
                if (userData.status === "approved") {
                    router.push("/dashboard");
                    return; // Successfully approved and redirected
                } else if (userData.status === "pending") {
                    await signOut(auth);
                    setAuthMessage("Your account is currently pending admin approval. Please wait.");
                } else {
                    await signOut(auth);
                    setAuthMessage("Your account has been restricted.");
                }
            } else {
                // New user - create a pending request
                await setDoc(userRef, {
                    uid: user.uid,
                    name: user.displayName || "New User",
                    email: user.email,
                    photoURL: user.photoURL,
                    role: "User",
                    status: "pending",
                    createdAt: serverTimestamp()
                });
                await signOut(auth);
                setAuthMessage("Access requested successfully! Please wait for admin approval.");
            }
        } catch (error) {
            console.error("Google login failed", error);
            setAuthMessage("Google login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden">
            {/* Background Aesthetics */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-violet-500/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-slate-950/40 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md p-8 sm:p-12 bg-zinc-950/60 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
            >
                {/* Animated Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-50" />

                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-400 to-violet-600 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105 transition-transform mb-6">
                        <span className="text-slate-950 font-serif font-bold text-3xl">L</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Secure Gateway</h1>
                    <p className="text-zinc-400 text-sm">Enterprise portal for Lykaa consultants.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-4">
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="Corporate Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-4 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/5 transition-all text-sm group-hover:border-white/20"
                            />
                        </div>

                        <div className="relative group">
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-4 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/5 transition-all text-sm group-hover:border-white/20"
                            />
                            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors pointer-events-none" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                        <label className="flex items-center gap-2 cursor-pointer text-zinc-400 hover:text-white transition-colors">
                            <input type="checkbox" className="rounded accent-violet-500 bg-slate-950/50 border-white/10" />
                            Remember me
                        </label>
                        <a href="#" className="text-violet-500 hover:text-violet-400 transition-colors hover:underline">
                            Recovery
                        </a>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !email || !password}
                        className="w-full py-4 bg-white text-slate-950 font-bold rounded-lg disabled:opacity-50 hover:bg-zinc-200 transition-all flex justify-center items-center gap-2 group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-violet-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                        {isLoading ? (
                            <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 1 }} className="block w-5 h-5 border-2 border-slate-950/20 border-t-slate-950 rounded-full" />
                        ) : (
                            <>
                                Authenticate <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    <div className="relative my-4 flex items-center py-4">
                        <div className="flex-grow border-t border-zinc-800"></div>
                        <span className="flex-shrink-0 mx-4 text-zinc-500 text-sm">or</span>
                        <div className="flex-grow border-t border-zinc-800"></div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="w-full py-4 bg-transparent border border-white/20 text-white font-bold rounded-lg hover:bg-white/5 transition-all flex justify-center items-center gap-3 disabled:opacity-50"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Continue with Google
                    </button>

                    {authMessage && (
                        <div className="mt-4 p-3 bg-violet-500/10 border border-violet-500/20 rounded-lg text-center text-sm text-violet-400">
                            {authMessage}
                        </div>
                    )}
                </form>

                <div className="mt-8 pt-6 border-t border-white/5 text-center px-4">
                    <p className="text-zinc-500 text-xs leading-relaxed">
                        By logging in, you agree to the Lykaa Realty Enterprise terms of service. Unauthorized access is strictly prohibited.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
