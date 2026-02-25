<template>
  <ControlWrapper v-bind="properties">
    <textarea
      v-model="model"
      autocomplete="off"
      type="text"
      :class="[styles.control.textarea]"
      :disabled="!enabled"
      :rows="rows"
      :autofocus="isFocused"
      :placeholder="placeholder"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    />
  </ControlWrapper>
</template>

<script lang="ts" setup>
import ControlWrapper from './core/ControlWrapper.vue';
import type { ControlEmits } from './core/emits';
import type {
  TextareaProperties} from './core/properties';
import {
  DefaultControlProperties
} from './core/properties';

const properties = withDefaults(defineProps<TextareaProperties>(), {
  ...DefaultControlProperties(),
  rows: 4,
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
