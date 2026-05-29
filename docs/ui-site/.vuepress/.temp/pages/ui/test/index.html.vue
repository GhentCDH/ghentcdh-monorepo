<template><div><h1 id="ghentcdh-ui-testing" tabindex="-1"><a class="header-anchor" href="#ghentcdh-ui-testing"><span><code v-pre>@ghentcdh/ui/testing</code></span></a></h1>
<p>Playwright harnesses for <code v-pre>@ghentcdh/ui</code> components. Each harness wraps a
<code v-pre>Locator</code> and exposes the actions a test would perform on that one widget —
no knowledge of routes, forms, or fixtures.</p>
<h2 id="layering" tabindex="-1"><a class="header-anchor" href="#layering"><span>Layering</span></a></h2>
<table>
<thead>
<tr>
<th>Suffix</th>
<th>Where it lives</th>
<th>Knows about</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>*Harness</code></td>
<td><code v-pre>@ghentcdh/ui/testing</code></td>
<td>one <code v-pre>Locator</code>, one UI component</td>
</tr>
<tr>
<td><code v-pre>*Fixture</code></td>
<td><code v-pre>@ghentcdh/json-forms-vue-test</code></td>
<td>a JsonForm-bound entity, composes harnesses</td>
</tr>
<tr>
<td><code v-pre>*Page</code></td>
<td>the consuming e2e suite (<code v-pre>ui-e2e</code>, <code v-pre>vue-e2e</code>, mela)</td>
<td>a route + page-level navigation</td>
</tr>
</tbody>
</table>
<p>Reach for a harness when you want to drive a single control. Reach for a
fixture when you want to fill an entire form. Reach for a page when you
want to navigate the app.</p>
<h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage"><span>Usage</span></a></h2>
<div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-ts"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">AutocompleteHarness</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">ModalHarness</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '@ghentcdh/ui/testing'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> author</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> AutocompleteHarness</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">byLabel</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">page</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'Author'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">await</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> author</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">fill</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'Tolstoy'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> modal</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> ModalHarness</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">byTitle</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">page</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'Create new author'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">await</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> modal</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">close</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>See the <code v-pre>ui-e2e</code> package for end-to-end examples.</p>
<h2 id="resolving-harnesses" tabindex="-1"><a class="header-anchor" href="#resolving-harnesses"><span>Resolving harnesses</span></a></h2>
<p>Each harness ships at least one factory:</p>
<ul>
<li><code v-pre>byLabel(parent, label)</code> — match the control's visible / aria label</li>
<li><code v-pre>byId(parent, id)</code> — match the <code v-pre>aria-label=&quot;{id}&quot;</code> set by lib components</li>
<li><code v-pre>for(locator)</code> — wrap an existing Locator you've already scoped</li>
</ul>
<p>JsonForm-specific callers use <code v-pre>byScopeName</code> from
<code v-pre>@ghentcdh/json-forms-vue-test</code>, which is the same as <code v-pre>byId</code> but documents
the JsonForm scope-path convention.</p>
</div></template>


