/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '60%': { transform: 'scale(1.2)', opacity: '1' },
          '100%': { transform: 'scale(1)' },
        },
        glowPulse: {
          '0%': { boxShadow: '0 0 0px rgba(0, 0, 0, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)' },
          '100%': { boxShadow: '0 0 0px rgba(0, 0, 0, 0.5)' },
        },
      },
      animation: {
        bounceIn: 'bounceIn 0.8s ease-out',
        glowPulse: 'glowPulse 2s infinite',
      },
    
    },
  },
  plugins: [],
}

