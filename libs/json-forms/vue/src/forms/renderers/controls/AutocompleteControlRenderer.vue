<template>
  <Autocomplete
    v-if="fetchOptions"
    v-bind="wrapper"
    :model-value="value"
    :fetch-options="fetchOptions.fetchOptions"
    :label-key="fetchOptions.labelKey"
    :value-key="fetchOptions.valueKey"
    :enable-create="fetchOptions.enableCreate"
    @change="onChange"
    @blur="onBlur"
    @create="onCreate"
  />
</template>

<script setup lang="ts">
import type { ControlElement, JsonSchema } from '@jsonforms/core';
import { computedAsync } from '@vueuse/core';
import { pick } from 'lodash-es';

import type { AutocompleteAllOptions } from '@ghentcdh/json-forms-core';
import { Autocomplete } from '@ghentcdh/ui';

import { useFormEvents } from '../../../composables/useFormEvents';
import { scopeToPath } from '../../scope';
import { useFetchOptions } from './composable/UseFetchOption';
import { useAutocompleteBinding } from './composable/UseSelectBinding';
import { JsonFormModalService } from '../../modal/FormModalService';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const {
  wrapper,
  value,
  field,
  onBlur,
  onChange: onFieldChange,
  appliedOptions,
} = useAutocompleteBinding(props.uischema, props.schema);

const fetchOptions = computedAsync(async () => {
  const config = await useFetchOptions(
    appliedOptions.value as AutocompleteAllOptions,
  );
  return config;
});

const onChange = (val: any) => {
  setValue(val);
  onFieldChange();
};

const formEvents = useFormEvents();
const path = scopeToPath(props.uischema.scope);

const setValue = (result: Record<string, unknown>) => {
  if (!result || !fetchOptions.value) {
    field.setValue(result);
    return;
  }

  const { valueKey, labelKey } = fetchOptions.value;
  const keys = [valueKey, labelKey].filter(Boolean) as string[];

  if (keys.length === 0) {
    field.setValue(result);
    return;
  }

  const stripped = pick(result, keys);
  field.setValue(stripped);
};

const onCreate = () => {
  if (fetchOptions.value?.enableCreate === false) return;
  const form = fetchOptions.value!.form!;
  if (form) {
    JsonFormModalService.openModal({
      schema: form.json_schema,
      uiSchema: form.ui_schema,
      modalTitle: `Create new ${wrapper.value.label}`,
      onClose: (result) => {
        if (!result || !result.valid) return;
        form.create(result.data).then((res) => {
          setValue(res);
        });
      },
    });
    return;
  }

  formEvents.dispatch({
    event: 'create',
    type: path,
    data: value.value,
    onSuccess: setValue,
  });
};
</script>
