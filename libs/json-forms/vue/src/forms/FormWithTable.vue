<template>
  <div class="flex justify-between items-center mb-2">
    <h1>
      {{ tableTitle }}
    </h1>
    <div>
      <Btn
        :icon="IconEnum.Plus"
        :outline="true"
        @click="create"
      >
        Add new record
      </Btn>
    </div>
  </div>

  <Card v-if="resolvedTable">
    <TableComponent
      v-if="resolvedUri"
      :id="`form_table_${id}`"
      :ui-schema="resolvedTable.uiSchema"
      :schema="resolvedTable.schema"
      :filter-ui-schema="resolvedFilter?.uiSchema"
      :filter-schema="resolvedFilter?.schema"
      :uri="dataUri ?? resolvedUri"
      :reload="reload"
      :actions="tableActions"
      @edit="edit"
      @delete="deleteFn"
    />
  </Card>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { computed, ref, watch } from 'vue';

import type { JsonFormsLayout } from '@ghentcdh/json-forms-core';
import type { TableAction } from '@ghentcdh/ui';
import { Btn, Card, IconEnum, ModalService, hasCustomEventListener } from '@ghentcdh/ui';

import type { ErrorMode } from './errorMode';
import { FormStore } from '../form.store';
import type { FormModalResult } from '../modal/form-modal.props';
import { TableComponent } from '../table';
import { VeeFormModalService } from './modal/FormModalService';

type Data = { [key: string]: any };

const properties = defineProps({
  id: { type: String, required: true as const },
  tableTitle: { type: String, required: true as const },
  createTitle: { type: String, required: true as const },
  updateTitle: { type: String },
  dataUri: { type: String },
  tableActions: { type: Array as PropType<TableAction[]> },
  form: { type: Object as PropType<JsonFormsLayout> },
  table: { type: Object as PropType<JsonFormsLayout> },
  filter: { type: Object as PropType<JsonFormsLayout> },
  uri: { type: String },
  initialData: { type: Object as PropType<Data>, default: () => ({}) },
  errorMode: {
    type: String as PropType<ErrorMode>,
    default: 'onBlur' as const,
  },
});

const emit = defineEmits([
  'editData',
  'save',
  'delete',
  'events',
  'custom:edit',
  'custom:create',
]);

const reload = ref(0);

const resolvedForm = computed(() => properties.form);
const resolvedTable = computed(() => properties.table);
const resolvedFilter = computed(() => properties.filter);
const resolvedUri = computed(() => properties.uri);

let store = new FormStore(resolvedUri.value ?? '');

watch(resolvedUri, (uri) => {
  store = new FormStore(uri ?? '');
});

const hasEdit = hasCustomEventListener('editData');
const customEdit = hasCustomEventListener('custom:edit');
const customCreate = hasCustomEventListener('custom:create');

const edit = (data: Data) => {
  if (customEdit) {
    emit('custom:edit', data);
    return;
  }
  if (hasEdit) {
    emit('editData', data);
    return;
  }
  openModal(data);
};

const create = () => {
  if (customCreate) {
    emit('custom:create');
    return;
  }
  openModal();
};

const deleteFn = (data: Data) => {
  ModalService.showConfirm({
    title: 'Delete record',
    message: 'Are you sure to delete, the data will be lost?',
    onClose: (result) => {
      if (result.confirmed) {
        store.delete(data).then(() => {
          reload.value = Date.now();
          emit('delete', data);
        });
      }
    },
  });
};

const openModal = (formData?: any) => {
  if (!resolvedForm.value) return;

  const isUpdate = !!formData?.id;

  VeeFormModalService.openModal({
    schema: resolvedForm.value.schema,
    uiSchema: resolvedForm.value.uiSchema,
    modalSize: resolvedForm.value.modalSize,
    initialData: formData ?? properties.initialData,
    modalTitle:
      (isUpdate
        ? (properties.updateTitle ?? properties.createTitle)
        : properties.createTitle) ?? '',
    onClose: (result: FormModalResult) => {
      if (result && result.valid) {
        store.save(formData?.id, result.data).then(() => {
          reload.value = Date.now();
          emit('save', { id: formData?.id, data: result.data });
        });
      }
    },
    onEvents: (payload) => emit('events', payload),
  });
};
</script>
