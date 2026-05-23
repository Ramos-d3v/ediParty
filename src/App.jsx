import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Lineup/Hero';
import PinSection from './components/Lineup/PinSection';
import CinematicGallery from './components/Lineup/CinematicGallery';
import CustomCursor from './components/Lineup/CustomCursor';
import GoldenRule from './components/Lineup/GoldenRule';
import TacticalRSVP from './components/Lineup/TacticalRSVP';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Inicialização do Lenis Smooth Scroll
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

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-[#0a0a0a] cursor-none selection:bg-purple-500 selection:text-white">
      <CustomCursor />
      <Hero />
      <PinSection />
      
      {/* Container para alinhar a Regra de Ouro antes da Galeria Cinematográfica */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 pt-20">
        <GoldenRule />
      </div>

      {/* Retorna o layout tático original com lista e preview stick lateral */}
      <CinematicGallery />
      <TacticalRSVP />
    </div>
  );
}

export default App;