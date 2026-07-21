"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useAppState } from "@/state/AppStateContext";
import { DESTINATIONS } from "@/lib/destinations";

/**
 * Camera — passive, cinematic camera rig.
 *
 * Per 03_User_Experience.md: "Passive / Cinematic / Predictable / Never
 * disorienting." The visitor never drags, zooms, or orbits directly —
 * the camera reacts only to AppState.currentDestination, set by
 * Navigation (Task 5).
 *
 * Must render inside <Canvas> — useFrame/useThree require the R3F
 * render-loop context, which is why this is composed inside World.tsx
 * rather than as a sibling in page.tsx.
 */

const DEFAULT_POSITION = new THREE.Vector3(0, 12, 20);
const DEFAULT_LOOK_AT = new THREE.Vector3(0, 0, 0);

const ORBIT_HEIGHT = 8;
const ORBIT_DISTANCE = 7;

/** Lerp factor per frame. Lower = smoother/slower. */
const DAMPING = 0.05;

export function Camera() {
  const { state } = useAppState();
  const { camera } = useThree();

  const targetPosition = useRef(new THREE.Vector3().copy(DEFAULT_POSITION));
  const targetLookAt = useRef(new THREE.Vector3().copy(DEFAULT_LOOK_AT));
  const currentLookAt = useRef(new THREE.Vector3().copy(DEFAULT_LOOK_AT));

  useFrame(() => {
    const destination = state.currentDestination
      ? DESTINATIONS.find((d) => d.id === state.currentDestination)
      : null;

    if (destination) {
      const [dx, dy, dz] = destination.position;
      targetLookAt.current.set(dx, dy, dz);
      targetPosition.current.set(dx, dy + ORBIT_HEIGHT, dz + ORBIT_DISTANCE);
    } else {
      targetLookAt.current.copy(DEFAULT_LOOK_AT);
      targetPosition.current.copy(DEFAULT_POSITION);
    }

    // Reduced motion: snap instantly instead of easing (08_Development_Guidelines.md)
    const factor = state.reducedMotion ? 1 : DAMPING;

    camera.position.lerp(targetPosition.current, factor);
    currentLookAt.current.lerp(targetLookAt.current, factor);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
