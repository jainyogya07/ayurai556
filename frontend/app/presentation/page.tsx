"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Flower2, Activity, Globe, ShieldCheck, Cpu } from "lucide-react";
import JewelButton from "@/components/Essence/JewelButton";
import { useRouter } from "next/navigation";

const slides = [
    {
        id: 1,
        title: "The Essence of Your Well-being",
        subtitle: "AyurAI: Ancient Wisdom, Distilled by AI.",
        icon: <Flower2 size={120} strokeWidth={0.5} className="text-gold" />,
        content: "Bridging the gap between 5000-year-old Vedic science and modern diagnostics.",
        color: "from-primary to-gold"
    },
    {
        id: 2,
        title: "The Problem",
        subtitle: "Ayurveda lacks Data.",
        icon: <Activity size={100} className="text-red-400" />,
        content: "Traditional diagnosis (Nadi, Jivha) is subjective and inaccessible. We need standardized, digital evidence.",
        color: "from-red-900/50 to-black"
    },
    {
        id: 3,
        title: "The Solution",
        subtitle: "Digitizing the Trinity",
        icon: <Cpu size={100} className="text-cyan-400" />,
        content: "1. Nadi (Pulse) via rPPG\n2. Jivha (Tongue) via Computer Vision\n3. Prakriti via Questionnaire",
        color: "from-blue-900/50 to-black"
    },
    {
        id: 4,
        title: "The Ecosystem",
        subtitle: "Beyond the App",
        icon: <ShieldCheck size={100} className="text-green-400" />,
        content: "Integrated with India's National Health Stack (ABHA). Data sovereignty meets holistic health.",
        color: "from-green-900/50 to-black"
    },
    {
        id: 5,
        title: "Accessibility",
        subtitle: "Built for Bharat",
        icon: <Globe size={100} className="text-purple-400" />,
        content: "Multi-lingual support (Hindi, Tamil, Sanskrit) ensuring access for every Indian, from village to city.",
        color: "from-purple-900/50 to-black"
    },
    {
        id: 6,
        title: "AyurAI",
        subtitle: "The Future of Preventative Health",
        icon: <Flower2 size={120} strokeWidth={0.5} className="text-gold animate-spin-slow" />,
        content: "Join us in revolutionizing healthcare.",
        isLast: true,
        color: "from-gold/20 to-black"
    }
];

export default function PresentationPage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const router = useRouter();

    const nextSlide = useCallback(() => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(prev => prev + 1);
        }
    }, [currentSlide]);

    const prevSlide = useCallback(() => {
        if (currentSlide > 0) {
            setCurrentSlide(prev => prev - 1);
        }
    }, [currentSlide]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" || e.key === "Space") nextSlide();
            if (e.key === "ArrowLeft") prevSlide();
            if (e.key === "Escape") router.push("/");
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [nextSlide, prevSlide, router]);

    return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-black">
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].color} opacity-20 transition-colors duration-1000`} />

            {/* Slide Content */}
            <div className="relative z-10 max-w-5xl w-full px-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5, ease: "anticipate" }}
                        className="flex flex-col items-center text-center space-y-12"
                    >
                        <motion.div
                            initial={{ scale: 0.8, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {slides[currentSlide].icon}
                        </motion.div>

                        <div className="space-y-6">
                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-6xl md:text-8xl font-display text-cream leading-tight"
                            >
                                {slides[currentSlide].title}
                            </motion.h1>

                            <motion.h2
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-2xl md:text-4xl text-gold italic font-light"
                            >
                                {slides[currentSlide].subtitle}
                            </motion.h2>
                        </div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl max-w-3xl"
                        >
                            <p className="text-xl md:text-2xl text-white/80 font-body whitespace-pre-line leading-relaxed">
                                {slides[currentSlide].content}
                            </p>
                        </motion.div>

                        {slides[currentSlide].isLast && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                <JewelButton onClick={() => router.push('/')} className="!px-12 !py-4 text-xl">
                                    Start Demo
                                </JewelButton>
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-between px-12 text-white/30 uppercase tracking-widest text-xs">
                <div>AyurAI Presentation</div>
                <div className="flex gap-4">
                    <button onClick={prevSlide} disabled={currentSlide === 0} className="hover:text-gold disabled:opacity-20"><ChevronLeft /></button>
                    <span>{currentSlide + 1} / {slides.length}</span>
                    <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className="hover:text-gold disabled:opacity-20"><ChevronRight /></button>
                </div>
                <div>Press Arrow Keys</div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-1 bg-gold transition-all duration-500" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }} />
        </div>
    );
}
