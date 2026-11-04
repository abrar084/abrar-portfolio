'use client';

import { useRef, useEffect, useState } from 'react';
import { PROJECTS, Project } from '@/lib/data';

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const rowRef  = useRef<HTMLDivElement>(null);
  const [open,  setOpen]    = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && rowRef.current) {
        rowRef.current.style.opacity = '1';
        rowRef.current.style.transform = 'translateY(0)';
      }
    }, { threshold: 0.15 });
    if (rowRef.current) observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rowRef}
      style={{
        opacity: 0,
        transform: 'translateY(32px)',
        transition: `opacity 0.7s ease ${index * 0.12}s, transform 0.7s ease ${index * 0.12}s`,
      }}
    >
      {/* Row header — click to expand */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full group border-b border-white/[0.07] py-6 flex items-center gap-5 text-left focus:outline-none hover:bg-white/[0.015] transition-colors px-1"
        aria-expanded={open}
      >
        {/* Number */}
        <span className="hf-num flex-shrink-0 w-12 text-center">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Icon */}
        <span className="text-xl flex-shrink-0" aria-hidden="true">{project.icon}</span>

        {/* Title + subtitle */}
        <div className="flex-1 min-w-0">
          <p className="font-display font-bold text-base md:text-lg text-white tracking-wide group-hover:gradient-text transition-all truncate">
            {project.title}
          </p>
          <p className="text-white/35 text-xs font-mono tracking-widest mt-0.5">{project.subtitle}</p>
        </div>

        {/* Tech pills — hidden on small */}
        <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
          {project.technologies.slice(0, 3).map(t => (
            <span key={t} className="px-2 py-0.5 rounded text-[10px] border border-white/[0.08] text-white/35 font-mono">{t}</span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-[10px] text-white/25 font-mono">+{project.technologies.length - 3}</span>
          )}
        </div>

        {/* Chevron */}
        <svg
          className={`w-4 h-4 text-white/25 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {/* Expandable detail panel */}
      <div className={`overflow-hidden transition-all duration-500 ${open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="grid md:grid-cols-2 gap-6 py-7 px-1 border-b border-white/[0.07]">

          {/* Left */}
          <div>
            {/* Accent top bar */}
            <div className="h-px w-12 mb-5" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.accent})` }} />
            <p className="text-white/60 text-sm leading-relaxed mb-5">{project.description}</p>

            {/* Features */}
            <ul className="space-y-2">
              {project.features.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-xs text-white/45">
                  <span className="mt-1 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: project.accent }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4">
            {/* All tech */}
            <div>
              <p className="hf-tag mb-3">Technologies</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded text-[10px] font-mono border border-white/[0.08] text-white/45">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3 mt-auto">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-[11px] !py-2 !px-4 focus:outline-none"
                aria-label={`View ${project.title} on GitHub`}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                GitHub
              </a>
              {project.demo !== '#' && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-[11px] !py-2 !px-4 focus:outline-none"
                  aria-label={`Live demo of ${project.title}`}
                >
                  Live Demo ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative section-padding overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-cyan-900/6 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Section header */}
        <div className="flex items-center justify-between mb-4 pb-5 border-b border-white/[0.07]">
          <div className="hf-tag">(02) Featured Projects</div>
          <p className="hidden md:block text-xs text-white/25 font-mono tracking-widest">Our Recent Work</p>
        </div>

        <div className="mb-10">
          <h2 className="font-display font-black text-4xl md:text-5xl text-white mt-6 mb-2">
            Mission <span className="gradient-text">Log</span>
          </h2>
          <p className="text-white/35 text-sm max-w-lg">
            Projects built across AI, data analytics, and software development.
          </p>
        </div>

        {/* Project rows — Hyperframe accordion style */}
        <div>
          {PROJECTS.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
        </div>

        <p className="text-white/20 text-[10px] font-mono tracking-widest mt-8">
          * GitHub links point to profile — direct repo links coming soon.
        </p>
      </div>
    </section>
  );
}
