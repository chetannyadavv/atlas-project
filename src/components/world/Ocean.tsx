"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Ocean — replaces the flat ground disc with a gently animated water
 * surface, matching the nautical theme (ship, travel, harbor) from
 * 04_World_Design.md. Vertex displacement is done per-frame on a plane
 * geometry — cheap enough at this vertex count to stay performance-first
 * per 06_System_Architecture.md.
 */
export function Ocean() {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.CircleGeometry(80, 96, 0);
    return geo;
  }, []);

  // Cache base Y=0 positions so we displace from a stable reference,
  // not cumulatively drifting the mesh each frame.
  const basePositions = useMemo(() => {
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    return Float32Array.from(pos.array);
  }, [geometry]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const pos = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < pos.count; i++) {
      const x = basePositions[i * 3] ?? 0;
      const y = basePositions[i * 3 + 1] ?? 0;
      // Two overlapping low-frequency sine waves for a natural, non-repeating swell
      const wave =
        Math.sin(x * 0.08 + t * 0.6) * 0.15 + Math.sin(y * 0.11 + t * 0.4) * 0.1;
      pos.setZ(i, wave);
    }
    pos.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial
        color="#1c8fc7"
        roughness={0.25}
        metalness={0.25}
        emissive="#0a3550"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}
