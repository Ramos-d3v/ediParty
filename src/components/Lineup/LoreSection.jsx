import { motion } from 'framer-motion';
import { Star, ShieldAlert, Info, Users, ArrowRight } from 'lucide-react';

const imageMap = {
    'enzo ramos': 'enzo.jpeg',
    'diego bissochi': 'diegoBissochi.jpeg'
};

const LoreSection = () => {
    const getImageUrl = (name) => {
        const imageName = imageMap[name];
        return imageName ? new URL(`../../assets/${imageName}`, import.meta.url).href : null;
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
        }
    };

    return (
        <section className="relative bg-zinc-950 py-32 overflow-hidden border-t border-white/5">
            {/* Background Texture - Performance Optimized */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            
            <div className="container mx-auto px-6 relative z-10">
                
                {/* Header: Tactical Dossier Label */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={sectionVariants}
                    className="flex flex-col items-center mb-24 text-center"
                >
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-yellow-400/10 border border-yellow-400/20 rounded-full mb-6">
                        <ShieldAlert size={14} className="text-yellow-400" />
                        <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-yellow-400">
                            DECLASSIFIED // TOP SECRET
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white leading-none">
                        A GÊNESE DA <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">OPERAÇÃO</span>
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    
                    {/* Part 01: The Commander's Idea */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={sectionVariants}
                        className="space-y-12"
                    >
                        {/* The Restricted Commander Card */}
                        <div className="relative aspect-[4/5] md:aspect-video lg:aspect-square bg-zinc-900 border border-white/10 rounded-[2rem] overflow-hidden group">
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                                <Star size={120} strokeWidth={0.5} className="text-yellow-400/10 mb-8" />
                                <div className="space-y-2">
                                    <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest leading-none mb-2">Subject_Identification</p>
                                    <h4 className="text-3xl font-black italic uppercase text-zinc-500 tracking-tighter leading-none">COMMANDER <br/> EDICARLOS</h4>
                                </div>
                            </div>
                            
                            {/* Confidencial Bar - Solid for high FPS */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] py-4 bg-yellow-400 shadow-2xl rotate-[-12deg] z-20 flex items-center justify-center">
                                <span className="text-black font-black italic uppercase tracking-[0.3em] text-xs md:text-sm whitespace-nowrap">
                                    CLASSIFIED // COMMANDER VISUAL REJECTED
                                </span>
                            </div>
                        </div>

                        <div className="border-l-4 border-yellow-400 pl-8 space-y-6">
                            <h3 className="text-3xl font-black italic uppercase text-white tracking-tight">O Decreto Inicial</h3>
                            <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                                Tudo começou com uma diretriz vinda diretamente do Alto Comando. O General Edicarlos emitiu o seguinte comunicado: 
                                <span className="block mt-4 text-white italic text-xl border-y border-white/5 py-4">
                                    "Porque não juntamos vocês e os amigos organiza a casa aqui,faz resenha, festa e etc, assim pode fazer barulho a vontade e trazer quem quiser."
                                </span>
                            </p>
                            <p className="text-zinc-500 text-sm font-mono leading-relaxed">
                                // Status: Ativando protocolos de diversão tática.
                            </p>
                        </div>
                    </motion.div>

                    {/* Part 02: The Recruitment Maneuver */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={sectionVariants}
                        className="space-y-12 lg:mt-32"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            {/* LT ENZO */}
                            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/5 grayscale hover:grayscale-0 transition-all duration-700 group">
                                <img src={getImageUrl('enzo ramos')} alt="LT Enzo" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                                    <span className="text-[8px] font-mono text-yellow-400 uppercase tracking-widest font-black">LT_ENZO_RAMOS</span>
                                </div>
                            </div>
                            {/* LT BISSOCHI */}
                            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/5 grayscale hover:grayscale-0 transition-all duration-700 group">
                                <img src={getImageUrl('diego bissochi')} alt="LT Bissochi" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                                    <span className="text-[8px] font-mono text-yellow-400 uppercase tracking-widest font-black">LT_DIEGO_BISSOCHI</span>
                                </div>
                            </div>
                        </div>

                        <div className="border-l-4 border-yellow-400 pl-8 space-y-6">
                            <h3 className="text-3xl font-black italic uppercase text-white tracking-tight">A IDEA DO RECRUTAMENTO</h3>
                            <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                                Detectando a oportunidade no decreto do General, os <span className="text-white">Tenentes de Elite Enzo e Diego Bissochi</span> executaram a manobra mais audaciosa da história da base. 
                            </p>
                            <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                                Aproveitando os tempos de  Copa, eles forjaram a <span className="text-yellow-400 italic font-black">"CONVOCAÇÃO DOS 26"</span>. O "Elite Squad" foi pensado na ideia de Edicarlos de juntar a galera e fazer a festa, mas os tenentes foram além. 
                            </p>
                            <p className="text-white font-black italic text-xl border-y border-white/10 py-6 leading-tight">
                                "Não estávamos recrutando convidados. Estávamos mobilizando uma força de trabalho gratuita para nos ajudar a organizar o local para que seja um local de paz, segurança e diversão para todos."
                            </p>
                            <div className="flex items-center gap-4 text-zinc-500 font-mono text-[10px] uppercase tracking-widest bg-white/[0.03] p-4 rounded-xl border border-white/5">
                                <Users size={16} className="text-yellow-400" />
                                <span>Status: Operação de Engenharia Social em andamento!</span>
                            </div>
                        </div>

                        {/* Action Link to next mission */}
                        <div className="pt-10 flex flex-col gap-4">
                            <div className="flex items-center gap-2 text-zinc-700 font-mono text-[9px] uppercase tracking-[0.4em]">
                                <ArrowRight size={10} />
                                Continue para a escalação
                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* Final Footer Stamp */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 }}
                    className="mt-40 text-center border-t border-white/5 pt-20"
                >
                    <p className="text-zinc-700 font-mono text-[10px] uppercase tracking-[0.5em] font-black">
                        Archives_Initialized // Operation_Genesis_Clearance_Confirmed
                    </p>
                </motion.div>

            </div>
        </section>
    );
};

export default LoreSection;
