"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface JewelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
}

export default function JewelButton({ children, className, variant = "primary", ...props }: JewelButtonProps) {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "relative px-8 py-4 font-display text-lg uppercase tracking-widest transition-all duration-300",
                "overflow-hidden group",
                variant === "primary"
                    ? "text-charcoal bg-gold hover:bg-gold-light"
                    : "text-gold border border-gold hover:bg-gold/10",
                // Gem shape effect
                "clip-path-polygon-[10%_0,100%_0,90%_100%,0%_100%]", // Slight parallelogram or cut corner look
                className
            )}
            onClick={props.onClick}
            disabled={props.disabled}
            type={props.type}
            {...props}
        >
            {/* Shine Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />

            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>
        </motion.button>
    );
}
