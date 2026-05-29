<template><div><h1 id="menu" tabindex="-1"><a class="header-anchor" href="#menu"><span>Menu</span></a></h1>
<Menu :breadcrumbs="breadcrumbs" :menu="menuItems"/>
</div></template>


<script setup>
import { Menu } from "@ghentcdh/ui";

const menuItems = [
     {
        label: "item",
        action: () => alert("Item clicked")
     },
     {
        label: "Disabled item",
        disabled: true,
        // action: () => alert("Disabled item clicked")
      },
     { 
        label: 'Menu dropdown',
        items:[
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
    }
];

const breadcrumbs = [
    { label: 'Home'},
    { label: 'this page' }
]
</script>