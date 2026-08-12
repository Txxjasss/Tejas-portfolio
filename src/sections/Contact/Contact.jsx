import React from 'react';
import { Mail, FileText, ArrowUpRight } from 'lucide-react';
import { personal } from '../../data/portfolio';

export default function Contact() {
  return (
    <section 
      id="contact" 
      className="relative w-full overflow-hidden bg-transparent px-8 md:px-16 py-32 md:py-44 flex flex-col items-center justify-center min-h-[75vh]"
    >

      <div className="absolute right-[8%] top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.03] text-white text-[10vw] leading-[1.1] flex flex-col items-center z-0">
        <span style={{ fontFamily: "Georgia, serif" }}>世</span>
        <span style={{ fontFamily: "Georgia, serif" }}>界</span>
      </div>

      {/* 2 ─── Content Area */}
      <div className="relative z-10 mx-auto max-w-4xl text-center flex flex-col items-center">
        {/* Glowing header */}
        <h2
          style={{
            fontFamily: "'Audiowide', sans-serif",
            fontStyle: 'italic',
            textShadow: '0 0 20px rgba(255,255,255,0.15)',
          }}
          className="text-4xl md:text-6xl font-black uppercase tracking-wider text-white mb-6"
        >
          LET'S BUILD SOMETHING.
        </h2>

        {/* Description paragraph */}
        <p className="font-sans text-sm md:text-base text-white/55 font-light leading-relaxed max-w-2xl mb-12">
          Driven by curiosity and a passion for software engineering, I enjoy building products that are both functional and intuitive. I'm currently open to internship opportunities and excited to contribute to impactful teams.
        </p>

        {/* Social link row (Email, GitHub, LinkedIn) */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          <a
            href={`mailto:${personal.email}`}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/5 bg-white/[0.02] text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300 backdrop-blur-md hover:scale-[1.03]"
          >
            <Mail size={15} className="opacity-70" />
            <span>Email</span>
          </a>
          
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/5 bg-white/[0.02] text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300 backdrop-blur-md hover:scale-[1.03]"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span>GitHub</span>
          </a>

          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/5 bg-white/[0.02] text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300 backdrop-blur-md hover:scale-[1.03]"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Centered large resume button */}
        <div className="flex justify-center">
          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/10 bg-white/[0.04] text-sm font-semibold text-white/90 hover:text-white hover:bg-white/[0.08] hover:border-white/35 transition-all duration-300 backdrop-blur-md hover:scale-[1.03] group"
          >
            <FileText size={16} />
            <span>Resume</span>
            <ArrowUpRight size={15} className="opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
}
