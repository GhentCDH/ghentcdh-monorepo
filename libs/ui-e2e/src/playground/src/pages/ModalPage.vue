<template>
  <h1 class="text-xl mb-4">
    Modal
  </h1>
  <Btn @click="open = true">
    Open modal
  </Btn>

  <Modal
    v-if="open"
    modal-title="Demo modal"
    :open="true"
    @close-modal="onClose"
  >
    <template #content>
      <p>Hello from inside the modal.</p>
      <Input
        v-bind="baseProps"
        id="modal-name"
        v-model="value"
        label="Name"
      />
    </template>
    <template #actions>
      <Btn
        aria-label="Cancel"
        @click="open = false"
      >
        Cancel
      </Btn>
      <Btn
        aria-label="Confirm"
        @click="confirmed = true; open = false"
      >
        Confirm
      </Btn>
    </template>
  </Modal>

  <ValueProbe :value="value" />
  <pre data-testid="confirmed">{{ confirmed }}</pre>
  <pre data-testid="closed-count">{{ closedCount }}</pre>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { Btn, Input, Modal } from '@ghentcdh/ui';

import ValueProbe from '../shared/ValueProbe.vue';
import { baseProps } from '../shared/baseProps';

const open = ref(false);
const value = ref('');
const confirmed = ref(false);
const closedCount = ref(0);

const onClose = () => {
  open.value = false;
  closedCount.value++;
};
</script>
