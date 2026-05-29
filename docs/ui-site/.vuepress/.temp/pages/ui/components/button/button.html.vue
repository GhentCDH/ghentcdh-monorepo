<template><div><h1 id="button" tabindex="-1"><a class="header-anchor" href="#button"><span>Button</span></a></h1>
<p>A flexible button component that supports icons, colors, sizes, and outline variants.</p>
<h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage"><span>Usage</span></a></h2>
<Tabs :data='[{"id":"Preview"},{"id":"Vue"}]'>
<template #title0="{ value, isActive }">Preview</template>
<template #title1="{ value, isActive }">Vue</template>
<template #tab0="{ value, isActive }">
<div class="flex gap-2 items-center">
  <Btn color="primary">Primary</Btn>
  <Btn color="secondary">Secondary</Btn>
  <Btn color="error">Error</Btn>
  <Btn color="blank">Blank</Btn>
</div>
</template>
<template #tab1="{ value, isActive }">
<div class="language-vue line-numbers-mode" data-highlighter="shiki" data-ext="vue" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-vue"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> color</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"primary"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>Primary&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> color</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"secondary"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>Secondary&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> color</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"error"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>Error&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> color</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"blank"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>Blank&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> setup</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '@ghentcdh/ui'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
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
<td><code v-pre>as</code></td>
<td><code v-pre>ButtonTag</code></td>
<td><code v-pre>'button'</code></td>
<td>Render as <code v-pre>'button'</code> or <code v-pre>'a'</code> tag.</td>
</tr>
<tr>
<td><code v-pre>href</code></td>
<td><code v-pre>string</code></td>
<td>-</td>
<td>URL when rendered as an anchor tag.</td>
</tr>
<tr>
<td><code v-pre>type</code></td>
<td><code v-pre>ButtonType</code></td>
<td><code v-pre>'button'</code></td>
<td>Button type: <code v-pre>'button'</code>, <code v-pre>'submit'</code>, or <code v-pre>'reset'</code>.</td>
</tr>
<tr>
<td><code v-pre>color</code></td>
<td><code v-pre>Color</code></td>
<td><code v-pre>'primary'</code></td>
<td>Button color: <code v-pre>primary</code>, <code v-pre>secondary</code>, <code v-pre>error</code>, <code v-pre>blank</code>.</td>
</tr>
<tr>
<td><code v-pre>size</code></td>
<td><code v-pre>Size</code></td>
<td><code v-pre>'sm'</code></td>
<td>Button size: <code v-pre>xs</code>, <code v-pre>sm</code>, <code v-pre>lg</code>, <code v-pre>xl</code>.</td>
</tr>
<tr>
<td><code v-pre>icon</code></td>
<td><code v-pre>IconEnum | Component</code></td>
<td>-</td>
<td>Optional icon displayed before the slot content.</td>
</tr>
<tr>
<td><code v-pre>outline</code></td>
<td><code v-pre>boolean</code></td>
<td><code v-pre>false</code></td>
<td>Use outline style.</td>
</tr>
<tr>
<td><code v-pre>square</code></td>
<td><code v-pre>boolean</code></td>
<td><code v-pre>false</code></td>
<td>Use square shape.</td>
</tr>
<tr>
<td><code v-pre>disabled</code></td>
<td><code v-pre>boolean</code></td>
<td><code v-pre>false</code></td>
<td>Disable the button.</td>
</tr>
<tr>
<td><code v-pre>tooltip</code></td>
<td><code v-pre>string</code></td>
<td>-</td>
<td>Tooltip text via <code v-pre>data-tip</code>.</td>
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
<td>Emitted when the button is clicked.</td>
</tr>
</tbody>
</table>
<h2 id="examples" tabindex="-1"><a class="header-anchor" href="#examples"><span>Examples</span></a></h2>
<h3 id="all-variants" tabindex="-1"><a class="header-anchor" href="#all-variants"><span>All variants</span></a></h3>
<table class="table">
  <thead>
    <tr>
      <th></th>
      <template v-for="icon in icons" :key="icon">
        <th v-for="size in buttonSize" :key="size">{{ size }}</th>
      </template>
    </tr>
  </thead>
  <tbody>
    <template v-for="(item, key, index) in configs" :key="index">
      <tr><th>{{ key }}</th></tr>
      <tr v-for="color in buttonColor" :key="color">
        <td>{{ color }}</td>
        <template v-for="icon in icons" :key="icon">
          <td v-for="size in buttonSize" :key="size" class="text-center m-2">
            <Btn v-bind="item" :size="size" :color="color" :icon="icon">
              {{ item.square ? (icon ? '' : 'Square') : 'Button' }}
            </Btn>
          </td>
        </template>
      </tr>
    </template>
  </tbody>
