"use client";

import { Button, Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black text-gray-100">
      {/* --- Glow Background --- */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-200px] left-[-100px] h-[600px] w-[600px] rounded-full bg-[#48cae4] blur-[160px] opacity-30"></div>
        <div className="absolute bottom-[-200px] right-[-150px] h-[600px] w-[600px] rounded-full bg-[#ffd500] blur-[160px] opacity-25"></div>
      </div>

      {/* --- Hero Section --- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 text-center space-y-6 px-6"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#48cae4] to-[#ffd500] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          Build. Launch. Scale.
        </h1>
        <p className="max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed">
          Supercharge your Next.js app with <span className="text-[#48cae4]">HeroUI</span> —  
          beautiful, accessible, and composable components built on Tailwind v4.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <Button
            color="primary"
            size="lg"
            className="bg-[#48cae4] text-black font-semibold hover:opacity-90 transition-all"
          >
            Get Started
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="border border-gray-700 text-gray-300 hover:bg-gray-800/40"
          >
            View Docs
          </Button>
        </div>
      </motion.div>

      {/* --- Feature Card --- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="mt-24 z-10"
      >
        <Card className="backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl w-[90vw] max-w-4xl">
          <CardBody className="flex flex-col md:flex-row items-center justify-between p-8 gap-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-[#48cae4]">Developer-First Design</h2>
              <p className="text-gray-400 max-w-md">
                Built for modern frameworks with powerful dark mode support,
                smooth animations, and Tailwind-first customization.
              </p>
            </div>
            <Button
              color="secondary"
              size="lg"
              className="bg-[#ffd500] text-black font-bold hover:opacity-90 transition-all"
            >
              Explore Components
            </Button>
          </CardBody>
        </Card>
      </motion.div>

      {/* --- Footer --- */}
      <footer className="mt-24 pb-8 text-gray-600 text-sm text-center">
        © {new Date().getFullYear()} HeroUI Labs — Made with 💙 for modern web developers.
      </footer>
    </main>
  );
}
