"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useAppState } from "@/state/AppStateContext";

const TREASURE_POSITION: [number, number, number] = [8, 0, -9];
const CHEST_SCALE = 0.35;

export function TreasureBox() {
  const { state, dispatch } = useAppState();
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { scene } = useGLTF("/models/chest.glb");
  const model = useMemo(() => scene.clone(true), [scene]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.position.y = TREASURE_POSITION[1] + Math.sin(t * 1.2) * 0.08;
    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.15;
  });

  return (
    <group
      ref={groupRef}
      position={TREASURE_POSITION}
      scale={hovered ? 1.15 : 1}
      onClick={(e) => {
        e.stopPropagation();
        if (state.isTraveling) return;
        dispatch({ type: "OPEN_TREASURE" });
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
    >
      <primitive object={model} scale={CHEST_SCALE} position={[0, CHEST_SCALE, 0]} />
      <pointLight
        position={[0, CHEST_SCALE * 1.5, 0]}
        color="#e8c15a"
        intensity={hovered ? 1.2 : 0.6}
        distance={2}
      />
    </group>
  );
}

useGLTF.preload("/models/chest.glb");
