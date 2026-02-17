"use client";

import { useState } from "react";
import Link from "next/link";
import JewelButton from "@/components/Essence/JewelButton";
import { motion, Variants } from "framer-motion";
import { Sparkles, Activity, Flower2, MessageSquare, PlayCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ConnectABHA from "@/components/Essence/ConnectABHA";
import DemoGuide from "@/components/Essence/DemoGuide";
import { AuroraBackground } from "@/components/ui/AuroraBackground";

export default function Home() {
  const { t, locale } = useLanguage();
  const [showDemo, setShowDemo] = useState(false);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <AuroraBackground>
      <div className="flex flex-col items-center justify-center min-h-[90vh] text-center px-4 relative z-10 overflow-hidden pt-36 pb-40">

        {/* Hero Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto space-y-10 relative z-20"
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="relative group cursor-pointer">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="text-gold opacity-90 relative z-10 group-hover:text-white transition-colors duration-500"
              >
                <Flower2 size={100} strokeWidth={0.5} />
              </motion.div>
              <div className="absolute inset-0 bg-gold/30 rounded-full blur-2xl animate-pulse-glow group-hover:bg-cyan-400/30 transition-colors duration-500" />
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-display text-cream leading-[1.0] tracking-tight relative"
          >
            {t("hero.title")} <br />
            <span className="text-shimmer font-italic">{t("hero.subtitle")}</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-2xl font-light text-white/60 max-w-2xl mx-auto font-body tracking-wide mb-10 leading-relaxed drop-shadow-md"
          >
            {t("hero.description")}
          </motion.p>

          {/* Feature Pills */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 text-xs font-mono tracking-[0.2em] text-gold/80 mb-14">
            {t("hero.features") && typeof t("hero.features") === 'object' && Object.entries(t("hero.features")).map(([key, value], i) => (
              <motion.span
                key={key}
                whileHover={{ scale: 1.05, borderColor: "rgba(212, 175, 55, 0.8)", backgroundColor: "rgba(212, 175, 55, 0.1)" }}
                className="px-6 py-2 border border-gold/20 rounded-full bg-gold/5 uppercase transition-all cursor-default backdrop-blur-sm"
              >
                {String(value)}
              </motion.span>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="pt-4 flex flex-col md:flex-row items-center justify-center gap-6">
            <Link href="/diagnose">
              <JewelButton className="text-xl px-12 py-6 uppercase tracking-widest shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:shadow-[0_0_80px_rgba(212,175,55,0.6)] hover:scale-105 transition-transform duration-300">
                {t("hero.cta")}
              </JewelButton>
            </Link>

            <div className="flex gap-4">
              <Link href="/chat">
                <button className="group px-8 py-4 rounded-full border border-white/10 hover:border-gold/50 bg-white/5 hover:bg-gold/10 transition-all text-white/80 flex items-center gap-3 backdrop-blur-md hover:scale-105">
                  <MessageSquare size={20} className="group-hover:text-gold transition-colors" />
                  <span>{t("hero.chat_cta")}</span>
                </button>
              </Link>
              <button
                onClick={() => setShowDemo(true)}
                className="group px-8 py-4 rounded-full border border-white/10 hover:border-cyan-400/50 bg-white/5 hover:bg-cyan-900/20 transition-all text-white/80 flex items-center gap-3 backdrop-blur-md hover:scale-105"
              >
                <PlayCircle size={20} className="group-hover:text-cyan-400 transition-colors" />
                <span>{t("hero.demo_cta")}</span>
              </button>
            </div>
          </motion.div>

          <DemoGuide isOpen={showDemo} onClose={() => setShowDemo(false)} />
        </motion.div>

        {/* ABHA Integration Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mt-32 max-w-md mx-auto w-full relative z-20"
        >
          <ConnectABHA />
        </motion.div>

        {/* Floating Elements - Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-0 right-0 flex justify-center gap-8 pointer-events-none md:bottom-12"
        >
          {/* Glass Panels for Stats */}
          <div className="glass-premium px-6 py-4 rounded-xl flex items-center gap-4 border border-white/5 animate-float delay-0 backdrop-blur-md">
            <Activity className="text-gold" size={24} />
            <div className="text-left">
              <div className="text-[10px] text-white/40 uppercase tracking-widest">{t("hero.stats.heart_rate")}</div>
              <div className="text-xl font-mono text-white">72 BPM</div>
            </div>
          </div>
          <div className="w-[1px] h-12 bg-white/10 hidden md:block"></div>
          <div className="glass-premium px-6 py-4 rounded-xl flex items-center gap-4 border border-white/5 animate-float delay-1000 backdrop-blur-md">
            <Sparkles className="text-gold" size={24} />
            <div className="text-left">
              <div className="text-[10px] text-white/40 uppercase tracking-widest">{t("hero.stats.diagnosis")}</div>
              <div className="text-xl font-display text-gold drop-shadow-md">{t("hero.stats.balanced")}</div>
            </div>
          </div>
        </motion.div>

      </div>
    </AuroraBackground>
  );
}
