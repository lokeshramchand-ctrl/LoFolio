'use client';

import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';

const NASA_IMAGE_URL = "https://images-assets.nasa.gov/image/iss029e034092/iss029e034092~orig.jpg";

export default function Hero() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Refs for animation targeting
  const containerRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Elements to stagger fade-in
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initialize Smooth Scroll (Lenis)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Setup GSAP Timelines
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    // Initial State (to prevent FOUC)
    gsap.set([navRef.current, metaRef.current, headingRef.current, subtextRef.current, statusRef.current], { 
      autoAlpha: 0, 
      y: 20 
    });

    // Entrance Animation Sequence
    tl.to(navRef.current, { autoAlpha: 1, y: 0, duration: 1.0 })
      .to(metaRef.current, { autoAlpha: 1, y: 0, duration: 1.0 }, "-=0.8")
      .to(headingRef.current, { autoAlpha: 1, y: 0, duration: 1.0 }, "-=0.9")
      .to(subtextRef.current, { autoAlpha: 1, y: 0, duration: 1.0 }, "-=0.9")
      .to(statusRef.current, { autoAlpha: 1, y: 0, duration: 1.0 }, "-=0.9");

    // Background Infinite Slow Zoom
    gsap.to(bgImageRef.current, {
      scale: 1.05, // Subtle 5% growth
      duration: 30,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut" // Smoothest transition for ambient motion
    });

    // 3. Scroll Logic (Parallax & Nav)
    const handleScroll = (e: any) => {
      const scrollY = e.scroll || window.scrollY; // Lenis event or window

      // Nav State
      if (scrollY > 50 && !isScrolled) setIsScrolled(true);
      if (scrollY <= 50 && isScrolled) setIsScrolled(false);

      // Parallax Effect (Background only)
      // We move the background slowly downwards as we scroll down to create depth
      if (bgImageRef.current) {
        gsap.to(bgImageRef.current, {
          y: scrollY * 0.15, // Slow parallax factor
          overwrite: 'auto',
          duration: 0.1, // Instant reaction
          ease: 'none'
        });
      }
    };

    lenis.on('scroll', handleScroll);

    // Cleanup
    return () => {
      lenis.destroy();
      tl.kill();
    };
  }, []);

  return (
    <section className="hero-container" ref={containerRef}>
      
      {/* Background Layer */}
      <div className="bg-wrapper">
        <div className="bg-image" ref={bgImageRef} />
        <div className="bg-overlay" />
      </div>

      {/* Navigation */}
      <nav ref={navRef} className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-content">
          <div className="nav-links">
            <a href="#work" className="nav-item">Work</a>
            <a href="#architecture" className="nav-item">Architecture</a>
            <a href="#resume" className="nav-item">Resume</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="content-wrapper" ref={contentRef}>
        
        {/* Metadata Row */}
        <div className="meta-row" ref={metaRef}>
          <div className="meta-item">
            <span className="label">PROJECT:</span> VELAR
          </div>
          <div className="meta-item">
            <span className="label">TYPE:</span> FINTECH PLATFORM
          </div>
          <div className="meta-item">
            <span className="label">STACK:</span> FLUTTER / NODE / MONGO
          </div>
          <div className="meta-item">
            <span className="label">SCALE:</span> REAL-TIME EVENTS
          </div>
        </div>

        {/* Hero Typography */}
        <h1 ref={headingRef}>
          Building systems<br />
          at orbital scale.
        </h1>

        <p className="subtext" ref={subtextRef}>
          Full-stack engineering. Distributed architecture. Product-grade execution.
        </p>

        {/* Status Line */}
        <div className="status-line" ref={statusRef}>
          <span className="status-dot">●</span>
          <span className="status-text">Actively shipping</span>
        </div>

      </div>

      {/* CSS Styles */}
      <style jsx>{`
        /* --- Layout & Reset --- */
        .hero-container {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 max(5vw, 24px);
        }

        /* --- Background --- */
        .bg-wrapper {
          position: absolute;
          top: -10%; /* Extra height for parallax movement */
          left: 0;
          width: 100%;
          height: 120%; /* Extra height for parallax movement */
          z-index: 0;
          pointer-events: none;
        }

        .bg-image {
          width: 100%;
          height: 100%;
          background-image: url(${NASA_IMAGE_URL});
          background-size: cover;
          background-position: center top;
          will-change: transform; /* Hint for GPU acceleration */
        }

        .bg-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(5, 7, 10, 0.6);
          z-index: 1;
        }

        /* --- Navigation --- */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 100;
          padding: 24px max(5vw, 24px);
          transition: background-color 0.4s ease, backdrop-filter 0.4s ease, padding 0.4s ease;
          border-bottom: 1px solid rgba(255, 255, 255, 0); /* Transparent border initially */
        }

        .navbar.scrolled {
          background: rgba(5, 7, 10, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 16px;
          padding-bottom: 16px;
        }

        .nav-content {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: flex-end; /* Links on right, or left if preferred */
        }

        .nav-links {
          display: flex;
          gap: 32px;
        }

        .nav-item {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 14px;
          font-weight: 400;
          position: relative;
          transition: color 0.3s ease;
        }

        .nav-item:hover {
          color: #ffffff;
        }

        /* Subtle underline animation */
        .nav-item::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -4px;
          left: 0;
          background-color: #ffffff;
          transition: width 0.3s ease-out;
        }

        .nav-item:hover::after {
          width: 100%;
        }

        /* --- Content Area --- */
        .content-wrapper {
          position: relative;
          z-index: 10;
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-top: 60px; /* Optical balance */
        }

        /* --- Metadata --- */
        .meta-row {
          display: grid;
          grid-template-columns: repeat(4, auto);
          gap: 32px;
          margin-bottom: 48px;
          border-left: 1px solid rgba(255,255,255,0.2);
          padding-left: 24px;
        }

        .meta-item {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.12em;
          color: #ffffff;
          text-transform: uppercase;
        }

        .label {
          color: #AAB2C0;
          margin-right: 8px;
        }

        /* --- Hero Text --- */
        h1 {
          font-weight: 600;
          /* Clamp: Min 64px, Ideal 8vw, Max 96px */
          font-size: clamp(64px, 8vw, 96px);
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin: 0 0 32px 0;
          max-width: 1000px;
        }

        .subtext {
          font-size: clamp(18px, 2vw, 20px);
          font-weight: 400;
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 48px 0;
          max-width: 600px;
          line-height: 1.5;
        }

        /* --- Status --- */
        .status-line {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          color: #AAB2C0;
          font-weight: 500;
          letter-spacing: 0.02em;
          background: rgba(255,255,255,0.03);
          padding: 8px 16px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .status-dot {
          color: #2ED573; /* Subtle tech green */
          font-size: 10px;
          animation: pulse 4s infinite ease-in-out;
        }

        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; text-shadow: 0 0 8px rgba(46, 213, 115, 0.4); }
          100% { opacity: 0.6; }
        }

        /* --- Mobile / Responsive --- */
        @media (max-width: 768px) {
          .meta-row {
            grid-template-columns: 1fr;
            gap: 12px;
            margin-bottom: 32px;
            border-left: none;
            padding-left: 0;
          }

          .hero-container {
            align-items: flex-start; /* Align top on mobile */
            padding-top: 120px;
          }
          
          h1 {
            /* clamp handles font size, but we adjust spacing */
            margin-bottom: 24px;
          }
          
          .nav-links {
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
}