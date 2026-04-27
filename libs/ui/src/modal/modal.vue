<template>
  <dialog
    ref="dialogRef"
    class="modal"
    role="dialog"
    aria-modal="true"
    :aria-labelledby="titleId"
    :aria-describedby="contentId"
    @cancel.prevent="onCancel"
  >
    <div :class="[`modal-box bg-white`, ModalSize[width]]">
      <button
        v-if="!disableClose"
        type="button"
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        aria-label="Close"
        @click="closeModal"
      >
        ✕
      </button>
      <h3
        :id="titleId"
        class="font-bold"
      >
        {{ modalTitle }}
      </h3>
      <div
        :id="contentId"
        class="pt-4"
      >
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
import { computed, onMounted, ref, watch } from 'vue';

import { ModalEmits, ModalProperties } from './modal.properties';
import { useFocusTrap } from '../composables';
import { ModalSize } from '../const/size';

const properties = defineProps(ModalProperties);

const id = `modal_${uuidv4()}`;
const titleId = `${id}_title`;
const contentId = `${id}_content`;

const dialogRef = ref<HTMLDialogElement | null>(null);
const isOpen = ref(false);

const emits = defineEmits(ModalEmits);

const openModal = () => {
  dialogRef.value?.showModal();
  isOpen.value = true;
};

const closeModal = () => {
  dialogRef.value?.close();
  isOpen.value = false;
  emits('closeModal');
};

const onCancel = () => {
  if (!properties.disableClose) closeModal();
};

useFocusTrap({
  containerRef: dialogRef,
  isActive: isOpen,
  onEscape: () => {
    if (!properties.disableClose) closeModal();
  },
});

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
