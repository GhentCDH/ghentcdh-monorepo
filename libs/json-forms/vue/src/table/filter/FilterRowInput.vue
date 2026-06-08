<template>
  <div class="flex gap-2 items-center">
    <select
      class="select select-bordered select-sm flex-1 min-w-0"
      :value="modelValue.key"
      @change="update('key', ($event.target as HTMLSelectElement).value)"
    >
      <option
        v-for="field in fields"
        :key="field.value"
        :value="field.value"
      >
        {{ field.label }}
      </option>
    </select>

    <select
      class="select select-bordered select-sm w-32 shrink-0"
      :value="modelValue.operator"
      @change="update('operator', ($event.target as HTMLSelectElement).value as OperatorType)"
    >
      <option
        v-for="op in Operator"
        :key="op"
        :value="op"
      >
        {{ op }}
      </option>
    </select>

    <input
      class="input input-bordered input-sm flex-1 min-w-0"
      type="text"
      placeholder="Enter a value"
      :value="modelValue.value"
      @input="update('value', ($event.target as HTMLInputElement).value)"
    >

    <button
      type="button"
      class="btn btn-ghost btn-sm btn-square text-error"
      title="Remove filter"
      @click="$emit('remove')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { type Filter, Operator, type OperatorType } from '@ghentcdh/json-forms-core';

export type FieldOption = { label: string; value: string };

const props = defineProps<{
  modelValue: Filter;
  fields: FieldOption[];
}>();

const emit = defineEmits<{
  'update:modelValue': [value: Filter];
  remove: [];
}>();

const update = (key: keyof Filter, value: any) => {
  emit('update:modelValue', { ...props.modelValue, [key]: value });
};
</script>
