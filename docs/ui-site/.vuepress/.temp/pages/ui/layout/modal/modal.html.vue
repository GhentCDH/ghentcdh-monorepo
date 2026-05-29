<template><div><h1 id="default-modal" tabindex="-1"><a class="header-anchor" href="#default-modal"><span>Default Modal</span></a></h1>
<p>This is an example alert, if you want to add dynamic alerts. F.E. if you delete a row than you can use the <code v-pre>ModalService</code> so you don't need to worry about the handling logic.</p>
<div class="language-vue line-numbers-mode" data-highlighter="shiki" data-ext="vue" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-vue"><span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Modal</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> modalTitle</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"a modal title"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">       :</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">open</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">"</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">modalOpen</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">       @</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">close-modal</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">"</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">closeMe</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;template #content></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    Modal content</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;/template></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;template #actions></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    &#x3C;Btn @click="closeMe">Close the modal&#x3C;/Btn></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;/template></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Modal</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><Btn @click="modalOpen = true">Open modal</Btn><Modal modalTitle="a modal title"
    :open="modalOpen"    
    @close-modal="closeMe">
    <template #content>
       Modal content 
    </template>
    <template #actions>
       <Btn @click="closeMe">Close the modal</Btn>
    </template>
</Modal></div></template>


<script setup>
import { Modal, Btn } from "@ghentcdh/ui";
import { ref } from 'vue';

const modalOpen = ref(false);

const closeMe = () => {
    modalOpen.value = false;
}

</script>