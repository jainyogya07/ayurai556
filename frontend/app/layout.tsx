import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DiagnosticsProvider } from "@/context/DiagnosticsContext";
import { LanguageProvider } from "@/context/LanguageContext";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AyurAI | The Essence of Well-being",
  description: "AI-powered Ayurvedic diagnosis with a touch of luxury.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AyurAI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${playfair.variable} ${lato.variable} antialiased bg-charcoal text-cream selection:bg-gold selection:text-charcoal`}
      >
        <LanguageProvider>
          <DiagnosticsProvider>
            <div className="relative min-h-screen overflow-hidden">
              {/* Background Texture */}
              <div className="fixed inset-0 z-[-1] opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/smoke.png')] mix-blend-overlay"></div>
              <div className="fixed inset-0 z-[-2] bg-gradient-to-b from-[#1a1a1a] via-[#0f0f0f] to-[#000000]"></div>

              <Navbar />
              <main className="pt-20">{children}</main>
              <Footer />
            </div>
          </DiagnosticsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
