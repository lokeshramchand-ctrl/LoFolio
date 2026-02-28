'use client';

import React, { useState, useEffect, useRef } from 'react';
import Script from 'next/script';

export default function FirstPage() {
  const [theme, setTheme] = useState('dark');
  const [menuActive, setMenuActive] = useState(false);
  const [time, setTime] = useState('--:--');
  const [counter, setCounter] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({ message: '', error: false });
  const [previewSrc, setPreviewSrc] = useState('');

  const cursorRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Live Local Time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Form Submission
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ message: '', error: false });

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const work = formData.get('work') as string;

    try {
      const response = await fetch(
        'https://analytics.priyatham.in/open/workspace/clnzoxcy10001vy2ohi4obbi0/survey/cml9ga0e702x3v5d7hn6viddw/submit',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            payload: { field_Nrgp: email, field_T1tJ: work },
          }),
        }
      );

      if (response.ok) {
        setFormStatus({ message: 'Message sent successfully.', error: false });
        formRef.current?.reset();
        setTimeout(() => setFormStatus({ message: '', error: false }), 3000);
      } else {
        throw new Error();
      }
    } catch (error) {
      setFormStatus({ message: 'Unable to send. Please try again.', error: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  // GSAP & Animation Initialization
  useEffect(() => {
    // Check if external scripts are loaded
    const checkScripts = setInterval(() => {
      const w = window as any;
      if (w.gsap && w.ScrollTrigger && w.Lenis) {
        clearInterval(checkScripts);
        initAnimations(w.gsap, w.ScrollTrigger, w.Lenis);
      }
    }, 100);

    return () => clearInterval(checkScripts);
  }, []);

  const initAnimations = (gsap: any, ScrollTrigger: any, Lenis: any) => {
    gsap.registerPlugin(ScrollTrigger);

    // Smooth Scroll
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Loader logic
    let currentVal = 0;
    const updateCounter = () => {
      if (currentVal >= 100) {
        const tl = gsap.timeline();
        tl.to('.counter', { delay: 1, opacity: 0 })
          .to('#loader', { height: 0, duration: 1, ease: 'power4.inOut' })
          .to('.hero-title', { y: 0, stagger: 0.1, duration: 1, ease: 'power4.out' }, '-=0.5')
          .fromTo('.reveal-text', { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1 }, '-=0.5');
        return;
      }
      currentVal += Math.floor(Math.random() * 10) + 1;
      if (currentVal > 100) currentVal = 100;
      setCounter(currentVal);
      setTimeout(updateCounter, Math.floor(Math.random() * 200) + 50);
    };
    updateCounter();

    // Cursor & Interactions (Desktop)
    if (window.matchMedia('(min-width: 769px)').matches) {
      const cursor = cursorRef.current;
      const preview = previewRef.current;

      window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
      });

      document.querySelectorAll('.magnet').forEach((magnet: any) => {
        magnet.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = magnet.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(magnet, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
          gsap.to(cursor, { scale: 3 });
        });
        magnet.addEventListener('mouseleave', () => {
          gsap.to(magnet, { x: 0, y: 0 });
          gsap.to(cursor, { scale: 1 });
        });
      });

      // Floating Image Preview
      if (preview) {
        const xTo = gsap.quickTo(preview, 'x', { duration: 0.4, ease: 'power3' });
        const yTo = gsap.quickTo(preview, 'y', { duration: 0.4, ease: 'power3' });

        document.querySelectorAll('.project-item').forEach((item: any) => {
          item.addEventListener('mouseenter', () => {
            const imgUrl = item.getAttribute('data-img');
            if (imgUrl) setPreviewSrc(imgUrl);
            gsap.to(preview, { opacity: 1, scale: 1, duration: 0.3 });
          });
          item.addEventListener('mouseleave', () => {
            gsap.to(preview, { opacity: 0, scale: 0.5, duration: 0.3 });
          });
          item.addEventListener('mousemove', (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
          });
        });
      }
    }

    // Scroll Animations
    gsap.utils.toArray('.about-text span').forEach((span: any) => {
      gsap.to(span, {
        scrollTrigger: { trigger: span, start: 'top 80%', end: 'bottom 60%', scrub: true },
        color: 'var(--text)',
      });
    });

    gsap.from('.testimonial-text', {
      scrollTrigger: {
        trigger: '#testimonial',
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });

    let proxy = { skew: 0 };
    const skewSetter = gsap.quickSetter('.project-item', 'skewY', 'deg');
    const clamp = gsap.utils.clamp(-20, 20);

    ScrollTrigger.create({
      onUpdate: (self: any) => {
        let skew = clamp(self.getVelocity() / -300);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: 'power3',
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew),
          });
        }
      },
    });
  };

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet" />
      <link href="https://api.fontshare.com/v2/css?f[]=clash-display@200,400,500,600,700&f[]=general-sans@200,300,400,500,600&display=swap" rel="stylesheet" />

      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="lazyOnload" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="lazyOnload" />
      <Script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js" strategy="lazyOnload" />

      <style dangerouslySetInnerHTML={{
        __html: `
          :root {
            --bg: #0b0b0b;
            --text: #e0e0e0;
            --acc: #888;
            --border: rgba(255, 255, 255, 0.1);
            --cursor: #fff;
            --nav-bg: rgba(11, 11, 11, 0.8);
            --overlay: rgba(255, 255, 255, 0.03);
            --accent: #22c55e;
          }

          [data-theme="light"] {
            --bg: #f4f4f4;
            --text: #1a1a1a;
            --acc: #555;
            --border: rgba(0, 0, 0, 0.1);
            --cursor: #000;
            --nav-bg: rgba(244, 244, 244, 0.8);
            --overlay: rgba(0, 0, 0, 0.03);
            --accent: #15803d;
          }

          * { margin: 0; padding: 0; box-sizing: border-box; cursor: none; }
          html, body {
            width: 100%;
            background-color: var(--bg);
            color: var(--text);
            font-family: 'General Sans', sans-serif;
            overflow-x: hidden;
            transition: background-color 0.5s ease, color 0.5s ease;
          }
          a { text-decoration: none; color: inherit; }
          ul { list-style: none; }
          button { border: none; background: none; cursor: none; color: inherit; }

          .noise-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;
            z-index: 9000; opacity: 0.04; background-image: url("https://grainy-gradients.vercel.app/noise.svg");
          }

          #cursor {
            position: fixed; top: 0; left: 0; width: 15px; height: 15px; background-color: var(--text);
            border-radius: 50%; pointer-events: none; z-index: 9999; mix-blend-mode: difference;
            transform: translate(-50%, -50%); transition: width 0.3s, height 0.3s, transform 0.1s;
          }

          nav {
            display: flex; justify-content: space-between; align-items: center; padding: 20px 5vw;
            position: fixed; width: 100%; top: 0; z-index: 100; backdrop-filter: blur(10px);
            background: var(--nav-bg); border-bottom: 1px solid var(--border); transition: background 0.5s ease;
          }

          .logo { font-family: 'Clash Display', sans-serif; font-weight: 600; font-size: 1.5rem; letter-spacing: -0.5px; }
          .nav-right { display: flex; align-items: center; gap: 30px; }
          .menu-items { display: flex; gap: 30px; }
          .menu-link { font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; position: relative; overflow: hidden; }
          .menu-link::after {
            content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 1px;
            background: var(--text); transform: scaleX(0); transform-origin: right; transition: transform 0.4s ease;
          }
          .menu-link:hover::after { transform: scaleX(1); transform-origin: left; }
          .theme-btn { font-size: 1.2rem; display: flex; align-items: center; justify-content: center; }
          .menu-icon { display: none; font-size: 1.5rem; z-index: 102; }

          .mobile-menu {
            position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: var(--bg);
            z-index: 101; display: flex; flex-direction: column; justify-content: center; align-items: center;
            gap: 40px; transform: translateY(-100%); transition: transform 0.6s cubic-bezier(0.7, 0, 0.3, 1);
          }
          .mobile-menu.active { transform: translateY(0); }
          .mobile-link { font-family: 'Clash Display', sans-serif; font-size: 3rem; color: var(--text); }

          #hero { height: 100vh; width: 100%; display: flex; flex-direction: column; justify-content: center; padding: 0 5vw; position: relative; }
          .hero-line { overflow: hidden; line-height: 1; }
          .hero-subtitle { font-family: 'General Sans', sans-serif; font-size: clamp(1rem, 2vw, 1.5rem); color: var(--text); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 2vh; display: block; opacity: 0; }
          .hero-title { font-family: 'Clash Display', sans-serif; font-size: clamp(3rem, 13vw, 10rem); font-weight: 600; text-transform: uppercase; color: var(--text); transform: translateY(100%); }
          .hero-title.outline { color: transparent; -webkit-text-stroke: 1px var(--text); opacity: 0.5; }
          .hero-footer { position: absolute; bottom: 40px; left: 5vw; right: 5vw; display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; color: var(--acc); text-transform: uppercase; }
          .hero-footer span { opacity: 0; }
          .scroll-indicator { display: flex; align-items: center; gap: 10px; opacity: 0; }
          .scroll-indicator i { font-size: 1.2rem; animation: bounce 2s infinite; }
          @keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-8px); } 60% { transform: translateY(-4px); } }

          #work { padding: 120px 5vw; position: relative; }
          .section-label { font-size: 0.9rem; color: var(--acc); margin-bottom: 60px; text-transform: uppercase; letter-spacing: 1px; display: block; }
          .project-list { display: flex; flex-direction: column; }
          .project-item { padding: 50px 0; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; transition: opacity 0.4s ease; position: relative; }
          .project-item:first-child { border-top: 1px solid var(--border); }
          .project-list:hover .project-item { opacity: 0.3; }
          .project-list:hover .project-item:hover { opacity: 1; }
          .p-left { display: flex; align-items: center; gap: 40px; flex: 1; }
          .p-num { font-family: 'General Sans', sans-serif; font-size: 1rem; color: var(--acc); font-weight: 400; opacity: 0.7; min-width: 30px; }
          .p-name { font-family: 'Clash Display', sans-serif; font-size: clamp(2.5rem, 6vw, 6rem); text-transform: uppercase; font-weight: 500; transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s; }
          .p-center { display: flex; gap: 12px; flex: 1; justify-content: center; }
          .p-tag { font-size: 0.8rem; padding: 8px 18px; border: 1px solid var(--border); border-radius: 50px; color: var(--acc); text-transform: uppercase; letter-spacing: 1px; transition: background 0.3s, color 0.3s, border-color 0.3s; }
          .p-right { display: flex; align-items: center; justify-content: flex-end; gap: 40px; flex: 1; }
          .p-cat { font-size: 1rem; color: var(--acc); text-align: right; line-height: 1.4; }
          .p-cat span { display: block; font-size: 0.85rem; opacity: 0.6; margin-top: 4px; }
          .p-icon { font-size: 2.5rem; color: var(--acc); transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s; }
          .project-item:hover .p-name { transform: translateX(30px); color: var(--text); }
          .project-item:hover .p-icon { transform: rotate(45deg); color: var(--text); }
          .project-item:hover .p-tag { border-color: var(--text); color: var(--text); }

          .preview-img {
            position: fixed; width: 350px; height: 250px; border-radius: 12px; overflow: hidden; pointer-events: none;
            z-index: 10; opacity: 0; transform: translate(-50%, -50%) scale(0.5); box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
            border: 1px solid var(--border);
          }
          .preview-img img { width: 100%; height: 100%; object-fit: cover; }

          #testimonial { padding: 150px 5vw; display: flex; justify-content: center; align-items: center; text-align: center; }
          .testimonial-container { max-width: 1200px; width: 100%; }
          .quote-icon { font-family: 'Clash Display', sans-serif; font-size: clamp(4rem, 10vw, 8rem); color: var(--text); opacity: 0.1; line-height: 0; margin-bottom: 20px; display: block; }
          .testimonial-text { font-family: 'Clash Display', sans-serif; font-size: clamp(2rem, 4vw, 4.5rem); font-weight: 500; line-height: 1.2; color: var(--text); margin-bottom: 60px; }
          .testimonial-author { display: flex; flex-direction: column; gap: 5px; align-items: center; }
          .t-name { font-family: 'General Sans', sans-serif; font-size: 1.2rem; text-transform: uppercase; letter-spacing: 2px; color: var(--text); }
          .t-role { font-size: 0.9rem; color: var(--acc); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }

          #about { padding: 150px 5vw; border-top: 1px solid var(--border); }
          .about-top { margin-bottom: 100px; }
          .about-text { font-size: clamp(1.5rem, 3.5vw, 3.5rem); line-height: 1.3; width: 100%; max-width: 90%; color: var(--acc); }
          .about-text span { color: var(--text); transition: color 0.3s; }
          .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6vw; align-items: center; }
          .about-img-wrapper { width: 100%; height: 60vh; border-radius: 16px; overflow: hidden; position: relative; }
          .about-img-wrapper img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(30%); transition: filter 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
          .about-img-wrapper:hover img { filter: grayscale(0%); transform: scale(1.05); }
          .about-details { display: flex; flex-direction: column; gap: 50px; }
          .detail-item { border-top: 1px solid var(--border); padding-top: 20px; }
          .detail-item h3 { font-family: 'General Sans', sans-serif; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; color: var(--acc); margin-bottom: 20px; }
          .detail-item p { font-size: clamp(1.1rem, 1.3vw, 1.3rem); line-height: 1.6; color: var(--text); }
          .tech-tags { display: flex; flex-wrap: wrap; gap: 12px; }
          .tech-tag { font-size: 0.85rem; padding: 10px 20px; border: 1px solid var(--border); border-radius: 100px; color: var(--text); text-transform: uppercase; letter-spacing: 1px; transition: background 0.3s, color 0.3s; }
          .tech-tag:hover { background: var(--text); color: var(--bg); }

          footer { padding: 100px 5vw 40px; display: flex; flex-direction: column; border-top: 1px solid var(--border); position: relative; }
          .footer-container { display: flex; justify-content: space-between; gap: 60px; flex-wrap: wrap; margin-bottom: 80px; }
          .footer-left { flex: 1; min-width: 300px; }
          .footer-right { flex: 1; min-width: 300px; max-width: 500px; display: flex; flex-direction: column; justify-content: center; }
          .footer-title { font-family: 'Clash Display', sans-serif; font-size: clamp(4rem, 10vw, 8rem); line-height: 0.9; text-transform: uppercase; font-weight: 600; }
          .footer-title.outline { color: transparent; -webkit-text-stroke: 1px var(--text); opacity: 0.5; }
          .footer-desc { font-size: 1.1rem; color: var(--acc); margin: 30px 0 40px; max-width: 400px; line-height: 1.5; }
          #contact-form { width: 100%; display: flex; flex-direction: column; gap: 40px; }
          .input-group { display: flex; flex-direction: column; gap: 10px; }
          .input-group label { font-size: 0.85rem; text-transform: uppercase; color: var(--acc); letter-spacing: 1px; }
          .form-input { width: 100%; background: transparent; border: none; border-bottom: 1px solid var(--border); padding: 10px 0; font-family: 'General Sans', sans-serif; font-size: 1.2rem; color: var(--text); outline: none; transition: border-color 0.3s; border-radius: 0; }
          .form-input:focus { border-color: var(--text); }
          .form-input::placeholder { color: var(--acc); opacity: 0.3; }
          #submit-btn { align-self: flex-start; display: flex; align-items: center; gap: 12px; font-family: 'General Sans', sans-serif; font-size: 1rem; text-transform: uppercase; border: 1px solid var(--text); background: var(--text); color: var(--bg); padding: 16px 40px; border-radius: 100px; transition: all 0.3s; letter-spacing: 1px; font-weight: 500; }
          #submit-btn:hover { background: transparent; color: var(--text); }
          #form-status { font-size: 0.9rem; min-height: 20px; margin-top: -20px; }
          .socials { display: flex; flex-wrap: wrap; gap: 15px; }
          .social-link { border: 1px solid var(--border); padding: 12px 24px; border-radius: 100px; transition: all 0.3s; text-transform: uppercase; font-size: 0.85rem; display: flex; align-items: center; gap: 8px; }
          .social-link:hover { background: var(--text); color: var(--bg); border-color: var(--text); }
          .footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 30px; border-top: 1px solid var(--border); font-size: 0.85rem; color: var(--acc); text-transform: uppercase; letter-spacing: 1px; }

          #loader { position: fixed; inset: 0; background: var(--bg); z-index: 10000; display: flex; justify-content: center; align-items: center; }
          .counter { font-family: 'Clash Display', sans-serif; font-size: 10vw; font-weight: 600; }

          @media (max-width: 768px) {
            .menu-items { display: none; }
            .menu-icon { display: block; }
            #cursor, .preview-img { display: none !important; }
            * { cursor: auto !important; }
            .hero-footer { flex-direction: column; gap: 10px; align-items: flex-start; }
            nav { padding: 20px 5vw; }
            .project-item { flex-direction: column; align-items: flex-start; padding: 30px 0; gap: 20px; }
            .p-left { gap: 20px; }
            .p-center { display: none; }
            .p-right { width: 100%; justify-content: space-between; flex-direction: row-reverse; }
            .p-cat { text-align: left; }
            .project-item:hover .p-name { transform: translateX(15px); }
            .about-grid { grid-template-columns: 1fr; gap: 40px; }
            .about-img-wrapper { height: 40vh; }
            .footer-container { flex-direction: column; gap: 50px; }
            .footer-bottom { flex-direction: column; align-items: flex-start; gap: 15px; }
            #testimonial { padding: 100px 5vw; }
          }
        `
      }} />

      <div className="noise-overlay"></div>
      <div id="cursor" ref={cursorRef}></div>

      <div id="loader">
        <div className="counter">{counter}</div>
      </div>

      <div className={`mobile-menu ${menuActive ? 'active' : ''}`}>
        <a href="#work" className="mobile-link" onClick={() => setMenuActive(false)}>Projects</a>
        <a href="#about" className="mobile-link" onClick={() => setMenuActive(false)}>About</a>
        <a href="https://drive.google.com/file/d/1HicrndILNyc9dkNFDz_BzozauWinXTyj/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="mobile-link" onClick={() => setMenuActive(false)}>Resume</a>
      </div>

      <div className="preview-img" ref={previewRef}>
        <img src={previewSrc} id="p-img" alt="work preview" />
      </div>

      <div id="main">
        <nav>
          <a href="#" className="logo magnet">Lokesh Ram Chand</a>

          <div className="nav-right">
            <div className="menu-items">
              <a href="#work" className="menu-link magnet">Projects</a>
              <a href="#about" className="menu-link magnet">About</a>
              <a href="https://drive.google.com/file/d/1HicrndILNyc9dkNFDz_BzozauWinXTyj/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="menu-link magnet">Resume</a>
            </div>

            <button className="theme-btn magnet" onClick={toggleTheme} aria-label="Toggle Theme">
              <i className={theme === 'light' ? 'ri-sun-line' : 'ri-moon-line'} id="theme-icon"></i>
            </button>

            <button className="menu-icon" onClick={() => setMenuActive(!menuActive)} aria-label="Menu">
              <i className="ri-menu-4-line"></i>
            </button>
          </div>
        </nav>

        <section id="hero">
          <span className="hero-subtitle reveal-text">Hello, World.</span>

          <div className="hero-line">
            <h1 className="hero-title">I'm Lokesh.</h1>
          </div>
          <div className="hero-line">
            <h1 className="hero-title outline">Full-Stack Engineer</h1>
          </div>

          <div className="hero-footer">
            <span className="reveal-text">Hyderabad, India</span>
            <div className="scroll-indicator reveal-text magnet">
              <span>Explore</span>
              <i className="ri-arrow-down-line"></i>
            </div>
          </div>
        </section>

        <section id="work">
          <span className="section-label">Selected Works</span>
          <div className="project-list">
            <a href="https://github.com/lokeshramchand-ctrl/seko.git" className="project-item magnet" data-img="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop">
              <div className="p-left">
                <span className="p-num">01</span>
                <div className="p-name">Seko</div>
              </div>
              <div className="p-center">
                <span className="p-tag">Flutter</span>
                <span className="p-tag">Django</span>
              </div>
              <div className="p-right">
                <div className="p-cat">Ecommerce <span>2025</span></div>
                <i className="ri-arrow-right-up-line p-icon"></i>
              </div>
            </a>

            <a href="https://github.com/lokeshramchand-ctrl/velar.git" className="project-item magnet" data-img="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1000&auto=format&fit=crop">
              <div className="p-left">
                <span className="p-num">02</span>
                <div className="p-name">Velar</div>
              </div>
              <div className="p-center">
                <span className="p-tag">Flutter</span>
                <span className="p-tag">Node.js</span>
              </div>
              <div className="p-right">
                <div className="p-cat">Fintech App <span>2024</span></div>
                <i className="ri-arrow-right-up-line p-icon"></i>
              </div>
            </a>

            <a href="./MapLayer/page" className="project-item magnet" data-img="images/Web_Maplayer.png">
              <div className="p-left">
                <span className="p-num">03</span>
                <div className="p-name">Maplayer</div>
              </div>
              <div className="p-center">
                <span className="p-tag">React</span>
                <span className="p-tag">GeoJSON</span>
              </div>
              <div className="p-right">
                <div className="p-cat">Geospatial Integration <span>2025</span></div>
                <i className="ri-arrow-right-up-line p-icon"></i>
              </div>
            </a>

            <a href="https://github.com/lokeshramchand-ctrl/fortyl.git" className="project-item magnet" data-img="images/Web_Signin_Fortyl.png">
              <div className="p-left">
                <span className="p-num">04</span>
                <div className="p-name">Fortyl</div>
              </div>
              <div className="p-center">
                <span className="p-tag">Flutter</span>
                <span className="p-tag">Next.js</span>
                <span className="p-tag">Spring Boot</span>
              </div>
              <div className="p-right">
                <div className="p-cat">Authentication <span>2026</span></div>
                <i className="ri-arrow-right-up-line p-icon"></i>
              </div>
            </a>
          </div>
        </section>

        <section id="testimonial">
          <div className="testimonial-container">
            <span className="quote-icon">"</span>
            <p className="testimonial-text">
              Lokesh was competent, open to direction, and gave expert advice throughout the redesign process. His
              positive attitude and humility make him a true joy to collaborate with.
            </p>
            <span className="quote-icon">"</span>
            <div className="testimonial-author">
              <a href="https://www.linkedin.com/in/danilindamood/" className="t-name" target="_blank" rel="noopener noreferrer">
                Danielle Lindamood
              </a>
              <span className="t-role">Director at Water Watchers</span>
              <a href="https://linkedin.com/in/lokeshramchand" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text)', transition: 'all 0.3s' }}>
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6 z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        </section>

        <section id="about">
          <div className="about-top">
            <span className="section-label">About Me</span>
            <p className="about-text">
              I'm Lokesh, a <span>CSE undergrad</span> at KL University. I craft <span>high-end digital experiences</span> with strong focus on <span>clean architecture</span> and <span>intuitive user experience.</span>I enjoy turning complex ideas into <span>reliable, production-ready products.</span>
            </p>
          </div>

          <div className="about-grid">
            <div className="about-img-wrapper magnet">
              <img src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1000&auto=format&fit=crop" alt="Abstract Aesthetics" />
            </div>

            <div className="about-details">
              <div className="detail-item">
                <h3>The Background</h3>
                <p>I’m currently pursuing my B.Tech (Hons.) in Computer Science with a 9.45 CGPA. I enjoy building full-stack applications, refining frontend experiences with tools like GSAP, and exploring backend and cloud fundamentals through hands-on projects.</p>
              </div>

              <div className="detail-item">
                <h3>Core Engineering Stack</h3>
                <div className="tech-tags">
                  <span className="tech-tag magnet">Flutter</span>
                  <span className="tech-tag magnet">Next.js</span>
                  <span className="tech-tag magnet">React</span>
                  <span className="tech-tag magnet">Node.js</span>
                  <span className="tech-tag magnet">Spring Boot</span>
                  <span className="tech-tag magnet">Django</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer>
          <div className="footer-container">
            <div className="footer-left">
              <div className="hero-line">
                <h1 className="footer-title">Say</h1>
              </div>
              <div className="hero-line">
                <h1 className="footer-title outline">Hello.</h1>
              </div>

              <p className="footer-desc">Got a project in mind or just want to say hi? Feel free to reach out and let's build something great together.</p>

              <div className="socials">
                <a href="mailto:lokeshramchand@gmail.com" className="social-link magnet">
                  Email <i className="ri-arrow-right-up-line"></i>
                </a>
                <a href="https://linkedin.com/in/lokeshramchand" className="social-link magnet">
                  LinkedIn <i className="ri-arrow-right-up-line"></i>
                </a>
                <a href="https://github.com/lokeshramchand-ctrl" className="social-link magnet">
                  Github <i className="ri-arrow-right-up-line"></i>
                </a>
              </div>
            </div>

            <div className="footer-right">
              <form id="contact-form" ref={formRef} onSubmit={handleFormSubmit}>
                <div className="input-group">
                  <label htmlFor="form-email">What's your email?</label>
                  <input type="email" id="form-email" name="email" className="form-input" placeholder="john@doe.com" required />
                </div>
                <div className="input-group">
                  <label htmlFor="form-work">Tell me about your project</label>
                  <input type="text" id="form-work" name="work" className="form-input" placeholder="I need a modern web application..." required />
                </div>

                <button type="submit" id="submit-btn" className="magnet" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1 }}>
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  {!isSubmitting && <i className="ri-arrow-right-line"></i>}
                </button>
                <p id="form-status" style={{ color: formStatus.error ? '#ef4444' : 'var(--accent)' }}>{formStatus.message}</p>
              </form>
            </div>
          </div>

          <div className="footer-bottom">
            <span>Local Time: <span id="local-time">{time}</span></span>
          </div>
        </footer>
      </div>
    </>
  );
}