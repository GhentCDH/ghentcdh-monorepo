---
Pagination
---

# Pagination

<script setup>
import { ref } from 'vue';
import { PaginationComponent } from "@ghentcdh/ui";

const currentPage = ref(1);
const itemsPerPage = ref(20);

const updatePage = (page) => { currentPage.value = page; };
const updatePageSize = (size) => { itemsPerPage.value = size; currentPage.value = 1; };
</script>

```vue
<PaginationComponent
  :totalItems="100"
  :itemsPerPage="20"
  :currentPage="1"
  :page-size-options="[10, 20, 50, 100]"
  @update-page="updatePage"
  @update-page-size="updatePageSize"
/>
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `totalItems` | `Number` | `0` | Total number of items |
| `itemsPerPage` | `Number` | `1` | Items shown per page |
| `currentPage` | `Number` | `1` | Currently active page |
| `pageSizeOptions` | `Array` | `[10, 20, 50, 100]` | Options for the records-per-page dropdown |

## Events

| Event | Payload | Description |
|---|---|---|
| `update-page` | `number` | Emitted when the user navigates to a page |
| `update-page-size` | `number` | Emitted when the user changes the page size |

## Default

<PaginationComponent
  :totalItems="itemsPerPage * 5"
  :itemsPerPage="itemsPerPage"
  :currentPage="currentPage"
  @update-page="updatePage"
  @update-page-size="updatePageSize"
/>

## One item

<PaginationComponent
  :totalItems="1"
  :itemsPerPage="20"
  :currentPage="1"
/>

## Zero items

<PaginationComponent
  :totalItems="0"
  :itemsPerPage="20"
  :currentPage="1"
/>

## 40 pages

<PaginationComponent
  :totalItems="20 * 40"
  :itemsPerPage="20"
  :currentPage="1"
/>

## Active page in the middle

<PaginationComponent
  :totalItems="20 * 50"
  :itemsPerPage="20"
  :currentPage="25"
/>

## Active page at the end

<PaginationComponent
  :totalItems="20 * 48"
  :itemsPerPage="20"
  :currentPage="48"
/>
