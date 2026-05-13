<template>
  <component
    v-if="renderer"
    :is="renderer"
    :uischema="uischema"
    :schema="resolved"
  />
  <div
    v-else
    class="text-error text-xs"
  >
    No renderer for {{ (uischema as any).scope ?? uischema.type }}
  </div>
</template>

<script setup lang="ts">
import type { JsonSchema, UISchemaElement } from '@jsonforms/core';
import { computed, inject, provide } from 'vue';

import type { RendererEntry } from './renderer-registry';
import { findRenderer } from './renderer-registry';
import { resolveSchema } from './scope';

const props = withDefaults(
  defineProps<{
    uischema: UISchemaElement;
    schema: JsonSchema;
    pathPrefix?: string;
  }>(),
  { pathPrefix: undefined },
);

const registry = inject<RendererEntry[]>('renderers')!;
const rootSchema = inject<JsonSchema>('rootSchema')!;
const parentPrefix = inject<string>('pathPrefix', '');

// If pathPrefix prop is passed, provide it to children; otherwise inherit from parent
const effectivePrefix = props.pathPrefix ?? parentPrefix;
if (props.pathPrefix !== undefined) {
  provide('pathPrefix', effectivePrefix);
}

const resolved = computed(() => {
  const u = props.uischema as any;
  return u.scope ? resolveSchema(rootSchema, u.scope) : props.schema;
});

const renderer = computed(() =>
  findRenderer(registry, props.uischema, resolved.value),
);
</script>
