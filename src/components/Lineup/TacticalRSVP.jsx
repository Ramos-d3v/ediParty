import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Search, Scan, Fingerprint, Send, X, AlertTriangle } from 'lucide-react';

const timeStr = `enzo ramos, fiap
diego bissochi, unesp 
adriano rufino, unesp 
matteo Rodrigues, uniso
whayke senna, uniso 
vinicius kobo, mackenzie 
henrique adriane, objetivo 
yukio moser, objetivo 
eduardo rodrigues, roça 
pedro dos anjos, albert einstein 
lucas condomínio, aurora
pedro nogueira, opera
gustavo forsseto, objetivo 
enzo salerno, objetivo
otávio saraiva, uniso
nicolas bezerra, tenente 
nicolas márcio, uniso 
bruninho, uniso
caue atui, anime
gabriel makoto , gakko
koba pereira, fut
niko furuiti, australia
fernando suguimoto, fgv
felipe pontes, anglo
samuel tiktok, bolivia
murilo central , usp`;

const organizers = timeStr.split('\n')
    .map((linha) => {
        const [nome, time] = linha.split(',');
        return {
            nome: nome.trim(),
            time: time.trim(),
        };
    })
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
    .map((org, index) => ({
        ...org,
        id: index + 1
    }));

const imageMap = {
    'enzo ramos': 'enzo.jpeg',
    'diego bissochi': 'diegoBissochi.jpeg',
    'adriano rufino': 'adriano.jpeg',
    'matteo Rodrigues': 'matteo.jpeg',
    'whayke senna': 'whaykeSena.jpeg',
    'vinicius kobo': 'vinicius.jpeg',
    'henrique adriane': 'henrique.jpeg',
    'yukio moser': 'yukio.jpeg',
    'eduardo rodrigues': 'eduardo.jpeg',
    'pedro dos anjos': 'pedroValesin.jpeg',
    'lucas condomínio': 'lucas.jpeg',
    'pedro nogueira': 'nogueira.jpeg',
    'gustavo forsseto': 'forssetto.jpeg',
    'otávio saraiva': 'otavio.jpeg',
    'nicolas bezerra': 'nicolasBezerra.jpeg',
    'nicolas márcio': 'nicolasMarcio.jpeg',
    'bruninho': 'bruninho.jpeg',
    'caue atui': 'caue.jpeg',
    'gabriel makoto': 'macoto.jpeg',
    'samuel tiktok': 'samuel.jpeg',
    'murilo central': 'murilo.jpeg'
};

