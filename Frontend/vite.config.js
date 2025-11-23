import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import scrollbar from 'tailwind-scrollbar'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react() , tailwindcss() , svgr({svgrOptions : {icon : true}}) , scrollbar],
})
