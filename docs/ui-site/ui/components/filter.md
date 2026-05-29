# Filter

A collapsible checkbox list for filtering items, with optional color dots and count badges.

<script setup>
import { ref } from 'vue';

const items = [
  { id: 'person', label: 'Person', count: 12, color: '#3b82f6' },
  { id: 'location', label: 'Location', count: 5, color: '#22c55e' },
  { id: 'organization', label: 'Organization', count: 8, color: '#f59e0b' },
  { id: 'event', label: 'Event', count: 0, color: '#ef4444' },
];

const selected = ref(items.map((i) => i.id));
const selectedWithCount = ref(items.map((i) => i.id));
const selectedWithCounts = ref(items.map((i) => i.id));
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
    { id: 'person', label: 'Person', count: 12, color: '#3b82f6' },
    { id: 'location', label: 'Location', count: 5, color: '#22c55e' },
    { id: 'organization', label: 'Organization', count: 8, color: '#f59e0b' },
    { id: 'event', label: 'Event', count: 0, color: '#ef4444' },
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
| `countKey`   | `string`                     | `'count'`   | Key to read a count from each item (renders a badge if > 0)             |
| `counts`     | `Record<string, number>`     | `undefined` | External map of item id to count (overrides `countKey`)                 |
| `opened`     | `boolean`                    | `true`      | Whether the collapse is expanded by default                             |

### FilterItem

A convenience type for items that follow the default key conventions.

```ts
type FilterItem = {
  id: string;
  label: string;
  count: number;
  color?: string;
};
```

## Events

| Event               | Payload      | Description                        |
|---------------------|--------------|------------------------------------|
| `update:modelValue` | `Array<any>` | Emitted when the selection changes |

## Examples

### With count badges

Items with a `count` property automatically show a badge when the count is greater than 0.

::: tabs

@tab Preview

<ClientOnly>
<div style="max-width: 300px">
  <Filter
    title="Entity filter"
    :items="items"
    v-model="selectedWithCount"
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
  import type { FilterItem } from '@ghentcdh/ui';

  const items: FilterItem[] = [
    { id: 'person', label: 'Person', count: 12, color: '#3b82f6' },
    { id: 'location', label: 'Location', count: 5, color: '#22c55e' },
    { id: 'organization', label: 'Organization', count: 8, color: '#f59e0b' },
    { id: 'event', label: 'Event', count: 0, color: '#ef4444' },
  ];

  const selected = ref(items.map((i) => i.id));
</script>
```

:::

### With external counts

Use the `counts` prop to provide counts from an external source instead of embedding them in items.

::: tabs

@tab Preview

<ClientOnly>
<div style="max-width: 300px">
  <Filter
    title="Entity filter"
    :items="items"
    v-model="selectedWithCounts"
    color-key="color"
    :counts="{ person: 42, location: 7, organization: 3, event: 0 }"
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
    :counts="counts"
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
  const counts = { person: 42, location: 7, organization: 3, event: 0 };
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
      { code: 'active', name: 'Active', count: 0 },
      { code: 'inactive', name: 'Inactive', count: 0 },
      { code: 'pending', name: 'Pending', count: 0 },
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
    { code: 'active', name: 'Active', count: 0 },
    { code: 'inactive', name: 'Inactive', count: 0 },
    { code: 'pending', name: 'Pending', count: 0 },
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
    { id: 'person', label: 'Person', count: 0 },
    { id: 'location', label: 'Location', count: 0 },
  ];
</script>
```

:::
