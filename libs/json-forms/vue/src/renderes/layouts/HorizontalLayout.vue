<!-- renderers/DaisyHorizontalLayout.vue -->
<script setup lang="ts">
import {
  DispatchRenderer,
  rendererProps,
  useJsonFormsLayout,
} from '@jsonforms/vue';

const props = defineProps({ ...rendererProps() });
const { layout, renderers, cells } = useJsonFormsLayout(props);
</script>

<template>
  <div class="flex flex-row gap-4 items-center">
    <DispatchRenderer
      v-for="(element, index) in layout.uischema.elements"
      :key="index"
      :schema="layout.schema"
      :uischema="element"
      :path="layout.path"
      :renderers="renderers"
      :cells="cells"
    />
  </div>
</template>
