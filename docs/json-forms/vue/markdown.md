---
title: Markdown input
---

<script setup lang="ts">
import { ref, shallowRef, onMounted } from 'vue'

/** data */
const formData = ref({
  stringControl: `Example text **Bold**
Example text *italic*
Example text ~~strikethrough~~

 some more text`,
})

/** schema can be defined at build time */
const schema = {
  type: 'object',
  properties: {
    stringControl: {
      type: 'string',
      maxLength: 5,
    },
  },
  required: ['stringControl'],
}

/** client-only pieces */
const FormComponent = shallowRef<any>(null)
const uischema = ref<any>(null)

onMounted(async () => {
  // load browser-only modules dynamically
  const core = await import('@ghentcdh/json-forms-core')
  const vuePkg = await import('@ghentcdh/json-forms-vue')

  FormComponent.value = vuePkg.FormComponent

  const { ControlBuilder, LayoutBuilder } = core

  uischema.value = LayoutBuilder.vertical()
    .addControls(
      LayoutBuilder.horizontal().addControls(
        ControlBuilder.properties('stringControl').markdown(),
      ),
    )
    .build()
})
</script>

# Markdown input

<ClientOnly>
  <div v-if="FormComponent && uischema">
    <component
      :is="FormComponent"
      :schema="schema"
      :uischema="uischema"
      v-model="formData"
    />
    <pre>{{ formData }}</pre>
  </div>
</ClientOnly>
