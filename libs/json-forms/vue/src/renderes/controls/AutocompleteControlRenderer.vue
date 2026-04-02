<template>
  <Autocomplete
    v-bind="bindProperties"
    :model-value="control.data"
    :enabled="control.enabled"
    :fetch-options="fetchOptions"
    @change="handleChange"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>

<script lang="ts" setup>
import type { ControlElement } from '@jsonforms/core';
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue';
import axios from 'axios';
import { computed } from 'vue';

import type { AutocompleteRemoteOptions } from '@ghentcdh/json-forms-core';
import { useApi } from '@ghentcdh/tools-vue';
import { Autocomplete } from '@ghentcdh/ui';

import { useVanillaControlCustom } from '../../utils/vanillaControl';

const props = defineProps({ ...rendererProps<ControlElement>() });
const {
  control,
  handleChange: _handleChange,
  appliedOptions,
  onFocus,
  onBlur,
  controlWrapper,
} = useVanillaControlCustom(useJsonFormsControl(props));

const bindProperties = computed(() => ({
  ...controlWrapper.value,
  ...appliedOptions.value,
}));

const fetchOptions = computed(() => {
  const options = appliedOptions.value as AutocompleteRemoteOptions;

  if (!options.uri) return null;

  return (searchTerm, signal) => {
    const fetch = options.skipAuth ? axios : useApi();
    return fetch
      .get(`${options.uri}${searchTerm}`, { signal })
      .then((data) => data.data[options.dataField ?? 'data']);
  };
});

const handleChange = (result: any) => {
  const { path } = control.value;
  _handleChange(path, result);
};
</script>
