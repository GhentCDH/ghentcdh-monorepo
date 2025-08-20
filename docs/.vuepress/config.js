import { viteBundler } from '@vuepress/bundler-vite';
import { defaultTheme } from '@vuepress/theme-default';
import { defineUserConfig } from 'vuepress';
import componentsSideBar from '../components/typedoc_sidebar.json';
import toolsSideBar from '../tools/typedoc_sidebar.json';
import uiSideBar from '../ui/typedoc_sidebar.json';
import jsonFormsSideBar from '../json-forms/typedoc_sidebar.json';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';


export default defineUserConfig({
  title: 'GhentCDH',
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
          '@ghentcdh/ui': fileURLToPath(
            new URL(
              '../../libs/ui/src/index.ts',
              import.meta.url,
            ),
          ),
          '@ghentcdh/authentication-vue': fileURLToPath(
            new URL(
              '../../libs/authentication/vue/src/index.ts',
              import.meta.url,
            ),
          ),
          '@ghentcdh/json-forms-vue': fileURLToPath(
            new URL(
              '../../libs/json-forms/vue/src/index.ts',
              import.meta.url,
            ),
          ),
          '@ghentcdh/json-forms-core': fileURLToPath(
            new URL(
              '../../libs/json-forms/core/src/index.ts',
              import.meta.url,
            ),
          ),
        },
      },
    },
    vuePluginOptions: {},
  }),
  // postcss: {
  //   plugins: [require('@tailwindcss/postcss'), require('autoprefixer')],
  // },
  theme: defaultTheme({
    docsRepo: 'https://github.com/GhentCDH/Mela',
    docsBranch: 'master',
    docsDir: 'docs',
    // editLinkPattern: ':repo/tree/:branch/:path',
    lastUpdated: true,
    colorMode: 'light',
    socialLinks: [{ icon: 'github', link: 'https://github.com/GhentCDH/Mela' }],
    // colorModeSwitch: false,
    navbar: [
      {
        text: 'Home',
        link: '/',
      },
    ],
    sidebar: [
      componentsSideBar,
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
