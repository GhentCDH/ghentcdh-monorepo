# Tree

```vue

<TreeView :data="[
    { id: 'src', label: 'src', children: [
      { id: 'components', label: 'components', children: [
        { id: 'Button.vue', label: 'Button.vue', tag: 'component' },
        { id: 'Card.vue', label: 'Card.vue' , tag: 'component'},
      ]},
      { id: 'App.vue', label: 'App.vue' },
    ]},
    { id: 'package.json', label: 'package.json' }
  ]" />
</div>
```

<script setup>
//
import { TreeView } from "@ghentcdh/ui";
import { ref } from 'vue';
const active = ref('');

const select = (node)=>{
console.log('select', node);
  active.value = node.id;
}
</script>
<client-only>
<div style="width: 300px; border: 1px solid red;">
<TreeView 
:active="active"
@select="select($event)"
:data="[
{ id: 'src', label: 'src', tag: 'demo', children: [
{ id: 'components', label: 'components', children: [
{ id: 'Button.vue', label: 'Button.vue', tag: 'component' },
{ id: 'Card.vue', label: 'Card.vue', tag: 'component' },
{ id: 'long.vue', label: 'Some very long text that doesn\'t fit inside the text.vue', tag: 'component' },
]},
{ id: 'App.vue', label: 'App.vue' },
]},
{ id: 'package.json', label: 'package.json' }
]" />
</div>
</client-only>
