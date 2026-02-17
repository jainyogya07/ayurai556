"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, User, Mic, Minimize2, Maximize2, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import JewelButton from "./JewelButton";
import VoiceControl from "./VoiceControl";
import { useLanguage } from "@/context/LanguageContext";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

interface ChatPanelProps {
    initialContext?: string;
    embedded?: boolean; // If true, simpler layout for embedding
}

export default function ChatPanel({ initialContext, embedded = false }: ChatPanelProps) {
    const { locale } = useLanguage();
    const [messages, setMessages] = useState<Message[]>([]);

    const chatTranslations: any = {
        en: {
            greeting: "Namaste. I am Vaidya AI. I have analyzed your biometric profile. How may I guide your healing journey today?",
            analysis: "Namaste. I see your analysis indicates: **{context}**. How are you feeling about this result?",
            responses: [
                "Based on your high Pitta, I recommend cooling foods like cucumber and avoiding spicy chilies.",
                "Your stress index suggests a need for Ashwagandha and evening meditation.",
                "The irregularity in your pulse (Vata) can be soothed with warm oil massage (Abhyanga).",
                "I see good Ojas (vitality) in your heart rate variability. Keep up your routine."
            ]
        },
        hi: {
            greeting: "नमस्ते। मैं वैद्य एआई हूँ। मैंने आपकी बायोमेट्रिक प्रोफ़ाइल का विश्लेषण किया है। आज मैं आपकी उपचार यात्रा में कैसे मार्गदर्शन कर सकता हूँ?",
            analysis: "नमस्ते। आपका विश्लेषण दर्शाता है: **{context}**। आप इस परिणाम के बारे में कैसा महसूस कर रहे हैं?",
            responses: [
                "आपके उच्च पित्त को देखते हुए, मैं खीरे जैसे ठंडे खाद्य पदार्थों की सलाह देता हूँ।",
                "आपका तनाव सूचकांक अश्वगंधा और शाम के ध्यान की आवश्यकता का सुझाव देता है।",
                "आपकी नाड़ी (वात) में अनियमितता को गर्म तेल की मालिश (अभ्यंग) से शांत किया जा सकता है।",
                "मैं आपकी हृदय गति परिवर्तनशीलता में अच्छा ओजस (जीवन शक्ति) देखता हूँ।"
            ]
        },
        sa: {
            greeting: "नमस्ते। अहं वैद्य-एआई अस्मि। मया तव बायोमेट्रिक-प्रोफ़ाइल-विश्लेषणं कृतम्। अद्य तव चिकित्सामार्गे कथं साहाय्यं करवानि?",
            analysis: "नमस्ते। तव विश्लेषणं सूचयति: **{context}**। एतत् परिणामं दृष्ट्वा भवान् कीदृशं अनुभवति?",
            responses: [
                "तव पित्तस्य आधिक्यं दृष्ट्वा, अहं शीतलक-भोजनं (यथा कर्कटी) खादितुं परामर्शं ददामि।",
                "तव मानसिक-तनावः अश्वगंधायाः तथा सायंकालीन-ध्यानस्य आवश्यकतां सूचयति।",
                "तव वात-नाड्याः अस्थिरता उष्ण-तैल-मर्दनेन (अभ्यंग) शमयितुं शक्यते।",
                "अहं तव हृदये उत्तमं ओजः पश्यामि। एतां दिनचर्यां अनुवर्तस्व।"
            ]
        },
        ta: {
            greeting: "வணக்கம். நான் வைத்தியா AI. உங்கள் பயோமெட்ரிக் சுயவிவரத்தை நான் பகுப்பாய்வு செய்துள்ளேன். இன்று உங்கள் குணப்படுத்தும் பயணத்திற்கு நான் எவ்வாறு வழிகாட்ட முடியும்?",
            analysis: "வணக்கம். உங்கள் பகுப்பாய்வு குறிப்பிடுவது: **{context}**. இந்த முடிவைப் பற்றி நீங்கள் எப்படி உணருகிறீர்கள்?",
            responses: [
                "உங்கள் அதிக பித்தத்தின் அடிப்படையில், வெள்ளரி போன்ற குளிர்ச்சியான உணவுகளை உண்ண பரிந்துரைக்கிறேன்.",
                "உங்கள் மன அழுத்த குறியீடு அஸ்வகந்தா மற்றும் மாலை தியானத்தின் தேவையை அறிவுறுத்துகிறது.",
                "உங்கள் நாடித்துடிப்பில் (வாத) ஒழுங்கற்ற தன்மையை வெதுவெதுப்பான எண்ணெய் மசாஜ் (அப்யங்கம்) மூலம் ஆற்றலாம்.",
                "உங்கள் இதயத் துடிப்பு மாறுபாட்டில் நல்ல ஓஜஸ் (உயிர் சக்தி) இருப்பதை நான் காண்கிறேன்."
            ]
        },
        te: {
            greeting: "నమస్కారం. నేను వైద్య AIని. నేను మీ బయోమెట్రిక్ ప్రొఫైల్‌ను విశ్లేషించాను. ఈ రోజు మీ హీలింగ్ ప్రయాణంలో నేను మీకు ఎలా మార్గనిర్దేశం చేయగలను?",
            analysis: "నమస్కారం. మీ విశ్లేషణ సూచిస్తుంది: **{context}**. ఈ ఫలితం గురించి మీరు ఎలా భావిస్తున్నారు?",
            responses: [
                "మీ అధిక పిత్త దోషం ఆధారంగా, దోసకాయ వంటి చలువ చేసే ఆహారాలను తినమని నేను సిఫార్సు చేస్తున్నాను.",
                "మీ ఒత్తిడి స్థాయి అశ్వగంధ మరియు సాయంత్రం ధ్యానం అవసరాన్ని సూచిస్తుంది.",
                "మీ నాడి (వాత) లోని అవకతవకలను వెచ్చని నూనె మసాజ్ (అభ్యంగ) తో శాంతపరచవచ్చు.",
                "మీ హృదయ స్పందనలో మంచి ఓజస్సు (జీవశక్తి)ని నేను చూస్తున్నాను."
            ]
        },
        bn: {
            greeting: "নমস্কার। আমি বৈদ্য এআই। আমি আপনার বায়োমেট্রিক প্রোফাইল বিশ্লেষণ করেছি। আজ আপনার নিরাময় যাত্রায় আমি কীভাবে নির্দেশনা দিতে পারি?",
            analysis: "নমস্কার। আপনার বিশ্লেষণ নির্দেশ করছে: **{context}**। এই ফলাফল সম্পর্কে আপনি কেমন অনুভব করছেন?",
            responses: [
                "আপনার উচ্চ পিত্তের উপর ভিত্তি করে, আমি শসার মতো শীতল খাবার খাওয়ার পরামর্শ দিই।",
                "আপনার মানসিক চাপ অশ্বগন্ধা এবং সন্ধ্যায় ধ্যানের প্রয়োজনীয়তা নির্দেশ করে।",
                "আপনার নাড়ির (বাত) অনিয়ম গরম তেলের মালিশ (অভ্যঙ্গ) দিয়ে প্রশমিত করা যেতে পারে।",
                "আমি আপনার হৃদস্পন্দনের পরিবর্তনশীলতায় ভালো ওজস (জীবনীশক্তি) দেখতে পাচ্ছি।"
            ]
        },
        mr: {
            greeting: "नमस्ते. मी वैद्य एआय आहे. मी तुमच्या बायोमेट्रिक प्रोफाइलचे विश्लेषण केले आहे. आज तुमच्या उपचाराच्या प्रवासात मी तुम्हाला कसे मार्गदर्शन करू?",
            analysis: "नमस्ते. तुमचे विश्लेषण दर्शवते: **{context}**. या निकालाबाबत तुम्हाला कसे वाटत आहे?",
            responses: [
                "तुमच्या उच्च पित्तामुळे, मी काकडीसारखे थंड पदार्थ खाण्याचा सल्ला देतो.",
                "तुमचा तणाव निर्देशांक अश्वगंधा आणि संध्याकाळच्या ध्यानाची गरज सुचवतो.",
                "तुमच्या नाडीतील अनियमितता (वात) कोमट तेलाच्या मालिशने (अभ्यंग) शांत केली जाऊ शकते.",
                "मला तुमच्या हृदयाच्या ठोक्यांमध्ये चांगले ओजस (जीवनशक्ती) दिसत आहे."
            ]
        },
        // Fallbacks for Global Languages
        es: {
            greeting: "Namaste. Soy Vaidya AI. He analizado tu perfil biométrico. ¿Cómo puedo guiar tu viaje de sanación hoy?",
            analysis: "Namaste. Tu análisis indica: **{context}**. ¿Cómo te sientes con este resultado?",
            responses: [
                "Basado en tu alto Pitta, recomiendo alimentos refrescantes como el pepino.",
                "Tu índice de estrés sugiere la necesidad de Ashwagandha y meditación nocturna.",
                "La irregularidad en tu pulso (Vata) se puede calmar con un masaje de aceite tibio (Abhyanga).",
                "Veo un buen Ojas (vitalidad) en tu variabilidad de frecuencia cardíaca."
            ]
        },
        fr: {
            greeting: "Namaste. Je suis Vaidya AI. J'ai analysé votre profil biométrique. Comment puis-je guider votre parcours de guérison aujourd'hui?",
            analysis: "Namaste. Votre analyse indique : **{context}**. Comment vous sentez-vous par rapport à ce résultat ?",
            responses: [
                "Basé sur votre Pitta élevé, je recommande des aliments rafraîchissants comme le concombre.",
                "Votre indice de stress suggère un besoin d'Ashwagandha et de méditation le soir.",
                "L'irrégularité de votre pouls (Vata) peut être apaisée par un massage à l'huile chaude (Abhyanga).",
                "Je vois un bon Ojas (vitalité) dans la variabilité de votre fréquence cardiaque."
            ]
        },
        de: {
            greeting: "Namaste. Ich bin Vaidya AI. Ich habe Ihr biometrisches Profil analysiert. Wie kann ich Ihre Heilungsreise heute begleiten?",
            analysis: "Namaste. Ihre Analyse zeigt: **{context}**. Wie fühlen Sie sich mit diesem Ergebnis?",
            responses: [
                "Aufgrund Ihres hohen Pitta empfehle ich kühlende Lebensmittel wie Gurken.",
                "Ihr Stressindex deutet auf einen Bedarf an Ashwagandha und abendlicher Meditation hin.",
                "Die Unregelmäßigkeit in Ihrem Puls (Vata) kann mit einer warmen Ölmassage (Abhyanga) gelindert werden.",
                "Ich sehe gutes Ojas (Vitalität) in Ihrer Herzfrequenzvariabilität."
            ]
        }
    };

    const currentLang = chatTranslations[locale] || chatTranslations.en;

    // Initialize mock history on client-side only
    useEffect(() => {
        const demoHistory: Message[] = [
            {
                id: "current",
                role: "assistant",
                content: initialContext
                    ? currentLang.analysis.replace("{context}", initialContext)
                    : currentLang.greeting,
                timestamp: new Date()
            }
        ];

        // Add previous context if needed (omitted for brevity in multi-lang demo to allow cleaner start)
        setMessages(demoHistory);
    }, [initialContext, locale]); // Re-run when locale changes

    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate Network/Processing Delay for "Thinking" feel
        // In real app, fetch from /api/chat
        setTimeout(() => {
            const responses = currentLang.responses;
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: randomResponse,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500 + Math.random() * 1000); // 1.5 - 2.5s delay
    };

    return (
        <div className={`flex flex-col h-full w-full ${!embedded ? 'glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/10' : ''}`}>

            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-black/20 backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-amber-900/20 border border-gold/30 flex items-center justify-center">
                            <Sparkles size={18} className="text-gold" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                    </div>
                    <div>
                        <h3 className="font-display text-lg text-cream tracking-wide">Vaidya <span className="text-gold">AI</span></h3>
                        <p className="text-[10px] uppercase tracking-widest text-white/40">Ayurvedic Consultant</p>
                    </div>
                </div>
                {!embedded && (
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Edge AI: Llama-3-8b</span>
                        </div>
                        <button className="text-white/20 hover:text-white/50 transition-colors">
                            <RefreshCw size={16} onClick={() => setMessages([messages[0]])} />
                        </button>
                    </div>
                )}
            </div>

            {/* Messages Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-gold/20 scrollbar-track-transparent"
                style={{ scrollBehavior: 'smooth' }}
            >
                <AnimatePresence mode="popLayout">
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                        >
                            {/* Avatar */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border mt-1 shadow-lg ${msg.role === 'user'
                                ? 'bg-cyan-900/30 border-cyan-500/30'
                                : 'bg-gold/10 border-gold/30'
                                }`}>
                                {msg.role === 'user' ? <User size={14} className="text-cyan-400" /> : <Sparkles size={14} className="text-gold" />}
                            </div>

                            {/* Bubble */}
                            <div className={`max-w-[80%] relative group`}>
                                <div className={`p-4 rounded-2xl font-body leading-relaxed text-sm md:text-base shadow-lg backdrop-blur-sm ${msg.role === 'user'
                                    ? 'bg-gradient-to-br from-cyan-900/40 to-blue-900/20 border border-cyan-500/30 text-white rounded-tr-sm'
                                    : 'bg-gradient-to-br from-neutral-900/80 to-stone-900/80 border border-gold/20 text-cream/90 rounded-tl-sm'
                                    }`}>
                                    {msg.content}
                                </div>
                                <span className={`text-[10px] text-white/20 absolute -bottom-4 ${msg.role === 'user' ? 'right-1' : 'left-1'} opacity-0 group-hover:opacity-100 transition-opacity`}>
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-4"
                    >
                        <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                            <Sparkles size={14} className="text-gold animate-pulse" />
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-4 flex gap-1 items-center">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                                className="w-1.5 h-1.5 bg-gold/50 rounded-full"
                            />
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                                className="w-1.5 h-1.5 bg-gold/50 rounded-full"
                            />
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                                className="w-1.5 h-1.5 bg-gold/50 rounded-full"
                            />
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Input Controls */}
            <div className="p-4 bg-black/40 border-t border-white/5 backdrop-blur-md">
                <div className="relative flex items-center gap-2">
                    <VoiceControl
                        onTranscript={(text) => setInput(text)}
                    />

                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask about your Dosha, remedies, or diet..."
                        className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/30 rounded-full pl-4 pr-12 py-3 text-cream placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-all font-light"
                    />

                    <button
                        onClick={handleSend}
                        className="absolute right-2 p-2 rounded-full bg-gold text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(212,175,55,0.4)] disabled:opacity-50 disabled:scale-100"
                        disabled={!input.trim()}
                    >
                        <Send size={18} />
                    </button>

                </div>
                <div className="mt-2 text-center">
                    <p className="text-[10px] text-white/20 uppercase tracking-widest">
                        AI-Powered Vedic Guidance
                    </p>
                </div>
            </div>
        </div>
    );
}
