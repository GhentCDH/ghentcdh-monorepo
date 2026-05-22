import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const playgroundRoot = resolve(__dirname, 'src/playground');

export default defineConfig({
  root: playgroundRoot,
  plugins: [vue(), nxViteTsPaths()],
  resolve: {
    alias: [
      {
        find: '@ghentcdh/ui/style.css',
        replacement: resolve(__dirname, '../../dist/libs/ui/index.css'),
      },
      {
        find: '@ghentcdh/ui',
        replacement: fileURLToPath(
          new URL('../ui/src/index.ts', import.meta.url),
        ),
      },
    ],
  },
  server: {
    port: 4174,
    host: '0.0.0.0',
    strictPort: true,
  },
  preview: {
    port: 4174,
    host: '0.0.0.0',
  },
});
