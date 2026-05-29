<template><div><h1 id="libs-json-forms-vue-e2e" tabindex="-1"><a class="header-anchor" href="#libs-json-forms-vue-e2e"><span><code v-pre>libs/json-forms/vue-e2e</code></span></a></h1>
<p>Playwright e2e suite for <code v-pre>@ghentcdh/json-forms-vue</code>. Tests run against a tiny
Vite playground app that mounts the lib's source directly (no build), and use
the harnesses + fixtures from <code v-pre>@ghentcdh/json-forms-vue-test</code>.</p>
<h2 id="layout" tabindex="-1"><a class="header-anchor" href="#layout"><span>Layout</span></a></h2>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>.</span></span>
<span class="line"><span>├── playwright.config.ts       # webServer = vite preview ./playground</span></span>
<span class="line"><span>├── project.json               # Nx project (auto-targets via @nx/playwright plugin)</span></span>
<span class="line"><span>├── playground/                # Vite + Vue 3 app, one route per scenario</span></span>
<span class="line"><span>│   ├── index.html</span></span>
<span class="line"><span>│   ├── vite.config.ts</span></span>
<span class="line"><span>│   └── src/</span></span>
<span class="line"><span>│       ├── main.ts</span></span>
<span class="line"><span>│       ├── App.vue</span></span>
<span class="line"><span>│       ├── router.ts</span></span>
<span class="line"><span>│       ├── shared/</span></span>
<span class="line"><span>│       │   ├── FormDataProbe.vue   # &#x3C;pre data-testid="form-data">…&#x3C;/pre></span></span>
<span class="line"><span>│       │   └── schemas.ts          # JSON + UI schemas for each scenario</span></span>
<span class="line"><span>│       └── pages/</span></span>
<span class="line"><span>│           ├── HomePage.vue</span></span>
<span class="line"><span>│           ├── JsonFormPage.vue        # /json-form</span></span>
<span class="line"><span>│           ├── ErrorModePage.vue       # /json-form/error-mode/:mode</span></span>
<span class="line"><span>│           ├── ArrayPage.vue           # /array</span></span>
<span class="line"><span>│           ├── ActionsPage.vue         # /actions</span></span>
<span class="line"><span>│           ├── AutocompletePage.vue    # /autocomplete  (mocked /api/authors)</span></span>
<span class="line"><span>│           └── MarkdownPage.vue        # /markdown</span></span>
<span class="line"><span>└── src/</span></span>
<span class="line"><span>    ├── fixtures/</span></span>
<span class="line"><span>    │   └── PlaygroundPage.ts     # extends JsonFormFixture, adds .goto() + .formData()</span></span>
<span class="line"><span>    └── specs/</span></span>
<span class="line"><span>        ├── json-form.spec.ts</span></span>
<span class="line"><span>        ├── error-mode.spec.ts</span></span>
<span class="line"><span>        ├── array.spec.ts</span></span>
<span class="line"><span>        ├── actions.spec.ts</span></span>
<span class="line"><span>        ├── autocomplete.spec.ts</span></span>
<span class="line"><span>        └── markdown.spec.ts</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="running" tabindex="-1"><a class="header-anchor" href="#running"><span>Running</span></a></h2>
<div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-sh"><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># Local (with playground hot-reload):</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">pnpm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> exec</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> vite</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --config</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> playground/vite.config.ts</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> &#x26;</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">pnpm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> exec</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> playwright</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> test</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># Or let playwright manage the server (uses `vite preview` on :4173):</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">npx</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nx</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> run</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> json-forms-vue-e2e:e2e</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># UI mode:</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">npx</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nx</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> run</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> json-forms-vue-e2e:e2e</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --ui</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># Only changed:</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">npx</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nx</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> affected</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -t</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> e2e</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --base=main</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="coverage-today" tabindex="-1"><a class="header-anchor" href="#coverage-today"><span>Coverage today</span></a></h2>
<ul>
<li><strong>JsonForm</strong>: text, number, boolean, select, textarea round-trip; required-field validity.</li>
<li><strong>errorMode</strong>: <code v-pre>onBlur</code>, <code v-pre>onChange</code>, <code v-pre>onSubmit</code>, <code v-pre>always</code> — all four checked against the
same form on a parametrised route.</li>
<li><strong>Array</strong> (variable-length): add row, fill nested control, remove row.</li>
<li><strong>JsonFormWithActions</strong>: Save disabled while invalid, <code v-pre>@submit</code> payload, Clear empties data.</li>
<li><strong>Autocomplete</strong>: typing filters options, selecting commits a value, clear, <code v-pre>query()</code>
leaves dropdown open for inspection — backend stubbed with <code v-pre>page.route('**/api/authors**', …)</code>.</li>
<li><strong>Markdown</strong>: plain text round-trip, bold and italic toolbar buttons.</li>
</ul>
<h2 id="gaps-in-priority-order" tabindex="-1"><a class="header-anchor" href="#gaps-in-priority-order"><span>Gaps (in priority order)</span></a></h2>
<ol>
<li><code v-pre>JsonFormWithTable</code> — needs a playground page wired to a mocked <code v-pre>/api/&lt;entity&gt;</code> and a
spec covering create/edit/delete. Most of the orchestration already lives in
<code v-pre>JsonFormWithTableFixture</code>.</li>
<li><code v-pre>JsonFormModal</code> + <code v-pre>JsonFormModalService</code> direct tests (currently exercised transitively
by the autocomplete + table flows).</li>
<li>Multi-select control — playground page + spec, mirrors the existing select spec.</li>
<li>Fixed-length array (<code v-pre>detailFixed</code>) — verify no add/remove buttons.</li>
</ol>
</div></template>


