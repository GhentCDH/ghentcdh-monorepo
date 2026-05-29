<template><div><h1 id="notifications" tabindex="-1"><a class="header-anchor" href="#notifications"><span>Notifications</span></a></h1>
<p>Notifications are used to inform the user about the status of an action or process. They can be used to provide feedback on successful actions, errors, or other important information.</p>
<p>A notification disappears after a few seconds, or can be closed by the user.</p>
<div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-ts"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">NotificationService</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">success</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"This is a success message"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Add the notifications component to your app, then the notifications will be displayed automatically.</p>
<div class="language-vue line-numbers-mode" data-highlighter="shiki" data-ext="vue" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-vue"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">import Notifications from "@ghentcdh/ui";</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><div class="language-vue line-numbers-mode" data-highlighter="shiki" data-ext="vue" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-vue"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Notification</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">s</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">/></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="notificationservice" tabindex="-1"><a class="header-anchor" href="#notificationservice"><span>NotificationService</span></a></h2>
<Btn @click="open('success')">Open success</Btn><br /><Btn @click="open('error')">Open error</Btn><br /><Btn @click="open('info')">Open info</Btn><br /><Btn @click="open('warning')">Open warning</Btn><br /><Notifications/><h1 id="example-layouts" tabindex="-1"><a class="header-anchor" href="#example-layouts"><span>Example layouts</span></a></h1>
<h2 id="success" tabindex="-1"><a class="header-anchor" href="#success"><span>Success</span></a></h2>
<NotificationMessage message="success" type="success" /><h2 id="error" tabindex="-1"><a class="header-anchor" href="#error"><span>Error</span></a></h2>
<NotificationMessage message="error" type="error" /><h2 id="info" tabindex="-1"><a class="header-anchor" href="#info"><span>Info</span></a></h2>
<NotificationMessage message="info" type="info" /><h2 id="warning" tabindex="-1"><a class="header-anchor" href="#warning"><span>Warning</span></a></h2>
<NotificationMessage message="warning" type="warning" /></div></template>


<script setup>
import {
NotificationMessage, IconEnum, Btn, NotificationService, Notifications
} from "@ghentcdh/ui";

const toast = IconEnum;

const open = (type) => {
  switch (type) {
    case 'success':
      NotificationService.success("This is a success message");
      break;
    case 'error':
      NotificationService.error("This is an error message");
      break;
    case 'info':
      NotificationService.info("This is an info message");
      break;
    case 'warning':
      NotificationService.warning("This is a warning message");
      break;
    default:
      NotificationService.info("This is a default message");
  }
};
</script>