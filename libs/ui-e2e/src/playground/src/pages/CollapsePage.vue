<template>
  <h1 class="text-xl mb-4">
    Collapse
  </h1>
  <Collapse
    title="Details"
    :opened="false"
  >
    <p data-testid="collapse-content">
      Collapse body content
    </p>
  </Collapse>

  <div class="mt-4">
    <Collapse
      title="Always open"
      :disabled="true"
    >
      <p data-testid="disabled-content">
        Cannot be closed
      </p>
    </Collapse>
  </div>
</template>

<script setup lang="ts">
import { Collapse } from '@ghentcdh/ui';
</script>
