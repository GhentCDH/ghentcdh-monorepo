import '@ghentcdh/ui/style.css';

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import { routes } from './router';

createApp(App)
  .use(createRouter({ history: createWebHistory(), routes }))
  .mount('#app');
