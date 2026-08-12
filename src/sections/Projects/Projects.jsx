import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1 — Heading reveal
      gsap.fromTo('.projects-heading-line',
        { y: 30, opacity: 0, filter: 'blur(6px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );

      // 2 — Cards staggered reveal
      gsap.fromTo('.project-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projectList = [
    {
      id: 1,
      title: 'Workforce Insight',
      subtitle: 'Predictive Analytics for Employee Attrition',
      desc: 'Machine learning platform that predicts employee attrition using advanced classification models, featuring a production-ready MLOps pipeline with automated training, evaluation, and deployment.',
      tags: 'ML • MLOPS • PREDICTIVE ANALYTICS',
      placeholderText: 'Workforce Insight',
      imageUrl: '/workforce_insight.png',
      githubUrl: 'https://github.com/Txxjasss/Workforce-Insight',
      liveUrl: 'https://txxjasss-workforce-insight.hf.space/',
      accentColor: 'rgba(59, 130, 246, 0.45)', // Electric Blue accent glow
    },
    {
      id: 2,
      title: 'JobSphere',
      subtitle: 'Full-Stack Career Portal',
      desc: 'A modern full-stack recruitment platform that enables job seekers to discover opportunities, apply seamlessly, and track applications while helping employers post openings, manage candidates, and streamline hiring through an intuitive dashboard.',
      tags: 'REACT • SPRING BOOT • JAVA • FULL STACK',
      placeholderText: 'JobSphere',
      imageUrl: '/jobsphere.png',
      githubUrl: '#',
      accentColor: 'rgba(59, 130, 246, 0.45)', // Electric Blue accent glow
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full overflow-hidden bg-transparent px-8 md:px-16 py-28 md:py-36"
    >
      <style>{`
        .project-card {
          background: linear-gradient(135deg, rgba(10,10,12,0.7) 0%, rgba(5,5,7,0.85) 100%);
          backdrop-filter: blur(12px);
          transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .project-card:hover {
          transform: translateY(-8px) scale-[1.008] !important;
          border-color: rgba(255, 255, 255, 0.12) !important;
        }
        .project-placeholder-bg {
          background: radial-gradient(circle at center, rgba(15, 15, 20, 0.8) 0%, rgba(8, 8, 10, 0.95) 100%);
        }
      `}</style>

      {/* Decorative background watermark text */}
      <div 
        className="pointer-events-none absolute right-[10%] top-[10%] select-none font-sans font-black text-[120px] md:text-[180px] leading-none opacity-[0.015] text-white tracking-widest uppercase"
        aria-hidden
      >
        WORK
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="projects-heading-line mb-16 md:mb-20 max-w-3xl">
          <h2
            style={{
              fontFamily: "'Audiowide', sans-serif",
              fontStyle: 'italic',
            }}
            className="text-4xl md:text-5xl font-black uppercase tracking-wider text-white mb-4"
          >
            Selected Projects
          </h2>
          <p className="font-sans text-sm md:text-base text-white/40 font-light leading-relaxed">
            Built through curiosity, self-learning, and real-world experimentation.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="projects-grid grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {projectList.map((project) => (
            <div
              key={project.id}
              className="project-card flex flex-col justify-between p-8 rounded-2xl border border-white/5 relative overflow-hidden group min-h-[480px]"
            >
              {/* Radial glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-700"
                style={{
                  background: `radial-gradient(circle at 50% 30%, ${project.accentColor} 0%, transparent 60%)`,
                }}
              />

              <div>
                {/* Title & Subtitle */}
                <div className="mb-6">
                  <h3
                    style={{ fontFamily: "'Audiowide', sans-serif" }}
                    className="text-2xl font-bold text-white tracking-wide mb-1"
                  >
                    {project.title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-white/45 tracking-wide">
                    {project.subtitle}
                  </p>
                </div>

                {/* Styled Project Image / Placeholder Box */}
                <div className="project-placeholder-bg relative w-full h-[220px] rounded-xl border border-white/5 overflow-hidden flex items-center justify-center mb-6">
                  {project.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <>
                      {/* Decorative mesh/grid lines inside placeholder */}
                      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{
                          backgroundImage: `
                            linear-gradient(to right, #ffffff 1px, transparent 1px),
                            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
                          `,
                          backgroundSize: '16px 16px',
                        }}
                      />
                      
                      {/* Soft background glow */}
                      <div 
                        className="absolute w-[120px] h-[120px] rounded-full opacity-[0.12] filter blur-xl group-hover:opacity-[0.22] transition-opacity duration-500"
                        style={{ background: project.accentColor }}
                      />

                      {/* Centered text */}
                      <span className="font-mono text-xs text-white/30 tracking-[0.25em] uppercase z-10 group-hover:text-white/60 transition-colors duration-300">
                        {project.placeholderText}
                      </span>
                    </>
                  )}
                </div>

                {/* Description */}
                {Array.isArray(project.desc) ? (
                  <ul className="space-y-3 text-white/60 font-sans text-xs md:text-sm font-light leading-relaxed mb-6 list-none pl-0">
                    {project.desc.map((bullet, idx) => (
                      <li key={idx} className="relative pl-5 flex items-start">
                        <span className="absolute left-0 text-white/30 select-none">—</span>
                        <span dangerouslySetInnerHTML={{ __html: bullet }} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-sans text-sm text-white/60 font-light leading-relaxed mb-6">
                    {project.desc}
                  </p>
                )}
              </div>

              {/* Footer row with tag list and Action Button */}
              <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-auto">
                <span className="font-mono text-[9px] text-white/35 tracking-[0.2em] uppercase">
                  {project.tags}
                </span>

                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-xs font-medium text-white/65 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300"
                    >
                      <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                      <span>Github</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-xs font-medium text-white/65 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300"
                    >
                      <ExternalLink size={13} />
                      <span>Live</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="mt-16 flex justify-center">
          <Link
            to="/projects"
            style={{ fontFamily: "'Audiowide', sans-serif" }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-white/5 bg-white/[0.02] text-xs tracking-[0.2em] text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-black/40 select-none group"
          >
            <span>VIEW ALL PROJECTS</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
