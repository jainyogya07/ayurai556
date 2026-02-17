"use client";

import Link from "next/link";
import JewelButton from "@/components/Essence/JewelButton";
import { motion } from "framer-motion";
import { Flower2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock Login
        router.push("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full glass-panel p-8 md:p-12 rounded-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <Flower2 size={120} />
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-display text-cream">Welcome Back</h1>
                    <p className="text-white/40 mt-2">Enter the sanctuary of your data.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gold/70 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold/50 transition-colors"
                            placeholder="name@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gold/70 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold/50 transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <JewelButton className="w-full justify-center" type="submit">
                        Enter
                    </JewelButton>
                </form>

                <div className="mt-8 text-center text-sm text-white/30">
                    New to AyurAI? <Link href="/register" className="text-gold hover:underline">Begin your journey</Link>
                </div>
            </motion.div>
        </div>
    );
}
