"use client";

import { useState, useEffect } from "react";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import JewelButton from "./JewelButton";

interface VoiceControlProps {
    onTranscript?: (text: string) => void;
    textToSpeak?: string;
}

export default function VoiceControl({ onTranscript, textToSpeak }: VoiceControlProps) {
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [supported, setSupported] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
            setSupported(true);
        }
    }, []);

    const toggleListening = () => {
        if (!supported) {
            alert("Voice recognition is not supported in this browser. Try Chrome.");
            return;
        }

        if (isListening) {
            setIsListening(false);
            // Stop logic handled by recognition.onend usually, but simple toggle here
            return;
        }

        const SpeechRecognition = (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-IN"; // Indian English context

        recognition.onstart = () => setIsListening(true);

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            if (onTranscript) onTranscript(transcript);
        };

        recognition.onend = () => setIsListening(false);

        recognition.start();
    };

    const toggleSpeaking = () => {
        if (!textToSpeak) return;

        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.lang = "en-IN";
            utterance.rate = 0.9; // Slightly slower, more authoritative
            utterance.pitch = 1.0;

            utterance.onend = () => setIsSpeaking(false);

            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
        }
    };

    return (
        <div className="flex gap-2">
            {onTranscript && (
                <JewelButton
                    onClick={toggleListening}
                    variant={isListening ? "primary" : "secondary"}
                    className={`!p-3 !rounded-full ${isListening ? "animate-pulse border-red-500" : ""}`}
                >
                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                </JewelButton>
            )}

            {textToSpeak && (
                <JewelButton
                    onClick={toggleSpeaking}
                    variant={isSpeaking ? "primary" : "secondary"}
                    className="!p-3 !rounded-full"
                >
                    {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </JewelButton>
            )}
        </div>
    );
}
