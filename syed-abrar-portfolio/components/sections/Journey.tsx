'use client';

import { useRef, useEffect } from 'react';
import { TIMELINE } from '@/lib/data';

const TYPE_STYLES: Record<string, { color: string; bg: string; label: string }> = {
  education:    { color: '#6366f1', bg: '#6366f120', label: 'Education' },
  project:      { color: '#0891b2', bg: '#0891b220', label: 'Project' },
  certification:{ color: '#f59e0b', bg: '#f59e0b20', label: 'Certification' },
  goal:         { color: '#8b5cf6', bg: '#8b5cf620', label: 'Future Goal' },
};

export default function Journey() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = itemRefs.current.map((el, i) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && el) {
            el.style.opacity = '1';
            el.style.transform = 'translateX(0)';
          }
        },
        { threshold: 0.25 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <section id="journey" className="relative section-padding overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-violet-900/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-violet-400 tracking-[0.3em] uppercase">Timeline</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl mt-3 text-white">
            Mission <span className="gradient-text">Timeline</span>
          </h2>
          <p className="text-white/40 mt-3 max-w-md mx-auto text-sm tracking-wide">
            The flight path from launch to the stars.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(TYPE_STYLES).map(([type, style]) => (
            <div key={type} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: style.color }} />
              <span className="text-xs text-white/50 tracking-wide">{style.label}</span>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-blue-500/30 to-transparent -translate-x-px" />

          <div className="flex flex-col gap-8">
            {TIMELINE.map((item, i) => {
              const style = TYPE_STYLES[item.type] ?? TYPE_STYLES.project;
              const isRight = i % 2 === 0;

              return (
                <div
                  key={item.id}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  style={{
                    opacity: 0,
                    transform: `translateX(${isRight ? '-20px' : '20px'})`,
                    transition: `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s`,
                  }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isRight ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Card */}
                  <div
                    className={`ml-14 md:ml-0 md:w-[calc(50%-2.5rem)] glass glass-hover rounded-2xl p-5 border border-white/10 ${
                      isRight ? 'md:mr-10' : 'md:ml-10'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span
                          className="text-xs font-mono tracking-widest uppercase rounded-full px-2.5 py-0.5"
                          style={{ color: style.color, backgroundColor: style.bg }}
                        >
                          {style.label}
                        </span>
                        <h3 className="font-display font-semibold text-base text-white mt-2 tracking-wide">
                          {item.title}
                        </h3>
                      </div>
                      <span className="text-lg" aria-hidden="true">{item.icon}</span>
                    </div>
                    <p className="text-white/55 text-sm leading-relaxed">{item.description}</p>
                    <p
                      className="font-mono text-xs mt-3 font-bold tracking-widest"
                      style={{ color: style.color }}
                    >
                      {item.year}
                    </p>
                  </div>

                  {/* Dot on timeline */}
                  <div
                    className="absolute left-4 md:left-1/2 top-5 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-[#020408] flex items-center justify-center z-10"
                    style={{ backgroundColor: style.color }}
                    aria-hidden="true"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* End indicator */}
          <div className="absolute left-6 md:left-1/2 bottom-0 -translate-x-1/2 flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 animate-pulse" />
            <p className="text-white/20 font-mono text-[10px] tracking-widest mt-2 whitespace-nowrap">
              TO INFINITY
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
