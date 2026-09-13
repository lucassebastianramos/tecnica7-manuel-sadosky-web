import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return ({
  assetsInclude: ['**/*.xlsx'],
  build: {
    outDir: '../frontend-dist',
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id: string): string | undefined {
          if (!id.includes('node_modules')) return undefined;

          if (id.includes('framer-motion') || /node_modules[\\/]motion(-dom|-utils)?[\\/]/.test(id)) {
            return 'vendor-motion';
          }
          if (id.includes('react-router') || id.includes('@remix-run')) {
            return 'vendor-router';
          }
          if (/node_modules[\\/]react(-dom)?[\\/]/.test(id) || /node_modules[\\/]scheduler[\\/]/.test(id)) {
            return 'vendor-react';
          }
          if (id.includes('@radix-ui')) {
            return 'vendor-radix';
          }
          if (
            id.includes('recharts') ||
            id.includes('victory-vendor') ||
            id.includes('react-smooth') ||
            id.includes('d3-')
          ) {
            return 'vendor-charts';
          }
          if (id.includes('@tanstack')) {
            return 'vendor-query';
          }
          if (id.includes('gsap')) {
            return 'vendor-gsap';
          }
          if (id.includes('lucide-react') || id.includes('react-icons')) {
            return 'vendor-icons';
          }
          return undefined;
        },
      },
    },
  },
  server: {
    // listen on all network interfaces so dev server is reachable externally
    host: true,
    port: 8080,
    // allow specific external hostnames to avoid host-check blocking
    allowedHosts: ['manuelsadosky.tecnica7ldz.edu.ar', 'localhost', '127.0.0.1'],
    watch: {
      ignored: ['**/*.timestamp-*.mjs'],
    },
    proxy: {
      '/api': {
        // use env var when provided (frontend/.env VITE_BACKEND_URL), otherwise local backend
        target: env.VITE_BACKEND_URL || 'http://127.0.0.1:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  });
});
