import tailwindcss from '@tailwindcss/vite';
import { viteBundler } from '@vuepress/bundler-vite';
import { defineUserConfig } from 'vuepress';
import { hopeTheme } from 'vuepress-theme-hope';

import jsonFormsSideBar from '../json-forms/typedoc_sidebar.json';
import toolsSideBar from '../tools/typedoc_sidebar.json';
import uiSideBar from '../ui/typedoc_sidebar.json';
import { fileURLToPath } from 'node:url';

export default defineUserConfig({
  base: process.env.DOCS_BASE ? `${process.env.DOCS_BASE}/` : '/',
  title: 'GhentCDH',
  pagePatterns: ['**/*.md', '!.vuepress', '!**/node_modules'],
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  bundler: viteBundler({
    viteOptions: {
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          '@demo/data': fileURLToPath(
            new URL('../data/index.ts', import.meta.url),
          ),
          '@ghentcdh/logging/frontend': fileURLToPath(
            new URL(
              '../../libs/logging/frontend/src/index.ts',
              import.meta.url,
            ),
          ),
          '@ghentcdh/ui/style.css': fileURLToPath(
            new URL('../../dist/libs/ui/index.css', import.meta.url),
          ),
          '@ghentcdh/ui': fileURLToPath(
            new URL('../../libs/ui/src/index.ts', import.meta.url),
          ),
          '@ghentcdh/authentication-vue': fileURLToPath(
            new URL(
              '../../libs/authentication/vue/src/index.ts',
              import.meta.url,
            ),
          ),
          '@ghentcdh/json-forms-vue': fileURLToPath(
            new URL('../../libs/json-forms/vue/src/index.ts', import.meta.url),
          ),
          '@ghentcdh/json-forms-core': fileURLToPath(
            new URL('../../libs/json-forms/core/src/index.ts', import.meta.url),
          ),
          '@ghentcdh/tools-vue': fileURLToPath(
            new URL('../../libs/tools/vue/src/index.ts', import.meta.url),
          ),
        },
      },
    },
    vuePluginOptions: {},
  }),
  // postcss: {
  //   plugins: [require('@tailwindcss/postcss'), require('autoprefixer')],
  // },
  theme: hopeTheme({
    docsRepo: 'https://github.com/GhentCDH/ghentcdh-monorepo',
    docsBranch: 'main',
    docsDir: 'docs',
    // editLinkPattern: ':repo/tree/:branch/:path',
    lastUpdated: true,
    colorMode: 'light',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/GhentCDH/ghentcdh-monorepo' },
    ],
    plugins: {
      mdEnhance: {
        tabs: true,
        codetabs: true,
        demo: true,
      },
    },
    // colorModeSwitch: false,
    navbar: [
      {
        text: 'Home',
        link: '/',
      },
    ],
    sidebar: [
      {
        text: 'tools',
        children: toolsSideBar,
      },
      {
        text: 'Ui',
        children: uiSideBar,
      },
      {
        text: 'JSON-forms',
        children: jsonFormsSideBar,
      },
    ].flat(),
  }),
});
