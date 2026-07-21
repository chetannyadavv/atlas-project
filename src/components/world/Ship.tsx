"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useAppState } from "@/state/AppStateContext";
import { DESTINATIONS } from "@/lib/destinations";

export const HOME_POSITION = new THREE.Vector3(0, 0, 0);

const ARRIVAL_THRESHOLD = 0.05;
const DAMPING = 0.04;
const SHIP_SCALE = 0.2;

export function Ship() {
  const { state, dispatch } = useAppState();
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/ship-medium.glb");
  const model = useMemo(() => scene.clone(true), [scene]);

  const currentPos = useRef(new THREE.Vector3().copy(HOME_POSITION));
  const targetPos = useRef(new THREE.Vector3().copy(HOME_POSITION));
  const hasArrived = useRef(true);

  useFrame(() => {
    const destination = state.currentDestination
      ? DESTINATIONS.find((d) => d.id === state.currentDestination)
      : null;

    if (destination) {
      const [dx, dy, dz] = destination.dockPosition;
      targetPos.current.set(dx, dy, dz);
    } else {
      targetPos.current.copy(HOME_POSITION);
    }

    const factor = state.reducedMotion ? 1 : DAMPING;
    const previous = currentPos.current.clone();
    currentPos.current.lerp(targetPos.current, factor);

    const delta = new THREE.Vector3().subVectors(currentPos.current, previous);
    if (delta.lengthSq() > 0.00001 && groupRef.current) {
      const angle = Math.atan2(delta.x, delta.z);
      groupRef.current.rotation.y = angle;
    }

    if (groupRef.current) {
      groupRef.current.position.copy(currentPos.current);
    }

    const distance = currentPos.current.distanceTo(targetPos.current);
    if (distance < ARRIVAL_THRESHOLD) {
      if (!hasArrived.current && state.isTraveling) {
        dispatch({ type: "TRAVEL_COMPLETE" });
      }
      hasArrived.current = true;
    } else {
      hasArrived.current = false;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={model} scale={SHIP_SCALE} position={[0, SHIP_SCALE, 0]} />
    </group>
  );
}

useGLTF.preload("/models/ship-medium.glb");
