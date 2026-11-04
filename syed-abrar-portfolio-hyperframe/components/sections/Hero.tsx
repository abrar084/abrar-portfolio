'use client';

import { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import dynamic from 'next/dynamic';
import { PERSONAL } from '@/lib/data';

const HeroPlanet = dynamic(() => import('@/components/3d/HeroPlanet'), { ssr: false });
const StarField  = dynamic(() => import('@/components/3d/StarField'),  { ssr: false });

const MARQUEE_ITEMS = [
  'Python', 'Machine Learning', 'Data Analytics', 'SQL', 'Tableau',
  'Scikit-learn', 'Data Visualisation', 'Pandas', 'NumPy', 'Flask',
  'Business Intelligence', 'XGBoost', 'PostgreSQL', 'EDA',
];

function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.12} />
      <directionalLight position={[5, 3, 5]} intensity={2.2} color="#ffffff" castShadow />
      <pointLight position={[-8, -4, -8]} intensity={0.7} color="#6b21a8" />
      <pointLight position={[8,  6, -6]} intensity={0.4} color="#0891b2" />
      <Stars radius={100} depth={50} count={4500} factor={4} saturation={0.4} fade speed={0.8} />
      <StarField count={1800} radius={60} rotationSpeed={0.00007} />
      <HeroPlanet />
      <fog attach="fog" args={['#080a0f', 40, 100]} />
    </>
  );
}

export default function Hero() {
  const headRef = useRef<HTMLDivElement>(null);
  const subRef  = useRef<HTMLDivElement>(null);
  const btnRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animate = (el: HTMLElement | null, delay: number) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      setTimeout(() => {
        if (!el) return;
        el.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay);
    };
    animate(headRef.current, 300);
    animate(subRef.current,  700);
    animate(btnRef.current, 1100);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="relative w-full h-screen min-h-[640px] flex flex-col justify-end overflow-hidden">

      {/* 3D Canvas */}
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 55, near: 0.1, far: 200 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.15 }}
          shadows
        >
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} autoRotate autoRotateSpeed={0.25} />
        </Canvas>
      </div>

      {/* Left-side gradient mask */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#080a0f]/85 via-[#080a0f]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080a0f]/70 via-transparent to-transparent" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-violet-900/20 via-transparent to-transparent" />
      </div>

      {/* Content — sits at bottom-left like Hyperframe */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pb-20 md:pb-28">

        {/* Year + status tag */}
        <div ref={headRef} className="mb-8">
          <div className="flex items-center gap-3 mb-7">
            <div className="hf-tag">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for Internships · {new Date().getFullYear()}
            </div>
          </div>

          {/* Big editorial name */}
          <h1 className="font-display font-black leading-[0.92] tracking-tight mb-5">
            <span className="block text-[clamp(3.5rem,10vw,7.5rem)] text-white">SYED</span>
            <span className="block text-[clamp(3.5rem,10vw,7.5rem)] gradient-text">ABRAR</span>
          </h1>

          {/* Thin divider */}
          <div className="hf-rule w-32 mb-5" />

          {/* Subtitle row */}
          <div ref={subRef} className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2">
            <p className="text-white/60 text-sm md:text-base font-light tracking-wide">AI & Data Science Student</p>
            <span className="text-white/20 hidden md:block">·</span>
            <p className="font-mono text-xs text-violet-400/80 tracking-[0.2em] uppercase">Aspiring Data Analyst</p>
          </div>
          <p className="text-white/35 text-xs font-mono tracking-wider">
            Exploring Data. Building Intelligent Solutions.
          </p>
        </div>

        {/* CTAs */}
        <div ref={btnRef} className="flex flex-wrap gap-3">
          <button onClick={() => scrollTo('about')} className="btn-primary focus:outline-none">
            Explore My Universe
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </button>
          <button onClick={() => scrollTo('projects')} className="btn-ghost focus:outline-none">
            View Projects
          </button>
          <a href={PERSONAL.resume} target="_blank" rel="noopener noreferrer"
            className="btn-ghost focus:outline-none">
            Download Resume
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Marquee strip at the very bottom */}
      <div className="relative z-10 border-t border-white/[0.06] bg-[#080a0f]/60 backdrop-blur-sm py-3 overflow-hidden">
        <div className="marquee-track select-none">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center gap-4 px-6 text-[10px] font-mono tracking-[0.22em] uppercase text-white/25 whitespace-nowrap">
              {item}
              <span className="text-violet-500/40">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute right-8 bottom-20 z-10 hidden md:flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/20" />
        <p className="font-mono text-[9px] tracking-[0.3em] text-white/25 [writing-mode:vertical-rl]">SCROLL</p>
      </div>
    </section>
  );
}
