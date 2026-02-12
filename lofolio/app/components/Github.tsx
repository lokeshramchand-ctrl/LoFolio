"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, ArrowRight, Star, GitBranch, Terminal } from "lucide-react";

// --- ASCII Art Constant ---
const GITHUB_ASCII = `


                     


`;

// --- Components ---

const StatRow = ({ label, value, icon: Icon, delay }: { label: string, value: string, icon: any, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="ns-stat-row flex items-center justify-between border-b ns-border-subtle py-4 group cursor-pointer px-2 transition-colors rounded-sm ns-hover-surface"
    >
        <div className="flex items-center gap-3">
            <Icon size={16} className="ns-stat-icon ns-text-muted transition-colors" />
            <span className="uppercase text-[10px] tracking-widest ns-text-meta">{label}</span>
        </div>
        <span className="font-mono text-sm font-bold ns-text-secondary group-hover:translate-x-[-5px] transition-transform">{value}</span>
    </motion.div>
);

export default function CodePage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Split ASCII into lines for animation
    const asciiLines = GITHUB_ASCII.trim().split("\n");

    return (
        <main className="ns-page min-h-screen font-sans overflow-hidden flex items-center justify-center relative">
            {/* Background Gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full blur-[140px] ns-glow-blob opacity-70" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] ns-glow-blob opacity-50" />
            </div>

            <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 h-screen lg:h-auto py-20">

                {/* LEFT COLUMN: ASCII ART */}
                <div className="relative flex justify-center items-center h-full min-h-[400px]">
                    {/* Glowing backdrop behind ASCII */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 ns-hero-glow rounded-full blur-3xl opacity-70"
                    />

                    <div className="relative z-10 font-mono text-xs sm:text-sm md:text-base leading-[1.1] ns-text-secondary whitespace-pre mix-blend-screen select-none">
                        {asciiLines.map((line, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    delay: i * 0.05, // Typing effect speed
                                    duration: 0.3
                                }}
                            >
                                {line}
                            </motion.div>
                        ))}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className="mt-8 text-center text-[10px] uppercase tracking-widest ns-text-meta"
                        >
              // illustration.txt
                        </motion.div>
                    </div>
                </div>

                {/* RIGHT COLUMN: CONTENT */}
                <div className="space-y-10">

                    {/* Header */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "40px" }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="h-1 mb-6 ns-accent-bar"
                        />
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-6xl md:text-7xl font-serif tracking-tight ns-text-primary"
                        >
                            Open <br /> Source.
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="max-w-md text-sm ns-text-secondary leading-relaxed"
                        >
                            Contributing to the digital commons. We build transparently, collaborate globally, and ship code that matters.
                        </motion.p>
                    </div>

                    {/* Stats / Interactive List */}
                    <div className="ns-glass border ns-border-subtle p-6 rounded-lg ns-shadow-soft">
                        <div className="flex items-center gap-2 mb-6 text-xs uppercase tracking-widest ns-text-meta">
                            <Terminal size={12} />
                            <span>System Status</span>
                        </div>

                        <div className="space-y-1">
                            <StatRow label="Repositories" value="42" icon={Github} delay={0.8} />
                            <StatRow label="Contributions" value="1,204" icon={GitBranch} delay={0.9} />
                            <StatRow label="Stars Earned" value="8.5k" icon={Star} delay={1.0} />
                        </div>
                    </div>

                    {/* CTA Button */}
                    <motion.a
                        href="https://github.com"
                        target="_blank"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group flex items-center justify-between w-full md:w-auto px-8 py-4 text-xs uppercase tracking-widest transition-colors duration-300 ns-button-primary"
                    >
                        <span>View Profile</span>
                        <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
                    </motion.a>

                </div>
            </div>
        </main>
    );
}