<template><div><h1 id="shell" tabindex="-1"><a class="header-anchor" href="#shell"><span>Shell</span></a></h1>
<client-only>
<ShellComponent
title="Example GhentCDH Application"
:menu="menu()"
:user="user"
:version="version"
>
<p>The shell content</p>
  </ShellComponent>
</client-only>
</div></template>


<script setup>
//
import { ShellComponent } from "@ghentcdh/ui";
import { ref } from 'vue';

const menu = () => {
  return [
    { title: 'Home', icon: 'home', to: '/' },
    { title: 'About', icon: 'info-circle', to: '/about' },
    { title: 'Settings', icon: 'cog', to: '/settings' },
  ]
}

const user = {
  name: 'John Doe',
  email: ''
}

const version = '1.0.0';
</script>