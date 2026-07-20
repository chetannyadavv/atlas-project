"use client";

import type { ReactNode } from "react";

/**
 * AnimationProvider — GSAP context/timeline coordination.
 * Per 06_System_Architecture.md data flow:
 * Interaction → Navigation → World → Camera → Animation → UI
 * Implementation begins in Phase 4 (Animations, Polish).
 */
export function AnimationProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
