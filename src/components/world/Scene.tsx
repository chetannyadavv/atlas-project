"use client";

import { useState } from "react";
import { Sky } from "@react-three/drei";
import { useAppState } from "@/state/AppStateContext";
import { DESTINATIONS, type DestinationId } from "@/lib/destinations";
import { Ocean } from "./Ocean";
import { Island } from "./Island";

const SUN_POSITION: [number, number, number] = [60, 40, 20];

export function Scene() {
  const { state, dispatch } = useAppState();
  const [hovered, setHovered] = useState<DestinationId | null>(null);

  const handleSelect = (id: DestinationId) => {
    if (state.isTraveling || state.currentDestination === id) return;
    dispatch({ type: "TRAVEL_START", destination: id });
  };

  return (
    <>
      <Sky
        distance={450000}
        sunPosition={SUN_POSITION}
        turbidity={2}
        rayleigh={1.2}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />

      <ambientLight intensity={0.9} color="#ffffff" />
      <hemisphereLight args={["#bfe3f5", "#5a6b52", 0.8]} />
      <directionalLight
        position={SUN_POSITION}
        intensity={2.4}
        color="#fff6e0"
        castShadow={false}
      />
      <fog attach="fog" args={["#bfe3f5", 70, 160]} />

      <Ocean />

      {DESTINATIONS.map((d, i) => {
        const isHovered = hovered === d.id;
        const isActive = state.currentDestination === d.id;
        const scale = isHovered ? 1.08 : 1;

        return (
          <group
            key={d.id}
            position={d.position}
            scale={[scale, scale, scale]}
            onClick={(e) => {
              e.stopPropagation();
              handleSelect(d.id);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              if (!state.isTraveling) setHovered(d.id);
              document.body.style.cursor = state.isTraveling ? "default" : "pointer";
            }}
            onPointerOut={() => {
              setHovered(null);
              document.body.style.cursor = "default";
            }}
          >
            <Island isHovered={isHovered} isActive={isActive} showPalm={i % 2 === 0} />
          </group>
        );
      })}
    </>
  );
}
