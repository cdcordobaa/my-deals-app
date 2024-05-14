
<script lang="ts" setup>
import { ref } from 'vue';
import GridComponent from '../components/Grid/Grid.vue';
import { Deal } from '../types/deals';
import { mockData } from '../mocks/data';

const deals = ref<Deal[]>(mockData);
const dealColumns = ref([
    { key: 'issuer_name', label: 'Issuer', sortable: true, filterable: true },
    { key: 'deal_name', label: 'Deal Name', sortable: true },
]);
</script>


<template>
    <div>
        <h1>Deals</h1>
        <GridComponent :items="deals" :columns="dealColumns" />
    </div>
</template>
