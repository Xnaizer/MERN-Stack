'use client'
import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { ReactNode } from "react";

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

export function Providers({ children, session }: ProvidersProps) {
    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                <HeroUIProvider>
                    {children}
                </HeroUIProvider>
            </QueryClientProvider>
        </SessionProvider>
    )
}



