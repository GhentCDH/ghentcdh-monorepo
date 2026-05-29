<template><div><h1 id="button-badge" tabindex="-1"><a class="header-anchor" href="#button-badge"><span>Button Badge</span></a></h1>
<p>A badge-styled button component, useful for tags and compact actions.</p>
<h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage"><span>Usage</span></a></h2>
<Tabs :data='[{"id":"Preview"},{"id":"Vue"}]'>
<template #title0="{ value, isActive }">Preview</template>
<template #title1="{ value, isActive }">Vue</template>
<template #tab0="{ value, isActive }">
<div class="flex gap-2 items-center">
  <BtnBadge color="primary">Primary</BtnBadge>
  <BtnBadge color="secondary">Secondary</BtnBadge>
  <BtnBadge color="error">Error</BtnBadge>
</div>
</template>
<template #tab1="{ value, isActive }">
<div class="language-vue line-numbers-mode" data-highlighter="shiki" data-ext="vue" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-vue"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">BtnBadge</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> color</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"primary"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>Primary&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">BtnBadge</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">BtnBadge</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> color</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"secondary"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>Secondary&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">BtnBadge</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">BtnBadge</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> color</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"error"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>Error&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">BtnBadge</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> setup</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">BtnBadge</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '@ghentcdh/ui'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
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
<td><code v-pre>color</code></td>
<td><code v-pre>Color</code></td>
<td>-</td>
<td>Badge color: <code v-pre>primary</code>, <code v-pre>secondary</code>, <code v-pre>error</code>, <code v-pre>blank</code>.</td>
</tr>
<tr>
<td><code v-pre>size</code></td>
<td><code v-pre>Size</code></td>
<td><code v-pre>'sm'</code></td>
<td>Badge size: <code v-pre>xs</code>, <code v-pre>sm</code>, <code v-pre>lg</code>, <code v-pre>xl</code>.</td>
</tr>
<tr>
<td><code v-pre>icon</code></td>
<td><code v-pre>IconEnum | Component</code></td>
<td>-</td>
<td>Optional icon displayed after the slot content.</td>
</tr>
<tr>
<td><code v-pre>type</code></td>
<td><code v-pre>ButtonType</code></td>
<td><code v-pre>'button'</code></td>
<td>Button type: <code v-pre>'button'</code>, <code v-pre>'submit'</code>, or <code v-pre>'reset'</code>.</td>
</tr>
<tr>
<td><code v-pre>disabled</code></td>
<td><code v-pre>boolean</code></td>
<td><code v-pre>false</code></td>
<td>Disable the badge button.</td>
</tr>
</tbody>
</table>
<h2 id="events" tabindex="-1"><a class="header-anchor" href="#events"><span>Events</span></a></h2>
<table>
<thead>
<tr>
<th>Event</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>click</code></td>
<td>Emitted when the badge is clicked.</td>
</tr>
</tbody>
</table>
<h2 id="examples" tabindex="-1"><a class="header-anchor" href="#examples"><span>Examples</span></a></h2>
<h3 id="with-icon" tabindex="-1"><a class="header-anchor" href="#with-icon"><span>With icon</span></a></h3>
<Tabs :data='[{"id":"Preview"},{"id":"Vue"}]'>
<template #title0="{ value, isActive }">Preview</template>
<template #title1="{ value, isActive }">Vue</template>
<template #tab0="{ value, isActive }">
<div class="flex gap-2 items-center">
  <BtnBadge color="primary" :icon="IconEnum.Close">Tag</BtnBadge>
  <BtnBadge color="error" :icon="IconEnum.Close">Remove</BtnBadge>
</div>
</template>
<template #tab1="{ value, isActive }">
<div class="language-vue line-numbers-mode" data-highlighter="shiki" data-ext="vue" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-vue"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">BtnBadge</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> color</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"primary"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> :icon</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"IconEnum.Close"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>Tag&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">BtnBadge</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">BtnBadge</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> color</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"error"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> :icon</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"IconEnum.Close"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>Remove&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">BtnBadge</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> setup</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">BtnBadge</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">IconEnum</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '@ghentcdh/ui'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</Tabs>
<h3 id="all-variants" tabindex="-1"><a class="header-anchor" href="#all-variants"><span>All variants</span></a></h3>
<table class="table">
  <thead>
    <tr>
      <th></th>
      <template v-for="icon in icons" :key="icon">
        <th v-for="size in badgeSize" :key="size">{{ size }}</th>
      </template>
    </tr>
  </thead>
  <tbody>
    <tr v-for="color in badgeColor" :key="color">
      <td>{{ color }}</td>
      <template v-for="icon in icons" :key="icon">
        <td v-for="size in badgeSize" :key="size" class="text-center m-2">
          <BtnBadge :size="size" :color="color" :icon="icon">Badge</BtnBadge>
        </td>
      </template>
    </tr>
  </tbody>
</table></div></template>


<script setup>
import { BtnBadge, BadgeSize, Color, IconEnum } from '@ghentcdh/ui';

const badgeSize = Object.values(BadgeSize);
const badgeColor = Object.values(Color);
const icons = [undefined, IconEnum.Close];
</script>