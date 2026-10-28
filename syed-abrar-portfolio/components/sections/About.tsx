'use client';

import { useRef, useEffect } from 'react';
import { PERSONAL, ABOUT } from '@/lib/data';

const STATS = [
  { label: 'Projects Built', value: '3+' },
  { label: 'Technologies', value: '15+' },
  { label: 'Focus Areas', value: 'AI & Data' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('[data-reveal]');
            cards.forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = '1';
                (card as HTMLElement).style.transform = 'translateY(0)';
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
    >
      {/* Nebula background blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-900/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div
          data-reveal
          className="text-center mb-16"
          style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
        >
          <span className="font-mono text-xs text-violet-400 tracking-[0.3em] uppercase">About</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl mt-3 text-white">
            The <span className="gradient-text">Navigator</span>
          </h2>
          <p className="text-white/40 mt-3 max-w-md mx-auto text-sm tracking-wide">
            Charting a course through data, intelligence, and innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left — Identity card */}
          <div
            data-reveal
            className="glass glass-hover rounded-2xl p-8 border border-white/10"
            style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
          >
            {/* Avatar placeholder */}
            <div className="flex items-center gap-5 mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-2xl font-display font-black text-white shadow-lg shadow-violet-500/30">
                SA
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-white tracking-wide">{PERSONAL.name}</h3>
                <p className="text-violet-400 text-sm font-mono mt-0.5">{PERSONAL.tagline}</p>
              </div>
            </div>

            <p className="text-white/70 leading-relaxed mb-6 text-sm md:text-base">
              {ABOUT.intro}
            </p>
            <p className="text-white/60 leading-relaxed text-sm">
              {ABOUT.background}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display font-bold text-2xl gradient-text">{s.value}</p>
                  <p className="text-white/40 text-xs mt-1 tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Details */}
          <div className="flex flex-col gap-6">
            {/* Interests */}
            <div
              data-reveal
              className="glass glass-hover rounded-2xl p-6 border border-white/10"
              style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl" aria-hidden="true">🌌</span>
                <h3 className="font-display font-semibold text-lg text-white tracking-wide">Interests</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {ABOUT.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1.5 rounded-full text-xs font-medium tracking-wide bg-violet-500/15 border border-violet-500/30 text-violet-300"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Career goal */}
            <div
              data-reveal
              className="glass glass-hover rounded-2xl p-6 border border-white/10"
              style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl" aria-hidden="true">🎯</span>
                <h3 className="font-display font-semibold text-lg text-white tracking-wide">Career Goal</h3>
              </div>
              <p className="text-white/70 leading-relaxed text-sm">{ABOUT.goals}</p>
            </div>

            {/* Location / availability */}
            <div
              data-reveal
              className="glass glass-hover rounded-2xl p-6 border border-white/10"
              style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl" aria-hidden="true">📍</span>
                <h3 className="font-display font-semibold text-lg text-white tracking-wide">Status</h3>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white/70 text-sm">Open to internship opportunities</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-white/70 text-sm">Currently studying AI & Data Science</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-400" />
                  <span className="text-white/70 text-sm">{PERSONAL.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
