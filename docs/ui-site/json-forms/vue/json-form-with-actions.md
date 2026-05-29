# Form with actions

A wrapper around `JsonForm` that adds a collapsible card with **Save** and **Clear** actions, validation feedback, and optional automatic submission to a backend.

When the `uri` prop is provided, the component saves the form data to the backend via `FormStore` (POST for new records, PATCH for existing ones based on the initially provided form data's `id`). When `uri` is not provided, the component emits a `submit` event so the consumer can handle submission.

## Usage

::: tabs

@tab Preview

<ClientOnly>
  <div>
    <JsonFormWithActions
      id="demo-form"
      create-title="Create record"
      update-title="Update record"
      :schema="formSchema"
      :ui-schema="smallUiSchema"
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
  <JsonFormWithActions
    id="demo-form"
    create-title="Create record"
    update-title="Update record"
    :schema="schema"
    :ui-schema="uiSchema"
    v-model="formData"
    @submit="onSubmit"
    @valid="onValid"
  />
</template>

<script setup>
import { ref } from 'vue';
import { JsonFormWithActions } from '@ghentcdh/json-forms-vue';

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

| Prop           | Type        | Required | Default    | Description                                                                                          |
| -------------- | ----------- | -------- | ---------- | ---------------------------------------------------------------------------------------------------- |
| `id`           | `String`    | true     | —          | Unique identifier used to generate the internal form id (`form_${id}`)                               |
| `createTitle`  | `String`    | true     | —          | Title shown when the initially provided form data has no `id`                                        |
| `updateTitle`  | `String`    | false    | —          | Title shown when the initially provided form data has an `id`. Falls back to `createTitle`           |
| `schema`       | `Object`    | false    | —          | JSON schema describing the form data shape                                                           |
| `uiSchema`     | `Object`    | false    | —          | UI schema describing the layout and control rendering                                                |
| `uri`          | `String`    | false    | —          | When provided, the component submits the form to this URI via `FormStore` instead of emitting events |
| `scrollable`   | `Boolean`   | false    | `false`    | When true, the form content scrolls and the action bar stays pinned at the bottom                    |
| `fullHeight`   | `Boolean`   | false    | `false`    | When true, the component takes the full height of its parent                                         |
| `errorMode`    | `ErrorMode` | false    | `'onBlur'` | Controls when validation errors are displayed (see [JsonForm error modes](./json-form.md#error-modes)) |

`v-model` binds to the form data object.

## Events

| Event     | Payload                       | Description                                                                                              |
| --------- | ----------------------------- | -------------------------------------------------------------------------------------------------------- |
| `submit`  | `data: any`                   | Emitted when the user clicks **Save** and the form is valid, **only when `uri` is not defined**          |
| `valid`   | `valid: boolean`              | Emitted whenever the form validity changes                                                               |
| `errors`  | `errors: { path, message }[]` | Forwards validation errors from the inner `JsonForm`                                                    |
| `success` | —                             | Emitted after a successful backend save (only when `uri` is defined)                                     |
| `events`  | `payload: FormEventPayload`   | Forwards form events from the inner `JsonForm`                                                           |
| `cancel`  | —                             | Emitted when the **Cancel** button is clicked (only visible when editing an existing record)              |

## Slots

| Slot      | Description                                                                                   |
| --------- | --------------------------------------------------------------------------------------------- |
| `actions` | Inserted before the built-in **Clear** and **Save** buttons, for custom action buttons        |

## Behaviour

- The inner form is wrapped in a `Collapse` component that uses `createTitle` / `updateTitle` as its header, determined by whether the initially provided form data has an `id`.
- Clicking **Save** marks the form as submitted (triggers `onSubmit` error mode) and validates. If valid:
  - When `uri` is defined: the data is saved via `FormStore` (POST if the initial data's `id` is falsy, PATCH otherwise) and `success` is emitted.
  - When `uri` is not defined: the `submit` event is emitted with the current form data.
- If the form is invalid when **Save** is clicked, an error `Alert` is shown.
- The **Clear** button resets `formData` to `{ id: null }` and is only visible for new records (when `formData.id` is falsy).
- The **Cancel** button is only visible when editing an existing record (when `formData.id` is truthy). It restores the form data to its initial state and emits `cancel`.

<script setup lang="ts">
import { formSchema, smallUiSchema } from '@source/json-forms/vue/schema';
import { ref } from 'vue';
import { JsonFormWithActions } from '@ghentcdh/json-forms-vue';

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

<JsonFormWithActions
  id="demo-form-uri"
  create-title="Create user"
  update-title="Update user"
  :schema="formSchema"
  :ui-schema="smallUiSchema"
  uri="/api/users"
  v-model="formDataWithUri"
  @success="() => {}"
/>
<pre>{{ formDataWithUri }}</pre>

@tab Vue

```vue
<template>
  <JsonFormWithActions
    id="user-form"
    create-title="Create user"
    update-title="Update user"
    :schema="schema"
    :ui-schema="uiSchema"
    uri="/api/users"
    v-model="formData"
    @success="onSuccess"
  />
</template>

<script setup>
import { ref } from 'vue';
import { JsonFormWithActions } from '@ghentcdh/json-forms-vue';

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

<JsonFormWithActions
  id="demo-form-custom"
  create-title="Create record"
  :schema="formSchema"
  :ui-schema="smallUiSchema"
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
  <JsonFormWithActions
    id="custom-form"
    create-title="Create record"
    :schema="schema"
    :ui-schema="uiSchema"
    v-model="formData"
    @submit="onSubmit"
    @valid="onValid"
  />
</template>

<script setup>
import { ref } from 'vue';
import { JsonFormWithActions } from '@ghentcdh/json-forms-vue';

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

### With error mode

Use `error-mode` to control when validation errors appear.

::: tabs

@tab Preview

<JsonFormWithActions
  id="demo-form-errormode"
  create-title="Create record (onChange)"
  :schema="formSchema"
  :ui-schema="smallUiSchema"
  error-mode="onChange"
  v-model="formDataCustomActions"
/>

@tab Vue

```vue
<template>
  <JsonFormWithActions
    id="onchange-form"
    create-title="Create record"
    :schema="schema"
    :ui-schema="uiSchema"
    error-mode="onChange"
    v-model="formData"
  />
</template>

<script setup>
import { ref } from 'vue';
import { JsonFormWithActions } from '@ghentcdh/json-forms-vue';

const formData = ref({});
</script>
```

:::

### With custom actions slot

Use the `actions` slot to place additional buttons next to the built-in **Clear** and **Save** buttons.

::: tabs

@tab Preview

<JsonFormWithActions
  id="demo-form-actions"
  create-title="Create record"
  :schema="formSchema"
  :ui-schema="smallUiSchema"
  v-model="formDataCustomActions"
>
  <template #actions>
    <button class="btn btn-outline">Extra action</button>
  </template>
</JsonFormWithActions>

@tab Vue

```vue
<template>
  <JsonFormWithActions
    id="custom-actions-form"
    create-title="Create record"
    :schema="schema"
    :ui-schema="uiSchema"
    v-model="formData"
  >
    <template #actions>
      <Btn :outline="true" @click="doSomething">Extra action</Btn>
    </template>
  </JsonFormWithActions>
</template>

<script setup>
import { ref } from 'vue';
import { JsonFormWithActions } from '@ghentcdh/json-forms-vue';
import { Btn } from '@ghentcdh/ui';

const formData = ref({});

const doSomething = () => {
  // ...
};
</script>
```

:::

</ClientOnly>
