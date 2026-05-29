<template><div><h1 id="table" tabindex="-1"><a class="header-anchor" href="#table"><span>Table</span></a></h1>
<p>The <code v-pre>TableComponent</code> renders a data table driven by a JSON schema and UI schema. It fetches paginated data from a URI, supports sorting, filtering, and custom row actions. It is typically used inside <code v-pre>FormWithTableComponent</code> but can also be used standalone.</p>
<h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage"><span>Usage</span></a></h2>
<Tabs :data='[{"id":"Vue"}]'>
<template #title0="{ value, isActive }">Vue</template>
<template #tab0="{ value, isActive }">
<div class="language-vue line-numbers-mode" data-highlighter="shiki" data-ext="vue" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-vue"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">TableComponent</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">    id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"users-table"</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">    :ui-schema</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"tableUiSchema"</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">    :schema</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"tableSchema"</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">    :filter-ui-schema</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"filterUiSchema"</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">    :filter-schema</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"filterSchema"</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">    uri</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"/api/users"</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">    @edit</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"onEdit"</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">    @delete</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"onDelete"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  /></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> setup</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">TableComponent</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '@ghentcdh/json-forms-vue'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">const</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> onEdit</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">data</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">=></span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">  console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'edit'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">data</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">const</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> onDelete</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">data</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">=></span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">  console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'delete'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">data</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">};</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</Tabs>
<h2 id="props" tabindex="-1"><a class="header-anchor" href="#props"><span>Props</span></a></h2>
<table>
<thead>
<tr>
<th>Prop</th>
<th>Type</th>
<th>Required</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>id</code></td>
<td><code v-pre>String</code></td>
<td>true</td>
<td>—</td>
<td>Unique identifier for the table store instance</td>
</tr>
<tr>
<td><code v-pre>uiSchema</code></td>
<td><code v-pre>Layout</code></td>
<td>true</td>
<td>—</td>
<td>UI schema defining the table columns</td>
</tr>
<tr>
<td><code v-pre>schema</code></td>
<td><code v-pre>JsonSchema</code></td>
<td>true</td>
<td>—</td>
<td>JSON schema describing the data shape</td>
</tr>
<tr>
<td><code v-pre>filterUiSchema</code></td>
<td><code v-pre>Layout</code></td>
<td>false</td>
<td>—</td>
<td>UI schema for the filter controls above the table</td>
</tr>
<tr>
<td><code v-pre>filterSchema</code></td>
<td><code v-pre>JsonSchema</code></td>
<td>false</td>
<td>—</td>
<td>JSON schema for the filter data</td>
</tr>
<tr>
<td><code v-pre>uri</code></td>
<td><code v-pre>String</code></td>
<td>true</td>
<td>—</td>
<td>URI to fetch paginated table data from</td>
</tr>
<tr>
<td><code v-pre>reload</code></td>
<td><code v-pre>Number</code></td>
<td>false</td>
<td>—</td>
<td>Change this value (e.g. <code v-pre>Date.now()</code>) to trigger a table reload</td>
</tr>
<tr>
<td><code v-pre>actions</code></td>
<td><code v-pre>TableAction[]</code></td>
<td>false</td>
<td>—</td>
<td>Custom action buttons rendered in each table row</td>
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
<td><code v-pre>edit</code></td>
<td><code v-pre>data: unknown</code></td>
<td>Emitted when a row's edit action is triggered</td>
</tr>
<tr>
<td><code v-pre>delete</code></td>
<td><code v-pre>data: unknown</code></td>
<td>Emitted when a row's delete action is triggered</td>
</tr>
</tbody>
</table>
<h2 id="behaviour" tabindex="-1"><a class="header-anchor" href="#behaviour"><span>Behaviour</span></a></h2>
<ul>
<li>The table uses <code v-pre>useTableStore</code> for state management (pagination, sorting, filters, data fetching).</li>
<li>Column definitions are derived from the <code v-pre>uiSchema</code> elements mapped against the <code v-pre>schema</code> via <code v-pre>findColumnDef</code>.</li>
<li>When <code v-pre>filterUiSchema</code> and <code v-pre>filterSchema</code> are both provided, a <code v-pre>TableFilter</code> bar is rendered above the table.</li>
<li>Sorting and pagination are handled internally through the store and reflected in the API requests.</li>
</ul>
</div></template>


