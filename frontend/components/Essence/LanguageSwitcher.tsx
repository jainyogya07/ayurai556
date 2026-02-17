"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function LanguageSwitcher() {
    const { locale, setLocale } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1 rounded-full border border-gold/20 bg-black/40 text-cream/70 hover:text-gold hover:border-gold/50 transition-all text-xs uppercase tracking-widest"
            >
                <Globe size={14} />
                {locale.toUpperCase()}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full right-0 mt-2 w-48 glass-panel rounded-lg overflow-hidden py-1 z-50 max-h-[60vh] overflow-y-auto custom-scrollbar"
                    >
                        <div className="px-3 py-2 text-[10px] text-white/30 font-bold uppercase tracking-wider border-b border-white/5 bg-black/20">
                            Global
                        </div>
                        {["en", "es", "fr", "de"].map((lang) => (
                            <LanguageOption key={lang} lang={lang} currentLocale={locale} setLocale={(l) => { setLocale(l); setIsOpen(false); }} />
                        ))}

                        <div className="px-3 py-2 text-[10px] text-white/30 font-bold uppercase tracking-wider border-b border-white/5 bg-black/20 mt-1">
                            Indian (Indic)
                        </div>
                        {[
                            { code: "hi", label: "Hindi (हिंदी)" },
                            { code: "sa", label: "Sanskrit (संस्कृतम्)" },
                            { code: "ta", label: "Tamil (தமிழ்)" },
                            { code: "te", label: "Telugu (తెలుగు)" },
                            { code: "bn", label: "Bengali (বাংলা)" },
                            { code: "mr", label: "Marathi (मराठी)" },
                        ].map((lang) => (
                            <LanguageOption
                                key={lang.code}
                                lang={lang.code}
                                label={lang.label}
                                currentLocale={locale}
                                setLocale={(l) => { setLocale(l); setIsOpen(false); }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function LanguageOption({ lang, label, currentLocale, setLocale }: { lang: string, label?: string, currentLocale: string, setLocale: (l: any) => void }) {
    const defaultLabels: Record<string, string> = {
        en: "English",
        es: "Español",
        fr: "Français",
        de: "Deutsch",
        hi: "Hindi",
        sa: "Sanskrit",
        ta: "Tamil",
        te: "Telugu",
        bn: "Bengali",
        mr: "Marathi"
    };

    return (
        <button
            onClick={() => setLocale(lang)}
            className={`w-full text-left px-4 py-3 text-xs uppercase tracking-widest hover:bg-gold/10 transition-colors border-b border-white/5 last:border-0 ${currentLocale === lang ? "text-gold bg-gold/5" : "text-white/60"}`}
        >
            {label || defaultLabels[lang] || lang.toUpperCase()}
        </button>
    );
}
