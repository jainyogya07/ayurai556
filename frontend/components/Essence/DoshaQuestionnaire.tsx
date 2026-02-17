"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import JewelButton from "./JewelButton";

interface DoshaQuestionnaireProps {
    onComplete: (data: any) => void;
}

export default function DoshaQuestionnaire({ onComplete }: DoshaQuestionnaireProps) {
    const [answers, setAnswers] = useState<Record<number, string>>({});

    const questions = [
        {
            id: 1,
            question: "How would you describe your body frame?",
            options: ["Thin / Light / Wiry", "Medium / Moderate", "Heavy / Solid / Large"]
        },
        {
            id: 2,
            question: "What is your typical energy level?",
            options: ["Variable / Bursts", "Moderate / Steady", "High Endurance / Slow to start"]
        },
        {
            id: 3,
            question: "How do you respond to stress?",
            options: ["Anxious / Worried", "Irritable / Angry", "Calm / Withdrawn"]
        }
    ];

    const handleAnswer = (id: number, option: string) => {
        setAnswers(prev => ({ ...prev, [id]: option }));
    };

    const isComplete = questions.every(q => answers[q.id]);

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-display text-cream mb-2">Prakriti Assessment</h2>
                <div className="w-24 h-1 bg-gold/30 mx-auto rounded-full" />
            </div>

            <div className="space-y-8">
                {questions.map((q, idx) => (
                    <motion.div
                        key={q.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-panel p-6 rounded-xl border border-white/5"
                    >
                        <h3 className="text-lg text-cream font-medium mb-4">
                            <span className="text-gold mr-2 font-mono">0{q.id}.</span>
                            {q.question}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {q.options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleAnswer(q.id, option)}
                                    className={`
                                        relative px-4 py-3 rounded-lg text-sm text-left transition-all duration-300
                                        border
                                        ${answers[q.id] === option
                                            ? 'bg-gold/20 border-gold text-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                                            : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-gold/30'
                                        }
                                    `}
                                >
                                    {option}
                                    {answers[q.id] === option && (
                                        <div className="absolute top-2 right-2 text-gold">
                                            <Check size={14} />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-12 flex justify-center">
                <JewelButton
                    onClick={() => isComplete && onComplete(answers)}
                    disabled={!isComplete}
                    className="w-full md:w-auto"
                >
                    Complete Diagnosis
                </JewelButton>
            </div>
        </div>
    );
}
