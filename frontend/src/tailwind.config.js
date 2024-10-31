/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/index.html"
    ],
    theme: {
      extend: {
        animation: {
          'shake': 'shake 0.5s linear',
          'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite'
        },
        keyframes: {
          shake: {
            '0%, 100%': { transform: 'translateX(0)' },
            '25%': { transform: 'translateX(-5px)' },
            '75%': { transform: 'translateX(5px)' }
          }
        }
      }
    },
    plugins: []
  };