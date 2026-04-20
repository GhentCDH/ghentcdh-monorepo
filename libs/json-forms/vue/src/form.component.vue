<template>
  <form :id="id" @submit.prevent="onSubmit">
    <json-forms
      :key="id"
      :data="internalFormData"
      :schema="schema"
      :uischema="uiSchema"
      :renderers="renderers"
      :enabled="!disabled"
      @change="onChange"
      @submit="onSubmit"
    />
  </form>
</template>

<script setup lang="ts">
import { JsonForms } from '@jsonforms/vue';
import { computed, provide, ref, watch } from 'vue';
import { fromJSONSchema } from 'zod';

import { Debugger } from '@ghentcdh/tools-vue';
import { myStyles } from '@ghentcdh/ui';

import type { FormEventPayload } from './composables/useFormEvents';
import { provideFormEvents } from './composables/useFormEvents';
import type { Data, SubmitFormEvent } from './form.component.properties';
import { FormComponentEmits, FormComponentProperties } from './form.component.properties';
import { tailwindRenderers } from './renderes';

const properties = defineProps(FormComponentProperties);
const emits = defineEmits(FormComponentEmits);
const valid = ref(false);
const zodSchema = computed(() => fromJSONSchema(properties.schema));

const stripFormData = (data: any) => {
  const safeParse = zodSchema.value?.strip().safeParse(data);
  return safeParse?.success ? safeParse.data : (data ?? {});
};

const internalFormData = ref(properties.formData ?? {});

watch(
  () => properties.formData,
  (data, oldData) => {
    if (JSON.stringify(data) === JSON.stringify(internalFormData.value)) return;
    internalFormData.value = stripFormData(data);
    emits('change', internalFormData.value);
  },
  { deep: true, immediate: true },
);

provideFormEvents((payload: FormEventPayload) => {
  emits('events', payload);
});

const onChange = (event: Data) => {
  internalFormData.value = event.data;
  valid.value = event.errors.length === 0;
  emits('valid', valid.value);
  emits('change', internalFormData.value);
  emits('errors', event.errors);
  Debugger.debug(event.errors);
};

const onSubmit = (event: SubmitEvent) => {
  event.preventDefault();
  emits('submit', {
    data: internalFormData.value,
    valid: valid.value,
  } as SubmitFormEvent);
};

provide('styles', myStyles);
const renderers = Object.freeze([
  ...(properties.renderers ?? []),
  ...tailwindRenderers,
]);
</script>
