<template>
  <ControlWrapper v-bind="properties">
    <button
      type="button"
      :class="style"
      @click="toggle"
    >
      {{ model?.map?.((m) => getLabel(m)).join(', ') ?? 'Select value' }}
    </button>
    <div v-click-outside="() => close()">
      <ul
        v-if="displayValues"
        :class="[
          `bg-base-100 w-52 shadow -mt-5
        absolute z-50 p-0`,
        ]"
      >
        <li
          v-for="result in options"
          :key="result[valueKey]"
        >
          <button
            class="w-full flex h-8 border-b-1 border-gray-200 border-x-0 border-t-0 p-2 text-left hover:bg-primary-content cursor-pointer"
            type="button"
            @click="selectResult($event, result)"
          >
            <div class="w-4 mr-2">
              <Icon
                v-if="hasKey(getValueField(result))"
                :icon="IconEnum.Check"
                size="sm"
              />
            </div>
            {{ getLabel(result) }}
          </button>
        </li>
      </ul>
    </div>
  </ControlWrapper>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

import { Icon, IconEnum } from '../icons';
import ControlWrapper from './core/ControlWrapper.vue';
import type { ControlEmits } from './core/emits';
import type { SelectControlProperties } from './core/properties';
import { DefaultControlProperties } from './core/properties';
import { buildInputStyle } from './core/utils/style';

const properties = withDefaults(defineProps<SelectControlProperties>(), {
  ...DefaultControlProperties(),
  valueKey: 'value',
  labelKey: 'label',
});

const emit = defineEmits<ControlEmits>();
const model = defineModel<any[]>();

let justToggle = false;

const onChange = (event: Event) => {
  emit('change', event);
};

const displayValues = ref(false);

const toggle = () => {
  displayValues.value = !displayValues.value;
  justToggle = true;
};

const close = () => {
  if (!justToggle) {
    displayValues.value = false;
  }
  justToggle = false;
};

const selectedIds = computed(
  () => model.value?.map((m) => getValueField(m)) ?? [],
);

const hasKey = (field: any) => selectedIds.value.includes(field);

const selectResult = (event: MouseEvent, result: any) => {
  event.preventDefault();
  let selection: any[] = model.value ?? [];

  const value = getValueField(result);
  const hasValue = hasKey(value);

  if (hasValue) selection = selection.filter((s) => getValueField(s) !== value);
  else selection.push(result);

  model.value = selection;
  onChange(selection as any);
};

const getValueField = (field: any) => field[properties.valueKey];
const getLabel = (field: any) => field?.[properties.labelKey] ?? '';

const style = computed(() =>
  buildInputStyle(
    [properties.styles.control.select, 'w-full truncate block'].join(' '),
    properties,
  ),
);
</script>
