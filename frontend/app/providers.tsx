'use client'
import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import type { Session } from "next-auth";
import { ReactNode, useEffect } from "react";
import { ISessionExtended } from "@/types/Auth";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false
        }
    }
})

type ProvidersProps = {
    children: ReactNode;
    session?: Session | null;
}

const getJwtExpMs = (token: string) => {
    const parts = token.split(".");
    if (parts.length < 2) return null;

    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");

    try {
        const json = JSON.parse(atob(payload));
        if (typeof json.exp !== "number") return null;
        return json.exp * 1000;
    } catch {
        return null;
    }
};

const SessionExpiryWatcher = () => {
    const { data } = useSession();

    useEffect(() => {
        const accessToken = (data as ISessionExtended | null)?.accessToken;
        if (!accessToken) return;

        const expiresAt = getJwtExpMs(accessToken);
        if (!expiresAt) return;

        const remainingMs = expiresAt - Date.now();
        if (remainingMs <= 0) {
            signOut({ callbackUrl: "/auth/login" });
            return;
        }

        const timeoutId = setTimeout(() => {
            signOut({ callbackUrl: "/auth/login" });
        }, remainingMs);

        return () => clearTimeout(timeoutId);
    }, [data]);

    return null;
};

export function Providers({ children, session }: ProvidersProps) {
    return (
        <SessionProvider session={session}>
            <Toaster />
            <SessionExpiryWatcher />
            <QueryClientProvider client={queryClient}>
                <HeroUIProvider>
                    {children}
                </HeroUIProvider>
            </QueryClientProvider>
        </SessionProvider>
    )
}




