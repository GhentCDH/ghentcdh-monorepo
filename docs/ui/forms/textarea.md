# Textarea

```vue

<Textarea
  v-model="model"
  label="The label"
  :options="options"
/>
```

<script setup>
//
import { Textarea } from "@ghentcdh/ui";
import {ref} from 'vue';

const model = ref(null);

</script>

## Default

value: <pre>{{model}}</pre>
<Textarea
v-model="model"
label="Default text input"
/>

## Required

<Textarea
v-model="model"
label="The label"
:required="true"
/>

## Checkbox with errors

<Textarea
v-model="model"
label="The label"
:is-touched="true"
errors="Some error"
/>
