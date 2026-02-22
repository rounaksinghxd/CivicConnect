"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const role = sessionStorage.getItem("civic_role");
        if (role === "admin") {
            setAuthorized(true);
        } else {
            // Not authorized — redirect to login page
            router.replace("/");
        }
    }, [router]);

    if (!authorized) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center space-y-2">
                    <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-slate-500 text-sm">Verifying access...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
