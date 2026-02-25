# form array

<script setup lang="ts">
import { ref, shallowRef, onMounted } from 'vue'

/** state */
const formData = ref({
  name: '123',
  emails: [{ email: '' }, { email: '' }, { email: '' }],
})

/** plain JSON is fine to define at build time */
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

/** lazy-loaded pieces (client-only) */
const FormComponent = shallowRef<any>(null)
const uischema = ref<any>(null)
const uischemaVariable = ref<any>(null)

onMounted(async () => {
  // guard is optional, but explicit:
  if (typeof window === 'undefined') return

  // Dynamic import to avoid SSR evaluation
  const core = await import('@ghentcdh/json-forms-core')
  const vuePkg = await import('@ghentcdh/json-forms-vue')

  FormComponent.value = vuePkg.FormComponent

  const { ControlBuilder, LayoutBuilder } = core

  uischema.value = LayoutBuilder.vertical()
    .addControls(
      ControlBuilder.properties('name'),
      ControlBuilder.properties('emails').detailFixed(
        LayoutBuilder.horizontal().addControls(
          ControlBuilder.properties('email'),
        ),
      ),
    )
    .build()

  uischemaVariable.value = LayoutBuilder.vertical()
    .addControls(
      ControlBuilder.properties('name'),
      ControlBuilder.properties('emails').detail(
        LayoutBuilder.horizontal().addControls(
          ControlBuilder.properties('email'),
        ),
      ),
    )
    .build()
})
</script>

# Array

<ClientOnly>
  <!-- render only when the client bits are ready -->
  <div v-if="FormComponent && uischema && uischemaVariable">
    <h2>Fixed data array</h2>
    <div>
      <component
        :is="FormComponent"
        :schema="schema"
        :uischema="uischema"
        v-model="formData"
      />
      <pre>{{ formData }}</pre>
    </div>

    <h2>Variable data array</h2>
    <div>
      <component
        :is="FormComponent"
        :schema="schema"
        :uischema="uischemaVariable"
        v-model="formData"
      />
      <pre>{{ formData }}</pre>
    </div>

  </div>
</ClientOnly>
