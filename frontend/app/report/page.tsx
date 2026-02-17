"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import JewelButton from "@/components/Essence/JewelButton";
import VoiceControl from "@/components/Essence/VoiceControl";
import { Download, Share2, Sparkles, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const mockReports: Record<string, any> = {
    "1": {
        diagnosis: "Pitta Imbalance",
        explanation: "Primary aggravation of Pitta dosha observed. Heat is accumulating in the digestive tract (Pachaka Pitta), leading to acidity and skin sensitivity. The Pulse (Nadi) has a jumping frog-like quality (Manduka Gati).",
        scores: { Vata: 3, Pitta: 8, Kapha: 2 },
        recommendations: [
            "Consume cooling foods like cucumber, mint, and coconut water.",
            "Avoid spicy, sour, and fermented foods.",
            "Practice Sheetali Pranayama (Cooling Breath) twice daily.",
            "Apply sandalwood paste to the forehead for stress relief."
        ],
        reasoning: "High amplitude pulse spikes correlation with metabolic heat markers.",
        reference: "Charaka Samhita, Sutrasthana, Ch. 20 (Pitta Nanatmaja Vyadhi)",
        confidence_score: 94,
        timestamp: "2026-02-11"
    },
    "2": {
        diagnosis: "Vata-Pitta Aggravation",
        explanation: "A dual imbalance where Vata's dryness is fanning Pitta's fire. This manifests as anxiety, insomnia, and burnout. The pulse shows a mix of snake (Sarpa) and frog (Manduka) movements.",
        scores: { Vata: 7, Pitta: 6, Kapha: 1 },
        recommendations: [
            "Daily Abhyanga (self-massage) with warm sesame oil.",
            "Follow a routine (Dinacharya) to ground scattered energy.",
            "Eat warm, cooked, unctuous meals (Soups, Kitchari).",
            "Avoid stimulants like coffee and raw salads."
        ],
        reasoning: "Irregular pulse rhythm combined with high frequency indicates Vata-Pitta mix.",
        reference: "Ashtanga Hridaya, Sutrasthana, Ch. 12",
        confidence_score: 89,
        timestamp: "2026-02-12"
    },
    "3": {
        diagnosis: "Kapha Accumulation",
        explanation: "Excess Kapha is causing stagnation, heaviness, and slow metabolism. The pulse moves slowly and gracefully like a swan (Hamsa Gati). You may feel lethargic and congested.",
        scores: { Vata: 2, Pitta: 1, Kapha: 9 },
        recommendations: [
            "Engage in vigorous exercise daily (Cardio/Running).",
            "Eat light, drying, and warming foods (millet, barley).",
            "Avoid dairy, sweets, and cold drinks.",
            "Perform Udvartana (dry powder massage) to stimulate circulation."
        ],
        reasoning: "Low frequency, broad pulse waveform indicates fluid retention and Kapha.",
        reference: "Sushruta Samhita, Sutrasthana, Ch. 15",
        confidence_score: 92,
        timestamp: "2026-02-13"
    }
};

export default function ReportPage() {
    const params = useSearchParams();
    const reportId = params.get("id");
    const [report, setReport] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Fetch Report Data
    useEffect(() => {
        const fetchReport = async () => {
            if (!reportId) {
                setReport(mockReports["1"]);
                setLoading(false);
                return;
            }

            // SIMULATED API CALL for Demo
            // Instant load for maximum speed
            const data = mockReports[reportId] || mockReports["1"];
            setReport(data);
            setLoading(false);
        };

        fetchReport();
    }, [reportId]);

    if (loading) return <div className="min-h-screen pt-24 text-center text-gold">Consulting the archives...</div>;

    // Safety check if report is null
    if (!report) return <div className="min-h-screen pt-24 text-center text-red-400">Report not found.</div>;

    // Helper text for TTS
    const speakableText = report ? `${report.diagnosis}. ${report.explanation}. Strength of confidence: ${report.confidence_score} percent.` : "";

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl w-full space-y-12"
            >
                {/* Header */}
                <div className="text-center space-y-4">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/30">Diagnostic Profile</p>
                    <h1 className="text-5xl md:text-7xl font-display text-cream">
                        {report.diagnosis.split(" ")[0]} <span className="text-gold italic">{report.diagnosis.split(" ").slice(1).join(" ")}</span>
                    </h1>
                    <p className="text-white/50 font-body max-w-2xl mx-auto leading-relaxed">
                        {report.explanation}
                    </p>
                    <div className="flex justify-center mt-4">
                        <VoiceControl textToSpeak={speakableText} />
                    </div>
                </div>

                {/* Visualizer (Dosha Chart as simple bars for now) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.entries(report.scores || {}).map(([dosha, score]: any) => (
                        <div key={dosha} className="glass-panel p-6 rounded-lg text-center relative overflow-hidden group hover:border-gold/40 transition-colors">
                            <p className="text-xs uppercase tracking-widest mb-2 opacity-50">{dosha}</p>
                            <div className="text-4xl font-display text-gold mb-2">{score}</div>
                            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(score / 10) * 100}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className={`h-full ${dosha === 'Pitta' ? 'bg-red-400' : dosha === 'Vata' ? 'bg-blue-400' : 'bg-green-400'}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recommendations */}
                <div className="glass-panel p-8 md:p-12 rounded-2xl relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-charcoal border border-gold/30 px-6 py-2 rounded-full">
                        <span className="text-gold uppercase tracking-widest text-xs flex items-center gap-2">
                            <Sparkles size={12} /> Perscription
                        </span>
                    </div>

                    <ul className="space-y-6 mt-4">
                        {report.recommendations && report.recommendations.map((rec: string, i: number) => (
                            <li key={i} className="flex gap-4 items-start group">
                                <span className="text-gold/50 font-display text-xl group-hover:text-gold transition-colors">0{i + 1}.</span>
                                <span className="text-lg text-cream/80 font-light">{rec}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Explainable AI / Clinical Reasoning */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-panel p-8 rounded-2xl relative border-l-2 border-l-gold/30">
                        <h3 className="text-gold font-display text-2xl mb-4 flex items-center gap-2">
                            <AlertCircle size={20} /> Clinical Reasoning
                        </h3>
                        <p className="text-white/60 mb-4 italic">"{report.reasoning || "Analysis based on standard Ayurvedic protocols matching pulse rhythm to Dosha characteristics."}"</p>
                        <div className="text-xs text-gold/40 uppercase tracking-widest">
                            Reference: {report.reference || "Charaka Samhita, Sutrasthana"}
                        </div>
                    </div>

                    <div className="glass-panel p-8 rounded-2xl relative flex flex-col justify-center items-center">
                        <h3 className="text-white/50 text-sm uppercase tracking-widest mb-4">AI Confidence</h3>
                        <div className="relative w-32 h-32 flex items-center justify-center">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="5" className="text-white/5" />
                                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="5" className="text-gold"
                                    strokeDasharray="283"
                                    strokeDashoffset={283 - (283 * (report.confidence_score || 88) / 100)}
                                    transform="rotate(-90 50 50)"
                                />
                            </svg>
                            <div className="absolute text-3xl font-display text-cream">
                                {report.confidence_score || 88}%
                            </div>
                        </div>
                        <p className="text-white/30 text-xs mt-4">Based on signal quality & symptom consistency</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-center gap-6 pt-8">
                    <JewelButton onClick={() => window.open(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:10000'}/api/reports/${reportId || 1}/pdf`, '_blank')}>
                        <Download size={18} /> Download
                    </JewelButton>
                    <JewelButton variant="secondary" onClick={() => window.location.href = `/chat?reportId=${reportId || 1}`}>
                        <Sparkles size={18} /> Ask Vaidya
                    </JewelButton>
                </div>
            </motion.div >

        </div >
    );
}
