"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useAppState } from "@/state/AppStateContext";
import { DESTINATIONS } from "@/lib/destinations";

export function ContentPanel() {
  const { state, dispatch } = useAppState();
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const destination = state.currentDestination
    ? DESTINATIONS.find((d) => d.id === state.currentDestination)
    : null;

  const isOpen = Boolean(destination) && !state.isTraveling;

  useEffect(() => {
    const panel = panelRef.current;
    const body = bodyRef.current;
    if (!panel) return;

    if (isOpen) {
      panel.style.display = "block";
      if (state.reducedMotion) {
        gsap.set(panel, { opacity: 1, y: 0, scale: 1 });
        if (body) gsap.set(body, { opacity: 1 });
      } else {
        const tl = gsap.timeline();
        tl.fromTo(
          panel,
          { opacity: 0, y: 24, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" },
        );
        if (body) {
          tl.fromTo(
            body.children,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" },
            "-=0.2",
          );
        }
      }
      panel.focus();
    } else {
      if (state.reducedMotion) {
        gsap.set(panel, { opacity: 0 });
        panel.style.display = "none";
      } else {
        gsap.to(panel, {
          opacity: 0,
          y: 16,
          scale: 0.97,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            panel.style.display = "none";
          },
        });
      }
    }
  }, [isOpen, state.reducedMotion]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        dispatch({ type: "RETURN_HOME" });
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, dispatch]);

  if (!destination) return null;
  const { content } = destination;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="content-panel-title"
      ref={panelRef}
      tabIndex={-1}
      className="pointer-events-auto absolute bottom-6 right-6 z-10 max-h-[70vh] w-[min(460px,calc(100vw-3rem))]
        overflow-y-auto rounded-2xl border border-border bg-surface/90 p-6 backdrop-blur-md
        opacity-0 focus:outline-none"
    >
      <div className="flex items-start justify-between gap-4">
        <h2 id="content-panel-title" className="font-display text-xl text-foreground">
          {destination.label}
        </h2>
        <button
          type="button"
          aria-label="Close and return to overview"
          onClick={() => dispatch({ type: "RETURN_HOME" })}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full
            text-muted transition-colors duration-200 hover:bg-white/10 hover:text-foreground
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <p className="mt-2 font-body text-sm text-muted">{destination.description}</p>

      <div ref={bodyRef} className="mt-4 font-body text-sm text-foreground">
        {content.kind === "about" && <p className="leading-relaxed">{content.bio}</p>}
        {content.kind === "experience" && <p className="leading-relaxed">{content.message}</p>}

        {content.kind === "skills" && (
          <div className="space-y-4">
            {content.categories.map((cat) => (
              <div key={cat.category}>
                <h3 className="font-display text-xs uppercase tracking-wide text-accent">
                  {cat.category}
                </h3>
                <p className="mt-1 leading-relaxed text-foreground/90">{cat.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        )}

        {content.kind === "contact" && (
          <ul className="space-y-2">
            {content.links.map((link) => (
              <li key={link.label} className="flex gap-2">
                <span className="text-muted">{link.label}:</span>
                {link.href ? (
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="text-accent underline underline-offset-2 hover:text-accent-hover
                      focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    {link.value}
                  </a>
                ) : (
                  <span>{link.value}</span>
                )}
              </li>
            ))}
          </ul>
        )}

        {content.kind === "projects" && (
          <div className="space-y-6">
            {content.items.map((project) => (
              <div key={project.title} className="border-t border-border pt-4 first:border-0 first:pt-0">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-base text-foreground">{project.title}</h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 text-xs text-accent underline underline-offset-2 hover:text-accent-hover
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                    >
                      View
                    </a>
                  )}
                </div>
                <p className="mt-1 leading-relaxed text-foreground/90">{project.description}</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-foreground/80">
                  {project.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-muted">{project.tech.join(" · ")}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
