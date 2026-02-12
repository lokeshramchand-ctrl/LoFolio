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
    <div className="relative flex overflow-hidden border-y ns-border-subtle py-4 ns-glass">
      <motion.div
        className="flex whitespace-nowrap gap-12"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 text-xs font-bold tracking-[0.3em] uppercase ns-text-meta">
            <span>Digital Craftsmanship</span>
            <span className="ns-accent">●</span>
            <span>Tokyo • Kyoto • Osaka</span>
            <span className="ns-accent">●</span>
            <span>Est. 2024</span>
            <span className="ns-accent">●</span>
          </div>
        ))}
      </motion.div>
      {/* Fade Edges */}
      <div
        className="absolute inset-y-0 left-0 w-20 z-10"
        style={{ background: "linear-gradient(to right, var(--ns-bg-primary), transparent)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-20 z-10"
        style={{ background: "linear-gradient(to left, var(--ns-bg-primary), transparent)" }}
      />
    </div>
  );
};

/**
 * A "Theory" Card showing the Design System
 */
const DesignTheoryCard = () => (
  <div className="ns-glass border ns-border-subtle p-6 rounded-lg space-y-4">
    <h4 className="text-[10px] uppercase tracking-widest ns-text-meta border-b ns-border-subtle pb-2">
      Design System v1.0
    </h4>
    
    {/* Typography Theory */}
    <div className="flex justify-between items-center text-xs ns-text-secondary">
      <span>Aa</span>
      <span className="font-serif italic">Playfair Display</span>
    </div>
    
    {/* Color Theory Swatches */}
    <div className="space-y-2 pt-2">
      <div className="flex items-center justify-between text-[10px] ns-text-muted">
        <span>Pri.</span>
        <div className="flex gap-2">
          <div className="w-4 h-4 rounded-full ns-bg-primary" title="#0B0B0F" />
          <span className="font-mono">#0B0B0F</span>
        </div>
      </div>
      <div className="flex items-center justify-between text-[10px] ns-text-muted">
        <span>Acc.</span>
        <div className="flex gap-2">
          <div className="w-4 h-4 rounded-full ns-accent-bg" title="#F472B6" />
          <span className="font-mono">#F472B6</span>
        </div>
      </div>
    </div>
  </div>
);

const FooterLink = ({ href, text }: { href: string; text: string }) => (
  <motion.a
    href={href}
    className="group flex items-center justify-between py-3 border-b ns-border-subtle text-sm ns-text-secondary hover:text-[var(--ns-accent-primary)] transition-colors"
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
    <footer ref={containerRef} className="ns-footer ns-text-primary relative overflow-hidden pt-20">
      
      {/* Subtle Texture */}
      <div
        className="absolute inset-0 z-0 opacity-[0.08]"
        style={{ backgroundImage: "radial-gradient(rgba(244,114,182,0.18) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <Marquee />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
          
          {/* Column 1: Mission */}
          <div className="space-y-6">
            <div className="w-8 h-8 ns-accent-bg rounded-full blur-sm opacity-60" />
            <p className="text-sm leading-relaxed ns-text-secondary font-serif">
              "Good design is like a refrigerator—when it works, no one notices, but when it doesn't, it sure stinks." <br />
              <span className="text-xs not-italic mt-2 block opacity-60 ns-text-muted">— Irene Au</span>
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6 ns-text-primary">Sitemap</h4>
            <FooterLink href="#" text="Works" />
            <FooterLink href="#" text="Agency" />
            <FooterLink href="#" text="The Studio" />
            <FooterLink href="#" text="Journal" />
          </div>

          {/* Column 3: Socials */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6 ns-text-primary">Connect</h4>
            <FooterLink href="#" text="Instagram" />
            <FooterLink href="#" text="Twitter / X" />
            <FooterLink href="#" text="LinkedIn" />
            <FooterLink href="#" text="Email" />
          </div>

          {/* Column 4: Design Theory (The Meta Part) */}
          <div className="space-y-4">
            <DesignTheoryCard />
            <div className="text-[10px] ns-text-meta text-center uppercase tracking-widest">
              Built on Next.js 14 • Tailwind • Framer
            </div>
          </div>
        </div>

        {/* --- MASSIVE BRAND TEXT --- */}
        <motion.div 
          style={{ y, opacity }}
          className="border-t ns-border-subtle mt-20 pt-10 flex flex-col items-center justify-center"
        >
          <h1
            className="text-[15vw] md:text-[18vw] leading-none font-serif tracking-tighter text-transparent bg-clip-text select-none"
            style={{ backgroundImage: "linear-gradient(to bottom, var(--ns-text-primary), var(--ns-text-muted))" }}
          >
            SAKURA
          </h1>
          
          <div className="flex justify-between w-full text-[10px] uppercase tracking-widest ns-text-meta mt-4 px-2">
             <span>© 2024 All Rights Reserved</span>
             <span className="flex items-center gap-1">
               Made with <Heart size={10} style={{ color: "var(--ns-accent-primary)", fill: "var(--ns-accent-primary)" }} /> in Kyoto
             </span>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}