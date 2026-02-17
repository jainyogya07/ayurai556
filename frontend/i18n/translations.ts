export type Locale = "en" | "hi" | "es" | "fr" | "de" | "sa" | "ta" | "bn" | "te" | "mr";

export const translations = {
    en: {
        nav: {
            home: "Home",
            timeline: "Timeline",
            enter: "Enter",
            join: "Join",
            diagnose: "Diagnose",
            demo_guide: "Demo Guide"
        },
        hero: {
            title: "The Essence of",
            subtitle: "Your Well-being.",
            description: "Ancient Ayurvedic wisdom, distilled by Artificial Intelligence.",
            cta: "Begin Ritual",
            chat_cta: "Chat with Vaidya",
            demo_cta: "Watch Demo",
            presentation_cta: "Present",
            secondary_cta: "Learn More",
            features: {
                pulse: "Pulse",
                tongue: "Tongue",
                dosha: "Dosha"
            },
            stats: {
                heart_rate: "Heart Rate",
                diagnosis: "Diagnosis",
                balanced: "Balanced"
            }
        },
        voice: {
            listen: "Listen",
            speak: "Speak"
        },
        diagnose: {
            step_pulse: "Pulse",
            step_tongue: "Tongue",
            step_prakriti: "Prakriti",
            start_title: "Acuity of the Heart",
            tongue_title: "The Mirror of Digestion",
            proceed: "Proceed to Visage",
            continue: "Continue",
            back: "Back",
            complete: "Analysis Complete"
        },
        demo: {
            title: "System Demo Mode",
            pulse_title: "Pulse Diagnosis (Nadi Pariksha)",
            pulse_desc: "AI analyzes blood flow patterns (rPPG) to detect your Vata, Pitta, and Kapha levels.",
            tongue_title: "Tongue Analysis (Jivha Pariksha)",
            tongue_desc: "Computer Vision detects coating, color, and texture to identify digestive toxins (Ama).",
            chat_title: "Vaidya AI Consultation",
            chat_desc: "Chat with our Vedic AI directly for personalized remedies.",
            abha_title: "ABHA Health Sync",
            abha_desc: "Link your Ayushman Bharat Health Account to sync digital health records.",
            start: "Start Experience",
            next: "Next"
        },
        abha: {
            title: "ABHA Integration",
            desc: "Link your Ayushman Bharat Health Account to sync your Ayurvedic records with the National Digital Health Ecosystem.",
            placeholder: "Enter 14-digit ABHA ID",
            button: "Verify & Link Identity",
            verifying: "Verifying with UIDAI...",
            verified: "Identity Verified & Linked",
            syncing: "Syncing Health Records...",
            records: "Synced Records"
        },
        history: {
            title: "Health Timeline",
            desc: "Your journey to balance, recorded.",
            empty: "No records found.",
            journey_title: "Your Journey",
            journey_prefix: "Your ",
            journey_highlight: "Journey",
            view_report: "View Report"
        }
    },
    hi: {
        nav: {
            home: "मुख्य पृष्ठ",
            timeline: "समय-रेखा",
            enter: "प्रवेश",
            join: "जुड़ें",
            diagnose: "निदान",
            demo_guide: "डेमो गाइड"
        },
        hero: {
            title: "आपकी भलाई का",
            subtitle: "सार",
            description: "कृत्रिम बुद्धिमत्ता (AI) द्वारा आसुत प्राचीन आयुर्वेदिक ज्ञान।",
            cta: "अनुष्ठान आरंभ करें",
            chat_cta: "वैद्य से बात करें",
            demo_cta: "डेमो देखें",
            presentation_cta: "प्रस्तुत करें",
            secondary_cta: "अधिक जानें",
            features: {
                pulse: "नाड़ी",
                tongue: "जिह्वा",
                dosha: "दोष"
            },
            stats: {
                heart_rate: "हृदय गति",
                diagnosis: "निदान",
                balanced: "संतुलित"
            }
        },
        voice: {
            listen: "सुनें",
            speak: "बोलें"
        },
        diagnose: {
            step_pulse: "नाड़ी",
            step_tongue: "जिह्वा",
            step_prakriti: "प्रकृति",
            start_title: "हृदय की तीक्ष्णता",
            tongue_title: "पाचन का दर्पण",
            proceed: "आकृति की ओर बढ़ें",
            continue: "जारी रखें",
            back: "वापस",
            complete: "विश्लेषण पूर्ण"
        },
        demo: {
            title: "सिस्टम डेमो मोड",
            pulse_title: "नाड़ी परीक्षा",
            pulse_desc: "एआई आपके वात, पित्त और कफ के स्तर का पता लगाने के लिए रक्त प्रवाह पैटर्न (rPPG) का विश्लेषण करता है।",
            tongue_title: "जिह्वा परीक्षा",
            tongue_desc: "कम्प्यूटर विजन पाचन विषाक्त पदार्थों (अमा) की पहचान करने के लिए कोटिंग, रंग और बनावट का पता लगाता है।",
            chat_title: "वैद्य एआई परामर्श",
            chat_desc: "व्यक्तिगत उपचार के लिए सीधे हमारे वैदिक एआई से चैट करें।",
            abha_title: "ABHA स्वास्थ्य सिंक",
            abha_desc: "डिजिटल स्वास्थ्य रिकॉर्ड सिंक करने के लिए अपने आयुष्मान भारत स्वास्थ्य खाते को लिंक करें।",
            start: "अनुभव शुरू करें",
            next: "अगला"
        },
        abha: {
            title: "ABHA एकीकरण",
            desc: "अपने आयुर्वेदिक रिकॉर्ड को राष्ट्रीय डिजिटल स्वास्थ्य पारिस्थितिकी तंत्र के साथ सिंक करने के लिए अपना आयुष्मान भारत स्वास्थ्य खाता लिंक करें।",
            placeholder: "14-अंकीय ABHA आईडी दर्ज करें",
            button: "पहचान सत्यापित करें और लिंक करें",
            verifying: "UIDAI के साथ सत्यापन...",
            verified: "पहचान सत्यापित और लिंक की गई",
            syncing: "स्वास्थ्य रिकॉर्ड सिंक हो रहे हैं...",
            records: "सिंक किए गए रिकॉर्ड"
        },
        history: {
            title: "स्वास्थ्य समयरेखा",
            desc: "संतुलन की आपकी यात्रा, रिकॉर्ड की गई।",
            empty: "कोई रिकॉर्ड नहीं मिला।",
            journey_title: "आपकी यात्रा",
            journey_prefix: "आपकी ",
            journey_highlight: "यात्रा",
            view_report: "रिपोर्ट देखें"
        }
    },
    es: {
        nav: {
            home: "Inicio",
            timeline: "Cronología",
            enter: "Entrar",
            join: "Únete"
        },
        hero: {
            title: "La Esencia de",
            subtitle: "Inteligencia Ayurvédica",
            description: "Experimenta la convergencia de la antigua sabiduría védica y el diagnóstico avanzado por IA. Tu viaje hacia el equilibrio comienza aquí.",
            cta: "Iniciar Ritual",
            secondary_cta: "Saber Más"
        },
        voice: {
            listen: "Escuchar",
            speak: "Hablar"
        },
        diagnose: {
            step_pulse: "Pulso",
            step_tongue: "Lengua",
            step_prakriti: "Prakriti",
            start_title: "Agudeza del Corazón",
            tongue_title: "El Espejo de la Digestión",
            proceed: "Proceder al Rostro",
            continue: "Continuar",
            back: "Atrás",
            complete: "Análisis Completo"
        },
        demo: {
            title: "Modo de Demostración del Sistema",
            pulse_title: "Diagnóstico de Pulso (Nadi Pariksha)",
            pulse_desc: "La IA analiza los patrones de flujo sanguíneo (rPPG) para detectar tus niveles de Vata, Pitta y Kapha.",
            tongue_title: "Análisis de Lengua (Jivha Pariksha)",
            tongue_desc: "La visión por computadora detecta el recubrimiento, el color y la textura para identificar toxinas digestivas (Ama).",
            chat_title: "Consulta Vaidya AI",
            chat_desc: "Chatee directamente con nuestra IA Védica para obtener remedios personalizados.",
            abha_title: "Sincronización de Salud ABHA",
            abha_desc: "Vincula tu Cuenta de Salud Ayushman Bharat para sincronizar registros de salud digitales.",
            start: "Iniciar Experiencia",
            next: "Siguiente"
        },
        abha: {
            title: "Integración ABHA",
            desc: "Vincula tu Cuenta de Salud Ayushman Bharat para sincronizar tus registros ayurvédicos con el Ecosistema Nacional de Salud Digital.",
            placeholder: "Ingrese ID ABHA de 14 dígitos",
            button: "Verificar y Vincular Identidad",
            verifying: "Verificando con UIDAI...",
            verified: "Identidad Verificada y Vinculada",
            syncing: "Sincronizando Registros de Salud...",
            records: "Registros Sincronizados"
        },
        history: {
            title: "Cronología de Salud",
            desc: "Tu viaje hacia el equilibrio, registrado.",
            empty: "No se encontraron registros."
        }
    },
    fr: {
        nav: {
            home: "Accueil",
            timeline: "Chronologie",
            enter: "Entrer",
            join: "Rejoindre"
        },
        hero: {
            title: "L'Essence de",
            subtitle: "l'Intelligence Ayurvédique",
            description: "Découvrez la convergence de la sagesse védique ancienne et du diagnostic IA avancé. Votre voyage vers l'équilibre commence ici.",
            cta: "Commencer le Rituel",
            secondary_cta: "En Savoir Plus"
        },
        voice: {
            listen: "Écouter",
            speak: "Parler"
        },
        diagnose: {
            step_pulse: "Pouls",
            step_tongue: "Langue",
            step_prakriti: "Prakriti",
            start_title: "Acuité du Cœur",
            tongue_title: "Le Miroir de la Digestion",
            proceed: "Procéder au Visage",
            continue: "Continuer",
            back: "Retour",
            complete: "Analyse Complète"
        },
        demo: {
            title: "Mode Démo Système",
            pulse_title: "Diagnostic du Pouls (Nadi Pariksha)",
            pulse_desc: "L'IA analyse les schémas de flux sanguin (rPPG) pour détecter vos niveaux de Vata, Pitta et Kapha.",
            tongue_title: "Analyse de la Langue (Jivha Pariksha)",
            tongue_desc: "La vision par ordinateur détecte l'enduit, la couleur et la texture pour identifier les toxines digestives (Ama).",
            chat_title: "Consultation Vaidya AI",
            chat_desc: "Discutez directement avec notre IA Védique pour des remèdes personnalisés.",
            abha_title: "Synchro Santé ABHA",
            abha_desc: "Liez votre compte de santé Ayushman Bharat pour synchroniser les dossiers de santé numériques.",
            start: "Commencer l'Expérience",
            next: "Suivant"
        },
        abha: {
            title: "Intégration ABHA",
            desc: "Liez votre Compte de Santé Ayushman Bharat pour synchroniser vos dossiers ayurvédiques avec l'Écosystème National de Santé Numérique.",
            placeholder: "Entrez l'ID ABHA à 14 chiffres",
            button: "Vérifier et lier l'identité",
            verifying: "Vérification avec UIDAI...",
            verified: "Identité Vérifiée et Liée",
            syncing: "Synchronisation des Dossiers de Santé...",
            records: "Dossiers Synchronisés"
        },
        history: {
            title: "Chronologie de Santé",
            desc: "Votre voyage vers l'équilibre, enregistré.",
            empty: "Aucun dossier trouvé."
        }
    },
    de: {
        nav: {
            home: "Startseite",
            timeline: "Zeitachse",
            enter: "Eintreten",
            join: "Beitreten"
        },
        hero: {
            title: "Die Essenz der",
            subtitle: "Ayurvedischen Intelligenz",
            description: "Erleben Sie die Konvergenz alter vedischer Weisheit und fortschrittlicher KI-Diagnostik. Ihre Reise zum Gleichgewicht beginnt hier.",
            cta: "Ritual Beginnen",
            secondary_cta: "Mehr Erfahren"
        },
        voice: {
            listen: "Hören",
            speak: "Sprechen"
        },
        diagnose: {
            step_pulse: "Puls",
            step_tongue: "Zunge",
            step_prakriti: "Prakriti",
            start_title: "Schärfe des Herzens",
            tongue_title: "Der Spiegel der Verdauung",
            proceed: "Zum Gesicht",
            continue: "Weiter",
            back: "Zurück",
            complete: "Analyse Abgeschlossen"
        },
        demo: {
            title: "System-Demomodus",
            pulse_title: "Pulsdiagnose (Nadi Pariksha)",
            pulse_desc: "KI analysiert Blutflussmuster (rPPG), um Ihre Vata-, Pitta- und Kapha-Werte zu erkennen.",
            tongue_title: "Zungenanalyse (Jivha Pariksha)",
            tongue_desc: "Computer Vision erkennt Belag, Farbe und Textur, um Verdauungstoxine (Ama) zu identifizieren.",
            chat_title: "Vaidya KI-Beratung",
            chat_desc: "Chatten Sie direkt mit unserer vedischen KI für personalisierte Heilmittel.",
            abha_title: "ABHA Gesundheitssynchronisation",
            abha_desc: "Verknüpfen Sie Ihr Ayushman Bharat Gesundheitskonto, um digitale Gesundheitsakten zu synchronisieren.",
            start: "Erlebnis Beginnen",
            next: "Weiter"
        },
        abha: {
            title: "ABHA Integration",
            desc: "Verknüpfen Sie Ihr Ayushman Bharat Gesundheitskonto, um Ihre ayurvedischen Akten mit dem Nationalen Digitalen Gesundheitsökosystem zu synchronisieren.",
            placeholder: "14-stellige ABHA-ID eingeben",
            button: "Identität Verifizieren & Verknüpfen",
            verifying: "Verifizierung mit UIDAI...",
            verified: "Identität Verifiziert & Verknüpft",
            syncing: "Gesundheitsakten werden synchronisiert...",
            records: "Synchronisierte Akten"
        },
        history: {
            title: "Gesundheitszeitachse",
            desc: "Ihre Reise zum Gleichgewicht, aufgezeichnet.",
            empty: "Keine Akten gefunden."
        }
    },
    sa: {
        nav: {
            home: "गृहम्",
            timeline: "कालक्रमः",
            enter: "प्रविश",
            join: "युज्यस्व"
        },
        hero: {
            title: "आयुर्वेदस्य सारः",
            subtitle: "प्रज्ञा च विज्ञानम्",
            description: "प्राचीन-वैदिक-ज्ञानस्य तथा च उन्नत-अभियान्त्रिक-निदानस्य संगमम् अनुभवतु। भवद्रोग-मुक्त-जीवनस्य यात्रा अत्रैव आरभ्यते।",
            cta: "अनुष्ठानम् आरभ्यताम्",
            secondary_cta: "अधिकं ज्ञातव्यम्"
        },
        voice: {
            listen: "शृणु",
            speak: "वद"
        },
        diagnose: {
            step_pulse: "नाडी",
            step_tongue: "जिह्वा",
            step_prakriti: "प्रकृति",
            start_title: "हृदयस्य तीक्ष्णता",
            tongue_title: "पाचनस्य दर्पणः",
            proceed: "अग्रे सर",
            continue: "अनुवर्तताम्",
            back: "प्रतिगच्छ",
            complete: "विश्लेषणं पूर्णम्"
        },
        demo: {
            title: "तन्त्र-प्रदर्शन-विधिः",
            pulse_title: "नाडी-परीक्षा",
            pulse_desc: "वात-पित्त-कफ-स्तराणां ज्ञानाय एआई रक्तप्रवाहस्य विश्लेषणं करोति।",
            tongue_title: "जिह्वा-परीक्षा",
            tongue_desc: "आमदोषस्य ज्ञानाय यन्त्रदृष्टिः जिह्वायाः मलिनत्वं, वर्णं च पश्यति।",
            chat_title: "वैद्य-एआई-परामर्शः",
            chat_desc: "व्यक्तिगत-उपचाराय अस्माकं वैदिक-एआई-यन्त्रेण सह वार्तालापं कुरु।",
            abha_title: "ABHA स्वास्थ्य-समन्वयनम्",
            abha_desc: "अंकीय-स्वास्थ्य-अभिलेखान् मेलयितुं स्वस्य आयुष्मान-भारत-स्वास्थ्य-खातेन सह योजय।",
            start: "अनुभवं आरभस्व",
            next: "अग्रे"
        },
        abha: {
            title: "ABHA एकीकरणम्",
            desc: "राष्ट्रिय-अंकीय-स्वास्थ्य-परिवेशेन सह आयुर्वेदिक-अभिलेखान् मेलयितुं स्वस्य आयुष्मान-भारत-स्वास्थ्य-खातेन सह योजय।",
            placeholder: "१४-अङ्कीय ABHA परिचयपत्रं लिख",
            button: "परिचयं सत्यापय योजय च",
            verifying: "UIDAI द्वारा सत्यापनम्...",
            verified: "परिचयः सत्यापितः योजितः च",
            syncing: "स्वास्थ्य-अभिलेखानां समन्वयनम्...",
            records: "समन्विताः अभिलेखाः"
        },
        history: {
            title: "स्वास्थ्य-कालक्रमः",
            desc: "भवतः सन्तुलन-यात्रा अत्र अङ्किता।",
            empty: "कोऽपि अभिलेखः न प्राप्तः।"
        }
    },
    ta: {
        nav: {
            home: "முகப்பு",
            timeline: "வரலாறு",
            enter: "நுழை",
            join: "சேரவும்"
        },
        hero: {
            title: "ஆயுர்வேதத்தின்",
            subtitle: "அறிவு கூர்மை",
            description: "பண்டைய வேத ஞானம் மற்றும் மேம்பட்ட AI கண்டறிதலின் சங்கமத்தை அனுபவிக்கவும். சமநிலைக்கான உங்கள் பயணம் இங்கே தொடங்குகிறது.",
            cta: "சடங்கைத் தொடங்கவும்",
            secondary_cta: "மேலும் அறிக"
        },
        voice: {
            listen: "கேளுங்கள்",
            speak: "பேசுங்கள்"
        },
        diagnose: {
            step_pulse: "நாடி",
            step_tongue: "நாக்கு",
            step_prakriti: "பிரகிருதி",
            start_title: "இதயத்தின் கூர்மை",
            tongue_title: "செரிமானத்தின் கண்ணாடி",
            proceed: "தொடரவும்",
            continue: "தொடரவும்",
            back: "பின்செல்",
            complete: "பகுப்பாய்வு முடிந்தது"
        },
        demo: {
            title: "அமைப்பு டெமோ பயன்முறை",
            pulse_title: "நாடி பரிசோதனை (நாடி பரிக்ஷா)",
            pulse_desc: "AI இரத்த ஓட்ட முறைகளை (rPPG) பகுப்பாய்வு செய்து உங்கள் வாத, பித்த, கப அளவுகளைக் கண்டறியும்.",
            tongue_title: "நாக்கு பகுப்பாய்வு (ஜிவ்ஹா பரிக்ஷா)",
            tongue_desc: "கணினி பார்வை செரிமான நச்சுகளை (ஆமா) அடையாளம் காண பூச்சு, நிறம் மற்றும் அமைப்பைக் கண்டறியும்.",
            chat_title: "வைத்திய AI ஆலோசனை",
            chat_desc: "தனிப்பயனாக்கப்பட்ட தீர்வுகளுக்கு எங்கள் வேத AI உடன் நேரடியாக அரட்டையடிக்கவும்.",
            abha_title: "ABHA சுகாதார ஒத்திசைவு",
            abha_desc: "டிஜிட்டல் சுகாதார பதிவுகளை ஒத்திசைக்க உங்கள் ஆயுஷ்மான் பாரத் சுகாதார கணக்கை இணைக்கவும்.",
            start: "அனுபவத்தைத் தொடங்குங்கள்",
            next: "அடுத்து"
        },
        abha: {
            title: "ABHA ஒருங்கிணைப்பு",
            desc: "உங்கள் ஆயுர்வேத பதிவுகளை தேசிய டிஜிட்டல் சுகாதார சுற்றுச்சூழல் அமைப்புடன் ஒத்திசைக்க உங்கள் ஆயுஷ்மான் பாரத் சுகாதார கணக்கை இணைக்கவும்.",
            placeholder: "14 இலக்க ABHA ஐடியை உள்ளிடவும்",
            button: "அடையாளத்தைச் சரிபார்த்து இணைக்கவும்",
            verifying: "UIDAI உடன் சரிபார்க்கிறது...",
            verified: "அடையாளம் சரிபார்க்கப்பட்டு இணைக்கப்பட்டது",
            syncing: "சுகாதார பதிவுகளை ஒத்திசைக்கிறது...",
            records: "ஒத்திசைக்கப்பட்ட பதிவுகள்"
        },
        history: {
            title: "சுகாதார காலவரிசை",
            desc: "சமநிலைக்கான உங்கள் பயணம், பதிவு செய்யப்பட்டது.",
            empty: "பதிவுகள் எதுவும் கிடைக்கவில்லை."
        }
    },
    bn: {
        nav: {
            home: "প্রধান",
            timeline: "সময়রেখা",
            enter: "প্রবেশ",
            join: "যোগ দিন"
        },
        hero: {
            title: "আয়ুর্বেদের",
            subtitle: "সারমর্ম ও প্রজ্ঞা",
            description: "প্রাচীন বৈদিক জ্ঞান এবং উন্নত এআই ডায়াগনস্টিকসের মিলন অনুভব করুন। আপনার ভারসাম্যের যাত্রা এখান থেকেই শুরু হচ্ছে।",
            cta: "অনুষ্ঠান শুরু করুন",
            secondary_cta: "আরও জানুন"
        },
        voice: {
            listen: "শুনুন",
            speak: "বলুন"
        },
        diagnose: {
            step_pulse: "নাড়ি",
            step_tongue: "জিহ্বা",
            step_prakriti: "প্রকৃতি",
            start_title: "হৃদয়ের তীক্ষ্ণতা",
            tongue_title: "হজমের দর্পণ",
            proceed: "এগিয়ে যান",
            continue: "চালিয়ে যান",
            back: "ফিরে যান",
            complete: "বিশ্লেষণ সম্পূর্ণ"
        },
        demo: {
            title: "সিস্টেম ডেমো মোড",
            pulse_title: "নাড়ি পরীক্ষা",
            pulse_desc: "এআই আপনার বাত, পিত্ত এবং কফ স্তর সনাক্ত করতে রক্ত প্রবাহের ধরণ (rPPG) বিশ্লেষণ করে।",
            tongue_title: "জিহ্বা বিশ্লেষণ",
            tongue_desc: "কম্পিউটার ভিশন হজম বিষাক্ত পদার্থ (আমা) সনাক্ত করতে আবরণ, রঙ এবং গঠন সনাক্ত করে।",
            chat_title: "বৈদ্য এআই পরামর্শ",
            chat_desc: "ব্যক্তিগত প্রতিকারের জন্য সরাসরি আমাদের বৈদিক এআই-এর সাথে চ্যাট করুন।",
            abha_title: "ABHA স্বাস্থ্য সিঙ্ক",
            abha_desc: "ডিজিটাল স্বাস্থ্য রেকর্ড সিঙ্ক করতে আপনার আয়ুষ্মান ভারত স্বাস্থ্য অ্যাকাউন্ট লিঙ্ক করুন।",
            start: "অভিজ্ঞতা শুরু করুন",
            next: "পরবর্তী"
        },
        abha: {
            title: "ABHA ইন্টিগ্রেশন",
            desc: "জাতীয় ডিজিটাল স্বাস্থ্য ইকোসিস্টেমের সাথে আপনার আয়ুর্বেদ রেকর্ড সিঙ্ক করতে আপনার আয়ুষ্মান ভারত স্বাস্থ্য অ্যাকাউন্ট লিঙ্ক করুন।",
            placeholder: "১৪-অঙ্কের ABHA আইডি লিখুন",
            button: "পরিচয় যাচাই করুন এবং লিঙ্ক করুন",
            verifying: "UIDAI দিয়ে যাচাই করা হচ্ছে...",
            verified: "পরিচয় যাচাই এবং লিঙ্ক করা হয়েছে",
            syncing: "স্বাস্থ্য রেকর্ড সিঙ্ক করা হচ্ছে...",
            records: "সিঙ্ক করা রেকর্ড"
        },
        history: {
            title: "স্বাস্থ্য সময়রেখা",
            desc: "আপনার ভারসাম্যের যাত্রা, রেকর্ড করা হয়েছে।",
            empty: "কোন রেকর্ড পাওয়া যায়নি।"
        }
    },
    te: {
        nav: {
            home: "ముఖ్యం",
            timeline: "కాలక్రమం",
            enter: "ప్రవేశం",
            join: "చేరండి"
        },
        hero: {
            title: "ఆయుర్వేదం యొక్క",
            subtitle: "సారాంశం",
            description: "ప్రాచీన వేద విజ్ఞానం మరియు అధునాతన AI డయాగ్నస్టిక్స్ కలయికను అనుభవించండి. మీ సమతుల్య ప్రయాణం ఇక్కడే మొదలవుతుంది.",
            cta: "ఆచారం ప్రారంభించండి",
            secondary_cta: "మరింత తెలుసుకోండి"
        },
        voice: {
            listen: "వినండి",
            speak: "మాట్లాడండి"
        },
        diagnose: {
            step_pulse: "నాడి",
            step_tongue: "నాలుక",
            step_prakriti: "ప్రకృతి",
            start_title: "హృదయ తీక్షణత",
            tongue_title: "జీర్ణక్రియ అద్దం",
            proceed: "ముందుకు సాగండి",
            continue: "కొనసాగించండి",
            back: "వెనుకకు",
            complete: "విశ్లేషణ పూర్తయింది"
        },
        demo: {
            title: "సిస్టమ్ డెమో మోడ్",
            pulse_title: "నాడి పరీక్ష",
            pulse_desc: "AI మీ వాత, పిత్త, కఫ స్థాయిలను గుర్తించడానికి రక్త ప్రవాహ నమూనాలను (rPPG) విశ్లేషిస్తుంది.",
            tongue_title: "నాలుక విశ్లేషణ",
            tongue_desc: "కంప్యూటర్ విజన్ జీర్ణ విషాలను (అమా) గుర్తించడానికి పూత, రంగు మరియు ఆకృతిని గుర్తిస్తుంది.",
            chat_title: "వైద్య AI సంప్రదింపులు",
            chat_desc: "వ్యక్తిగత పరిష్కారాల కోసం మా వేద AI తో నేరుగా చాట్ చేయండి.",
            abha_title: "ABHA హెల్త్ సింక్",
            abha_desc: "డిజిటల్ హెల్త్ రికార్డులను సింక్ చేయడానికి మీ ఆయుష్మాన్ భారత్ హెల్త్ ఖాతాను లింక్ చేయండి.",
            start: "అనుభవం ప్రారంభించండి",
            next: "తరువాత"
        },
        abha: {
            title: "ABHA ఇంటిగ్రేషన్",
            desc: "నేషనల్ డిజిటల్ హెల్త్ ఎకోసిస్టమ్‌తో మీ ఆయుర్వేద రికార్డులను సింక్ చేయడానికి మీ ఆయుష్మాన్ భారత్ హెల్త్ ఖాతాను లింక్ చేయండి.",
            placeholder: "14-అంకెల ABHA ఐడిని నమోదు చేయండి",
            button: "గుర్తింపును ధృవీకరించండి మరియు లింక్ చేయండి",
            verifying: "UIDAI తో ధృవీకరించబడుతోంది...",
            verified: "గుర్తింపు ధృవీకరించబడింది మరియు లింక్ చేయబడింది",
            syncing: "హెల్త్ రికార్డులు సింక్ అవుతున్నాయి...",
            records: "సింక్ చేసిన రికార్డులు"
        },
        history: {
            title: "ఆరోగ్య కాలక్రమం",
            desc: "మీ సమతుల్య ప్రయాణం, రికార్డ్ చేయబడింది.",
            empty: "రికార్డులు ఏవీ కనుగొనబడలేదు."
        }
    },
    mr: {
        nav: {
            home: "मुख्य",
            timeline: "कालरेषा",
            enter: "प्रवेश",
            join: "सामील व्हा"
        },
        hero: {
            title: "आयुर्वेदाचे",
            subtitle: "सार आणि बुद्धिमत्ता",
            description: "प्राचीन वैदिक ज्ञान आणि प्रगत एआय निदान यांच्या संगमाचा अनुभव घ्या. तुमचा संतुलनाचा प्रवास येथूनच सुरू होतो.",
            cta: "अनुष्ठान सुरू करा",
            secondary_cta: "अधिक जाणून घ्या"
        },
        voice: {
            listen: "ऐका",
            speak: "बोला"
        },
        diagnose: {
            step_pulse: "नाडी",
            step_tongue: "जीभ",
            step_prakriti: "प्रकृती",
            start_title: "हृदयाची तीक्ष्णता",
            tongue_title: "पचनाचा आरसा",
            proceed: "पुढे चला",
            continue: "सुरू ठेवा",
            back: "मागे",
            complete: "विश्लेषण पूर्ण"
        },
        demo: {
            title: "सिस्टम डेमो मोड",
            pulse_title: "नाडी परीक्षा",
            pulse_desc: "एआय तुमच्या वात, पित्त आणि कफ पातळी शोधण्यासाठी रक्त प्रवाह नमुन्यांचे (rPPG) विश्लेषण करते.",
            tongue_title: "जीभ विश्लेषण",
            tongue_desc: "कॉम्प्युटर व्हिजन पचन विषारी पदार्थ (अमा) ओळखण्यासाठी कोटिंग, रंग आणि पोत शोधते.",
            chat_title: "वैद्य एआय सल्ला",
            chat_desc: "वैयक्तिक उपचारांसाठी थेट आमच्या वैदिक एआयशी चॅट करा.",
            abha_title: "ABHA आरोग्य सिंक",
            abha_desc: "डिजिटल आरोग्य रेकॉर्ड सिंक करण्यासाठी आपले आयुष्मान भारत आरोग्य खाते लिंक करा.",
            start: "अनुभव सुरू करा",
            next: "पुढील"
        },
        abha: {
            title: "ABHA एकत्रीकरण",
            desc: "राष्ट्रीय डिजिटल आरोग्य परिसंस्थेसह आपले आयुर्वेदिक रेकॉर्ड सिंक करण्यासाठी आपले आयुष्मान भारत आरोग्य खाते लिंक करा.",
            placeholder: "14-अंकी ABHA आयडी प्रविष्ट करा",
            button: "ओळख सत्यापित करा आणि लिंक करा",
            verifying: "UIDAI सह सत्यापन...",
            verified: "ओळख सत्यापित आणि लिंक केली",
            syncing: "आरोग्य रेकॉर्ड सिंक होत आहेत...",
            records: "सिंक केलेले रेकॉर्ड"
        },
        history: {
            title: "आरोग्य कालरेषा",
            desc: "तुमचा संतुलनाचा प्रवास, नोंदवला आहे.",
            empty: "कोणतेही रेकॉर्ड सापडले नाहीत."
        }
    }
};
