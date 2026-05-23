import { useEffect, useRef } from 'react';
import gsap from 'gsap';
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

const organizers = timeStr.split('\n')
    .map((linha) => {
        const [nome, time] = linha.split(',');
        return {
            nome: nome.trim(),
            time: time.trim(),
        };
    })
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
    .map((org, index) => ({
        ...org,
        id: index + 1
    }));

// Image mapping based on available assets
const imageMap = {
    'enzo ramos': 'enzo.jpeg',
    'diego bissochi': 'diegoBissochi.jpeg',
    'adriano rufino': 'adriano.jpeg',
    'matteo Rodrigues': 'matteo.jpeg',
    'whayke senna': 'whaykeSena.jpeg',
    'vinicius kobo': 'vinicius.jpeg',
    'henrique adriane': 'henrique.jpeg',
    'yukio moser': 'yukio.jpeg',
    'eduardo rodrigues': 'eduardo.jpeg',
    'pedro dos anjos': 'pedroValesin.jpeg',
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
    'murilo central': 'murilo.jpeg'
};

const LineupPage = () => {
    const totalMen = organizers.length;
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
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

                {/* The Lineup Grid Header */}
                <div className="mb-20 flex items-end justify-between border-b border-white/5 pb-10 mt-20">
                    <div className="lineup-title">
                        <h2 className="text-4xl md:text-8xl font-black italic tracking-tighter uppercase leading-none text-white">
                            O Elenco <br/>
                            <span className="text-accent">Convocado.</span>
                        </h2>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-zinc-600 font-mono font-bold uppercase tracking-[0.3em] text-[9px] mb-2">// Status: Operacional</p>
                        <p className="text-white font-black uppercase text-2xl italic tracking-tighter">{totalMen} UNIDADES ATIVAS</p>
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

export default LineupPage;
