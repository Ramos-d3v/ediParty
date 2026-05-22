import React, { useMemo, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, ShieldAlert, Trophy } from 'lucide-react';
import OrganizerCard from './OrganizerCard';
import GoldenRule from './GoldenRule';

// Mocking the data directly to ensure exact match with the prompt requirement
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

// Image mapping based on available assets
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
    'nicolas márcio': 'marcio.jpeg',
    'bruninho': 'bruninho.jpeg',
    'caue atui': 'caue.jpeg',
    'gabriel makoto': 'macoto.jpeg',
    'samuel tiktok': 'samuel.jpeg',
    'murilo central': 'murilo.jpeg',
    'pedro dos anjos': 'pedroValesin.jpeg'
};

const LineupPage = () => {
    const totalMen = organizers.length;
    const targetWomen = totalMen * 2;
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Reveal Stats Cards
            gsap.from(".stat-card-trigger", {
                scrollTrigger: {
                    trigger: ".stats-grid",
                    start: "top 85%",
                },
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power3.out"
            });

            // Section Header Animation
            gsap.from(".lineup-title", {
                scrollTrigger: {
                    trigger: ".lineup-title",
                    start: "top 90%",
                },
                x: -30,
                opacity: 0,
                duration: 1.2,
                ease: "expo.out"
            });

            // Grid Animation
            gsap.from(".organizer-card-wrapper", {
                scrollTrigger: {
                    trigger: ".organizers-grid",
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                stagger: {
                    amount: 0.8,
                    grid: "auto",
                    from: "start"
                },
                duration: 1,
                ease: "power2.out"
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative z-10 bg-[#050505]">
            <section className="container mx-auto px-4 py-32 relative z-10">
                <GoldenRule />

                {/* Stats Section - Bento Grid */}
                <div className="stats-grid grid grid-cols-1 md:grid-cols-3 gap-4 mb-32">
                    <StatCard 
                        className="stat-card-trigger"
                        icon={<Users className="w-5 h-5 text-accent" />} 
                        label="Elenco Convocado" 
                        value={`${totalMen} Homens`} 
                    />
                    <StatCard 
                        className="stat-card-trigger"
                        icon={<ShieldAlert className="w-5 h-5 text-zinc-500" />} 
                        label="Missão Obrigatória" 
                        value="2 Convidadas / Homem" 
                    />
                    <StatCard 
                        className="stat-card-trigger"
                        icon={<Trophy className="w-5 h-5 text-zinc-500" />} 
                        label="Meta do Evento" 
                        value={`${targetWomen}+`} 
                    />
                </div>

                {/* The Lineup Grid Header */}
                <div className="mb-20 flex items-end justify-between border-b border-white/5 pb-10">
                    <div className="lineup-title">
                        <h2 className="text-4xl md:text-8xl font-black italic tracking-tighter uppercase leading-none text-white">
                            O Elenco <br/>
                            <span className="text-accent">Convocado.</span>
                        </h2>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-zinc-600 font-mono font-bold uppercase tracking-[0.3em] text-[9px] mb-2">// Status: Preparação</p>
                        <p className="text-white font-black uppercase text-2xl italic tracking-tighter">LEVEL 01 ACTIVE</p>
                    </div>
                </div>

                <div className="organizers-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {organizers.map((organizer, index) => (
                        <div key={organizer.id} className="organizer-card-wrapper">
                            <OrganizerCard 
                                organizer={organizer} 
                                image={imageMap[organizer.nome] || null}
                                index={index}
                            />
                        </div>
                    ))}
                </div>
            </section>

            <footer className="py-40 text-center border-t border-white/5 bg-zinc-950/50 backdrop-blur-xl relative z-10">
                <div className="mb-10">
                    <h3 className="text-5xl font-black italic uppercase tracking-tighter text-white/5">EDI'S PARTY 2026</h3>
                </div>
                <p className="text-zinc-700 font-mono font-medium tracking-[0.4em] uppercase text-[9px]">
                    Projected & Engineered for the Elite Night // © 2026
                </p>
            </footer>
        </div>
    );
};

const StatCard = ({ icon, label, value, className }) => (
    <div 
        className={`p-8 rounded-3xl bg-zinc-900/30 border border-white/5 backdrop-blur-xl flex flex-col gap-8 group transition-all duration-500 hover:border-accent/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ${className}`}
    >
        <div className="w-12 h-12 rounded-xl bg-black/60 border border-white/5 flex items-center justify-center group-hover:bg-accent/5 transition-all duration-500">
            {icon}
        </div>
        <div>
            <p className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-zinc-600 mb-3">{label}</p>
            <p className="text-3xl font-black text-zinc-100 italic tracking-tighter">{value}</p>
        </div>
    </div>
);

export default LineupPage;
