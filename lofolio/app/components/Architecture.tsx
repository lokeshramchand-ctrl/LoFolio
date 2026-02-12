"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

// --- Data ---
const collectionItems = [
    {
        id: 1,
        title: "Velar",
        category: "Fintech System",
        year: "2024",
        image: "https://images.unsplash.com/photo-1490750967868-58cb75069ed6?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: 2,
        title: "Fortyl",
        category: "Authentication Layer",
        year: "2025",
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: 3,
        title: "MapLayer",
        category: "Geospatial Engine",
        year: "2025",
        image: "https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: 4,
        title: "SupplySentinel",
        category: "AI Risk Detection",
        year: "2026",
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600",
    },
];

// --- Components ---

const Card = ({ item, index }: { item: any; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
            whileHover={{ y: -10 }}
            className="group relative w-full aspect-[3/4] cursor-pointer"
        >
            {/* Image Container with Parallax-like Zoom on Hover */}
            <div className="relative w-full h-full overflow-hidden bg-gray-200">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10" />
                <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                    whileHover={{ scale: 1.1 }}
                />

                {/* Floating Tag */}
                <div className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-widest border border-white/40">
                    {item.category}
                </div>
            </div>

            {/* Content Below */}
            <div className="mt-4 flex justify-between items-start border-t border-black/10 pt-4">
                <div>
                    <h3 className="text-2xl font-serif text-[#1a1a1a] group-hover:italic transition-all duration-300">
                        {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                        Shipped  {item.year}
                    </p>
                </div>
                <div className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-[#1a1a1a] group-hover:text-white transition-colors duration-300">
                    <ArrowUpRight size={14} />
                </div>
            </div>
        </motion.div>
    );
};

export default function GalleryPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <main ref={containerRef} className="min-h-screen bg-[#f9f5f1] text-[#1a1a1a] font-sans selection:bg-[#f08a8a] selection:text-white overflow-hidden">

            {/* Decorative Background Elements */}
            <div className="fixed inset-0 pointer-events-none opacity-40 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-pink-100 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-rose-50 rounded-full blur-[100px]" />
            </div>

            {/* Header Section */}
            <section className="relative z-10 pt-32 pb-20 px-6 md:px-12 border-b border-black/5">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-10"
                >
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
                            Curated Selection
                        </p>
                        <h1 className="text-7xl md:text-9xl font-serif leading-[0.9] -ml-2">
                            Work
                            <br /> <span className="italic ml-16 text-[#f08a8a]">Poetry</span>
                        </h1>
                    </div>
                    <div className="md:w-1/3">
                        <p className="text-sm leading-relaxed text-gray-600 mb-8">
                            Each project represents a production-grade system.
                            Designed with performance in mind.
                            Built with scalability as a constraint.
                            Engineered to survive real users.
                        </p>
                        <button className="group flex items-center gap-4 text-xs uppercase tracking-widest border-b border-black pb-1 hover:text-[#f08a8a] hover:border-[#f08a8a] transition-all">
                            Explore Architecture
                            <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* Gallery Grid */}
            <section className="relative z-10 px-6 md:px-12 py-24 max-w-8xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
                    {collectionItems.map((item, index) => (
                        <div key={item.id} className={index % 2 === 1 ? "md:mt-24" : ""}>
                            {/* Staggered layout helper: pushes every 2nd item down */}
                            <Card item={item} index={index} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer / CTA Area */}
            <section className="relative z-10 py-32 border-t border-black/5 flex justify-center items-center">
                <motion.div
                    style={{ y }}
                    className="text-center space-y-6"
                >
                    <h2 className="text-4xl md:text-6xl font-serif">
                        Let's create together
                    </h2>
                    <div className="h-px w-24 bg-black/20 mx-auto" />
                    <p className="text-xs uppercase tracking-widest text-gray-500">
                        Get in touch for collaborations
                    </p>
                </motion.div>
            </section>

        </main>
    );
}