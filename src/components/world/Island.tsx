"use client";

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const ROCK_SCALE = 0.6;
const PALM_SCALE = 0.35;
const BEACON_HOVER = 0.3;

interface IslandProps {
  isHovered: boolean;
  isActive: boolean;
  showPalm?: boolean;
}

function getLocalTopY(object: THREE.Object3D): number {
  const box = new THREE.Box3().setFromObject(object);
  return box.max.y - box.min.y;
}

export function Island({ isHovered, isActive, showPalm = false }: IslandProps) {
  const { scene: rockScene } = useGLTF("/models/rocks-sand-a.glb");
  const { scene: palmScene } = useGLTF("/models/palm-detailed-bend.glb");

  const rockModel = useMemo(() => rockScene.clone(true), [rockScene]);
  const palmModel = useMemo(() => palmScene.clone(true), [palmScene]);

  const rockLocalHeight = useMemo(() => getLocalTopY(rockModel), [rockModel]);
  const palmLocalHeight = useMemo(() => getLocalTopY(palmModel), [palmModel]);

  const rockTopY = ROCK_SCALE * rockLocalHeight;
  const palmTopY = rockTopY + PALM_SCALE * palmLocalHeight;
  const beaconY = (showPalm ? palmTopY : rockTopY) + BEACON_HOVER;

  return (
    <group>
      <primitive object={rockModel} scale={ROCK_SCALE} position={[0, ROCK_SCALE, 0]} />
      {showPalm && (
        <primitive
          object={palmModel}
          scale={PALM_SCALE}
          position={[0.4, rockTopY + PALM_SCALE, 0.3]}
        />
      )}
      <mesh position={[0, beaconY, 0]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial
          color="#3ddc97"
          emissive="#3ddc97"
          emissiveIntensity={isActive ? 1.2 : isHovered ? 0.9 : 0.5}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/rocks-sand-a.glb");
useGLTF.preload("/models/palm-detailed-bend.glb");
