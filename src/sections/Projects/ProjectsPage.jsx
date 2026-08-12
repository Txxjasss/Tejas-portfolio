import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Search } from 'lucide-react';
import { projects } from '../../data/portfolio';

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll trigger to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: 'all', label: 'ALL PROJECTS' },
    { id: 'ai-ml', label: 'AI / ML' },
    { id: 'fullstack', label: 'FULLSTACK' },
  ];

  // Filter project lists based on filters and search queries
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white px-8 md:px-16 py-28 md:py-36 flex flex-col items-center">
      
      {/* Back button */}
      <div className="w-full max-w-6xl mb-12 flex justify-start">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/5 bg-white/[0.02] text-xs font-mono tracking-wider text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 select-none group"
        >
          <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
          <span>BACK TO HOME</span>
        </Link>
      </div>

      {/* Title */}
      <div className="text-center mb-16 select-none">
        <h1
          style={{
            fontFamily: "'Audiowide', sans-serif",
            textShadow: '0 0 35px rgba(255,255,255,0.1)',
          }}
          className="text-4xl md:text-5xl font-black tracking-wider uppercase mb-4"
        >
          PROJECT CATALOG
        </h1>
        <p className="font-mono text-[9px] md:text-xs text-white/35 tracking-[0.38em] uppercase max-w-md mx-auto">
          EXPLORE THE SYSTEM ARCHITECTURE AND SOURCE CODE OF COMPLETED WORKS.
        </p>
      </div>

      {/* Filters & Search Row */}
      <div className="w-full max-w-6xl mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-3">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{ fontFamily: "'Audiowide', sans-serif" }}
                className={`px-5 py-2.5 rounded-lg text-[10px] tracking-[0.2em] uppercase transition-all duration-300 border ${
                  isActive 
                    ? 'bg-white text-black border-white shadow-lg shadow-white/5' 
                    : 'bg-white/[0.02] text-white/50 border-white/5 hover:text-white hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="SEARCH PROJECTS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.02] border border-white/5 focus:border-white/20 rounded-lg py-2.5 pl-10 pr-4 text-xs font-mono tracking-wider text-white placeholder-white/20 outline-none transition-all duration-300"
          />
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" />
        </div>
      </div>

      {/* Grid containing projects */}
      <div className="w-full max-w-6xl">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="project-card flex flex-col justify-between p-8 rounded-2xl border border-white/5 bg-gradient-to-br from-[#0a0a0c]/70 to-[#050507]/85 relative overflow-hidden group min-h-[480px] transition-all duration-500 hover:border-white/10"
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
                  <div className="project-placeholder-bg relative w-full h-[220px] rounded-xl border border-white/5 overflow-hidden flex items-center justify-center mb-6 bg-black/40">
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
                  <p className="font-sans text-sm text-white/60 font-light leading-relaxed mb-6">
                    {project.desc}
                  </p>
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
        ) : (
          <div className="text-center py-20 border border-white/5 rounded-2xl bg-white/[0.01]">
            <p className="font-mono text-xs text-white/30 tracking-[0.25em] uppercase">
              NO PROJECTS FOUND MATCHING THE PARAMETERS.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
