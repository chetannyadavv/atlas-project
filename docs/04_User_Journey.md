# Project Atlas

**Document:** User Journey
**Version:** 1.0
**Status:** Final
**Owner:** Project Atlas
**Last Updated:** YYYY-MM-DD

---

# Purpose

This document defines how visitors experience Project Atlas from the moment the application loads until they leave.

Unlike traditional websites, Atlas does not prescribe a linear path. Visitors are free to explore the world in any order.

This document defines the possible visitor states, the transitions between those states, and the expected experience throughout the journey.

---

# Journey Philosophy

Atlas is not designed to tell visitors where to go.

It is designed to make them want to explore.

The experience should provide complete freedom while ensuring visitors always understand:

- Where they are
- Where they can go
- How to reach their destination
- How to return

Exploration should feel intentional rather than confusing.

---

# Journey Goals

Every visitor should:

- Immediately recognize Atlas as an interactive portfolio.
- Understand navigation without tutorials.
- Feel encouraged to explore.
- Reach important portfolio content quickly.
- Never become disoriented.
- Leave with a memorable impression of both the portfolio and its engineering quality.

---

# Visitor States

The visitor can exist in one of the following states.

---

## State 1 — Arrival

### Objective

Introduce the world.

### Visitor Questions

- What is this?
- Is this interactive?
- Where do I begin?

### Expected Experience

The visitor enters the world.

Immediately visible:

- Ocean
- Ship
- Nearby destinations
- Minimal interface

Nothing should compete for attention.

The environment itself should communicate that exploration is expected.

### Exit Condition

The visitor understands that movement through the world reveals portfolio content.

---

## State 2 — Orientation

### Objective

Teach navigation naturally.

### Visitor Questions

- What can I click?
- Where can I go?
- What happens if I move?

### Expected Experience

The interface teaches itself.

There are:

- Visible destinations
- Clear interaction feedback
- Obvious affordances

No onboarding screens.

No tutorials.

No modal instructions.

### Exit Condition

The visitor confidently selects a destination.

---

## State 3 — Travel

### Objective

Transform navigation into an enjoyable experience.

### Visitor Questions

- Where am I going?
- How long will it take?
- Can I change my mind?

### Expected Experience

The ship begins travelling.

The camera follows.

The environment reacts.

Movement reinforces orientation.

Travel should feel satisfying but never slow.

### Exit Condition

The visitor reaches the selected destination.

---

## State 4 — Discovery

### Objective

Present portfolio content.

### Visitor Questions

- What does this destination represent?
- What have I learned?
- Where should I go next?

### Expected Experience

Each destination presents one portfolio topic.

Examples include:

- About
- Skills
- Projects
- Experience
- Contact

Content feels integrated into the world instead of appearing as a disconnected webpage.

### Exit Condition

The visitor chooses another destination.

---

## State 5 — Exploration

### Objective

Allow unrestricted navigation.

### Visitor Questions

- What haven't I seen yet?
- What interests me most?

### Expected Experience

Visitors may explore destinations in any order.

No route is considered the "correct" route.

The world should encourage curiosity without demanding completion.

### Exit Condition

The visitor decides to continue exploring or finishes their visit.

---

## State 6 — Contact

### Objective

Provide a clear conclusion.

### Visitor Questions

- How do I contact the developer?

### Expected Experience

Contact information is:

- Easy to find
- Easy to understand
- Easy to use

The visitor should never search for it.

### Exit Condition

The visitor sends a message or leaves the website.

---

# Journey Model

Atlas follows a hub-and-spoke exploration model.

```text
                 About
                    │
                    │
Projects ─────── World ─────── Skills
                    │
                    │
             Experience
                    │
                    │
                Contact
```

The world acts as the central navigation layer.

Visitors continuously return to exploration before choosing another destination.

No destination is considered first or last.

The only exception is Contact, which naturally serves as the conclusion for many visitors.

---

# Journey Principles

Throughout every state:

## Freedom

Visitors choose their own path.

---

## Orientation

Visitors should always understand where they are.

---

## Continuity

The world never disappears.

Navigation never feels like switching pages.

---

## Consistency

Every destination behaves predictably.

---

## Momentum

Movement should feel continuous.

Interactions should never abruptly interrupt the experience.

---

## Professionalism

The portfolio remains the primary focus.

The world supports the content.

It never overshadows it.

---

# Failure Conditions

The journey fails if visitors:

- Cannot determine what is interactive.
- Become lost.
- Cannot easily reach important portfolio content.
- Experience unnecessary waiting.
- Feel overwhelmed by animations.
- Leave without understanding the developer's work.

---

# Success Criteria

The journey succeeds when visitors:

- Quickly understand the interaction model.
- Freely explore without confusion.
- View multiple portfolio sections.
- Maintain spatial awareness throughout the experience.
- Reach contact information effortlessly.
- Leave remembering the quality of the experience rather than the novelty of the theme.

---

# Dependencies

This document directly informs:

- 05_World_Design.md
- 06_Art_Direction.md
- 07_Navigation_System.md
- 08_Camera_System.md
- 09_Animation_System.md

These documents must preserve the visitor journey defined here.

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | YYYY-MM-DD | Initial approved version. |
