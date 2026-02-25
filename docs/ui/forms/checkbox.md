# Checkbox

```vue

<Checkbox
  v-model="model"
  label="The label"
/>
```

<script setup>
//
import { Checkbox } from "@ghentcdh/ui";
import {ref} from 'vue';

const model = ref(null);

</script>

## Default

<Checkbox
v-model="model"
label="The label"
:options="options"
/>

## Required

<Checkbox
v-model="model"
label="The label"
:required="true"
/>

## Checkbox with errors

<Checkbox
v-model="model"
label="The label"
errors="Some error"
/>
