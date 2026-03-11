<template>
  <fieldset :class="['fieldset', mergedStyles.control.wrapper, width]">
    <legend v-if="!hideLabel" :class="mergedStyles.control.label">
      {{ label }} <span v-if="showAsterisk">*</span>
    </legend>
    <slot />
    <p :class="['fieldset-label h-4', { 'text-error': showErrors }]">
      {{ showErrors ? errors : showDescription ? description : null }}
    </p>
  </fieldset>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { isDescriptionHidden, showErrors as _showErrors } from './utils/style';
import { mergeStyles } from './styles';
import { ControlWrapperProperties } from './ControlWrapper.properties'; // TODO check what is used?

// TODO check what is used?
const properties = defineProps(ControlWrapperProperties);

const showDescription = computed(() => {
  return !isDescriptionHidden(
    properties.visible,
    properties.description,
    properties.isFocused,
    true,
  );
});

const showAsterisk = computed(() => {
  return properties.required;
});

const showErrors = computed(() => {
  return _showErrors(properties);
});

const mergedStyles = computed(() => mergeStyles(properties.styles));
</script>
