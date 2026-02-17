"use client";

import { motion } from "framer-motion";
import { Settings as SettingsIcon, Bell, Moon, Languages, Shield, Trash2, Smartphone, Type } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import JewelButton from "@/components/Essence/JewelButton";

export default function SettingsPage() {
    const { locale, setLocale, t } = useLanguage();
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(true);
    const [fontSize, setFontSize] = useState("medium");

    const sections = [
        {
            title: "General",
            items: [
                {
                    icon: <Languages size={20} />,
                    label: "Language",
                    control: (
                        <div className="flex gap-2">
                            {['en', 'hi', 'sa'].map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => setLocale(lang as any)}
                                    className={`px-3 py-1 rounded-md text-xs uppercase transition-colors border ${locale === lang ? 'bg-gold text-black border-gold' : 'bg-white/5 text-white/50 border-white/10'}`}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                    )
                },
                {
                    icon: <Type size={20} />,
                    label: "Text Size",
                    control: (
                        <div className="flex gap-2 bg-white/5 rounded-lg p-1">
                            <button onClick={() => setFontSize("small")} className={`p-1.5 rounded ${fontSize === 'small' ? 'bg-white/10 text-white' : 'text-white/40'}`}><span className="text-xs">A</span></button>
                            <button onClick={() => setFontSize("medium")} className={`p-1.5 rounded ${fontSize === 'medium' ? 'bg-white/10 text-white' : 'text-white/40'}`}><span className="text-sm">A</span></button>
                            <button onClick={() => setFontSize("large")} className={`p-1.5 rounded ${fontSize === 'large' ? 'bg-white/10 text-white' : 'text-white/40'}`}><span className="text-lg">A</span></button>
                        </div>
                    )
                }
            ]
        },
        {
            title: "Preferences",
            items: [
                {
                    icon: <Bell size={20} />,
                    label: "Notifications",
                    control: (
                        <button
                            onClick={() => setNotifications(!notifications)}
                            className={`w-10 h-5 rounded-full relative transition-colors ${notifications ? 'bg-gold' : 'bg-white/20'}`}
                        >
                            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-black shadow-sm transition-transform ${notifications ? 'left-[22px]' : 'left-0.5'}`}></div>
                        </button>
                    )
                },
                {
                    icon: <Moon size={20} />,
                    label: "Dark Mode",
                    control: (
                        <button
                            onClick={() => setDarkMode(!darkMode)} // Dummy toggle for now as app is dark-only
                            className={`w-10 h-5 rounded-full relative transition-colors ${darkMode ? 'bg-gold' : 'bg-white/20'}`}
                        >
                            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-black shadow-sm transition-transform ${darkMode ? 'left-[22px]' : 'left-0.5'}`}></div>
                        </button>
                    )
                }
            ]
        },
        {
            title: "Data & Privacy",
            items: [
                {
                    icon: <Shield size={20} />,
                    label: "ABHA Connection",
                    control: <span className="text-xs text-green-400 border border-green-400/30 px-2 py-1 rounded bg-green-400/10">Connected</span>
                },
                {
                    icon: <Trash2 size={20} className="text-red-400" />,
                    label: "Clear History",
                    control: <JewelButton variant="secondary" className="!py-1 !px-3 text-[10px] border-red-500/30 text-red-400 hover:bg-red-500/10">Reset</JewelButton>
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen pt-24 px-4 pb-20 flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full space-y-8"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-5xl font-display text-cream mb-2">Settings</h1>
                    <p className="text-white/40 text-sm">Personalize your AyurAI experience</p>
                </div>

                <div className="space-y-6">
                    {sections.map((section, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-panel rounded-2xl overflow-hidden border border-white/5"
                        >
                            <div className="bg-white/5 px-6 py-3 border-b border-white/5">
                                <h3 className="text-xs uppercase tracking-widest text-gold/70 font-semibold">{section.title}</h3>
                            </div>
                            <div className="divide-y divide-white/5">
                                {section.items.map((item, i) => (
                                    <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors group">
                                        <div className="flex items-center gap-4 text-white/80 group-hover:text-gold transition-colors">
                                            <div className="p-2 rounded-lg bg-white/5 text-white/60 group-hover:text-gold">
                                                {item.icon}
                                            </div>
                                            <span className="font-medium">{item.label}</span>
                                        </div>
                                        <div>
                                            {item.control}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center pt-8 text-white/20 text-xs">
                    <p>AyurAI v1.2.0 (Premium)</p>
                    <p>Device ID: A7X-992-K</p>
                </div>

            </motion.div>
        </div>
    );
}
