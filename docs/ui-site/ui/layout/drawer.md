# Drawer

A layout component with collapsible left and/or right side panels. Panels only render when their corresponding slot is provided.

## Usage

::: tabs

@tab Preview

<div style="height: 200px; border: 1px solid #d1d5db;">
<Drawer>
Main content
<template #left-drawer>
Left drawer content
</template>
<template #right-drawer>
Right drawer content
</template>
</Drawer>
</div>

@tab Vue

```vue

<template>
  <Drawer>
    Main content
    <template #left-drawer>
      Left drawer content
    </template>
    <template #right-drawer>
      Right drawer content
    </template>
  </Drawer>
</template>

<script setup>
  import { Drawer } from "@ghentcdh/ui";
</script>
```

:::

## Props

| Prop               | Type      | Default | Description                              |
|--------------------|-----------|---------|------------------------------------------|
| `widthLeft`        | `Number`  | `200`   | Width in pixels of the left panel        |
| `widthRight`       | `Number`  | `200`   | Width in pixels of the right panel       |
| `initialLeftOpen`  | `Boolean` | `true`  | Whether the left panel starts open       |
| `initialRightOpen` | `Boolean` | `true`  | Whether the right panel starts open      |

## Slots

| Slot           | Description                                                        |
|----------------|--------------------------------------------------------------------|
| `default`      | Main content area                                                  |
| `left-drawer`  | Left side panel content (panel hidden when slot is not provided)   |
| `right-drawer` | Right side panel content (panel hidden when slot is not provided)  |

<script setup>
//
import { Drawer } from '@ghentcdh/ui';
import { ref } from 'vue';

</script>

<ClientOnly>

## Examples

### Left drawer only

::: tabs

@tab Preview

<div style="height: 200px; border: 1px solid #d1d5db;">
<Drawer>
Main content without right drawer
<template #left-drawer>
Left drawer content
</template>
</Drawer>
</div>

@tab Vue

```vue

<template>
  <Drawer>
    Main content without right drawer
    <template #left-drawer>
      Left drawer content
    </template>
  </Drawer>
</template>

<script setup>
  import { Drawer } from "@ghentcdh/ui";
</script>
```

:::

### Right drawer only

::: tabs

@tab Preview

<div style="height: 200px; border: 1px solid #d1d5db;">
<Drawer>
Main content without left drawer
<template #right-drawer>
Right drawer content
</template>
</Drawer>
</div>

@tab Vue

```vue

<template>
  <Drawer>
    Main content without left drawer
    <template #right-drawer>
      Right drawer content
    </template>
  </Drawer>
</template>

<script setup>
  import { Drawer } from "@ghentcdh/ui";
</script>
```

:::

### Initially closed

::: tabs

@tab Preview

<div style="height: 200px; border: 1px solid #d1d5db;">
<Drawer :initial-left-open="false" :initial-right-open="false">
Main content with both drawers initially closed
<template #left-drawer>
Left drawer content
</template>
<template #right-drawer>
Right drawer content
</template>
</Drawer>
</div>

@tab Vue

```vue

<template>
  <Drawer
    :initial-left-open="false"
    :initial-right-open="false"
  >
    Main content with both drawers initially closed
    <template #left-drawer>
      Left drawer content
    </template>
    <template #right-drawer>
      Right drawer content
    </template>
  </Drawer>
</template>

<script setup>
  import { Drawer } from "@ghentcdh/ui";
</script>
```

:::

### No drawers

::: tabs

@tab Preview

<div style="height: 200px; border: 1px solid #d1d5db;">
<Drawer>
Main content only, no side panels
</Drawer>
</div>

@tab Vue

```vue

<template>
  <Drawer>
    Main content only, no side panels
  </Drawer>
</template>

<script setup>
  import { Drawer } from "@ghentcdh/ui";
</script>
```

:::

</ClientOnly>
