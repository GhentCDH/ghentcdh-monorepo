<template>
  <div :title="control.label">
    <div
      :class="[
        'flex gap-2',
        appliedOptions?.layout === 'row' ? 'flex-row items-center' : 'flex-col',
      ]"
    >
      <div
        v-for="(element, index) in control.data"
        :key="`${control.path}-${index}`"
        class="flex-1"
      >
        <div
          :class="[
            'flex gap-2',
            appliedOptions?.layout === 'row'
              ? 'flex-col'
              : 'flex-row items-center',
          ]"
        >
          <div>
            <dispatch-renderer
              :schema="control.schema"
              :uischema="childUiSchema"
              :path="composePaths(control.path, `${index}`)"
              :enabled="control.enabled"
              :renderers="control.renderers"
              :cells="control.cells"
            />
          </div>
          <div v-if="showActions">
            <Btn
              v-if="showDelete"
              :icon="IconEnum.Delete"
              :outline="true"
              @click="deleteButtonClick(index)"
            />
          </div>
        </div>
      </div>
      <div
        v-if="noData"
        class="list-row"
        :class="styles.arrayList.noData"
      >
        No data
      </div>
      <div
        v-if="showActions"
        class="list-row"
      >
        <Btn
          :icon="IconEnum.Plus"
          :outline="true"
          @click="addButtonClick"
        >
          Add
        </Btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  type ControlElement,
  composePaths,
  createDefaultValue,
} from '@jsonforms/core';
import {
  DispatchRenderer,
  rendererProps,
  useJsonFormsArrayControl,
} from '@jsonforms/vue';
import { useVanillaArrayControl } from '@jsonforms/vue-vanilla';
import { computed } from 'vue';

import { Btn, IconEnum } from '@ghentcdh/ui';

const props = defineProps({ ...rendererProps<ControlElement>() });
const vanillaArrayControl = useVanillaArrayControl(
  useJsonFormsArrayControl(props),
);

const { styles, childUiSchema, control, appliedOptions } = vanillaArrayControl;

if (!control.value.data || control.value.data.length < 1) {
  vanillaArrayControl.addItem(
    control.value.path,
    createDefaultValue(control.value.schema, control.value.rootSchema),
  )();
}

const noData = computed(
  () => !control.value.data || control.value.data.length === 0,
);

const showDelete = computed(() => control.value.data?.length > 1);

const deleteButtonClick = (index: number) => {
  vanillaArrayControl.removeItems(control.value.path, [index])();
};

const addButtonClick = () => {
  vanillaArrayControl.addItem(
    control.value.path,
    createDefaultValue(control.value.schema, control.value.rootSchema),
  )();
};

const showActions = computed(() => {
  return !appliedOptions.value.hideActions;
});
</script>
