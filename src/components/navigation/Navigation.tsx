"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useAppState } from "@/state/AppStateContext";
import { DESTINATIONS, type DestinationId } from "@/lib/destinations";

export function Navigation() {
  const { state, dispatch } = useAppState();
  const isHome = state.currentDestination === null;
  const buttonRefs = useRef<Partial<Record<DestinationId, HTMLButtonElement | null>>>({});

  useEffect(() => {
    if (!state.currentDestination || state.isTraveling || state.reducedMotion) return;
    const el = buttonRefs.current[state.currentDestination];
    if (!el) return;
    gsap.fromTo(el, { scale: 1 }, { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1, ease: "power1.inOut" });
  }, [state.currentDestination, state.isTraveling, state.reducedMotion]);

  return (
    <nav
      aria-label="Destinations"
      className="pointer-events-auto absolute left-1/2 top-6 z-10 flex -translate-x-1/2 items-center gap-3"
    >
      <button
        type="button"
        disabled={state.isTraveling || isHome}
        aria-label="Return to overview"
        onClick={() => {
          if (state.isTraveling || isHome) return;
          dispatch({ type: "RETURN_HOME" });
        }}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border
          bg-surface/80 text-foreground backdrop-blur-sm transition-colors duration-200 ease-atlas
          hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent
          disabled:cursor-not-allowed disabled:opacity-40"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 11.5 12 4l9 7.5M5.5 10v9h13v-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <ul className="flex gap-2 rounded-full border border-border bg-surface/80 px-2 py-2 backdrop-blur-sm">
        {DESTINATIONS.map((d) => {
          const isActive = state.currentDestination === d.id;
          return (
            <li key={d.id}>
              <button
                ref={(el) => {
                  buttonRefs.current[d.id] = el;
                }}
                type="button"
                disabled={state.isTraveling}
                aria-current={isActive ? "true" : undefined}
                onClick={() => {
                  if (state.isTraveling || isActive) return;
                  dispatch({ type: "TRAVEL_START", destination: d.id });
                }}
                className={`rounded-full px-4 py-1.5 font-body text-sm transition-colors duration-200 ease-atlas
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent
                  disabled:cursor-not-allowed disabled:opacity-40
                  ${isActive ? "bg-accent text-background" : "text-foreground hover:bg-white/10"}`}
              >
                {d.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
