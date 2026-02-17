"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fingerprint, Activity } from "lucide-react";

interface PulseSensorProps {
    onComplete: (data: { bpm: number; snr: number; hrv: number; stress: number; pulseType: string }) => void;
}

// ----------------------------------------------------------------------
// BIOMETRIC SIMULATION ENGINE (The "High Tech" Core)
// ----------------------------------------------------------------------
// Models physiological behaviors: Respiratory Sinus Arrhythmia (RSA),
// Vasomotor waves (Mayer waves), and Thermoregulatory fluctuations.
class BiometricEngine {
    private baseBpm: number;
    private hrvIndex: number; // SDNN simulation
    private stressIndex: number; // Baevsky Stress Index simulation

    constructor() {
        // Initialize with a semi-random "Seed" based on time for uniqueness
        const seed = Date.now() % 1000;
        this.baseBpm = 68 + (seed % 15); // Range 68-83 resting
        this.hrvIndex = 40 + (seed % 60); // Range 40-100 ms (Healthy)
        this.stressIndex = 50 + (seed % 100); // Range 50-150 (Normal to High)
    }

    getNextBeatInterval(tick: number): number {
        // Simulate RSA (Breathing effect on HR) - 0.25Hz (4 sec breath cycle)
        // Reduced amplitude for "cleaner" signal
        const rsa = Math.sin(tick * 0.15) * 2;

        // Simulate Mayer Waves (Blood pressure) - 0.1Hz (10 sec cycle)
        const mayer = Math.sin(tick * 0.05) * 1;

        // Noise (Natural jitter) - SIGNIFICANTLY REDUCED for "High Confidence"
        const jitter = (Math.random() - 0.5) * 0.5;

        return this.baseBpm + rsa + mayer + jitter;
    }

    getAyurvedicPulse(bpm: number, hrv: number): string {
        // Map physiological metrics to specific pathologies based on Ayurvedic theory
        if (hrv > 80 && bpm < 65) return "Kapha (Slow & Steady)";
        if (hrv > 60 && bpm < 75) return "Balanced Tridosha";

        // Vata Imbalances
        if (hrv < 30) return "Vata: High Stress / Anxiety";
        if (bpm > 90 && hrv < 40) return "Vata: Irregular Rhythm";

        // Pitta Imbalances
        if (bpm > 85) return "Pitta: High Heat / Inflammation";
        if (hrv < 50 && bpm > 75) return "Pitta: Aggravation";

        // Kapha Imbalances
        if (bpm < 55) return "Kapha: Lethargy / Stagnation";

        return "Vata-Pitta: Mixed State";
    }

    getReport() {
        // Occasionally inject a "Problem" for demo purposes based on random seeds
        const seed = Date.now();
        // 30% chance of a "Perfect" reading, 70% chance of an "Imbalance"
        const isImbalance = seed % 10 > 2;

        let finalBpm = this.baseBpm;
        let finalHrv = this.hrvIndex;

        if (isImbalance) {
            // "Textbook" Cases for Demo
            const condition = seed % 3; // Reduced to 3 clear archetypes
            if (condition === 0) {
                finalBpm += 20; finalHrv = 25; // Textbook Vata (High Stress)
            }
            if (condition === 1) {
                finalBpm += 15; finalHrv = 35; // Textbook Pitta (Inflammation)
            }
            if (condition === 2) {
                finalBpm = 50; finalHrv = 90; // Textbook Kapha (Stagnation)
            }
        }

        return {
            bpm: Math.round(finalBpm),
            hrv: Math.round(finalHrv),
            stress: Math.round(this.stressIndex),
            pulseType: this.getAyurvedicPulse(finalBpm, finalHrv)
        };
    }
}

import { useLanguage } from "@/context/LanguageContext";

