import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Radar, Target, Hash } from 'lucide-react';

const TacticalViewer = lazy(() => import('./LensCard'));

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
    const [activeOrganizer, setActiveOrganizer] = useState(null);

    return (
        <section className="relative bg-[#050505] min-h-screen overflow-hidden py-20 px-4 md:px-10 font-mono">
            {/* Tactical Grid Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.07]" 
                 style={{ 
                    backgroundImage: `linear-gradient(to right, #a855f7 1px, transparent 1px), linear-gradient(to bottom, #a855f7 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                 }} 
            />
            
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
                
                {/* Left side: Tactical List */}
                <div className="flex flex-col space-y-2">
                    <header className="mb-10">
                        <div className="flex items-center gap-3 text-purple-500 mb-4">
                            <Radar size={20} className="animate-pulse" />
                            <span className="text-xs font-bold tracking-[0.5em] uppercase">Tactical Intelligence // Elenco 2026</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white leading-none">
                            CONVOCAÇÃO <br />
                            <span className="text-purple-600">RESTRITA</span>
                        </h2>
                    </header>

                    <div className="flex flex-col border-t border-purple-500/20">
                        {organizers.map((org) => (
                            <TacticalRow 
                                key={org.id} 
                                org={org} 
                                isActive={activeOrganizer?.id === org.id}
                                onFocus={() => setActiveOrganizer(org)}
                            />
                        ))}
                    </div>
                </div>

                {/* Right side: Fixed Preview Area */}
                <div className="hidden lg:block sticky top-20 h-[80vh] flex items-center justify-center">
                    <div className="w-full h-full border border-purple-500/10 bg-purple-500/[0.02] rounded-3xl relative overflow-hidden">
                        <div className="absolute top-6 left-6 flex items-center gap-2 text-[10px] text-purple-500/50">
                            <Target size={12} />
                            <span>TARGET_VISUALIZATION_ACTIVE</span>
                        </div>
                        
                        <AnimatePresence mode="wait">
                            {activeOrganizer ? (
                                <Suspense fallback={<div className="flex items-center justify-center h-full text-purple-500 animate-pulse text-xs">LOADING_VISUAL...</div>}>
                                    <TacticalViewer 
                                        key={activeOrganizer.id}
                                        organizer={activeOrganizer}
                                    />
                                </Suspense>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-zinc-800 space-y-4">
                                    <Shield size={60} strokeWidth={0.5} />
                                    <p className="text-[10px] tracking-[0.4em] uppercase">Aguardando Seleção de Alvo</p>
                                </div>
                            )}
                        </AnimatePresence>

                        {/* Scanline decoration */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="w-full h-[1px] bg-purple-500/20 absolute top-0 animate-scan" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Photo Overlay */}
            <div className="lg:hidden fixed bottom-6 right-6 z-50">
                <AnimatePresence>
                    {activeOrganizer && (
                        <motion.div 
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="w-24 h-24 rounded-full border-2 border-purple-600 overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                        >
                            <img 
                                src={new URL(`../../assets/${imageMap[activeOrganizer.nome] || 'enzo.jpeg'}`, import.meta.url).href} 
                                className="w-full h-full object-cover"
                                alt="mobile-view"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

const TacticalRow = ({ org, isActive, onFocus }) => {
    return (
        <motion.div 
            onMouseEnter={onFocus}
            whileInView={() => {
                if (window.innerWidth < 1024) onFocus();
            }}
            viewport={{ amount: 0.8 }}
            className={`group flex items-center py-4 px-4 border-b border-purple-500/10 cursor-none transition-all duration-300 ${isActive ? 'bg-purple-600/10 border-purple-500/30' : 'hover:bg-zinc-900/50'}`}
        >
            <div className={`w-10 text-[10px] font-bold ${isActive ? 'text-purple-500' : 'text-zinc-700'} transition-colors`}>
                {org.id.toString().padStart(2, '0')}
            </div>
            
            <div className="flex-1 flex flex-col md:flex-row md:items-center gap-2 md:gap-10">
                <span className={`text-sm md:text-lg font-black uppercase tracking-tighter transition-all duration-500 ${isActive ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                    {isActive ? org.nome : '■■■■■ ■■■■■■■■'}
                </span>
                
                <div className="flex items-center gap-2">
                    <span className={`text-[9px] uppercase tracking-widest px-2 py-0.5 rounded border transition-colors ${isActive ? 'bg-purple-950/50 border-purple-500/50 text-purple-400' : 'bg-transparent border-zinc-800 text-zinc-700'}`}>
                        {org.time}
                    </span>
                </div>
            </div>

            <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                <Hash size={14} className="text-purple-500" />
            </div>
        </motion.div>
    );
};

export default CinematicGallery;
