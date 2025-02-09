import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import process from "process";

const host = process.env.TAURI_DEV_HOST;

export default defineConfig(async () => ({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@redux': path.resolve(__dirname, './src/redux'),
      '@views': path.resolve(__dirname, './src/views'),
      '@features': path.resolve(__dirname, './src/features'),
      '@graphview': path.resolve(__dirname, './src/features/graphview'),
      '@file-drop': path.resolve(__dirname, './src/features/file-drop'),
      '@theme': path.resolve(__dirname, './src/features/theme'),
      "@snippets": path.resolve(__dirname, './src/features/app-snipets')
    },
  },
  
  plugins: [react()],

  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));
