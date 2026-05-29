<template><div><h1 id="pagination" tabindex="-1"><a class="header-anchor" href="#pagination"><span>Pagination</span></a></h1>
<PaginationComponent
:totalItems="20"
:itemsPerPage="5"
:currentPage="1" />
<div class="language-vue line-numbers-mode" data-highlighter="shiki" data-ext="vue" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-vue"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">PaginationComponent</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">   :</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">totalItems</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">20</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">   :</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">itemsPerPage</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">5</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">   :</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">currentPage</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">   @</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">update-page</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">"</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">updatePage</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">   @</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">update-page-size</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">"</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">updatePageSize</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">/></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="default" tabindex="-1"><a class="header-anchor" href="#default"><span>Default</span></a></h2>
<PaginationComponent 
   :totalItems="itemsPerPage * 5" 
   :itemsPerPage="itemsPerPage" 
   :currentPage="1"/>
<h2 id="one-item" tabindex="-1"><a class="header-anchor" href="#one-item"><span>One item</span></a></h2>
<PaginationComponent
:totalItems="1"
:itemsPerPage="itemsPerPage"
:currentPage="1"/>
<h2 id="zero-items" tabindex="-1"><a class="header-anchor" href="#zero-items"><span>Zero items</span></a></h2>
<PaginationComponent
:totalItems="0"
:itemsPerPage="itemsPerPage"
:currentPage="1"/>
<h2 id="_40-pages" tabindex="-1"><a class="header-anchor" href="#_40-pages"><span>40 pages</span></a></h2>
<PaginationComponent
:totalItems="itemsPerPage * 48"
:itemsPerPage="itemsPerPage"
:currentPage="1"/> 
<h2 id="active-page-in-the-middle" tabindex="-1"><a class="header-anchor" href="#active-page-in-the-middle"><span>Active page in the middle</span></a></h2>
<PaginationComponent
:totalItems="itemsPerPage * 50"
:itemsPerPage="itemsPerPage"
:currentPage="25"/>
<h2 id="active-page-at-the-end" tabindex="-1"><a class="header-anchor" href="#active-page-at-the-end"><span>Active page at the end</span></a></h2>
<PaginationComponent
:totalItems="itemsPerPage * 48"
:itemsPerPage="itemsPerPage"
:currentPage="48"/></div></template>


<script setup>
import {
PaginationComponent
} from "@ghentcdh/ui";


const itemsPerPage = 20;
</script>