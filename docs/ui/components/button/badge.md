# Button Badge

A badge-styled button component, useful for tags and compact actions.

<script setup>
import { BtnBadge, BadgeSize, Color, IconEnum } from '@ghentcdh/ui';

const badgeSize = Object.values(BadgeSize);
const badgeColor = Object.values(Color);
const icons = [undefined, IconEnum.Close];
</script>

## Usage

::: tabs

@tab Preview

<div class="flex gap-2 items-center">
  <BtnBadge color="primary">Primary</BtnBadge>
  <BtnBadge color="secondary">Secondary</BtnBadge>
  <BtnBadge color="error">Error</BtnBadge>
</div>

@tab Vue

```vue
<template>
  <BtnBadge color="primary">Primary</BtnBadge>
  <BtnBadge color="secondary">Secondary</BtnBadge>
  <BtnBadge color="error">Error</BtnBadge>
</template>

<script setup>
import { BtnBadge } from '@ghentcdh/ui';
</script>
```

:::

## Props

| Prop       | Type                    | Default    | Description                                              |
|------------|-------------------------|------------|----------------------------------------------------------|
| `color`    | `Color`                 | -          | Badge color: `primary`, `secondary`, `error`, `blank`.   |
| `size`     | `Size`                  | `'sm'`     | Badge size: `xs`, `sm`, `lg`, `xl`.                      |
| `icon`     | `IconEnum \| Component` | -          | Optional icon displayed after the slot content.          |
| `type`     | `ButtonType`            | `'button'` | Button type: `'button'`, `'submit'`, or `'reset'`.       |
| `disabled` | `boolean`               | `false`    | Disable the badge button.                                |

## Events

| Event   | Description                            |
|---------|----------------------------------------|
| `click` | Emitted when the badge is clicked.     |

## Examples

### With icon

::: tabs

@tab Preview

<div class="flex gap-2 items-center">
  <BtnBadge color="primary" :icon="IconEnum.Close">Tag</BtnBadge>
  <BtnBadge color="error" :icon="IconEnum.Close">Remove</BtnBadge>
</div>

@tab Vue

```vue
<template>
  <BtnBadge color="primary" :icon="IconEnum.Close">Tag</BtnBadge>
  <BtnBadge color="error" :icon="IconEnum.Close">Remove</BtnBadge>
</template>

<script setup>
import { BtnBadge, IconEnum } from '@ghentcdh/ui';
</script>
```

:::

### All variants

<table class="table">
  <thead>
    <tr>
      <th></th>
      <template v-for="icon in icons" :key="icon">
        <th v-for="size in badgeSize" :key="size">{{ size }}</th>
      </template>
    </tr>
  </thead>
  <tbody>
    <tr v-for="color in badgeColor" :key="color">
      <td>{{ color }}</td>
      <template v-for="icon in icons" :key="icon">
        <td v-for="size in badgeSize" :key="size" class="text-center m-2">
          <BtnBadge :size="size" :color="color" :icon="icon">Badge</BtnBadge>
        </td>
      </template>
    </tr>
  </tbody>
</table>