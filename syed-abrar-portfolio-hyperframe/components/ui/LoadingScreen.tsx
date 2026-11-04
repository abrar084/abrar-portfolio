'use client';

import { useEffect, useRef, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'done'>('loading');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setPhase('done');
          setTimeout(onComplete, 600);
          return 100;
        }
        // Ease-in progress simulation
        const increment = p < 70 ? Math.random() * 4 + 1 : Math.random() * 1.5 + 0.5;
        return Math.min(p + increment, 100);
      });
    }, 60);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#020408] flex flex-col items-center justify-center transition-opacity duration-700 ${
        phase === 'done' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.6 + 0.1,
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: Math.random() * 3 + 's',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo mark */}
        <div className="w-20 h-20 rounded-full border-2 border-violet-500/40 flex items-center justify-center relative">
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-violet-500 animate-spin" />
          <span className="font-display font-bold text-2xl gradient-text">SA</span>
        </div>

        {/* Name */}
        <div className="text-center">
          <p className="font-display text-3xl font-bold tracking-[0.2em] text-white">
            SYED ABRAR
          </p>
          <p className="text-white/40 text-sm tracking-widest mt-1 font-mono">
            AI & DATA SCIENCE
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 via-blue-400 to-cyan-400 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage */}
        <p className="text-white/30 font-mono text-xs tracking-widest">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}
