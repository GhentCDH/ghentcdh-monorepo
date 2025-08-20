import { defineClientConfig } from 'vuepress/client';
import Layout from './theme/layouts/Layout.vue';
// import { createPinia } from 'pinia';

export default defineClientConfig({
  enhance({ app }) {
  },
  layouts: {
    Layout,
  },
});
