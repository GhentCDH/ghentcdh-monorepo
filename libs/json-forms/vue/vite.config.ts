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
  cacheDir: '../../../node_modules/.vite/libs/json-forms/vue',
  plugins: [
    vue(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
    checker({ typescript: true }),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
  ],
  build: {
    minify: false,
    outDir: '../../../dist/libs/json-forms/vue',
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
      name: 'json-forms-vue',
      fileName: (format, entryName) =>
        `${entryName}.${format === 'cjs' ? 'js' : 'mjs'}`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [
        '@ghentcdh/json-forms-core',
        '@ghentcdh/tools-vue',
        '@ghentcdh/ui',
        '@jsonforms/core',
        '@jsonforms/core/src/testers/testers',
        '@playwright/test',
        '@vueuse/core',
        'axios',
        'lodash-es',
        'vue',
        'vee-validate',
        'vue-router',
        'zod',
      ],
      output: {
        // Provide global variable name for Vue (for UMD/IIFE builds)
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
