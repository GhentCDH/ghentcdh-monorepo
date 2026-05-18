<template>
  <Modal
    v-bind="properties"
    :open="true"
    :disable-close="false"
    :width="modalSize"
    @close-modal="onCancel"
  >
    <template #content>
      <slot name="content-before" />

      <FormComponent
        :id="`modal-${id}`"
        ref="formRef"
        :form-data="formData"
        :schema="schema"
        :ui-schema="uiSchema"
        :error-mode="errorMode"
        @errors="onErrors"
        @change="onChange"
        @events="emits('events', $event)"
      />
      <slot name="content-after" />
    </template>
    <template #actions>
      <Btn
        :color="Color.secondary"
        :outline="true"
        aria-label="Cancel"
        @click="onCancel"
      >
        Cancel
      </Btn>
      <Btn :disabled="!valid" aria-label="Save" @click="onSubmit"> Save </Btn>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import { Btn, Color, Modal } from '@ghentcdh/ui';

import { FormModalEmits, FormModalProperties } from './FormModal.properties';
import FormComponent from '../FormComponent.vue';
import { isEmpty } from 'lodash-es';

const properties = defineProps(FormModalProperties);

const id = `modal_${Math.floor(Math.random() * 1000)}`;

const formRef = ref<InstanceType<typeof FormComponent>>();
const valid = ref(false);
const formData = defineModel<any>();
const emits = defineEmits(FormModalEmits);

if (properties.data) {
  formData.value = properties.data;
}

const onValid = (v: boolean) => {
  valid.value = v;
};

const onCancel = () => {
  formData.value = {};
  emits('closeModal', null);
};

const onChange = (data: any) => {
  formData.value = data;
};

const onSubmit = () => {
  formRef.value?.markSubmitted();
  if (!valid.value) return;
  emits('closeModal', { data: formData.value, valid: valid.value });
};
const onErrors = (errors: any) => {
  emits('errors', errors);
  valid.value = isEmpty(errors);
};

watch(valid, (newValid, oldValid) => {
  if (newValid !== oldValid) {
    emits('valid', newValid);
  }
});
</script>
