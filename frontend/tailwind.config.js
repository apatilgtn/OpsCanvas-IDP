module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.625rem', // 10px
      },
      colors: {
        background: {
          light: '#f0f2f5',
          dark: '#1a1f2a',
        },
        sidebar: {
          darker: '#1e2330',
          dark: '#2a3241',
        },
      },
    },
  },
  plugins: [],
}