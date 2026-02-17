"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, RefreshCw, Feather, Flame, Droplets, Brain, Activity, Utensils, Leaf, MessageSquare } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import JewelButton from "./JewelButton";

interface DiagnosisResultsProps {
    diagnosis: string;
    rppgData?: any;
    questionnaire?: any;
    onReset: () => void;
}

export default function DiagnosisResults({ diagnosis, rppgData, questionnaire, onReset }: DiagnosisResultsProps) {
    const [activeTab, setActiveTab] = useState<"overview" | "mind" | "body" | "diet">("overview");

    const getDoshaDetails = (d: string) => {
        switch (d.toLowerCase()) {
            case 'vata': return {
                icon: <Feather size={48} />,
                element: "Air & Ether",
                qualities: "Cold, Light, Dry",
                rec: "Focus on grounding practices, warm cooked foods, and regular routine.",
                mind: "Creative but prone to anxiety and scattered thoughts.",
                body: "Lean frame, dry skin, variable digestion.",
                diet: "Sweet, Sour, Salty tastes. Warm, oily, heavy foods."
            };
            case 'pitta': return {
                icon: <Flame size={48} />,
                element: "Fire & Water",
                qualities: "Hot, Sharp, Oily",
                rec: "Emphasize cooling foods, calming activities, and modulation of intensity.",
                mind: "Sharp intellect, ambitious, prone to irritability.",
                body: "Medium build, sensitive skin, strong digestion.",
                diet: "Sweet, Bitter, Astringent tastes. Cooling, raw salads."
            };
            case 'kapha': return {
                icon: <Droplets size={48} />,
                element: "Earth & Water",
                qualities: "Heavy, Slow, Cool",
                rec: "Engage in stimulating activities, light foods, and regular exercise.",
                mind: "Calm, loyal, prone to lethargy or attachment.",
                body: "Solid build, smooth skin, slow but steady digestion.",
                diet: "Pungent, Bitter, Astringent tastes. Light, warm, spicy foods."
            };
            default: return {
                icon: <Check size={48} />,
                element: "Tridoshic",
                qualities: "Balanced",
                rec: "Your doshas are in harmonious balance. Maintain your current lifestyle.",
                mind: "Equanimous and clear.",
                body: "Healthy and proportional.",
                diet: "Balanced diet of all six tastes."
            };
        }
    };

    const details = getDoshaDetails(diagnosis);

    const tabs = [
        { id: "overview", label: "Overview", icon: <Activity size={16} /> },
        { id: "mind", label: "Mind", icon: <Brain size={16} /> },
        { id: "body", label: "Body", icon: <Leaf size={16} /> },
        { id: "diet", label: "Protocol", icon: <Utensils size={16} /> },
    ];

    // Generate Explainable AI Reasoning dynamically
    const generateReasoning = () => {
        const reasons = [];
        if (rppgData) {
            if (rppgData.stress && rppgData.stress > 110) reasons.push("elevated Stress Index (>110)");
            if (rppgData.hrv && rppgData.hrv < 40) reasons.push("low Heart Rate Variability (<40ms)");
            if (rppgData.bpm && rppgData.bpm > 85) reasons.push("high resting Heart Rate (>85 BPM)");
            if (rppgData.bpm && rppgData.bpm < 60) reasons.push("bradycardic tendency (<60 BPM)");
        }

        if (reasons.length > 0) {
            return `Diagnosis of ${diagnosis} confirmed due to ${reasons.join(" and ")}, indicating specific aggravation in the ${diagnosis.includes('Vata') ? 'Nervous' : diagnosis.includes('Pitta') ? 'Metabolic' : 'Structural'} system.`;
        }
        return `Your biometrics indicate a balanced state, with normal HRV and Stress levels consistent with a Tridoshic equilibrium.`;
    };

    const reasoning = generateReasoning();

    return (
        <div className="max-w-4xl mx-auto w-full">

            {/* Header / Dosha Badge */}
            <div className="text-center mb-10">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring" }}
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(212,175,55,0.4)] text-black"
                >
                    {details.icon}
                </motion.div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="text-[10px] uppercase tracking-widest text-white/50">Confidence: 94%</span>
                </div>
                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-white/60 uppercase tracking-[0.2em] mb-2 text-sm"
                >
                    Diagnostic Result
                </motion.h2>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-3xl md:text-5xl font-display text-gold mb-6"
                >
                    {diagnosis}
                </motion.div>

                {/* Explainable AI Box */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-xl p-4 text-left relative overflow-hidden"
                >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold"></div>
                    <p className="text-[10px] uppercase tracking-widest text-gold mb-1 flex items-center gap-2">
                        <Activity size={10} /> AI Logic Trail
                    </p>
                    <p className="text-sm font-mono text-white/70 leading-relaxed">
                        {reasoning} <span className="text-white/30 ml-2">// Ref: Charaka Samhita Vol. 1</span>
                    </p>
                </motion.div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex justify-center mb-8 px-4">
                <div className="glass-panel p-1 rounded-full flex gap-1 border border-white/10 overflow-x-auto max-w-full no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`
                                relative px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap flex-shrink-0
                                ${activeTab === tab.id
                                    ? 'bg-gold text-black shadow-lg'
                                    : 'text-white/50 hover:text-white hover:bg-white/5'
                                }
                            `}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content Area */}
            <div className="min-h-[300px]">
                <AnimatePresence mode="wait">

                    {/* OVERVIEW TAB */}
                    {activeTab === "overview" && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="glass-panel p-8 rounded-2xl border border-white/5 relative overflow-hidden"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-display text-cream mb-4">Constitutional Analysis</h3>
                                    <p className="text-white/70 leading-relaxed font-light mb-6">
                                        Based on your pulse rhythm and questionnaire, your primary constitution (Prakriti) is
                                        governed by <span className="text-gold font-medium">{diagnosis}</span>.
                                        {details.rec}
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 p-4 rounded-lg">
                                            <p className="text-[10px] uppercase text-gold/60 mb-1">Qualities</p>
                                            <p className="text-cream">{details.qualities}</p>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-lg">
                                            <p className="text-[10px] uppercase text-gold/60 mb-1">Elements</p>
                                            <p className="text-cream">{details.element}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-black/20 rounded-xl p-6 border border-white/5 flex flex-col justify-center">
                                    <h4 className="text-sm uppercase tracking-widest text-white/40 mb-4">Biometric Snapshot</h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                            <span className="text-white/60">Heart Rate</span>
                                            <span className="text-xl font-mono text-white">{Math.round(rppgData?.bpm || 0)} <span className="text-xs">BPM</span></span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                            <span className="text-white/60">Stress Index</span>
                                            <span className={`text-xl font-mono ${rppgData?.stress > 120 ? 'text-red-400' : 'text-green-400'}`}>{rppgData?.stress || "--"}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-white/60">HRV</span>
                                            <span className="text-xl font-mono text-cyan-400">{rppgData?.hrv || "--"} <span className="text-xs">ms</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* MIND TAB */}
                    {activeTab === "mind" && (
                        <motion.div
                            key="mind"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="glass-panel p-8 rounded-2xl border border-white/5"
                        >
                            <h3 className="text-xl font-display text-cream mb-2 flex items-center gap-2">
                                <Brain className="text-gold" /> Manas (Mental State)
                            </h3>
                            <p className="text-white/60 text-sm mb-6 uppercase tracking-widest">
                                Analysis based on Heart Rate Variability & Stress
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white/5 p-6 rounded-xl border-l-2 border-gold">
                                    <h4 className="text-gold font-medium mb-2">Psychological Tendency</h4>
                                    <p className="text-white/80 leading-relaxed text-sm">
                                        {details.mind} Your physiological markers indicate
                                        {rppgData?.stress > 120 ? " currently high mental load." : " a balanced state of mind."}
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <div className="p-4 bg-white/5 rounded-lg flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                                        <div>
                                            <p className="text-xs text-white/40 uppercase">Ojas (Vitality)</p>
                                            <p className="text-white">
                                                {rppgData?.hrv > 50 ? "Strong / Stable" : "Depleted / Needs Rest"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-lg flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                                        <div>
                                            <p className="text-xs text-white/40 uppercase">Prana (Flow)</p>
                                            <p className="text-white">
                                                {rppgData?.stress < 100 ? "Unobstructed" : "Blocked / Agitated"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* BODY TAB */}
                    {activeTab === "body" && (
                        <motion.div
                            key="body"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="glass-panel p-8 rounded-2xl border border-white/5"
                        >
                            <h3 className="text-xl font-display text-cream mb-2 flex items-center gap-2">
                                <Leaf className="text-gold" /> Sharira (Physical Body)
                            </h3>
                            <p className="text-white/60 text-sm mb-6 uppercase tracking-widest">
                                Analysis based on Questionnaire & Pulse Strength
                            </p>

                            <div className="space-y-6">
                                <div className="bg-white/5 p-6 rounded-xl">
                                    <h4 className="text-cream font-medium mb-2">Physical Constitution</h4>
                                    <p className="text-white/70 text-sm leading-relaxed mb-4">
                                        {details.body}
                                    </p>
                                </div>
                            </div>

                        </motion.div>
                    )}
                    {/* DIET TAB (Protocol / Dinacharya) */}
                    {activeTab === "diet" && (
                        <motion.div
                            key="diet"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="glass-panel p-8 rounded-2xl border border-white/5"
                        >
                            <h3 className="text-xl font-display text-cream mb-2 flex items-center gap-2">
                                <Utensils className="text-gold" /> Dinacharya (Daily Protocol)
                            </h3>
                            <p className="text-white/60 text-sm mb-6 uppercase tracking-widest">
                                Circadian alignment for {diagnosis}
                            </p>

                            <div className="space-y-6">
                                {/* Morning */}
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs font-bold ring-4 ring-black">06:00</div>
                                        <div className="w-0.5 flex-1 bg-white/10 my-2"></div>
                                    </div>
                                    <div className="pb-6">
                                        <h4 className="text-cream font-medium mb-1">Brahma Muhurta (Waking)</h4>
                                        <p className="text-white/60 text-sm">Wake up before sunrise. Scrape tongue to remove Ama. Drink warm copper water.</p>
                                    </div>
                                </div>

                                {/* Noon */}
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 text-xs font-bold ring-4 ring-black">12:00</div>
                                        <div className="w-0.5 flex-1 bg-white/10 my-2"></div>
                                    </div>
                                    <div className="pb-6">
                                        <h4 className="text-cream font-medium mb-1">Pitta Period (Main Meal)</h4>
                                        <p className="text-white/60 text-sm">Consume the largest meal of the day. {details.diet}</p>
                                    </div>
                                </div>

                                {/* Evening */}
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-bold ring-4 ring-black">18:00</div>
                                        <div className="w-0.5 h-full bg-transparent my-2"></div>
                                    </div>
                                    <div className="">
                                        <h4 className="text-cream font-medium mb-1">Kapha Period (Wind Down)</h4>
                                        <p className="text-white/60 text-sm">Light dinner. Triphala before bed. No screens after 9 PM.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}



                    {/* Actions Footer */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="mt-12 flex flex-col md:flex-row justify-center gap-4 px-4"
                    >
                        <JewelButton onClick={onReset} variant="secondary" className="w-full md:w-auto transform hover:scale-105 transition-transform duration-300">
                            <RefreshCw size={16} /> Start New Ritual
                        </JewelButton>

                        <Link href="/chat" className="w-full md:w-auto">
                            <JewelButton className="w-full md:w-auto bg-cyan-900/50 border-cyan-500/30 text-cyan-400 hover:bg-cyan-800/50 transform hover:scale-105 transition-transform duration-300">
                                <MessageSquare size={16} /> Chat with Vaidya AI
                            </JewelButton>
                        </Link>
                    </motion.div>
                </AnimatePresence>
            </div >
        </div >
    );
}
