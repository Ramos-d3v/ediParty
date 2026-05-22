import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Zap } from 'lucide-react';

const GoldenRule = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative mb-24 overflow-hidden rounded-3xl"
        >
            {/* Background Background */}
            <div className="absolute inset-0 bg-yellow-400" />
            
            {/* Animated Patterns */}
            <div className="absolute inset-0 opacity-10 mix-blend-overlay">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,black,black_10px,transparent_10px,transparent_20px)]" />
            </div>

            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-black text-yellow-400 p-2 rounded-lg">
                            <AlertTriangle size={24} />
                        </div>
                        <span className="text-black font-black uppercase tracking-[0.2em] text-sm">
                            Protocolo de Convocação
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-black italic leading-[0.9] uppercase tracking-tighter mb-4">
                        Regra de Ouro <br/>
                        <span className="text-white bg-black px-4 py-1 inline-block mt-2">Missão Crítica</span>
                    </h2>
                </div>

                <div className="bg-black p-8 rounded-2xl flex-1 max-w-md shadow-2xl rotate-2">
                    <div className="flex items-start gap-4 mb-6">
                        <Zap className="text-yellow-400 w-8 h-8 shrink-0 fill-yellow-400" />
                        <p className="text-white font-bold text-xl uppercase leading-tight italic">
                            Cada homem escalado tem a missão obrigatória de convocar:
                        </p>
                    </div>
                    <div className="flex items-end gap-3 border-t border-white/20 pt-4">
                        <span className="text-6xl font-black text-yellow-400 tracking-tighter">02</span>
                        <div className="pb-2">
                            <p className="text-white font-black uppercase leading-none text-2xl">Mulheres</p>
                            <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">No Mínimo / Por Cabeça</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Marquee Ticker */}
            <div className="bg-black py-2 overflow-hidden border-t border-yellow-400/20">
                <motion.div 
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="flex whitespace-nowrap gap-10"
                >
                    {[...Array(10)].map((_, i) => (
                        <span key={i} className="text-yellow-400 font-black uppercase text-xs tracking-[0.3em]">
                            • SEM MULHER SEM FESTA • RESPEITE A ESCALAÇÃO • EDI'S PARTY 2026 • MISSÃO DADA É MISSÃO CUMPRIDA •
                        </span>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default GoldenRule;
