# Spec: Cinematic Lens Lineup Gallery

## 1. Overview
Transform the organizer list from a static grid into a high-end, horizontal "Cinematic Lens" gallery. The section will pin the viewport and move the entire lineup horizontally, applying a focus-zoom and de-blur effect to the card currently in the center of the screen.

## 2. Goals
- Create a premium "red carpet" feeling for the organizers.
- Maintain visual tension using cinematic effects (blur, grayscale, scaling).
- Ensure buttery smooth performance using GSAP and Lenis.

## 3. Architecture

### 3.1. Components
- `CinematicGallery.jsx`: The main container that handles the Pin Scroll logic.
- `LensCard.jsx`: An evolved version of `OrganizerCard` with specific focus-aware properties.
- `BackgroundText.jsx`: A background layer displaying the focused organizer's name in giant outline typography.

### 3.2. Data Flow
- Use the existing `pessoas` array from `preguica.js` (or the local constant in the component).
- Each card receives its index and total count to calculate its position on the "rail".

## 4. Animation Logic (GSAP + ScrollTrigger)

### 4.1. Pinning
- **Trigger:** The gallery section.
- **Start:** `top top`.
- **End:** `+=500%` (Scroll distance to traverse all 26 cards comfortably).
- **Pin:** `true`.
- **Scrub:** `1` (Ensures the movement follows the scroll with a premium lag/inertia).

### 4.2. Horizontal Movement
- The internal "Rail" will translate from `xPercent: 0` to `xPercent: -100` (or calculated offset based on card width).

### 4.3. The "Lens" Effect (Per-Card)
For each card, a separate `ScrollTrigger` (or a single loop with calculation) will monitor its position relative to the screen center:
- **Center Focus:** `scale: 1.3`, `blur: 0px`, `grayscale: 0%`, `opacity: 1`, `z-index: 50`.
- **Off-Center:** `scale: 0.8`, `blur: 6px`, `grayscale: 100%`, `opacity: 0.3`, `z-index: 10`.
- **Easing:** `power2.out`.

## 5. UI/UX Details
- **Magnetic Interaction:** The Custom Cursor will react with an "Explore" or "Focus" state when hovering over the rail.
- **Holographic Shine:** Cards in focus trigger an iridescent overlay animation.
- **Mobile Fallback:** On viewports < 768px, the gallery will revert to a vertical staggered list to ensure usability.

## 6. Implementation Steps
1. Create `CinematicGallery.jsx` and `LensCard.jsx`.
2. Register GSAP ScrollTrigger and initialize the pinning logic.
3. Map the `organizers` data to the new horizontal rail.
4. Apply the dynamic scale/blur logic.
5. Replace `LineupPage` with `CinematicGallery` in `App.jsx`.

## 7. Success Criteria
- No layout jumping when pinning starts.
- Cards transition smoothly as they pass the center.
- Consistent 60fps performance on modern browsers.
