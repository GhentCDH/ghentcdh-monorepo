<script setup lang="ts">
import { computed, ref } from 'vue';

import type { FormSchemaModel } from '@ghentcdh/json-forms-core';
import { Alert, Btn, Collapse, Color } from '@ghentcdh/ui';

import FormComponent from './form.component.vue';
import { FormStore } from './form.store';

const properties = defineProps<{
  id: string;
  createTitle: string;
  updateTitle?: string;
  formSchema: Pick<FormSchemaModel, 'form' | 'uri'>;
}>();
const valid = ref(false);
const formData = defineModel<any>();
const submitted = ref(false);
const store = new FormStore(properties.formSchema);

const emits = defineEmits(['success']);

const save = () => {
  submitted.value = true;
  if (!valid.value) {
    return;
  }
  store.save(formData.value.id, formData.value).then(() => {
    emits('success');
  });
};

const clear = () => {
  formData.value = { id: null };
  submitted.value = false;
};

const onValid = (v: boolean) => {
  submitted.value = false;
  valid.value = v;
};

const title = computed(() => {
  if (!properties.updateTitle) return properties.createTitle;

  return formData.value?.id ? properties.updateTitle : properties.createTitle;
});
</script>

<template>
  <Collapse :title="title">
    <FormComponent
      :id="`form_${properties.id}`"
      v-model="formData"
      :schema="formSchema.form.schema"
      :uischema="formSchema.form.uiSchema"
      @valid="onValid($event)"
      @submit="save"
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
        <Btn
          v-if="!formData.id"
          :outline="true"
          @click="clear"
        >
          Clear
        </Btn>
        <Btn
          :color="Color.primary"
          :disabled="submitted"
          @click="save"
        >
          Save
        </Btn>
      </div>
    </div>
  </Collapse>
</template>
