# Implementation Plan: Cinematic Lens Lineup Gallery

Replacing the static grid with a high-end horizontal "Cinematic Lens" gallery.

## Phase 1: Foundation & Data Migration
- [ ] Create `src/components/Lineup/BackgroundText.jsx` for the large background names.
- [ ] Create `src/components/Lineup/LensCard.jsx` based on `OrganizerCard.jsx`, but optimized for horizontal focus.
- [ ] Extract organizer data and `imageMap` from `LineupPage.jsx` into a shared constant or keep it ready for migration.

## Phase 2: Core Gallery Implementation
- [ ] Create `src/components/Lineup/CinematicGallery.jsx`.
- [ ] Implement the `ScrollTrigger` pinning logic:
    - Pin the section for `500vh`.
    - Map vertical scroll to horizontal `xPercent` translation of the "Rail".
- [ ] Implement the "Lens" effect logic:
    - Track each card's center position.
    - Animate `scale`, `blur`, `grayscale`, and `z-index` based on proximity to the screen center.
- [ ] Integrate the `GoldenRule` and `Stats` section at the beginning of the gallery scroll.

## Phase 3: Visual Polish & Integration
- [ ] Add giant "Outline" background text that transitions as cards pass the center.
- [ ] Update `src/App.jsx` to replace `LineupPage` with `CinematicGallery`.
- [ ] Update `src/index.css` with `.stroke-text` utilities and any necessary horizontal layout fixes.
- [ ] Implement mobile fallback using `gsap.matchMedia()`.

## Phase 4: Verification & Performance
- [ ] Verify GSAP/Lenis cleanup in `useEffect`.
- [ ] Test on different screen sizes.
- [ ] Confirm 60fps performance during the horizontal scrub.
