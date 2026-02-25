"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-blue-950"
                >
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.8))]" />

                    <motion.div
                        className="relative z-10 flex flex-col items-center justify-center gap-6"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            className="w-20 h-20 bg-gold-500 rounded-lg flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.4)]"
                            animate={{ rotate: [0, 45, 90], scale: [1, 1.1, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <span className="text-blue-950 font-serif text-4xl font-bold" style={{ transform: "rotate(-45deg)" }}>L</span>
                        </motion.div>

                        <motion.div className="flex gap-2 items-center text-gold-500 font-medium tracking-widest text-sm uppercase">
                            Initializing Academy
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 1.2, delay: 0 }}
                            >.</motion.span>
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
                            >.</motion.span>
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}
                            >.</motion.span>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
