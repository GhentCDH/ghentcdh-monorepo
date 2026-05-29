# Icons

Icons are based on [Heroicons](https://heroicons.com/) (outline style). You can use the built-in `IconEnum` or pass any `@heroicons/vue` component directly.

## Overview

<script setup>
import { Icon, IconEnum } from "@ghentcdh/ui";

const icons = Object.entries(IconEnum);
</script>

::: tabs

@tab xs

<table class="table">
  <thead>
    <tr>
      <th>Preview</th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="[key, value] in icons" :key="key">
      <td><Icon :icon="value" size="xs" /></td>
      <td><code>IconEnum.{{ key }}</code></td>
    </tr>
  </tbody>
</table>

@tab sm

<table class="table">
  <thead>
    <tr>
      <th>Preview</th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="[key, value] in icons" :key="key">
      <td><Icon :icon="value" size="sm" /></td>
      <td><code>IconEnum.{{ key }}</code></td>
    </tr>
  </tbody>
</table>

@tab lg

<table class="table">
  <thead>
    <tr>
      <th>Preview</th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="[key, value] in icons" :key="key">
      <td><Icon :icon="value" size="lg" /></td>
      <td><code>IconEnum.{{ key }}</code></td>
    </tr>
  </tbody>
</table>

@tab xl

<table class="table">
  <thead>
    <tr>
      <th>Preview</th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="[key, value] in icons" :key="key">
      <td><Icon :icon="value" size="xl" /></td>
      <td><code>IconEnum.{{ key }}</code></td>
    </tr>
  </tbody>
</table>

@tab default

<table class="table">
  <thead>
    <tr>
      <th>Preview</th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="[key, value] in icons" :key="key">
      <td><div class="w-8 h-8"><Icon :icon="value" /></div></td>
      <td><code>IconEnum.{{ key }}</code></td>
    </tr>
  </tbody>
</table>

:::

## Usage

::: tabs

@tab Preview

<div class="flex gap-4 items-center">
  <Icon :icon="IconEnum.Edit" size="sm" />
  <Icon :icon="IconEnum.Delete" size="sm" />
  <Icon :icon="IconEnum.Plus" size="sm" />
</div>

@tab Vue

```vue
<template>
  <Icon :icon="IconEnum.Edit" size="sm" />
  <Icon :icon="IconEnum.Delete" size="sm" />
  <Icon :icon="IconEnum.Plus" size="sm" />
</template>

<script setup>
import { Icon, IconEnum } from '@ghentcdh/ui';
</script>
```

:::

## Custom Heroicons

You can pass any `@heroicons/vue` component directly to the `icon` prop.

::: tabs

@tab Preview

<Icon :icon="IconEnum.Check" size="sm" />

@tab Vue

```vue
<template>
  <Icon :icon="BeakerIcon" size="sm" />
</template>

<script setup>
import { Icon } from '@ghentcdh/ui';
import { BeakerIcon } from '@heroicons/vue/24/outline';
</script>
```

:::

## Props

| Prop   | Type                    | Default | Description                                                             |
|--------|-------------------------|---------|-------------------------------------------------------------------------|
| `icon` | `IconEnum \| Component` | -       | Icon to render. Either an `IconEnum` value or a heroicon Vue component. |
| `size` | `Size`                  | -       | Icon size: `xs` (8px), `sm` (16px), `lg` (24px), `xl` (32px), or unset (fills container). |