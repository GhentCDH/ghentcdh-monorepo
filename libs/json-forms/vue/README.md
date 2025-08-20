# Vue json-forms frontend 

A json-forms library for Vue.js that allows you to create forms based on a JSON schema and a UI schema.

It uses the components inside `@ghentcdh/ui` for styling


## Install the library

```ssh
pnpm add @ghentcdh/json-forms-vue
```

# Add the styling to your project

## Install the libraries

```ssh
pnpm add @ghentcdh/auth/vue @ghentcdh/auth/backend
```

## Add the styling

Add the styling to your project by importing the css file in your main.js or App.vue file:

```scss 

```

## Show the form

A json form can be shown using the `FormComponent` component. The component requires a schema and a ui schema to be passed as props, and it uses the `v-model` directive to bind the form data.

```vue
import {FormComponent} from '@ghentcdh/json-forms-vue';

<div>
  <FormComponent 
    :schema="schema"
    :uischema="uischema"
    v-model="formData" />
  <pre>{{formData}}</pre>
</div>
```
