# Drawer

```vue

<Drawer>
  Main drawer content
  <template #left-drawer>
    Left drawer content
  </template>
  <template #right-drawer>
    Right drawer content
  </template>
</Drawer>
```

<script setup>
//
import { Drawer, Btn } from "@ghentcdh/ui";
import { ref } from 'vue';


</script>
<client-only>


<div style="height: 200px; border: 1px solid red;">
<Drawer
>

Main drawer content
<template #left-drawer>
<h3 class="text-lg font-semibold text-[var(--text-primary)] mb-4">
Navigation
</h3>
<ul class="space-y-2">
<li>
<a
class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
href="#"
>
<svg
fill="currentColor"
height="20px"
viewBox="0 0 256 256"
width="20px"
xmlns="http://www.w3.org/2000/svg"
>
<path
d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z"
></path>
</svg>
Dashboard</a
>
</li>
<li>
<a
class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
href="#"
>
<svg
fill="currentColor"
height="20px"
viewBox="0 0 256 256"
width="20px"
xmlns="http://www.w3.org/2000/svg"
>
<path
d="M216,72H131.31L104,44.69A15.86,15.86,0,0,0,92.69,40H40A16,16,0,0,0,24,56V200.62A15.4,15.4,0,0,0,39.38,216H216.89A15.13,15.13,0,0,0,232,200.89V88A16,16,0,0,0,216,72ZM40,56H92.69l16,16H40ZM216,200H40V88H216Z"
></path>
</svg>
Projects</a
>
</li>
<li>
<a
class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
href="#"
>
<svg
fill="currentColor"
height="20px"
viewBox="0 0 256 256"
width="20px"
xmlns="http://www.w3.org/2000/svg"
>
<path
d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM224,48V208a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM208,208V48H48V208H208Z"
></path>
</svg>
Tasks</a
>
</li>
<li>
<a
class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
href="#"
>
<svg
fill="currentColor"
height="20px"
viewBox="0 0 256 256"
width="20px"
xmlns="http://www.w3.org/2000/svg"
>
<path
d="M224,200h-8V40a8,8,0,0,0-8-8H152a8,8,0,0,0-8,8V80H96a8,8,0,0,0-8,8v40H48a8,8,0,0,0-8,8v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16ZM160,48h40V200H160ZM104,96h40V200H104ZM56,144H88v56H56Z"
></path>
</svg>
Reports</a
>
</li>
</ul>
</template>   
<template #right-drawer>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nulla felis, suscipit maximus eros nec, laoreet condimentum lorem. Nunc aliquet placerat auctor. In odio ex, iaculis vel mollis placerat, tristique vitae urna. Sed porttitor sapien et elit convallis, sed gravida erat sodales. Quisque hendrerit lectus vitae justo pretium, sed porta dui pharetra. Curabitur id ligula at neque pulvinar finibus nec et massa. Suspendisse potenti. Nulla ac lectus ultricies, lobortis erat eget, aliquet libero. Nulla ut finibus nunc, in scelerisque leo. Aenean augue libero, convallis vel justo in, viverra tempus ex. Cras interdum fermentum justo. Aliquam lobortis facilisis mi in tincidunt. Etiam consequat eros et lacus fringilla, eu facilisis neque viverra. Donec non sapien laoreet, feugiat ipsum nec, tempor eros. Pellentesque hendrerit tincidunt metus interdum dapibus. Nam tincidunt rhoncus quam sit amet tincidunt.
</template>

  </Drawer>
</div>
</client-only>
