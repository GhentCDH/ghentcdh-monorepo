<script setup lang="ts">
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
import { computed } from 'vue';

import type { TreeNode } from './props';

const props = defineProps<{
  active?: string;
  node: TreeNode;
  expanded: Set<string>;
  isExpanded: (id: string) => boolean;
}>();

const emit = defineEmits<{
  (e: 'toggle', node: TreeNode): void;
  (e: 'select', node: TreeNode): void;
}>();

const isActive = computed(() => props.active === props.node.id);
</script>

<template>
  <li class="ml-1">
    <div
      :class="[
        `flex items-center gap-1 cursor-pointer rounded-md px-1 py-0.5
      hover:bg-gray-100`,
        isActive ? 'text-primary' : '',
      ]"
    >
      <span
        v-if="node.children?.length > 0"
        class="flex items-center justify-center"
        @click="emit('toggle', node)"
      >
        <ChevronDownIcon
          v-if="node.children && isExpanded(node.id)"
          class="w-3 h-3"
        />
        <ChevronRightIcon
          v-else
          class="w-3 h-3"
        />
      </span>

      <div
        class="flex items-center gap-2 w-full min-w-0"
        @click="emit('select', node)"
      >
        <div class="truncate flex-1 min-w-0 text-left">
          {{ node.label }}
        </div>
        <div
          v-if="node.tag"
          class="badge badge-ghost badge-sm flex-shrink-0"
        >
          {{ node.tag }}
        </div>
      </div>
    </div>

    <ul
      v-if="node.children && isExpanded(node.id)"
      :class="[
        `ml-4 border-l pl-2`,
        { 'border-gray-200': !isActive, 'border-primary': isActive },
      ]"
    >
      <TreeItem
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :expanded="expanded"
        :active="active"
        :is-expanded="isExpanded"
        @toggle="emit('toggle', $event)"
        @select="emit('select', $event)"
      />
    </ul>
  </li>
</template>
