"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useAppState } from "@/state/AppStateContext";

const RESUME_HREF =
  "https://docs.google.com/document/d/1wBGkE2sbyFYn_ewGr9ALJA_6Veoq9aIv/export?format=pdf";

export function TreasureReveal() {
  const { state, dispatch } = useAppState();
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isOpen = state.treasureOpen;

  useEffect(() => {
    const overlay = overlayRef.current;
    const card = cardRef.current;
    if (!overlay || !card) return;

    if (isOpen) {
      overlay.style.display = "flex";
      if (state.reducedMotion) {
        gsap.set(overlay, { opacity: 1 });
        gsap.set(card, { opacity: 1, scale: 1, y: 0 });
      } else {
        const tl = gsap.timeline();
        tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" }).fromTo(
          card,
          { opacity: 0, scale: 0.85, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.6)" },
          "-=0.15",
        );
      }
      card.focus();
    } else {
      if (state.reducedMotion) {
        gsap.set(overlay, { opacity: 0 });
        overlay.style.display = "none";
      } else {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            overlay.style.display = "none";
          },
        });
      }
    }
  }, [isOpen, state.reducedMotion]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        dispatch({ type: "CLOSE_TREASURE" });
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, dispatch]);

  return (
    <div
      ref={overlayRef}
      className="pointer-events-auto fixed inset-0 z-20 hidden items-center justify-center bg-black/60 opacity-0 backdrop-blur-sm"
      onClick={() => dispatch({ type: "CLOSE_TREASURE" })}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="treasure-title"
        ref={cardRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="w-[min(380px,calc(100vw-3rem))] rounded-2xl border border-[#e8c15a]/40
          bg-surface p-6 text-center shadow-[0_0_40px_rgba(232,193,90,0.15)] focus:outline-none"
      >
        <div className="mx-auto mb-3 text-3xl">&#x1F5DD;&#xFE0F;</div>
        <h2 id="treasure-title" className="font-display text-lg text-[#e8c15a]">
          You found it.
        </h2>
        <p className="mt-2 font-body text-sm text-muted">
          Not everyone digs around the edges of the map. Here&apos;s the resume.
        </p>
        <a
          href={RESUME_HREF}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block rounded-full bg-[#e8c15a] px-5 py-2 font-body text-sm
            font-medium text-background transition-opacity hover:opacity-90
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e8c15a]"
        >
          View Resume
        </a>
        <button
          type="button"
          onClick={() => dispatch({ type: "CLOSE_TREASURE" })}
          className="mt-4 block w-full font-body text-xs text-muted hover:text-foreground"
        >
          Close
        </button>
      </div>
    </div>
  );
}
