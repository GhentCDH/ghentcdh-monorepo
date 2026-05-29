<template><div><h1 id="libs-ui-e2e" tabindex="-1"><a class="header-anchor" href="#libs-ui-e2e"><span><code v-pre>libs/ui/e2e</code></span></a></h1>
<p>Playwright e2e suite for <code v-pre>@ghentcdh/ui</code> components. Each spec drives <strong>one
component in isolation</strong> — no JsonForm in sight.</p>
<h2 id="layout" tabindex="-1"><a class="header-anchor" href="#layout"><span>Layout</span></a></h2>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>.</span></span>
<span class="line"><span>├── playwright.config.ts         # webServer = vite preview ./playground (port 4174)</span></span>
<span class="line"><span>├── project.json                 # Nx project, scope:e2e + scope:ui</span></span>
<span class="line"><span>├── playground/                  # Vite + Vue 3, one route per component</span></span>
<span class="line"><span>│   └── src/</span></span>
<span class="line"><span>│       ├── shared/</span></span>
<span class="line"><span>│       │   ├── ValueProbe.vue   # &#x3C;pre data-testid="value">…&#x3C;/pre></span></span>
<span class="line"><span>│       │   └── baseProps.ts     # default props every Input.properties-shaped component needs</span></span>
<span class="line"><span>│       └── pages/</span></span>
<span class="line"><span>│           ├── InputPage.vue        /input</span></span>
<span class="line"><span>│           ├── NumberPage.vue       /number</span></span>
<span class="line"><span>│           ├── TextareaPage.vue     /textarea</span></span>
<span class="line"><span>│           ├── CheckboxPage.vue     /checkbox</span></span>
<span class="line"><span>│           ├── SelectPage.vue       /select</span></span>
<span class="line"><span>│           ├── MultiSelectPage.vue  /multi-select</span></span>
<span class="line"><span>│           ├── AutocompletePage.vue /autocomplete   (mocked /api/authors)</span></span>
<span class="line"><span>│           ├── MarkdownPage.vue     /markdown</span></span>
<span class="line"><span>│           └── ModalPage.vue        /modal</span></span>
<span class="line"><span>└── src/</span></span>
<span class="line"><span>    ├── fixtures/UiPlaygroundPage.ts   # .goto() + .value() + .probe(testid)</span></span>
<span class="line"><span>    └── specs/</span></span>
<span class="line"><span>        ├── input.spec.ts</span></span>
<span class="line"><span>        ├── number.spec.ts</span></span>
<span class="line"><span>        ├── textarea.spec.ts</span></span>
<span class="line"><span>        ├── checkbox.spec.ts</span></span>
<span class="line"><span>        ├── select.spec.ts</span></span>
<span class="line"><span>        ├── multi-select.spec.ts</span></span>
<span class="line"><span>        ├── autocomplete.spec.ts</span></span>
<span class="line"><span>        ├── markdown.spec.ts</span></span>
<span class="line"><span>        └── modal.spec.ts</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="what-s-deliberately-not-here" tabindex="-1"><a class="header-anchor" href="#what-s-deliberately-not-here"><span>What's deliberately <em>not</em> here</span></a></h2>
<p>Tests that exercise JsonForm semantics (schema-driven rendering, errorMode,
array renderer, JsonFormWithActions, JsonFormWithTable, FormStore) belong in
<code v-pre>libs/json-forms/vue-e2e</code>. ui-e2e never imports <code v-pre>@ghentcdh/json-forms-*</code>.</p>
<h2 id="running" tabindex="-1"><a class="header-anchor" href="#running"><span>Running</span></a></h2>
<div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-sh"><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># All ui-e2e specs:</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">npx</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nx</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> run</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ui-e2e:e2e</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># UI mode for iteration:</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">npx</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nx</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> run</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ui-e2e:e2e</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --ui</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># Only what's affected:</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">npx</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nx</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> affected</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -t</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> e2e</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --base=main</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The playground listens on <code v-pre>:4174</code> so it can run side-by-side with <code v-pre>vue-e2e</code>
(<code v-pre>:4173</code>).</p>
<h2 id="open-questions" tabindex="-1"><a class="header-anchor" href="#open-questions"><span>Open questions</span></a></h2>
<ul>
<li>The Autocomplete page wires <code v-pre>fetchOptions</code> to <code v-pre>/api/authors?q=…</code>. Confirm
the <code v-pre>useFetchOptions</code> signature in the lib — if the spec misses options,
adjust the playground page, not the spec.</li>
<li><code v-pre>ModalHarness.clickBackdrop()</code> clicks at <code v-pre>{x:5, y:5}</code> of the dialog
element. The native <code v-pre>&lt;dialog&gt;</code> only emits <code v-pre>cancel</code> for backdrop clicks
when the click hits the dialog outside its inner box; this works in
Chromium but may need a tweak on WebKit if you add it later.</li>
</ul>
</div></template>


