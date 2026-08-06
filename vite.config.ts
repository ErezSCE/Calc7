import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// CSS Modules plugin removed as it's not required

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
});
