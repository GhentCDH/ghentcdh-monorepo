# Form with actions

A wrapper around `FormComponent` that adds a collapsible card with **Save** and **Clear** actions, validation feedback, and optional automatic submission to a backend.

When the `uri` prop is provided, the component saves the form data to the backend via `FormStore` (POST for new records, PATCH for existing ones based on `formData.id`). When `uri` is not provided, the component emits a `submit` event so the consumer can handle submission.

## Usage

::: tabs

@tab Preview

<ClientOnly>
  <div>
    <FormWithActions
      id="demo-form"
      create-title="Create record"
      update-title="Update record"
      :schema="formSchema"
      :uischema="smallUiSchema"
      v-model="formData"
      @submit="onSubmit"
      @valid="onValid"
    />
    <pre>{{ formData }}</pre>
  </div>
</ClientOnly>

@tab Vue

```vue
<template>
  <FormWithActions
    id="demo-form"
    create-title="Create record"
    update-title="Update record"
    :schema="schema"
    :uischema="uischema"
    v-model="formData"
    @submit="onSubmit"
    @valid="onValid"
  />
</template>

<script setup>
import { ref } from 'vue';
import { FormWithActions } from '@ghentcdh/json-forms-vue';

const formData = ref({});

const onSubmit = (data) => {
  // handle the submit yourself when no `uri` is provided
  console.log('submit', data);
};

const onValid = (valid) => {
  console.log('valid', valid);
};
</script>
```

:::

## Props

| Prop           | Type                                   | Required | Default | Description                                                                                          |
| -------------- | -------------------------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `id`           | `String`                               | true     | —       | Unique identifier used to generate the internal form id (`form_${id}`)                               |
| `createTitle`  | `String`                               | true     | —       | Title shown when creating a new record (`formData.id` is falsy)                                      |
| `updateTitle`  | `String`                               | false    | —       | Title shown when editing an existing record. Falls back to `createTitle` if not provided             |
| `schema`       | `any`                                  | false    | —       | JSON schema describing the form data shape                                                           |
| `uischema`     | `any`                                  | false    | —       | UI schema describing the layout and control rendering                                                |
| `uri`          | `String`                               | false    | —       | When provided, the component submits the form to this URI via `FormStore` instead of emitting events |
| `formSchema`   | `Pick<FormSchemaModel, 'form' \| 'uri'>` | false  | —       | **Deprecated** — use `schema`, `uischema` and `uri` instead. Kept for backwards compatibility         |

`v-model` binds to the form data object.

## Events

| Event     | Payload                 | Description                                                                                              |
| --------- | ----------------------- | -------------------------------------------------------------------------------------------------------- |
| `submit`  | `data: any`             | Emitted when the user clicks **Save** and the form is valid, **only when `uri` is not defined**          |
| `valid`   | `valid: boolean`        | Emitted whenever the form validity changes                                                               |
| `success` | —                       | Emitted after a successful backend save (only when `uri` is defined)                                     |
| `events`  | `payload: FormEventPayload` | Forwards form events from the inner `FormComponent`                                                  |

## Slots

| Slot      | Description                                                                                   |
| --------- | --------------------------------------------------------------------------------------------- |
| `actions` | Inserted before the built-in **Clear** and **Save** buttons, for custom action buttons        |

## Behaviour

- The inner form is wrapped in a `Collapse` component that uses `createTitle` / `updateTitle` as its header.
- Clicking **Save** sets `submitted` to `true` and validates. If valid:
  - When `uri` is defined: the data is saved via `FormStore` (POST if `formData.id` is falsy, PATCH otherwise) and `success` is emitted.
  - When `uri` is not defined: the `submit` event is emitted with the current form data.
- If the form is invalid when **Save** is clicked, an error `Alert` is shown.
- The **Clear** button resets `formData` to `{ id: null }` and is only visible for new records (when `formData.id` is falsy).

<script setup lang="ts">
import { formSchema, smallUiSchema } from '@source/json-forms/vue/schema';
import { ref } from 'vue';
import { FormWithActions } from '@ghentcdh/json-forms-vue';

const formData = ref({});
const lastSubmit = ref(null);
const isValid = ref(false);

