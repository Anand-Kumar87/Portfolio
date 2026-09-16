'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const statusMessages = [
    { threshold: 0, text: 'INITIALIZING SYSTEM MATRIX...' },
    { threshold: 25, text: 'SYNCING NEURAL ASSETS & SHADERS...' },
    { threshold: 55, text: 'COMPILING 3D VIEWPORTS & EFFECTS...' },
    { threshold: 80, text: 'OPTIMIZING INTERACTIVE CORE...' },
    { threshold: 98, text: 'WELCOME TO ANAND KUMAR // PORTFOLIO' },
  ];

  const currentStatus =
    [...statusMessages].reverse().find((s) => progress >= s.threshold)?.text ||
    'SYSTEM LOADING...';

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 550);
          return 100;
        }
        const step = prev < 50 ? Math.random() * 12 + 6 : Math.random() * 16 + 8;
        return Math.min(100, Math.round(prev + step));
      });
    }, 90);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden select-none"
        >
          {/* Cyber Ambient 3D Grid Floor & Ceiling Glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/15 via-purple-600/20 to-pink-500/15 rounded-full blur-3xl opacity-70 animate-pulse" />
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px), radial-gradient(rgba(6, 182, 212, 0.25) 1px, transparent 1px)`,
                backgroundSize: '36px 36px',
                backgroundPosition: '0 0, 18px 18px',
              }}
            />
          </div>

          {/* Corner HUD Indicators */}
          <div className="absolute top-6 left-6 flex items-center gap-2 font-mono text-xs text-cyan-400/80 tracking-widest">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
            <span>SYS.STATUS // ACTIVE</span>
          </div>

          <div className="absolute top-6 right-6 font-mono text-xs text-purple-400/80 tracking-widest">
            <span>CORE.V2 // 2026</span>
          </div>

          <div className="absolute bottom-6 left-6 font-mono text-xs text-slate-500 hidden sm:block">
            <span>LATITUDE 28.6139° N // 77.2090° E</span>
          </div>

          <div className="absolute bottom-6 right-6 font-mono text-xs text-slate-500 hidden sm:block">
            <span>ENG // ANAND KUMAR</span>
          </div>

          {/* Center 3D Gyroscope & Monogram */}
          <div className="relative z-10 flex flex-col items-center">
            <div
              className="relative w-44 h-44 flex items-center justify-center mb-8"
              style={{ perspective: 1000 }}
            >
              {/* 3D Ring 1 - Cyan Horizontal Tilt */}
              <motion.div
                animate={{ rotateZ: 360, rotateX: [65, 55, 65] }}
                transition={{
                  rotateZ: { duration: 6, repeat: Infinity, ease: 'linear' },
                  rotateX: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute inset-0 rounded-full border-2 border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_12px_#22d3ee]" />
              </motion.div>

              {/* 3D Ring 2 - Purple Vertical Tilt */}
              <motion.div
                animate={{ rotateZ: -360, rotateY: [65, 75, 65] }}
                transition={{
                  rotateZ: { duration: 8, repeat: Infinity, ease: 'linear' },
                  rotateY: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute inset-2 rounded-full border-2 border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-purple-300 rounded-full shadow-[0_0_12px_#c084fc]" />
              </motion.div>

              {/* 3D Ring 3 - Pink Angled Counter-Spin */}
              <motion.div
                animate={{ rotateZ: 360, rotateX: 45, rotateY: 45 }}
                transition={{
                  rotateZ: { duration: 10, repeat: Infinity, ease: 'linear' },
                }}
                className="absolute inset-5 rounded-full border border-pink-400/30 border-dashed"
                style={{ transformStyle: 'preserve-3d' }}
              />

              {/* Core Glowing Monogram Orb */}
              <motion.div
                animate={{
                  scale: [1, 1.06, 1],
                  boxShadow: [
                    '0 0 25px rgba(139, 92, 246, 0.5)',
                    '0 0 45px rgba(6, 182, 212, 0.7)',
                    '0 0 25px rgba(139, 92, 246, 0.5)',
                  ],
                }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-fuchsia-600 flex items-center justify-center p-[2px] shadow-2xl relative z-10"
              >
                <div className="w-full h-full bg-slate-950/80 backdrop-blur-md rounded-2xl flex items-center justify-center">
                  <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-cyan-300 via-white to-pink-300 bg-clip-text text-transparent">
                    AK
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Title / Name */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-extrabold tracking-wider bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-400 bg-clip-text text-transparent mb-2"
            >
              ANAND KUMAR
            </motion.h2>

            {/* Status Stream */}
            <p className="font-mono text-xs text-cyan-300/80 tracking-wider mb-6 h-5 flex items-center">
              <span className="mr-2 text-pink-400 animate-pulse">▶</span>
              {currentStatus}
            </p>

            {/* Futuristic Segmented Progress Bar */}
            <div className="w-72 sm:w-80 h-2.5 bg-slate-900/90 rounded-full p-0.5 border border-cyan-500/30 relative overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.2)] mb-3">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-pink-500 relative"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white shadow-[0_0_10px_#ffffff] rounded-full" />
              </motion.div>
            </div>

            {/* Percentage HUD */}
            <div className="font-mono text-xs font-semibold text-slate-400 tracking-widest">
              [ <span className="text-cyan-400 font-bold">{progress}%</span> COMPLETE ]
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
