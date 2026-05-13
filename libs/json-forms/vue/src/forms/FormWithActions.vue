<template>
  <Collapse
    :title="title"
    :height-full="fullHeight"
    :scrollable="true"
  >
    <div :class="['flex flex-col', { 'overflow-hidden h-full': scrollable }]">
      <div
        :class="['flex-1', { 'overflow-y-auto overflow-x-hidden': scrollable }]"
      >
        <FormComponent
          ref="formRef"
          :id="`form_${id}`"
          :form-data="formData"
          :schema="schema"
          :ui-schema="uiSchema"
          :error-mode="errorMode"
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
          <Btn
            v-else
            aria-label="Clear"
            :outline="true"
            @click="clear"
          >
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

import type { ErrorMode } from './errorMode';
import {
  FormWithActionsEmits,
  FormWithActionsProperties,
} from '../form-with-actions.component.properties';
import { FormStore } from '../form.store';
import FormComponent from './FormComponent.vue';

const properties = defineProps({
  ...FormWithActionsProperties,
  modelValue: { type: Object as PropType<any>, default: () => ({}) },
  errorMode: {
    type: String as PropType<ErrorMode>,
    default: 'onBlur' as const,
  },
});
const emits = defineEmits(FormWithActionsEmits);

const formRef = ref<InstanceType<typeof FormComponent>>();
const formData = ref<any>(properties.modelValue);
const initialFormData = ref<any>(structuredClone(toRaw(properties.modelValue)));
const recordId = ref(properties.modelValue?.id ?? null);
const valid = ref(false);
const submitted = ref(false);

watch(
  () => properties.modelValue,
  (newValue) => {
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
  formRef.value?.markSubmitted();
  if (!valid.value) return;

  if (store.value) {
    store.value.save(recordId.value, formData.value).then((response) => {
      emits('success', response);
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
