import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
    const [bootStatus, setBootStatus] = useState('booting');
    const { scrollYProgress } = useScroll();
    
    // GPU-accelerated Parallax
    const yVideo = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    useEffect(() => {
        // Precise timing for the Tactical Boot Sequence
        const timer = setTimeout(() => {
            setBootStatus('ready');
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.5
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                ease: [0.16, 1, 0.3, 1], 
                duration: 1 
            } 
        }
    };

    return (
        <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-zinc-950 font-mono">
            {/* Background Atmosphere - GPU Optimized */}
            <motion.div 
                className="absolute inset-0 w-full h-full will-change-transform"
                style={{ y: yVideo, transform: 'translateZ(0)' }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-zinc-950 z-10" />
                <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    className="w-full h-full object-cover opacity-30 grayscale contrast-125"
                >
                    <source src="https://cdn.pixabay.com/video/2020/09/24/50901-463876008_large.mp4" type="video/mp4" />
                </video>
            </motion.div>

            {/* Stage 01: Tactical Boot Terminal */}
            <AnimatePresence>
                {bootStatus === 'booting' && (
                    <motion.div 
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.4, ease: "easeIn" }}
                        className="absolute inset-0 z-50 flex items-center justify-center bg-zinc-950"
                    >
                        <div className="flex flex-col items-center gap-2">
                            <motion.div 
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ repeat: Infinity, duration: 0.1 }}
                                className="text-yellow-400 text-[10px] md:text-xs tracking-[0.4em] font-black uppercase text-center"
                            >
                                {">"} SYSTEM BOOT... INITIALIZING PROTOCOL // CLASSIFIED
                            </motion.div>
                            <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden mt-4">
                                <motion.div 
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "100%" }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    className="absolute inset-0 bg-yellow-400 w-1/2"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Stage 02: The Slam & Reveal */}
            {bootStatus === 'ready' && (
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="container relative z-30 px-6 flex flex-col items-center justify-center will-change-transform"
                    style={{ y: yContent, opacity: opacityHero, transform: 'translateZ(0)' }}
                >
                    {/* Brutal Slam Title */}
                    <motion.div className="relative mb-12">
                        <motion.h1 
                            initial={{ scale: 2.5, opacity: 0, y: -100 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ 
                                type: "spring",
                                stiffness: 200,
                                damping: 25,
                                mass: 1.2,
                                opacity: { duration: 0.2 }
                            }}
                            className="flex flex-col items-center text-center select-none will-change-transform"
                        >
                            <span className="text-[18vw] md:text-[clamp(5rem,12vw,10rem)] font-black leading-[0.75] uppercase italic tracking-tighter text-white drop-shadow-2xl">
                                EDI'S
                            </span>
                            <span className="text-[18vw] md:text-[clamp(5rem,12vw,10rem)] font-black leading-[0.75] uppercase italic tracking-tighter text-purple-600 drop-shadow-[0_0_50px_rgba(147,51,234,0.4)]">
                                PARTY
                            </span>
                            <span className="text-[4vw] md:text-[2vw] font-black text-yellow-400 tracking-[0.8em] mt-4 self-end md:mr-10">
                                2026
                            </span>
                        </motion.h1>
                    </motion.div>

                    {/* Staggered Content */}
                    <motion.div variants={itemVariants} className="flex flex-col items-center gap-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-[1px] bg-white/20" />
                            <p className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-center">
                                Protocolo de Elite Ativado
                            </p>
                            <div className="w-12 h-[1px] bg-white/20" />
                        </div>

                        <button className="group relative px-10 py-4 bg-yellow-400 overflow-hidden active:scale-95 transition-transform">
                            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <span className="relative z-10 text-black group-hover:text-yellow-400 font-black italic uppercase tracking-widest text-sm">
                                ACEITAR MISSÃO
                            </span>
                        </button>
                    </motion.div>
                </motion.div>
            )}

            {/* Scroll Indicator */}
            {bootStatus === 'ready' && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4"
                >
                    <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-zinc-700">
                        Iniciando Descida
                    </span>
                    <div className="w-[1px] h-16 bg-gradient-to-b from-purple-500/40 to-transparent relative overflow-hidden">
                        <motion.div 
                            animate={{ y: ["-100%", "200%"] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="absolute top-0 left-0 w-full h-1/2 bg-purple-500" 
                        />
                    </div>
                </motion.div>
            )}

            {/* Grain Overlay - Static for performance */}
            <div className="absolute inset-0 z-40 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </section>
    );
};

export default Hero;
