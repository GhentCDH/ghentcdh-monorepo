
<template>
  <form
    :id="id"
    @submit.prevent="onSubmit"
  >
    <json-forms
      :key="id"
      :data="formData"
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
import { provide, ref } from 'vue';

import { Debugger } from '@ghentcdh/tools-vue';
import { myStyles } from '@ghentcdh/ui';

import { provideFormEvents } from './composables/useFormEvents';
import type { FormEventPayload } from './composables/useFormEvents';
import {
  FormComponentEmits,
  FormComponentProperties,
} from './form.component.properties';
import type { Data, SubmitFormEvent } from './form.component.properties';
import { tailwindRenderers } from './renderes';

const properties = defineProps(FormComponentProperties);
const emits = defineEmits(FormComponentEmits);
const formData = defineModel<any>();
const valid = ref(false);

provideFormEvents((payload: FormEventPayload) => {
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