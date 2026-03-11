<template>
  <SelectWrapper
    v-bind="properties"
    :options="options"
    :is-open="isOpen"
    :disabled="!enabled"
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
const model = defineModel<any[]>();

const onChange = (event: Event) => {
  emit('change', event);
};

const displayValue = computed(() => {
  return model.value?.map?.((m) => getLabel(m, properties)).join(', ');
});

const select = (result: any) => {
  let selection: any[] = model.value ?? [];

  const value = getValue(result, properties);
  const hasValue = hasKey(value);

  if (hasValue)
    selection = selection.filter((s) => getValue(s, properties) !== value);
  else selection.push(result);

  model.value = selection;
  onChange(selection as any);
};

const clear = () => {
  isOpen.value = false;

  model.value = [];
  onChange([] as any);
};

const close = () => {
  isOpen.value = false;
};

const selectedIds = computed(
  () => model.value?.map((m) => getValue(m, properties)) ?? [],
);

const hasKey = (field: any) => selectedIds.value.includes(field);

const styles = computed(() => mergeStyles(properties.styles));
const style = computed(() =>
  buildInputStyle(styles.value.control.select, properties),
);

const hasValue = (item) => {
  return hasKey(getValue(item, properties));
};
</script>