export default function PulseSensor({ onComplete }: PulseSensorProps) {
    const { t } = useLanguage();
    const [isHolding, setIsHolding] = useState(false);
    const [progress, setProgress] = useState(0);
    const [liveBpm, setLiveBpm] = useState(0);
    const [engine] = useState(() => new BiometricEngine());
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [wavePoints, setWavePoints] = useState<number[]>([]);

    const startScan = () => {
        setIsHolding(true);
        setProgress(0);
        setLiveBpm(0);
        setWavePoints(new Array(50).fill(50)); // Flatline start

        let p = 0;
        let tick = 0;

        intervalRef.current = setInterval(() => {
            p += 0.8; // ~5 seconds scan time
            tick += 1;

            // "Stronger" Calibration Visuals (0-20% progress)
            if (p < 20) {
                // Simulate "Locking on" phase
                if (Math.random() > 0.5) setWavePoints(prev => [...prev.slice(1), 50 + (Math.random() - 0.5) * 5]);
                setProgress(p);
                return;
            }

            setProgress(Math.min(p, 100));

            // 1. Get Simulated BPM Live
            const currentInstBpm = engine.getNextBeatInterval(tick);
            setLiveBpm(Math.round(currentInstBpm));

            // 2. Generate PPG Waveform Point (Simulated EKG/PPG)
            // Combine Sine waves to make a "dicrotic notch" look
            const waveY = 50 + Math.sin(tick * 0.8) * 20 + Math.sin(tick * 1.6) * 10;
            setWavePoints(prev => [...prev.slice(1), waveY]);

            if (p >= 100) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setIsHolding(false);
                const report = engine.getReport();
                // Pass derived medical data back
                onComplete({
                    bpm: report.bpm,
                    snr: 18.5, // "High Accuracy" simulation result
                    hrv: report.hrv,
                    stress: report.stress,
                    pulseType: report.pulseType
                });
            }
        }, 40);
    };

    const stopScan = () => {
        setIsHolding(false);
        setProgress(0);
        setLiveBpm(0);
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto">
            <div className="relative group">
                {/* Holographic Ripples */}
                {isHolding && (
                    <>
                        <motion.div
                            animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                            transition={{ repeat: Infinity, duration: 1.2, ease: "easeOut" }}
                            className="absolute inset-0 rounded-full bg-cyan-500/20 blur-md"
                        />
                        <motion.div
                            animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
                            transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}
                            className="absolute inset-0 rounded-full bg-blue-500/10"
                        />
                    </>
                )}

                {/* The Sensor Button */}
                <button
                    onMouseDown={startScan}
                    onMouseUp={stopScan}
                    onMouseLeave={stopScan}
                    onTouchStart={startScan}
                    onTouchEnd={stopScan}
                    className={`
                        w-32 h-32 md:w-40 md:h-40 rounded-full border-2 flex items-center justify-center
                        transition-all duration-500 relative z-10 backdrop-blur-xl
                        ${isHolding
                            ? "border-cyan-400 bg-cyan-900/20 shadow-[0_0_60px_rgba(34,211,238,0.3)]"
                            : "border-white/5 bg-white/5 hover:border-white/20 hover:scale-105"
                        }
                    `}
                >
                    <Fingerprint
                        strokeWidth={1}
                        size={64}
                        className={`transition-colors duration-500 w-12 h-12 md:w-16 md:h-16 ${isHolding ? "text-cyan-400" : "text-white/10 group-hover:text-white/30"}`}
                    />

                    {/* Ring Progress */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                        <circle
                            cx="80" cy="80" r="76"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-cyan-400"
                            strokeDasharray="477"
                            strokeDashoffset={477 - (477 * progress) / 100}
                            strokeLinecap="round"
                            style={{ transition: "stroke-dashoffset 0.1s linear" }}
                        />
                    </svg>
                </button>
            </div>

            {/* Live Medical Telemetry Dashboard */}
            <div className="h-32 w-full flex flex-col items-center justify-center relative">
                <AnimatePresence mode="wait">
                    {isHolding ? (
                        <motion.div
                            key="scanning"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full space-y-4"
                        >
                            {/* Live PPG Graph */}
                            <div className="h-16 w-full bg-black/40 rounded-lg border border-white/5 overflow-hidden relative flex items-end px-2 backdrop-blur-sm">
                                <div className="absolute top-2 left-2 text-[8px] md:text-[10px] text-cyan-500/50 uppercase tracking-widest font-mono">PPG Waveform</div>
                                <div className="flex items-end justify-between w-full h-full gap-[1px]">
                                    {wavePoints.map((h, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-full bg-cyan-500/40 rounded-t-sm"
                                            style={{ height: `${h}%` }}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between items-center px-2 md:px-4">
                                <div className="text-left">
                                    <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-white/30">Acquiring</p>
                                    <div className="text-xl md:text-2xl font-mono text-cyan-400">{liveBpm} <span className="text-xs text-cyan-400/50">BPM</span></div>
                                </div>
                                <Activity className="text-cyan-500 animate-pulse" size={24} />
                                <div className="text-right">
                                    <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-white/30">Signal Quality</p>
                                    <div className="text-xs font-mono text-green-400">Optimal (98%)</div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center space-y-2 px-4"
                        >
                            <p className="text-gold/60 text-xs uppercase tracking-[0.2em]">{t("diagnose.start_title")}</p>
                            <p className="text-white/20 text-[10px] font-mono leading-relaxed">{t("demo.pulse_desc")}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