const onSubmit = (data) => {
  lastSubmit.value = data;
};

const onValid = (valid) => {
  isValid.value = valid;
};

const formDataWithUri = ref({});
const formDataCustomActions = ref({});
</script>

<ClientOnly>

## Examples

### With backend submission (`uri`)

When `uri` is provided, clicking **Save** posts the form data to the backend. No `submit` event is emitted.

::: tabs

@tab Preview

<FormWithActions
  id="demo-form-uri"
  create-title="Create user"
  update-title="Update user"
  :schema="formSchema"
  :uischema="smallUiSchema"
  uri="/api/users"
  v-model="formDataWithUri"
  @success="() => {}"
/>
<pre>{{ formDataWithUri }}</pre>

@tab Vue

```vue
<template>
  <FormWithActions
    id="user-form"
    create-title="Create user"
    update-title="Update user"
    :schema="schema"
    :uischema="uischema"
    uri="/api/users"
    v-model="formData"
    @success="onSuccess"
  />
</template>

<script setup>
import { ref } from 'vue';
import { FormWithActions } from '@ghentcdh/json-forms-vue';

const formData = ref({});

const onSuccess = () => {
  // the record was saved to the backend
};
</script>
```

:::

### Without backend submission (custom `submit` handler)

When `uri` is omitted, the component emits `submit` with the form data so you can handle persistence yourself.

::: tabs

@tab Preview

<FormWithActions
  id="demo-form-custom"
  create-title="Create record"
  :schema="formSchema"
  :uischema="smallUiSchema"
  v-model="formData"
  @submit="onSubmit"
  @valid="onValid"
/>

<div>
  <strong>Last submit:</strong>
  <pre>{{ lastSubmit }}</pre>
  <strong>Valid:</strong> {{ isValid }}
</div>

@tab Vue

```vue
<template>
  <FormWithActions
    id="custom-form"
    create-title="Create record"
    :schema="schema"
    :uischema="uischema"
    v-model="formData"
    @submit="onSubmit"
    @valid="onValid"
  />
</template>

<script setup>
import { ref } from 'vue';
import { FormWithActions } from '@ghentcdh/json-forms-vue';

const formData = ref({});

const onSubmit = (data) => {
  // handle the submit yourself (e.g. call a custom repository)
};

const onValid = (valid) => {
  // react to validity changes
};
</script>
```

:::

### With custom actions slot

Use the `actions` slot to place additional buttons next to the built-in **Clear** and **Save** buttons.

::: tabs

@tab Preview

<FormWithActions
  id="demo-form-actions"
  create-title="Create record"
  :schema="formSchema"
  :uischema="smallUiSchema"
  v-model="formDataCustomActions"
>
  <template #actions>
    <button class="btn btn-outline">Extra action</button>
  </template>
</FormWithActions>

@tab Vue

```vue
<template>
  <FormWithActions
    id="custom-actions-form"
    create-title="Create record"
    :schema="schema"
    :uischema="uischema"
    v-model="formData"
  >
    <template #actions>
      <Btn :outline="true" @click="doSomething">Extra action</Btn>
    </template>
  </FormWithActions>
</template>

<script setup>
import { ref } from 'vue';
import { FormWithActions } from '@ghentcdh/json-forms-vue';
import { Btn } from '@ghentcdh/ui';

const formData = ref({});

const doSomething = () => {
  // ...
};
</script>
```

:::

### Deprecated `formSchema` prop

The legacy `formSchema` prop still works for backwards compatibility, but new code should use `schema`, `uischema` and `uri` instead.

::: tabs

@tab Vue (deprecated)

```vue
<template>
  <FormWithActions
    id="legacy-form"
    create-title="Create record"
    :form-schema="{
      form: { schema, uiSchema: uischema },
      uri: '/api/users',
    }"
    v-model="formData"
  />
</template>
```

@tab Vue (preferred)

```vue
<template>
  <FormWithActions
    id="modern-form"
    create-title="Create record"
    :schema="schema"
    :uischema="uischema"
    uri="/api/users"
    v-model="formData"
  />
</template>
```

:::

</ClientOnly>