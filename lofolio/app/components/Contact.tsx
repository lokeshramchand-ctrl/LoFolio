"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Copy, Mail, MapPin } from "lucide-react";

// --- Utility Components ---

/**
 * Adds a film grain texture to the whole page for that "Editorial/Print" look.
 */
const NoiseTexture = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay">
    <svg className="w-full h-full">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

const AnimatedLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="overflow-hidden relative">
    <motion.div
      initial={{ y: "100%" }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Custom "Apple-like" ease
    >
      {children}
    </motion.div>
  </div>
);

const MinimalInput = ({ label, placeholder, type = "text", isTextArea = false }: any) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="group relative pt-6 pb-2">
      <label className={`absolute left-0 transition-all duration-300 ${focused || placeholder ? 'top-0 text-[10px] ns-accent tracking-widest uppercase' : 'top-6 text-xl ns-text-muted font-serif'}`}>
        {label}
      </label>
      
      {isTextArea ? (
         <textarea
         rows={3}
         onFocus={() => setFocused(true)}
         onBlur={(e) => setFocused(e.target.value !== "")}
         className="ns-input text-lg transition-colors resize-none placeholder-transparent"
         placeholder=" " // Trick to handle label animation
       />
      ) : (
        <input
          type={type}
          onFocus={() => setFocused(true)}
          onBlur={(e) => setFocused(e.target.value !== "")}
          className="ns-input text-lg transition-colors placeholder-transparent"
          placeholder=" "
        />
      )}
    </div>
  );
};

export default function ModernContact() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <main className="ns-page min-h-screen font-sans relative overflow-hidden">
      <NoiseTexture />

      {/* --- Ambient Gradients (The Sakura Soul) --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], x: [0, 30, 0], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[140px] opacity-40 translate-x-1/2 -translate-y-1/2 ns-hero-glow"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, -20, 0], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-40 -translate-x-1/3 translate-y-1/3 ns-glow-blob"
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 min-h-screen items-center">
        
        {/* --- LEFT: The "Hook" --- */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-12">
          
          {/* Brand / Nav */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="flex items-center gap-2"
          >
             <div className="w-3 h-3 rounded-full animate-pulse ns-accent-bg" />
             <span className="text-xs uppercase tracking-[0.2em] font-bold ns-text-meta">Open to Work</span>
          </motion.div>

          {/* Main Typography */}
          <div className="space-y-2">
            <h1 className="text-7xl md:text-9xl font-serif tracking-tighter leading-[0.85]">
              <AnimatedLabel>Let's</AnimatedLabel>
              <AnimatedLabel><span className="italic ns-accent pr-4">Bloom</span></AnimatedLabel>
              <AnimatedLabel>Together</AnimatedLabel>
            </h1>
          </div>

          {/* Contact Details (High-end list style) */}
          <div className="space-y-6 pt-12">
            <div className="group ns-hover-accent flex items-center justify-between border-t ns-border-subtle py-6 transition-colors cursor-pointer ns-hover-surface">
               <div>
                 <p className="text-[10px] uppercase tracking-widest ns-text-meta mb-1">Direct Email</p>
                 <p className="text-lg font-serif">hello@sakurastudio.com</p>
               </div>
              <Copy size={16} className="ns-text-muted ns-icon-hover transition-colors" />
            </div>

            <div className="group ns-hover-accent flex items-center justify-between border-t ns-border-subtle py-6 transition-colors cursor-pointer ns-hover-surface">
               <div>
                 <p className="text-[10px] uppercase tracking-widest ns-text-meta mb-1">Based In</p>
                 <p className="text-lg font-serif">Kyoto, Japan</p>
               </div>
              <MapPin size={16} className="ns-text-muted ns-icon-hover transition-colors" />
            </div>
          </div>

        </div>

        {/* --- RIGHT: The Modern Form --- */}
        <div className="lg:col-span-7 relative">
          
          {/* Glass Card Container (Refined) */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="ns-glass border ns-border-subtle p-8 md:p-16 rounded-[2rem] ns-shadow-accent relative overflow-hidden"
          >
            
            {/* Glossy highlight effect on the card */}
            <div className="absolute top-0 left-0 w-full h-px ns-divider opacity-60" />

            <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <MinimalInput label="Your Name" />
                 <MinimalInput label="Company" />
              </div>
              <MinimalInput label="Email Address" type="email" />
              <MinimalInput label="Tell us about your project" isTextArea={true} />

              <div className="pt-8 flex justify-between items-center">
                  <div className="hidden md:block text-xs ns-text-meta max-w-[200px] leading-relaxed">
                    By submitting, you agree to our privacy policy and the processing of your data.
                 </div>

                 {/* High-End Magnetic-Style Button */}
                 <motion.button
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    whileTap={{ scale: 0.95 }}
                      className="relative px-10 py-5 rounded-full overflow-hidden group ns-button-primary"
                 >
                    <motion.div 
                      animate={{ y: isHovered ? "-100%" : "0%" }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                       className="absolute inset-0 ns-accent-soft-bg z-0"
                    />
                    <div className="relative z-10 flex items-center gap-3">
                         <span className="uppercase tracking-widest text-xs font-bold ns-button-text transition-colors duration-300">
                         Send Inquiry
                       </span>
                         <ArrowRight size={14} className="ns-button-text group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                 </motion.button>
              </div>
            </form>

          </motion.div>

          {/* Floating Image (Aesthetic touch) */}
          <motion.div 
             initial={{ opacity: 0, rotate: -10 }}
             animate={{ opacity: 1, rotate: 0 }}
             transition={{ delay: 0.8, duration: 1 }}
             className="absolute -top-12 -right-6 w-32 md:w-48 aspect-[3/4] hidden md:block pointer-events-none"
          >
             <div className="p-2 ns-elevated ns-shadow-soft rotate-6 transform transition-transform hover:rotate-0 duration-500 ease-out">
                <img 
                  src="https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&q=80&w=400" 
                  alt="Sakura" 
                  className="w-full h-full object-cover grayscale opacity-80"
                />
             </div>
          </motion.div>

        </div>

      </div>
    </main>
  );
}