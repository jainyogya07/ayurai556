"use client";

import { motion } from "framer-motion";
import { Heart, Camera, Activity, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface DiagnoseStartProps {
    onStart: () => void;
}

export default function DiagnoseStart({ onStart }: DiagnoseStartProps) {
    const { t } = useLanguage();
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-display text-cream mb-2"
            >
                {t("diagnose.start_title")}
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white/60 mb-12 tracking-wide font-light"
            >
                {t("demo.pulse_desc")}
            </motion.p>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-12"
            >
                {/* Step 1 */}
                <motion.div variants={item} className="glass-panel p-8 rounded-2xl border border-white/5 w-64 hover:border-gold/30 transition-colors group">
                    <div className="text-right text-xs font-mono text-gold/50 mb-4">01</div>
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-gold/10 transition-colors">
                        <Heart size={32} className="text-gold" />
                    </div>
                    <h3 className="font-display text-xl text-cream mb-1">Nadi Pariksha</h3>
                    <p className="text-xs text-white/50 uppercase tracking-widest">{t("diagnose.step_pulse")}</p>
                </motion.div>

                <ChevronRight className="text-white/20 hidden md:block" />

                {/* Step 2 */}
                <motion.div variants={item} className="glass-panel p-8 rounded-2xl border border-white/5 w-64 hover:border-gold/30 transition-colors group">
                    <div className="text-right text-xs font-mono text-gold/50 mb-4">02</div>
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-gold/10 transition-colors">
                        <Camera size={32} className="text-gold" />
                    </div>
                    <h3 className="font-display text-xl text-cream mb-1">Jihva Pariksha</h3>
                    <p className="text-xs text-white/50 uppercase tracking-widest">{t("diagnose.step_tongue")}</p>
                </motion.div>

                <ChevronRight className="text-white/20 hidden md:block" />

                {/* Step 3 */}
                <motion.div variants={item} className="glass-panel p-8 rounded-2xl border border-white/5 w-64 hover:border-gold/30 transition-colors group">
                    <div className="text-right text-xs font-mono text-gold/50 mb-4">03</div>
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-gold/10 transition-colors">
                        <Activity size={32} className="text-gold" />
                    </div>
                    <h3 className="font-display text-xl text-cream mb-1">Prakriti</h3>
                    <p className="text-xs text-white/50 uppercase tracking-widest">{t("diagnose.step_prakriti")}</p>
                </motion.div>
            </motion.div>

            <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                onClick={onStart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-gold to-amber-600 text-black font-semibold text-lg px-12 py-4 rounded-full shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] transition-all"
            >
                {t("hero.cta")}
            </motion.button>
        </div>
    );
}
