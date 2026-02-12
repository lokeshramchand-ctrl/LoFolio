"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, ArrowUpRight } from "lucide-react";

export default function ContactPage() {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <div className="sakura-container">
      {/* --- Global Styles & Keyframes (Vanilla CSS) --- */}
      <style jsx global>{`
        :root {
          --sakura-pink: #fbc2eb;
          --sakura-dark: #a18cd1;
          --glass-bg: rgba(255, 255, 255, 0.25);
          --glass-border: rgba(255, 255, 255, 0.5);
          --text-main: #1a1a1a;
          --text-muted: #666;
          --font-serif: "Playfair Display", serif;
          --font-sans: "Inter", sans-serif;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: var(--font-sans);
          background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
          color: var(--text-main);
          overflow-x: hidden;
        }

        .sakura-container {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          overflow: hidden;
        }

        /* Animated Background Blobs */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          z-index: 0;
          opacity: 0.6;
          animation: float 20s infinite ease-in-out;
        }
        .blob-1 {
          top: -10%;
          left: -10%;
          width: 50vw;
          height: 50vw;
          background: var(--sakura-pink);
        }
        .blob-2 {
          bottom: -10%;
          right: -10%;
          width: 40vw;
          height: 40vw;
          background: #fad0c4;
          animation-delay: -10s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }

        /* Glassmorphism Card */
        .glass-card {
          position: relative;
          z-index: 10;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 24px;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
          padding: 4rem;
          width: 100%;
          max-width: 1000px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }

        @media (max-width: 900px) {
          .glass-card {
            grid-template-columns: 1fr;
            padding: 2rem;
          }
        }

        /* Typography */
        h1 {
          font-family: var(--font-serif);
          font-size: 4rem;
          line-height: 1;
          margin-bottom: 1.5rem;
          color: var(--text-main);
          letter-spacing: -0.02em;
        }
        
        .subtitle {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--text-muted);
          margin-bottom: 1rem;
          display: block;
        }

        p {
          line-height: 1.6;
          color: var(--text-muted);
          font-size: 0.95rem;
          margin-bottom: 2rem;
        }

        /* Form Styling */
        .form-group {
          margin-bottom: 2rem;
          position: relative;
        }

        .form-label {
          position: absolute;
          left: 0;
          top: 0;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          pointer-events: none;
          transition: all 0.3s ease;
        }

        .form-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(0,0,0,0.1);
          padding: 0.5rem 0;
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: var(--text-main);
          outline: none;
          transition: border-color 0.3s ease;
        }

        .form-input:focus, 
        .form-input:not(:placeholder-shown) {
          border-bottom-color: var(--text-main);
        }

        /* Move label up when focused or has content */
        .form-group.active .form-label {
          top: -1.2rem;
          font-size: 0.65rem;
          color: var(--text-main);
        }

        /* Button */
        .btn-submit {
          background: var(--text-main);
          color: white;
          border: none;
          padding: 1rem 2.5rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 1rem;
          border-radius: 2px;
        }

        .btn-submit:hover {
          background: #f08a8a;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(240, 138, 138, 0.2);
        }

        /* Contact Details List */
        .contact-list {
          list-style: none;
          margin-top: 3rem;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 0;
          border-top: 1px solid rgba(0,0,0,0.05);
          font-size: 0.9rem;
          color: var(--text-main);
          cursor: pointer;
          transition: padding 0.3s ease;
        }

        .contact-item:hover {
          padding-left: 1rem;
          color: #f08a8a;
        }

        .petal {
          position: absolute;
          background: #ffd1dc;
          border-radius: 100% 0 100% 0;
          opacity: 0.6;
          pointer-events: none;
        }
      `}</style>

      {/* --- Background Blobs --- */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      {/* --- Floating Petals Animation --- */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="petal"
          initial={{ y: -20, x: Math.random() * 100, opacity: 0 }}
          animate={{
            y: "110vh",
            x: `calc(${Math.random() * 100}vw + ${Math.random() * 200 - 100}px)`,
            opacity: [0, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 3,
            ease: "linear",
          }}
          style={{
            width: 10 + Math.random() * 10,
            height: 10 + Math.random() * 10,
            left: `${Math.random() * 100}vw`,
            top: -20
          }}
        />
      ))}

      {/* --- Main Content --- */}
      <motion.div 
        className="glass-card"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        
        {/* Left Column: Text Info */}
        <div className="contact-info">
          <motion.span 
            className="subtitle"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            Get in Touch
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Let's Start a <br/><span style={{ fontStyle: 'italic', color: '#f08a8a' }}>Conversation.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Whether you have a project in mind or just want to admire the blossoms, we are here to listen.
          </motion.p>

          <ul className="contact-list">
            {["hello@sakura.design", "+81 90 1234 5678", "Tokyo, Japan"].map((item, index) => (
              <motion.li 
                key={index} 
                className="contact-item"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + (index * 0.1) }}
              >
                {item} <ArrowUpRight size={14} />
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right Column: The Form */}
        <div className="contact-form-wrapper">
          <form onSubmit={(e) => e.preventDefault()}>
            
            {["Name", "Email", "Subject"].map((label, index) => (
              <motion.div 
                key={label}
                className={`form-group ${focusedField === label ? 'active' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + (index * 0.1) }}
              >
                <label className="form-label">{label}</label>
                <input 
                  type={label === "Email" ? "email" : "text"} 
                  className="form-input"
                  onFocus={() => setFocusedField(label)}
                  onBlur={(e) => !e.target.value && setFocusedField(null)}
                />
              </motion.div>
            ))}

            <motion.div 
              className={`form-group ${focusedField === 'Message' ? 'active' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <label className="form-label">Message</label>
              <textarea 
                className="form-input" 
                rows={1}
                style={{ resize: 'none', height: 'auto', minHeight: '40px' }}
                onFocus={() => setFocusedField('Message')}
                onBlur={(e) => !e.target.value && setFocusedField(null)}
              />
            </motion.div>

            <motion.button 
              className="btn-submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              Send Message <Send size={14} />
            </motion.button>

          </form>
        </div>

      </motion.div>
    </div>
  );
}