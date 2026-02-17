'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface DiagnosticsState {
    rppgData: {
        bpm: number | null;
        signal: number[];
        snr: number;
        hrv?: number;
        stress?: number;
        pulseType?: string;
    };
    tongueData: { diagnosis: string[]; confidence: number } | null;
    questionnaire: { sleep: string; digestion: string; energy: string } | null;
}

interface DiagnosticsContextType {
    data: DiagnosticsState;
    // Helper accessors for direct access if needed
    rppgData: DiagnosticsState['rppgData'];
    tongueData: DiagnosticsState['tongueData'];
    questionnaire: DiagnosticsState['questionnaire'];

    setRppgData: (data: Partial<DiagnosticsState['rppgData']> | ((prev: DiagnosticsState['rppgData']) => DiagnosticsState['rppgData'])) => void;
    setTongueData: (data: DiagnosticsState['tongueData']) => void;
    setQuestionnaire: (data: DiagnosticsState['questionnaire']) => void;
    setDiagnosis: (diagnosis: string) => void;
}

const DiagnosticsContext = createContext<DiagnosticsContextType | undefined>(undefined);

export function DiagnosticsProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<DiagnosticsState>({
        rppgData: { bpm: null, signal: [], snr: 0, hrv: undefined, stress: undefined, pulseType: undefined },
        tongueData: null,
        questionnaire: null
    });

    const setRppgData = (input: any) => {
        setData(prev => {
            const newData = typeof input === 'function' ? input(prev.rppgData) : input;
            // Handle merging if partial
            return { ...prev, rppgData: { ...prev.rppgData, ...newData } };
        });
    };

    const setTongueData = (tongueData: DiagnosticsState['tongueData']) => setData(prev => ({ ...prev, tongueData }));
    const setQuestionnaire = (questionnaire: DiagnosticsState['questionnaire']) => setData(prev => ({ ...prev, questionnaire }));
    const setDiagnosis = (diagnosis: string) => setData(prev => ({ ...prev, rppgData: { ...prev.rppgData, pulseType: diagnosis } })); // Re-using pulseType for now, or we can add a new field. Let's add 'diagnosis' to root state for clarity.

    return (
        <DiagnosticsContext.Provider value={{
            data,
            rppgData: data.rppgData,
            tongueData: data.tongueData,
            questionnaire: data.questionnaire,
            setRppgData,
            setTongueData,
            setQuestionnaire,
            setDiagnosis: (d: string) => setData(prev => ({ ...prev, rppgData: { ...prev.rppgData, pulseType: d } }))
        }}>
            {children}
        </DiagnosticsContext.Provider>
    );
}

export function useDiagnostics() {
    const context = useContext(DiagnosticsContext);
    if (context === undefined) {
        throw new Error('useDiagnostics must be used within a DiagnosticsProvider');
    }
    return context;
}
