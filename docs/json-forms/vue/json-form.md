---
title: Json form
---

<script setup lang="ts">
import { ref, shallowRef, onMounted } from 'vue'

/** reactive model */
const formData = ref<Record<string, any>>({})

/** JSON schema can be defined at build time */
const schema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    createdAt: { type: 'string', format: 'date-time' },
    name: { type: 'string' },
    firstname: { type: 'string' },
    age: { type: 'integer' },
    total: { type: 'number' },
    boolean: { type: 'boolean' },
    comment: { type: 'string' },
    autocomplete: { type: 'string' },
    emails: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          createdAt: { type: 'string', format: 'date-time' },
          email: { type: 'string' },
        },
        required: ['id', 'createdAt', 'email'],
        additionalProperties: false,
      },
    },
  },
  required: ['name'],
  additionalProperties: false,
}

/** client-only pieces (loaded after mount) */
const FormComponent = shallowRef<any>(null)
const uischema = ref<any>(null)

onMounted(async () => {
  const core = await import('@ghentcdh/json-forms-core')
  const vuePkg = await import('@ghentcdh/json-forms-vue')

  FormComponent.value = vuePkg.FormComponent
  const { ControlBuilder, LayoutBuilder } = core

  // Build UI schema
  const rows = [
    LayoutBuilder.horizontal().addControls(
      ControlBuilder.properties('name'),
      ControlBuilder.properties('firstname'),
    ),
    LayoutBuilder.horizontal().addControls(
      ControlBuilder.properties('age').width('xs'),
      ControlBuilder.properties('total'),
      ControlBuilder.properties('boolean'),
    ),
    // If you don't want a row here, just omit it.
    // If you do want a textarea later, uncomment next line:
    // LayoutBuilder.horizontal().addControls(ControlBuilder.properties('comment').textArea()),
    LayoutBuilder.horizontal().addControls(
      ControlBuilder.properties('autocomplete').autocomplete({}),
    ),
    LayoutBuilder.horizontal().addControls(
      ControlBuilder.properties('emails').detail(
        LayoutBuilder.horizontal().addControls(
          ControlBuilder.properties('email'),
        ),
      ),
    ),
  ]

  uischema.value = LayoutBuilder.vertical().addControls(...rows).build()
})
</script>

# Json form input

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
