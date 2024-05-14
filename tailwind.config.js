/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#646cff',
        'secondary': '#535bf2',
        'background': '#242424',
        'text-primary': '#ffffff',
        'text-secondary': '#213547',
      },
      fontFamily: {
        'body': ['Inter', 'system-ui'],
      },
    },
  },
  plugins: [],
}

