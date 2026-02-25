"use client";

import { useUserRole, Role } from "@/hooks/useUserRole";
import { ReactNode } from "react";
import { Loader2 } from "lucide-react";

export function RoleProtect({
    children,
    fallback = null,
    allowedRoles = ["admin", "super admin"],
}: {
    children: ReactNode;
    fallback?: ReactNode;
    allowedRoles?: Role[];
}) {
    const { role, loading } = useUserRole();

    if (loading) {
        return (
            <div className="w-full h-full min-h-[50vh] flex justify-center items-center">
                <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
            </div>
        );
    }

    if (!role || !allowedRoles.includes(role)) {
        return fallback;
    }

    return <>{children}</>;
}
