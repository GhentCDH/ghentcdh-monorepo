<template>
  <component
    :is="props.as"
    :class="[
      'btn p-1 flex justify-center flex-nowrap',
      ButtonColor[props.color],
      ButtonSize[props.size],
      { 'btn-outline': props.outline, 'btn-square': props.square },
    ]"
    :href="props.href"
    :type="props.type"
    :disabled="props.disabled"
    :data-tip="props.tooltip"
    @click="emit('click')"
  >
    <Icon
      v-if="props.icon"
      :icon="props.icon"
      :size="props.size"
    />
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { BtnEmits, BtnProperties } from './Btn.properties';
import { ButtonColor } from '../const/colors';
import { ButtonSize } from '../const/size';
import { Icon } from '../icons';

const props = defineProps(BtnProperties);
const emit = defineEmits(BtnEmits);
</script>