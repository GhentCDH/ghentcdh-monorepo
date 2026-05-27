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
          :id="`form_${id}`"
          ref="formRef"
          :form-data="formData"
          :schema="schema"
          :ui-schema="uiSchema"
          :error-mode="errorMode"
          @change="updateValue"
          @submit="save"
          @errors="onErrors"
          @events="emits('events', $event)"
        />
      </div>
      <div
        class="flex justify-end gap-2 p-2 mt-2 border-t border-gray-300 z-[30] shrink-0"
      >
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
            :disabled="!valid"
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
import { isEmpty } from 'lodash-es';
import { computed, ref, toRaw, watch } from 'vue';

import { Btn, Collapse, Color } from '@ghentcdh/ui';

import { FormWithActionsEmits, FormWithActionsProperties } from './FormWithActions.properties';
import { FormStore } from '../form.store';
import FormComponent from './FormComponent.vue';

const properties = defineProps(FormWithActionsProperties);
const emits = defineEmits(FormWithActionsEmits);

const formRef = ref<InstanceType<typeof FormComponent>>();
const formData = ref<any>(properties.modelValue);
const initialFormData = ref<any>(structuredClone(toRaw(properties.modelValue)));
const recordId = ref(properties.modelValue?.id ?? null);
const valid = ref(false);

watch(
  () => properties.modelValue,
  (newValue) => {
    if (JSON.stringify(toRaw(newValue)) === JSON.stringify(toRaw(formData.value))) return;
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
  emits('update:modelValue', formData.value);
};

const cancel = () => {
  formData.value = structuredClone(toRaw(initialFormData.value));
  emits('update:modelValue', formData.value);
  emits('cancel');
};

const title = computed(() => {
  if (!properties.updateTitle) return properties.createTitle;
  return recordId.value ? properties.updateTitle : properties.createTitle;
});

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
