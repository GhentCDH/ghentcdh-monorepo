<template>
  <div class="flex items-center justify-center h-full">
    <ControlWrapper
      v-bind="properties"
      :hide-label="true"
    >
      <label class="fieldset-label">
        <input
          v-model="model"
          type="checkbox"
          :class="[`checkbox`, styles.control.checkbox]"
          :disabled="!enabled"
          @change="onChange"
          @focus="onFocus"
          @blur="onBlur"
        >
        <span class="font-bold text-gray-500 text-sm"> {{ label }}</span>
      </label>
    </ControlWrapper>
  </div>
</template>

<script lang="ts" setup>
import ControlWrapper from './core/ControlWrapper.vue';
import type { ControlEmits } from './core/emits';
import type { SelectControlProperties } from './core/properties';
import { DefaultControlProperties } from './core/properties';

const properties = withDefaults(defineProps<SelectControlProperties>(), {
  ...DefaultControlProperties(),
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
