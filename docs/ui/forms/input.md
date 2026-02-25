# Input

```vue

<Input
  v-model="model"
  label="The label"
  :options="options"
/>
```

<script setup>
//
import { Input } from "@ghentcdh/ui";
import {ref} from 'vue';

const model = ref(null);

</script>

## Default

<Input
v-model="model"
label="Default text input"
/>

## Required

<Input
v-model="model"
label="The label"
:required="true"
/>

## Checkbox with errors

<Input
v-model="model"
label="The label"
:is-touched="true"
errors="Some error"
/>
