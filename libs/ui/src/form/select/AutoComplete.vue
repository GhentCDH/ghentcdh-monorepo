<template>
  <SelectWrapper
    v-bind="props"
    :options="results"
    :is-loading="isLoading"
    :is-open="isOpen"
    :query="query"
    @close="close"
    @select="select"
    @clear="clear"
  >
    <input
      ref="inputRef"
      type="input"
      role="combobox"
      :aria-expanded="isOpen"
      aria-autocomplete="list"
      aria-haspopup="listbox"
      autocomplete="off"
      autocorrect="off"
      spellcheck="false"
      :class="[style, width]"
      :value="query"
      :placeholder="placeholder"
      :disabled="!enabled"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />
  </SelectWrapper>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue';

import {
  AutoCompleteEmits,
  AutocompleteProperties,
} from './AutoComplete.properties';
import { getLabel, getValue } from './ListResults.properties';
import SelectWrapper from './SelectWrapper.vue';
import { useAutoCompleteSearch } from './composables/useSearch';
import { buildInputStyle } from '../core/utils/style';
import { mergeStyles } from '../core/styles';

// ─── Props ────────────────────────────────────────────────────────────────────
const props = defineProps(AutocompleteProperties);

const emit = defineEmits(AutoCompleteEmits);

// ─── State ───────────────────────────────────────────────────────────────────
const inputRef = ref(null);
const query = ref('');
const isOpen = ref(false);

const {
  results,
  isLoading,
  triggerSearch,
  clear: clearSearch,
} = useAutoCompleteSearch(props);

// ─── Sync external modelValue → query display ────────────────────────────────
watch(
  () => props.modelValue,
  (val) => {
    if (val === null || val === undefined || val === '') {
      query.value = '';
      return;
    }
    const display = typeof val === 'object' ? val[props.labelKey] : val;
    if (display !== query.value) query.value = display;
  },
  { immediate: true },
);

// ─── Input events ────────────────────────────────────────────────────────────
const onInput = (e) => {
  query.value = e.target.value;
  if (!props.freeText) emit('update:modelValue', '');
  triggerSearch(query.value);
  isOpen.value = true;
};

const onFocus = () => {
  triggerSearch(query.value);
  isOpen.value = true;
};

function onBlur() {
  // Small delay so click on list item fires first
  setTimeout(() => {
    isOpen.value = false;
    // If not free-text and nothing selected, reset
    if (!props.freeText && !props.modelValue) {
      query.value = '';
    }
  }, 150);
}

// ─── Select item ─────────────────────────────────────────────────────────────
const select = (item) => {
  const val = getValue(item, props);
  query.value = getLabel(item, props);
  isOpen.value = false;
  emit(
    'update:modelValue',
    props.options && typeof props.options[0] === 'object' ? item : val,
  );
  emit('select', item);
};

// ─── Clear ───────────────────────────────────────────────────────────────────
const clear = () => {
  query.value = '';
  clearSearch();
  isOpen.value = false;
  emit('update:modelValue', '');
  emit('clear');
  nextTick(() => inputRef.value?.focus());
};

// ─── Close ───────────────────────────────────────────────────────────────────
const close = () => {
  isOpen.value = false;
};

const styles = computed(() => mergeStyles(props.styles));
const style = computed(() =>
  buildInputStyle(styles.value.control.select, props),
);
</script>
