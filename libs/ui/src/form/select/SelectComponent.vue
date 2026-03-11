<template>
  <SelectWrapper
    v-bind="properties"
    :options="values"
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
import { computed, ref, watch } from 'vue';

import type { OptionValue } from './ListResults.properties';
import { SelectProperties } from './SelectWrapper.properties';
import SelectWrapper from './SelectWrapper.vue';
import type { ControlEmits } from '../core/emits';
import { mergeStyles } from '../core/styles';
import { useOptions } from './composables/useOptions';
import { buildInputStyle } from '../core/utils/style';

const isOpen = ref(false);
const properties = defineProps(SelectProperties);
const emit = defineEmits<ControlEmits>();
const model = defineModel();

const optionsHelper = useOptions(properties);
const { options: values } = optionsHelper;

watch(
  () => properties.options,
  () => {
    optionsHelper.setOptions(properties.options);
  },
  { immediate: true },
);

const onChange = (event: Event) => {
  emit('change', event);
};

const displayValue = computed(() =>
  model.value ? optionsHelper.getLabels(model.value)[0] : '',
);

const styles = computed(() => mergeStyles(properties.styles));
const style = computed(() =>
  buildInputStyle(styles.value.control.select, properties),
);

const select = (result: OptionValue) => {
  const original = optionsHelper.getOriginal(result);
  model.value = original;
  onChange(original);
};

const clear = () => {
  isOpen.value = false;

  model.value = null;
  onChange(undefined);
};

const hasValue = (item: OptionValue) => {
  const selectedValue = optionsHelper.getValues(model.value)?.[0];
  return selectedValue === item.value;
};

const close = () => {
  isOpen.value = false;
};
</script>
