# Markdown

<script setup>
//
import {
SelectComponent, Markdown
} from "@ghentcdh/ui";
import { ref } from 'vue';

const model = ref(null);
const options = [{
    value: 1,
    label: "Option 1"
  },
  {
    value: 2,
    label: "Option 2"
  },
  {
    value: 3,
    label: "Option 3"
}];

const markdownContent = ref(`Example text **Bold**

Example text *italic*

Example text ~~strikethrough~~`);

</script>

## Default

<SelectComponent
v-model="model"
label="The label"
:options="options"
/>

<Markdown
v-model="markdownContent"
label="The label"
/>

<pre class="border" style="margin-top: 10px">{{markdownContent}}</pre>
