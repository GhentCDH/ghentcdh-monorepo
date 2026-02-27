# form array

<script setup lang="ts">
//
import { formSchema, fixedArrayUiSchema, arrayUiSchema } from '@source/json-forms/vue/schema';
import { ref, shallowRef, onMounted } from 'vue';
import {FormComponent} from '@ghentcdh/json-forms-vue';

/** state */
const formData = ref({
  name: '123',
  emails: [{ email: '' }, { email: '' }, { email: '' }],
})

</script>

# Array

::: tabs

@tab Preview
<ClientOnly>
  <!-- render only when the client bits are ready -->
  <div class="flex" style="gap: 4rem">
    <div>
     <h2>Fixed data array</h2>
      <FormComponent
        :schema="formSchema"
        :uischema="fixedArrayUiSchema"
        v-model="formData"
      />
    </div>
    <div>
     <h2>Variable data array</h2>
      <FormComponent
        :schema="formSchema"
        :uischema="arrayUiSchema"
        v-model="formData"
      />
    </div>

  </div>
</ClientOnly>

@tab FixedArraySchema
<pre>
{{fixedArrayUiSchema}}
</pre>

@tab VariableArraySchema
<pre>
{{arrayUiSchema}}
</pre>
:::
