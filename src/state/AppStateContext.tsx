"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";
import type { AppState, AppAction } from "./types";

const initialState: AppState = {
  currentDestination: null,
  isTraveling: false,
  reducedMotion: false,
};

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "TRAVEL_START":
      return {
        ...state,
        isTraveling: true,
        currentDestination: action.destination,
      };
    case "TRAVEL_COMPLETE":
      return { ...state, isTraveling: false };
    case "SET_REDUCED_MOTION":
      return { ...state, reducedMotion: action.value };
    default:
      return state;
  }
}

interface AppStateContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Respect OS-level reduced motion preference (03_User_Experience.md, 08_Development_Guidelines.md)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    dispatch({ type: "SET_REDUCED_MOTION", value: mediaQuery.matches });

    const handler = (e: MediaQueryListEvent) =>
      dispatch({ type: "SET_REDUCED_MOTION", value: e.matches });

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return context;
}