</table>
<h3 id="with-icon" tabindex="-1"><a class="header-anchor" href="#with-icon"><span>With icon</span></a></h3>
<Tabs :data='[{"id":"Preview"},{"id":"Vue"}]'>
<template #title0="{ value, isActive }">Preview</template>
<template #title1="{ value, isActive }">Vue</template>
<template #tab0="{ value, isActive }">
<div class="flex gap-2 items-center">
  <Btn :icon="IconEnum.Plus">Add</Btn>
  <Btn :icon="IconEnum.Edit" color="secondary">Edit</Btn>
  <Btn :icon="IconEnum.Delete" color="error">Delete</Btn>
</div>
</template>
<template #tab1="{ value, isActive }">
<div class="language-vue line-numbers-mode" data-highlighter="shiki" data-ext="vue" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-vue"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> :icon</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"IconEnum.Plus"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>Add&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> :icon</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"IconEnum.Edit"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> color</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"secondary"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>Edit&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> :icon</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"IconEnum.Delete"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> color</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"error"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>Delete&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> setup</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">IconEnum</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '@ghentcdh/ui'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</Tabs>
<h3 id="outline" tabindex="-1"><a class="header-anchor" href="#outline"><span>Outline</span></a></h3>
<Tabs :data='[{"id":"Preview"},{"id":"Vue"}]'>
<template #title0="{ value, isActive }">Preview</template>
<template #title1="{ value, isActive }">Vue</template>
<template #tab0="{ value, isActive }">
<div class="flex gap-2 items-center">
  <Btn outline color="primary">Primary</Btn>
  <Btn outline color="error">Error</Btn>
</div>
</template>
<template #tab1="{ value, isActive }">
<div class="language-vue line-numbers-mode" data-highlighter="shiki" data-ext="vue" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-vue"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> outline</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> color</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"primary"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>Primary&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> outline</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> color</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"error"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>Error&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> setup</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '@ghentcdh/ui'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</Tabs>
<h3 id="tooltip" tabindex="-1"><a class="header-anchor" href="#tooltip"><span>Tooltip</span></a></h3>
<Tabs :data='[{"id":"Preview"},{"id":"Vue"}]'>
<template #title0="{ value, isActive }">Preview</template>
<template #title1="{ value, isActive }">Vue</template>
<template #tab0="{ value, isActive }">
<div class="flex gap-2 items-center">
  <Btn tooltip="Add a new item" :icon="IconEnum.Plus">Add</Btn>
  <Btn tooltip="Edit this item" :icon="IconEnum.Edit" color="secondary">Edit</Btn>
  <Btn tooltip="Delete this item" :icon="IconEnum.Delete" color="error" square />
</div>
</template>
<template #tab1="{ value, isActive }">
<div class="language-vue line-numbers-mode" data-highlighter="shiki" data-ext="vue" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-vue"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> tooltip</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Add a new item"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> :icon</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"IconEnum.Plus"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>Add&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> tooltip</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Edit this item"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> :icon</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"IconEnum.Edit"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> color</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"secondary"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>Edit&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> tooltip</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Delete this item"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> :icon</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"IconEnum.Delete"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> color</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"error"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> square</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> /></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> setup</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">IconEnum</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '@ghentcdh/ui'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</Tabs>
<h3 id="square" tabindex="-1"><a class="header-anchor" href="#square"><span>Square</span></a></h3>
<Tabs :data='[{"id":"Preview"},{"id":"Vue"}]'>
<template #title0="{ value, isActive }">Preview</template>
<template #title1="{ value, isActive }">Vue</template>
<template #tab0="{ value, isActive }">
<div class="flex gap-2 items-center">
  <Btn square :icon="IconEnum.Plus" />
  <Btn square outline :icon="IconEnum.Edit" />
</div>
</template>
<template #tab1="{ value, isActive }">
<div class="language-vue line-numbers-mode" data-highlighter="shiki" data-ext="vue" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-vue"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> square</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> :icon</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"IconEnum.Plus"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> /></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> square</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> outline</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> :icon</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"IconEnum.Edit"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> /></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> setup</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Btn</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">IconEnum</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '@ghentcdh/ui'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</Tabs>
</div></template>


<script setup>
import { Btn, ButtonSize, Color, IconEnum } from '@ghentcdh/ui';

const configs = {
  default: {},
  square: { square: true },
  'square outline': { square: true, outline: true },
  outline: { outline: true },
};
const buttonSize = Object.values(ButtonSize);
const buttonColor = Object.values(Color);
const icons = [undefined, IconEnum.Plus];
</script>