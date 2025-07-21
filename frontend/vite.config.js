// frontend/vite.config.js
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';


export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': 'https://week-7-devops-deployment-assignment-kf00.onrender.com',
    },
  },
});