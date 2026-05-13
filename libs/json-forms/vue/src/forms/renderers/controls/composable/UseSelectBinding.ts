import { useCustomControlBinding } from './UseControlBinding';
import { computed } from 'vue';
import type { ControlElement, JsonSchema } from '@jsonforms/core';
import type { FieldContext } from 'vee-validate';
import { SelectOptions } from '@ghentcdh/json-forms-core';
import { pick } from 'lodash-es';

const useSelectInput =
  (...fields: string[]) =>
  (uischema: ControlElement, schema: JsonSchema, field: FieldContext) => {
    const opts = (uischema.options ?? {}) as Record<string, any>;
    return computed(() => {
      return pick(opts, fields);
    });
  };

export const useSelectBinding = useCustomControlBinding<SelectOptions>({
  useProps: useSelectInput('options', 'labelKey', 'valueKey'),
});

export const useAutocompleteBinding = useCustomControlBinding<SelectOptions>({
  useProps: useSelectInput(
    'options',
    'labelKey',
    'valueKey',
    'uri',
    'freeText',
    'enableCreate',
    'dataField',
    'skipAuth',
  ),
});
