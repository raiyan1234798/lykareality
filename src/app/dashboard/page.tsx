"use client";

import { useUserRole } from "@/hooks/useUserRole";
import AdminDashboard from "./admin_dashboard";
import UserDashboard from "./user_dashboard";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
    const { isAdmin, loading, role } = useUserRole();

    if (loading) {
        return (
            <div className="w-full h-full min-h-[50vh] flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-violet-500 mb-4" />
                <p className="text-sm text-slate-500 font-medium">Validating credentials...</p>
            </div>
        );
    }

    // Role-based dashboard split
    if (isAdmin) {
        return <AdminDashboard />;
    }

    return <UserDashboard />;
}
