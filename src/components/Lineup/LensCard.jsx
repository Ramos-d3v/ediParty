import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ShieldAlert } from 'lucide-react';

const LensCard = ({ organizer, image, index }) => {
    const cardRef = useRef(null);
    const innerRef = useRef(null);
    
    // Framer Motion for 3D Parallax on Hover
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    const handleMouseMove = (e) => {
        // Disable parallax on touch devices to prevent "stuck" card visual bug
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
    };

    const handleMouseLeave = () => {
        if (window.matchMedia("(pointer: coarse)").matches) return;
        x.set(0);
        y.set(0);
    };

    useEffect(() => {
        // GSAP Context for safe cleanup and memory leak prevention
        let ctx = gsap.context(() => {
            gsap.to(innerRef.current, {
                y: "random(-8, 8)",
                x: "random(-4, 4)",
                rotate: "random(-1, 1)",
                duration: "random(2.5, 4)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });

        return () => ctx.revert(); // Kills all animations inside the context on unmount
    }, []);

    const imageUrl = image ? new URL(`../../assets/${image}`, import.meta.url).href : `https://ui-avatars.com/api/?name=${encodeURIComponent(organizer.nome)}&background=random&color=fff&size=512`;

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className="lens-card-trigger group relative w-[280px] sm:w-[350px] md:w-[450px] aspect-[3/4] rounded-3xl shrink-0"
        >
            {/* Magnetic Card Body */}
            <div 
                ref={innerRef}
                className="lens-card-inner absolute inset-0 bg-zinc-900/30 border border-white/5 rounded-3xl overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-colors duration-500 group-hover:border-accent/30"
            >
                {/* --- CLASSIFIED LAYER --- */}
                <div className="classified-layer absolute inset-0 z-20 flex flex-col items-center justify-center p-8 bg-[#050505]">
                    {/* Dark silhouette photo */}
                    <img 
                        src={imageUrl} 
                        alt="Classified"
                        className="absolute inset-0 w-full h-full object-cover brightness-0 blur-2xl opacity-20 scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay z-10 pointer-events-none" />
                    
                    <div className="relative z-20 flex flex-col items-center gap-6">
                        <div className="p-4 rounded-full bg-accent/5 border border-accent/10">
                            <ShieldAlert className="text-accent/40 w-10 h-10" strokeWidth={1} />
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-mono font-bold tracking-[0.5em] text-accent/50 uppercase">
                                LOCKED
                            </h3>
                            <p className="text-[9px] font-mono tracking-widest text-zinc-700 uppercase mt-4">
                                // Authorization Required //
                            </p>
                        </div>
                    </div>

                    <div className="absolute top-6 left-6 z-20 px-3 py-1 bg-zinc-950 border border-white/5 rounded-md text-[8px] tracking-[0.2em] text-zinc-500 uppercase font-mono">
                        P-2026 // {index.toString().padStart(3, '0')}
                    </div>
                </div>

                {/* --- REVEALED LAYER --- */}
                <div className="revealed-layer absolute inset-0 z-30 opacity-0 flex flex-col justify-end p-6 md:p-10 pointer-events-none">
                    <img 
                        src={imageUrl} 
                        alt={organizer.nome}
                        className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100"
                    />
                    
                    {/* Deep gradient for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-[#050505]/60 to-transparent opacity-90" />
                    
                    {/* ID Badge */}
                    <div className="absolute top-6 left-6 z-40 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-md text-[9px] font-mono font-bold tracking-[0.2em] text-zinc-400 uppercase group-hover:border-accent/40 transition-colors">
                        Unit {organizer.id.toString().padStart(2, '0')}
                    </div>

                    {/* Content */}
                    <div className="relative z-40 text-left">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                            <span className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-500">
                                {organizer.time}
                            </span>
                        </div>
                        <h3 className="text-2xl md:text-4xl font-black italic tracking-tighter leading-none uppercase text-white">
                            {organizer.nome.split(' ')[0]} <br/>
                            <span className="text-white/40 group-hover:text-white transition-colors">
                                {organizer.nome.split(' ').slice(1).join(' ')}
                            </span>
                        </h3>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default LensCard;
