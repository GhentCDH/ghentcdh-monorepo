<template>
  <ReadonlyWrapper
    :uischema="uischema"
    :schema="schema"
  >
    <div class="flex gap-2 items-center justify-between">
      <div>
        {{ displayValue }}
      </div>
      <div>
        <Btn
          v-if="value && appliedOptions.resource"
          size="xs"
          color="secondary"
          :icon="IconEnum.View"
          tooltip="View"
          @click="view()"
        />
      </div>
    </div>
  </ReadonlyWrapper>
</template>

<script setup lang="ts">
import type { ControlElement, JsonSchema } from '@jsonforms/core';
import { computed } from 'vue';

import { Btn, IconEnum } from '@ghentcdh/ui';

import ReadonlyWrapper from './ReadonlyWrapper.vue';
import { useFormEvents } from '../../../../composables/useFormEvents';
import { scopeToPath } from '../../../scope';
import { useSelectBinding } from '../composable/UseSelectBinding';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const { value, appliedOptions } = useSelectBinding(
  props.uischema,
  props.schema,
);
const displayValue = computed(() => {
  return value.value?.[appliedOptions.value.labelKey] as string;
});

const formEvents = useFormEvents();
const view = () => {
  const path = scopeToPath(props.uischema.scope);
  const id = value.value?.[appliedOptions.value.idKey];
  if (id) {
    formEvents.dispatch({
      event: 'view',
      type: path,
      data: value.value,
      id,
      options: appliedOptions.value,
    });

    // TODO handle the event to view it!
  }
};
</script>
