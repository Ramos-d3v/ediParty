import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Lineup/Hero';
import PinSection from './components/Lineup/PinSection';
import CinematicGallery from './components/Lineup/CinematicGallery';
import CustomCursor from './components/Lineup/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize Lenis Smooth Scroll with high-end settings
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after dynamic content loads
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, []);

  return (
    <div className="bg-[#0a0a0a] cursor-none selection:bg-purple-500 selection:text-white">
      <CustomCursor />
      <Hero />
      <PinSection />
      <CinematicGallery />
    </div>
  );
}

export default App;
