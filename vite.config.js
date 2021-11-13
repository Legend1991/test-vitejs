import { defineConfig } from 'vite';
// eslint-disable-next-line import/no-unresolved
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: false,
  },
  plugins: [preact()],
});
