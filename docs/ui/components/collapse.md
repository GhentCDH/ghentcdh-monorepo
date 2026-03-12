# Collapse

A collapsible component that can show/hide content with a toggle.

<script setup>
import { Collapse, CollapseRow } from "@ghentcdh/ui";

const actions = [
  { label: 'All', onClick: () => alert('All clicked') },
  { label: 'None', onClick: () => alert('None clicked') },
];

const iconActions = [
  { icon: 'Edit', tooltip: 'Edit', onClick: () => alert('Edit clicked') },
  { icon: 'Delete', tooltip: 'Delete', onClick: () => alert('Delete clicked') },
];
</script>

## Basic Usage

The `Collapse` component displays content that can be expanded or collapsed. By default, it opens in the expanded state.

::: tabs

@tab Preview

<Collapse title="Default opened">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt dolor eget congue commodo.
</Collapse>

@tab Vue

```vue

<template>
  <Collapse title="Default opened">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </Collapse>

</template>

<script setup>
  import { Collapse } from "@ghentcdh/ui";
</script>
```

:::

## Default closed

::: tabs

@tab Preview

<Collapse title="Default closed" :opened="false">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt dolor eget congue commodo.
</Collapse>

@tab Vue

```vue

<template>
  <Collapse title="Default closed" :opened="false">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </Collapse>

</template>

<script setup>
  import { Collapse } from "@ghentcdh/ui";
</script>
```

:::

## With a List

Use the `#list` slot with `CollapseRow` components to display structured list items inside the collapse.

::: tabs

@tab Preview

<Collapse title="List example" style="width: 300px">
<template #list>
<CollapseRow title="Row 1" label="label"/>
<CollapseRow title="Row 2" label="label" labelLink="https://www.ghentcdh.ugent.be/"/>
<CollapseRow title="Row 3" description="Lorem ipsum dolor sit amet"/>
<CollapseRow title="Row 4" descriptionLink="https://www.ghentcdh.ugent.be/"/>
<CollapseRow title="Row 5" description="Lorem ipsum dolor sit amet" descriptionLink="https://www.ghentcdh.ugent.be/"/>
<CollapseRow title="Row 6" label="label" description="Lorem ipsum dolor sit amet" descriptionLink="https://www.ghentcdh.ugent.be/"/>
</template>
</Collapse>

@tab Vue

```vue

<template>
  <Collapse title="List example" style="width: 300px">
    <template #list>
      <CollapseRow title="Row 1" label="label" />
      <CollapseRow
        title="Row 2"
        label="label"
        labelLink="https://example.com"
      />
      <CollapseRow
        title="Row 3"
        description="Lorem ipsum dolor sit amet"
      />
      <CollapseRow
        title="Row 4"
        descriptionLink="https://example.com"
      />
      <CollapseRow
        title="Row 5"
        description="Lorem ipsum dolor sit amet"
        descriptionLink="https://example.com"
      />
      <CollapseRow
        title="Row 6"
        label="label"
        description="Lorem ipsum dolor sit amet"
        descriptionLink="https://example.com"
      />
    </template>
  </Collapse>
</template>

<script setup>
  import { Collapse, CollapseRow } from "@ghentcdh/ui";
</script>
```

:::

## With header actions

Pass an array of action objects via the `actions` prop. Each action renders a button in the header, click-isolated from the collapse toggle.

::: tabs

@tab Preview

<Collapse title="With actions" :actions="actions">
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</Collapse>

@tab Vue

```vue
<template>
  <Collapse title="With actions" :actions="actions">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </Collapse>
</template>

<script setup lang="ts">
  import { Collapse } from '@ghentcdh/ui';
  import type { CollapseAction } from '@ghentcdh/ui';

  const actions: CollapseAction[] = [
    { label: 'All', onClick: () => console.log('All') },
    { label: 'None', onClick: () => console.log('None') },
  ];
</script>
```

:::

## With icon actions

Actions can use icons and tooltips instead of labels.

::: tabs

@tab Preview

<Collapse title="With icon actions" :actions="iconActions">
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</Collapse>

@tab Vue

```vue
<template>
  <Collapse title="With icon actions" :actions="actions">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </Collapse>
</template>

<script setup lang="ts">
  import { Collapse } from '@ghentcdh/ui';
  import type { CollapseAction } from '@ghentcdh/ui';

  const actions: CollapseAction[] = [
    { icon: 'Edit', tooltip: 'Edit', onClick: () => console.log('Edit') },
    { icon: 'Delete', tooltip: 'Delete', onClick: () => console.log('Delete') },
  ];
</script>
```

:::

## Disabled

When `disabled` is set, the collapse stays open and cannot be toggled.

::: tabs

@tab Preview

<Collapse title="Always open (disabled)" :disabled="true">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</Collapse>

@tab Vue

```vue
<template>
  <Collapse title="Always open (disabled)" :disabled="true">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </Collapse>
</template>

<script setup>
  import { Collapse } from "@ghentcdh/ui";
</script>
```

:::

## Props

### Collapse

| Prop       | Type               | Default | Description                                    |
|------------|--------------------|---------|------------------------------------------------|
| `title`    | `string`           | -       | The title displayed in the collapse header     |
| `opened`   | `boolean`          | `true`  | Whether the collapse is expanded by default    |
| `disabled` | `boolean`          | `false` | Keeps the collapse open and prevents toggling  |
| `actions`  | `CollapseAction[]` | `[]`    | Action buttons rendered in the header          |

### CollapseAction

| Property   | Type       | Required | Description                       |
|------------|------------|----------|-----------------------------------|
| `label`    | `string`   | no       | Button text                       |
| `icon`     | `IconProp` | no       | Icon name or component            |
| `tooltip`  | `string`   | no       | Tooltip text                      |
| `disabled` | `boolean`  | no       | Disables the action button        |
| `onClick`  | `function` | yes      | Click handler                     |

### Slots

| Slot      | Description                                                  |
|-----------|--------------------------------------------------------------|
| `default` | The collapsible content                                      |
| `list`    | Structured list content (removes padding, wraps in `<ul>`)   |

### CollapseRow

| Prop              | Type     | Default | Description                        |
|-------------------|----------|---------|------------------------------------|
| `title`           | `string` | -       | The title of the row               |
| `label`           | `string` | -       | Optional label text                |
| `labelLink`       | `string` | -       | URL to make the label a link       |
| `description`     | `string` | -       | Optional description text          |
| `descriptionLink` | `string` | -       | URL to make the description a link |
