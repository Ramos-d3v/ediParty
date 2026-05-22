import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, ShieldAlert, Trophy } from 'lucide-react';
import LensCard from './LensCard';
import GoldenRule from './GoldenRule';
import BackgroundText from './BackgroundText';

// Data from the original LineupPage
const timeStr = `enzo ramos, fiap
diego bissochi, unesp 
adriano rufino, unesp 
matteo Rodrigues, uniso
whayke senna, uniso 
vinicius kobo, mackenzie 
henrique adriane, objetivo 
yukio moser, objetivo 
eduardo rodrigues, roça 
pedro dos anjos, albert einstein 
lucas condomínio, aurora
pedro nogueira, obra
gustavo forsseto, objetivo 
enzo salerno, objetivo
otávio saraiva, uniso
nicolas bezerra, tenente 
nicolas márcio, uniso 
bruninho, uniso
caue atui, anime
gabriel makoto , gakko
koba pereira, fut
niko furuiti, australia
fernando suguimoto, fgv
felipe pontes, anglo
samuel tiktok, bolivia
murilo central , usp`;

const organizers = timeStr.split('\n').map((linha, index) => {
    const [nome, time] = linha.split(',');
    return {
        id: index + 1,
        nome: nome.trim(),
        time: time.trim(),
    };
});

const imageMap = {
    'enzo ramos': 'enzo.jpeg',
    'adriano rufino': 'adriano.jpeg',
    'matteo Rodrigues': 'matteo.jpeg',
    'vinicius kobo': 'vinicius.jpeg',
    'henrique adriane': 'henrique.jpeg',
    'yukio moser': 'yukio.jpeg',
    'eduardo rodrigues': 'eduardo.jpeg',
    'lucas condomínio': 'lucas.jpeg',
    'pedro nogueira': 'nogueira.jpeg',
    'gustavo forsseto': 'forssetto.jpeg',
    'otávio saraiva': 'otavio.jpeg',
    'nicolas bezerra': 'nicolasBezerra.jpeg',
    'nicolas márcio': 'nicolasMarcio.jpeg',
    'bruninho': 'bruninho.jpeg',
    'caue atui': 'caue.jpeg',
    'gabriel makoto': 'macoto.jpeg',
    'samuel tiktok': 'samuel.jpeg',
    'murilo central': 'murilo.jpeg',
    'pedro dos anjos': 'pedroValesin.jpeg'
};

