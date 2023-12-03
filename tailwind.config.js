/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gl-red-light': '#f00',
        'gl-red-dark': '#ce0505',
        'gl-primary': '#04ff04',
      },
    },
  },
  plugins: [],
};
