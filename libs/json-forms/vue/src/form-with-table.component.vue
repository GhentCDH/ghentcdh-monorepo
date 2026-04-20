<template>
  <div class="flex justify-between items-center mb-2">
    <h1>
      {{ tableTitle }}
    </h1>
    <div>
      <Btn :icon="IconEnum.Plus" :outline="true" @click="create">
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
import { computed, ref, watch } from 'vue';

import { Btn, Card, hasCustomEventListener, IconEnum, ModalService } from '@ghentcdh/ui';

import { type FormModalResult, FormModalService, FormStore } from './index';

import type { Data } from './form-with-table.component.properties';
import { FormWithTableEmits, FormWithTableProperties } from './form-with-table.component.properties';
import { TableComponent } from './table';

const properties = defineProps(FormWithTableProperties);
const emit = defineEmits(FormWithTableEmits);
const reload = ref(0);

const resolvedForm = computed(() => properties.form);
const resolvedTable = computed(() => properties.table);
const resolvedFilter = computed(() => properties.filter);
const resolvedUri = computed(() => properties.uri);

// Recreate the store whenever the resolved URI changes
let store = new FormStore(resolvedUri.value ?? '');

watch(resolvedUri, (uri) => {
  store = new FormStore(uri ?? '');
});

const hasEdit = hasCustomEventListener('editData');
const customEdit = hasCustomEventListener('custom:edit');
const customCreate = hasCustomEventListener('custom:create');

// Delegate to a custom edit handler when one is bound, otherwise open the modal
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

// Confirm before deleting a record, then reload the table
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

// Open the create/edit modal using `FormModalService`
const openModal = (formData?: any) => {
  if (!resolvedForm.value) return;

  const isUpdate = !!formData?.id;

  FormModalService.openModal({
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
