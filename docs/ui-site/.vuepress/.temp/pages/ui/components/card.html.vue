<template><div><h1 id="card" tabindex="-1"><a class="header-anchor" href="#card"><span>Card</span></a></h1>
<Card class="w-96">
    <template #title>Header</template>
    Content
    <template #actions >
      <button class="btn btn-primary">
          Some action
        </button>
    </template>
  </Card></div></template>


<script setup>
import {
Card
} from "@ghentcdh/ui";

</script>