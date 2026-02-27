# example

<script setup lang="ts">
//
import { formSchema, exampleUiSchema } from '@source/json-forms/vue/schema';
import { ref, shallowRef, onMounted } from 'vue';
import {FormComponent} from '@ghentcdh/json-forms-vue';

</script>

# Json form input

<ClientOnly>
  <div >
    <FormComponent
      :schema="formSchema"
      :uischema="exampleUiSchema"
      v-model="formData"
    />
    <pre>{{ formData }}</pre>
  </div>
</ClientOnly>
