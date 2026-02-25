import React from 'react';
import Link from 'next/link';

export function LogoSVG({ className = "w-10 h-10" }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 20 L48 35 V80 H32 V50 L20 45 V20 Z" fill="#CBA052" />
            <path d="M58 45 L78 55 V80 H62 V65 L58 63 V45 Z" fill="#CBA052" />
        </svg>
    );
}

export function Logo({ collapsed = false, className = "" }: { collapsed?: boolean; className?: string }) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <LogoSVG className={collapsed ? "w-8 h-8" : "w-10 h-10"} />
            {!collapsed && (
                <div className="flex flex-col justify-center">
                    <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white leading-none mb-0.5">Lyka</span>
                    <span className="text-[10px] font-medium tracking-[0.25em] text-[#CBA052] leading-none uppercase">Realty</span>
                </div>
            )}
        </div>
    );
}
