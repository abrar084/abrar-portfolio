'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Ring } from '@react-three/drei';
import * as THREE from 'three';

// Atmospheric glow shader
const AtmosphereShader = {
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform vec3 uAtmosphereColor;
    void main() {
      vec3 viewDir = normalize(-vPosition);
      float rim = 1.0 - max(dot(viewDir, vNormal), 0.0);
      rim = pow(rim, 2.5);
      gl_FragColor = vec4(uAtmosphereColor, rim * 0.7);
    }
  `,
};

// Procedural planet surface texture
function createPlanetTexture(): THREE.Texture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // Deep ocean base
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, '#1a237e');
  gradient.addColorStop(0.4, '#0d47a1');
  gradient.addColorStop(1, '#01579b');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // Continent-like patches
  const continentColors = ['#2e7d32', '#388e3c', '#1b5e20', '#33691e', '#558b2f'];
  for (let i = 0; i < 12; i++) {
    ctx.save();
    ctx.globalAlpha = 0.7 + Math.random() * 0.3;
    ctx.fillStyle = continentColors[Math.floor(Math.random() * continentColors.length)];
    ctx.beginPath();
    const cx = Math.random() * size;
    const cy = Math.random() * size;
    const rx = Math.random() * 80 + 30;
    const ry = Math.random() * 60 + 20;
    ctx.ellipse(cx, cy, rx, ry, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Cloud streaks
  ctx.globalAlpha = 0.3;
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const w = Math.random() * 120 + 40;
    const h = Math.random() * 15 + 5;
    const cg = ctx.createLinearGradient(x, y, x + w, y + h);
    cg.addColorStop(0, 'transparent');
    cg.addColorStop(0.5, 'rgba(255,255,255,0.8)');
    cg.addColorStop(1, 'transparent');
    ctx.fillStyle = cg;
    ctx.fillRect(x, y, w, h);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export default function HeroPlanet() {
  const planetRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const planetTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return createPlanetTexture();
  }, []);

  const atmosphereMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: AtmosphereShader.vertexShader,
        fragmentShader: AtmosphereShader.fragmentShader,
        uniforms: { uAtmosphereColor: { value: new THREE.Color('#4fc3f7') } },
        side: THREE.BackSide,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (planetRef.current) {
      planetRef.current.rotation.y = t * 0.08;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = t * 0.11;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.03;
    }
  });

  return (
    <group position={[1.5, 0, 0]}>
      {/* Atmosphere glow (backside sphere) */}
      <mesh scale={[1.12, 1.12, 1.12]} material={atmosphereMaterial}>
        <sphereGeometry args={[2, 64, 64]} />
      </mesh>

      {/* Main planet */}
      <mesh ref={planetRef} castShadow receiveShadow>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={planetTexture ?? undefined}
          roughness={0.7}
          metalness={0.1}
          color={planetTexture ? undefined : '#1a3a6b'}
        />
      </mesh>

      {/* Cloud layer */}
      <mesh ref={cloudsRef} scale={[1.03, 1.03, 1.03]}>
        <sphereGeometry args={[2, 48, 48]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </mesh>

      {/* Saturn-like ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, Math.PI / 6]}>
        <ringGeometry args={[2.8, 4.2, 96]} />
        <meshStandardMaterial
          color="#a78bfa"
          side={THREE.DoubleSide}
          transparent
          opacity={0.25}
          roughness={1}
        />
      </mesh>

      {/* Ring inner glow */}
      <mesh rotation={[Math.PI / 3, 0, Math.PI / 6]}>
        <ringGeometry args={[2.82, 3.0, 96]} />
        <meshStandardMaterial
          color="#c4b5fd"
          side={THREE.DoubleSide}
          transparent
          opacity={0.4}
          roughness={1}
          emissive="#7c3aed"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}
