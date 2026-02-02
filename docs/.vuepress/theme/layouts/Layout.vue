<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue';
</script>

<template>
  <ParentLayout></ParentLayout>
</template>

<style lang="css">
@import 'tailwindcss';
@import '@ghentcdh/ui/style.css';

@theme {
  --font-display: 'PannoTextMedium', Arial, sans-serif;
}

.custom-page--full-width {
  .vp-page [vp-content] {
    max-width: 100%;
  }
}
</style>
