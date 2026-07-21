import type { DestinationId } from "@/lib/destinations";

/**
 * Centralized application state shape.
 * Per 06_System_Architecture.md: "Shared application state should be
 * centralized. Components own only local UI state."
 */
export interface AppState {
  currentDestination: DestinationId | null;
  isTraveling: boolean;
  reducedMotion: boolean;
  treasureOpen: boolean;
}

export type AppAction =
  | { type: "TRAVEL_START"; destination: DestinationId }
  | { type: "RETURN_HOME" }
  | { type: "TRAVEL_COMPLETE" }
  | { type: "SET_REDUCED_MOTION"; value: boolean }
  | { type: "OPEN_TREASURE" }
  | { type: "CLOSE_TREASURE" };
