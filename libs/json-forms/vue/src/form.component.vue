<script setup lang="ts">
import type { JsonFormsRendererRegistryEntry } from '@jsonforms/core';
import { JsonForms } from '@jsonforms/vue';
import { provide, ref } from 'vue';

import { Debugger } from '@ghentcdh/tools-vue';
import { myStyles } from '@ghentcdh/ui';

import type { FormEventPayload } from './composables/useFormEvents';
import { provideFormEvents } from './composables/useFormEvents';
import { tailwindRenderers } from './renderes';

type Data = {
  [key: string]: any;
};

export type SubmitFormEvent = {
  data: Data;
  valid: boolean;
};

const properties = withDefaults(
  defineProps<{
    id: string;
    schema: any;
    uischema: any;
    renderers?: JsonFormsRendererRegistryEntry[];
    disabled?: boolean;
  }>(),
  {
    disabled: false,
    renderers: undefined,
  },
);

const formData = defineModel<any>();
const emits = defineEmits<{
  (e: 'valid', valid: boolean): void;
  (e: 'change', data: Data): void;
  (e: 'submit', event: SubmitFormEvent): void;
  (e: 'errors', errors: any[]): void;
  (e: 'events', payload: FormEventPayload): void;
}>();
const valid = ref(false);

provideFormEvents((payload) => {
  console.log('form events', payload);
  emits('events', payload);
});

const onChange = (event: Data) => {
  formData.value = event.data;
  valid.value = event.errors.length === 0;
  emits('valid', valid.value);
  emits('change', event.data);
  emits('errors', event.errors);
  Debugger.debug(event.errors);
};

const onSubmit = (event: SubmitEvent) => {
  event.preventDefault();

  emits('submit', {
    data: formData.value,
    valid: valid.value,
  } as SubmitFormEvent);
};

provide('styles', myStyles);
const renderers = Object.freeze([
  ...(properties.renderers ?? []),
  ...tailwindRenderers,
]);
</script>

<template>
  <form :id="id" @on-submit="onSubmit">
    <json-forms
      :key="id"
      :data="formData"
      :schema="schema"
      :uischema="uischema"
      :renderers="renderers"
      :enabled="!disabled"
      @change="onChange"
      @submit="onSubmit"
    />
  </form>
</template>
