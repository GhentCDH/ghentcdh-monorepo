import { useVanillaControl } from '@jsonforms/vue-vanilla';
import { omit, pick } from 'lodash-es';
import type { Ref } from 'vue';
import { computed, ref } from 'vue';

import type { ControlOption } from '@ghentcdh/json-forms-core';

export const useVanillaControlCustom = <
  OPTIONS extends ControlOption,
  I extends { control: any; handleChange: any },
>(
  input: I,
  adaptTarget: (target: any) => any = (v) => v.value,
) => {
  const vanillaControl = useVanillaControl(input, adaptTarget);

  const isTouched = ref(false);

  const isFocused = ref(false);

  const onFocus = () => {
    isFocused.value = true;
  };

  const onBlur = () => {
    isTouched.value = true;
    isFocused.value = false;
  };

  const controlWrapper = computed(() => {
    return {
      ...vanillaControl.controlWrapper.value,
      ...omit(vanillaControl.appliedOptions.value, 'styles'),
      ...pick(vanillaControl.appliedOptions.value.styles, ['width']),
      isFocused: isFocused.value,
      isTouched: isTouched.value,
    } as any;
  });

  return {
    ...vanillaControl,
    appliedOptions: vanillaControl.appliedOptions as Ref<OPTIONS>,
    controlWrapper,
    isFocused,
    isTouched,
    onFocus,
    onBlur,
    // handleChange,
  };
};
