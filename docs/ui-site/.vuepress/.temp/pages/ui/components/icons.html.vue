<template><div><h1 id="icons" tabindex="-1"><a class="header-anchor" href="#icons"><span>Icons</span></a></h1>
<p>Icons are based on <a href="https://heroicons.com/" target="_blank" rel="noopener noreferrer">Heroicons</a> (outline style). You can use the built-in <code v-pre>IconEnum</code> or pass any <code v-pre>@heroicons/vue</code> component directly.</p>
<h2 id="overview" tabindex="-1"><a class="header-anchor" href="#overview"><span>Overview</span></a></h2>
<Tabs :data='[{"id":"xs"},{"id":"sm"},{"id":"lg"},{"id":"xl"},{"id":"default"}]'>
<template #title0="{ value, isActive }">xs</template>
<template #title1="{ value, isActive }">sm</template>
<template #title2="{ value, isActive }">lg</template>
<template #title3="{ value, isActive }">xl</template>
<template #title4="{ value, isActive }">default</template>
<template #tab0="{ value, isActive }">
<table class="table">
  <thead>
    <tr>
      <th>Preview</th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="[key, value] in icons" :key="key">
      <td><Icon :icon="value" size="xs" /></td>
      <td><code>IconEnum.{{ key }}</code></td>
    </tr>
  </tbody>
</table>
</template>
<template #tab1="{ value, isActive }">
<table class="table">
  <thead>
    <tr>
      <th>Preview</th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="[key, value] in icons" :key="key">
      <td><Icon :icon="value" size="sm" /></td>
      <td><code>IconEnum.{{ key }}</code></td>
    </tr>
  </tbody>
</table>
</template>
<template #tab2="{ value, isActive }">
<table class="table">
  <thead>
    <tr>
      <th>Preview</th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="[key, value] in icons" :key="key">
      <td><Icon :icon="value" size="lg" /></td>
      <td><code>IconEnum.{{ key }}</code></td>
    </tr>
  </tbody>
</table>
</template>
<template #tab3="{ value, isActive }">
<table class="table">
  <thead>
    <tr>
      <th>Preview</th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="[key, value] in icons" :key="key">
      <td><Icon :icon="value" size="xl" /></td>
      <td><code>IconEnum.{{ key }}</code></td>
    </tr>
  </tbody>
</table>
</template>
<template #tab4="{ value, isActive }">
<table class="table">
  <thead>
    <tr>
      <th>Preview</th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="[key, value] in icons" :key="key">
      <td><div class="w-8 h-8"><Icon :icon="value" /></div></td>
      <td><code>IconEnum.{{ key }}</code></td>
    </tr>
  </tbody>
</table>
</template>
</Tabs>
<h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage"><span>Usage</span></a></h2>
<Tabs :data='[{"id":"Preview"},{"id":"Vue"}]'>
<template #title0="{ value, isActive }">Preview</template>
<template #title1="{ value, isActive }">Vue</template>
<template #tab0="{ value, isActive }">
<div class="flex gap-4 items-center">
  <Icon :icon="IconEnum.Edit" size="sm" />
  <Icon :icon="IconEnum.Delete" size="sm" />
  <Icon :icon="IconEnum.Plus" size="sm" />
</div>
</template>
<template #tab1="{ value, isActive }">
<div class="language-vue line-numbers-mode" data-highlighter="shiki" data-ext="vue" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-vue"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Icon</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> :icon</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"IconEnum.Edit"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> size</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"sm"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> /></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Icon</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> :icon</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"IconEnum.Delete"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> size</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"sm"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> /></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Icon</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> :icon</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"IconEnum.Plus"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> size</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"sm"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> /></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> setup</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Icon</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">IconEnum</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '@ghentcdh/ui'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</Tabs>
<h2 id="custom-heroicons" tabindex="-1"><a class="header-anchor" href="#custom-heroicons"><span>Custom Heroicons</span></a></h2>
<p>You can pass any <code v-pre>@heroicons/vue</code> component directly to the <code v-pre>icon</code> prop.</p>
<Tabs :data='[{"id":"Preview"},{"id":"Vue"}]'>
<template #title0="{ value, isActive }">Preview</template>
<template #title1="{ value, isActive }">Vue</template>
<template #tab0="{ value, isActive }">
<Icon :icon="IconEnum.Check" size="sm" /></template>
<template #tab1="{ value, isActive }">
<div class="language-vue line-numbers-mode" data-highlighter="shiki" data-ext="vue" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-vue"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Icon</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> :icon</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"BeakerIcon"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> size</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"sm"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> /></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> setup</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Icon</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '@ghentcdh/ui'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">BeakerIcon</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '@heroicons/vue/24/outline'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
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
<td><code v-pre>icon</code></td>
<td><code v-pre>IconEnum | Component</code></td>
<td>-</td>
<td>Icon to render. Either an <code v-pre>IconEnum</code> value or a heroicon Vue component.</td>
</tr>
<tr>
<td><code v-pre>size</code></td>
<td><code v-pre>Size</code></td>
<td>-</td>
<td>Icon size: <code v-pre>xs</code> (8px), <code v-pre>sm</code> (16px), <code v-pre>lg</code> (24px), <code v-pre>xl</code> (32px), or unset (fills container).</td>
</tr>
</tbody>
</table>
</div></template>


<script setup>
import { Icon, IconEnum } from "@ghentcdh/ui";

const icons = Object.entries(IconEnum);
</script>