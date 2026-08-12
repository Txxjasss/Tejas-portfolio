import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HangingCard from './HangingCard';

gsap.registerPlugin(ScrollTrigger);

const ROLES = ['Full Stack Developer', 'Competitive Programmer', 'AI & ML Engineer'];

/* ─── Hero Subtitle Component ─── */
function HeroSubtitle() {
  return (
    <div className="mt-2 mb-6">
      <span
        className="font-mono font-medium tracking-wide text-slate-200/90"
        style={{
          fontSize: 'clamp(0.75rem, 1.1vw, 1.05rem)',
          display: 'inline-block',
          whiteSpace: 'nowrap',
        }}
      >
        Full Stack Developer <span className="text-[#3B82F6] mx-1.5">·</span> Competitive Programmer
      </span>
    </div>
  );
}

/* ─── Main Hero Section ─── */
export default function Hero() {
  const heroRef = useRef(null);
  const navRef = useRef(null);
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [spotlightPos, setSpotlightPos] = useState({ x: '50%', y: '40%' });

  // Soft Mouse Spotlight glow handler
  const handleMouseMove = useCallback((e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSpotlightPos({ x: `${x}px`, y: `${y}px` });
  }, []);

  // Navbar Scroll & Section Spy
  useEffect(() => {
    const sections = ['about', 'projects', 'contact'];
    const onScroll = () => {
      setNavScrolled(window.scrollY > 50);

      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom > 200) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Card drop-in callback to trigger typography fade-in
  const handleCardLoaded = useCallback(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.char-t',
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.75, stagger: 0.04 },
        0.1
      );

      tl.fromTo(
        '.hero-fade-in',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.14 },
        0.5
      );

      tl.fromTo(
        navRef.current,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.8
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @keyframes scrollFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
        @keyframes scrollWheel {
          0% { transform: translateY(0); opacity: 0.2; }
          40% { opacity: 1; }
          80% { transform: translateY(7px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0.2; }
        }
      `}</style>

      <div
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen w-full overflow-hidden bg-[#050608] text-white flex flex-col justify-between"
        id="hero"
      >
        {/* ── Soft Mouse-Following Spotlight (Electric Blue #3B82F6) ── */}
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700"
          style={{
            background: `radial-gradient(650px circle at ${spotlightPos.x} ${spotlightPos.y}, rgba(59, 130, 246, 0.075), rgba(7, 9, 18, 0.02) 65%, transparent 88%)`,
          }}
          aria-hidden="true"
        />

        {/* Restrained Top Glow Orbs (Subtle Electric Blue) */}
        <div
          className="pointer-events-none absolute top-[-150px] left-1/4 w-[480px] h-[480px] rounded-full bg-[#3B82F6]/5 blur-[160px] z-0"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-[20%] right-[-140px] w-[420px] h-[420px] rounded-full bg-blue-600/4 blur-[150px] z-0"
          aria-hidden="true"
        />

        {/* ── Navbar ── */}
        <nav
          ref={navRef}
          className="fixed top-0 z-[100] flex items-center justify-between"
          style={{
            opacity: 0,
            left: navScrolled ? '50%' : '0',
            right: navScrolled ? 'auto' : '0',
            transform: navScrolled ? 'translateX(-50%)' : 'none',
            width: navScrolled ? 'auto' : '100%',
            padding: navScrolled ? '12px 36px' : '32px 64px',
            marginTop: navScrolled ? '12px' : '0',
            background: navScrolled ? 'rgba(7, 9, 16, 0.88)' : 'transparent',
            backdropFilter: navScrolled ? 'blur(20px) saturate(1.4)' : 'none',
            WebkitBackdropFilter: navScrolled ? 'blur(20px) saturate(1.4)' : 'none',
            borderRadius: navScrolled ? '50px' : '0',
            border: navScrolled ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
            boxShadow: navScrolled ? '0 10px 40px rgba(0,0,0,0.6)' : 'none',
            transition: 'all 0.4s ease',
          }}
        >
          {/* Logo */}
          <div className="flex items-center select-none gap-3">
            <span
              className="text-[#3B82F6] font-bold tracking-wider"
              style={{ fontFamily: "'Audiowide', sans-serif", fontSize: '19px' }}
            >
              TJ
            </span>
            <span className="w-8 h-[2px] bg-blue-500/40 rounded-full" />
            <span className="font-mono text-[10px] tracking-widest text-white/45 uppercase hidden sm:inline">
              PORTFOLIO
            </span>
          </div>

          {/* Links */}
          <div
            className="hidden md:flex items-center"
            style={{ gap: navScrolled ? '28px' : '40px', marginLeft: navScrolled ? '48px' : '0' }}
          >
            {[
              { label: 'ABOUT', href: '#about' },
              { label: 'PROJECTS', href: '#projects' },
              { label: 'CONTACT', href: '#contact' },
            ].map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    fontFamily: "'Audiowide', sans-serif",
                    fontSize: '11px',
                    letterSpacing: '0.22em',
                    paddingBottom: '4px',
                    borderBottom: isActive ? '1.5px solid #3B82F6' : '1.5px solid transparent',
                    transition: 'color 0.3s ease, border-color 0.3s ease',
                  }}
                  className={isActive ? 'text-[#3B82F6]' : 'text-white/45 hover:text-white/90'}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </nav>

        {/* ── Hero Main Two-Column Layout ── */}
        <div
          id="hero-content"
          className="relative z-10 container mx-auto px-6 md:px-12 pt-28 pb-16 md:pt-32 flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12 min-h-[calc(100vh-80px)]"
        >
          {/* LEFT COLUMN: Typography & Intro */}
          <div className="flex flex-col justify-center text-left w-full lg:w-[52%] z-10">
            {/* Top Department Badge */}
            <div className="hero-fade-in flex items-center gap-2 mb-4" style={{ opacity: 0 }}>
              <span className="px-3.5 py-1 rounded-full bg-blue-950/70 border border-blue-500/35 text-blue-400 font-mono text-[10px] font-semibold tracking-widest uppercase shadow-sm">
                CSAI @ IIIT LUCKNOW
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
            </div>

            {/* Name Heading: TEJAS in clean White, JANAGI in Electric Blue (#3B82F6) indented under J of TEJAS */}
            <h1
              className="select-none mb-3 flex flex-col"
              style={{
                fontFamily: "'Audiowide', sans-serif",
                fontSize: 'clamp(2.5rem, 5.8vw, 5.5rem)',
                lineHeight: '1.02',
                letterSpacing: '-0.02em',
              }}
            >
              <div className="overflow-hidden block text-white">
                {'TEJAS'.split('').map((c, i) => (
                  <span
                    key={`tejas-${i}`}
                    className="char-t inline-block will-change-transform"
                    style={{ opacity: 0 }}
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div className="overflow-hidden block text-[#3B82F6] flex items-center">
                <span className="invisible select-none inline-block" aria-hidden="true">
                  TE
                </span>
                {'JANAGI'.split('').map((c, i) => (
                  <span
                    key={`janagi-${i}`}
                    className="char-t inline-block will-change-transform"
                    style={{ opacity: 0 }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </h1>

            {/* Subtitle */}
            <div className="hero-fade-in" style={{ opacity: 0 }}>
              <HeroSubtitle />
            </div>

            {/* Brief Bio Summary (Subtle Off-White Supporting Text) */}
            <p
              className="hero-fade-in text-white/70 max-w-xl text-sm md:text-base leading-relaxed mb-8 font-sans"
              style={{ opacity: 0 }}
            >
              Crafting intelligent full-stack applications, scalable systems, and algorithmic solutions with precision engineering. Passionate about AI integration and high-performance user experiences.
            </p>

            {/* CTA Buttons & Social Quick Links */}
            <div className="hero-fade-in flex flex-wrap items-center gap-4" style={{ opacity: 0 }}>
              <a
                href="#projects"
                onClick={(e) => handleNavClick(e, '#projects')}
                className="px-7 py-3.5 rounded-xl bg-[#3B82F6] hover:bg-blue-600 text-white font-mono font-bold text-xs tracking-widest uppercase shadow-[0_0_22px_rgba(59,130,246,0.38)] hover:shadow-[0_0_32px_rgba(59,130,246,0.6)] hover:scale-[1.02] transition-all duration-300 flex items-center gap-2"
              >
                EXPLORE WORK
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="px-7 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/12 text-white font-mono font-bold text-xs tracking-widest uppercase hover:border-[#3B82F6]/60 transition-all duration-300"
              >
                GET IN TOUCH
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Centerpiece Interactive Hanging Badge */}
          <div className="w-full lg:w-[48%] flex justify-center items-center z-20">
            <HangingCard onLoaded={handleCardLoaded} />
          </div>
        </div>

        {/* ── Scroll Indicator (Bottom Center) ── */}
        <div className="relative z-20 pb-8 flex flex-col items-center gap-2 pointer-events-none select-none">
          <span
            className="hero-fade-in font-mono text-[9px] font-semibold tracking-[0.35em] uppercase text-white/35"
            style={{ opacity: 0 }}
          >
            SCROLL TO EXPLORE
          </span>
          <div
            className="hero-fade-in w-[20px] h-[32px] rounded-full border border-blue-500/25 flex justify-center pt-2"
            style={{ animation: 'scrollFloat 3s ease-in-out infinite', opacity: 0 }}
          >
            <div
              className="w-[3px] h-[6px] rounded-full bg-[#3B82F6]"
              style={{ animation: 'scrollWheel 2s ease-in-out infinite' }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

