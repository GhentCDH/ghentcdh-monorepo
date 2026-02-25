<template>
  <ControlWrapper v-bind="properties">
    <input
      v-model="model"
      autocomplete="off"
      type="number"
      :class="[styles.control.input]"
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
import ControlWrapper from './core/ControlWrapper.vue';
import type { ControlEmits } from './core/emits';
import type {
  InputNumberProperties} from './core/properties';
import {
  DefaultControlProperties
} from './core/properties';

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
</script>
