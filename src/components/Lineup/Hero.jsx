import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Hero = () => {
    const sectionRef = useRef(null);
    const videoRef = useRef(null);
    const textRef = useRef(null);
    const indicatorRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.set(".reveal-text span", { y: "110%", rotate: 5 });
            gsap.set(overlayRef.current, { opacity: 1 });
            gsap.set(indicatorRef.current, { opacity: 0, y: 20 });

            const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

            tl.to(overlayRef.current, { 
                opacity: 0.4, 
                duration: 2.5, 
                delay: 0.5 
            })
            .to(".reveal-text span", {
                y: "0%",
                rotate: 0,
                duration: 2,
                stagger: 0.15,
                ease: "expo.inOut"
            }, "-=1.5")
            .to(indicatorRef.current, {
                opacity: 1,
                y: 0,
                duration: 1
            }, "-=0.5");

            gsap.to(videoRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                },
                yPercent: 20,
                scale: 1.1
            });

            gsap.to(indicatorRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "20% top",
                    scrub: true
                },
                opacity: 0,
                y: -50
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section 
            ref={sectionRef} 
            className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-black"
        >
            <div ref={videoRef} className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0a0a0a] z-10" />
                <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    className="w-full h-full object-cover opacity-60 scale-105"
                >
                    <source src="https://cdn.pixabay.com/video/2020/09/24/50901-463876008_large.mp4" type="video/mp4" />
                </video>
            </div>

            <div ref={overlayRef} className="absolute inset-0 bg-black z-20 pointer-events-none" />

            <div className="container relative z-30 px-4 text-center">
                <h1 ref={textRef} className="reveal-text flex flex-col items-center select-none">
                    <span className="overflow-hidden block py-2">
                        <span className="inline-block text-white/40 text-[clamp(0.75rem,2vw,1.25rem)] font-black uppercase tracking-[0.5em] md:tracking-[0.8em] mb-2 md:mb-4">
                            Organização Oficial
                        </span>
                    </span>
                    <span className="overflow-hidden block">
                        <span className="inline-block text-[18vw] md:text-[clamp(5rem,12vw,10rem)] font-black leading-[0.8] uppercase italic tracking-tighter text-white">
                            EDI'S
                        </span>
                    </span>
                    <span className="overflow-hidden block">
                        <span className="inline-block text-[18vw] md:text-[clamp(5rem,12vw,10rem)] font-black leading-[0.8] uppercase italic tracking-tighter text-accent">
                            PARTY
                        </span>
                    </span>
                </h1>
            </div>

            <div 
                ref={indicatorRef}
                className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 md:gap-4"
            >
                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500">
                    Explore the Elenco
                </span>
                <div className="w-[1px] h-10 md:h-16 bg-gradient-to-b from-accent/50 to-transparent relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-accent animate-scroll-dash" />
                </div>
            </div>

            <div className="absolute inset-0 z-40 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </section>
    );
};

export default Hero;
