"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovering over interactive elements
            if (
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button") ||
                target.closest("input") ||
                target.closest("select") ||
                target.closest("textarea")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);
        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.body.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [isVisible]);

    if (!isMounted) return null;

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 1,
            backgroundColor: "transparent",
            border: "2px solid rgba(139, 92, 246, 0.5)", // violet-500
        },
        hover: {
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            scale: 1.5,
            backgroundColor: "rgba(139, 92, 246, 0.1)",
            border: "2px solid rgba(139, 92, 246, 0.8)",
        },
        click: {
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            scale: 0.8,
            backgroundColor: "rgba(139, 92, 246, 0.3)",
            border: "2px solid rgba(139, 92, 246, 1)",
        }
    };

    const dotVariants = {
        default: {
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            scale: 1,
            opacity: 1,
        },
        hover: {
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            scale: 0,
            opacity: 0,
        }
    };

    return (
        <div className={`pointer-events-none fixed inset-0 z-[100] overflow-hidden transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            {/* Outer Circle */}
            <motion.div
                className="absolute left-0 top-0 w-8 h-8 rounded-full pointer-events-none mix-blend-difference z-[100]"
                variants={variants}
                animate={isClicking ? "click" : isHovering ? "hover" : "default"}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.6,
                }}
            />
            {/* Inner Dot */}
            <motion.div
                className="absolute left-0 top-0 w-2 h-2 rounded-full bg-violet-500 pointer-events-none mix-blend-difference z-[100]"
                variants={dotVariants}
                animate={isHovering ? "hover" : "default"}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    mass: 0.2,
                }}
            />
        </div>
    );
}
