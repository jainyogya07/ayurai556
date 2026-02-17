'use client';

import { useRef, useEffect, useState } from 'react';

export default function CameraFeed({ onFrame }: { onFrame?: (blob: Blob) => void }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function setupCamera() {
            try {
                const constraints = {
                    video: {
                        facingMode: 'user', // Use front camera
                        width: { ideal: 640 },
                        height: { ideal: 480 },
                        frameRate: { ideal: 30 }
                    }
                };
                const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
                setError("Could not access camera. Please allow camera permissions.");
            }
        }

        setupCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    useEffect(() => {
        if (!onFrame || !stream) return;

        const interval = setInterval(() => {
            if (videoRef.current && canvasRef.current) {
                const ctx = canvasRef.current.getContext('2d');
                if (ctx) {
                    ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                    canvasRef.current.toBlob((blob) => {
                        if (blob) onFrame(blob);
                    }, 'image/jpeg', 0.8);
                }
            }
        }, 100); // Capture every 100ms (10 FPS) for now

        return () => clearInterval(interval);
    }, [stream, onFrame]);

    return (
        <div className="relative w-full max-w-lg mx-auto aspect-video rounded-xl overflow-hidden glass shadow-2xl border border-glass-border">
            {error ? (
                <div className="flex items-center justify-center h-full text-red-400">
                    {error}
                </div>
            ) : (
                <>
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover transform scale-x-[-1]" // Mirror effect
                    />
                    <canvas ref={canvasRef} className="hidden" width={640} height={480} />
                    <div className="absolute inset-0 pointer-events-none border-2 border-primary/30 rounded-xl"></div>
                    {/* Overlay Guide */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-64 border-2 border-dashed border-white/50 rounded-full opacity-50"></div>
                    <p className="absolute bottom-4 left-0 right-0 text-center text-xs text-white/70 bg-black/50 py-1">
                        Align your face within the frame
                    </p>
                </>
            )}
        </div>
    );
}
