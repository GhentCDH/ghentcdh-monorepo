<template>
  <ControlWrapper v-bind="properties">
    <input
      v-model="query"
      autocomplete="off"
      type="text"
      :class="[style]"
      :disabled="!enabled"
      @focus="onFocus"
      @blur="onBlur"
      @click="openValues"
    >
    <div v-click-outside="() => (results = [])">
      <ul
        v-if="results?.length"
        :class="[
          `bg-base-100 w-52 shadow -mt-5
        absolute z-50`,
        ]"
      >
        <li
          v-for="(result, index) in results"
          :key="result[valueKey]"
        >
          <button
            class="w-full h-8 border-b-1 border-gray-200 border-x-0 border-t-0 px-4 py-2 text-left hover:bg-primary-content cursor-pointer"
            type="button"
            @click="selectResult(result)"
            @blur="leaveResult(index)"
          >
            {{ getLabel(result) }}
          </button>
        </li>
      </ul>
    </div>
  </ControlWrapper>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';

import type { ResponseData } from '@ghentcdh/core/types';
import { apiNoAuth, useApi } from '@ghentcdh/tools-vue';

import ControlWrapper from './core/ControlWrapper.vue';
import type { ControlEmits } from './core/emits';
import type { AutoCompleteProperties } from './core/properties';
import { DefaultAutoCompleteProperties } from './core/properties';
import { buildInputStyle } from './core/utils/style';

const properties = withDefaults(
  defineProps<AutoCompleteProperties>(),
  DefaultAutoCompleteProperties(),
);

const emit = defineEmits<ControlEmits>();
const model = defineModel();
const query = ref('');

const onChange = (event: Event) => {
  emit('change', event);
};
const onFocus = (event: FocusEvent) => {
  emit('focus', event);
};
const onBlur = (event: Event) => {
  emit('blur', event);
};

const selectValue = ref(false);
const results = ref<any[]>([]);

const selectResult = (result: any) => {
  selectValue.value = true;
  handleChange(result);
};

const handleChange = (result: any) => {
  model.value = result;
  onChange(result);
};

const leaveResult = (index: number) => {
  if (results.value?.length === index + 1) results.value = [];
  // TODO handle the change
};

const getValueField = (field: any) => field[properties.valueKey];
const getLabel = (field: any) => field?.[properties.labelKey] ?? '';

watch(
  () => model.value,
  (value) => {
    if (value && !getValueField(value)) return;
    selectValue.value = true;
    results.value = [];
    query.value = getLabel(value);
  },
  { immediate: true },
);

watch(
  () => query.value,
  (query) => {
    // If the field is set through the input don't run the query
    if (selectValue.value) {
      selectValue.value = false;
      return;
    }

    searchForValue(query);
  },
);

const searchForValue = (query: string) => {
  //Option to allow new values
  handleChange({ [properties.labelKey]: query });

  if (properties.config) {
    const { uri, skipAuth, dataField } = properties.config;
    const httpRequest = properties.config.skipAuth ? apiNoAuth : useApi();

    httpRequest.get<ResponseData<any>>(`${uri}${query}`).then((data: any) => {
      results.value = data.data[dataField!] as [];
    });
  } else if (properties.options) {
    results.value = properties.options
      .filter((option: any) => getLabel(option).toLowerCase().includes(query))
      .slice(0, 10);
  }
};

const openValues = () => {
  if (results.value?.length) return;
  searchForValue(query.value);
};
const style = computed(() =>
  buildInputStyle(properties.styles.control.select, properties),
);
</script>
