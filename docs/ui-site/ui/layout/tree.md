---
Tree
---

# Tree

A recursive tree view component for hierarchical data. Branch nodes (with `children`) expand/collapse on click; leaf nodes emit `select`.

<script setup>
import { TreeView } from '@ghentcdh/ui';
import { ref } from 'vue';

const active = ref('');
const onSelect = (node) => { active.value = node.id; };

const treeData = [
  { id: 'src', label: 'src', tag: 'demo', children: [
    { id: 'components', label: 'components', children: [
      { id: 'Button.vue', label: 'Button.vue', tag: 'component' },
      { id: 'Card.vue', label: 'Card.vue', tag: 'component' },
      { id: 'long.vue', label: "Some very long text that doesn't fit inside the text.vue", tag: 'component' },
    ]},
    { id: 'App.vue', label: 'App.vue' },
  ]},
  { id: 'package.json', label: 'package.json' },
];
</script>

## Usage

::: tabs

@tab Preview

<ClientOnly>
  <div style="width: 300px; border: 1px solid #d1d5db; padding: 8px; border-radius: 4px;">
    <TreeView :data="treeData" :active="active" @select="onSelect" />
  </div>
  <p style="margin-top: 8px; font-size: 0.875rem;">Selected: <code>{{ active || '—' }}</code></p>
</ClientOnly>

@tab Vue

```vue
<template>
  <TreeView
    :data="treeData"
    :active="active"
    @select="onSelect"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TreeView } from '@ghentcdh/ui';
import type { TreeNode } from '@ghentcdh/ui';

const active = ref('');

const treeData: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    children: [
      {
        id: 'components',
        label: 'components',
        children: [
          { id: 'Button.vue', label: 'Button.vue', tag: 'component' },
          { id: 'Card.vue',   label: 'Card.vue',   tag: 'component' },
        ],
      },
      { id: 'App.vue', label: 'App.vue' },
    ],
  },
  { id: 'package.json', label: 'package.json' },
];

const onSelect = (node: TreeNode) => {
  active.value = node.id;
};
</script>
```

:::

## Props

| Prop     | Type         | Required | Default | Description                                       |
|----------|--------------|----------|---------|---------------------------------------------------|
| `data`   | `TreeNode[]` | true     | —       | Root-level nodes to render                        |
| `active` | `string`     | false    | —       | `id` of the currently highlighted (active) node   |

## Events

| Event    | Payload    | Description                             |
|----------|------------|-----------------------------------------|
| `select` | `TreeNode` | Emitted when the user clicks a leaf node |

## `TreeNode`

```ts
interface TreeNode {
  id: string;            // unique identifier used for active state and expand tracking
  label: string;         // display text
  tag?: string;          // optional badge shown next to the label
  children?: TreeNode[]; // child nodes — omit or leave empty for leaf nodes
}
```

Nodes with a non-empty `children` array are branches: clicking them toggles expand/collapse and does **not** emit `select`. Nodes without children are leaves: clicking them emits `select` and marks the node as active.
