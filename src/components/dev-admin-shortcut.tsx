"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";

export default function DevAdminShortcut() {
    const router = useRouter();
    const [visible, setVisible] = useState(false);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.ctrlKey && e.shiftKey && e.key === "A") {
            e.preventDefault();
            setVisible(prev => !prev); // toggle
        }
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    if (!visible) return null;

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <button
                onClick={() => {
                    sessionStorage.setItem("civic_role", "admin");
                    sessionStorage.setItem("civic_email", "singhrounak@hotmail.com");
                    setVisible(false);
                    router.push("/admin");
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white shadow-lg cursor-pointer
                           bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all
                           border border-indigo-500 ring-2 ring-indigo-400/50"
            >
                <ShieldCheck className="h-4 w-4" />
                Jump to Admin Panel
            </button>
        </div>
    );
}
