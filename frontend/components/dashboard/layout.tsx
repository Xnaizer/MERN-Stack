"use client"

import { useEffect, useState, type ReactNode } from "react"
import DashboardSidebar from "./Sidebar"
import { SIDEBAR_ADMIN, SIDEBAR_MEMBER } from "./Layout.constant"


interface DashboardLayoutProps {
    type: 'admin' | 'member';
    children: ReactNode;
}

export default function DashboardLayout ({
    children, type
}: DashboardLayoutProps) {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const stored = localStorage.getItem("sidebar");
        if (stored !== null) {
            setIsOpen(stored === "true");
        }
    }, []);

    const handleIsOpen = () => {
        setIsOpen((prev) => {
            const next = !prev;
            localStorage.setItem("sidebar", String(next));
            return next;
        });
    };

    return (
        <div className="max-w-screen-3xl 3xl:container flex">
            <DashboardSidebar 
                sidebarItems={
                    type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_MEMBER 
                }
                isOpen={isOpen}
                onOpen={handleIsOpen}
            />
            <div className="h-screen w-full overflow-y-auto  flex flex-col justify-between px-4 py-6 transition-all">
                {children}
            </div>
        </div>
    )
}
