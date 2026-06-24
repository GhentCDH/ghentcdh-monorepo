import tailwindcss from '@tailwindcss/vite';
import { viteBundler } from '@vuepress/bundler-vite';
import { defineUserConfig } from 'vuepress';
import { hopeTheme } from 'vuepress-theme-hope';

import uiSideBar from '../ui/typedoc_sidebar.json';
import { fileURLToPath } from 'node:url';

// Open until depth 3, collapsible (and collapsed) from depth 3 onward.
// depth=1 → top-level children of UI/JSON Forms sections
function makeCollapsible(items, depth = 1) {
  return items.map((item) => {
    if (typeof item === 'string') return item;
    const result = { ...item };
    if (result.children?.length) {
      if (depth >= 3) {
        result.collapsible = true;
        result.collapsed = true;
      } else {
        delete result.collapsible;
        delete result.collapsed;
      }
      result.children = makeCollapsible(result.children, depth + 1);
    }
    if (result.items?.length) {
      result.items = makeCollapsible(result.items, depth + 1);
    }
    return result;
  });
}

export default defineUserConfig({
  base: process.env.DOCS_BASE ? `${process.env.DOCS_BASE}/` : '/',
  title: 'GhentCDH UI',
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
            new URL('../../data/index.ts', import.meta.url),
          ),
          '@ghentcdh/logging/frontend': fileURLToPath(
            new URL(
              '../../../libs/logging/frontend/src/index.ts',
              import.meta.url,
            ),
          ),
          '@ghentcdh/ui/style.css': fileURLToPath(
            new URL('../../../dist/libs/ui/index.css', import.meta.url),
          ),
          '@ghentcdh/ui': fileURLToPath(
            new URL('../../../libs/ui/src/index.ts', import.meta.url),
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
    docsDir: 'docs/ui-site',
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
    navbar: [{ text: 'Home', link: '/' }],
    sidebar: [
      {
        text: 'UI',
        children: makeCollapsible(uiSideBar),
      },
    ],
  }),
});
