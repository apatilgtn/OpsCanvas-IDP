// tailwind.config.js
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
          'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
          'sidebar-item': 'sidebar-item 0.2s ease-out',
          'fadeIn': 'fadeIn 0.3s ease-in-out',
          'slideIn': 'slideIn 0.3s ease-out'
        },
        keyframes: {
          shake: {
            '0%, 100%': { transform: 'translateX(0)' },
            '25%': { transform: 'translateX(-5px)' },
            '75%': { transform: 'translateX(5px)' }
          },
          'sidebar-item': {
            '0%': { transform: 'translateX(-10px)', opacity: '0' },
            '100%': { transform: 'translateX(0)', opacity: '1' }
          },
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' }
          },
          slideIn: {
            '0%': { transform: 'translateY(-10px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' }
          }
        },
        colors: {
          'menu': {
            'kubernetes': '#326CE5',
            'docker': '#2496ED',
            'cicd': '#40B682',
            'api': '#6851FF'
          }
        }
      }
    },
    plugins: [],
    safelist: [
      {
        pattern: /text-(blue|green|purple|indigo|sky)-[45]00/,
      },
      {
        pattern: /bg-(blue|green|purple|indigo|sky)-[45]0/,
      }
    ]
  };