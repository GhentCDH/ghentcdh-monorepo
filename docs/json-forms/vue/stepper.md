---
Stepper
---

<script setup>
//
import {ref} from 'vue';
import {CategoryBuilder, ControlBuilder, LayoutBuilder} from '@ghentcdh/json-forms-core';
import {FormComponent} from '@ghentcdh/json-forms-vue';


const formData =  new ref({});

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
};

const uischema = LayoutBuilder.stepper(true)
    .addControls(
      CategoryBuilder.label('step 1').addControls(
        LayoutBuilder.horizontal().addControls(
            ControlBuilder.properties('name'),
            ControlBuilder.properties('firstname'),
          )

      ),
      CategoryBuilder.label('step 2').addControls(),
      CategoryBuilder.label('step 3').addControls()
    )
    .build();

</script>

# Stepper

<div>
<FormComponent :schema="schema"
                :uischema="uischema"    
                v-model="formData" />
<pre>{{formData}}</pre>
</div>
