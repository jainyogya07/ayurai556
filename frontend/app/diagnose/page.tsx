"use client";

import { useEffect, useRef, useState } from "react";
import { useDiagnostics } from "@/context/DiagnosticsContext";
import TongueScanner from "@/components/TongueScanner";
import PulseSensor from "@/components/Essence/PulseSensor";
import DiagnoseStart from "@/components/Essence/DiagnoseStart";
import DoshaQuestionnaire from "@/components/Essence/DoshaQuestionnaire";
import DiagnosisResults from "@/components/Essence/DiagnosisResults";
import JewelButton from "@/components/Essence/JewelButton";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function DiagnosePage() {
    const { t } = useLanguage();
    const { rppgData, setRppgData, setQuestionnaire, setDiagnosis, questionnaire } = useDiagnostics();
    const [step, setStep] = useState(0); // 0: Start, 1: Pulse, 2: Tongue, 3: Quiz, 4: Results
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    // Mock Diagnosis Logic based on Pulse (for demo)
    const [finalDiagnosis, setFinalDiagnosis] = useState("Balanced");

    // Advance to next step
    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handlePulseComplete = (data: any) => {
        setRppgData({
            bpm: data.bpm,
            signal: [],
            snr: data.snr,
            hrv: data.hrv,
            stress: data.stress,
            pulseType: data.pulseType
        });

        // Determine Diagnosis based on Pulse Type for the final result
        // Use the detailed string directly for more nuance
        if (data.pulseType) {
            setFinalDiagnosis(data.pulseType);
            // Also update the global context so Chat can see it
            // @ts-ignore - Assuming setDiagnosis is available now
            if (setDiagnosis) setDiagnosis(data.pulseType);
        } else {
            setFinalDiagnosis("Balanced Tridosha");
        }
    };

    const handleQuestionnaireComplete = (answers: any) => {
        setQuestionnaire(answers);
        nextStep(); // Go to Results
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative font-body pt-28 md:pt-24">

            {/* Step Indicators (Only show if started) */}
            {/* Step Indicators (Only show if started) */}
            {step > 0 && step < 4 && (
                <div className="absolute top-20 md:top-24 left-0 right-0 flex justify-center gap-4 md:gap-12 text-[10px] md:text-sm uppercase tracking-widest text-white/30 z-10 px-4">
                    <span className={step >= 1 ? "text-gold font-bold border-b border-gold transition-all" : ""}>01. {t("diagnose.step_pulse")}</span>
                    <span className="text-white/10">•</span>
                    <span className={step >= 2 ? "text-gold font-bold border-b border-gold transition-all" : ""}>02. {t("diagnose.step_tongue")}</span>
                    <span className="text-white/10">•</span>
                    <span className={step >= 3 ? "text-gold font-bold border-b border-gold transition-all" : ""}>03. {t("diagnose.step_prakriti")}</span>
                </div>
            )}

            <AnimatePresence mode="wait">

                {/* STEP 0: START */}
                {step === 0 && (
                    <motion.div key="step0" exit={{ opacity: 0, x: -50 }} className="w-full">
                        <DiagnoseStart onStart={nextStep} />
                    </motion.div>
                )}

                {/* STEP 1: PULSE */}
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="flex flex-col items-center gap-8 w-full max-w-2xl"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-8"
                        >
                            <h1 className="text-3xl md:text-5xl font-display text-cream mb-2">{t("diagnose.title")}</h1>
                            <p className="text-white/50 max-w-lg mx-auto text-sm md:text-base">
                                {t("diagnose.subtitle")}
                            </p>
                        </motion.div>

                        <div className="w-full min-h-[350px] flex items-center justify-center">
                            <PulseSensor onComplete={handlePulseComplete} />
                        </div>

                        {/* Show 'Proceed' only if we have data */}
                        {rppgData?.bpm && rppgData.bpm > 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <JewelButton onClick={nextStep} className="mt-8">
                                    {t("diagnose.proceed")} <ArrowRight size={16} />
                                </JewelButton>
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {/* STEP 2: TONGUE */}
                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="flex flex-col items-center gap-8 w-full max-w-3xl"
                    >
                        <h2 className="text-2xl md:text-3xl font-display text-cream text-center">
                            {t("diagnose.tongue_title")}
                        </h2>

                        <div className="w-full max-w-lg">
                            <TongueScanner />
                        </div>

                        <div className="flex gap-4 mt-8">
                            <JewelButton variant="secondary" onClick={prevStep}>
                                <ArrowLeft size={16} /> {t("diagnose.back")}
                            </JewelButton>
                            {/* In real app, we check if tongue data exists. For demo, we allow proceed */}
                            <JewelButton onClick={nextStep}>
                                {t("diagnose.continue")} <ArrowRight size={16} />
                            </JewelButton>
                        </div>
                    </motion.div>
                )}

                {/* STEP 3: QUESTIONNAIRE */}
                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="w-full"
                    >
                        <DoshaQuestionnaire onComplete={handleQuestionnaireComplete} />
                    </motion.div>
                )}

                {/* STEP 4: RESULTS */}
                {step === 4 && (
                    <motion.div
                        key="step4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full"
                    >
                        <DiagnosisResults
                            diagnosis={finalDiagnosis}
                            rppgData={rppgData}
                            questionnaire={questionnaire}
                            onReset={() => setStep(0)}
                        />
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
}
