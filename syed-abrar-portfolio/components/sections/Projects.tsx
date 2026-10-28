'use client';

import { useRef, useEffect, useState } from 'react';
import { PROJECTS, Project } from '@/lib/data';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && cardRef.current) {
          cardRef.current.style.opacity = '1';
          cardRef.current.style.transform = 'translateY(0)';
        }
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative glass rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-white/20"
      style={{
        opacity: 0,
        transform: 'translateY(40px)',
        transition: `opacity 0.7s ease ${index * 0.15}s, transform 0.7s ease ${index * 0.15}s`,
        boxShadow: hovered ? `0 0 40px ${project.color}20` : 'none',
      }}
    >
      {/* Gradient accent bar */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${project.color}, ${project.accent})` }}
      />

      {/* Top strip */}
      <div className="relative px-6 pt-6 pb-4">
        {/* Glow blob */}
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: project.color }}
        />

        <div className="flex items-start justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">{project.icon}</span>
              <span
                className="font-mono text-xs tracking-widest uppercase"
                style={{ color: project.accent }}
              >
                {project.subtitle}
              </span>
            </div>
            <h3 className="font-display font-bold text-2xl text-white tracking-wide">{project.title}</h3>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 pb-4">
        <p className="text-white/60 text-sm leading-relaxed">{project.description}</p>
      </div>

      {/* Features */}
      <div className="px-6 pb-4">
        <p className="text-xs font-mono tracking-widest text-white/30 uppercase mb-3">Key Features</p>
        <ul className="space-y-2">
          {project.features.map((feat) => (
            <li key={feat} className="flex items-start gap-2.5 text-sm text-white/65">
              <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: project.accent }} />
              {feat}
            </li>
          ))}
        </ul>
      </div>

      {/* Technologies */}
      <div className="px-6 pb-5">
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-full text-xs font-medium tracking-wide bg-white/5 border border-white/10 text-white/60"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-6 pb-6 flex items-center gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold tracking-wide transition-all duration-300 focus:outline-none"
          style={{
            borderColor: project.color + '60',
            color: project.accent,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = project.color + '20';
            (e.currentTarget as HTMLElement).style.borderColor = project.color;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
            (e.currentTarget as HTMLElement).style.borderColor = project.color + '60';
          }}
          aria-label={`View ${project.title} on GitHub`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          GitHub
        </a>
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide text-[#020408] transition-all duration-300 focus:outline-none hover:opacity-90"
          style={{ background: `linear-gradient(135deg, ${project.color}, ${project.accent})` }}
          aria-label={`View live demo of ${project.title}`}
        >
          Live Demo
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-cyan-900/8 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-violet-400 tracking-[0.3em] uppercase">Projects</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl mt-3 text-white">
            Mission <span className="gradient-text">Log</span>
          </h2>
          <p className="text-white/40 mt-3 max-w-md mx-auto text-sm tracking-wide">
            Missions completed across AI, data science, and web development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <p className="text-center text-white/25 text-xs font-mono tracking-widest mt-10">
          * GitHub and demo links are placeholders — update them in lib/data.ts
        </p>
      </div>
    </section>
  );
}
