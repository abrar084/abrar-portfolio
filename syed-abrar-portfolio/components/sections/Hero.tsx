'use client';

import { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';
import dynamic from 'next/dynamic';
import { PERSONAL } from '@/lib/data';

const HeroPlanet = dynamic(() => import('@/components/3d/HeroPlanet'), { ssr: false });
const StarField = dynamic(() => import('@/components/3d/StarField'), { ssr: false });

function HeroScene() {
  return (
    <>
      {/* Ambient + directional lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight
        position={[5, 3, 5]}
        intensity={2.5}
        color="#ffffff"
        castShadow
      />
      <pointLight position={[-8, -4, -8]} intensity={0.8} color="#6b21a8" />
      <pointLight position={[8, 6, -6]} intensity={0.5} color="#0891b2" />

      {/* Stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0.5} fade speed={1} />
      <StarField count={2000} radius={60} rotationSpeed={0.00008} />

      {/* Planet */}
      <HeroPlanet />

      {/* Environment */}
      <fog attach="fog" args={['#020408', 40, 100]} />
    </>
  );
}

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple CSS-based entrance animation
    if (textRef.current) {
      textRef.current.style.opacity = '0';
      textRef.current.style.transform = 'translateY(30px)';
      setTimeout(() => {
        if (textRef.current) {
          textRef.current.style.transition = 'opacity 1s ease, transform 1s ease';
          textRef.current.style.opacity = '1';
          textRef.current.style.transform = 'translateY(0)';
        }
      }, 400);
    }
    if (btnRef.current) {
      btnRef.current.style.opacity = '0';
      setTimeout(() => {
        if (btnRef.current) {
          btnRef.current.style.transition = 'opacity 1s ease';
          btnRef.current.style.opacity = '1';
        }
      }, 1200);
    }
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[600px] flex items-center justify-start overflow-hidden"
    >
      {/* 3D Canvas */}
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 55, near: 0.1, far: 200 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
          shadows
        >
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
          {/* Subtle orbit controls — auto-rotate only, no user drag */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            autoRotate
            autoRotateSpeed={0.3}
          />
        </Canvas>
      </div>

      {/* Nebula gradient overlay */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-violet-900/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-cyan-900/15 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020408]/80 via-[#020408]/30 to-transparent" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div ref={textRef} className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-gradient-to-r from-violet-500 to-transparent" />
            <span className="font-mono text-xs text-violet-400 tracking-[0.3em] uppercase">
              Portfolio
            </span>
          </div>

          {/* Name */}
          <h1 className="font-display font-black leading-none mb-4">
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight">
              SYED
            </span>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl gradient-text tracking-tight">
              ABRAR
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/60 font-light tracking-wide mb-2">
            AI & Data Science Student
          </p>
          <p className="text-base md:text-lg text-violet-400/80 font-mono tracking-widest mb-10">
            Aspiring Data Analyst
          </p>

          {/* CTA buttons */}
          <div ref={btnRef} className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollToSection('about')}
              className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold tracking-wide hover:from-violet-500 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 focus:outline-none"
            >
              <span className="relative z-10">Explore My Universe</span>
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="group px-8 py-3.5 rounded-full border border-white/20 text-white/80 font-semibold tracking-wide hover:border-white/50 hover:text-white hover:bg-white/5 transition-all duration-300 focus:outline-none"
            >
              View My Projects
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/30 font-mono text-xs tracking-widest">SCROLL</span>
        <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
