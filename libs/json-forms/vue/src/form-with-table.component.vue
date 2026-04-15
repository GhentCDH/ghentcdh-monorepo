<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import type { FormSchemaModel, JsonFormsLayout } from '@ghentcdh/json-forms-core';
import type { TableAction } from '@ghentcdh/ui';
import { Btn, Card, hasCustomEventListener, IconEnum, ModalService } from '@ghentcdh/ui';

import { FormModal, FormStore } from './index';

import type { FormModalProps, FormModalResult } from './modal/form-modal.props';
import { TableComponent } from './table';

type Data = {
  [key: string]: any;
};

const properties = withDefaults(
  defineProps<{
    id: string;
    tableTitle: string;
    createTitle: string;
    updateTitle?: string;
    dataUri?: string;
    tableActions?: TableAction[];
    form?: JsonFormsLayout;
    table?: JsonFormsLayout;
    filter?: JsonFormsLayout;
    uri?: string;
    /**
     * @deprecated Use `form`, `table`, `filter` and `uri` props instead.
     */
    formSchema?: FormSchemaModel;
    initialData?: Data;
  }>(),
  { initialData: {} as any },
);
const reload = ref(0);

const resolvedForm = computed(
  () => properties.form ?? properties.formSchema?.form,
);
const resolvedTable = computed(
  () => properties.table ?? properties.formSchema?.table,
);
const resolvedFilter = computed(
  () => properties.filter ?? properties.formSchema?.filter,
);
const resolvedUri = computed(
  () => properties.uri ?? properties.formSchema?.uri,
);

let store = new FormStore(resolvedUri.value ?? '');

watch(resolvedUri, (uri) => {
  store = new FormStore(uri ?? '');
});
const emit = defineEmits<{
  editData: [Data];
}>();

const hasEdit = hasCustomEventListener('editData');

const edit = (data: Data) => {
  if (hasEdit) {
    emit('editData', data);
    return;
  }
  openModal(data);
};

const deleteFn = (data: Data) => {
  ModalService.showConfirm({
    title: 'Delete record',
    message: 'Are you sure to delete, the data will be lost?',
    onClose: (result) => {
      if (result.confirmed) {
        store.delete(data).then(() => (reload.value = Date.now()));
      }
    },
  });
};

const openModal = (formData?: any) => {
  if (!resolvedForm.value) return;

  ModalService.openModal<FormModalProps, any>({
    component: FormModal,
    props: {
      formSchema: resolvedForm.value,
      data: formData ?? properties.initialData,
      modalTitle: formData?.id
        ? (properties.updateTitle ?? '')
        : properties.createTitle,
      onClose: (result: FormModalResult) => {
        if (result && result.valid) {
          store.save(formData?.id, result.data).then(() => {
            reload.value = Date.now();
          });
        }
      },
    },
  });
};
</script>

<template>
  <div class="flex justify-between items-center mb-2">
    <h1>
      {{ tableTitle }}
    </h1>
    <div>
      <Btn :icon="IconEnum.Plus" :outline="true" @click="openModal">
        Add new record
      </Btn>
    </div>
  </div>

  <Card v-if="resolvedTable">
    <TableComponent
      v-if="resolvedUri"
      :id="`form_table_${id}`"
      :layout="resolvedTable"
      :filter-layout="resolvedFilter"
      :uri="dataUri ?? resolvedUri"
      :reload="reload"
      :actions="tableActions"
      @edit="edit"
      @delete="deleteFn"
    />
  </Card>
</template>
