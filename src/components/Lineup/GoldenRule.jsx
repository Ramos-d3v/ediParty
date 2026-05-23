import { motion } from 'framer-motion';
import { AlertTriangle, Wrench, Shield, Crown } from 'lucide-react';

const GoldenRule = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative mb-24 overflow-hidden rounded-[2rem] bg-yellow-400"
        >
            {/* Optimized Brutalist Pattern */}
            <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#000,#000_10px,transparent_10px,transparent_20px)]" />
            </div>

            <div className="relative z-10 p-8 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-16">
                
                {/* Tactical Header */}
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-black text-yellow-400 p-3 rounded-xl shadow-2xl">
                            <AlertTriangle size={24} strokeWidth={2.5} />
                        </div>
                        <span className="text-black font-black uppercase tracking-[0.3em] text-xs md:text-sm">
                            Protocolo de Segurança Elite
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black text-black italic leading-[0.85] uppercase tracking-tighter mb-6">
                        REGRA DE <br/>
                        <span className="bg-black text-white px-6 py-2 inline-block transform -rotate-1 origin-left mt-2">
                            OURO
                        </span>
                    </h2>
                </div>

                {/* Tactical Mission Cards - 2 Column Layout */}
                <div className="bg-black p-8 md:p-12 rounded-[2.5rem] flex-1 w-full max-w-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transform md:rotate-1 relative overflow-hidden group">
                    
                    {/* Authorized Stamp - Performance Optimized */}
                    <div className="absolute top-4 right-4 md:top-8 md:right-8 opacity-20 transform rotate-12 pointer-events-none">
                        <div className="border-4 border-yellow-400/50 p-3 md:p-4 rounded-xl">
                            <p className="text-yellow-400 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] italic">
                                AUTHORIZED BY: <br/> GENERAL EDICARLOS
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 divide-y md:divide-y-0 md:divide-x divide-white/10 relative z-10">
                        
                        {/* Mission 01: Logistics & Cleanup */}
                        <div className="flex flex-col gap-6 md:pr-10">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-yellow-400/10 rounded-lg">
                                    <Wrench className="text-yellow-400 w-6 h-6" />
                                </div>
                                <h3 className="text-white font-black uppercase tracking-widest text-sm">Missão Front 01</h3>
                            </div>
                            
                            <div className="space-y-4">
                                <p className="text-yellow-400 font-black text-2xl uppercase leading-tight italic">
                                    LOGÍSTICA <br/> E LIMPEZA
                                </p>
                                <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.15em] leading-relaxed">
                                    MONTAGEM, EXTRAÇÃO E PROTOCOLO ZERO RASTROS. NINGUÉM ABANDONA A BASE ATÉ O PERÍMETRO ESTAR LIMPO.
                                </p>
                            </div>

                            <div className="mt-auto">
                                <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 rounded-sm text-[9px] font-black uppercase tracking-tighter">
                                    <Crown size={10} /> Status: Obrigatório
                                </div>
                            </div>
                        </div>

                        {/* Mission 02: Supreme Command */}
                        <div className="pt-10 md:pt-0 md:pl-10 flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-yellow-400/10 rounded-lg">
                                    <Shield className="text-yellow-400 w-6 h-6" />
                                </div>
                                <h3 className="text-white font-black uppercase tracking-widest text-sm">Missão Front 02</h3>
                            </div>
                            
                            <div className="space-y-4">
                                <p className="text-white font-black text-2xl uppercase leading-tight italic">
                                    DIRETRIZ <br/> SUPREMA
                                </p>
                                <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.15em] leading-relaxed">
                                    LEALDADE ABSOLUTA À CADEIA DE COMANDO. A PALAVRA DO GENERAL EDICARLOS É A LEI FINAL NA BASE.
                                </p>
                            </div>

                            <div className="mt-auto flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-red-500 font-black uppercase text-[10px] tracking-widest italic">
                                    HIERARQUIA ABSOLUTA
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* High-Performance Marquee */}
            <div className="bg-black py-4 overflow-hidden border-t border-white/10 relative">
                <motion.div 
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                    className="flex whitespace-nowrap gap-16 will-change-transform"
                >
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-16">
                            <span className="text-yellow-400 font-black uppercase text-[10px] md:text-xs tracking-[0.5em]">
                                • PROTOCOLO ZERO RASTROS •
                            </span>
                            <span className="text-white/20 font-black uppercase text-[10px] md:text-xs tracking-[0.5em]">
                                //
                            </span>
                            <span className="text-yellow-400 font-black uppercase text-[10px] md:text-xs tracking-[0.5em]">
                                • LEALDADE AO ESQUADRÃO •
                            </span>
                            <span className="text-white/20 font-black uppercase text-[10px] md:text-xs tracking-[0.5em]">
                                //
                            </span>
                            <span className="text-yellow-400 font-black uppercase text-[10px] md:text-xs tracking-[0.5em]">
                                • GENERAL EDICARLOS NO COMANDO •
                            </span>
                            <span className="text-white/20 font-black uppercase text-[10px] md:text-xs tracking-[0.5em]">
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
