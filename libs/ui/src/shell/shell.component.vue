<template>
  <notifications />
  <ModalWrapper />
  <div class="h-screen">
    <header>
      <nav class="navbar bg-primary text-primary-content w-full z-100 sticky">
        <div class="navbar-start">
          <button
            @click="toggleSidebar"
            aria-label="open sidebar"
            class="btn btn-square btn-ghost p-1"
          >
            <Icon :icon="IconEnum.Hamburger" />
          </button>
        </div>
        <div class="navbar-center">
          <a class="btn btn-ghost text-xl" :href="baseUrl">{{ title }}</a>
        </div>
        <div class="navbar-end">
          <SubMenu v-if="userMenu" v-bind="userMenu" :btn-class="''" />
        </div>
      </nav>
    </header>
    <template v-if="sidebarOpen">
      <aside
        id="drawer-left"
        class="fixed overflow-y-auto z-[1000] min-h-0 min-w-0 relative flex-shrink-0 bg-white shadow-lg transition-all duration-300 ease-in-out border-l border-gray-200 overflow-visible inset-0"
        :style="{
          width: widthSidebar + 'px',
          top: `${navbarHeight}px`,
        }"
      >
        <div class="menu h-full flex-col space-between m-0 overflow-y-auto">
          <ul class="flex-grow-1">
            <li v-for="item of menu" :key="item.label">
              <RouterLink :to="{ name: item.routerLink, params: item.params }">
                {{ item.label }}
              </RouterLink>
            </li>
          </ul>
          <div class="bg-base-200 p-4">version: {{ version }}</div>
        </div>
      </aside>
    </template>
    <main
      :class="`overflow-hidden fixed border-red  bg-white p-4 mx-auto max-h-full  shadow-sm `"
      :style="{
        top: `${navbarHeight}px`,
        bottom: `2px`,
        right: `2px`,
        left: sidebarOpen ? widthSidebar + 'px' : 0,
      }"
    >
      <div class="h-full">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';

import type { ShellMenu, User } from './menu.type';
import { Icon, IconEnum } from '../icons';
import { SubMenu } from '../menu';
import { ModalWrapper } from '../modal';
import Notifications from '../toast/notifications.vue';

const baseUrl = import.meta.env.BASE_URL;

const properties = withDefaults(
  defineProps<{
    title: string;
    menu: ShellMenu;
    user: User | undefined;
    version: string;
    widthSidebar?: number;
  }>(),
  { widthSidebar: 300 },
);

const sidebarOpen = ref(false);
const navbarHeight = 64;

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const emits = defineEmits<{ logout: [] }>();

const userMenu = computed(() => {
  return properties.user
    ? {
        label: properties.user.name,
        items: [
          {
            label: 'Logout',
            action: () => {
              emits('logout');
            },
          },
        ],
      }
    : null;
});
</script>
