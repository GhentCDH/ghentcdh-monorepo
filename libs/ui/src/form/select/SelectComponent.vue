<template>
  <SelectWrapper
    v-bind="properties"
    :options="options"
    :disabled="!enabled"
    :is-open="isOpen"
    :query="displayValue"
    :is-active="hasValue"
    @close="close"
    @select="select"
    @clear="clear"
  >
    <button
      type="button"
      class="truncate block text-left"
      :class="[style, width]"
      @click="isOpen = true"
    >
      {{ displayValue ?? 'Select value' }}
    </button>
  </SelectWrapper>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

import { getLabel, getValue } from './ListResults.properties';
import { SelectWrapperProperties } from './SelectWrapper.properties';
import SelectWrapper from './SelectWrapper.vue';
import type { ControlEmits } from '../core/emits';
import { buildInputStyle } from '../core/utils/style';
import { mergeStyles } from '../core/styles';

const isOpen = ref(false);
const properties = defineProps(SelectWrapperProperties);
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

const displayValue = computed(() =>
  model.value ? getLabel(model.value, properties) : undefined,
);

const styles = computed(() => mergeStyles(properties.styles));
const style = computed(() =>
  buildInputStyle(styles.value.control.select, properties),
);

const select = (result: any) => {
  model.value = result;
  onChange(result as any);
};

const clear = () => {
  isOpen.value = false;

  model.value = [];
  onChange([] as any);
};

const hasValue = (item) => {
  return model.value
    ? getValue(model.value, properties) === getValue(item, properties)
    : false;
};

const close = () => {
  isOpen.value = false;
};
</script>
