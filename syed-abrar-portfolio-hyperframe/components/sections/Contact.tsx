'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import dynamic from 'next/dynamic';
import { PERSONAL } from '@/lib/data';

const EarthScene = dynamic(() => import('@/components/3d/EarthScene'), { ssr: false });

const LINKS = [
  {
    label: 'LinkedIn',
    desc: 'Connect professionally',
    href: PERSONAL.linkedin,
    color: '#0a66c2',
    accent: '#5aacf5',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    desc: 'Explore my repositories',
    href: PERSONAL.github,
    color: '#7c3aed',
    accent: '#a78bfa',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    desc: PERSONAL.email,
    href: `mailto:${PERSONAL.email}`,
    color: '#059669',
    accent: '#34d399',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
  },
  {
    label: 'Resume',
    desc: 'Download my CV',
    href: PERSONAL.resume,
    color: '#b45309',
    accent: '#fbbf24',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative min-h-screen flex items-center overflow-hidden">

      {/* 3D Earth — full background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 3, 9], fov: 50, near: 0.1, far: 200 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.0 }}
        >
          <Suspense fallback={null}>
            <EarthScene />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} autoRotate autoRotateSpeed={0.35} />
        </Canvas>
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080a0f]/30 via-[#080a0f]/65 to-[#080a0f]/92" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080a0f]/88 via-[#080a0f]/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto section-padding w-full">
        <div className="max-w-xl">

          {/* Header */}
          <div className="flex items-center gap-3 mb-8 pb-5 border-b border-white/[0.07]">
            <div className="hf-tag">(05) Contact</div>
          </div>

          <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-3">
            Make <span className="gradient-text">Contact</span>
          </h2>
          <p className="text-white/45 text-sm leading-relaxed mb-2 max-w-sm">
            Actively looking for internship opportunities in data analytics, machine learning, and AI. Let's connect.
          </p>
          <p className="text-white/25 font-mono text-xs tracking-widest mb-10">
            📍 {PERSONAL.location}
          </p>

          {/* Contact rows — Hyperframe accordion row style */}
          <div className="flex flex-col border border-white/[0.07] rounded-2xl overflow-hidden">
            {LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className={`group flex items-center gap-4 px-5 py-4 transition-all duration-300 hover:bg-white/[0.03] focus:outline-none ${
                  i < LINKS.length - 1 ? 'border-b border-white/[0.07]' : ''
                }`}
              >
                {/* Num */}
                <span className="font-mono text-[10px] text-white/20 w-6 flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Icon */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: link.color + '18', color: link.accent }}
                >
                  {link.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-white text-sm tracking-wide">{link.label}</p>
                  <p className="text-white/35 text-[10px] font-mono mt-0.5 truncate">{link.desc}</p>
                </div>

                {/* Arrow */}
                <svg
                  className="w-4 h-4 text-white/15 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all flex-shrink-0"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
            ))}
          </div>

          {/* Footer */}
          <p className="text-white/15 text-[10px] font-mono mt-10 tracking-widest">
            © {new Date().getFullYear()} Syed Abrar · Built with Next.js & Three.js
          </p>
        </div>
      </div>
    </section>
  );
}
