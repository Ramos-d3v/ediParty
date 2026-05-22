import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import gsap from 'gsap';

const OrganizerCard = ({ organizer, image, index }) => {
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
        return () => ctx.revert();
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
            className="group relative aspect-[3/4] rounded-3xl"
        >
            {/* Magnetic Card Body */}
            <div 
                ref={innerRef}
                className="absolute inset-0 bg-zinc-900/40 border border-white/5 rounded-3xl overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-colors duration-500 group-hover:border-accent/20"
            >
                {/* Photo Container */}
                <div className="relative h-[72%] overflow-hidden bg-zinc-950">
                    <img 
                        src={imageUrl} 
                        alt={organizer.nome}
                        className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100"
                    />
                    
                    {/* Glass Overlay for Depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-90" />
                    
                    {/* ID Badge */}
                    <div className="absolute top-6 left-6 z-20 px-3 py-1 bg-black/60 backdrop-blur-xl border border-white/10 rounded-md text-[9px] font-mono font-bold tracking-[0.2em] text-zinc-500 uppercase">
                        Unit {organizer.id.toString().padStart(2, '0')}
                    </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-500">
                            {organizer.time}
                        </span>
                    </div>
                    <h3 className="text-2xl font-black italic tracking-tighter leading-none uppercase group-hover:text-white transition-colors">
                        {organizer.nome.split(' ')[0]} <br/>
                        <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors">
                            {organizer.nome.split(' ').slice(1).join(' ')}
                        </span>
                    </h3>
                </div>
            </div>
        </motion.div>
    );
};

export default OrganizerCard;
