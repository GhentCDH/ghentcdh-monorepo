<template>
  <ControlWrapper v-bind="properties">
    <input
      v-model="model"
      autocomplete="off"
      type="number"
      :class="[style]"
      :disabled="!enabled"
      :step="steps"
      :autofocus="isFocused"
      :placeholder="placeholder"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    >
  </ControlWrapper>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import ControlWrapper from './core/ControlWrapper.vue';
import type { ControlEmits } from './core/emits';
import type { InputNumberProperties } from './core/properties';
import { DefaultControlProperties } from './core/properties';
import { buildInputStyle } from './core/utils/style';

const properties = withDefaults(defineProps<InputNumberProperties>(), {
  ...DefaultControlProperties(),
  steps: 1,
});

const emit = defineEmits<ControlEmits>();
const model = defineModel();

const onChange = (event: Event) => {
  emit('change', event);
};
const onFocus = (event: FocusEvent) => {
  emit('focus', event);
};
const onBlur = (event: Event) => {
  emit('blur', event);
};

const style = computed(() =>
  buildInputStyle(properties.styles.control.input, properties),
);
</script>
