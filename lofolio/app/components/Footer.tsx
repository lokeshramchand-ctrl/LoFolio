"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Heart } from "lucide-react";

// --- Components ---

/**
 * Infinite Scrolling Marquee
 */
const Marquee = () => {
  return (
    <div className="relative flex overflow-hidden border-y border-black/5 py-4 bg-white/50 backdrop-blur-sm">
      <motion.div
        className="flex whitespace-nowrap gap-12"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 text-xs font-bold tracking-[0.3em] uppercase text-gray-400">
            <span>Digital Craftsmanship</span>
            <span className="text-[#f08a8a]">●</span>
            <span>Tokyo • Kyoto • Osaka</span>
            <span className="text-[#f08a8a]">●</span>
            <span>Est. 2024</span>
            <span className="text-[#f08a8a]">●</span>
          </div>
        ))}
      </motion.div>
      {/* Fade Edges */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#fffbfb] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#fffbfb] to-transparent z-10" />
    </div>
  );
};

/**
 * A "Theory" Card showing the Design System
 */
const DesignTheoryCard = () => (
  <div className="bg-white/40 border border-white/60 p-6 backdrop-blur-md rounded-lg space-y-4">
    <h4 className="text-[10px] uppercase tracking-widest text-gray-500 border-b border-black/5 pb-2">
      Design System v1.0
    </h4>
    
    {/* Typography Theory */}
    <div className="flex justify-between items-center text-xs text-gray-600">
      <span>Aa</span>
      <span className="font-serif italic">Playfair Display</span>
    </div>
    
    {/* Color Theory Swatches */}
    <div className="space-y-2 pt-2">
      <div className="flex items-center justify-between text-[10px] text-gray-400">
        <span>Pri.</span>
        <div className="flex gap-2">
          <div className="w-4 h-4 rounded-full bg-[#1a1a1a]" title="#1a1a1a" />
          <span className="font-mono">#1A1A1A</span>
        </div>
      </div>
      <div className="flex items-center justify-between text-[10px] text-gray-400">
        <span>Acc.</span>
        <div className="flex gap-2">
          <div className="w-4 h-4 rounded-full bg-[#f08a8a]" title="#f08a8a" />
          <span className="font-mono">#F08A8A</span>
        </div>
      </div>
    </div>
  </div>
);

const FooterLink = ({ href, text }: { href: string; text: string }) => (
  <motion.a
    href={href}
    className="group flex items-center justify-between py-3 border-b border-black/5 text-sm hover:text-[#f08a8a] transition-colors"
    whileHover={{ x: 10 }}
  >
    <span className="uppercase tracking-wide">{text}</span>
    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.a>
);

export default function Footer() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <footer ref={containerRef} className="bg-[#fffbfb] text-[#1a1a1a] relative overflow-hidden pt-20">
      
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
      />

      <Marquee />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
          
          {/* Column 1: Mission */}
          <div className="space-y-6">
            <div className="w-8 h-8 bg-[#f08a8a] rounded-full blur-sm opacity-80" />
            <p className="text-sm leading-relaxed text-gray-500 font-serif">
              "Good design is like a refrigerator—when it works, no one notices, but when it doesn't, it sure stinks." <br />
              <span className="text-xs not-italic mt-2 block opacity-50">— Irene Au</span>
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Sitemap</h4>
            <FooterLink href="#" text="Works" />
            <FooterLink href="#" text="Agency" />
            <FooterLink href="#" text="The Studio" />
            <FooterLink href="#" text="Journal" />
          </div>

          {/* Column 3: Socials */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Connect</h4>
            <FooterLink href="#" text="Instagram" />
            <FooterLink href="#" text="Twitter / X" />
            <FooterLink href="#" text="LinkedIn" />
            <FooterLink href="#" text="Email" />
          </div>

          {/* Column 4: Design Theory (The Meta Part) */}
          <div className="space-y-4">
            <DesignTheoryCard />
            <div className="text-[10px] text-gray-400 text-center uppercase tracking-widest">
              Built on Next.js 14 • Tailwind • Framer
            </div>
          </div>
        </div>

        {/* --- MASSIVE BRAND TEXT --- */}
        <motion.div 
          style={{ y, opacity }}
          className="border-t border-black/10 mt-20 pt-10 flex flex-col items-center justify-center"
        >
          <h1 className="text-[15vw] md:text-[18vw] leading-none font-serif tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#1a1a1a] to-gray-400 select-none">
            SAKURA
          </h1>
          
          <div className="flex justify-between w-full text-[10px] uppercase tracking-widest text-gray-400 mt-4 px-2">
             <span>© 2024 All Rights Reserved</span>
             <span className="flex items-center gap-1">Made with <Heart size={10} className="text-[#f08a8a] fill-[#f08a8a]" /> in Kyoto</span>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}