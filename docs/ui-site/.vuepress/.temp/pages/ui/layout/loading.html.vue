<template><div><h1 id="loading" tabindex="-1"><a class="header-anchor" href="#loading"><span>Loading</span></a></h1>
<p>A loading component will be placed in the center of the parent container.</p>
<div class="language-vue line-numbers-mode" data-highlighter="shiki" data-ext="vue" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-vue"><span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Loading</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> :</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">loading</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> /></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="example" tabindex="-1"><a class="header-anchor" href="#example"><span>Example</span></a></h1>
<client-only>
<div>
  <Loading :loading="true" />
</div>
</client-only>
</div></template>


<script setup>
//
import { Loading } from "@ghentcdh/ui";
</script>