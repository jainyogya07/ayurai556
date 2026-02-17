/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                gold: "#D4AF37",
                "gold-light": "#E5C76B",
                cream: "#F5E6C8",
                charcoal: "#1A1A2E",
            },
            fontFamily: {
                display: ["Playfair Display", "serif"],
                body: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
};
