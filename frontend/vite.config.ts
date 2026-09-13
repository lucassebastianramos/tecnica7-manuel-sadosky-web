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
    emptyOutDir: true,
    chunkSizeWarningLimit: 1100,
    rollupOptions: {
      output: {
        // Un solo chunk vendor: dividir node_modules a mano genera ciclos entre
        // chunks (vendor-react <-> vendor-charts) y errores TDZ en produccion
        // ("Cannot access 'X' before initialization"). Un chunk unico no puede
        // tener ciclos porque node_modules nunca importa codigo de src.
        manualChunks(id: string): string | undefined {
          if (id.includes('node_modules')) return 'vendor';
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
