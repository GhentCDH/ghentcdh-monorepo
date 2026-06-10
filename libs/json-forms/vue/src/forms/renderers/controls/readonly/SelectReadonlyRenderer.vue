<template>
  <ReadonlyWrapper v-bind="wrapper">
    <button
      v-if="canView"
      type="button"
      class="inline-flex max-w-full items-center gap-1 rounded border border-base-300 px-2 py-0.5 text-left text-primary hover:bg-base-200"
      :title="'View'"
      @click="view()"
    >
      <span class="truncate">{{ label }}</span>
      <Icon
        :icon="IconEnum.View"
        size="sm"
      />
    </button>
    <span v-else>{{ label }}</span>
  </ReadonlyWrapper>
</template>

<script setup lang="ts">
import type { ControlElement, JsonSchema } from '@jsonforms/core';
import { computed } from 'vue';

import { Icon, IconEnum, ReadonlyWrapper } from '@ghentcdh/ui';

import { EMPTY_VALUE } from './constants';
import { useFormEvents } from '../../../../composables/useFormEvents';
import { scopeToPath } from '../../../scope';
import { useSelectBinding } from '../composables/useSelectBinding';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const { value, appliedOptions, wrapper } = useSelectBinding(
  props.uischema,
  props.schema,
);

const label = computed(() => {
  const w = wrapper.value as any;
  const displayValue = w?.displayValue;
  const labelKey = w?.labelKey ?? 'label';
  const valueKey = w?.valueKey ?? 'value';
  const resolved =
    displayValue && typeof displayValue === 'object'
      ? (displayValue[labelKey] ?? displayValue[valueKey])
      : displayValue;
  return resolved ?? EMPTY_VALUE;
});

const canView = computed(
  () => !!value.value && !!appliedOptions.value.resource,
);

const formEvents = useFormEvents();
const view = () => {
  const options = appliedOptions.value;
  const path = scopeToPath(props.uischema.scope);
  const valueKey = (options.valueKey as string) ?? 'value';
  const raw = value.value as any;
  const id =
    (wrapper.value as any)?.displayValue?.[valueKey] ??
    (raw && typeof raw === 'object' ? raw[valueKey] : raw);
  if (id) {
    formEvents.dispatch({
      event: 'view',
      type: path,
      data: value.value,
      id,
      options,
    });
  }
};
</script>
