"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function MirrorFrame({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={cn("relative p-1", className)}>
            {/* Outer Glow */}
            <div className="absolute inset-0 rounded-full blur-xl bg-gold/20 animate-pulse"></div>

            {/* Gold Rim */}
            <div className="relative rounded-full p-[2px] bg-gradient-to-b from-gold via-gold-light to-gold-dark shadow-2xl">
                {/* Inner Glass Bezel */}
                <div className="rounded-full p-1 bg-charcoal/90 backdrop-blur-sm border border-white/5 relative overflow-hidden">
                    {/* Shine on Glass */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-20 rounded-t-full"></div>

                    {/* Content (Camera) */}
                    <div className="rounded-full overflow-hidden relative z-10 aspect-square">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
