<template>
  <Collapse :title="title" :height-full="fullHeight">
    <div :class="['flex flex-col', { 'overflow-hidden h-full': scrollable }]">
      <div
        :class="['flex-1', { 'overflow-y-auto overflow-x-hidden': scrollable }]"
      >
        <FormComponent
          :id="`form_${id}`"
          :form-data="formData"
          :schema="schema"
          :ui-schema="uiSchema"
          @change="updateValue"
          @valid="onValid($event)"
          @submit="save"
          @errors="emits('errors', $event)"
          @events="emits('events', $event)"
        />
      </div>
      <div
        class="flex justify-end gap-2 p-2 mt-2 border-t border-gray-300 z-[30] shrink-0"
      >
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
            v-if="recordId"
            aria-label="Cancel"
            :outline="true"
            @click="cancel"
          >
            Cancel
          </Btn>
          <Btn aria-label="Clear" v-else :outline="true" @click="clear">
            Clear
          </Btn>
          <Btn
            aria-label="Save"
            :color="Color.primary"
            :disabled="submitted"
            @click="save"
          >
            Save
          </Btn>
        </div>
      </div>
    </div>
  </Collapse>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { computed, ref, toRaw, watch } from 'vue';

import { Alert, Btn, Collapse, Color } from '@ghentcdh/ui';

import {
  FormWithActionsEmits,
  FormWithActionsProperties,
} from './form-with-actions.component.properties';
import FormComponent from './form.component.vue';
import { FormStore } from './form.store';

const properties = defineProps({
  ...FormWithActionsProperties,
  modelValue: { type: Object as PropType<any>, default: () => ({}) },
});
const emits = defineEmits(FormWithActionsEmits);

const formData = ref<any>(properties.modelValue);
const initialFormData = ref<any>(structuredClone(toRaw(properties.modelValue)));
const recordId = ref(properties.modelValue?.id ?? null);
const valid = ref(false);
const submitted = ref(false);

// Only fires when the parent changes v-model from outside
watch(
  () => properties.modelValue,
  (newValue, oldValue) => {
    if (newValue === formData.value) return;
    recordId.value = newValue?.id ?? null;
    initialFormData.value = structuredClone(toRaw(newValue));
    formData.value = newValue;
  },
);

const store = computed(() =>
  properties.uri ? new FormStore(properties.uri) : null,
);

const updateValue = (data: any) => {
  formData.value = data;
  emits('update:modelValue', data);
};

const save = () => {
  submitted.value = true;
  if (!valid.value) {
    return;
  }

  if (store.value) {
    store.value.save(recordId.value, formData.value).then(() => {
      emits('success');
    });
  } else {
    emits('submit', formData.value);
  }
};

const clear = () => {
  formData.value = { id: null };
  submitted.value = false;
  emits('update:modelValue', formData.value);
};

const cancel = () => {
  formData.value = structuredClone(toRaw(initialFormData.value));
  submitted.value = false;
  emits('update:modelValue', formData.value);
  emits('cancel');
};

const onValid = (v: boolean) => {
  submitted.value = false;
  valid.value = v;
  emits('valid', v);
};

const title = computed(() => {
  if (!properties.updateTitle) return properties.createTitle;

  return recordId.value ? properties.updateTitle : properties.createTitle;
});
</script>
