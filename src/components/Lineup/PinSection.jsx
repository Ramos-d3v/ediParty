import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wrench, Hammer, LayoutDashboard, GlassWater } from 'lucide-react';

const PinSection = () => {
    const triggerRef = useRef(null);
    const textContainerRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        let mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "+=250%",
                    pin: true,
                    scrub: 1,
                }
            });

            // Asymmetric Typographic Reveal
            tl.from(".word-1", { x: "-20vw", opacity: 0, filter: "blur(20px)", duration: 1.5, ease: "expo.out" })
              .to(".word-1", { opacity: 0, filter: "blur(10px)", duration: 1, ease: "expo.in" }, "+=0.5")
              
              .from(".word-2", { x: "20vw", opacity: 0, filter: "blur(20px)", duration: 1.5, ease: "expo.out" }, "-=0.5")
              .to(".word-2", { opacity: 0, filter: "blur(10px)", duration: 1, ease: "expo.in" }, "+=0.5")
              
              .from(".word-3", { y: "10vh", opacity: 0, filter: "blur(20px)", duration: 1.5, ease: "expo.out" }, "-=0.5")
              .to(".word-3", { opacity: 0, filter: "blur(10px)", duration: 1, ease: "expo.in" }, "+=0.5")
              
              .from(".word-4", { scale: 1.5, opacity: 0, filter: "blur(20px)", duration: 1.5, ease: "expo.out" }, "-=0.5")
              .to(".word-4", { opacity: 0, filter: "blur(10px)", duration: 1, ease: "expo.in" }, "+=0.5")

              .from(".rule-card", {
                y: 100,
                opacity: 0,
                scale: 0.95,
                filter: "blur(10px)",
                duration: 2,
                ease: "power4.out"
            }, ">-0.5");
        });

        mm.add("(max-width: 767px)", () => {
            gsap.from(".rule-card", {
                scrollTrigger: {
                    trigger: ".rule-card",
                    start: "top 85%",
                },
                y: 40,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out"
            });
        });

        return () => mm.revert();
    }, []);

    const steps = [
        { label: "Arrumar", icon: <Wrench size={20} /> },
        { label: "Construir", icon: <Hammer size={20} /> },
        { label: "Organizar", icon: <LayoutDashboard size={20} /> },
        { label: "Aproveitar", icon: <GlassWater size={20} className="text-accent" /> }
    ];

    return (
        <section ref={triggerRef} className="relative min-h-[100dvh] bg-[#050505] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10" />
                <img 
                    src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2000" 
                    className="w-full h-full object-cover opacity-5 grayscale brightness-50" 
                    alt="Atmosphere"
                />
            </div>

            {/* Kinetic Typography Layer */}
            <div ref={textContainerRef} className="relative z-20 text-center w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center whitespace-nowrap pointer-events-none">
                    <h2 className="word-1 text-[12vw] md:text-[15vw] font-black italic uppercase tracking-tighter text-white opacity-0 absolute left-[10%] top-[20%]">
                        ARRUMAR
                    </h2>
                    <h2 className="word-2 text-[12vw] md:text-[15vw] font-black italic uppercase tracking-tighter text-transparent opacity-0 absolute right-[10%] bottom-[30%]" 
                        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>
                        CONSTRUIR
                    </h2>
                    <h2 className="word-3 text-[12vw] md:text-[15vw] font-black italic uppercase tracking-tighter text-white opacity-0 absolute left-[15%] bottom-[20%]">
                        ORGANIZAR
                    </h2>
                    <h2 className="word-4 text-[12vw] md:text-[15vw] font-black italic uppercase tracking-tighter text-accent opacity-0 absolute">
                        APROVEITAR
                    </h2>
                </div>

                {/* Final punchy card - Bento Style */}
                <div className="rule-card relative bg-zinc-900/30 border border-white/10 backdrop-blur-2xl p-8 md:p-14 rounded-3xl max-w-2xl mx-auto shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] border-t-white/20">
                    <div className="flex flex-col items-center">
                        <span className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 text-accent font-mono text-[9px] uppercase tracking-[0.4em] rounded-md mb-8">
                            Status: Missão Crítica
                        </span>
                        
                        <h3 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.85] text-white mb-6">
                            O Preço do <br/>
                            <span className="text-accent">Épico.</span>
                        </h3>
                        
                        <p className="text-zinc-500 text-sm md:text-base font-medium leading-relaxed max-w-md mx-auto mb-12">
                            Convocados para transformar o caos em estrutura. O direito à noite é conquistado através da ação.
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
                            {steps.map((step, i) => (
                                <div key={i} className="flex flex-col items-start p-4 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-accent/30 transition-all duration-500">
                                    <div className="mb-4 text-accent/60 group-hover:text-accent transition-all">
                                        {step.icon}
                                    </div>
                                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-600 group-hover:text-zinc-300 transition-colors">
                                        {step.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Ambient Noise */}
            <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </section>
    );
};

export default PinSection;
