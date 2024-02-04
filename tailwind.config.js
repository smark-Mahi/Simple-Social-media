/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx,html,css}',
  ],
  theme: {
    extend: {
      animation:{
        blob:"blob 7s infinite",
      },
      keyframes:{
        blob:{
          "0%":{
            transform:"translate(0px,0px) scale(1)"
          },
          "33%":{
            transform:"translate(30px,-50px) scale(1.2)"
          },
          "66%":{
            transform:"translate(-20px,20px) scale(0.8)"
          },
          "100%":{
            transform:"translate(0px,0px) scale(1)"
          },
        }
      },
      colors:{
        customred:{
          400:"#dc2626"
        },
      }
    },
  },
  plugins: [require("daisyui")],
}

