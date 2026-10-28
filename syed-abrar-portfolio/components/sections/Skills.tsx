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
    <div className="glass rounded-2xl p-6 border border-white/10">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{ backgroundColor: skill.color, boxShadow: `0 0 10px ${skill.color}` }}
        />
        <h3 className="font-display font-bold text-xl text-white tracking-wide">{skill.name}</h3>
      </div>
      <p className="text-white/60 text-sm leading-relaxed mb-5">{skill.description}</p>
      <div className="flex flex-wrap gap-2">
        {skill.technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1.5 rounded-full text-xs font-medium tracking-wide border"
            style={{
              color: skill.color,
              borderColor: skill.color + '50',
              backgroundColor: skill.color + '15',
            }}
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
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-900/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="font-mono text-xs text-violet-400 tracking-[0.3em] uppercase">Skills</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl mt-3 text-white">
            The <span className="gradient-text">Solar System</span>
          </h2>
          <p className="text-white/40 mt-3 max-w-md mx-auto text-sm tracking-wide">
            Each planet orbits around a core of curiosity. Click one to reveal its technologies.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* 3D Canvas */}
          <div className="lg:col-span-2 h-[420px] md:h-[520px] rounded-2xl overflow-hidden border border-white/5 glass relative">
            <Canvas
              camera={{ position: [0, 12, 18], fov: 50, near: 0.1, far: 200 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.3} />
                <Stars radius={80} depth={30} count={2000} factor={3} saturation={0.3} fade />
                <SolarSystem selected={selected} onSelect={setSelected} />
              </Suspense>
              <OrbitControls
                enableZoom={true}
                minDistance={8}
                maxDistance={28}
                enablePan={false}
                maxPolarAngle={Math.PI * 0.65}
                minPolarAngle={Math.PI * 0.2}
                autoRotate
                autoRotateSpeed={0.3}
              />
            </Canvas>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
              <p className="font-mono text-[10px] text-white/25 tracking-widest">DRAG TO ROTATE · SCROLL TO ZOOM</p>
            </div>
          </div>

          {/* Info panel */}
          <div className="flex flex-col gap-4">
            {selected ? (
              <SkillPanel skill={selected} />
            ) : (
              <div className="glass rounded-2xl p-6 border border-white/10 text-center">
                <div className="text-3xl mb-3" aria-hidden="true">🪐</div>
                <p className="text-white/50 text-sm leading-relaxed">
                  Click any planet to explore the technologies in that skill category.
                </p>
              </div>
            )}

            {/* Legend */}
            <div className="glass rounded-2xl p-5 border border-white/10">
              <p className="text-white/40 text-xs font-mono tracking-widest mb-4 uppercase">Skill Map</p>
              <div className="flex flex-col gap-1.5">
                {SKILLS.map((skill) => (
                  <button
                    key={skill.id}
                    onClick={() => setSelected(selected?.id === skill.id ? null : skill)}
                    className="flex items-center gap-3 text-left rounded-lg px-2 py-1.5 hover:bg-white/5 transition-colors focus:outline-none"
                    aria-pressed={selected?.id === skill.id}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all"
                      style={{
                        backgroundColor: skill.color,
                        boxShadow: selected?.id === skill.id ? `0 0 8px ${skill.color}` : 'none',
                      }}
                    />
                    <span
                      className="text-xs font-medium tracking-wide transition-colors"
                      style={{ color: selected?.id === skill.id ? skill.color : 'rgba(255,255,255,0.6)' }}
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
