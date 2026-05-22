import React from 'react';
import { motion } from 'framer-motion';
import { UserX } from 'lucide-react';

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

const LensCard = ({ organizer }) => {
    const imageName = imageMap[organizer.nome];
    const imageUrl = imageName ? new URL(`../../assets/${imageName}`, import.meta.url).href : null;

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20, filter: 'brightness(2) blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'brightness(1) blur(0px)' }}
            exit={{ opacity: 0, x: -20, filter: 'brightness(0) blur(5px)' }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full h-full p-10 flex flex-col items-center justify-center relative group"
        >
            {/* Visual Glitch Effect on Mount */}
            <motion.div 
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-purple-500 z-50 mix-blend-overlay pointer-events-none"
            />

            <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden border border-purple-500/20 shadow-[0_0_50px_rgba(168,85,247,0.15)] bg-zinc-950">
                {imageUrl ? (
                    <img 
                        src={imageUrl} 
                        alt={organizer.nome}
                        loading="lazy"
                        className="w-full h-full object-cover grayscale brightness-75 contrast-125"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900/50 border-2 border-dashed border-purple-500/10 gap-4">
                        <UserX size={48} className="text-purple-900/50" />
                        <div className="text-[10px] text-purple-700 font-mono tracking-[0.3em] animate-pulse uppercase">Image_Not_Found</div>
                    </div>
                )}
                
                {/* Tactical Overlay */}
                <div className="absolute inset-0 border-[20px] border-black/20 pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                    <div className="text-[10px] text-purple-500 font-bold mb-2">TARGET_ID: {organizer.id.toString().padStart(4, '0')}</div>
                    <div className="text-2xl font-black text-white uppercase italic tracking-tighter">{organizer.nome}</div>
                </div>

                {/* Corners */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-purple-500" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-purple-500" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-purple-500" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-purple-500" />
            </div>

            <div className="mt-8 text-center max-w-xs">
                <div className="text-[9px] text-zinc-500 uppercase tracking-[0.3em] mb-2">Technical Dossier</div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Membro confirmado para a operação EDI'S PARTY 2026. 
                    Setor: {organizer.time}. Status: Operacional.
                </p>
            </div>
        </motion.div>
    );
};

export default LensCard;
