# Shell

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
<client-only>
 
<ShellComponent
title="Example GhentCDH Application"
:menu="menu()"
:user="user"
:version="version"
>

The shell content

  </ShellComponent>
</client-only>
