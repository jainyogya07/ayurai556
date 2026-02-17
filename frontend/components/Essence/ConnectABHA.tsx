"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShieldCheck, Loader2, Fingerprint } from "lucide-react";
import JewelButton from "./JewelButton";
import { useLanguage } from "@/context/LanguageContext";

export default function ConnectABHA() {
    const { t } = useLanguage();
    const [status, setStatus] = useState<"idle" | "connecting" | "connected">("idle");
    const [abhaId, setAbhaId] = useState("");

    const handleConnect = () => {
        if (!abhaId) return;
        setStatus("connecting");
        // Simulate API call and Data Sync
        setTimeout(() => {
            setStatus("connected");
        }, 3000);
    };

    return (
        <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Fingerprint size={100} className="text-orange-500" />
            </div>

            <div className="relative z-10">
                <h3 className="text-lg font-display text-cream mb-1 flex items-center gap-2">
                    <img src="https://abdm.gov.in/assets/images/logo_en.svg" alt="ABDM" className="h-6 opacity-80 invert" />
                    {t("abha.title")}
                </h3>
                <p className="text-white/40 text-xs mb-6 max-w-sm">
                    {t("abha.desc")}
                </p>

                <AnimatePresence mode="wait">
                    {status === "idle" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-4"
                        >
                            <input
                                type="text"
                                placeholder={t("abha.placeholder")}
                                value={abhaId}
                                onChange={(e) => setAbhaId(e.target.value.replace(/\D/g, '').slice(0, 14))}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-cream placeholder:text-white/20 focus:outline-none focus:border-orange-500/50 transition-all font-mono tracking-widest text-center"
                            />
                            <JewelButton
                                onClick={handleConnect}
                                className="w-full bg-gradient-to-r from-orange-600 to-orange-800 border-orange-500/30 text-white"
                                disabled={abhaId.length < 14}
                            >
                                {t("abha.button")}
                            </JewelButton>
                        </motion.div>
                    )}

                    {status === "connecting" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center py-4 space-y-3"
                        >
                            <div className="relative">
                                <Loader2 size={40} className="text-orange-500 animate-spin" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-orange-200 rounded-full animate-pulse"></div>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-medium text-orange-400">{t("abha.syncing")}</p>
                                <p className="text-[10px] text-white/40 font-mono mt-1">Retrieving Medical History from ABDM</p>
                            </div>
                        </motion.div>
                    )}

                    {status === "connected" && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-4"
                        >
                            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <p className="text-green-400 font-medium text-sm">{t("abha.verified")}</p>
                                    <p className="text-white/40 text-[10px] font-mono">ABHA: {abhaId.match(/.{1,4}/g)?.join('-')}</p>
                                </div>
                            </div>

                            {/* Simulated Data Records */}
                            <div className="space-y-2">
                                <p className="text-[10px] uppercase tracking-widest text-white/30 pl-1">{t("abha.records")}</p>
                                <div className="flex gap-2">
                                    <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-white/60">Blood Report (2024)</span>
                                    <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-white/60">Vaccination</span>
                                    <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-white/60">OPD Visit</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
