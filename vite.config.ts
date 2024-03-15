import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  base:'/RA_Lab_03/',
  plugins: [react()],
})
