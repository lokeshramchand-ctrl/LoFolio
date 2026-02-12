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
    className="flex items-center justify-between border-b border-black/10 py-4 group cursor-pointer hover:bg-white/40 px-2 transition-colors rounded-sm"
  >
    <div className="flex items-center gap-3">
      <Icon size={16} className="text-gray-500 group-hover:text-[#f08a8a] transition-colors" />
      <span className="uppercase text-[10px] tracking-widest text-gray-600">{label}</span>
    </div>
    <span className="font-mono text-sm font-bold group-hover:translate-x-[-5px] transition-transform">{value}</span>
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
    <main className="min-h-screen bg-[#f3f4f6] text-[#1a1a1a] font-sans overflow-hidden flex items-center justify-center relative">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-pink-200/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 h-screen lg:h-auto py-20">

        {/* LEFT COLUMN: ASCII ART */}
        <div className="relative flex justify-center items-center h-full min-h-[400px]">
          {/* Glowing backdrop behind ASCII */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-gradient-to-tr from-white/50 to-transparent rounded-full blur-3xl opacity-60"
          />
          
          <div className="relative z-10 font-mono text-xs sm:text-sm md:text-base leading-[1.1] text-gray-800 whitespace-pre mix-blend-multiply select-none">
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
               className="mt-8 text-center text-[10px] uppercase tracking-widest text-gray-400"
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
              className="h-1 bg-[#1a1a1a] mb-6"
            />
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-6xl md:text-7xl font-serif tracking-tight"
            >
              Open <br /> Source.
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="max-w-md text-sm text-gray-600 leading-relaxed"
            >
              Contributing to the digital commons. We build transparently, collaborate globally, and ship code that matters.
            </motion.p>
          </div>

          {/* Stats / Interactive List */}
          <div className="bg-white/30 backdrop-blur-md border border-white/50 p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-xs uppercase tracking-widest text-gray-500">
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
            className="group flex items-center justify-between w-full md:w-auto bg-[#1a1a1a] text-white px-8 py-4 text-xs uppercase tracking-widest hover:bg-[#f08a8a] hover:text-black transition-colors duration-300"
          >
            <span>View Profile</span>
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
          </motion.a>

        </div>
      </div>
    </main>
  );
}