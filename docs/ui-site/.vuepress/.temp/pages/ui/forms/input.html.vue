<template><div><h1 id="input" tabindex="-1"><a class="header-anchor" href="#input"><span>Input</span></a></h1>
<p>A text input component for single-line user input.</p>
<h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage"><span>Usage</span></a></h2>
<Tabs :data='[{"id":"Preview"},{"id":"Vue"}]'>
<template #title0="{ value, isActive }">Preview</template>
<template #title1="{ value, isActive }">Vue</template>
<template #tab0="{ value, isActive }">
<Input
v-model="model"
label="The label"
/>
</template>
<template #tab1="{ value, isActive }">
<div class="language-vue line-numbers-mode" data-highlighter="shiki" data-ext="vue" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-vue"><span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Input</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">    v-model</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"model"</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">    label</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"The label"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  /></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> setup</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">  import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Input</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "@ghentcdh/ui"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</Tabs>
<h2 id="props" tabindex="-1"><a class="header-anchor" href="#props"><span>Props</span></a></h2>
<table>
<thead>
<tr>
<th>Prop</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>v-model</code></td>
<td><code v-pre>any</code></td>
<td>—</td>
<td>The input value</td>
</tr>
<tr>
<td><code v-pre>type</code></td>
<td><code v-pre>String</code></td>
<td><code v-pre>'text'</code></td>
<td>HTML input type</td>
</tr>
<tr>
<td><code v-pre>label</code></td>
<td><code v-pre>String</code></td>
<td>—</td>
<td>Label displayed above the input</td>
</tr>
<tr>
<td><code v-pre>placeholder</code></td>
<td><code v-pre>String</code></td>
<td>—</td>
<td>Placeholder text</td>
</tr>
<tr>
<td><code v-pre>description</code></td>
<td><code v-pre>String</code></td>
<td>—</td>
<td>Helper text displayed below the input</td>
</tr>
<tr>
<td><code v-pre>errors</code></td>
<td><code v-pre>String</code></td>
<td>—</td>
<td>Error message to display</td>
</tr>
<tr>
<td><code v-pre>required</code></td>
<td><code v-pre>Boolean</code></td>
<td><code v-pre>false</code></td>
<td>Marks the field as required</td>
</tr>
<tr>
<td><code v-pre>enabled</code></td>
<td><code v-pre>Boolean</code></td>
<td><code v-pre>true</code></td>
<td>Whether the field is enabled</td>
</tr>
<tr>
<td><code v-pre>isTouched</code></td>
<td><code v-pre>Boolean</code></td>
<td><code v-pre>false</code></td>
<td>Whether the field has been interacted with (used to show errors)</td>
</tr>
<tr>
<td><code v-pre>hideLabel</code></td>
<td><code v-pre>Boolean</code></td>
<td><code v-pre>false</code></td>
<td>Hides the label visually</td>
</tr>
<tr>
<td><code v-pre>width</code></td>
<td><code v-pre>String</code></td>
<td><code v-pre>'w-48'</code></td>
<td>Tailwind width class</td>
</tr>
</tbody>
</table>
<h2 id="events" tabindex="-1"><a class="header-anchor" href="#events"><span>Events</span></a></h2>
<table>
<thead>
<tr>
<th>Event</th>
<th>Payload</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>change</code></td>
<td><code v-pre>Event</code></td>
<td>Emitted when the input value changes</td>
</tr>
<tr>
<td><code v-pre>focus</code></td>
<td><code v-pre>FocusEvent</code></td>
<td>Emitted when the input receives focus</td>
</tr>
<tr>
<td><code v-pre>blur</code></td>
<td><code v-pre>Event</code></td>
<td>Emitted when the input loses focus</td>
</tr>
</tbody>
</table>
<ClientOnly>
<h2 id="examples" tabindex="-1"><a class="header-anchor" href="#examples"><span>Examples</span></a></h2>
<h3 id="required" tabindex="-1"><a class="header-anchor" href="#required"><span>Required</span></a></h3>
<Tabs :data='[{"id":"Preview"},{"id":"Vue"}]'>
<template #title0="{ value, isActive }">Preview</template>
<template #title1="{ value, isActive }">Vue</template>
<template #tab0="{ value, isActive }">
<Input
v-model="model"
label="The label"
:required="true"
/>
</template>
<template #tab1="{ value, isActive }">
<div class="language-vue line-numbers-mode" data-highlighter="shiki" data-ext="vue" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-vue"><span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Input</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">    v-model</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"model"</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">    label</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"The label"</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">    :required</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"true"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  /></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> setup</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">  import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Input</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "@ghentcdh/ui"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</Tabs>
<h3 id="with-errors" tabindex="-1"><a class="header-anchor" href="#with-errors"><span>With errors</span></a></h3>
<Tabs :data='[{"id":"Preview"},{"id":"Vue"}]'>
<template #title0="{ value, isActive }">Preview</template>
<template #title1="{ value, isActive }">Vue</template>
<template #tab0="{ value, isActive }">
<Input
v-model="model"
label="The label"
:is-touched="true"
errors="Some error"
/>
</template>
<template #tab1="{ value, isActive }">
<div class="language-vue line-numbers-mode" data-highlighter="shiki" data-ext="vue" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-vue"><span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Input</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">    v-model</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"model"</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">    label</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"The label"</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">    :is-touched</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"true"</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">    errors</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Some error"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  /></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> setup</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">  import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Input</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "@ghentcdh/ui"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</Tabs>
</ClientOnly>
</div></template>


<script setup>
//
import { Input } from '@ghentcdh/ui';
import { ref } from 'vue';

const model = ref(null);

</script>