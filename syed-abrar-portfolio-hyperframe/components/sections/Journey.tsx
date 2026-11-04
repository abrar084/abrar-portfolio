'use client';

import { useRef, useEffect } from 'react';
import { TIMELINE } from '@/lib/data';

const TYPE_STYLES: Record<string, { color: string; label: string }> = {
  education:     { color: '#6366f1', label: 'Education'    },
  project:       { color: '#0891b2', label: 'Project'      },
  certification: { color: '#f59e0b', label: 'Certification'},
  goal:          { color: '#8b5cf6', label: 'Future Goal'  },
};

export default function Journey() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = itemRefs.current.map((el) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && el) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  return (
    <section id="journey" className="relative section-padding overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-violet-900/8 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-5 border-b border-white/[0.07]">
          <div className="hf-tag">(04) Journey</div>
          <p className="hidden md:block text-xs text-white/25 font-mono tracking-widest">From Idea To Launch</p>
        </div>

        <div className="mb-12">
          <h2 className="font-display font-black text-4xl md:text-5xl text-white mt-6 mb-2">
            Mission <span className="gradient-text">Timeline</span>
          </h2>
          <p className="text-white/35 text-sm max-w-lg">
            The flight path from launch day to the stars.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-10">
          {Object.entries(TYPE_STYLES).map(([type, s]) => (
            <div key={type} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="text-[10px] font-mono text-white/35 tracking-wide">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Process steps — Hyperframe { 001 } style */}
        <div className="flex flex-col">
          {TIMELINE.map((item, i) => {
            const s = TYPE_STYLES[item.type] ?? TYPE_STYLES.project;
            return (
              <div
                key={item.id}
                ref={(el) => { itemRefs.current[i] = el; }}
                style={{
                  opacity: 0,
                  transform: 'translateY(24px)',
                  transition: `opacity 0.7s ease ${i * 0.08}s, transform 0.7s ease ${i * 0.08}s`,
                }}
                className="group grid md:grid-cols-[140px_1fr] gap-4 md:gap-10 py-7 border-b border-white/[0.07] last:border-0 hover:bg-white/[0.012] transition-colors px-1"
              >
                {/* Left — year + num */}
                <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-2">
                  <span className="hf-num flex-shrink-0">{'{ ' + String(i + 1).padStart(3, '0') + ' }'}</span>
                  <span
                    className="font-display font-black text-2xl md:text-3xl leading-none"
                    style={{ color: s.color }}
                  >
                    {item.year}
                  </span>
                </div>

                {/* Right — content */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span
                      className="text-[10px] font-mono tracking-widest uppercase rounded px-2 py-0.5"
                      style={{ color: s.color, backgroundColor: s.color + '18' }}
                    >
                      {s.label}
                    </span>
                    <span className="text-lg leading-none" aria-hidden="true">{item.icon}</span>
                  </div>
                  <h3 className="font-display font-semibold text-base md:text-lg text-white tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer marker */}
        <div className="flex items-center gap-3 mt-8 pt-6">
          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 animate-pulse" />
          <p className="font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase">To Infinity</p>
        </div>
      </div>
    </section>
  );
}
