import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import Hero from './components/Hero/Hero';
import About from './sections/About/About';
import Projects from './sections/Projects/Projects';
import Contact from './sections/Contact/Contact';
import ProjectsPage from './sections/Projects/ProjectsPage';
import CursorFollower from './components/UI/CursorFollower';


function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </>
  );
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let raf;
    function animate(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#050505] text-white">
      <CursorFollower />
      {/* Global Engineering Grid lines */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-0" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          animation: 'gridFadeIn 1.2s ease-out 0.2s forwards',
        }}
      />

      {/* Global Background Watermark - 'CREATE IMPACT' */}
      <div className="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden flex flex-col justify-center items-center opacity-[0.012] md:opacity-[0.015]">
        <span className="font-sans font-black text-[13vw] tracking-[0.1em] text-transparent [-webkit-text-stroke:1px_white] leading-none uppercase">
          CREATE
        </span>
        <span className="font-sans font-black text-[13vw] tracking-[0.1em] text-transparent [-webkit-text-stroke:1px_white] leading-none uppercase mt-4">
          IMPACT
        </span>
      </div>



      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </div>
    </main>
  );
}
