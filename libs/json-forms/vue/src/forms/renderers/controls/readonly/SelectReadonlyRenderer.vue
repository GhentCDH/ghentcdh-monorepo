<template>
  <ReadonlyWrapper v-bind="wrapper">
    <div class="flex gap-2 items-center justify-between">
      <div>{{ wrapper.displayValue[wrapper.labelKey] }}</div>
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

import { Btn, IconEnum, ReadonlyWrapper } from '@ghentcdh/ui';

import { useFormEvents } from '../../../../composables/useFormEvents';
import { scopeToPath } from '../../../scope';
import { useSelectBinding } from '../composable/UseSelectBinding';

const props = defineProps<{ uischema: ControlElement; schema: JsonSchema }>();

const { value, appliedOptions, wrapper } = useSelectBinding(
  props.uischema,
  props.schema,
);

const formEvents = useFormEvents();
const view = () => {
  const options = appliedOptions.value;
  const path = scopeToPath(props.uischema.scope);
  const id = wrapper.value?.displayValue[appliedOptions.value.valueKey];
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
