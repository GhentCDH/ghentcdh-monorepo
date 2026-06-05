import type { ControlElement, JsonSchema } from '@jsonforms/core';
import type { FieldContext } from 'vee-validate';
import { computed } from 'vue';

import type { AutocompleteAllOptions, SelectOptions } from '@ghentcdh/json-forms-core';

import { useCustomControlBinding } from './UseControlBinding';

const useSelectInput =
  (...fields: string[]) =>
  (uischema: ControlElement, schema: JsonSchema, field: FieldContext) => {
    const opts = (uischema.options ?? {}) as Record<string, any>;
    return computed(() => {
      return Object.fromEntries(fields.filter((f) => f in opts).map((f) => [f, opts[f]]));
    });
  };

export const useSelectBinding = useCustomControlBinding<SelectOptions>({
  useProps: useSelectInput('options', 'values', 'uri', 'resource', 'dataField', 'labelKey', 'valueKey', 'clearable', 'storeValue'),
});

export const useAutocompleteBinding =
  useCustomControlBinding<AutocompleteAllOptions>({
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
