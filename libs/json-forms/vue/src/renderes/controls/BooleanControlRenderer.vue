<template>
  <Checkbox
    v-bind="controlWrapper"
    v-model="control.data"
    :enabled="control.enabled"
    :config="appliedOptions"
    @change="onChange"
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
const { control, onChange, appliedOptions, onFocus, onBlur, controlWrapper } =
  useVanillaControlCustom(useJsonFormsControl(props), (target) => {
    return Boolean(target.value) ?? false;
  });
</script>
