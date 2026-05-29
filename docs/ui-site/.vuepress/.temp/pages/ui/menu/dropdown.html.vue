<template><div><h1 id="dropdown" tabindex="-1"><a class="header-anchor" href="#dropdown"><span>Dropdown</span></a></h1>
<Dropdown  :items="menuItems"/></div></template>


<script setup>
//
import { Dropdown } from "@ghentcdh/ui";

const menuItems = [
           {
            label: "label"
          },
           {
            label: "Item 1",
            action: () => alert("Item 1 clicked")
          },
          {
            label: "Item 2",
            action: () => alert("Item 2 clicked")
          },
          {
            label: "Item 3",
            action: () => alert("Item 3 clicked")
          },
          {
            label: "Disabled item",
            disabled: true,
            action: () => alert("Item 3 clicked")
          },
          {
            label: "Submenu",
            items:[
               {
                label: "Item 1",
                action: () => alert("Submenu Item 1 clicked")
              },
              {
                label: "Item 2",
                action: () => alert("Submenu Item 2 clicked")
              },
            ]
          },
        ]
</script>