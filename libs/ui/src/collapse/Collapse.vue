<template>
  <div
    :class="[
      'collapse collapse-arrow bg-white w-full border border-gray-300',
      heightFull ? 'h-full' : '',
      disabled ? 'collapse-open' : '',
      isOpen ? 'overflow-visible' : '',
    ]"
  >
    <input
      v-if="!disabled"
      type="checkbox"
      :checked="checked"
      tabindex="-1"
      @change="isOpen = ($event.target as HTMLInputElement).checked"
    >
    <div class="collapse-title text-gray-500 text-xs font-medium">
      <div class="flex items-center justify-between">
        <span>{{ title }}</span>
        <div
          v-if="properties.actions.length > 0"
          class="relative z-10 flex gap-1"
          @click.stop
        >
          <Btn
            v-for="(action, index) in properties.actions"
            :key="index"
            :color="Color.blank"
            size="xs"
            :icon="action.icon"
            :tooltip="action.tooltip"
            :disabled="action.disabled"
            @click="action.onClick"
          >
            {{ action.label }}
          </Btn>
        </div>
      </div>
    </div>
    <div :class="['collapse-content', slots.list ? 'p-0' : '']">
      <slot />
      <ul
        v-if="slots.list"
        class="list bg-base-100"
      >
        <slot name="list" />
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, useSlots } from 'vue';

import { Btn } from '../button';
import { CollapseProperties } from './Collapse.properties';
import { Color } from '../const/colors';

const slots = useSlots();
const properties = defineProps(CollapseProperties);
const checked = ref(properties.opened);
const isOpen = ref(properties.opened || properties.disabled);
</script>
