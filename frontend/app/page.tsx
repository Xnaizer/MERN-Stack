"use client";

import { Button } from "@heroui/react";
import PageHead from "./components/commons/PageHead";


export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black text-gray-100">
      <div>
        <PageHead title="Home | MernApp" />
        <Button>Click Me!</Button>
      </div>
      <footer className="mt-24 pb-8 text-gray-600 text-sm text-center">
        © {new Date().getFullYear()} HeroUI Labs — Made with 💙 for modern web developers.
      </footer>
    </main>
  );
}
