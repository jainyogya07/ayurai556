"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Locale } from "../i18n/translations";

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocale] = useState<Locale>("en");

    // Persist language preference
    useEffect(() => {
        const saved = localStorage.getItem("ayurai-lang") as Locale;
        if (saved && (saved === "en" || saved === "hi")) {
            setLocale(saved);
        }
    }, []);

    const changeLocale = (newLocale: Locale) => {
        setLocale(newLocale);
        localStorage.setItem("ayurai-lang", newLocale);
    };

    const t = (path: string) => {
        const keys = path.split(".");
        let current: any = translations[locale];

        for (const key of keys) {
            if (current[key] === undefined) return path;
            current = current[key];
        }
        return current as string;
    };

    return (
        <LanguageContext.Provider value={{ locale, setLocale: changeLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
