import { useState, useMemo, useRef, memo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Target, ChevronRight, Fingerprint } from 'lucide-react';
import LensCard from './LensCard';

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

const CinematicGallery = () => {
    const [activeId, setActiveId] = useState(null); // null means no selection on mobile
    const [hoverId, setHoverId] = useState(1); // For desktop preview
    const containerRef = useRef(null);
    
    // Select active based on context (mobile selection or desktop hover)
    const displayId = activeId || hoverId;
    const activeOrganizer = useMemo(() => 
        organizers.find(o => o.id === displayId) || organizers[0]
    , [displayId]);

    return (
        <section ref={containerRef} className="relative min-h-screen bg-[#050505] overflow-hidden">
            {/* 1. Background Parallax TARGET_ID (Performance Isolated) */}
            <BackgroundParallax targetId={displayId} />

            {/* 2. Main Layout Container */}
            <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
                
                {/* Desktop Side: Vertical Marquee (Visible only lg:) */}
                <div className="hidden lg:flex relative z-20 w-[30%] h-screen border-r border-white/5 bg-zinc-950/20 backdrop-blur-sm flex-col">
                    <div className="p-10 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-purple-500 mb-2">
                            <Target size={14} className="animate-pulse" />
                            <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Tactical_Roster_v2.6</span>
                        </div>
                        <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white leading-[0.9]">
                            SELECT YOUR <br />
                            <span className="text-purple-600 font-black">FIGHTER</span>
                        </h2>
                    </div>

                    <div className="flex-1 relative overflow-hidden group">
                        <VerticalMarquee 
                            items={organizers} 
                            activeId={hoverId} 
                            onSelect={setHoverId} 
                        />
                        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-zinc-950 to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent z-10 pointer-events-none" />
                    </div>
                </div>

                {/* Mobile Side: Tactical List (Visible only < lg:) */}
                <div className="lg:hidden flex-1 flex flex-col p-6 pt-24">
                    <header className="mb-10">
                        <div className="flex items-center gap-2 text-purple-500 mb-3">
                            <Fingerprint size={18} />
                            <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Authorized_Personnel_Only</span>
                        </div>
                        <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white leading-none">
                            ELENCO <br />
                            <span className="text-purple-600">CONVOCADO</span>
                        </h2>
                    </header>

                    <div className="flex flex-col gap-2">
                        {organizers.map((org) => (
                            <button
                                key={org.id}
                                onClick={() => setActiveId(org.id)}
                                className="w-full flex items-center justify-between p-5 rounded-2xl bg-white/[0.03] border border-white/5 active:bg-purple-600/20 active:border-purple-500/30 transition-all duration-200"
                            >
                                <div className="flex flex-col items-start">
                                    <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mb-1">ID_{org.id.toString().padStart(3, '0')}</span>
                                    <span className="text-xl font-black italic uppercase tracking-tighter text-white">{org.nome}</span>
                                </div>
                                <ChevronRight size={18} className="text-zinc-700" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* The Stage: Split screen on Desktop, Fullscreen on Mobile */}
                <div className="hidden lg:flex relative z-10 flex-1 h-screen items-center justify-center p-20 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <LensCard 
                            key={hoverId} 
                            organizer={activeOrganizer} 
                            mode="desktop"
                        />
                    </AnimatePresence>
                </div>
            </div>

            {/* Mobile Fullscreen Overlay */}
            <AnimatePresence>
                {activeId && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black lg:hidden"
                    >
                        <LensCard 
                            organizer={activeOrganizer} 
                            mode="mobile" 
                            onClose={() => setActiveId(null)} 
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Cinematic Noise Overlay */}
            <div className="fixed inset-0 z-[110] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </section>
    );
};

// --- Optimized Components ---

const VerticalMarquee = ({ items, activeId, onSelect }) => {
    return (
        <motion.div 
            className="flex flex-col will-change-transform"
            animate={{ y: [0, -100 * items.length] }}
            transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
            }}
            style={{ 
                height: "fit-content",
                transform: "translateZ(0)" // Force GPU acceleration
            }}
        >
            {[...items, ...items].map((item, idx) => (
                <button
                    key={`${item.id}-${idx}`}
                    onMouseEnter={() => onSelect(item.id)}
                    className={`
                        w-full text-left py-6 px-10 border-b border-white/5 transition-all duration-300 relative group
                        ${activeId === item.id ? 'bg-purple-600/10' : 'hover:bg-white/5'}
                    `}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className={`text-[10px] font-mono mb-1 transition-colors ${activeId === item.id ? 'text-purple-400' : 'text-zinc-600'}`}>
                                TARGET_{item.id.toString().padStart(3, '0')}
                            </span>
                            <span className={`text-2xl font-black italic uppercase tracking-tighter transition-all duration-500 ${activeId === item.id ? 'text-white translate-x-2' : 'text-zinc-700'}`}>
                                {item.nome}
                            </span>
                        </div>
                    </div>
                </button>
            ))}
        </motion.div>
    );
};

const BackgroundParallax = memo(({ targetId }) => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

    return (
        <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <motion.div 
                style={{ y }}
                className="will-change-transform select-none"
            >
                <span className="text-[40vw] lg:text-[50vw] font-black italic text-white/[0.02] tracking-[-0.05em] leading-none transform -rotate-12 inline-block">
                    #{targetId?.toString().padStart(3, '0') || '000'}
                </span>
            </motion.div>
        </div>
    );
});

export default CinematicGallery;
