<template>
  <div class="flex gap-2 items-center">
    <SelectComponent
      size="sm"
      :value="modelValue.key"
      @change="update('key', $event.value)"
      :options="fields"
      :clearable="false"
    />
    <SelectComponent
      size="sm"
      :value="modelValue.operator"
      @change="onOperatorChange($event.value)"
      :options="OperatorOptions"
      :clearable="false"
    />
    <Input
      v-if="!noValue"
      size="sm"
      placeholder="Enter a value"
      :value="modelValue.value"
      @input="update('value', ($event.target as HTMLInputElement).value)"
      :clearable="true"
    />
    <div v-else class="flex-1 min-w-0" />
    <Btn
      :icon="IconEnum.Delete"
      size="xs"
      :outline="true"
      color="error"
      :no-border="true"
      @click="$emit('remove')"
      tooltip="Remove filter"
    />
  </div>
</template>

<script setup lang="ts">
import { Btn, IconEnum, Input, SelectComponent } from '@ghentcdh/ui';
import { computed } from 'vue';
import { type Filter, OperatorNoValue, OperatorOptions, type OperatorType } from '@ghentcdh/json-forms-core';

export type FieldOption = { label: string; value: string };

const props = defineProps<{
  modelValue: Filter;
  fields: FieldOption[];
}>();

const emit = defineEmits<{
  'update:modelValue': [value: Filter];
  remove: [];
}>();

const noValue = computed(() => OperatorNoValue.has(props.modelValue.operator));

const update = (key: keyof Filter, value: any) => {
  emit('update:modelValue', { ...props.modelValue, [key]: value });
};

/** When switching to a no-value operator, clear the value field. */
const onOperatorChange = (op: OperatorType) => {
  emit('update:modelValue', {
    ...props.modelValue,
    operator: op,
    value: OperatorNoValue.has(op) ? '' : props.modelValue.value,
  });
};
</script>
