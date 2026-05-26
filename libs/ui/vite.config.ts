/// <reference types='vitest' />
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';

import * as path from 'path';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/ui',
  plugins: [
    vue(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md', '*.mdx']),
    // Skip type-checking during vitest runs — checker conflicts with vitest
    ...(!process.env['VITEST'] ? [checker({ typescript: true })] : []),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
  ],
  build: {
    // minify:false,
    outDir: '../../dist/libs/ui',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      entry: {
        index: 'src/index.ts',
        testing: 'src/testing/index.ts',
      },
      name: 'ui',
      fileName: (format, entryName) =>
        `${entryName}.${format === 'cjs' ? 'js' : 'mjs'}`,
      formats: ['cjs', 'esm'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [
        '@ghentcdh/tools-vue',
        '@heroicons/vue/24/outline',
        '@heroicons/vue/24/solid',
        '@playwright/test',
        '@tiptap/pm',
        '@tiptap/starter-kit',
        '@tiptap/vue-3',
        'tiptap-markdown',
        'uuid',
        'vue',
        'vue-router',
      ],
      output: {
        // Provide global variable name for Vue (for UMD/IIFE builds)
        globals: {
          vue: 'Vue',
        },
        assetFileNames: 'index[extname]',
      },
    },
  },
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/libs/ui',
      provider: 'v8',
    },
  },
});
