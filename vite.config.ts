import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cssModules from 'vite-plugin-css-modules';

export default defineConfig({
  plugins: [react(), cssModules()],
  server: {
    port: 3000,
  },
});
