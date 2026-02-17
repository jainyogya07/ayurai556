export default function Footer() {
    return (
        <footer className="w-full text-center p-4 mt-8 text-white/40 text-sm glass-panel border-t border-white/5 bg-charcoal/50">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <p>&copy; {new Date().getFullYear()} AyurAI. The Essence of Well-being.</p>
                <div className="flex space-x-4 mt-2 md:mt-0">
                    <a href="#" className="hover:text-gold transition-colors">Privacy</a>
                    <a href="#" className="hover:text-gold transition-colors">Terms</a>
                    <a href="#" className="hover:text-gold transition-colors">GitHub</a>
                </div>
            </div>
        </footer>
    );
}
