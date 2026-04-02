<template>
  <SelectComponent
    v-bind="controlWrapper"
    :model-value="control.data"
    :enabled="control.enabled"
    :options="appliedOptions?.options"
    @change="handleChange"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>

<script lang="ts" setup>
import type { ControlElement } from '@jsonforms/core';
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue';

import { SelectComponent } from '@ghentcdh/ui';

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

const handleChange = (result: any) => {
  const { path } = control.value;

  _handleChange(path, result);
};
</script>
