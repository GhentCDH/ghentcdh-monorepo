<!-- renderers/DaisyVerticalLayout.vue -->
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
  <div class="flex flex-col gap-4">
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
