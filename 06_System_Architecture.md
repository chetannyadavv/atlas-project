# 06_System_Architecture

## Overview

Atlas follows a modular, component-based architecture with clear
separation of concerns.

## Technology Stack

-   Next.js
-   React
-   TypeScript
-   React Three Fiber
-   Three.js
-   GSAP
-   Tailwind CSS

## Architecture Principles

-   Single responsibility
-   Component composition
-   Predictable state
-   Reusable modules
-   Performance first

## High-Level Structure

``` text
App
├── World
├── UI
├── Navigation
├── Camera
└── Animation
```

## Data Flow

User → Interaction → Navigation → World → Camera → Animation → UI

## State

Shared application state should be centralized. Components own only
local UI state.

## Performance

-   Lazy loading
-   Code splitting
-   Optimized assets
-   Responsive rendering
