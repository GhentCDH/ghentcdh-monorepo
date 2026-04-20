# Form

The `FormComponent` renders a JSON-schema based form using [JSON Forms](https://jsonforms.io/) combined with the Tailwind/daisyUI renderers from `@ghentcdh/ui`. It takes a JSON `schema` and a `uiSchema`, binds the data via the `formData` prop, and emits rich lifecycle events — including a generic `events` channel that custom renderers can dispatch on.

When `formData` is set from outside the component, the data is automatically stripped of unknown properties using the Zod schema derived from the JSON schema.

## Usage

::: tabs

@tab Preview

<ClientOnly>
  <div>
    <FormComponent
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
  <FormComponent
    id="my-form"
    :schema="schema"
    :ui-schema="uiSchema"
    :form-data="formData"
    @change="formData = $event"
  />
</template>

<script setup>
import { ref } from 'vue';
import { FormComponent } from '@ghentcdh/json-forms-vue';

const formData = ref({});
</script>
```

:::

## Props

| Prop        | Type                               | Required | Default | Description                                                                        |
| ----------- | ---------------------------------- | -------- | ------- | ---------------------------------------------------------------------------------- |
| `id`        | `String`                           | true     | —       | Unique id applied to the underlying `<form>` element and to the `<json-forms>` key |
| `schema`    | `any`                              | true     | —       | JSON schema describing the shape of the form data                                  |
| `uiSchema`  | `any`                              | true     | —       | UI schema describing the layout and controls                                       |
| `formData`  | `Data`                             | false    | `{}`    | Initial form data. When changed from outside, unknown properties are stripped via Zod |
| `renderers` | `JsonFormsRendererRegistryEntry[]` | false    | —       | Extra renderers merged in front of the built-in `tailwindRenderers`                |
| `disabled`  | `Boolean`                          | false    | `false` | Disables all controls inside the form                                              |

## Events

| Event     | Payload                                     | Description                                                                              |
| --------- | ------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `change`  | `data: Record<string, any>`                 | Emitted on every change with the latest form data                                        |
| `valid`   | `valid: boolean`                            | Emitted whenever validity changes. `true` when the form has no validation errors         |
| `errors`  | `errors: any[]`                             | Array of validation errors produced by Ajv. Empty when the form is valid                 |
| `submit`  | `{ data, valid }: SubmitFormEvent`          | Emitted when the native form submit handler fires                                        |
| `events`  | `payload: FormEventPayload`                 | Generic event channel for custom renderers — see [Custom events](#custom-events) below   |

### `SubmitFormEvent`

```ts
type SubmitFormEvent = {
  data: Record<string, any>;
  valid: boolean;
};
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

Bind to the `events` emit on `FormComponent` to intercept dispatches from renderers. Call `onSuccess` (or `onError`) to resolve the flow inside the renderer.

```vue
<template>
  <FormComponent
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

## Custom renderers

Extra renderers can be supplied via the `renderers` prop. They are merged in front of the built-in `tailwindRenderers`, so they take priority over the defaults.

```vue
<FormComponent
  id="my-form"
  :schema="schema"
  :ui-schema="uiSchema"
  :renderers="[myCustomEntry]"
  :form-data="formData"
  @change="formData = $event"
/>
```

<script setup lang="ts">
import { formSchema, exampleUiSchema } from '@source/json-forms/vue/schema';
import { ref } from 'vue';
import { FormComponent } from '@ghentcdh/json-forms-vue';

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

<FormComponent
  id="demo-form-disabled"
  :schema="formSchema"
  :ui-schema="exampleUiSchema"
  :disabled="true"
  :form-data="formDataDisabled"
/>

@tab Vue

```vue
<template>
  <FormComponent
    id="disabled-form"
    :schema="schema"
    :ui-schema="uiSchema"
    :disabled="true"
    :form-data="formData"
  />
</template>

<script setup>
import { ref } from 'vue';
import { FormComponent } from '@ghentcdh/json-forms-vue';

const formData = ref({ name: 'read only', firstname: 'John' });
</script>
```

:::

### Handling custom renderer events

Hook into `@events` to receive payloads dispatched by custom renderers. Call `onSuccess` (or `onError`) to resolve the flow.

::: tabs

@tab Preview

<FormComponent
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
  <FormComponent
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
import {
  FormComponent,
  type FormEventPayload,
} from '@ghentcdh/json-forms-vue';

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
