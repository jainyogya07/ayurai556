'use client';

import { useState } from 'react';
import { useDiagnostics } from '@/context/DiagnosticsContext';
import { useRouter } from 'next/navigation';

export default function InquiryPage() {
    const { setQuestionnaire } = useDiagnostics();
    const router = useRouter();

    const [formData, setFormData] = useState({
        sleep: '',
        digestion: '',
        energy: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setQuestionnaire(formData);
        router.push('/report');
    };

    return (
        <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="max-w-2xl mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary mb-2">
                        Prashna (Inquiry)
                    </h1>
                    <p className="text-gray-400">Help us triangulate your bio-data with lifestyle context.</p>
                </div>

                <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl border border-glass-border space-y-6">

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-300">How is your sleep quality?</label>
                        <select
                            className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                            required
                            value={formData.sleep}
                            onChange={(e) => setFormData({ ...formData, sleep: e.target.value })}
                        >
                            <option value="">Select an option</option>
                            <option value="good">Deep & Restful</option>
                            <option value="disturbed">Light & Disturbed</option>
                            <option value="insomnia">Difficulty Falling Asleep</option>
                            <option value="excessive">Heavy & Excessive</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-300">How is your digestion?</label>
                        <select
                            className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                            required
                            value={formData.digestion}
                            onChange={(e) => setFormData({ ...formData, digestion: e.target.value })}
                        >
                            <option value="">Select an option</option>
                            <option value="regular">Regular & Healthy</option>
                            <option value="bloating">Gassy & Bloated (Vata)</option>
                            <option value="acidic">Acidic & Burning (Pitta)</option>
                            <option value="slow">Slow & Heavy (Kapha)</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-300">Energy Levels?</label>
                        <select
                            className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                            required
                            value={formData.energy}
                            onChange={(e) => setFormData({ ...formData, energy: e.target.value })}
                        >
                            <option value="">Select an option</option>
                            <option value="variable">Variable / Bursts of Energy</option>
                            <option value="high">High / Wired</option>
                            <option value="low">Low / Lethargic</option>
                            <option value="steady">Steady / Balanced</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-secondary text-black font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transition-all mt-4"
                    >
                        Generate Diagnostic Report
                    </button>
                </form>
            </div>
        </div>
    );
}
