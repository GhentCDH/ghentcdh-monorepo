<template>
  <Checkbox
    v-bind="controlWrapper"
    :model-value="control.data"
    :enabled="control.enabled"
    :config="appliedOptions"
    @change="handleChange"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>

<script lang="ts" setup>
import type { ControlElement } from '@jsonforms/core';
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue';

import { Checkbox } from '@ghentcdh/ui';

import { useVanillaControlCustom } from '../../utils/vanillaControl';

const props = defineProps({ ...rendererProps<ControlElement>() });
const {
  control,
  handleChange: _handleChange,
  appliedOptions,
  onFocus,
  onBlur,
  controlWrapper,
} = useVanillaControlCustom(useJsonFormsControl(props), (target) => {
  if (!target.value) {
    handleChange(false);
  }
  return Boolean(target.value) ?? false;
});
const handleChange = (result: boolean) => {
  const { path } = control.value;
  _handleChange(path, result);
};
</script>
