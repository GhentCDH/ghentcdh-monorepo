import type { ControlElement, JsonSchema } from '@jsonforms/core';
import type { FieldContext } from 'vee-validate';
import { useField } from 'vee-validate';
import { computed, inject, Ref } from 'vue';
import type { UseInputOptions } from './UseInput';
import { UseInputOptions, useInputProps } from './UseInput';
import { ControlOption } from '@ghentcdh/json-forms-core';
import { scopeToPath } from '../../../scope';

export type useCustomProps = (
  uischema: ControlElement,
  schema: JsonSchema,
  field: FieldContext,
  options: any,
) => Ref<any>;

export const useCustomControlBinding = <
  CONTROL_OPTION extends ControlOption = ControlOption,
>({
  useProps,
  setDefaultValue,
}: {
  useProps?: useCustomProps;
  setDefaultValue?: (field: FieldContext) => void;
} = {}) => {
  return (uischema: ControlElement, schema: JsonSchema, options = {}) => {
    const pathPrefix = inject<string>('pathPrefix', '');
    const scopePath = scopeToPath(uischema.scope);
    const path = pathPrefix ? `${pathPrefix}.${scopePath}` : scopePath;

    const field = useField<unknown>(() => path);
    setDefaultValue?.(field);
    const wrapper = useInputProps(uischema, schema, field, options);
    const customWrapper = useProps?.(uischema, schema, field, options) ?? {
      value: {},
    };

    return {
      wrapper: computed(() => ({ ...wrapper.value, ...customWrapper.value })),
      value: field.value,
      field,
      appliedOptions: computed(
        () => uischema.options ?? ({} as CONTROL_OPTION),
      ),
    };
  };
};

export const useControlBinding = (
  uischema: ControlElement,
  schema: JsonSchema,
  options: UseInputOptions = {},
) => {
  return useCustomControlBinding()(uischema, schema, options);
};
