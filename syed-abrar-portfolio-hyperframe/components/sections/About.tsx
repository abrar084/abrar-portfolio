'use client';

import { useRef, useEffect } from 'react';
import { PERSONAL, ABOUT } from '@/lib/data';

const STATS = [
  { value: '2+',        label: 'Projects Built'  },
  { value: '15+',       label: 'Technologies'     },
  { value: '2024',      label: 'Enrolled'         },
  { value: 'Hyderabad', label: 'Location'         },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el, i) => {
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, i * 120);
        });
      }
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const reveal = {
    opacity: 0,
    transform: 'translateY(28px)',
    transition: 'opacity 0.8s ease, transform 0.8s ease',
  } as React.CSSProperties;

  return (
    <section id="about" ref={sectionRef} className="relative section-padding overflow-hidden">
      {/* Subtle bg blob */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-violet-900/8 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Hyperframe section header row */}
        <div data-reveal style={reveal} className="flex items-center justify-between mb-12 pb-5 border-b border-white/[0.07]">
          <div className="hf-tag">(01) About Me</div>
          <p className="hidden md:block text-xs text-white/25 font-mono tracking-widest uppercase">
            The Navigator
          </p>
        </div>

        {/* Main headline + bio grid */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start mb-16">

          {/* Left — big headline */}
          <div data-reveal style={reveal}>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-white mb-6">
              Charting a<br />
              <span className="gradient-text">Course Through</span><br />
              Data
            </h2>
            <div className="hf-rule w-16 mb-6" />
            <p className="text-white/55 text-sm leading-relaxed">{ABOUT.intro}</p>
          </div>

          {/* Right — identity + background */}
          <div data-reveal style={reveal} className="flex flex-col gap-6">
            {/* Identity chip */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center font-display font-black text-white text-base shadow-lg shadow-violet-500/25 flex-shrink-0">
                  SA
                </div>
                <div>
                  <p className="font-display font-bold text-white text-sm tracking-wide">{PERSONAL.name}</p>
                  <p className="text-violet-400/70 text-xs font-mono tracking-widest mt-0.5">AI & Data Science</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-white/30 tracking-wide">Open to work</span>
                </div>
              </div>
              <p className="text-white/50 text-xs leading-relaxed">{ABOUT.background}</p>
            </div>

            {/* Goals */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="hf-num">{'{ goal }'}</span>
              </div>
              <p className="text-white/55 text-xs leading-relaxed">{ABOUT.goals}</p>
            </div>

            {/* Interests */}
            <div className="glass rounded-2xl p-6">
              <p className="hf-tag mb-4">Interests</p>
              <div className="flex flex-wrap gap-2">
                {ABOUT.interests.map(item => (
                  <span key={item} className="px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide border border-white/[0.08] text-white/45 bg-white/[0.02]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hyperframe stats bar */}
        <div data-reveal style={reveal} className="grid grid-cols-2 md:grid-cols-4 border border-white/[0.07] rounded-2xl overflow-hidden">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col gap-1 px-7 py-6 ${i < STATS.length - 1 ? 'border-r border-white/[0.07]' : ''} ${i >= 2 ? 'border-t border-white/[0.07] md:border-t-0' : ''}`}
            >
              <p className="font-display font-black text-2xl md:text-3xl gradient-text">{s.value}</p>
              <p className="text-white/30 text-[10px] font-mono tracking-widest uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
