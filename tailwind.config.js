/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        shirefuels: {
          "primary": "#3082B4",        // Light Blue - CTA buttons
          "primary-content": "#FFFFFF",
          "secondary": "#4D973C",      // Green - Logo, accents
          "secondary-content": "#FFFFFF",
          "accent": "#264B8C",         // Dark Blue - Section backgrounds
          "accent-content": "#FFFFFF",
          "neutral": "#1F2937",        // Text
          "neutral-content": "#FFFFFF",
          "base-100": "#FFFFFF",       // White backgrounds
          "base-200": "#F9FAFB",       // Light gray
          "base-300": "#F3F1BB",       // Cream accent
          "base-content": "#1F2937",
          "info": "#3082B4",
          "success": "#4D973C",
          "warning": "#F59E0B",
          "error": "#EF4444",
        },
      },
    ],
    base: true,
    styled: true,
    utils: true,
  },
}
