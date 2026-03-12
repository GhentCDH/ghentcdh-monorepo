# Button

A flexible button component that supports icons, colors, sizes, and outline variants.

<script setup>
import { Btn, ButtonSize, Color, IconEnum } from '@ghentcdh/ui';

const configs = {
  default: {},
  square: { square: true },
  'square outline': { square: true, outline: true },
  outline: { outline: true },
};
const buttonSize = Object.values(ButtonSize);
const buttonColor = Object.values(Color);
const icons = [undefined, IconEnum.Plus];
</script>

## Usage

::: tabs

@tab Preview

<div class="flex gap-2 items-center">
  <Btn color="primary">Primary</Btn>
  <Btn color="secondary">Secondary</Btn>
  <Btn color="error">Error</Btn>
  <Btn color="blank">Blank</Btn>
</div>

@tab Vue

```vue
<template>
  <Btn color="primary">Primary</Btn>
  <Btn color="secondary">Secondary</Btn>
  <Btn color="error">Error</Btn>
  <Btn color="blank">Blank</Btn>
</template>

<script setup>
import { Btn } from '@ghentcdh/ui';
</script>
```

:::

## Props

| Prop       | Type                    | Default     | Description                                         |
|------------|-------------------------|-------------|-----------------------------------------------------|
| `as`       | `ButtonTag`             | `'button'`  | Render as `'button'` or `'a'` tag.                  |
| `href`     | `string`                | -           | URL when rendered as an anchor tag.                  |
| `type`     | `ButtonType`            | `'button'`  | Button type: `'button'`, `'submit'`, or `'reset'`.  |
| `color`    | `Color`                 | `'primary'` | Button color: `primary`, `secondary`, `error`, `blank`. |
| `size`     | `Size`                  | `'sm'`      | Button size: `xs`, `sm`, `lg`, `xl`.                |
| `icon`     | `IconEnum \| Component` | -           | Optional icon displayed before the slot content.    |
| `outline`  | `boolean`               | `false`     | Use outline style.                                  |
| `square`   | `boolean`               | `false`     | Use square shape.                                   |
| `disabled` | `boolean`               | `false`     | Disable the button.                                 |
| `tooltip`  | `string`                | -           | Tooltip text via `data-tip`.                        |

## Events

| Event   | Description                      |
|---------|----------------------------------|
| `click` | Emitted when the button is clicked. |

## Examples

### All variants

<table class="table">
  <thead>
    <tr>
      <th></th>
      <template v-for="icon in icons" :key="icon">
        <th v-for="size in buttonSize" :key="size">{{ size }}</th>
      </template>
    </tr>
  </thead>
  <tbody>
    <template v-for="(item, key, index) in configs" :key="index">
      <tr><th>{{ key }}</th></tr>
      <tr v-for="color in buttonColor" :key="color">
        <td>{{ color }}</td>
        <template v-for="icon in icons" :key="icon">
          <td v-for="size in buttonSize" :key="size" class="text-center m-2">
            <Btn v-bind="item" :size="size" :color="color" :icon="icon">
              {{ item.square ? (icon ? '' : 'Square') : 'Button' }}
            </Btn>
          </td>
        </template>
      </tr>
    </template>
  </tbody>
</table>

### With icon

::: tabs

@tab Preview

<div class="flex gap-2 items-center">
  <Btn :icon="IconEnum.Plus">Add</Btn>
  <Btn :icon="IconEnum.Edit" color="secondary">Edit</Btn>
  <Btn :icon="IconEnum.Delete" color="error">Delete</Btn>
</div>

@tab Vue

```vue
<template>
  <Btn :icon="IconEnum.Plus">Add</Btn>
  <Btn :icon="IconEnum.Edit" color="secondary">Edit</Btn>
  <Btn :icon="IconEnum.Delete" color="error">Delete</Btn>
</template>

<script setup>
import { Btn, IconEnum } from '@ghentcdh/ui';
</script>
```

:::

### Outline

::: tabs

@tab Preview

<div class="flex gap-2 items-center">
  <Btn outline color="primary">Primary</Btn>
  <Btn outline color="error">Error</Btn>
</div>

@tab Vue

```vue
<template>
  <Btn outline color="primary">Primary</Btn>
  <Btn outline color="error">Error</Btn>
</template>

<script setup>
import { Btn } from '@ghentcdh/ui';
</script>
```

:::

### Square

::: tabs

@tab Preview

<div class="flex gap-2 items-center">
  <Btn square :icon="IconEnum.Plus" />
  <Btn square outline :icon="IconEnum.Edit" />
</div>

@tab Vue

```vue
<template>
  <Btn square :icon="IconEnum.Plus" />
  <Btn square outline :icon="IconEnum.Edit" />
</template>

<script setup>
import { Btn, IconEnum } from '@ghentcdh/ui';
</script>
```

:::