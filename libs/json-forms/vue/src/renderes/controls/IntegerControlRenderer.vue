<template>
  <InputNumber
    v-bind="controlWrapper"
    v-model="control.data"
    :enabled="control.enabled"
    :config="appliedOptions"
    :steps="steps"
    @change="onChange"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>

<script lang="ts" setup>
import type { ControlElement } from '@jsonforms/core';
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue';
import { computed } from 'vue';

import { InputNumber } from '@ghentcdh/ui';

import { useVanillaControlCustom } from '../../utils/vanillaControl';


const props = defineProps({ ...rendererProps<ControlElement>() });
const { control, onChange, appliedOptions, onFocus, onBlur, controlWrapper } =
  useVanillaControlCustom(useJsonFormsControl(props), (target) =>
    target.value === '' ? undefined : Number(target.value),
  );
const steps = computed(() => appliedOptions.value.steps ?? 1);
</script>
