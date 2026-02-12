"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Instagram, Twitter, Linkedin } from "lucide-react";

// --- Components ---

const SocialLink = ({ icon: Icon, href }: { icon: any; href: string }) => (
    <motion.a
        href={href}
        whileHover={{ scale: 1.1, color: "#f08a8a" }}
        whileTap={{ scale: 0.95 }}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-black/10 bg-white/20 backdrop-blur-md hover:bg-white/50 transition-colors"
    >
        <Icon size={16} />
    </motion.a>
);

const GlassInput = ({ label, type = "text", placeholder, rows }: { label: string, type?: string, placeholder: string, rows?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-2"
    >
        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-1">
            {label}
        </label>
        {rows ? (
            <textarea
                rows={rows}
                placeholder={placeholder}
                className="w-full bg-white/40 backdrop-blur-md border border-white/50 rounded-lg p-4 text-sm text-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f08a8a]/50 focus:bg-white/60 transition-all resize-none shadow-sm"
            />
        ) : (
            <input
                type={type}
                placeholder={placeholder}
                className="w-full bg-white/40 backdrop-blur-md border border-white/50 rounded-lg h-12 px-4 text-sm text-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f08a8a]/50 focus:bg-white/60 transition-all shadow-sm"
            />
        )}
    </motion.div>
);

export default function ContactPage() {
    return (
        <main className="min-h-screen relative bg-[#fdf2f2] text-[#1a1a1a] font-sans overflow-hidden flex items-center justify-center py-20 px-4">

            {/* --- Ambient Background Animations --- */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Large Pink Orb (Top Left) */}
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] bg-[#f08a8a] rounded-full opacity-20 blur-[100px]"
                />
                {/* Smaller Rose Orb (Bottom Right) */}
                <motion.div
                    animate={{
                        x: [0, -30, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-[10%] -right-[10%] w-[500px] h-[500px] bg-rose-300 rounded-full opacity-20 blur-[120px]"
                />

                {/* Floating Petals */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-3 h-3 bg-pink-300/40 rounded-full blur-[1px]"
                        animate={{
                            y: [0, 800],
                            x: [0, Math.sin(i) * 100],
                            rotate: [0, 360],
                            opacity: [0, 0.8, 0]
                        }}
                        transition={{
                            duration: 15 + i * 2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 2,
                        }}
                        style={{
                            left: `${15 + i * 15}%`,
                            top: -50
                        }}
                    />
                ))}
            </div>

            {/* --- Main Glass Container --- */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-5xl bg-white/20 backdrop-blur-2xl border border-white/60 shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-5"
            >

                {/* Left Side: Info & Context */}
                <div className="lg:col-span-2 p-10 flex flex-col justify-between bg-white/10 backdrop-blur-sm border-b lg:border-b-0 lg:border-r border-white/20 relative overflow-hidden">
                    {/* Decor */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/40 to-transparent rounded-bl-[100px] z-0 pointer-events-none" />

                    <div className="relative z-10">
                        <h1 className="text-5xl font-serif mb-6 text-[#1a1a1a]">
                            Let's <br />
                            <span className="italic text-[#f08a8a]">Talk.</span>
                        </h1>
                        <p className="text-sm text-gray-600 leading-relaxed mb-8">
                            Whether you're looking to collaborate on a new project or just want to say konnichiwa, my inbox is always open.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm text-gray-700">
                                <Mail size={16} className="text-[#f08a8a]" />
                                <span>hello@sakura.design</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-700">
                                <MapPin size={16} className="text-[#f08a8a]" />
                                <span>Kyoto, Japan</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 mt-12">
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-4">Follow Me</p>
                        <div className="flex gap-3">
                            <SocialLink icon={Twitter} href="#" />
                            <SocialLink icon={Instagram} href="#" />
                            <SocialLink icon={Linkedin} href="#" />
                        </div>
                    </div>
                </div>

                {/* Right Side: The Form */}
                <div className="lg:col-span-3 p-10 lg:p-14 bg-white/5">
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <GlassInput label="First Name" placeholder="Kaori" />
                            <GlassInput label="Last Name" placeholder="Miyazono" />
                        </div>

                        <GlassInput label="Email Address" type="email" placeholder="kaori@example.com" />

                        <GlassInput label="Message" rows={4} placeholder="Tell me about your project..." />

                        <div className="pt-4 flex justify-end">
                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: "#f08a8a", color: "#1a1a1a" }}
                                whileTap={{ scale: 0.98 }}
                                className="group flex items-center gap-3 bg-[#1a1a1a] text-white px-8 py-4 rounded-lg text-xs uppercase tracking-widest font-bold shadow-lg shadow-black/5 transition-all duration-300"
                            >
                                <span>Send Message</span>
                                <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </motion.button>
                        </div>
                    </form>
                </div>

            </motion.div>

            {/* Decorative Text Behind */}
            <h2 className="fixed bottom-0 right-0 text-[15vw] leading-none font-serif text-[#1a1a1a] opacity-[0.03] pointer-events-none select-none z-0">
                Contact
            </h2>

        </main>
    );
}