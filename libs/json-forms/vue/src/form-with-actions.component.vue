<template>
  <Collapse
    :title="title"
    :height-full="fullHeight"
  >
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
            v-if="!formData.id"
            :outline="true"
            @click="clear"
          >
            Clear
          </Btn>
          <Btn
            v-if="formData.id"
            :outline="true"
            @click="cancel"
          >
            Cancel
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
    </div>
  </Collapse>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { Alert, Btn, Collapse, Color } from '@ghentcdh/ui';

import { FormWithActionsEmits, FormWithActionsProperties } from './form-with-actions.component.properties';
import FormComponent from './form.component.vue';
import { FormStore } from './form.store';

const properties = defineProps(FormWithActionsProperties);
const emits = defineEmits(FormWithActionsEmits);
const formData = defineModel<any>();
// const initialFormData = ref(structuredClone(formData.value));
const valid = ref(false);
const submitted = ref(false);

const store = computed(() =>
  properties.uri ? new FormStore(properties.uri) : null,
);

const updateValue = (data: any) => {
  formData.value = data;
};

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

const cancel = () => {
  // formData.value = structuredClone(initialFormData.value);
  submitted.value = false;
  emits('cancel');
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
