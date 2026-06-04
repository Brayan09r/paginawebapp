/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sapphire: {
          900: '#0F2841', // Azul Profundo Corporativo
          950: '#081726', // Fondo principal oscuro
        },
        electric: {
          500: '#FF5A00', // Naranja Eléctrico
          600: '#E65100',
        },
        emerald: {
          500: '#10B981', // Acento de Progreso
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}