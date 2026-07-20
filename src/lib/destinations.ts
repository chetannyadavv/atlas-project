/**
 * Central destination registry.
 *
 * Per 04_World_Design.md: "New destinations should be added without
 * redesigning the world structure." All world/navigation/UI modules
 * should read from this list rather than hardcoding destinations.
 */

export type DestinationId =
  | "about"
  | "projects"
  | "skills"
  | "experience"
  | "contact";

export interface Destination {
  id: DestinationId;
  label: string;
  description: string;
  /** Placeholder world-space position; populated in Phase 2. */
  position: [number, number, number];
}

export const DESTINATIONS: Destination[] = [
  {
    id: "about",
    label: "About",
    description: "Who I am and how I work.",
    position: [0, 0, 0],
  },
  {
    id: "projects",
    label: "Projects",
    description: "Selected work and case studies.",
    position: [0, 0, 0],
  },
  {
    id: "skills",
    label: "Skills",
    description: "Tools and technologies.",
    position: [0, 0, 0],
  },
  {
    id: "experience",
    label: "Experience",
    description: "Professional history.",
    position: [0, 0, 0],
  },
  {
    id: "contact",
    label: "Contact",
    description: "Get in touch.",
    position: [0, 0, 0],
  },
];
