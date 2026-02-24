<template>
  <Markdown
    v-bind="controlWrapper"
    v-model="control.data"
    :enabled="control.enabled"
    :config="appliedOptions"
    @change="handleChange"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>

<script lang="ts">
import type { ControlElement, JsonFormsRendererRegistryEntry } from '@jsonforms/core';
import { rankWith } from '@jsonforms/core';
import type { RendererProps } from '@jsonforms/vue';
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue';
import { defineComponent } from 'vue';

import { Markdown } from '@ghentcdh/ui';

import { useVanillaControlCustom } from '../../utils/vanillaControl';
import { isMarkdownControl } from '../tester';

const controlRenderer = defineComponent({
  name: 'MarkdownControlRenderer',
  components: {
    Markdown,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    const control = useVanillaControlCustom(
      useJsonFormsControl(props),
      (target) => target.value ?? undefined,
    );

    const field = control.appliedOptions.value.field;
    const handleChange = (result: any) => {
      const { path } = control.control.value;
      control.handleChange(path, result);
    };

    return { ...control, field, handleChange };
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(1, isMarkdownControl),
};
</script>
