'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Feather } from 'lucide-react';
import { sendEmailAction } from './actions';

// --- Componente de Nieve ---
const Snow = () => {
    const [flakes, setFlakes] = useState<Array<{
        id: number;
        left: number;
        duration: number;
        delay: number;
        size: number;
    }>>([]);

    useEffect(() => {
        const newFlakes = Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 10,
            size: Math.random() * 4 + 2,
        }));
        setFlakes(newFlakes);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            {flakes.map((flake) => (
                <div
                    key={flake.id}
                    className="absolute bg-white rounded-full opacity-60"
                    style={{
                        left: `${flake.left}%`,
                        width: `${flake.size}px`,
                        height: `${flake.size}px`,
                        top: -10,
                        animation: `fall ${flake.duration}s linear infinite`,
                        animationDelay: `-${flake.delay}s`,
                    }}
                />
            ))}
        </div>
    );
};

export default function Home() {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    const handleSend = async () => {
        if (!message.trim()) return;
        setIsSending(true);
        setStep(3);

        // Envío real del email
        console.log("--- INICIANDO ENVÍO ---");
        console.log(`Para: alvaro.adlf@gmail.com`);
        console.log(`Asunto: Carta de ${name}`);
        console.log(`Mensaje: ${message}`);

        try {
            const result = await sendEmailAction(name, message);
            if (!result.success) {
                console.error("Fallo en el servidor:", result.error);
            } else {
                console.log("Email enviado exitosamente!");
            }
        } catch (error) {
            console.error("Error de conexión", error);
        }

        // Simulación de los tiempos de la animación (Cierre sobre + Vuelo)
        setTimeout(() => {
            setTimeout(() => {
                setStep(4);
                setIsSending(false);
            }, 4500);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[#2a0a0a] overflow-hidden flex flex-col relative font-['Caveat',_cursive]">
            <div className="absolute inset-0 bg-gradient-radial from-[#4a0e0e] to-[#1a0505]" />
            <Snow />

            <main className="flex-grow relative z-10 w-full h-full flex flex-col">
                <AnimatePresence mode="wait">

                    {/* PASO 1: NOMBRE */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, y: -50 }}
                            className="flex flex-col items-center justify-center min-h-screen p-6"
                        >
                            <div className="w-full max-w-md bg-[#fdfbf7] p-8 rounded-sm shadow-[0_0_50px_rgba(255,215,0,0.2)] border-4 border-[#d4af37] relative text-center transform rotate-1">
                                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#d4af37]" />
                                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#d4af37]" />
                                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#d4af37]" />
                                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#d4af37]" />

                                <motion.div
                                    animate={{ rotate: [0, 5, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 4 }}
                                    className="inline-block"
                                >
                                    <Sparkles className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
                                </motion.div>

                                <h1 className="text-6xl font-bold text-[#8b0000] mb-2 leading-tight">La Carta Mágica</h1>
                                <p className="text-3xl text-[#5c4033] mb-8">¿Quién escribe esta carta hoy?</p>

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Papá, Mamá ..."
                                    className="w-full bg-transparent border-b-2 border-[#d4af37] text-5xl text-center text-[#2a0a0a] placeholder-[#d4af37]/40 outline-none pb-2 mb-8 focus:border-[#8b0000] transition-colors font-bold"
                                    autoFocus
                                />

                                <button
                                    onClick={() => name.trim() && setStep(2)}
                                    disabled={!name.trim()}
                                    className="w-full bg-[#8b0000] text-[#fdfbf7] text-4xl py-3 px-6 rounded-sm hover:bg-[#a52a2a] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg border border-[#5c0e0e]"
                                >
                                    Empezar a Escribir
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* PASO 2: PAPEL A PANTALLA COMPLETA */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex flex-col h-screen w-full max-w-2xl mx-auto bg-[#fdfbf7] shadow-2xl relative"
                        >
                            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")' }} />

                            <div className="pt-8 px-6 pb-2 flex justify-between items-end border-b border-[#d4af37]/30 z-20 bg-[#fdfbf7]/90 backdrop-blur-sm">
                                <div className="text-[#8b0000]">
                                    <span className="text-2xl text-[#5c4033] block">De:</span>
                                    <span className="text-4xl font-bold">{name}</span>
                                </div>
                                <div className="text-right text-[#8b0000]">
                                    <span className="text-2xl text-[#5c4033] block">Para:</span>
                                    <span className="text-4xl font-bold">Papá Noel</span>
                                </div>
                            </div>

                            <div className="flex-grow relative z-10 w-full overflow-hidden flex flex-col">
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Querido Papá Noel, este año me he portado..."
                                    className="w-full h-full bg-transparent px-6 py-0 text-3xl text-[#2a0a0a] outline-none resize-none placeholder-[#d4af37]/50 font-bold"
                                    style={{
                                        backgroundImage: 'linear-gradient(transparent 2.4rem, #d4af3733 2.5rem)',
                                        backgroundSize: '100% 2.5rem',
                                        lineHeight: '2.5rem',
                                        paddingTop: '0.6rem',
                                    }}
                                    autoFocus
                                />
                            </div>

                            <div className="p-4 bg-[#fdfbf7] z-20">
                                <button
                                    onClick={handleSend}
                                    disabled={!message.trim()}
                                    className="w-full bg-[#2e5c38] text-[#fdfbf7] text-4xl py-4 rounded-sm shadow-lg hover:bg-[#3a7246] disabled:opacity-50 transition-all flex items-center justify-center gap-3 border-2 border-[#1a3821]"
                                >
                                    <Feather className="w-8 h-8" />
                                    Doblar y Enviar
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* PASO 3: ANIMACIÓN SOBRE DEFINITIVA */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            className="absolute inset-0 flex items-center justify-center z-50 p-4 pointer-events-none perspective-[1200px]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="relative w-full max-w-[340px] aspect-[1.6]"
                                initial={{ y: 0, scale: 1 }}
                                animate={{
                                    y: -1000,
                                    x: 50,
                                    rotate: 10,
                                    opacity: 1
                                }}
                                transition={{ duration: 1.5, delay: 3.5, ease: "easeIn" }}
                            >

                                {/* 1. FONDO INTERIOR */}
                                <div className="absolute inset-0 bg-[#600000] rounded-sm shadow-2xl z-0" />

                                {/* --- SOLAPA TRASERA FIJA --- */}
                                <motion.div
                                    className="absolute top-0 left-0 right-0 h-0 flex justify-center z-5"
                                    animate={{ opacity: 0 }}
                                    transition={{ delay: 2, duration: 0 }}
                                >
                                    <div className="w-0 h-0 border-l-[170px] border-r-[170px] border-b-[140px] 
                                   border-l-transparent border-r-transparent border-b-[#7a0000] -mt-[140px]"></div>
                                </motion.div>

                                {/* 2. CARTA */}
                                <motion.div
                                    className="absolute left-4 right-4 bg-[#fdfbf7] text-[#2a0a0a] p-4 shadow-sm"
                                    initial={{
                                        top: -220,
                                        bottom: 'auto',
                                        height: 250
                                    }}
                                    animate={{
                                        top: 10,
                                        height: 180,
                                    }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    style={{ zIndex: 10 }}
                                >
                                    <p className="font-bold text-lg border-b border-gray-200 mb-1">De: {name}</p>
                                    <p className="text-base leading-snug opacity-70 line-clamp-4">{message}</p>
                                </motion.div>

                                {/* 3. BOLSILLO FRONTAL */}
                                <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-sm">
                                    <div className="absolute top-0 bottom-0 left-0 w-0 h-0 border-t-[140px] border-r-[120px] border-b-[100px] border-l-[170px] 
                                   border-t-transparent border-r-transparent border-b-[#8b0000] border-l-[#9e0e0e]"></div>
                                    <div className="absolute top-0 bottom-0 right-0 w-0 h-0 border-t-[140px] border-l-[120px] border-b-[100px] border-r-[170px] 
                                   border-t-transparent border-l-transparent border-b-[#8b0000] border-r-[#800000]"></div>
                                </div>

                                {/* 4. SOLAPA SUPERIOR ANIMADA */}
                                <motion.div
                                    className="absolute top-0 left-0 right-0 h-0 z-30 flex justify-center"
                                    initial={{ rotateX: 180, transformOrigin: "top", opacity: 0 }}
                                    animate={{ rotateX: 0, opacity: 1 }}
                                    transition={{
                                        rotateX: { delay: 2, duration: 0.8, ease: "easeOut" },
                                        opacity: { delay: 2, duration: 0 }
                                    }}
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    <div className="w-0 h-0 border-l-[170px] border-r-[170px] border-t-[160px] 
                                   border-l-transparent border-r-transparent border-t-[#a50000] filter drop-shadow-lg relative">

                                        {/* Sello */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 2.7 }}
                                            className="absolute -top-[100px] -left-[28px] w-14 h-14 bg-[#b22222] rounded-full border-4 border-[#700000] flex items-center justify-center shadow-lg"
                                        >
                                            <span className="text-2xl text-[#5c0e0e] font-bold">N</span>
                                        </motion.div>
                                    </div>
                                </motion.div>

                            </motion.div>
                        </motion.div>
                    )}

                    {/* PASO 4: CONFIRMACIÓN FINAL */}
                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center justify-center min-h-screen text-center p-6"
                        >
                            <div className="bg-[#fdfbf7] p-10 rounded-sm shadow-[0_0_60px_rgba(255,215,0,0.3)] border-2 border-[#d4af37] max-w-sm rotate-1 relative">
                                <div className="absolute -inset-1 bg-[#d4af37] opacity-20 blur-lg animate-pulse"></div>

                                {/* Emoji color carne */}
                                <div className="text-7xl mb-6 animate-bounce">🎅🏼</div>
                                <h2 className="text-6xl font-bold text-[#8b0000] mb-4">¡Enviada!</h2>
                                <p className="text-3xl text-[#5c4033] mb-8 leading-snug font-bold">
                                    Tu carta vuela hacia el Polo Norte en este momento.
                                </p>
                                <button
                                    onClick={() => { setStep(1); setName(''); setMessage(''); }}
                                    className="text-2xl text-[#8b0000] underline decoration-2 underline-offset-4 hover:text-[#a52a2a] cursor-pointer relative z-10 font-bold"
                                >
                                    Escribir otra carta
                                </button>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </main>

            {/* Footer - Oculto en paso 2 (carta a pantalla completa) */}
            {step !== 2 && (
                <footer className="fixed bottom-0 left-0 right-0 z-10 py-3 text-center text-[#d4af37] text-lg opacity-90 font-bold tracking-wide drop-shadow-md pointer-events-none">
                    <p>Hecho en Pamplona con mucho cariño ❤️</p>
                </footer>
            )}
        </div>
    );
}
