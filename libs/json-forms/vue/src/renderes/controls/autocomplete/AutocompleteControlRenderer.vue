<template>
  <Autocomplete
    v-bind="controlWrapper"
    v-model="control.data"
    :enabled="control.enabled"
    :config="appliedOptions"
    :label-key="field?.label"
    :value-key="field?.id"
    @change="onChange"
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
const { control, onChange, appliedOptions, onFocus, onBlur, controlWrapper } =
  useVanillaControlCustom(useJsonFormsControl(props), (target) => {
    return target?.value ?? undefined;
    // return Boolean(target.value) ?? false;
  });

const field = computed(() => appliedOptions.value.field);
</script>
