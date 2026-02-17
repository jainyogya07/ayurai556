"use client";

import Link from 'next/link';
import JewelButton from './Essence/JewelButton';
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "./Essence/LanguageSwitcher";
import DemoGuide from "./Essence/DemoGuide";
import { useState } from "react";
import { Menu, X, PlayCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const { t } = useLanguage();
    const [showDemo, setShowDemo] = useState(false);
    const [isUserMenuOpen, setUserMenuOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center gap-2 group">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary animate-pulse group-hover:animate-none group-hover:shadow-[0_0_15px_rgba(0,242,255,0.5)] transition-all"></div>
                                <span className="font-bold text-xl tracking-tight text-foreground group-hover:text-primary transition-colors">
                                    AyurAI
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-center space-x-6">
                                <NavLink href="/">{t("nav.home")}</NavLink>
                                <NavLink href="/documents">{t("nav.documents") || "Documents"}</NavLink>
                                <NavLink href="/diagnose">{t("nav.diagnose")}</NavLink>
                                <button
                                    onClick={() => setShowDemo(true)}
                                    className="text-gray-300 hover:text-gold hover:bg-gold/10 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 border border-transparent hover:border-gold/30 uppercase tracking-wider"
                                >
                                    {t("nav.demo_guide")}
                                </button>
                                <NavLink href="/history">{t("nav.timeline")}</NavLink>
                                <NavLink href="/settings">Settings</NavLink>
                                <NavLink href="/thankyou">Finish</NavLink>
                                <LanguageSwitcher />
                                <div className="h-4 w-px bg-white/10 mx-2"></div>
                                <NavLink href="/login">{t("nav.enter")}</NavLink>
                                <Link href="/register">
                                    <JewelButton className="px-6 py-2 text-sm !uppercase">{t("nav.join")}</JewelButton>
                                </Link>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setUserMenuOpen(!isUserMenuOpen)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-gold hover:text-white focus:outline-none transition-transform active:scale-95"
                            >
                                <span className="sr-only">Open main menu</span>
                                {isUserMenuOpen ? (
                                    <X size={24} />
                                ) : (
                                    <Menu size={24} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Glass Background Layer */}
                <div className="absolute inset-0 -z-10 glass-panel border-b-0 rounded-b-xl mx-2 mt-2 opacity-90 h-16"></div>
            </nav>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isUserMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setUserMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm md:hidden"
                        />

                        {/* Sidebar */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-64 bg-[#0a0f18] z-50 border-l border-gold/20 shadow-[-10px_0_30px_rgba(0,0,0,0.8)] md:hidden flex flex-col"
                        >
                            <div className="p-6 border-b border-white/10 flex justify-between items-center">
                                <span className="font-display text-xl text-gold">Menu</span>
                                <button onClick={() => setUserMenuOpen(false)} className="text-white/50 hover:text-white">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-4">
                                <MobileNavLink href="/" onClick={() => setUserMenuOpen(false)}>{t("nav.home")}</MobileNavLink>
                                <MobileNavLink href="/documents" onClick={() => setUserMenuOpen(false)}>Documents</MobileNavLink>
                                <MobileNavLink href="/diagnose" onClick={() => setUserMenuOpen(false)}>{t("nav.diagnose")}</MobileNavLink>
                                <MobileNavLink href="/chat" onClick={() => setUserMenuOpen(false)}>{t("hero.chat_cta")}</MobileNavLink>
                                <button
                                    onClick={() => { setShowDemo(true); setUserMenuOpen(false); }}
                                    className="w-full text-left text-gray-300 hover:text-gold hover:bg-gold/10 px-4 py-3 rounded-lg text-base font-medium transition-all uppercase tracking-wider flex items-center gap-2"
                                >
                                    <PlayCircle size={16} /> {t("nav.demo_guide")}
                                </button>
                                <MobileNavLink href="/history" onClick={() => setUserMenuOpen(false)}>{t("nav.timeline")}</MobileNavLink>
                                <MobileNavLink href="/settings" onClick={() => setUserMenuOpen(false)}>Settings</MobileNavLink>
                                <MobileNavLink href="/thankyou" onClick={() => setUserMenuOpen(false)}>Finish</MobileNavLink>

                                <div className="h-px bg-white/10 my-4 mx-2"></div>

                                <div className="px-2">
                                    <LanguageSwitcher />
                                </div>

                                <div className="pt-4 flex flex-col gap-3">
                                    <NavLink href="/login" className="text-center block w-full">{t("nav.enter")}</NavLink>
                                    <Link href="/register" onClick={() => setUserMenuOpen(false)}>
                                        <JewelButton className="w-full text-center !uppercase text-sm">{t("nav.join")}</JewelButton>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <DemoGuide isOpen={showDemo} onClose={() => setShowDemo(false)} />
        </>
    );
}


function NavLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
    return (
        <Link
            href={href}
            className={`text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] ${className || ""}`}
        >
            {children}
        </Link>
    );
}

function MobileNavLink({ href, children, onClick, className }: { href: string; children: React.ReactNode; onClick: () => void; className?: string }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`block w-full text-left text-gray-300 hover:text-gold hover:bg-gold/10 px-4 py-3 rounded-lg text-base font-medium transition-all uppercase tracking-wider border border-transparent ${className || ""}`}
        >
            {children}
        </Link>
    );
}
