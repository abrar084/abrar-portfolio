'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StarFieldProps {
  count?: number;
  radius?: number;
  rotationSpeed?: number;
}

export default function StarField({
  count = 3000,
  radius = 80,
  rotationSpeed = 0.00015,
}: StarFieldProps) {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, sizes, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const colorOptions = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#c4d4ff'),
      new THREE.Color('#ffd6a5'),
      new THREE.Color('#a0c4ff'),
      new THREE.Color('#d4aaff'),
    ];

    for (let i = 0; i < count; i++) {
      // Distribute stars on a sphere surface
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.6 + Math.random() * 0.4);

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      sizes[i] = Math.random() * 2.5 + 0.5;

      const c = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, sizes, colors };
  }, [count, radius]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
      meshRef.current.rotation.x += rotationSpeed * 0.3;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  );
}
