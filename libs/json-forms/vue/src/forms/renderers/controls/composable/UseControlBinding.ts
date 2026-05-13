import type { ControlElement, JsonSchema } from '@jsonforms/core';
import { useField } from 'vee-validate';
import { inject } from 'vue';

import { scopeToPath } from '../../../scope';

import type { UseInputOptions } from './UseInput';
import { useInputProps } from './UseInput';

export const useControlBinding = (
  uischema: ControlElement,
  schema: JsonSchema,
  options: UseInputOptions = {},
) => {
  const pathPrefix = inject<string>('pathPrefix', '');
  const scopePath = scopeToPath(uischema.scope);
  const path = pathPrefix ? `${pathPrefix}.${scopePath}` : scopePath;

  const field = useField<unknown>(() => path);
  const wrapper = useInputProps(uischema, schema, field, options);

  return { wrapper, value: field.value, field };
};
