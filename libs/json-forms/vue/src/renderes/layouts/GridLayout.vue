<!-- renderers/DaisyHorizontalLayout.vue -->
<script setup lang="ts">
import { DispatchRenderer, rendererProps, useJsonFormsLayout } from '@jsonforms/vue';

const props = defineProps({ ...rendererProps() });
const { layout, renderers, cells } = useJsonFormsLayout(props);
</script>

<template>
  <div
    class="grid gap-4 items-center"
    :style="{ 'grid-template-columns': 'repeat(12, 1fr)' }"
  >
    <div
      v-for="(element, index) in layout.uischema.elements"
      :key="index"
      :style="{
        'grid-column': `span ${element.options?.colspan ?? 12}`,
      }"
    >
      <DispatchRenderer
        :schema="layout.schema"
        :uischema="element"
        :path="layout.path"
        :renderers="renderers"
        :cells="cells"
      />
    </div>
  </div>
</template>
