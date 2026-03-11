# Markdown

<script setup>
//
import {
 Markdown
} from "@ghentcdh/ui";
import { ref } from 'vue';

const markdownContent = ref(`Example text **Bold**

Example text *italic*

Example text ~~strikethrough~~`);

</script>

## Default

<Markdown
v-model="markdownContent"
label="The label"
/>

<pre class="border" style="margin-top: 10px">{{markdownContent}}</pre>
