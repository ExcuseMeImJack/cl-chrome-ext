import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync } from 'fs';

// Custom function to copy content script
function copyContentScript() {
  return {
    name: 'copy-content-script',
    closeBundle() {
      copyFileSync('src/content.js', 'dist/content.js');
      copyFileSync('src/background.js', 'dist/background.js');
    },
  };
}

export default defineConfig({
  plugins: [react(), copyContentScript()],
  define: {
    'process.env': process.env,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  }
});
