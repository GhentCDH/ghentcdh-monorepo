<template>
  <dialog
    :id="id"
    class="modal"
    :aria-label="name"
  >
    <div :class="[`modal-box bg-white`, ModalSize[width]]">
      <button
        v-if="!disableClose"
        type="button"
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        @click="closeModal"
      >
        ✕
      </button>
      <h3 class="font-bold">
        {{ modalTitle }}
      </h3>
      <div class="pt-4">
        <slot name="content" />
      </div>
      <div class="flex justify-end gap-2 p-2 mt-2 border-t border-gray-300">
        <slot name="actions" />
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { onMounted, watch } from 'vue';

import { ModalEmits, ModalProperties } from './modal.properties';
import { ModalSize } from '../const/size';

const properties = defineProps(ModalProperties);

const id = `modal_${uuidv4()}`;

const emits = defineEmits(ModalEmits);

const openModal = () => {
  const modal = document.getElementById(id) as HTMLDialogElement;
  modal?.showModal();
};

const closeModal = () => {
  const modal = document.getElementById(id) as HTMLDialogElement;
  modal?.close();
  emits('closeModal');
};

defineExpose({ closeModal, openModal });

watch(
  () => properties.open,
  () => {
    if (properties.open) openModal();
    else closeModal();
  },
);

onMounted(() => {
  if (properties.open) openModal();
});
</script>
