'use client';

import { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { useDiagnostics } from '@/context/DiagnosticsContext';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import JewelButton from './Essence/JewelButton';
import { ArrowRight } from 'lucide-react';

interface AnalysisResult {
    diagnosis: string[];
    color_metrics: {
        hue: number;
        saturation: number;
        value: number;
    };
    confidence: number;
}

export default function TongueScanner() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
    const [loading, setLoading] = useState(false);

    const { setTongueData } = useDiagnostics();
    const { t } = useLanguage();
    const router = useRouter();

    const [error, setError] = useState<string | null>(null);

    const startCamera = async () => {
        setError(null);
        if (typeof window !== 'undefined' && (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)) {
            setError("Camera access is blocked by the browser. This usually happens when accessing via HTTP (local network) instead of HTTPS or localhost. Please use a secure connection or enable 'Insecure origins treated as secure' in chrome://flags.");
            return;
        }

        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }
            });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
            setCapturedImage(null);
            setAnalysis(null);
        } catch (err) {
            console.error("Error accessing camera:", err);
            setError("Could not access camera. Please check permissions.");
        }
    };

    const captureImage = useCallback(() => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                const width = videoRef.current.videoWidth;
                const height = videoRef.current.videoHeight;
                canvasRef.current.width = width;
                canvasRef.current.height = height;
                context.drawImage(videoRef.current, 0, 0, width, height);

                const imageData = canvasRef.current.toDataURL('image/jpeg');
                setCapturedImage(imageData);

                // Stop stream
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                }
                analyzeImage(imageData);
            }
        }
    }, [stream]);

    const analyzeImage = async (imageData: string) => {
        setLoading(true);
        try {
            // Convert base64 to blob
            const res = await fetch(imageData);
            const blob = await res.blob();
            const formData = new FormData();
            formData.append('file', blob);

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:10000';
            const response = await fetch(`${apiUrl}/api/vision/tongue`, {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            setAnalysis(result);
            if (result) {
                setTongueData(result);
            }
        } catch (error) {
            console.error("Analysis failed", error);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        router.push('/inquiry');
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <div className="relative aspect-[4/5] md:aspect-video bg-black/50 rounded-2xl overflow-hidden glass-panel border-0 shadow-2xl">
                {!capturedImage ? (
                    <>
                        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform scale-x-[-1]" />
                        {!stream && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <JewelButton onClick={startCamera}>
                                    Start Camera
                                </JewelButton>
                            </div>
                        )}
                        {stream && (
                            <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
                                <button
                                    onClick={captureImage}
                                    className="w-20 h-20 rounded-full border-4 border-white/80 bg-white/20 backdrop-blur-md hover:bg-white/40 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95"
                                ></button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="relative w-full h-full">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={capturedImage} alt="Captured Tongue" className="w-full h-full object-contain bg-black" />
                        <button onClick={startCamera} className="absolute top-4 right-4 bg-black/50 text-white/80 px-4 py-2 rounded-full backdrop-blur-md hover:bg-black/70 border border-white/10 text-sm">
                            Retake
                        </button>
                    </div>
                )}
                <canvas ref={canvasRef} className="hidden" />
            </div>

            {error && (
                <div className="glass-panel border-red-500/30 p-4 rounded-xl text-center">
                    <p className="text-red-400 text-sm">{error}</p>
                </div>
            )}

            {loading && (
                <div className="text-center py-8">
                    <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gold/80 animate-pulse uppercase tracking-widest text-sm">Analyzing tissue morphology...</p>
                </div>
            )}

            {analysis && (
                <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <h3 className="text-xl font-display text-gold">{t("diagnose.complete")}</h3>
                        <span className="text-xs font-mono text-white/50">Conf: {(analysis.confidence * 100).toFixed(0)}%</span>
                    </div>

                    <div className="space-y-3">
                        {analysis.diagnosis.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${item.includes("Healthy") ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"}`}></div>
                                <span className="text-lg text-white/90">{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-4 text-center text-xs text-white/60 font-mono bg-white/5 p-3 rounded-lg border border-white/5">
                        <div>
                            <div className="font-bold text-gold/80 mb-1">HUE</div>
                            {analysis.color_metrics?.hue?.toFixed(1) || "--"}
                        </div>
                        <div>
                            <div className="font-bold text-gold/80 mb-1">SAT</div>
                            {analysis.color_metrics?.saturation?.toFixed(1) || "--"}
                        </div>
                        <div>
                            <div className="font-bold text-gold/80 mb-1">VAL</div>
                            {analysis.color_metrics?.value?.toFixed(1) || "--"}
                        </div>
                    </div>

                    <div className="pt-4">
                        <JewelButton onClick={handleNext} className="w-full">
                            {t("diagnose.continue")} <ArrowRight size={16} className="ml-2" />
                        </JewelButton>
                    </div>
                </div>
            )}
        </div>
    );
}
