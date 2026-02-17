"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Activity, MessageSquare, Fingerprint, ScanEye, ChevronRight, ChevronLeft } from "lucide-react";
import JewelButton from "./JewelButton";
import { useLanguage } from "@/context/LanguageContext";

interface DemoGuideProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DemoGuide({ isOpen, onClose }: DemoGuideProps) {
    const { t } = useLanguage();
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            title: t("demo.pulse_title"),
            description: t("demo.pulse_desc"),
            icon: <Activity size={40} className="text-red-400" />,
            color: "from-red-900/40 to-black"
        },
        {
            title: t("demo.tongue_title"),
            description: t("demo.tongue_desc"),
            icon: <ScanEye size={40} className="text-pink-400" />,
            color: "from-pink-900/40 to-black"
        },
        {
            title: t("demo.chat_title"),
            description: t("demo.chat_desc"),
            icon: <MessageSquare size={40} className="text-gold" />,
            color: "from-amber-900/40 to-black"
        },
        {
            title: t("demo.abha_title"),
            description: t("demo.abha_desc"),
            icon: <Fingerprint size={40} className="text-orange-400" />,
            color: "from-orange-900/40 to-black"
        }
    ];

    if (!isOpen) return null;

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onClose();
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full max-w-lg bg-black/90 border border-gold/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.2)]"
            >
                {/* Header */}
                <div className="p-4 flex justify-between items-center border-b border-white/10">
                    <h3 className="text-gold font-display text-lg tracking-wide uppercase">{t("demo.title")}</h3>
                    <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="relative h-80">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className={`absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b ${steps[currentStep].color}`}
                        >
                            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-xl backdrop-blur-sm">
                                {steps[currentStep].icon}
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-3 font-display">{steps[currentStep].title}</h2>
                            <p className="text-white/70 leading-relaxed font-light">{steps[currentStep].description}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer / Controls */}
                <div className="p-6 border-t border-white/10 flex justify-between items-center bg-black/40">
                    <div className="flex gap-2">
                        {steps.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentStep ? 'w-8 bg-gold' : 'w-2 bg-white/20'}`}
                            />
                        ))}
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={handlePrev}
                            disabled={currentStep === 0}
                            className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30 transition-colors"
                        >
                            <ChevronLeft size={20} className="text-white" />
                        </button>
                        <JewelButton onClick={handleNext} className="gap-2 px-6">
                            {currentStep === steps.length - 1 ? t("demo.start") : t("demo.next")}
                            {currentStep !== steps.length - 1 && <ChevronRight size={16} />}
                        </JewelButton>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
