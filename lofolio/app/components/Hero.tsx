"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Menu } from "lucide-react";

// --- Navbar ---

const Navbar = () => (
  <nav className="flex justify-between items-center px-8 py-6 uppercase text-[10px] tracking-widest font-bold ns-text-secondary">
    <div className="flex gap-12 items-center">
      <span className="text-sm font-black ns-text-primary">Lokesh.</span>
      <a href="#work" className="hover:opacity-70 transition-opacity">Work</a>
      <a href="#architecture" className="hover:opacity-70 transition-opacity">Architecture</a>
    </div>
    <div className="flex gap-12 items-center">
      <a href="#resume" className="hover:opacity-70 transition-opacity">
        Resume
      </a>
      <Menu size={18} className="cursor-pointer" />
    </div>
  </nav>
);

export default function SakuraHero() {
  return (
    <main className="ns-page relative min-h-screen w-full overflow-hidden font-sans">
      <Navbar />

      {/* Blurred Sun Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full ns-accent-core" />
          <div className="absolute inset-0 rounded-full ns-glass border ns-border-subtle ns-shadow-soft" />
          <div className="absolute inset-0 ns-hero-glow rounded-full opacity-70" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 grid grid-cols-12 items-center pt-12">

        {/* Left Column */}
        <div className="col-span-3 relative">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative z-20"
          >
            <h1 className="text-8xl font-serif absolute -top-10 -left-4 leading-none ns-accent">
              設計
            </h1>

            <div className="w-full aspect-[2/3] ns-surface overflow-hidden border border-2 ns-border-subtle ns-shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&q=80&w=800"
                alt="Project preview"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Center Column */}
        <div className="col-span-6 flex justify-center items-end pb-20">
          <motion.h2
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[10rem] font-serif tracking-tighter leading-none select-none ns-text-primary"
          >
            Precision
          </motion.h2>
        </div>

        {/* Right Column */}
        <div className="col-span-3 space-y-12">
          <motion.p
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-[11px] leading-relaxed uppercase tracking-wider ns-text-muted max-w-[220px]"
          >
            Full-stack engineering focused on distributed systems,
            performance optimization, and production-grade architecture.
            I build platforms designed to scale — quietly and reliably.
          </motion.p>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1 }}
            className="w-40 h-40 ns-elevated p-2 ns-shadow-soft rotate-3 self-end"
          >
            <img
              src="https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&q=80&w=800"
              alt="Architecture"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Floating Petal System (Refined) */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 rounded-full opacity-20 blur-sm pointer-events-none ns-glow-blob"
          animate={{
            y: [0, 700],
            x: [0, (i % 2 === 0 ? 60 : -60)],
            rotate: [0, 360],
          }}
          transition={{
            duration: 14 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2,
          }}
          style={{
            top: "-20px",
            left: `${10 + i * 20}%`,
          }}
        />
      ))}
    </main>
  );
}
