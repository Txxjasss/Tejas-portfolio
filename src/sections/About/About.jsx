import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Server, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─── CountUp Component ────────────────────────────────────── */
function CountUp({ end, duration = 1200, suffix = '' }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef();

  useEffect(() => {
    let animationFrameId;
    const target = parseInt(end, 10);
    if (isNaN(target)) {
      setCount(end);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out quad formula
            const easeProgress = progress * (2 - progress);
            const currentVal = Math.floor(easeProgress * target);

            setCount(currentVal);

            if (progress < 1) {
              animationFrameId = requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };

          animationFrameId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [end, duration]);

  const isNumeric = !isNaN(parseInt(end, 10));

  return (
    <span ref={elementRef}>
      {isNumeric ? `${count}${suffix}` : end}
    </span>
  );
}

/* ─── About Section ────────────────────────────────────────── */
export default function About() {
  const sectionRef = useRef(null);
  const portraitRef = useRef(null);

  // Mouse tilt parallax effect for portrait image
  const handleMouseMove = (e) => {
    if (!portraitRef.current) return;
    const el = portraitRef.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    // Calculate tilt (max 6 degrees for extra-smooth control)
    const tiltX = -(y - yc) / 25;
    const tiltY = (x - xc) / 25;

    el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.015, 1.015, 1.015)`;
  };

  const handleMouseLeave = () => {
    if (!portraitRef.current) return;
    portraitRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Snappy reveal animations completing within ~1 second

      // 1 — Portrait slide-in, fade, and blur removal
      gsap.fromTo('.about-portrait-wrap',
        { x: -40, opacity: 0, filter: 'blur(8px)' },
        {
          x: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      );

      // 2 — Label reveal
      gsap.fromTo('.about-label-reveal',
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-label-reveal',
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );

      // 3 — Heading lines staggered reveal (fade up, blur removal)
      gsap.fromTo('.about-heading-line',
        { y: 25, opacity: 0, filter: 'blur(6px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.75,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-heading-container',
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );

      // 4 — Paragraphs & Tech Stack fade-in
      gsap.fromTo('.about-anim-text',
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-text-container',
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );

      // 5 — Cards staggered reveal
      gsap.fromTo('.about-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-cards-grid',
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );

      // 6 — Stats values count-up trigger
      gsap.fromTo('.about-stat-value',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-stats-row',
            start: 'top 92%',
            toggleActions: 'play none none none',
          }
        }
      );

      // 7 — Stat labels fade up slightly after the numbers
      gsap.fromTo('.about-stat-label',
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.18, // staggered timing after count up begins
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-stats-row',
            start: 'top 92%',
            toggleActions: 'play none none none',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @keyframes subtleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes breathingGlow {
          0%, 100% {
            box-shadow: 0 20px 45px rgba(0, 0, 0, 0.55), 
                        0 0 15px rgba(59, 130, 246, 0.04), 
                        0 0 10px rgba(59, 130, 246, 0.04);
          }
          50% {
            box-shadow: 0 20px 45px rgba(0, 0, 0, 0.55), 
                        0 0 28px rgba(59, 130, 246, 0.14), 
                        0 0 20px rgba(59, 130, 246, 0.1);
          }
        }
        @keyframes breathingGlowLight {
          0%, 100% { transform: translate(-50%, -50%) scale(1.0); opacity: 0.22; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.38; }
        }
        .animate-float {
          animation: subtleFloat 11s ease-in-out infinite; /* slow floating 10-12s */
        }
        .about-portrait-card {
          animation: breathingGlow 6s ease-in-out infinite;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-portrait-card:hover {
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.65), 
                      0 0 35px rgba(59, 130, 246, 0.3), 
                      0 0 15px rgba(59, 130, 246, 0.2) !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
        }
        .about-card {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-card:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 25px 45px rgba(0, 0, 0, 0.45), 0 0 25px rgba(59, 130, 246, 0.12) !important;
          border-color: rgba(255, 255, 255, 0.18) !important;
        }
        .about-card:hover .about-card-icon {
          color: #3B82F6 !important;
          filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.65));
        }
        .about-card:hover .about-card-title {
          color: #ffffff !important;
        }
        .about-card:hover .about-card-desc {
          color: rgba(255, 255, 255, 0.65) !important;
        }
        .about-stat-value {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-stat-item:hover .about-stat-value {
          color: #ffffff !important;
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.35);
          letter-spacing: 0.012em !important;
        }
      `}</style>

      <section
        ref={sectionRef}
        id="about"
        className="relative w-full overflow-hidden bg-transparent px-8 md:px-16 py-28 md:py-36"
      >

        {/* Ambient background glows */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <div style={{
            position: 'absolute', top: '25%', left: '10%',
            width: 450, height: 450, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.035) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }} />
          <div style={{
            position: 'absolute', bottom: '20%', right: '15%',
            width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37,99,235,0.03) 0%, transparent 70%)',
            filter: 'blur(70px)',
          }} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex flex-col gap-16 lg:flex-row lg:gap-20">
            
            {/* LEFT COLUMN ── Portrait Image Wrapper */}
            <div className="flex w-full justify-center lg:w-[40%] items-start lg:pt-12">
              <div className="relative about-portrait-wrap w-full max-w-[310px] md:max-w-[360px] aspect-[4/5] animate-float opacity-0">
                
                {/* Soft breathing light behind the portrait */}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-20 w-[320px] h-[320px] rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(59,130,246,0.14) 0%, rgba(37,99,235,0.08) 50%, transparent 70%)',
                    filter: 'blur(40px)',
                    animation: 'breathingGlowLight 8s ease-in-out infinite',
                  }}
                />

                {/* Subtle particles behind image */}
                <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-40">
                  <div className="absolute w-1.5 h-1.5 bg-[#3B82F6]/40 rounded-full blur-[0.5px]" style={{ top: '10%', left: '15%', animation: 'subtleFloat 12s ease-in-out infinite' }} />
                  <div className="absolute w-1 h-1 bg-[#2563eb]/40 rounded-full blur-[0.5px]" style={{ top: '35%', left: '85%', animation: 'subtleFloat 16s ease-in-out infinite 2s' }} />
                  <div className="absolute w-1.2 h-1.2 bg-[#3B82F6]/30 rounded-full blur-[0.5px]" style={{ top: '70%', left: '10%', animation: 'subtleFloat 14s ease-in-out infinite 1s' }} />
                  <div className="absolute w-1.5 h-1.5 bg-white/20 rounded-full blur-[0.5px]" style={{ top: '80%', left: '75%', animation: 'subtleFloat 18s ease-in-out infinite 3s' }} />
                </div>

                <div
                  ref={portraitRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="about-portrait-card group relative h-full w-full overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.02] p-1.5 select-none"
                >
                  {/* Subtle inner border glow */}
                  <div className="absolute inset-0 z-10 pointer-events-none rounded-[20px] border border-white/5 opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  {/* Photo image */}
                  <img
                    src="/developer_portrait.jpg"
                    alt="Tejas Janagi Portrait"
                    className="h-full w-full object-cover rounded-[20px] filter brightness-[0.92] contrast-[1.03] transition-all duration-500 group-hover:scale-[1.03] group-hover:brightness-[1.0]"
                    style={{ objectPosition: 'center 15%' }}
                    draggable="false"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN ── Description, Cards, Stats */}
            <div className="flex w-full flex-col lg:w-[60%] justify-center">
              
              {/* Monospace label */}
              <p className="about-label-reveal font-mono text-[10px] font-semibold tracking-[0.42em] uppercase text-white/30 mb-6 opacity-0">
                ABOUT ME
              </p>

              {/* Large staggered heading lines */}
              <div className="about-heading-container mb-12">
                <h2 className="font-sans text-4xl sm:text-5xl font-black leading-[1.18] tracking-tight text-white">
                  <span className="block about-heading-line opacity-0 pb-1.5">Building Products.</span>
                  <span className="block about-heading-line opacity-0 pb-1.5">Solving Problems.</span>
                  <span className="block about-heading-line opacity-0 pb-1.5 bg-gradient-to-r from-[#3B82F6] to-[#60a5fa] bg-clip-text text-transparent">
                    Never Stopping.
                  </span>
                </h2>
              </div>

              {/* Text paragraphs Container */}
              <div className="about-text-container flex flex-col gap-8 text-white/70 font-sans text-[15px] sm:text-[16px] leading-[1.8] max-w-[65ch]">
                <p className="about-anim-text opacity-0">
                  I'm Tejas Janagi, a Computer Science and Artificial Intelligence undergraduate at IIIT Lucknow passionate about building <span className="text-[#3B82F6] font-semibold">modern web applications</span> and solving challenging engineering problems. I enjoy transforming ideas into polished digital experiences while constantly learning new technologies and improving my craft as a software engineer.
                </p>
                <p className="about-anim-text opacity-0">
                  Beyond development, <span className="text-[#3B82F6] font-semibold">competitive programming</span> has shaped my analytical thinking and problem-solving mindset. Whether I'm building full-stack applications, contributing to <span className="text-[#3B82F6] font-semibold">open-source software</span>, or preparing for software engineering internships, I'm always focused on creating meaningful products and becoming a better engineer every day.
                </p>
                
                {/* Mini Tech Stack Row */}
                <div className="about-anim-text opacity-0 mt-2 flex flex-wrap items-center gap-y-2 text-[10px] font-bold tracking-[0.2em] uppercase text-white/35">
                  <span className="mr-1">Currently Exploring</span>
                  <span className="text-[#3B82F6] font-black mx-2">•</span>
                  <span>System Design</span>
                  <span className="text-[#3B82F6] font-black mx-2">•</span>
                  <span>Cloud</span>
                  <span className="text-[#3B82F6] font-black mx-2">•</span>
                  <span>AI</span>
                  <span className="text-[#3B82F6] font-black mx-2">•</span>
                  <span>Open Source</span>
                </div>
              </div>

              {/* Divider 1 */}
              <div className="h-[1px] w-full bg-white/[0.06] my-12 pointer-events-none" />

              {/* Cards Grid */}
              <div className="about-cards-grid grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  {
                    icon: <Brain className="about-card-icon w-6 h-6 text-[#3B82F6] transition-all duration-300" />,
                    title: 'Algorithmic Thinking',
                    desc: 'Developing strong analytical thinking through Codeforces, CodeChef, and challenging algorithmic problems.',
                  },
                  {
                    icon: <Server className="about-card-icon w-6 h-6 text-[#3B82F6] transition-all duration-300" />,
                    title: 'Building Products',
                    desc: 'Creating scalable full-stack applications using React, Node.js, Express, MongoDB, Firebase, and modern web technologies.',
                  },
                  {
                    icon: <Rocket className="about-card-icon w-6 h-6 text-[#3B82F6] transition-all duration-300" />,
                    title: 'Always Learning',
                    desc: 'Exploring new technologies, open-source software, system design, cloud development, and software architecture.',
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="about-card group relative overflow-hidden rounded-[22px] border border-white/5 bg-white/[0.02] p-6 backdrop-blur-[16px] opacity-0"
                    style={{
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    {/* Glowing border top accent */}
                    <div className="absolute top-0 inset-x-0 h-[1.5px] bg-[#3B82F6] opacity-35 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Icon container */}
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.03] border border-white/5 transition-colors group-hover:bg-white/[0.06]">
                      {card.icon}
                    </div>

                    <h3 className="about-card-title font-sans text-[17px] font-bold text-white mb-2.5 tracking-wide transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="about-card-desc font-sans text-xs text-white/45 leading-relaxed transition-colors duration-300">
                      {card.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Divider 2 */}
              <div className="h-[1px] w-full bg-white/[0.06] my-12 pointer-events-none" />

              {/* Stats Section */}
              <div className="about-stats-row grid grid-cols-2 sm:grid-cols-4 gap-8">
                {[
                  { value: '600', suffix: '+', label: 'PROBLEMS SOLVED' },
                  { value: '3 Stars', suffix: '', label: 'CODECHEF', isText: true },
                  { value: 'Specialist', suffix: '', label: 'CODEFORCES', isText: true },
                  { value: '4', suffix: '+', label: 'PROJECTS BUILT' },
                ].map((stat, i) => (
                  <div key={i} className="about-stat-item flex flex-col gap-3 select-none">
                    <span className={`about-stat-value font-sans font-black uppercase tracking-tighter text-white/90 ${stat.isText ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'}`}>
                      {stat.isText ? stat.value : <CountUp end={stat.value} suffix={stat.suffix} />}
                    </span>
                    <span className="about-stat-label font-mono text-[9px] font-bold tracking-[0.25em] text-white/35 opacity-0 inline-block">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}