const CinematicGallery = () => {
    const railRef = useRef(null);
    const triggerRef = useRef(null);
    const [activeName, setActiveName] = useState("");

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        let mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            const cards = gsap.utils.toArray(".lens-card-trigger");
            
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "+=600%",
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                }
            });

            tl.from(".gallery-intro", { opacity: 0, y: 100, duration: 1 });

            // Configuração de Perspectiva 3D para o Rail (Efeito Coverflow)
            gsap.set(railRef.current, { perspective: 2000, transformStyle: "preserve-3d" });

            const railWidth = railRef.current.scrollWidth;
            const windowWidth = window.innerWidth;
            const moveX = railWidth - (windowWidth / 2) + (cards[0].offsetWidth / 2);

            tl.to(railRef.current, { x: -moveX, ease: "none", duration: 10 });

            cards.forEach((card, i) => {
                const cardInner = card.querySelector(".lens-card-inner");
                const classifiedLayer = card.querySelector(".classified-layer");
                const revealedLayer = card.querySelector(".revealed-layer");
                const cardName = organizers[i].nome;

                // Otimização: Hardware Acceleration
                gsap.set(cardInner, { force3D: true, willChange: "transform, opacity" });

                ScrollTrigger.create({
                    trigger: card,
                    containerAnimation: tl,
                    start: "left right", // Começa quando entra pela direita
                    end: "right left",   // Termina quando sai pela esquerda
                    onUpdate: (self) => {
                        const progress = self.progress; 
                        const isPastCenter = progress > 0.5;
                        const dist = Math.abs(0.5 - progress) * 2; 
                        const proximity = Math.max(0, 1 - dist);
                        
                        let scale = 0.8;
                        let opacity = 1;
                        let y = 0;
                        let rotateY = (0.5 - progress) * 40;
                        const isRevealed = proximity > 0.95; // Absolute center snapping

                        // 1. Right to Center (Approaching)
                        if (!isPastCenter) {
                            scale = 0.8 + (proximity * 0.25); // Scales up to 1.05
                            opacity = 0.4 + (proximity * 0.6);
                            y = 0;
                        } 
                        // 2. Center to Left (Exiting)
                        else {
                            if (isRevealed) {
                                scale = 1.05;
                                opacity = 1;
                                y = 0;
                            } else {
                                // Sinking into the abyss
                                const exitProgress = (progress - 0.5) * 2; // 0 to 1
                                scale = 1.05 - (exitProgress * 0.45); // shrinks to 0.6
                                opacity = 1 - Math.min(1, exitProgress * 2.5); // Fades quickly
                                y = exitProgress * 250; // Sinks downwards
                            }
                        }

                        // Apply base spatial transformations
                        gsap.set(cardInner, {
                            scale: scale,
                            opacity: opacity,
                            y: y,
                            rotateY: rotateY,
                            zIndex: isRevealed ? 100 : Math.round(proximity * 50)
                        });

                        // Visual Reveal Logic (Classes and Layers)
                        if (isRevealed) {
                            gsap.to(classifiedLayer, { opacity: 0, duration: 0.3, overwrite: "auto", ease: "power2.out" });
                            gsap.to(revealedLayer, { opacity: 1, duration: 0.3, overwrite: "auto", ease: "power2.out" });
                            setActiveName(cardName);
                        } else {
                            gsap.to(classifiedLayer, { opacity: 1, duration: 0.3, overwrite: "auto" });
                            gsap.to(revealedLayer, { opacity: 0, duration: 0.3, overwrite: "auto" });
                        }
                    }
                });
            });
        });

        mm.add("(max-width: 767px)", () => {
            // Fallback for mobile: cards just load normally, no heavy pinning
            gsap.from(".lens-card-trigger", {
                scrollTrigger: {
                    trigger: railRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power2.out"
            });

            gsap.set(".lens-card-inner", { scale: 1, opacity: 1, rotateY: 0 });
            gsap.set(".classified-layer", { opacity: 0 });
            gsap.set(".revealed-layer", { opacity: 1 });
        });

        return () => mm.revert();
    }, []);

    return (
        <section ref={triggerRef} className="relative bg-[#050505] overflow-hidden min-h-[100dvh]">
            <BackgroundText name={activeName} />

            <div className="relative h-[100dvh] flex flex-col justify-center py-10 md:py-20">
                <div ref={railRef} className="flex flex-col md:flex-row items-center gap-10 md:gap-32 px-4 md:pl-[10vw] md:pr-[50vw]">
                    
                    <div className="gallery-intro flex flex-col justify-center w-full md:min-w-[80vw] shrink-0">
                        <GoldenRule />
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10 md:mt-20">
                            <StatCard 
                                icon={<Users size={18} className="text-accent" />} 
                                label="Elenco" 
                                value={`${organizers.length} Homens`} 
                            />
                            <StatCard 
                                icon={<ShieldAlert size={18} className="text-zinc-500" />} 
                                label="Status" 
                                value="Confidencial" 
                            />
                            <StatCard 
                                icon={<Trophy size={18} className="text-zinc-500" />} 
                                label="Meta" 
                                value={`${organizers.length * 2}+`} 
                            />
                        </div>

                        <div className="mt-10 md:mt-20">
                            <h2 className="text-[clamp(2.5rem,10vw,5rem)] md:text-8xl font-black italic uppercase tracking-tighter leading-none text-white">
                                O Arquivo <br/>
                                <span className="text-accent">Confidencial.</span>
                            </h2>
                            <p className="text-zinc-600 font-mono uppercase tracking-[0.4em] md:tracking-[0.6em] text-[10px] mt-6 flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                Access Level: Restricted
                            </p>
                        </div>
                    </div>

                    {organizers.map((organizer, index) => (
                        <LensCard 
                            key={organizer.id} 
                            organizer={organizer} 
                            image={imageMap[organizer.nome] || null}
                            index={index}
                        />
                    ))}

                    <div className="w-full md:min-w-[50vw] shrink-0 flex flex-col justify-center py-20 md:py-0 md:pl-20">
                        <h3 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white/5">
                            Fim da <br className="hidden md:block" /> Linha
                        </h3>
                        <p className="text-zinc-800 font-mono uppercase tracking-widest text-[9px] mt-4">
                            EDI'S PARTY 2026 // COCKPIT MODE ACTIVE
                        </p>
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </section>
    );
};

const StatCard = ({ icon, label, value }) => (
    <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5 backdrop-blur-md flex flex-col items-start gap-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
        <div className="p-2 rounded-lg bg-black/60 border border-white/5">
            {icon}
        </div>
        <div>
            <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-600">{label}</p>
            <p className="text-xl font-black text-white italic font-sans">{value}</p>
        </div>
    </div>
);

export default CinematicGallery;
