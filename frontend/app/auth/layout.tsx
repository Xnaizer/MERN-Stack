import type { Metadata } from "next";
import type { ReactNode } from "react";

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
    <section className="max-w-screen-3xl 3xl:container">
        {children}
    </section>
  )
}
