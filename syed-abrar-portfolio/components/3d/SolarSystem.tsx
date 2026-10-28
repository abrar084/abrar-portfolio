'use client';

import { useRef, useState, useCallback } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { Html, Ring, Line } from '@react-three/drei';
import * as THREE from 'three';
import { SKILLS, SkillCategory } from '@/lib/data';

// Individual orbiting skill planet
function SkillPlanet({
  skill,
  selected,
  onSelect,
}: {
  skill: SkillCategory;
  selected: boolean;
  onSelect: (skill: SkillCategory | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      const angle = t * skill.speed;
      groupRef.current.position.x = Math.cos(angle) * skill.orbitRadius;
      groupRef.current.position.z = Math.sin(angle) * skill.orbitRadius;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      // Pulse on hover/select
      const targetScale = selected ? 1.4 : hovered ? 1.2 : 1.0;
      const s = meshRef.current.scale.x;
      meshRef.current.scale.setScalar(s + (targetScale - s) * 0.08);
    }
  });

  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      onSelect(selected ? null : skill);
    },
    [selected, skill, onSelect]
  );

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'default'; }}
        castShadow
      >
        <sphereGeometry args={[skill.size, 32, 32]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={selected ? 0.6 : hovered ? 0.4 : 0.2}
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>

      {/* Label */}
      <Html
        center
        position={[0, skill.size + 0.35, 0]}
        style={{ pointerEvents: 'none' }}
        distanceFactor={12}
      >
        <div
          className={`font-display text-[10px] font-semibold tracking-widest uppercase whitespace-nowrap transition-opacity duration-300 ${
            hovered || selected ? 'opacity-100' : 'opacity-60'
          }`}
          style={{ color: skill.color }}
        >
          {skill.name}
        </div>
      </Html>

      {/* Glow halo when selected */}
      {(selected || hovered) && (
        <mesh>
          <sphereGeometry args={[skill.size * 1.6, 16, 16]} />
          <meshBasicMaterial color={skill.color} transparent opacity={0.07} side={THREE.BackSide} />
        </mesh>
      )}
    </group>
  );
}

// Orbital ring (dashed circle)
function OrbitRing({ radius }: { radius: number }) {
  const points: THREE.Vector3[] = [];
  const segments = 128;
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
  }
  return (
    <Line points={points} color="#ffffff" lineWidth={0.3} transparent opacity={0.08} />
  );
}

// Sun at centre
function Sun() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (meshRef.current) meshRef.current.rotation.y = clock.getElapsedTime() * 0.05;
  });
  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#f59e0b"
          emissiveIntensity={1.5}
          roughness={1}
          metalness={0}
        />
      </mesh>
      {/* Sun glow */}
      <mesh>
        <sphereGeometry args={[1.4, 16, 16]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={3} color="#fbbf24" distance={20} decay={2} />
    </group>
  );
}

interface SolarSystemProps {
  onSelect: (skill: SkillCategory | null) => void;
  selected: SkillCategory | null;
}

export default function SolarSystem({ onSelect, selected }: SolarSystemProps) {
  return (
    <group>
      <Sun />
      {SKILLS.map((skill) => (
        <group key={skill.id}>
          <OrbitRing radius={skill.orbitRadius} />
          <SkillPlanet skill={skill} selected={selected?.id === skill.id} onSelect={onSelect} />
        </group>
      ))}
    </group>
  );
}
