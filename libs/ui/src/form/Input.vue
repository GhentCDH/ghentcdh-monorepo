<template>
  <ControlWrapper v-bind="properties">
    <input
      v-model="model"
      autocomplete="off"
      :type="type"
      :class="[styles.control.input]"
      :disabled="!enabled"
      :autofocus="isFocused"
      :placeholder="placeholder"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    >
  </ControlWrapper>
</template>

<script lang="ts" setup>
import ControlWrapper from './core/ControlWrapper.vue';
import type { ControlEmits } from './core/emits';
import type { InputProperties } from './core/properties';
import { DefaultControlProperties } from './core/properties';

const properties = withDefaults(defineProps<InputProperties>(), {
  ...DefaultControlProperties(),
  type: 'text',
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
</script>
