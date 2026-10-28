'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Earth-like texture
function createEarthTexture(): THREE.Texture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // Ocean
  ctx.fillStyle = '#1565c0';
  ctx.fillRect(0, 0, size, size);

  // Land masses
  const landColors = ['#2e7d32', '#1b5e20', '#388e3c', '#33691e', '#4e342e'];
  for (let i = 0; i < 8; i++) {
    ctx.save();
    ctx.globalAlpha = 0.85;
    ctx.fillStyle = landColors[Math.floor(Math.random() * landColors.length)];
    ctx.beginPath();
    const cx = Math.random() * size;
    const cy = Math.random() * size;
    ctx.ellipse(cx, cy, Math.random() * 90 + 30, Math.random() * 70 + 20, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Ice caps
  ctx.fillStyle = '#e3f2fd';
  ctx.fillRect(0, 0, size, 30);
  ctx.fillRect(0, size - 25, size, 25);

  // Clouds
  ctx.globalAlpha = 0.25;
  for (let i = 0; i < 25; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const w = Math.random() * 100 + 30;
    const h = Math.random() * 20 + 8;
    const cg = ctx.createLinearGradient(x, y, x + w, y);
    cg.addColorStop(0, 'transparent');
    cg.addColorStop(0.5, 'rgba(255,255,255,0.9)');
    cg.addColorStop(1, 'transparent');
    ctx.fillStyle = cg;
    ctx.fillRect(x, y, w, h);
  }

  return new THREE.CanvasTexture(canvas);
}

export default function EarthScene() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  const earthTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return createEarthTexture();
  }, []);

  const atmosphereMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPos;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPos = (modelViewMatrix * vec4(position,1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }`,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vPos;
          void main() {
            vec3 view = normalize(-vPos);
            float rim = 1.0 - max(dot(view, vNormal), 0.0);
            rim = pow(rim, 3.0);
            gl_FragColor = vec4(0.2, 0.6, 1.0, rim * 0.6);
          }`,
        side: THREE.BackSide,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (earthRef.current) earthRef.current.rotation.y = t * 0.06;
    if (cloudsRef.current) cloudsRef.current.rotation.y = t * 0.09;
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 2, 5]} intensity={2.5} color="#ffffff" />
      <pointLight position={[-6, -3, -6]} intensity={0.5} color="#1a237e" />

      <Stars radius={80} depth={40} count={3000} factor={3} saturation={0.4} fade />

      {/* Atmosphere */}
      <mesh scale={[1.08, 1.08, 1.08]} material={atmosphereMat}>
        <sphereGeometry args={[2.5, 64, 64]} />
      </mesh>

      {/* Earth */}
      <mesh ref={earthRef} castShadow>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture ?? undefined}
          roughness={0.65}
          metalness={0.05}
          color={earthTexture ? undefined : '#1a6b4a'}
        />
      </mesh>

      {/* Clouds */}
      <mesh ref={cloudsRef} scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[2.5, 48, 48]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.15} depthWrite={false} />
      </mesh>
    </>
  );
}
