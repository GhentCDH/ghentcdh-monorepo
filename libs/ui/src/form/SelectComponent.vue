<template>
  <ControlWrapper v-bind="properties">
    <select
      v-model="model"
      :disabled="!enabled"
      :class="style"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    >
      <option
        v-for="option in options"
        :key="option[valueKey]"
        :value="option"
      >
        {{ option[labelKey] }}
      </option>
    </select>
  </ControlWrapper>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import ControlWrapper from './core/ControlWrapper.vue';
import type { ControlEmits } from './core/emits';
import type { SelectControlProperties } from './core/properties';
import { DefaultControlProperties } from './core/properties';
import { buildInputStyle } from './core/utils/style';

const properties = withDefaults(defineProps<SelectControlProperties>(), {
  ...DefaultControlProperties(),
  options: [],
  valueKey: 'value',
  labelKey: 'label',
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
  buildInputStyle(properties.styles.control.select, properties),
);
</script>
