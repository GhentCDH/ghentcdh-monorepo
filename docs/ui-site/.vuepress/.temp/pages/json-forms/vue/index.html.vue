<template><div><h1 id="vue-json-forms-frontend" tabindex="-1"><a class="header-anchor" href="#vue-json-forms-frontend"><span>Vue json-forms frontend</span></a></h1>
<p>A json-forms library for Vue.js that allows you to create forms based on a JSON schema and a UI schema.</p>
<p>It uses the components inside <code v-pre>@ghentcdh/ui</code> for styling</p>
<h2 id="install-the-library" tabindex="-1"><a class="header-anchor" href="#install-the-library"><span>Install the library</span></a></h2>
<div class="language-ssh line-numbers-mode" data-highlighter="shiki" data-ext="ssh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-ssh"><span class="line"><span>pnpm add @ghentcdh/json-forms-vue</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h1 id="add-the-styling-to-your-project" tabindex="-1"><a class="header-anchor" href="#add-the-styling-to-your-project"><span>Add the styling to your project</span></a></h1>
<h2 id="install-the-libraries" tabindex="-1"><a class="header-anchor" href="#install-the-libraries"><span>Install the libraries</span></a></h2>
<div class="language-ssh line-numbers-mode" data-highlighter="shiki" data-ext="ssh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-ssh"><span class="line"><span>pnpm add @ghentcdh/auth/vue @ghentcdh/auth/backend</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="add-the-styling" tabindex="-1"><a class="header-anchor" href="#add-the-styling"><span>Add the styling</span></a></h2>
<p>Add the styling to your project by importing the css file in your main.js or App.vue file:</p>
<div class="language-scss line-numbers-mode" data-highlighter="shiki" data-ext="scss" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-scss"><span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="show-the-form" tabindex="-1"><a class="header-anchor" href="#show-the-form"><span>Show the form</span></a></h2>
<p>A json form can be shown using the <code v-pre>FormComponent</code> component. The component requires a schema and a ui schema to be passed as props, and it uses the <code v-pre>v-model</code> directive to bind the form data.</p>
<div class="language-vue line-numbers-mode" data-highlighter="shiki" data-ext="vue" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-vue"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">import {FormComponent} from '@ghentcdh/json-forms-vue';</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">div</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;FormComponent</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    :schema="schema"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    :ui-schema="uischema"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    v-model="formData" /></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;pre>{{formData}}&#x3C;/pre></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">div</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


