<template>
  <form :id="id">
    <Dispatch
      :uischema="uiSchema"
      :schema="schema"
    />
  </form>
</template>

<script setup lang="ts">
import { provide } from 'vue';

import { FormComponentEmits, FormComponentProperties } from './form.component.properties';
import Dispatch from './forms/Dispatch.vue';
import { customRenderes } from './forms/renderes';

const properties = defineProps(FormComponentProperties);
const emits = defineEmits(FormComponentEmits);

provide('renderers', customRenderes);
provide('rootSchema', properties.schema);
</script>