const TacticalRSVP = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [phase, setPhase] = useState(1); // 1: Search, 2: Scanner, 3: Biometrics, 4: Access
    const [searchTerm, setSearchInput] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [holdProgress, setHoldProgress] = useState(0);
    const holdTimerRef = useRef(null);

    const filteredOrganizers = useMemo(() => {
        if (!searchTerm || searchTerm.length < 2) return [];
        return organizers.filter(org => 
            org.nome.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, 5);
    }, [searchTerm]);

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setPhase(2);
        setTimeout(() => setPhase(3), 3000);
    };

    const startHold = () => {
        holdTimerRef.current = setInterval(() => {
            setHoldProgress(prev => {
                if (prev >= 100) {
                    clearInterval(holdTimerRef.current);
                    setPhase(4);
                    return 100;
                }
                return prev + 1.5;
            });
        }, 30);
    };

    const stopHold = () => {
        clearInterval(holdTimerRef.current);
        if (phase !== 4) setHoldProgress(0);
    };

    const reset = () => {
        setIsOpen(false);
        setTimeout(() => {
            setPhase(1);
            setSearchInput('');
            setSelectedUser(null);
            setHoldProgress(0);
        }, 500);
    };

    const getImageUrl = (name) => {
        const imageName = imageMap[name];
        return imageName ? new URL(`../../assets/${imageName}`, import.meta.url).href : null;
    };

    return (
        <>
            <motion.button 
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-40 bg-yellow-400 text-black px-6 py-4 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-transform flex items-center gap-3 group border-2 border-black/10"
            >
                <Fingerprint size={22} className="group-hover:animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em]">INICIAR PROTOCOLO DE ACESSO</span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-zinc-950/98 backdrop-blur-3xl flex flex-col items-center justify-center p-4 md:p-8"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
                        
                        <button onClick={reset} className="absolute top-6 right-6 md:top-10 md:right-10 text-zinc-600 hover:text-white transition-colors p-2">
                            <X size={32} strokeWidth={1} />
                        </button>

                        <div className="w-full max-w-2xl">
                            
                            {phase === 1 && (
                                <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-12">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-yellow-500">
                                            <ShieldCheck size={18} />
                                            <span className="text-[10px] font-mono uppercase tracking-[0.5em] font-bold">SVI // IDENTITY_SYSTEM_BOOT</span>
                                        </div>
                                        <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-none">
                                            QUEM É <br/> <span className="text-yellow-400 underline decoration-yellow-400/20 underline-offset-8">O RECRUTA?</span>
                                        </h2>
                                    </div>

                                    <div className="relative group">
                                        <input 
                                            autoFocus
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchInput(e.target.value)}
                                            placeholder="Qual o teu codinome, recruta?"
                                            className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-yellow-400 outline-none py-6 text-2xl md:text-4xl font-mono font-bold text-yellow-400 placeholder:text-zinc-800 uppercase tracking-tighter transition-all"
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                            <Search className="text-zinc-800 group-focus-within:text-yellow-400 transition-colors" size={28} />
                                        </div>
                                    </div>

                                    <div className="grid gap-3">
                                        {filteredOrganizers.map(org => (
                                            <button 
                                                key={org.id}
                                                onClick={() => handleSelectUser(org)}
                                                className="w-full text-left p-6 bg-white/[0.02] border border-white/5 hover:border-yellow-400/30 hover:bg-yellow-400/5 transition-all rounded-3xl group flex items-center justify-between"
                                            >
                                                <div className="flex flex-col">
                                                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Dossier_Match_Found</span>
                                                    <span className="text-2xl font-black italic uppercase text-zinc-300 group-hover:text-yellow-400 transition-colors">{org.nome}</span>
                                                </div>
                                                <Scan size={24} className="text-zinc-800 group-hover:text-yellow-400 group-hover:scale-110 transition-all" />
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {phase === 2 && (
                                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-10">
                                    <div className="text-center space-y-3">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                                            <span className="text-[10px] font-mono text-green-500 font-bold uppercase tracking-widest">Target_Locked</span>
                                        </div>
                                        <h3 className="text-4xl font-black italic uppercase text-white tracking-tighter">Sincronizando Biometria...</h3>
                                    </div>

                                    <div className="relative w-72 h-96 md:w-80 md:h-[420px] rounded-[2.5rem] overflow-hidden border-2 border-white/10 bg-zinc-900 shadow-[0_0_80px_rgba(0,0,0,0.5)]">
                                        {getImageUrl(selectedUser.nome) ? (
                                            <img src={getImageUrl(selectedUser.nome)} alt="Scan Target" className="w-full h-full object-cover grayscale brightness-75 contrast-125" />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-zinc-800 bg-zinc-950">
                                                <X size={80} strokeWidth={0.5} />
                                                <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Photo_Dossier_Missing</span>
                                            </div>
                                        )}
                                        <motion.div 
                                            className="absolute top-0 left-0 w-full h-1 bg-yellow-400 shadow-[0_0_30px_#facc15] z-10 will-change-transform"
                                            animate={{ translateY: [0, 420, 0] }}
                                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                        />
                                        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(250,204,21,0.02)_2px,rgba(250,204,21,0.02)_4px)] pointer-events-none" />
                                    </div>
                                </motion.div>
                            )}

                            {phase === 3 && (
                                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-12">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-red-500">
                                            <AlertTriangle size={18} />
                                            <span className="text-[10px] font-mono uppercase tracking-[0.5em] font-bold">Mandatory_Field_Directives</span>
                                        </div>
                                        <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white">CONTRATO <span className="text-yellow-400">TÁTICO</span></h2>
                                    </div>

                                    <div className="bg-zinc-900/40 border-l-4 border-yellow-400 p-10 rounded-3xl space-y-8 backdrop-blur-md">
                                        <div className="space-y-6">
                                            <div className="flex gap-6">
                                                <span className="text-yellow-400 font-black italic text-2xl">01</span>
                                                <p className="text-zinc-300 text-sm md:text-base font-bold uppercase tracking-wider leading-relaxed">
                                                    OPERAÇÃO LOGÍSTICA: Comprometido com a montagem, extração de resíduos e <span className="text-white underline underline-offset-4 decoration-yellow-400/50">Zero Rastros</span> no perímetro.
                                                </p>
                                            </div>
                                            <div className="flex gap-6 pt-4 border-t border-white/5">
                                                <span className="text-yellow-400 font-black italic text-2xl">02</span>
                                                <p className="text-zinc-300 text-sm md:text-base font-bold uppercase tracking-wider leading-relaxed">
                                                    DIRETRIZ SUPREMA: Lealdade absoluta à cadeia de comando. A palavra do <span className="text-white underline underline-offset-4 decoration-yellow-400/50">General EDICARLOS</span> é a lei final.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center gap-8">
                                        <motion.button 
                                            onMouseDown={startHold} onMouseUp={stopHold} onTouchStart={startHold} onTouchEnd={stopHold}
                                            whileTap={{ scale: 0.95 }}
                                            className="relative w-28 h-28 rounded-full bg-zinc-900 border-4 border-zinc-800 flex items-center justify-center overflow-hidden active:border-yellow-400/50 transition-colors shadow-2xl"
                                        >
                                            <div className="absolute bottom-0 left-0 w-full bg-yellow-400 transition-all duration-75 ease-linear pointer-events-none" style={{ height: `${holdProgress}%` }} />
                                            <Fingerprint size={48} className={`relative z-10 transition-colors duration-300 ${holdProgress > 10 ? 'text-black' : 'text-zinc-600'}`} />
                                        </motion.button>
                                        <p className="text-zinc-600 font-mono text-[10px] md:text-xs uppercase tracking-[0.5em] animate-pulse font-black text-center">
                                            Pressione e segure o sensor para assinar digitalmente
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {phase === 4 && (
                                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center text-center gap-10">
                                    <div className="w-full bg-white text-black p-10 rounded-[2.5rem] space-y-8 shadow-[0_0_120px_rgba(255,255,255,0.1)] relative overflow-hidden group">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 border-8 border-green-600 text-green-600 font-black px-12 py-4 rounded-2xl opacity-10 text-6xl pointer-events-none">CLEARED</div>
                                        <div className="flex justify-between items-start border-b-2 border-black pb-8">
                                            <div className="text-left space-y-1">
                                                <p className="text-[11px] font-mono uppercase font-black tracking-widest text-zinc-400 leading-none mb-2">ACCESS_DOSSIER_V2.6</p>
                                                <h4 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">{selectedUser.nome}</h4>
                                                <p className="text-[12px] font-mono text-zinc-500 font-bold uppercase tracking-[0.4em]">UNIT_ALPHA_{selectedUser.id.toString().padStart(3, '0')}</p>
                                            </div>
                                            <div className="bg-green-600 text-white px-5 py-2 rounded-xl">
                                                <span className="text-[10px] font-black italic tracking-[0.2em]">OPERACIONAL</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-center">
                                            <div className="w-56 h-56 rounded-3xl overflow-hidden grayscale contrast-150 border-8 border-black">
                                                <img src={getImageUrl(selectedUser.nome)} alt="Access Grant" className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-xs font-mono font-black uppercase tracking-[0.4em] text-zinc-400">AUTHORIZED BY: GENERAL EDICARLOS</p>
                                            <p className="text-[10px] font-mono font-bold uppercase text-zinc-500 px-6">Apresente este passe digital no ponto de extração. Protocolo Zero Rastros ativado.</p>
                                        </div>
                                    </div>

                                    <a 
                                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`[ALVO: ${selectedUser.nome.toUpperCase()}] // Missão Aceite! 🫡 Ciente da escolta obrigatória e pronto para a Operação Limpeza (Zero Rastros). O esquadrão pode contar comigo!`)}`}
                                        target="_blank" rel="noopener noreferrer"
                                        className="w-full max-sm bg-green-500 text-white p-6 rounded-[2rem] font-black italic uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-green-600 transition-all shadow-2xl active:scale-95 group"
                                    >
                                        <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        <span>ENVIAR RELATÓRIO</span>
                                    </a>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default TacticalRSVP;
