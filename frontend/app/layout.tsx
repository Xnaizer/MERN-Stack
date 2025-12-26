import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { cn } from "@/utils/cn";

export const metadata: Metadata = {
  icons: {
    icon: '/images/general/logo.svg'
  },
  title: {
    default: "MERN Stack",
    template: "%s | MERN Stack",
  },
  description: "MERN Stack",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"]
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cn(
        inter.className,
        "flex min-h-screen min-w-full flex-col items-center justify-center gap-10 py-10 lg:py-0"
      )} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
