<template><div><h1 id="table" tabindex="-1"><a class="header-anchor" href="#table"><span>Table</span></a></h1>
<TableComponent :loading="false"
:data="data"        
:displayColumns="displayColumns"
:page="page"/>
<h2 id="loading-table" tabindex="-1"><a class="header-anchor" href="#loading-table"><span>Loading table</span></a></h2>
<TableComponent :loading="true"
:displayColumns="displayColumns"
:page="page"/>
</div></template>


<script setup>import {
TableComponent, TextCell} from '@ghentcdh/ui';

const comp = TableComponent;

const displayColumns = [
  {
    component: TextCell,
    id: 'name',
    label: 'Name',
  },
  {
    component: TextCell,
    id: 'firstName',
    label: 'First Name',
  },
];

const data = [
  { name: 'Six', firstName: 'Joren' },
  { name: 'Vandersteene', firstName: 'Bo' },
];

const pageSize = 20;
const page = {
  count: pageSize * 5,
  pageSize,
  page: 1,
};

</script>