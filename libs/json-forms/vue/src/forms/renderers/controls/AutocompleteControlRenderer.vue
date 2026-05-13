<template>
  <Autocomplete
    v-bind="bindProperties"
    :model-value="value"
    :enabled="wrapper.enabled"
    :fetch-options="fetchOptions"
    @change="onChange"
    @create="onCreate"
  />
</template>

<script setup lang="ts">
import type { ControlElement, JsonSchema } from '@jsonforms/core';
import axios from 'axios';
import { computed } from 'vue';

import type { AutocompleteRemoteOptions } from '@ghentcdh/json-forms-core';
import { useApi } from '@ghentcdh/tools-vue';
import { Autocomplete } from '@ghentcdh/ui';

import { useFormEvents } from '../../../composables/useFormEvents';
import { scopeToPath } from '../../scope';
import { useControlBinding } from './composable/UseControlBinding';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const { wrapper, value, field } = useControlBinding(
  props.uischema,
  props.schema,
);

const bindProperties = computed(() => ({
  ...wrapper.value,
  enableCreate: !!(props.uischema.options as any)?.enableCreate,
}));

const fetchOptions = computed(() => {
  const options = (props.uischema.options ?? {}) as AutocompleteRemoteOptions;

  if (!options.uri) return null;

  return (searchTerm: string, signal: AbortSignal) => {
    const fetch = options.skipAuth ? axios : useApi();
    return fetch
      .get(`${options.uri}${searchTerm}`, { signal })
      .then((data: any) => data.data[options.dataField ?? 'data']);
  };
});

const onChange = (val: any) => {
  field.setValue(val);
};

const formEvents = useFormEvents();
const path = scopeToPath(props.uischema.scope);

const onCreate = () => {
  formEvents.dispatch({
    event: 'create',
    type: path,
    data: value.value,
    onSuccess: (result) => {
      field.setValue(result);
    },
  });
};
</script>
