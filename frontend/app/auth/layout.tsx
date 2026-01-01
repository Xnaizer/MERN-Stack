import type { Metadata } from "next";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export const metadata: Metadata = {
  title: {
    template: "%s | MERN App Auth",
    default: "Auth",
  },
  description: "Authentication pages",
};

interface IAuthLayout {
    children: ReactNode;
}

export default function AuthLayout({ children }: IAuthLayout) {
  return (
    <section 
      // className="max-w-screen-3xl 3xl:container "
      className={`${cn("flex min-h-screen min-w-full flex-col items-center justify-center gap-10 py-10 lg:py-0"
            )} antialiased`}
    >
        {children}
    </section>
  )
}
