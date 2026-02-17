"use client";

import ChatPanel from "@/components/Essence/ChatPanel";
import { useDiagnostics } from "@/context/DiagnosticsContext";
import { motion } from "framer-motion";

export default function ChatPage() {
    const { rppgData } = useDiagnostics();

    return (
        <div className="min-h-screen pt-24 pb-4 px-4 flex flex-col items-center justify-center">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-4xl h-[85vh] relative"
            >

                {/* Decorative background glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-cyan-500/20 to-purple-500/20 rounded-2xl blur-2xl opacity-30 pointer-events-none" />

                <ChatPanel initialContext={rppgData?.pulseType} />
            </motion.div>

        </div>
    );
}
