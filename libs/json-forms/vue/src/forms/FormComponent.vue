<template>
  {{ errors }}
  {{ formData }}
  <form
    :id="id"
    @submit.prevent="onSubmit"
  >
    <Dispatch
      :uischema="uiSchema"
      :schema="schema"
    />
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { computed, onMounted, provide, ref, toRaw, toRef, watch } from 'vue';
import { fromJSONSchema } from 'zod';

import { enforceRequiredStringMinLength } from '@ghentcdh/json-forms-core';
import { myStyles } from '@ghentcdh/ui';

import Dispatch from './Dispatch.vue';
import type { Data, SubmitFormEvent } from './FormComponent.properties';
import {
  JsonFormComponentEmits,
  JsonFormComponentProperties,
} from './FormComponent.properties';
import { registerZodErrorMap } from './errorMessages';
import { ERROR_MODE_KEY, FORM_SUBMITTED_KEY } from './errorMode';
import { customRenderes } from './renderes';
import type { FormEventPayload } from '../composables/useFormEvents';
import { provideFormEvents } from '../composables/useFormEvents';

registerZodErrorMap();

const properties = defineProps(JsonFormComponentProperties);
const emits = defineEmits(JsonFormComponentEmits);

const zodSchema = computed(() => {
  if (!properties.schema) return undefined;
  try {
    const patched = enforceRequiredStringMinLength(properties.schema);
    return fromJSONSchema(patched);
  } catch {
    return undefined;
  }
});

const { values, errors, meta, setValues, validate } = useForm({
  validationSchema: zodSchema as any,
  initialValues: properties.formData as Record<string, unknown>,
});

provide('renderers', customRenderes);
provide('rootSchema', properties.schema);
provide('styles', myStyles);

const submitted = ref(false);
provide(ERROR_MODE_KEY, toRef(properties, 'errorMode'));
provide(FORM_SUBMITTED_KEY, submitted);

// Validate on mount to emit accurate initial validity state.
// This does NOT set touched/dirty, so errors only display per errorMode rules.
onMounted(async () => {
  const result = await validate();
  emits('valid', result.valid);
});

provideFormEvents((payload: FormEventPayload) => {
  emits('events', payload);
});

// Sync external formData changes into vee-validate
watch(
  () => properties.formData,
  (newData) => {
    if (!newData) return;
    if (JSON.stringify(newData) === JSON.stringify(toRaw(values))) return;
    setValues(newData as Record<string, unknown>);
  },
  { deep: true },
);

// Emit changes when vee-validate values change
watch(
  values,
  (newValues) => {
    const isValid = meta.value.valid;
    emits('valid', isValid);
    emits('change', toRaw(newValues) as Data);
  },
  { deep: true },
);

// Emit errors when they change
watch(
  errors,
  (newErrors) => {
    const errorList = Object.entries(newErrors)
      .filter(([, msg]) => !!msg)
      .map(([path, message]) => ({ path, message }));
    emits('errors', errorList);
  },
  { deep: true },
);

const onSubmit = () => {
  submitted.value = true;
  emits('submit', {
    data: toRaw(values) as Data,
    valid: meta.value.valid,
  } as SubmitFormEvent);
};

const markSubmitted = () => {
  submitted.value = true;
};

defineExpose({ markSubmitted });
</script>
