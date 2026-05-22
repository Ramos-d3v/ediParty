# EDI'S PARTY - Project Guidelines

## Animation Architecture
- **Smooth Scroll:** All pages MUST use **Lenis** for smooth scrolling orchestration.
- **Engine:** Use **GSAP** (GreenSock Animation Platform) for all complex motion and scroll-triggered animations.
- **Plugins:** Always register `ScrollTrigger` when performing scroll-linked animations.

## Technical Rules
1. **Refrest & Cleanup:** Every GSAP/Lenis implementation in React must include a cleanup phase in `useEffect` (using `gsap.context()` or `lenis.destroy()`) to prevent memory leaks and ghost triggers.
2. **Smooth Scroll Context:** Wrap the application or main layout in a Lenis provider or initialize it globally to ensure consistent feel across all components.
3. **Framer Motion Coexistence:** While GSAP is preferred for scroll-heavy orchestrations, Framer Motion can be used for isolated micro-interactions (UI states) as long as it doesn't conflict with the global Lenis scroll.
4. **No Native Scroll:** Native scroll behaviors should be suppressed in favor of Lenis's virtual scroll to maintain the "premium" feel.

## Performance
- Always use `will-change: transform` on elements undergoing heavy GSAP animations.
- Prefer `yPercent` or `xPercent` over absolute pixels for responsive motion.
- Use `gsap.matchMedia()` for viewport-specific animation adjustments.
