# Collapse

A collapsible component that can show/hide content with a toggle.

<script setup>
//
import { Collapse, CollapseRow } from "@ghentcdh/ui";
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

## Props

### Collapse

| Prop     | Type      | Default | Description                                 |
|----------|-----------|---------|---------------------------------------------|
| `title`  | `string`  | -       | The title displayed in the collapse header  |
| `opened` | `boolean` | `true`  | Whether the collapse is expanded by default |

### CollapseRow

| Prop              | Type     | Default | Description                        |
|-------------------|----------|---------|------------------------------------|
| `title`           | `string` | -       | The title of the row               |
| `label`           | `string` | -       | Optional label text                |
| `labelLink`       | `string` | -       | URL to make the label a link       |
| `description`     | `string` | -       | Optional description text          |
| `descriptionLink` | `string` | -       | URL to make the description a link |
