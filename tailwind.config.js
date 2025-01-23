/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(0)', opacity: 0.5 },
          '100%': { transform: 'scale(4)', opacity: 0 },
        },
      },
      animation: {
        ripple: 'ripple 1s ease-out forwards',
      },
      screens: {
        'sm': '480px',    // 0-479px: mobile, 480px+: small screens
        'md': '768px',    // 768px+: tablets/medium screens
        'lg': '1024px',   // 1024px+: laptops/desktops
        'xl': '1280px',   // 1280px+: large screens
        '2xl': '1536px',  // 1536px+: extra large screens
      }
    },
  },
  plugins: [],
}

