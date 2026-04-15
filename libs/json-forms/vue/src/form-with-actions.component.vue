<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import type { FormSchemaModel } from '@ghentcdh/json-forms-core';
import { Alert, Btn, Collapse, Color } from '@ghentcdh/ui';

import type { FormEventPayload } from './composables/useFormEvents';
import FormComponent from './form.component.vue';
import { FormStore } from './form.store';

const properties = defineProps<{
  id: string;
  createTitle: string;
  updateTitle?: string;
  schema?: any;
  uiSchema?: any;
  uri?: string;
  /**
   * @deprecated Use `schema`, `uiSchema` and `uri` props instead.
   */
  formSchema?: Pick<FormSchemaModel, 'form' | 'uri'>;
}>();
const valid = ref(false);
const formData = defineModel<any>();
const submitted = ref(false);

const resolvedSchema = computed(
  () => properties.schema ?? properties.formSchema?.form.schema,
);
const resolvedUischema = computed(
  () => properties.uiSchema ?? properties.formSchema?.form.uiSchema,
);
const resolvedUri = computed(
  () => properties.uri ?? properties.formSchema?.uri,
);

const store = ref(resolvedUri.value ? new FormStore(uri) : null);

watch(resolvedUri, (uri) => {
  store.value = uri ? new FormStore(uri) : null;
});

const emits = defineEmits<{
  (e: 'success'): void;
  (e: 'submit', data: any): void;
  (e: 'valid', valid: boolean): void;
  (e: 'events', payload: FormEventPayload): void;
}>();

const save = () => {
  submitted.value = true;
  if (!valid.value) {
    return;
  }

  if (store.value) {
    store.value.save(formData.value.id, formData.value).then(() => {
      emits('success');
    });
  } else {
    emits('submit', formData.value);
  }
};

const clear = () => {
  formData.value = { id: null };
  submitted.value = false;
};

const onValid = (v: boolean) => {
  submitted.value = false;
  valid.value = v;
  emits('valid', v);
};

const title = computed(() => {
  if (!properties.updateTitle) return properties.createTitle;

  return formData.value?.id ? properties.updateTitle : properties.createTitle;
});
</script>

<template>
  <Collapse :title="title">
    <FormComponent
      :id="`form_${id}`"
      v-model="formData"
      :schema="resolvedSchema"
      :uischema="resolvedUischema"
      @valid="onValid($event)"
      @submit="save"
      @events="emits('events', $event)"
    />
    <div class="card-actions flex justify-between">
      <div>
        <Alert
          v-if="!valid && submitted"
          message="The form is not valid"
          type="error"
        />
      </div>
      <div class="flex justify-end gap-2">
        <slot name="actions" />
        <Btn v-if="!formData.id" :outline="true" @click="clear"> Clear </Btn>
        <Btn :color="Color.primary" :disabled="submitted" @click="save">
          Save
        </Btn>
      </div>
    </div>
  </Collapse>
</template>
