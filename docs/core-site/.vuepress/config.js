import tailwindcss from '@tailwindcss/vite';
import { viteBundler } from '@vuepress/bundler-vite';
import { defineUserConfig } from 'vuepress';
import { hopeTheme } from 'vuepress-theme-hope';

import toolsSideBar from '../tools/typedoc_sidebar.json';
import { fileURLToPath } from 'node:url';

export default defineUserConfig({
  base: process.env.DOCS_BASE ? `${process.env.DOCS_BASE}/` : '/',
  title: 'GhentCDH Core',
  pagePatterns: ['**/*.md', '!.vuepress', '!**/node_modules'],
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  bundler: viteBundler({
    viteOptions: {
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          '@ghentcdh/logging/frontend': fileURLToPath(
            new URL(
              '../../../libs/logging/frontend/src/index.ts',
              import.meta.url,
            ),
          ),
          '@ghentcdh/authentication-vue': fileURLToPath(
            new URL(
              '../../../libs/authentication/vue/src/index.ts',
              import.meta.url,
            ),
          ),
          '@ghentcdh/tools-vue': fileURLToPath(
            new URL('../../../libs/tools/vue/src/index.ts', import.meta.url),
          ),
        },
      },
    },
    vuePluginOptions: {},
  }),
  theme: hopeTheme({
    docsRepo: 'https://github.com/GhentCDH/ghentcdh-monorepo',
    docsBranch: 'main',
    docsDir: 'docs/core-site',
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
    navbar: [
      { text: 'Home', link: '/' },
    ],
    sidebar: [
      {
        text: 'Authentication',
        link: '/authentication/',
      },
      {
        text: 'Data',
        link: '/data/',
      },
      {
        text: 'Health',
        link: '/health/',
      },
      {
        text: 'Logging',
        link: '/logging/',
      },
      {
        text: 'Tools',
        children: toolsSideBar,
      },
    ].flat(),
  }),
});
