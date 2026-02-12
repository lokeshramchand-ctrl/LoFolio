import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface ArchitectureBlock {
  title: string;
  subtext: string;
  isLast?: boolean;
}

const BLOCKS: ArchitectureBlock[] = [
  { title: "Client Layer", subtext: "Next.js / React / Mobile Native" },
  { title: "API Gateway", subtext: "Rate Limiting / Auth / Edge Routing" },
  { title: "Service Layer", subtext: "Go / Node.js Microservices" },
  { title: "Event Queue", subtext: "RabbitMQ / Apache Kafka" },
  { title: "Workers", subtext: "Async Processing / Data Aggregation" },
  { title: "Database", subtext: "PostgreSQL / Redis Cache", isLast: true },
];

export default function ArchitectureSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initialize Lenis for smooth scrolling
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

    // 2. Setup GSAP Animations
    const ctx = gsap.context(() => {
      // Animate Heading Group
      const headers = headingRef.current?.children;
      if (headers) {
        gsap.fromTo(
          headers,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Animate Diagram Blocks
      const blocks = diagramRef.current?.children;
      if (blocks) {
        gsap.fromTo(
          blocks,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1, // distinct step-down feel
            ease: "power2.out",
            scrollTrigger: {
              trigger: diagramRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, containerRef);

    // Cleanup
    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <section ref={containerRef} className="architecture-section">
      <div className="content-wrapper">
        
        {/* Header Group */}
        <div ref={headingRef} className="header-group">
          <span className="label">System Architecture</span>
          <h2 className="heading">How I build for scale.</h2>
          <p className="description">
            I design systems around reliability, event flow, and long-term scale — not just features.
          </p>
        </div>

        {/* Diagram Stack */}
        <div ref={diagramRef} className="diagram-stack">
          {BLOCKS.map((block, index) => (
            <div key={index} className="diagram-row">
              <div className="block">
                <div className="block-title">{block.title}</div>
                <div className="block-subtext">{block.subtext}</div>
              </div>
              {!block.isLast && <div className="connector" />}
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        /* --- Font Imports (Assuming Inter is available globally, else import here) --- */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

        .architecture-section {
          position: relative;
          background: linear-gradient(180deg, #05070d 0%, #0b0f1a 100%);
          color: #f5f7fa;
          font-family: 'Inter', sans-serif;
          padding: 160px 24px;
          overflow: hidden;
          min-height: 100vh;
        }

        .content-wrapper {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* --- Header Styles --- */
        .header-group {
          text-align: center;
          margin-bottom: 80px;
          max-width: 800px;
        }

        .label {
          display: block;
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          opacity: 0.5;
          margin-bottom: 24px;
          font-weight: 600;
        }

        .heading {
          font-size: clamp(40px, 5vw, 64px);
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0 0 24px 0;
          color: #f5f7fa;
        }

        .description {
          font-size: 20px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.65);
          max-width: 700px;
          margin: 0 auto;
          font-weight: 400;
        }

        /* --- Diagram Styles --- */
        .diagram-stack {
          width: 100%;
          max-width: 600px; /* Constrain width for a precise look */
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .diagram-row {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .block {
          width: 100%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 28px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: border-color 0.3s ease;
          position: relative;
          z-index: 2;
        }

        /* Subtle hover effect for interactivity context without flashiness */
        .block:hover {
          border-color: rgba(255, 255, 255, 0.15);
        }

        .block-title {
          font-size: 18px;
          font-weight: 600;
          color: #f5f7fa;
          margin-bottom: 4px;
        }

        .block-subtext {
          font-size: 14px;
          color: #f5f7fa;
          opacity: 0.6;
          font-weight: 400;
        }

        .connector {
          width: 1px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          margin: 0 auto; /* Centers it vertically between blocks */
        }

        /* --- Responsive Adjustments --- */
        @media (max-width: 768px) {
          .architecture-section {
            padding: 100px 20px;
          }

          .heading {
            font-size: clamp(32px, 8vw, 48px);
          }

          .description {
            font-size: 18px;
          }

          .block {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
}