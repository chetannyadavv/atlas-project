# Project Atlas

**Document:** World Design  
**Version:** 1.0  
**Status:** Final  
**Owner:** Project Atlas  
**Last Updated:** YYYY-MM-DD

---

# Decision Summary

This document establishes the following permanent design decisions:

- Atlas exists as one persistent world.
- The world is composed of destinations connected by navigable space.
- Visitors are free to travel between destinations in any order.
- The world itself is the primary navigation interface.
- Every destination should be reachable within approximately 15 seconds.
- The world should feel handcrafted rather than procedurally generated.
- Navigation should always reinforce orientation.

---

# Purpose

This document defines the structure and organization of the world in Project Atlas.

It describes how the world is arranged, how visitors move through it, and the design principles that govern its layout.

This document intentionally avoids implementation details, animation behaviour, camera logic, and visual styling. Those subjects are covered in dedicated documents.

---

# Design Philosophy

The world is not a background.

The world is the interface.

Every destination exists because it represents meaningful portfolio content.

Every journey between destinations should reinforce the feeling of exploration without delaying the visitor.

The world should encourage curiosity while remaining immediately understandable.

---

# World Overview

Project Atlas consists of a single continuous world.

The visitor remains inside this world for the entire session.

There are no page transitions.

There are no disconnected scenes.

There are no separate screens representing different portfolio sections.

Everything exists within one shared environment.

---

# World Topology

The world follows a **hub-and-spoke** model.

The navigable space acts as the central layer connecting all destinations.

```text
                  Destination

                       │

Destination ─── World ─── Destination

                       │

                  Destination
```

The world itself is always visible.

Travelling between destinations never removes the visitor from the environment.

---

# Destinations

A destination represents one meaningful area of the portfolio.

Examples include:

- About
- Skills
- Projects
- Experience
- Contact

This document intentionally does **not** define the physical appearance of destinations.

A destination may eventually become:

- an island
- a harbor
- a lighthouse
- a workshop
- an observatory
- another original location

The important concept is that each destination has a unique identity while remaining part of the same world.

---

# Spatial Relationships

The layout should naturally communicate proximity.

Related portfolio sections should feel geographically related.

For example:

- Skills may exist near Projects.
- Experience may naturally lead toward Contact.

However, visitors must never be forced to follow a predefined route.

The geography should encourage exploration without prescribing it.

---

# World Rules

The following rules apply everywhere.

## One World

The visitor never leaves the world.

---

## Persistent State

The world remains consistent throughout the session.

Navigation should never reset the visitor's position unexpectedly.

---

## Continuous Navigation

Movement always occurs through the world.

Teleportation between destinations should not occur during normal navigation.

---

## Orientation

Visitors should always understand:

- where they are
- where they came from
- where they can go next

---

## Readability

The layout should remain understandable at all supported screen sizes.

No destination should become visually hidden because of unnecessary complexity.

---

# Scale

Atlas is intentionally compact.

The goal is exploration, not travel.

Design target:

- Any destination should be reachable from any other destination in approximately 15 seconds or less.

This keeps interactions engaging while respecting the visitor's time.

---

# Navigation Principles

The world should support exploration through recognition rather than memorization.

Visitors should be able to identify destinations visually instead of relying on labels alone.

Navigation should feel effortless after only a few interactions.

The environment should naturally communicate where movement is possible.

---

# Scalability

The world should support future expansion without requiring redesign.

Possible future additions include:

- New destinations
- Seasonal themes
- Temporary event locations
- Interactive environmental details

Future additions should integrate into the existing world instead of creating separate experiences.

---

# Constraints

The world must satisfy the following constraints:

- Single persistent environment
- No page-based navigation
- No disconnected scenes
- No procedurally generated layouts
- Original visual identity
- Accessible navigation
- Responsive across supported devices

---

# Success Criteria

The world design is considered successful when:

- Visitors immediately understand the environment.
- Navigation feels intuitive.
- Every destination feels connected.
- Exploration remains enjoyable.
- The world supports the portfolio instead of distracting from it.
- Future systems (camera, navigation, animation) can build upon this structure without modification.

---

# Dependencies

This document directly informs:

- 06_Art_Direction.md
- 07_Navigation_System.md
- 08_Camera_System.md
- 09_Animation_System.md
- 10_Technical_Architecture.md

These documents must remain consistent with the world design defined here.

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | YYYY-MM-DD | Initial approved version. |
