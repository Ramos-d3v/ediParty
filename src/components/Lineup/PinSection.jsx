import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wrench, Hammer, LayoutDashboard, PartyPopper } from 'lucide-react';

const PinSection = () => {
    const triggerRef = useRef(null);
    const containerRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "+=350%",
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1
                }
            });

            const words = [".p-word-1", ".p-word-2", ".p-word-3", ".p-word-4"];
            
            words.forEach((word, index) => {
                // Entrance: Scale down + Blur fade in
                tl.fromTo(word, 
                    { 
                        scale: 4, 
                        opacity: 0, 
                        filter: "blur(20px)",
                        letterSpacing: "1em"
                    }, 
                    { 
                        scale: 1, 
                        opacity: 1, 
                        filter: "blur(0px)",
                        letterSpacing: "-0.05em",
                        duration: 1, 
                        ease: "power2.out" 
                    }
                )
                // Hold briefly
                .to(word, { duration: 0.5 })
                // Exit: Explode letter spacing + Fade out
                .to(word, { 
                    letterSpacing: "2em", 
                    opacity: 0, 
                    scale: 0.8,
                    filter: "blur(10px)",
                    duration: 1, 
                    ease: "power2.in" 
                }, "+=0.2");
            });

            // Card Reveal
            tl.fromTo(cardRef.current, 
                { 
                    y: 100, 
                    opacity: 0, 
                    scale: 0.9,
                    filter: "blur(10px)"
                }, 
                { 
                    y: 0, 
                    opacity: 1, 
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 1.5, 
                    ease: "expo.out" 
                },
                "-=0.5"
            );
        }, triggerRef);

        return () => ctx.revert();
    }, []);

    const pillars = [
        { label: "Arrumar", icon: <Wrench size={18} />, desc: "Preparar o terreno" },
        { label: "Construir", icon: <Hammer size={18} />, desc: "Erguer a estrutura" },
        { label: "Organizar", icon: <LayoutDashboard size={18} />, desc: "Orquestrar o caos" },
        { label: "Aproveitar", icon: <PartyPopper size={18} className="text-purple-500" />, desc: "Viver o épico" }
    ];

    return (
        <section ref={triggerRef} className="relative min-h-screen bg-[#050505] flex items-center justify-center overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
                <div className="absolute inset-0 bg-purple-900/10 mix-blend-soft-light" />
            </div>

            <div ref={containerRef} className="relative z-20 w-full h-full flex items-center justify-center px-4">
                {/* Kinetic Typography Layer */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <h2 className="p-word-1 text-[12vw] md:text-[15vw] font-black italic uppercase tracking-tighter text-white opacity-0 absolute will-change-transform">
                        ARRUMAR
                    </h2>
                    <h2 className="p-word-2 text-[12vw] md:text-[15vw] font-black italic uppercase tracking-tighter text-transparent opacity-0 absolute will-change-transform"
                        style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>
                        CONSTRUIR
                    </h2>
                    <h2 className="p-word-3 text-[12vw] md:text-[15vw] font-black italic uppercase tracking-tighter text-white opacity-0 absolute will-change-transform">
                        ORGANIZAR
                    </h2>
                    <h2 className="p-word-4 text-[12vw] md:text-[15vw] font-black italic uppercase tracking-tighter text-purple-500 opacity-0 absolute will-change-transform drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                        APROVEITAR
                    </h2>
                </div>

                {/* The Price of Epic Card */}
                <div ref={cardRef} className="relative bg-zinc-950/50 border border-white/10 backdrop-blur-3xl p-8 md:p-12 rounded-[2rem] max-w-3xl w-full shadow-2xl opacity-0 will-change-transform">
                    <div className="flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                            </span>
                            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Protocolo de Elite Ativado</span>
                        </div>

                        <h3 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.8] text-white mb-6">
                            O Preço do <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Épico.</span>
                        </h3>

                        <p className="text-zinc-400 text-base md:text-lg font-medium leading-relaxed max-w-xl mb-12">
                            A glória não é dada, é conquistada. Para viver a melhor noite do ano, o elenco convocado deve colocar a mão na massa. Transformamos o caos em estrutura.
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                            {pillars.map((pillar, i) => (
                                <div key={i} className="flex flex-col items-center p-6 rounded-2xl bg-white/[0.03] border border-white/5 group hover:bg-white/[0.05] hover:border-purple-500/30 transition-all duration-500">
                                    <div className="mb-4 text-zinc-500 group-hover:text-purple-400 transition-colors transform group-hover:scale-110 duration-500">
                                        {pillar.icon}
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-200 mb-1">
                                        {pillar.label}
                                    </span>
                                    <span className="text-[9px] font-mono text-zinc-500 uppercase">
                                        {pillar.desc}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Cinematic Noise & Overlay */}
            <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            <div className="absolute inset-0 z-40 pointer-events-none bg-gradient-to-t from-black via-transparent to-black" />
        </section>
    );
};

export default PinSection;
