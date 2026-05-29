# Form

The `JsonForm` component renders a JSON-schema based form using [vee-validate](https://vee-validate.logaretm.com/) with Zod validation and the Tailwind/daisyUI renderers from `@ghentcdh/ui`. It takes a JSON `schema` and a `uiSchema`, binds the data via the `formData` prop, and emits rich lifecycle events — including a generic `events` channel that custom renderers can dispatch on.

Validation is powered by Zod schemas derived from the JSON schema via `fromJSONSchema`. Error display timing is configurable through the `errorMode` prop.

## Usage

::: tabs

@tab Preview

<ClientOnly>
  <div>
    <JsonForm
      id="demo-form"
      :schema="formSchema"
      :ui-schema="exampleUiSchema"
      :form-data="formData"
      @change="formData = $event"
    />
    <pre>{{ formData }}</pre>
  </div>
</ClientOnly>

@tab Vue

```vue
<template>
  <JsonForm
    id="my-form"
    :schema="schema"
    :ui-schema="uiSchema"
    :form-data="formData"
    @change="formData = $event"
  />
</template>

<script setup>
import { ref } from 'vue';
import { JsonForm } from '@ghentcdh/json-forms-vue';

const formData = ref({});
</script>
```

:::

## Props

| Prop        | Type        | Required | Default   | Description                                                                         |
|-------------|-------------|----------|-----------|-------------------------------------------------------------------------------------|
| `id`        | `String`    | true     | —         | Unique id applied to the underlying `<form>` element                                |
| `schema`    | `Object`    | true     | —         | JSON schema describing the shape of the form data                                   |
| `uiSchema`  | `Object`    | true     | —         | UI schema describing the layout and controls                                        |
| `formData`  | `Object`    | false    | `{}`      | Initial form data. When changed from outside, values are synced into vee-validate   |
| `disabled`  | `Boolean`   | false    | `false`   | Disables all controls inside the form                                               |
| `errorMode` | `ErrorMode` | false    | `'onBlur'`| Controls when validation errors are displayed (see [Error modes](#error-modes))      |

## Events

| Event    | Payload                            | Description                                                                            |
|----------|------------------------------------|----------------------------------------------------------------------------------------|
| `change` | `data: Record<string, any>`        | Emitted on every change with the latest form data                                      |
| `valid`  | `valid: boolean`                   | Emitted whenever validity changes. `true` when the form has no validation errors       |
| `errors` | `errors: { path, message }[]`      | Array of validation errors. Empty when the form is valid                               |
| `submit` | `{ data, valid }: SubmitFormEvent` | Emitted when the native form submit handler fires                                      |
| `events` | `payload: FormEventPayload`        | Generic event channel for custom renderers — see [Custom events](#custom-events) below |

### `SubmitFormEvent`

```ts
type SubmitFormEvent = {
  data: Record<string, any>;
  valid: boolean;
};
```

## Error modes

The `errorMode` prop controls when validation errors become visible. Import the `ErrorMode` type for type safety:

```ts
import type { ErrorMode } from '@ghentcdh/json-forms-vue';
```

| Mode       | When errors appear                    | Use case                                 |
|------------|---------------------------------------|------------------------------------------|
| `onBlur`   | After field loses focus (`touched`)   | Default — least disruptive               |
| `onChange`  | As soon as value changes (`dirty`)    | Inline feedback during typing            |
| `onSubmit` | After form submit is attempted        | Minimal interruption, batch errors       |
| `always`   | Immediately, even before interaction  | Pre-filled forms with known invalid data |

```vue
<JsonForm id="my-form" :schema="schema" :ui-schema="uiSchema" error-mode="onChange" />
```

## Error message customization

Error messages can be customized at three levels (highest priority first):

### 1. Per-field override via UI schema

Set `options.errorMessage` on a control in the UI schema:

```ts
ControlBuilder.properties('name').option('errorMessage', 'Please enter your name');
```

### 2. Pattern-based transforms

The `formatError` utility transforms raw Zod messages via regex patterns. It is applied automatically inside `JsonForm`. Built-in patterns:

| Raw Zod message | Transformed message |
|---|---|
| `Invalid input: expected string, received undefined` | `This field is required` |
| `String must contain at least 3` | `Must be at least 3 characters` |
| `Number must be greater than or equal to 5` | `Minimum value is 5` |

### 3. Global Zod error map

Call `registerZodErrorMap()` once at app startup for friendlier global defaults:

```ts
import { registerZodErrorMap } from '@ghentcdh/json-forms-vue';

registerZodErrorMap();
```

## Custom events

Custom renderers inside the form can dispatch typed events that bubble up through the `events` emit. This is useful when a control needs to trigger an action on the host — for example, opening a modal to create a related entity and receiving the created record back.

### `FormEventPayload`

```ts
type FormEventName = 'create';

type FormEventPayload<TData = any, TResult = any> = {
  event: FormEventName;        // one of the defined event names
  type: string;                // user-defined entity key (e.g. 'author', 'keyword')
  data?: TData;                // optional data sent with the event
  onSuccess: (result: TResult) => void; // callback invoked by the host on success
  onError?: (error: unknown) => void;   // callback invoked by the host on failure
};
```

### Dispatching an event from a renderer

Use the `useFormEvents` composable to dispatch an event from a custom control. When no host is listening, the dispatch is a safe no-op.

```ts
import { useFormEvents } from '@ghentcdh/json-forms-vue';

const { dispatch } = useFormEvents();

const onClickCreate = () => {
  dispatch({
    event: 'create',
    type: 'author',
    data: { name: 'New author' },
    onSuccess: (result) => {
      // renderer reacts to the created entity
    },
  });
};
```

### Handling events in the host

Bind to the `events` emit on `JsonForm` to intercept dispatches from renderers. Call `onSuccess` (or `onError`) to resolve the flow inside the renderer.

```vue
<template>
  <JsonForm
    id="my-form"
    :schema="schema"
    :ui-schema="uiSchema"
    :form-data="formData"
    @change="formData = $event"
    @events="onFormEvent"
  />
</template>

<script setup>
import type { FormEventPayload } from '@ghentcdh/json-forms-vue';

const onFormEvent = (payload: FormEventPayload) => {
  if (payload.event === 'create' && payload.type === 'author') {
    createAuthor(payload.data)
      .then(payload.onSuccess)
      .catch(payload.onError);
  }
};
</script>
```

<script setup lang="ts">
import { formSchema, exampleUiSchema } from '@source/json-forms/vue/schema';
import { ref } from 'vue';
import { JsonForm } from '@ghentcdh/json-forms-vue';

const formData = ref({});
const formDataDisabled = ref({ name: 'read only', firstname: 'John' });
const formDataEvents = ref({});
const eventLog = ref([]);

const onFormEvent = (payload) => {
  eventLog.value = [
    { event: payload.event, type: payload.type, data: payload.data },
    ...eventLog.value,
  ].slice(0, 5);
  payload.onSuccess?.({ ok: true });
};
</script>

<ClientOnly>

## Examples

### Disabled

Renders every control in a read-only state.

::: tabs

@tab Preview

<JsonForm
  id="demo-form-disabled"
  :schema="formSchema"
  :ui-schema="exampleUiSchema"
  :disabled="true"
  :form-data="formDataDisabled"
/>

@tab Vue

```vue
<template>
  <JsonForm
    id="disabled-form"
    :schema="schema"
    :ui-schema="uiSchema"
    :disabled="true"
    :form-data="formData"
  />
</template>

<script setup>
import { ref } from 'vue';
import { JsonForm } from '@ghentcdh/json-forms-vue';

const formData = ref({ name: 'read only', firstname: 'John' });
</script>
```

:::

### Error mode: onChange

Errors appear as soon as the user types (after the first change).

::: tabs

@tab Preview

<JsonForm
  id="demo-form-onchange"
  :schema="formSchema"
  :ui-schema="exampleUiSchema"
  :form-data="{}"
  error-mode="onChange"
/>

@tab Vue

```vue
<template>
  <JsonForm
    id="onchange-form"
    :schema="schema"
    :ui-schema="uiSchema"
    :form-data="formData"
    error-mode="onChange"
    @change="formData = $event"
  />
</template>

<script setup>
import { ref } from 'vue';
import { JsonForm } from '@ghentcdh/json-forms-vue';

const formData = ref({});
</script>
```

:::

### Error mode: always

Errors are visible immediately, even before any user interaction.

::: tabs

@tab Preview

<JsonForm
  id="demo-form-always"
  :schema="formSchema"
  :ui-schema="exampleUiSchema"
  :form-data="{}"
  error-mode="always"
/>

@tab Vue

```vue
<template>
  <JsonForm
    id="always-form"
    :schema="schema"
    :ui-schema="uiSchema"
    :form-data="formData"
    error-mode="always"
    @change="formData = $event"
  />
</template>

<script setup>
import { ref } from 'vue';
import { JsonForm } from '@ghentcdh/json-forms-vue';

const formData = ref({});
</script>
```

:::

### Handling custom renderer events

Hook into `@events` to receive payloads dispatched by custom renderers. Call `onSuccess` (or `onError`) to resolve the flow.

::: tabs

@tab Preview

<JsonForm
  id="demo-form-events"
  :schema="formSchema"
  :ui-schema="exampleUiSchema"
  :form-data="formDataEvents"
  @change="formDataEvents = $event"
  @events="onFormEvent"
/>

<div v-if="eventLog.length">
  <strong>Last events:</strong>
  <pre>{{ eventLog }}</pre>
</div>

@tab Vue

```vue
<template>
  <JsonForm
    id="events-form"
    :schema="schema"
    :ui-schema="uiSchema"
    :form-data="formData"
    @change="formData = $event"
    @events="onFormEvent"
  />
</template>

<script setup>
import { ref } from 'vue';
import { JsonForm, type FormEventPayload } from '@ghentcdh/json-forms-vue';

const formData = ref({});

const onFormEvent = (payload: FormEventPayload) => {
  if (payload.event === 'create') {
    // perform the async work, then hand the result back to the renderer
    create(payload.type, payload.data)
      .then(payload.onSuccess)
      .catch(payload.onError);
  }
};
</script>
```

:::

</ClientOnly>
