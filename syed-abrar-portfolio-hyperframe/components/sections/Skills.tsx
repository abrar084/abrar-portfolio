'use client';

import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import dynamic from 'next/dynamic';
import { SKILLS, SkillCategory } from '@/lib/data';

const SolarSystem = dynamic(() => import('@/components/3d/SolarSystem'), { ssr: false });

function SkillPanel({ skill }: { skill: SkillCategory }) {
  return (
    <div className="glass rounded-2xl p-6 border border-white/[0.08] animate-[fadeUp_0.4s_ease]">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: skill.color, boxShadow: `0 0 8px ${skill.color}` }} />
        <span className="hf-num">{'{ ' + skill.id + ' }'}</span>
      </div>
      <h3 className="font-display font-bold text-xl text-white tracking-wide mt-3 mb-2">{skill.name}</h3>
      <p className="text-white/50 text-xs leading-relaxed mb-5">{skill.description}</p>
      <div className="hf-rule mb-4" />
      <div className="flex flex-wrap gap-2">
        {skill.technologies.map(tech => (
          <span
            key={tech}
            className="px-3 py-1.5 rounded text-[10px] font-mono border"
            style={{ color: skill.color, borderColor: skill.color + '40', backgroundColor: skill.color + '10' }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const [selected, setSelected] = useState<SkillCategory | null>(null);

  return (
    <section id="skills" className="relative section-padding overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-900/8 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-5 border-b border-white/[0.07]">
          <div className="hf-tag">(03) Skills</div>
          <p className="hidden md:block text-xs text-white/25 font-mono tracking-widest">Interactive Solar System</p>
        </div>

        <div className="mb-10">
          <h2 className="font-display font-black text-4xl md:text-5xl text-white mt-6 mb-2">
            The <span className="gradient-text">Solar System</span>
          </h2>
          <p className="text-white/35 text-sm max-w-lg">
            Each planet orbits a core of curiosity. Click a planet to reveal its stack.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">

          {/* 3D Canvas */}
          <div className="lg:col-span-2 h-[420px] md:h-[500px] rounded-2xl overflow-hidden border border-white/[0.07] glass relative">
            <Canvas
              camera={{ position: [0, 12, 18], fov: 50, near: 0.1, far: 200 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.3} />
                <Stars radius={80} depth={30} count={1800} factor={3} saturation={0.3} fade />
                <SolarSystem selected={selected} onSelect={setSelected} />
              </Suspense>
              <OrbitControls
                enableZoom minDistance={8} maxDistance={28}
                enablePan={false}
                maxPolarAngle={Math.PI * 0.65}
                minPolarAngle={Math.PI * 0.2}
                autoRotate autoRotateSpeed={0.3}
              />
            </Canvas>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none">
              <p className="font-mono text-[9px] text-white/20 tracking-widest">DRAG · ZOOM · CLICK</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            {selected ? (
              <SkillPanel skill={selected} />
            ) : (
              <div className="glass rounded-2xl p-6 border border-white/[0.08] text-center">
                <div className="text-3xl mb-3" aria-hidden="true">🪐</div>
                <p className="text-white/40 text-xs leading-relaxed">
                  Click any planet to explore its technologies.
                </p>
              </div>
            )}

            {/* Legend */}
            <div className="glass rounded-2xl p-5 border border-white/[0.08]">
              <p className="hf-tag mb-4">Skill Map</p>
              <div className="flex flex-col gap-1">
                {SKILLS.map(skill => (
                  <button
                    key={skill.id}
                    onClick={() => setSelected(selected?.id === skill.id ? null : skill)}
                    className="flex items-center gap-3 text-left rounded-lg px-2 py-2 hover:bg-white/[0.03] transition-colors focus:outline-none"
                    aria-pressed={selected?.id === skill.id}
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0 transition-all"
                      style={{
                        backgroundColor: skill.color,
                        boxShadow: selected?.id === skill.id ? `0 0 8px ${skill.color}` : 'none',
                      }}
                    />
                    <span
                      className="text-[11px] font-mono tracking-wide transition-colors"
                      style={{ color: selected?.id === skill.id ? skill.color : 'rgba(244,246,255,0.4)' }}
                    >
                      {skill.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
