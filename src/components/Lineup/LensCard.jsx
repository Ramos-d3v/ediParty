import React from 'react';
import { motion } from 'framer-motion';
import { UserX, ShieldAlert, Cpu, X, Radar } from 'lucide-react';

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

const LensCard = ({ organizer, mode = 'desktop', onClose }) => {
    const imageName = imageMap[organizer.nome];
    const imageUrl = imageName ? new URL(`../../assets/${imageName}`, import.meta.url).href : null;
    const isMobile = mode === 'mobile';

    return (
        <motion.div 
            className={`relative flex items-center justify-center will-change-transform ${isMobile ? 'w-full h-full' : 'w-full max-w-4xl aspect-[21/9]'}`}
            initial={isMobile ? { y: '100%' } : { opacity: 0 }}
            animate={isMobile ? { y: 0 } : { opacity: 1 }}
            exit={isMobile ? { y: '100%' } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* The "Ripping" Content Layer */}
            <div className={`relative overflow-hidden ${isMobile ? 'w-full h-full' : 'w-full h-full rounded-[2.5rem] border border-white/10 shadow-2xl bg-zinc-900/20 backdrop-blur-md'}`}>
                
                {/* Image Section */}
                <div className="absolute inset-0 z-0">
                    {imageUrl ? (
                        <div className="relative w-full h-full">
                            <img 
                                src={imageUrl} 
                                alt={organizer.nome}
                                className="w-full h-full object-cover object-top grayscale contrast-125 brightness-50"
                            />
                            {/* Cinematic Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                            <div className="absolute inset-0 bg-purple-600/5 mix-blend-overlay" />
                        </div>
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 gap-6">
                            <UserX size={80} strokeWidth={0.5} className="text-purple-500/10" />
                            <div className="text-[10px] text-purple-600 font-mono tracking-[0.5em] animate-pulse">ASSET_NOT_FOUND</div>
                        </div>
                    )}
                </div>

                {/* HUD / Content Section */}
                <div className={`relative z-10 w-full h-full p-8 md:p-12 flex flex-col justify-between ${isMobile ? 'pt-16 pb-20' : ''}`}>
                    
                    {/* Top HUD */}
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-purple-500">
                                <Radar size={14} className="animate-pulse" />
                                <span className="text-[10px] font-mono font-bold tracking-widest uppercase">Target_Visualization</span>
                            </div>
                            <h3 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white drop-shadow-2xl">
                                {organizer.nome}
                            </h3>
                        </div>

                        {isMobile ? (
                            <button 
                                onClick={onClose}
                                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center active:scale-90 transition-transform"
                            >
                                <X size={24} className="text-white" />
                            </button>
                        ) : (
                            <div className="bg-black/40 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-xl flex flex-col items-end">
                                <span className="text-[10px] text-zinc-500 font-mono uppercase">Target_ID</span>
                                <span className="text-xl font-black text-white italic">#{organizer.id.toString().padStart(3, '0')}</span>
                            </div>
                        )}
                    </div>

                    {/* Bottom HUD */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-0">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-wrap gap-2">
                                <Badge icon={<Cpu size={10} />} label={organizer.time} />
                                <Badge label="Level_01_Authorized" />
                                {isMobile && <Badge label={`ID_${organizer.id.toString().padStart(3, '0')}`} color="purple" />}
                            </div>
                            <p className="text-zinc-400 text-sm md:text-base max-w-md font-medium leading-relaxed italic border-l-2 border-purple-500/30 pl-4">
                                "Operação EDI'S PARTY 2026. Alvo confirmado para a extração do épico. Protocolo de elite ativo."
                            </p>
                        </div>
                        
                        <div className="hidden md:flex flex-col items-end opacity-40">
                            <div className="w-24 h-px bg-white/20 mb-2" />
                            <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-[0.3em]">Encrypted_Stream_v2.6</span>
                        </div>
                    </div>
                </div>

                {/* Aesthetic Corners (Desktop Only for Performance) */}
                {!isMobile && (
                    <>
                        <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-purple-500/30 rounded-tl-[2.5rem] pointer-events-none" />
                        <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-purple-500/30 rounded-br-[2.5rem] pointer-events-none" />
                    </>
                )}
            </div>

            {/* Background Glitch Decorative Layer (Desktop only) */}
            {!isMobile && <div className="absolute -inset-4 bg-purple-600/5 blur-3xl rounded-[3rem] -z-10" />}
        </motion.div>
    );
};

const Badge = ({ icon, label, color = 'white' }) => (
    <div className={`flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-lg backdrop-blur-md ${color === 'purple' ? 'border-purple-500/30' : ''}`}>
        {icon && <span className="text-purple-500">{icon}</span>}
        <span className={`text-[9px] font-bold uppercase tracking-widest ${color === 'purple' ? 'text-purple-400' : 'text-zinc-300'}`}>{label}</span>
    </div>
);

export default LensCard;
