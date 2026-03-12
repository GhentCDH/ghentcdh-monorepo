# Filter

A collapsible checkbox list for filtering items, with optional color dots and count badges.

<script setup>import {ref} from 'vue';

const items = [
  { id: 'person', label: 'Person', color: '#3b82f6' },
  { id: 'location', label: 'Location', color: '#22c55e' },
  { id: 'organization', label: 'Organization', color: '#f59e0b' },
  { id: 'event', label: 'Event', color: '#ef4444' },
];

const selected = ref(items.map((i) => i.id));
const selectedWithCount = ref(items.map((i) => i.id));

const countFn = (item) => {
  const counts = { person: 12, location: 5, organization: 8, event: 0 };
  return counts[item.id] || 0;
};
</script>

## Usage

::: tabs

@tab Preview

<ClientOnly>
<div style="max-width: 300px">
  <Filter
    title="Entity filter"
    :items="items"
    v-model="selected"
    color-key="color"
  />
</div>
</ClientOnly>

@tab Vue

```vue

<template>
  <Filter
    title="Entity filter"
    :items="items"
    v-model="selected"
    color-key="color"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Filter } from '@ghentcdh/ui';

  const items = [
    { id: 'person', label: 'Person', color: '#3b82f6' },
    { id: 'location', label: 'Location', color: '#22c55e' },
    { id: 'organization', label: 'Organization', color: '#f59e0b' },
    { id: 'event', label: 'Event', color: '#ef4444' },
  ];

  const selected = ref(items.map((i) => i.id));
</script>
```

:::

## Props

| Prop         | Type                         | Default     | Description                                                             |
|--------------|------------------------------|-------------|-------------------------------------------------------------------------|
| `title`      | `string`                     | -           | The heading displayed in the collapse header                            |
| `items`      | `Array<Record<string, any>>` | -           | The list of filterable items                                            |
| `modelValue` | `Array<any>`                 | `[]`        | Selected item ids (v-model). Initialize with all IDs for "all selected" |
| `labelKey`   | `string`                     | `'label'`   | Key to read the display label from each item                            |
| `valueKey`   | `string`                     | `'id'`      | Key to read the unique id from each item                                |
| `colorKey`   | `string`                     | `undefined` | Key to read a background color (renders a color dot)                    |
| `countFn`    | `(item) => number`           | `undefined` | Function returning a count for each item (renders a badge)              |
| `opened`     | `boolean`                    | `true`      | Whether the collapse is expanded by default                             |

## Events

| Event               | Payload      | Description                        |
|---------------------|--------------|------------------------------------|
| `update:modelValue` | `Array<any>` | Emitted when the selection changes |

## Examples

### With count badges

::: tabs

@tab Preview

<ClientOnly>
<div style="max-width: 300px">
  <Filter
    title="Entity filter"
    :items="items"
    v-model="selectedWithCount"
    color-key="color"
    :count-fn="countFn"
  />
</div>
</ClientOnly>

@tab Vue

```vue

<template>
  <Filter
    title="Entity filter"
    :items="items"
    v-model="selectedWithCount"
    color-key="color"
    :count-fn="countFn"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Filter } from '@ghentcdh/ui';

  const items = [
    { id: 'person', label: 'Person', color: '#3b82f6' },
    { id: 'location', label: 'Location', color: '#22c55e' },
    { id: 'organization', label: 'Organization', color: '#f59e0b' },
    { id: 'event', label: 'Event', color: '#ef4444' },
  ];

  const selectedWithCount = ref(items.map((i) => i.id));

  const countFn = (item) => {
    const counts = { person: 12, location: 5, organization: 8, event: 0 };
    return counts[item.id] || 0;
  };
</script>
```

:::

### Custom keys

::: tabs

@tab Preview

<ClientOnly>
<div style="max-width: 300px">
  <Filter
    title="Status filter"
    :items="[
      { code: 'active', name: 'Active' },
      { code: 'inactive', name: 'Inactive' },
      { code: 'pending', name: 'Pending' },
    ]"
    label-key="name"
    value-key="code"
  />
</div>
</ClientOnly>

@tab Vue

```vue

<template>
  <Filter
    title="Status filter"
    :items="items"
    v-model="selected"
    label-key="name"
    value-key="code"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Filter } from '@ghentcdh/ui';

  const items = [
    { code: 'active', name: 'Active' },
    { code: 'inactive', name: 'Inactive' },
    { code: 'pending', name: 'Pending' },
  ];

  const selected = ref(items.map((i) => i.code));
</script>
```

:::

### Default closed

::: tabs

@tab Preview

<ClientOnly>
<div style="max-width: 300px">
  <Filter
    title="Closed by default"
    :items="items"
    :opened="false"
  />
</div>
</ClientOnly>

@tab Vue

```vue

<template>
  <Filter
    title="Closed by default"
    :items="items"
    :opened="false"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Filter } from '@ghentcdh/ui';

  const items = [
    { id: 'person', label: 'Person' },
    { id: 'location', label: 'Location' },
  ];
</script>
```

:::
