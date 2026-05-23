import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Users, Trash2 } from 'lucide-react';

const GoldenRule = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative mb-24 overflow-hidden rounded-3xl"
        >
            {/* Background Base */}
            <div className="absolute inset-0 bg-yellow-400" />
            
            {/* Animated Patterns - Static SVG or lightweight CSS to avoid FPS drops */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,black,black_10px,transparent_10px,transparent_20px)]" />
            </div>

            <div className="relative z-10 p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
                
                {/* Left Side: Title */}
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-black text-yellow-400 p-2 rounded-lg">
                            <AlertTriangle size={24} />
                        </div>
                        <span className="text-black font-black uppercase tracking-[0.2em] text-sm md:text-base">
                            Protocolo de Convocação
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-black italic leading-[0.9] uppercase tracking-tighter mb-4">
                        Regra de Ouro <br/>
                        <span className="text-white bg-black px-4 py-2 inline-block mt-3 text-3xl md:text-5xl">Missão Dupla</span>
                    </h2>
                </div>

                {/* Right Side: The Tactical Rules Card */}
                <div className="bg-black p-6 md:p-8 rounded-2xl flex-1 w-full max-w-2xl shadow-2xl rotate-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
                        
                        {/* Rule 01: The Woman */}
                        <div className="md:pr-6 flex flex-col justify-between">
                            <div className="flex items-center gap-3 mb-4">
                                <Users className="text-yellow-400 w-6 h-6 shrink-0" />
                                <h3 className="text-white font-bold uppercase tracking-wider text-sm">Missão 01: Escolta</h3>
                            </div>
                            <div className="flex items-end gap-3 mt-auto pt-4">
                                <span className="text-5xl md:text-6xl font-black text-yellow-400 tracking-tighter leading-none">01</span>
                                <div className="pb-1">
                                    <p className="text-white font-black uppercase leading-none text-xl">Mulher</p>
                                    <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest mt-1">Mínimo Obrigatório</p>
                                </div>
                            </div>
                        </div>

                        {/* Rule 02: The Cleanup */}
                        <div className="pt-6 md:pt-0 md:pl-6 flex flex-col justify-between">
                            <div className="flex items-center gap-3 mb-4">
                                <Trash2 className="text-yellow-400 w-6 h-6 shrink-0" />
                                <h3 className="text-white font-bold uppercase tracking-wider text-sm">Missão 02: Limpeza</h3>
                            </div>
                            <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-4 font-mono">
                                Participação ativa na extração de resíduos pós-evento. Área deve ser restaurada à estaca zero.
                            </p>
                            <div className="inline-block bg-yellow-400 text-black font-bold uppercase text-[10px] tracking-widest px-3 py-1.5 rounded-sm w-fit mt-auto">
                                Protocolo Zero Rastros
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Marquee Ticker - Optimized for 60FPS */}
            <div className="bg-black py-3 overflow-hidden border-t border-yellow-400/20">
                <motion.div 
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    style={{ willChange: "transform" }}
                    className="flex whitespace-nowrap gap-10"
                >
                    {[...Array(10)].map((_, i) => (
                        <span key={i} className="text-yellow-400 font-black uppercase text-xs tracking-[0.3em]">
                            • SEM MULHER SEM FESTA • OPERAÇÃO LIMPEZA OBRIGATÓRIA • EDI'S PARTY 2026 • MISSÃO DADA É MISSÃO CUMPRIDA •
                        </span>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default GoldenRule;