import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('./pages/HomePage.vue') },
  { path: '/input', name: 'input', component: () => import('./pages/InputPage.vue') },
  { path: '/number', name: 'number', component: () => import('./pages/NumberPage.vue') },
  { path: '/textarea', name: 'textarea', component: () => import('./pages/TextareaPage.vue') },
  { path: '/checkbox', name: 'checkbox', component: () => import('./pages/CheckboxPage.vue') },
  { path: '/select', name: 'select', component: () => import('./pages/SelectPage.vue') },
  { path: '/multi-select', name: 'multi-select', component: () => import('./pages/MultiSelectPage.vue') },
  { path: '/autocomplete', name: 'autocomplete', component: () => import('./pages/AutocompletePage.vue') },
  { path: '/markdown', name: 'markdown', component: () => import('./pages/MarkdownPage.vue') },
  { path: '/modal', name: 'modal', component: () => import('./pages/ModalPage.vue') },
];
