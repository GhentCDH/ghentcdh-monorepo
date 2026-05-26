import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  root: __dirname,
  plugins: [vue()],
  server: { port: 4174, strictPort: true },
  preview: { port: 4174, strictPort: true },
  resolve: {
    /* Mount the live UI lib source — no build step between source and spec. */
    alias: {
      '@ghentcdh/ui': fileURLToPath(
        new URL('../../src/index.ts', import.meta.url),
      ),
      '@ghentcdh/ui/style.css': resolve(
        __dirname,
        '../../../../dist/libs/ui/index.css',
      ),
    },
  },
});
