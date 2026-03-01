"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-50 dark:bg-slate-950 backdrop-blur-sm">
            <motion.div
                className="relative flex flex-col items-center justify-center gap-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    className="w-16 h-16 border-4 border-slate-200 dark:border-white/10 rounded-full border-t-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                    }}
                />
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-slate-600 dark:text-violet-400 font-medium tracking-widest text-sm uppercase"
                >
                    Loading
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
                    >.</motion.span>
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                    >.</motion.span>
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
                    >.</motion.span>
                </motion.p>
            </motion.div>
        </div>
    );
}
