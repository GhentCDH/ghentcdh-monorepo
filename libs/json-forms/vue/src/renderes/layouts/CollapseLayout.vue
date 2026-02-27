<!-- renderers/DaisyHorizontalLayout.vue -->
<script setup lang="ts">
import {
  DispatchRenderer,
  rendererProps,
  useJsonFormsLayout,
} from '@jsonforms/vue';
import { computed } from 'vue';

import { Collapse } from '@ghentcdh/ui';

const props = defineProps({ ...rendererProps() });
const jsonLayout = useJsonFormsLayout(props);
const { layout, renderers, cells } = jsonLayout;

const title = computed(() => {
  const { titleKey, title } = layout?.value.uischema?.options ?? {};

  if (title) return title;
  if (titleKey) return layout?.value.data[titleKey];
  return layout?.value.uischema?.options?.titleKey;
});
</script>

<template>
  <Collapse :title="title">
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
  </Collapse>
</template>
