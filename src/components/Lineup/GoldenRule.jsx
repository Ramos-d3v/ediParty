import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ShieldCheck, Trash2, Users } from 'lucide-react';

const GoldenRule = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mb-32 overflow-hidden rounded-3xl bg-yellow-400"
        >
            {/* Brutalist Pattern Overlay - Optimized (No mix-blend-mode) */}
            <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#000,#000_10px,transparent_10px,transparent_20px)]" />
            </div>

            <div className="relative z-10 p-8 md:p-16 flex flex-col gap-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-black text-yellow-400 p-2.5 rounded-lg shadow-xl">
                                <AlertTriangle size={24} strokeWidth={2.5} />
                            </div>
                            <span className="text-black font-black uppercase tracking-[0.3em] text-[10px] md:text-xs">
                                Protocolo de Segurança: Regra de Ouro
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black text-black italic leading-[0.85] uppercase tracking-tighter">
                            DIRETRIZES <br/>
                            <span className="bg-black text-white px-4 py-1.5 inline-block transform -rotate-1 origin-left mt-2">
                                INEGOCIÁVEIS
                            </span>
                        </h2>
                    </div>
                    
                    <div className="hidden md:block">
                        <ShieldCheck size={120} className="text-black/10 -mb-8 -mr-4" />
                    </div>
                </div>

                {/* Two-Front Mission Cards */}
                <div className="grid md:grid-cols-2 gap-6 relative">
                    {/* Front 01: Convocação */}
                    <div className="bg-black p-8 md:p-10 rounded-2xl shadow-2xl transform md:-rotate-1 hover:rotate-0 transition-transform duration-500">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-yellow-400 rounded-xl">
                                <Users className="text-black w-6 h-6" />
                            </div>
                            <h4 className="text-yellow-400 font-black uppercase tracking-widest text-sm">Missão Front 01</h4>
                        </div>
                        
                        <div className="mb-10">
                            <p className="text-white font-black text-2xl md:text-3xl uppercase leading-tight italic mb-4">
                                EQUILÍBRIO TÁTICO
                            </p>
                            <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.2em] leading-relaxed">
                                TODO OPERACIONAL ESCALADO DEVE GARANTIR A PRESENÇA DE, NO MÍNIMO:
                            </p>
                        </div>

                        <div className="flex items-end gap-4 border-t border-white/10 pt-6">
                            <span className="text-7xl font-black text-yellow-400 tracking-tighter leading-none">01</span>
                            <div className="pb-1">
                                <p className="text-white font-black uppercase leading-none text-3xl">Mulher</p>
                                <p className="text-zinc-600 font-bold uppercase text-[9px] tracking-widest mt-1">Cota Mínima / Por Cabeça</p>
                            </div>
                        </div>
                    </div>

                    {/* Front 02: Operação Limpeza */}
                    <div className="bg-black p-8 md:p-10 rounded-2xl shadow-2xl transform md:rotate-1 hover:rotate-0 transition-transform duration-500">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-yellow-400 rounded-xl">
                                <Trash2 className="text-black w-6 h-6" />
                            </div>
                            <h4 className="text-yellow-400 font-black uppercase tracking-widest text-sm">Missão Front 02</h4>
                        </div>
                        
                        <div className="mb-10">
                            <p className="text-white font-black text-2xl md:text-3xl uppercase leading-tight italic mb-4">
                                EXTRAÇÃO DE RESÍDUOS
                            </p>
                            <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.2em] leading-relaxed">
                                PARTICIPAÇÃO ATIVA NA "OPERAÇÃO LIMPEZA" PÓS-EVENTO. TOLERÂNCIA ZERO PARA DESORDEM.
                            </p>
                        </div>

                        <div className="pt-6 border-t border-white/10">
                            <p className="text-yellow-400 font-black uppercase text-xl italic tracking-tighter">
                                STATUS: OBRIGATÓRIO
                            </p>
                            <p className="text-zinc-600 font-bold uppercase text-[9px] tracking-widest mt-1">Extração Imediata após o encerramento</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Optimized Marquee Ticker - High FPS */}
            <div className="bg-black py-4 overflow-hidden border-t border-white/5 relative">
                <motion.div 
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                    className="flex whitespace-nowrap gap-12 will-change-transform"
                >
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-12">
                            <span className="text-yellow-400 font-black uppercase text-[10px] md:text-xs tracking-[0.4em]">
                                SEM COTA SEM ACESSO
                            </span>
                            <span className="text-white/20 font-black uppercase text-[10px] md:text-xs tracking-[0.4em]">
                                //
                            </span>
                            <span className="text-yellow-400 font-black uppercase text-[10px] md:text-xs tracking-[0.4em]">
                                OPERAÇÃO LIMPEZA É LEI
                            </span>
                            <span className="text-white/20 font-black uppercase text-[10px] md:text-xs tracking-[0.4em]">
                                //
                            </span>
                            <span className="text-yellow-400 font-black uppercase text-[10px] md:text-xs tracking-[0.4em]">
                                EDI'S PARTY 2026: MISSÃO CRÍTICA
                            </span>
                            <span className="text-white/20 font-black uppercase text-[10px] md:text-xs tracking-[0.4em]">
                                //
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default GoldenRule;
