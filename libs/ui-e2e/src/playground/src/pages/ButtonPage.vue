<template>
  <h1 class="text-xl mb-4">
    Button
  </h1>
  <div class="flex gap-2 mb-4">
    <Btn
      aria-label="Primary"
      @click="clickCount++"
    >
      Primary
    </Btn>
    <Btn
      aria-label="Disabled"
      :disabled="true"
      @click="clickCount++"
    >
      Disabled
    </Btn>
    <Btn
      aria-label="Outline"
      :outline="true"
      @click="clickCount++"
    >
      Outline
    </Btn>
  </div>

  <pre data-testid="click-count">{{ clickCount }}</pre>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { Btn } from '@ghentcdh/ui';

const clickCount = ref(0);
</script>
