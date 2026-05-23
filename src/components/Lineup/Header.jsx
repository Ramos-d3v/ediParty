import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Header = () => {
    // Generate stable "pseudo-random" positions using indices to satisfy purity rules
    const stars = useMemo(() => {
        return [...Array(20)].map((_, i) => ({
            id: i,
            width: ((i * 13) % 4) + 1 + 'px',
            height: ((i * 13) % 4) + 1 + 'px',
            top: ((i * 17) % 100) + '%',
            left: ((i * 23) % 100) + '%',
            delay: (i * 0.5) % 5 + 's'
        }));
    }, []);

    return (
        <header className="relative min-h-[80vh] flex flex-col items-center justify-center pt-20 overflow-hidden">
            {/* Animated Grid Floor */}
            <div 
                className="absolute bottom-0 w-[200%] h-[40vh] bg-gradient-to-t from-purple-500/20 to-transparent pointer-events-none"
                style={{
                    perspective: "1000px",
                    transform: "translateX(-25%)"
                }}
            >
                <div 
                    className="w-full h-full animate-grid"
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(168, 85, 247, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(168, 85, 247, 0.2) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                        transform: "rotateX(60deg) translateY(-50%)",
                        transformOrigin: "center top"
                    }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="container mx-auto px-4 text-center relative z-20"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-white/80">
                        Convocação Oficial
                    </span>
                </div>

                <h1 className="text-7xl md:text-[12rem] font-black leading-[0.8] uppercase italic tracking-tighter mb-8 group">
                    <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 group-hover:to-purple-500 transition-all duration-1000">
                        EDI'S
                    </span>
                    <span className="block text-purple-500 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                        PARTY
                    </span>
                </h1>

                <p className="max-w-2xl mx-auto text-lg md:text-2xl font-medium text-gray-400 leading-relaxed">
                    Esta é a escalação oficial das mentes brilhantes convocadas para organizar a maior festa do ano. 
                    <span className="text-white"> Prepare-se para o épico.</span>
                </p>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="mt-20 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-500">Scroll Down</span>
                    <div className="w-px h-12 bg-gradient-to-b from-purple-500 to-transparent" />
                </motion.div>
            </motion.div>

            {/* Decorative Stars/Dots - Optimized with stable values */}
            {stars.map((star) => (
                <div 
                    key={star.id}
                    className="absolute bg-white rounded-full opacity-20 animate-pulse"
                    style={{
                        width: star.width,
                        height: star.height,
                        top: star.top,
                        left: star.left,
                        animationDelay: star.delay
                    }}
                />
            ))}
        </header>
    );
};

export default Header;
