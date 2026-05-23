import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
    const [bootSequence, setBootSequence] = useState('initializing');
    const { scrollYProgress } = useScroll();
    
    // Optimized Parallax: Uses transform instead of layout properties
    const yVideo = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityContent = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    useEffect(() => {
        // Fast boot sequence to prevent LCP degradation
        const timer1 = setTimeout(() => setBootSequence('decrypting'), 600);
        const timer2 = setTimeout(() => setBootSequence('ready'), 1200);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    // Frame-perfect staggering variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1 // Wait for slam to finish
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { ease: [0.16, 1, 0.3, 1], duration: 0.8 } }
    };

    return (
        <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-zinc-950 font-mono">
            {/* Background Video with GPU Acceleration */}
            <motion.div 
                className="absolute inset-0 w-full h-full will-change-transform"
                style={{ y: yVideo, transform: 'translateZ(0)' }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-zinc-950 z-10" />
                <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    className="w-full h-full object-cover opacity-40 scale-105"
                >
                    <source src="https://cdn.pixabay.com/video/2020/09/24/50901-463876008_large.mp4" type="video/mp4" />
                </video>
            </motion.div>

            {/* Tactical Boot Sequence Terminal */}
            <AnimatePresence>
                {bootSequence !== 'ready' && (
                    <motion.div 
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.4, ease: "easeIn" }}
                        className="absolute inset-0 z-50 flex items-center justify-center bg-zinc-950"
                    >
                        <div className="text-yellow-400 text-xs md:text-sm tracking-[0.5em] font-bold uppercase animate-pulse">
                            {bootSequence === 'initializing' ? '> SYSTEM BOOT... INITIALIZING PROTOCOL' : '> DECRYPTING ROSTER... STANDBY'}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Reveal */}
            {bootSequence === 'ready' && (
                <motion.div 
                    className="container relative z-30 px-4 flex flex-col items-center justify-center will-change-transform"
                    style={{ y: yContent, opacity: opacityContent, transform: 'translateZ(0)' }}
                >
                    {/* The Slam Effect for Main Title */}
                    <motion.h1 
                        initial={{ scale: 1.5, opacity: 0, y: -50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ 
                            duration: 0.8, 
                            ease: [0.16, 1, 0.3, 1], // Expo-out curve for heavy impact
                            opacity: { duration: 0.4 } // Fade in quickly, scale down slowly
                        }}
                        className="flex flex-col items-center select-none text-center will-change-transform"
                    >
                        <span className="text-[20vw] md:text-[clamp(6rem,15vw,12rem)] font-black leading-[0.8] uppercase italic tracking-tighter text-white drop-shadow-2xl">
                            EDI'S
                        </span>
                        <span className="text-[20vw] md:text-[clamp(6rem,15vw,12rem)] font-black leading-[0.8] uppercase italic tracking-tighter text-purple-500 drop-shadow-[0_0_40px_rgba(168,85,247,0.4)]">
                            PARTY
                        </span>
                    </motion.h1>

                    {/* Staggered Secondary Elements */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="mt-8 flex flex-col items-center gap-6"
                    >
                        <motion.div variants={itemVariants} className="flex items-center gap-3 bg-zinc-900/50 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                            <span className="text-[10px] md:text-xs text-yellow-400 tracking-[0.4em] uppercase font-bold">
                                Missão Crítica_2026
                            </span>
                        </motion.div>
                        
                        <motion.p variants={itemVariants} className="text-zinc-500 text-xs md:text-sm uppercase tracking-widest max-w-sm text-center">
                            Apenas operacionais autorizados. Acesso restrito ao elenco confirmado.
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}

            {/* Scroll Indicator */}
            {bootSequence === 'ready' && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4"
                >
                    <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600">
                        Initiate Descent
                    </span>
                    <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-purple-500/50 to-transparent relative overflow-hidden">
                        <motion.div 
                            animate={{ y: ["-100%", "200%"] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            className="absolute top-0 left-0 w-full h-1/2 bg-purple-500" 
                        />
                    </div>
                </motion.div>
            )}

            {/* Hardware-friendly Noise (Static overlay) */}
            <div className="absolute inset-0 z-40 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" style={{ transform: 'translateZ(0)' }} />
        </section>
    );
};

export default Hero;
