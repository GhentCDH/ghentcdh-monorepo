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
    outDir: '../../../dist/libs/json-forms/vue',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: 'json-forms-vue',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [
        '@jsonforms/core',
        "@jsonforms/core/src/testers/testers",
        '@jsonforms/vue',
        '@jsonforms/vue-vanilla',

        '@vueuse/core',
        'vue',
        'vue-router'
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
