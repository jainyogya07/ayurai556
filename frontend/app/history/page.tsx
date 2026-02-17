"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import JewelButton from "@/components/Essence/JewelButton";
import { ArrowRight, Calendar, Download } from "lucide-react";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";

import { useLanguage } from "@/context/LanguageContext";

export default function HistoryPage() {
    const { t } = useLanguage();
    const [history, setHistory] = useState<any[]>([]);

    useEffect(() => {
        // Mock History Data - Distinct & Realistic
        setHistory([
            {
                id: 1,
                date: "2026-02-11",
                diagnosis: "Pitta Imbalance",
                snippet: "High metabolic heat and acidity detected.",
                details: "Analysis indicates aggravated Pitta dosha manifesting as increased body heat, acid reflux, and irritability. Pulse rhythm is sharp and bounding (Manduka Gati).",
                symptoms: ["Acid Reflux", "Skin Rashes (Redness)", "Excessive Thirst", "Irritability"],
                recommendations: ["Consume cooling foods (Cucumber, Melon)", "Moon bathing for 15 mins", "Avoid spicy/sour foods", "Sheetali Pranayama"]
            },
            {
                id: 2,
                date: "2026-02-12",
                diagnosis: "Vata-Pitta Aggravation",
                snippet: "Elevated stress and irregular sleep patterns.",
                details: "Dual aggravation of Vata and Pitta. Vata is causing scattered thoughts and anxiety, while Pitta is contributing to inflammation. Pulse is irregular and fast (Serpent motion).",
                symptoms: ["Insomnia", "Anxiety/Restlessness", "Dry Skin", "Burning Sensation in Eyes"],
                recommendations: ["Warm oil massage (Abhyanga)", "Meditation before sleep", "Sweet and grounding foods", "Drink warm milk with ghee"]
            },
            {
                id: 3,
                date: "2026-02-13",
                diagnosis: "Kapha Accumulation",
                snippet: "Sluggish metabolism and lethargy observed.",
                details: "Signs of Kapha buildup in the respiratory and digestive tracts. Heaviness in the body and slow digestion. Pulse is slow and steady (Swan motion).",
                symptoms: ["Weight Gain", "Lethargy/Oversleeping", "Congestion", "Slow Digestion"],
                recommendations: ["Vigorous exercise (Cardio)", "Spicy and bitter foods", "Dry brushing", "Wake up before sunrise"]
            },
        ]);
    }, []);

    const generatePDF = (entry: any) => {
        const doc = new jsPDF();

        // Header
        doc.setFontSize(22);
        doc.setTextColor(212, 175, 55); // Gold
        doc.text("AyurAI Health Assessment", 105, 20, { align: "center" });

        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`Report Generated: ${new Date().toLocaleDateString()}`, 105, 28, { align: "center" });

        doc.setLineWidth(0.5);
        doc.setDrawColor(212, 175, 55);
        doc.line(20, 35, 190, 35);

        // Details
        let yPos = 50;

        doc.setFontSize(12);
        doc.setTextColor(50, 50, 50);
        doc.text(`Date: ${entry.date}`, 20, yPos);

        yPos += 15;
        doc.setFontSize(16);
        doc.setTextColor(212, 175, 55);
        doc.text(`Diagnosis: ${entry.diagnosis}`, 20, yPos);

        yPos += 10;
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        const splitDetails = doc.splitTextToSize(entry.details, 170);
        doc.text(splitDetails, 20, yPos);
        yPos += (splitDetails.length * 7) + 10;

        // Symptoms
        if (entry.symptoms) {
            doc.setFontSize(14);
            doc.setTextColor(212, 175, 55);
            doc.text("Observed Symptoms:", 20, yPos);
            yPos += 10;
            doc.setFontSize(11);
            doc.setTextColor(50, 50, 50);
            entry.symptoms.forEach((sym: string) => {
                doc.text(`• ${sym}`, 25, yPos);
                yPos += 7;
            });
            yPos += 10;
        }

        // Recommendations
        if (entry.recommendations) {
            doc.setFontSize(14);
            doc.setTextColor(212, 175, 55);
            doc.text("Personalized Recommendations:", 20, yPos);
            yPos += 10;
            doc.setFontSize(11);
            doc.setTextColor(50, 50, 50);
            entry.recommendations.forEach((rec: string) => {
                doc.text(`- ${rec}`, 25, yPos);
                yPos += 7;
            });
        }

        // Footer
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150);
        doc.text("AI-Generated Report. Consult a certified Vaidya for medical advice.", 105, 280, { align: "center" });

        doc.save(`AyurAI_Report_${entry.date}.pdf`);
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-display text-cream mb-12 text-center">
                {t("history.journey_prefix")} <span className="text-gold italic">{t("history.journey_highlight")}</span>
            </h1>

            <div className="max-w-2xl w-full relative">
                {/* Vertical Line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent"></div>

                <div className="space-y-12">
                    {history.map((entry, i) => (
                        <motion.div
                            key={entry.id}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Date Marker */}
                            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-charcoal border border-gold z-10">
                                <div className="absolute inset-0 bg-gold/50 rounded-full animate-ping"></div>
                            </div>

                            {/* Content Card */}
                            <div className={`w-full md:w-[45%] glass-panel p-6 rounded-xl group hover:border-gold/50 transition-all ${i % 2 !== 0 ? 'md:text-right text-left' : 'text-left'}`}>
                                <p className="text-xs text-gold/60 uppercase tracking-widest flex items-center gap-2 mb-2 justify-start md:justify-start">
                                    <Calendar size={12} /> {entry.date}
                                </p>
                                <h3 className="text-2xl font-display text-cream mb-1">{entry.diagnosis}</h3>
                                <p className="text-white/40 text-sm mb-4">{entry.snippet}</p>

                                <div className={`flex items-center gap-4 ${i % 2 !== 0 ? 'md:justify-end' : 'justify-start'}`}>
                                    <Link href={`/report?id=${entry.id}`}>
                                        <div className="inline-flex items-center gap-2 text-gold text-sm hover:underline cursor-pointer">
                                            {t("history.view_report")} <ArrowRight size={14} />
                                        </div>
                                    </Link>
                                    <button
                                        onClick={() => generatePDF(entry)}
                                        className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm hover:underline"
                                    >
                                        <Download size={14} /> PDF
                                    </button>
                                </div>
                            </div>

                            {/* Spacer */}
                            <div className="hidden md:block w-[45%]"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
