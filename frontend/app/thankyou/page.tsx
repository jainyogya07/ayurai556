"use client";

import { motion } from "framer-motion";
import { Flower2, Heart, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import JewelButton from "@/components/Essence/JewelButton";
import { useLanguage } from "@/context/LanguageContext";

export default function ThankYouPage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 text-gold"
                >
                    <Flower2 size={600} strokeWidth={0.5} />
                </motion.div>
            </div>

            <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-center mb-4"
                >
                    <div className="p-6 rounded-full bg-gold/10 border border-gold/30 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                        <Heart size={48} className="text-gold fill-gold/20" />
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-6xl md:text-8xl font-display text-cream leading-tight"
                >
                    Thank You
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto"
                >
                    For experiencing the convergence of <br />
                    <span className="text-gold italic">Ancient Wisdom</span> & <span className="text-cyan-400 italic">Modern Intelligence</span>.
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="pt-12 flex flex-col items-center gap-4"
                >
                    <div className="flex gap-4 text-xs tracking-[0.2em] text-gold/40 uppercase">
                        <span>Ayurveda</span>
                        <span>•</span>
                        <span>AI Diagnostics</span>
                        <span>•</span>
                        <span>Digital Health</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="pt-12"
                >
                    <Link href="/">
                        <JewelButton variant="secondary" className="!px-8">
                            Return Home <ArrowRight size={16} />
                        </JewelButton>
                    </Link>
                </motion.div>
            </div>

            <div className="absolute bottom-8 left-0 right-0 text-center">
                <p className="text-white/20 text-xs font-mono">AyurAI © 2024 • Project Demo</p>
            </div>
        </div>
    );
}
