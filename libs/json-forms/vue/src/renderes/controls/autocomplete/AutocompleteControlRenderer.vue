<template>
  <Autocomplete
    v-bind="controlWrapper"
    v-model="control.data"
    :enabled="control.enabled"
    :config="appliedOptions"
    :label-key="field?.label"
    :value-key="field?.id"
    @change="handleChange"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>

<script lang="ts" setup>
import type { ControlElement } from '@jsonforms/core';
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue';
import { computed } from 'vue';

import { Autocomplete } from '@ghentcdh/ui';

import { useVanillaControlCustom } from '../../../utils/vanillaControl';

const props = defineProps({ ...rendererProps<ControlElement>() });
const {
  control,
  handleChange: _handleChange,
  appliedOptions,
  onFocus,
  onBlur,
  controlWrapper,
} = useVanillaControlCustom(useJsonFormsControl(props));

const field = computed(() => appliedOptions.value.field);

const handleChange = (result: any) => {
  const { path } = control.value;

  _handleChange(path, result);
};
</script>
