# Input Number

```vue

<InputNumber
  v-model="model"
  label="The label"
  :options="options"
/>
```

<script setup>
//
import { InputNumber } from "@ghentcdh/ui";
import {ref} from 'vue';

const model = ref(null);

</script>

## Default

value: <pre>{{model}}</pre>
<InputNumber
v-model="model"
label="Default text input"
/>

## Required

<InputNumber
v-model="model"
label="The label"
:required="true"
/>

## Checkbox with errors

<InputNumber
v-model="model"
label="The label"
:is-touched="true"
errors="Some error"
/>
