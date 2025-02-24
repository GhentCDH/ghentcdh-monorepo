import { viteBundler } from '@vuepress/bundler-vite';
import { defaultTheme } from '@vuepress/theme-default';
import { defineUserConfig } from 'vuepress';
import componentsSideBar from '../components/typedoc_sidebar.json';
import toolsSideBar from '../tools/typedoc_sidebar.json';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';

export default defineUserConfig({
  title: 'GhentCDH',
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  bundler: viteBundler({
    viteOptions: {
      // plugins: [tailwindcss()],
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
          '@ghentcdh/authentication/frontend': fileURLToPath(
            new URL(
              '../../libs/authentication/frontend/src/index.ts',
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
    docsRepo: 'https://github.com/GhentCDH/ghentcdh-monorepo',
    docsBranch: 'master',
    docsDir: 'docs',
    // editLinkPattern: ':repo/tree/:branch/:path',
    lastUpdated: true,
    colorMode: 'light',
    socialLinks: [{ icon: 'github', link: 'https://github.com/GhentCDH/ghentcdh-monorepo' }],
    // colorModeSwitch: false,
    navbar: [
      {
        text: 'Home',
        link: '/',
      },
    ],
    sidebar: [
      componentsSideBar,
      toolsSideBar,
      // {
      //   text: 'api',
      //   children: apiSideBar1,
      // },
    ].flat(),
  }),
});
