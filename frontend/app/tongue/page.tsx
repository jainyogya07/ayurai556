import TongueScanner from '@/components/TongueScanner';

export default function TonguePage() {
    return (
        <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-accent mb-2">
                        Jivha Pariksha (Tongue Analysis)
                    </h1>
                    <p className="text-gray-400">Align your tongue in the center of the frame with good lighting.</p>
                </div>

                <TongueScanner />
            </div>
        </div>
    );
}
