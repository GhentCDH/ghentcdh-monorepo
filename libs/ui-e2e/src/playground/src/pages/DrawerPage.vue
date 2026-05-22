<template>
  <h1 class="text-xl mb-4">
    Drawer
  </h1>
  <div style="height: 300px;">
    <Drawer
      :initial-left-open="true"
      :initial-right-open="false"
      :width-left="200"
      :width-right="200"
    >
      <template #left-drawer>
        <p data-testid="left-content">
          Left panel
        </p>
      </template>
      <p data-testid="main-content">
        Main content
      </p>
      <template #right-drawer>
        <p data-testid="right-content">
          Right panel
        </p>
      </template>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { Drawer } from '@ghentcdh/ui';
</script>
